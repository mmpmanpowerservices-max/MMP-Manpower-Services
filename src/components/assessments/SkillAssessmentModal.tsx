import React, { useState, useEffect } from 'react';
import {
  X,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Printer,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SkillAssessment, CandidateSkillBadge } from '../../types';
import { useApp } from '../../context/AppContext';
import { MmpLogo } from '../common/MmpLogo';
import { SkillCertificateModal } from '../common/SkillCertificateModal';

interface Props {
  assessment: SkillAssessment;
  candidateId: string;
  candidateName: string;
  onClose: () => void;
  onCompleted?: () => void;
}

export const SkillAssessmentModal: React.FC<Props> = ({
  assessment,
  candidateId,
  candidateName,
  onClose,
  onCompleted,
}) => {
  const { completeSkillAssessment, candidates } = useApp();

  const [currentStep, setCurrentStep] = useState<'instructions' | 'taking' | 'result'>('instructions');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(assessment.durationMinutes * 60);
  const [showExplanation, setShowExplanation] = useState(false);
  const [result, setResult] = useState<{
    correctCount: number;
    total: number;
    percentage: number;
    passed: boolean;
    badgeLevel: 'Gold Certified' | 'Silver Certified' | 'Bronze Certified' | 'None';
  } | null>(null);

  // New badge created for certificate view
  const [createdBadge, setCreatedBadge] = useState<CandidateSkillBadge | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const activeCandidateObj =
    candidates.find((c) => c.id === candidateId) || candidates[0];

  // Timer countdown while taking assessment
  useEffect(() => {
    if (currentStep !== 'taking') return;

    if (timeRemaining <= 0) {
      handleSubmitAssessment();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [currentStep, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setTimeRemaining(assessment.durationMinutes * 60);
    setShowExplanation(false);
    setCurrentStep('taking');
  };

  const handleSelectOption = (qId: string, optionIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optionIdx,
    }));
  };

  const currentQ = assessment.questions[currentQuestionIndex];
  const isAnswered = currentQ ? selectedAnswers[currentQ.id] !== undefined : false;

  const handleNext = () => {
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowExplanation(false);
    } else {
      handleSubmitAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setShowExplanation(false);
    }
  };

  const handleSubmitAssessment = () => {
    let correct = 0;
    assessment.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correct++;
      }
    });

    const total = assessment.questions.length;
    const percentage = Math.round((correct / total) * 100);
    const passed = percentage >= assessment.passingScore;

    let badgeLevel: 'Gold Certified' | 'Silver Certified' | 'Bronze Certified' | 'None' = 'None';
    if (percentage >= 90) badgeLevel = 'Gold Certified';
    else if (percentage >= 75) badgeLevel = 'Silver Certified';
    else if (percentage >= 60) badgeLevel = 'Bronze Certified';

    setResult({
      correctCount: correct,
      total,
      percentage,
      passed,
      badgeLevel,
    });

    setCurrentStep('result');

    if (passed && badgeLevel !== 'None') {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // canvas-confetti fallback
      }

      const newBadge = completeSkillAssessment(candidateId, {
        skillName: assessment.title,
        category: assessment.category,
        assessmentId: assessment.id,
        assessmentTitle: assessment.title,
        scorePercentage: percentage,
        badgeLevel: badgeLevel,
        assessmentType: assessment.type,
        totalQuestions: total,
        correctAnswers: correct,
      });

      setCreatedBadge(newBadge);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-[#d4af37]/40 overflow-hidden my-6">
          {/* Header in Corporate Gold & Navy */}
          <div className="bg-gradient-to-r from-[#030a1c] via-[#091a3e] to-[#040d24] text-white p-5 flex items-center justify-between border-b border-[#d4af37]/30">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-[#0a142f] border border-[#d4af37]/40 rounded-xl">
                <MmpLogo size="sm" showText={false} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#f5d061] font-mono">
                  MMP SHIELD™ SKILL ASSESSMENT ENGINE
                </span>
                <h3 className="text-base sm:text-lg font-black text-white leading-tight font-heading">
                  {assessment.title}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content based on step */}
          {currentStep === 'instructions' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="bg-gradient-to-r from-amber-50/80 via-white to-amber-50/80 border border-[#d4af37]/40 rounded-2xl p-4.5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#9c7717] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Verified Candidate Assessment & Certification
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      This test validates real-world industry competencies for{' '}
                      <strong className="text-slate-900">{candidateName}</strong> ({candidateId}). Successful completion grants an official{' '}
                      <strong className="text-[#856512]">MMP SHIELD™ Skill Badge</strong> and printable Certificate with a professional visual seal recognized by hiring employers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 border border-slate-200/90 p-3.5 rounded-2xl text-center">
                  <span className="text-[11px] text-slate-500 font-bold block uppercase">Duration</span>
                  <span className="text-base font-black text-slate-800 flex items-center justify-center gap-1 mt-0.5 font-mono">
                    <Clock className="w-4 h-4 text-[#0f2452]" />
                    {assessment.durationMinutes} Mins
                  </span>
                </div>
                <div className="bg-slate-50 border border-slate-200/90 p-3.5 rounded-2xl text-center">
                  <span className="text-[11px] text-slate-500 font-bold block uppercase">Questions</span>
                  <span className="text-base font-black text-slate-800 flex items-center justify-center gap-1 mt-0.5 font-mono">
                    <HelpCircle className="w-4 h-4 text-[#9c7717]" />
                    {assessment.questions.length} Items
                  </span>
                </div>
                <div className="bg-slate-50 border border-slate-200/90 p-3.5 rounded-2xl text-center">
                  <span className="text-[11px] text-slate-500 font-bold block uppercase">Passing Score</span>
                  <span className="text-base font-black text-emerald-700 flex items-center justify-center gap-1 mt-0.5 font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {assessment.passingScore}%
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-black text-xs uppercase tracking-wider text-slate-700 mb-2">
                  Instructions for Candidate:
                </h4>
                <ul className="space-y-2">
                  {assessment.instructions.map((ins, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="w-4 h-4 rounded-full bg-[#0a1128] text-[#f5d061] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{ins}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      ★
                    </span>
                    <span>
                      Badge tiers: <strong>90%+ Gold Certified</strong> | <strong>75–89% Silver Certified</strong> | <strong>60–74% Bronze Certified</strong>.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleStart}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#0a1128] to-[#13285c] hover:from-[#13285c] hover:to-[#0a1128] text-[#f5d061] border border-[#d4af37]/50 font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Begin Assessment</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Taking Step */}
          {currentStep === 'taking' && currentQ && (
            <div className="p-6 sm:p-8">
              {/* Top progress and timer */}
              <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                    Question {currentQuestionIndex + 1} of {assessment.questions.length}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900">
                    {assessment.type}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock
                    className={`w-4 h-4 ${
                      timeRemaining < 60 ? 'text-rose-600 animate-pulse' : 'text-slate-500'
                    }`}
                  />
                  <span
                    className={`font-mono text-sm font-bold ${
                      timeRemaining < 60 ? 'text-rose-600 animate-pulse' : 'text-slate-800'
                    }`}
                  >
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-gradient-to-r from-[#0a1128] to-[#d4af37] h-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / assessment.questions.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question Text */}
              <div className="mb-6">
                <h4 className="text-base sm:text-lg font-black text-[#0a1128] leading-snug font-heading">
                  {currentQ.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentQ.id] === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(currentQ.id, idx)}
                      className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'border-[#0a1128] bg-slate-50 text-[#0a1128] font-bold ring-2 ring-[#0a1128]/10'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isSelected ? 'bg-[#0a1128] text-[#f5d061]' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Footer navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 disabled:opacity-40 cursor-pointer"
                >
                  ← Previous
                </button>

                <div className="flex items-center gap-2">
                  {currentQuestionIndex === assessment.questions.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleSubmitAssessment}
                      disabled={!isAnswered}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                    >
                      Submit Assessment
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!isAnswered}
                      className="px-5 py-2.5 bg-[#0a1128] hover:bg-[#14234e] text-[#f5d061] font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <span>Next Question</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Result Step with Visual Seal and Direct Certificate Generator */}
          {currentStep === 'result' && result && (
            <div className="p-6 sm:p-8 text-center space-y-6">
              {result.passed ? (
                <div className="space-y-4">
                  {/* Visual Seal Centerpiece */}
                  <div className="flex justify-center">
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-[#8a6813] via-[#ffd700] to-[#daa520] p-1 shadow-xl shadow-amber-950/20 border-2 border-[#fff2a3] flex items-center justify-center">
                      <div className="w-full h-full rounded-full border border-dashed border-[#543b00] bg-gradient-to-b from-[#f9df74] to-[#c99516] flex flex-col items-center justify-center text-slate-950 p-1">
                        <ShieldCheck className="w-6 h-6 text-[#422e00] stroke-[2.5]" />
                        <span className="text-[7px] font-black uppercase tracking-wider font-heading leading-tight mt-0.5 text-[#2b1f02]">
                          MMP SHIELD™
                        </span>
                        <span className="text-[6px] font-black uppercase tracking-tight text-[#453000]">
                          OFFICIAL SEAL
                        </span>
                        <span className="text-[5.5px] font-mono font-bold text-[#3d2a01]">
                          ★ PASSED ★
                        </span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#0a1128] font-heading">
                    Congratulations, {candidateName}!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    You scored <strong className="text-emerald-700 font-mono text-base">{result.percentage}%</strong>{' '}
                    ({result.correctCount} of {result.total} questions verified correct).
                  </p>

                  {/* Badge Award Card */}
                  <div className="p-4 rounded-2xl border border-[#d4af37]/60 bg-gradient-to-r from-amber-50 via-white to-amber-50 text-left shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-gradient-to-tr from-[#9c7717] to-[#d4af37] text-white rounded-xl shadow-md shrink-0">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-[#856512] tracking-wider block">
                          OFFICIAL MMP SHIELD™ CREDENTIAL
                        </span>
                        <h4 className="text-sm sm:text-base font-black text-[#0a1128] font-heading">
                          ★ {result.badgeLevel} • {assessment.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5 font-mono">
                          Candidate ID: <strong className="text-slate-800">{candidateId}</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed max-w-lg mx-auto">
                    Your verified scorecard and badge have been added to the MMP recruitment database. 
                    Employers like Tata Electronics, Jio, and Oracle can inspect this verified proficiency.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    {createdBadge && (
                      <button
                        type="button"
                        onClick={() => setShowCertificateModal(true)}
                        className="px-6 py-2.5 bg-[#0a1128] hover:bg-[#15234e] text-[#f5d061] border border-[#d4af37]/60 font-black text-xs rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all"
                      >
                        <Printer className="w-4 h-4 text-[#d4af37]" />
                        <span>Generate & Print Official Certificate</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        if (onCompleted) onCompleted();
                        onClose();
                      }}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      Close & Go to Dashboard
                    </button>
                  </div>
                </div>
              ) : (
                <div className="max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Score Below Passing Threshold
                  </h3>
                  <p className="text-xs text-slate-600">
                    You scored <strong className="text-rose-600 font-mono">{result.percentage}%</strong>. The required passing score for this assessment is <strong>{assessment.passingScore}%</strong>.
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 text-left">
                    <p className="font-bold text-slate-800 mb-1">Feedback & Recommendations:</p>
                    <p>
                      Review the SOP standards for {assessment.title}. Candidates can re-attempt skill assessments to improve their verified profile score anytime.
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleStart}
                      className="px-5 py-2.5 bg-[#0a1128] hover:bg-[#16295c] text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Re-Take Assessment</span>
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Generated Certificate Modal Viewer */}
      {showCertificateModal && createdBadge && (
        <SkillCertificateModal
          badge={createdBadge}
          candidate={activeCandidateObj}
          onClose={() => setShowCertificateModal(false)}
        />
      )}
    </>
  );
};
