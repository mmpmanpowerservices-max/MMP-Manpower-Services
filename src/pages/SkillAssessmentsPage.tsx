import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Clock,
  HelpCircle,
  ShieldCheck,
  Search,
  Filter,
  Play,
  ArrowRight,
  User,
  Sparkles,
  BookOpen,
  Printer,
} from 'lucide-react';
import { SKILL_ASSESSMENTS } from '../data/assessmentsData';
import { SkillAssessment, CandidateSkillBadge } from '../types';
import { useApp } from '../context/AppContext';
import { SkillAssessmentModal } from '../components/assessments/SkillAssessmentModal';
import { SkillCertificateModal } from '../components/common/SkillCertificateModal';
import { CandidateSkillBadgeCard } from '../components/common/CandidateSkillBadgeCard';
import { MmpLogo } from '../components/common/MmpLogo';

interface Props {
  setActivePage: (page: string) => void;
}

export const SkillAssessmentsPage: React.FC<Props> = ({ setActivePage }) => {
  const { candidates, currentCandidateId } = useApp();

  const [selectedAssessment, setSelectedAssessment] = useState<SkillAssessment | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [certBadgeToView, setCertBadgeToView] = useState<CandidateSkillBadge | null>(null);

  // Find active candidate
  const currentCandidate =
    candidates.find((c) => c.id === currentCandidateId) || candidates[0];

  const categories = [
    'All',
    'Banking & BFSI',
    'Manufacturing & Electronics',
    'Logistics & Supply Chain',
    'Sales & Marketing',
  ];

  const types = ['All', 'Practical Scenario', 'Technical SOP', 'Multiple Choice'];

  const filteredAssessments = SKILL_ASSESSMENTS.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesType = selectedType === 'All' || item.type === selectedType;
    return matchesCat && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header in Corporate Gold & Navy */}
      <div className="bg-gradient-to-r from-[#030a1c] via-[#091a3e] to-[#040d24] text-white rounded-3xl p-8 sm:p-12 border border-[#d4af37]/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-[#d4af37]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#0a142f] border border-[#d4af37]/40 rounded-xl">
              <MmpLogo size="sm" showText={false} />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#f5d061] bg-[#d4af37]/15 px-3 py-1 rounded-full border border-[#d4af37]/30">
              MMP SHIELD™ VERIFIED SKILL ASSESSMENTS & CREDENTIALS
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading leading-tight text-white">
            Skill Assessments & Verified Badges
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Validate your practical competencies across accounting, SMT manufacturing, warehousing, and banking. 
            Earn official MMP SHIELD™ badges and printable certificates stamped with a professional visual seal, 
            recognized by verified corporate employers across India.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-[#f5d061] font-bold">
              <Sparkles className="w-4 h-4 text-[#d4af37]" /> Gold Badge: 90%+ Score
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1.5 text-slate-200 font-bold">
              <ShieldCheck className="w-4 h-4 text-slate-300" /> Silver Badge: 75–89% Score
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Award className="w-4 h-4" /> Bronze Badge: 60–74% Score
            </span>
          </div>
        </div>
      </div>

      {/* Active Candidate Badges Overview Banner */}
      {currentCandidate && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0a1128] to-[#162758] text-[#f5d061] flex items-center justify-center font-bold shadow-sm">
                <User className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider block">
                  Active Candidate Profile
                </span>
                <h3 className="text-base font-black text-[#0a1128] font-heading">
                  {currentCandidate.fullName}
                </h3>
                <span className="text-xs font-mono font-bold text-[#9c7717]">
                  {currentCandidate.id}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-500 block">Verified Badges Earned</span>
              <span className="text-xl font-black text-[#9c7717] font-heading">
                {currentCandidate.verifiedBadges?.length || 0} Badges
              </span>
            </div>
          </div>

          {currentCandidate.verifiedBadges && currentCandidate.verifiedBadges.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 block">
                  Your Earned Skill Badges & Certificates:
                </span>
                <span className="text-[11px] text-slate-500">
                  Click Generate to view official certificate
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentCandidate.verifiedBadges.map((b) => (
                  <CandidateSkillBadgeCard
                    key={b.id}
                    badge={b}
                    onViewCertificate={(badge) => setCertBadgeToView(badge)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-center justify-between">
              <span>
                You have not completed any skill assessments yet. Pick an assessment below to earn your first certified badge and official certificate!
              </span>
            </div>
          )}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0a1128] text-[#f5d061] border border-[#d4af37]/50 shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="text-xs font-bold px-3.5 py-2 border border-slate-300 rounded-xl bg-white text-slate-800 cursor-pointer outline-hidden focus:border-[#d4af37]"
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t === 'All' ? 'All Test Formats' : t}
            </option>
          ))}
        </select>
      </div>

      {/* Assessments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAssessments.map((assessment) => {
          const isPassed = currentCandidate?.verifiedBadges?.some(
            (b) => b.assessmentId === assessment.id
          );
          const earnedBadge = currentCandidate?.verifiedBadges?.find(
            (b) => b.assessmentId === assessment.id
          );

          return (
            <div
              key={assessment.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 hover:border-[#d4af37]/60 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs font-black text-[#0a1128] bg-slate-100 px-3 py-1 rounded-lg">
                    {assessment.category}
                  </span>
                  <span className="text-[11px] font-bold text-purple-900 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-lg">
                    {assessment.type}
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#0a1128] leading-snug font-heading">
                  {assessment.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {assessment.description}
                </p>

                <div className="grid grid-cols-3 gap-2 my-5 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Duration</span>
                    <strong className="text-slate-900 font-mono">{assessment.durationMinutes} Mins</strong>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Questions</span>
                    <strong className="text-slate-900 font-mono">{assessment.questions.length} Items</strong>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Pass Score</span>
                    <strong className="text-emerald-700 font-mono">{assessment.passingScore}%</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                {isPassed ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Passed ({earnedBadge?.scorePercentage}%)
                    </span>
                    {earnedBadge && (
                      <button
                        onClick={() => setCertBadgeToView(earnedBadge)}
                        className="text-xs font-bold text-[#0a1128] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5 text-[#9c7717]" />
                        <span>Certificate</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <span className="text-xs text-slate-500 font-medium">Ready for attempt</span>
                )}

                <button
                  onClick={() => setSelectedAssessment(assessment)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                    isPassed
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      : 'bg-[#0a1128] hover:bg-[#162758] text-[#f5d061] border border-[#d4af37]/40'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isPassed ? 'Re-take Test' : 'Start Assessment'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Assessment Test Modal */}
      {selectedAssessment && currentCandidate && (
        <SkillAssessmentModal
          assessment={selectedAssessment}
          candidateId={currentCandidate.id}
          candidateName={currentCandidate.fullName}
          onClose={() => setSelectedAssessment(null)}
        />
      )}

      {/* Certificate Viewer Modal */}
      {certBadgeToView && currentCandidate && (
        <SkillCertificateModal
          badge={certBadgeToView}
          candidate={currentCandidate}
          onClose={() => setCertBadgeToView(null)}
        />
      )}
    </div>
  );
};
