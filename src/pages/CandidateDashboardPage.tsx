import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Briefcase,
  Award,
  Bell,
  FileText,
  CreditCard,
  ChevronRight,
  TrendingUp,
  Download,
  AlertCircle,
  ExternalLink,
  Upload,
  Plus,
  QrCode,
  FileCheck,
  Sparkles,
  Eye,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CandidateSkillBadgeCard } from '../components/common/CandidateSkillBadgeCard';
import { SkillCertificateModal } from '../components/common/SkillCertificateModal';
import { MmpLogo } from '../components/common/MmpLogo';
import { CandidateStatus, CandidateSkillBadge } from '../types';

interface Props {
  setActivePage: (page: string) => void;
}

export const CandidateDashboardPage: React.FC<Props> = ({ setActivePage }) => {
  const {
    candidates,
    currentCandidateId,
    setCurrentCandidateId,
    applications,
    payments,
    uploadCandidateCertificate,
  } = useApp();

  const currentCandidate =
    candidates.find((c) => c.id === currentCandidateId) || candidates[0];

  const candidateApplications = applications.filter(
    (app) => app.candidateId === currentCandidate?.id
  );

  const candidatePayments = payments.filter(
    (p) => p.userId === currentCandidate?.id
  );

  // Certificate Modal State
  const [selectedBadgeForCert, setSelectedBadgeForCert] = useState<CandidateSkillBadge | null>(null);

  // Upload External Certificate State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);
  const [certForm, setCertForm] = useState({
    title: '',
    issuingAuthority: '',
    issueYear: '2024',
    fileName: '',
  });

  // Profile completion calculation
  let completion = 40;
  if (currentCandidate.education) completion += 15;
  if (currentCandidate.skills?.length > 0) completion += 15;
  if (currentCandidate.verifiedBadges?.length) completion += 15;
  if (currentCandidate.activeMembership) completion += 15;

  const statusPipeline: CandidateStatus[] = [
    'Registered',
    'Verified',
    'Profile Active',
    'Matched',
    'Interview',
    'Selected',
    'Joined',
  ];

  const getStatusIndex = (st: CandidateStatus) => statusPipeline.indexOf(st);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.title || !certForm.issuingAuthority) return;

    uploadCandidateCertificate(currentCandidate.id, {
      title: certForm.title,
      issuingAuthority: certForm.issuingAuthority,
      issueYear: certForm.issueYear,
      fileName: certForm.fileName || `${certForm.title.replace(/\s+/g, '_')}_Cert.pdf`,
    });

    setUploadSuccessMsg(
      `Certificate "${certForm.title}" submitted successfully for MMP SHIELD™ verification.`
    );
    setCertForm({
      title: '',
      issuingAuthority: '',
      issueYear: '2024',
      fileName: '',
    });
    setIsUploading(false);

    setTimeout(() => {
      setUploadSuccessMsg(null);
    }, 6000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Top Banner with Corporate Gold & Navy Styling */}
      <div className="bg-gradient-to-r from-[#030a1c] via-[#091a3e] to-[#040d24] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#d4af37]/35 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Subtle decorative gold glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-[#d4af37]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-5 relative z-10">
          {/* Logo Crest Emblem */}
          <div className="shrink-0 p-1.5 rounded-2xl bg-gradient-to-b from-[#0a142f] to-[#020614] border border-[#d4af37]/40 shadow-lg">
            <MmpLogo size="sm" showText={false} />
          </div>

          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black font-heading text-white">
                {currentCandidate.fullName}
              </h1>
              <span className="text-[11px] font-black px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                ✓ {currentCandidate.verificationStatus}
              </span>
              {currentCandidate.verifiedBadges && currentCandidate.verifiedBadges.length > 0 && (
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 text-[#f5d061] border border-[#d4af37]/40 flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#d4af37]" />
                  MMP SHIELD™ Certified
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-300 font-mono">
              <span>
                Candidate ID: <strong className="text-[#f5d061]">{currentCandidate.id}</strong>
              </span>
              <span>•</span>
              <span>{currentCandidate.currentLocation}</span>
              <span>•</span>
              <span className="text-blue-200">{currentCandidate.jobCategory}</span>
            </div>
          </div>
        </div>

        {/* Profile Switcher for testing and recruiter evaluation */}
        <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-[#d4af37]/30 text-xs relative z-10 shrink-0">
          <label className="text-[10px] text-[#f5d061] uppercase block font-bold mb-1.5 tracking-wider font-mono">
            Switch Candidate Profile:
          </label>
          <select
            value={currentCandidate.id}
            onChange={(e) => setCurrentCandidateId(e.target.value)}
            className="text-xs bg-[#040918] text-[#f5d061] px-3.5 py-2 rounded-xl border border-[#d4af37]/40 outline-hidden font-mono cursor-pointer hover:border-[#d4af37] transition-all"
          >
            {candidates.map((c) => (
              <option key={c.id} value={c.id}>
                {c.fullName} ({c.id}) - {c.verifiedBadges?.length || 0} Badges
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Completion & Quick Metrics in Corporate Gold & Navy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Profile Completion */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:border-[#d4af37]/50 transition-all">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-700">Profile Completion</span>
            <span className="text-xs font-black text-[#0f2452] font-mono">{completion}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-3">
            <div
              className="bg-gradient-to-r from-[#0f2452] to-[#d4af37] h-full rounded-full transition-all duration-500"
              style={{ width: `${completion}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-500">
            {completion === 100
              ? 'All verification milestones achieved'
              : 'Complete a skill assessment to reach 100%'}
          </span>
        </div>

        {/* Active Membership */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:border-[#d4af37]/50 transition-all flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block">Candidate Membership</span>
            <span className="text-sm font-black text-[#0a1128] mt-1 block font-heading">
              {currentCandidate.activeMembership?.planName || 'Free Standard Access'}
            </span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-between items-center text-[11px]">
            <span className="text-slate-500">
              {currentCandidate.activeMembership
                ? `Valid till ${currentCandidate.activeMembership.expiresAt}`
                : 'Standard database inclusion'}
            </span>
            <button
              onClick={() => setActivePage('candidate-membership')}
              className="text-[#9c7717] font-bold hover:underline"
            >
              Upgrade →
            </button>
          </div>
        </div>

        {/* Priority Processing & Alerts */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:border-[#d4af37]/50 transition-all flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block">Recruitment Processing</span>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  currentCandidate.hasFastTrack
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {currentCandidate.hasFastTrack ? '★ Fast Track Active' : 'Standard Pipeline'}
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-between items-center text-[11px]">
            <span className="text-slate-500">
              Job Alerts: {currentCandidate.hasJobAlerts ? 'Active' : 'Standard'}
            </span>
            {!currentCandidate.hasFastTrack && (
              <button
                onClick={() => setActivePage('fast-track')}
                className="text-[#0f2452] font-bold hover:underline"
              >
                Fast Track →
              </button>
            )}
          </div>
        </div>

        {/* Verified Badges & Seal Status */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:border-[#d4af37]/50 transition-all flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block">Verified Skill Credentials</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-black text-[#9c7717] font-heading block">
                {currentCandidate.verifiedBadges?.length || 0} Badges
              </span>
              <span className="text-xs text-slate-400 font-mono">
                + {currentCandidate.uploadedCertificates?.length || 0} External
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-between items-center text-[11px]">
            <span className="text-slate-500">MMP SHIELD™ Verified</span>
            <button
              onClick={() => setActivePage('skill-assessments')}
              className="text-[#9c7717] font-black hover:underline"
            >
              Take Test →
            </button>
          </div>
        </div>
      </div>

      {/* Recruitment Status Tracker */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-lg font-black text-[#0a1128] font-heading">
              Recruitment Progression Pipeline
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Track candidate milestones through the MMP Manpower verification and placement lifecycle.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#9c7717] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Current Stage: {currentCandidate.status}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {statusPipeline.map((st, idx) => {
            const currentIdx = getStatusIndex(currentCandidate.status);
            const isCompleted = idx < currentIdx;
            const isCurrent = idx === currentIdx;

            return (
              <div
                key={st}
                className={`p-3.5 rounded-2xl text-center border transition-all ${
                  isCurrent
                    ? 'border-[#d4af37] bg-gradient-to-b from-amber-50/80 to-amber-100/50 text-[#0a1128] ring-2 ring-[#d4af37]/30 font-bold shadow-xs'
                    : isCompleted
                    ? 'border-emerald-200 bg-emerald-50/60 text-emerald-950 font-medium'
                    : 'border-slate-100 bg-slate-50 text-slate-400'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full mx-auto mb-2 flex items-center justify-center text-xs font-black ${
                    isCurrent
                      ? 'bg-[#0a1128] text-[#f5d061] border border-[#d4af37]'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? '✓' : idx + 1}
                </div>
                <span className="text-xs block leading-tight font-medium">{st}</span>
                {isCurrent && (
                  <span className="text-[10px] text-[#9c7717] font-black block mt-1">
                    Active
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION: SKILL VERIFICATION & PROFESSIONAL CERTIFICATES      */}
      {/* ============================================================ */}
      <div className="bg-gradient-to-b from-white to-[#fcfcfd] rounded-3xl border-2 border-[#d4af37]/40 shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        {/* Top Gold & Navy Accents */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0a1128] via-[#d4af37] to-[#0a1128]" />

        {/* Section Header with Logo and Visual Seal Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-2xl bg-gradient-to-b from-[#0a1128] to-[#040918] border border-[#d4af37]/50 shadow-md shrink-0">
              <MmpLogo size="sm" showText={false} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-[#0a1128] font-heading">
                  Skill Verification & Professional Certificates
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#d4af37]/20 text-[#856512] border border-[#d4af37]/50">
                  MMP SHIELD™ Audit Gate
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                Empower your profile with tamper-evident credentials. Take assessments to earn official 
                MMP SHIELD™ certified competency badges, generate printable certificates with a 
                professional visual seal, or upload external trade diplomas to be reviewed by verification officers.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsUploading(!isUploading)}
              className="px-4 py-2.5 bg-white hover:bg-slate-50 text-[#0a1128] border border-slate-300 font-bold text-xs rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4 text-[#9c7717]" />
              <span>{isUploading ? 'Close Upload Form' : 'Upload External Certificate'}</span>
            </button>
            <button
              onClick={() => setActivePage('skill-assessments')}
              className="px-5 py-2.5 bg-gradient-to-r from-[#0a1128] to-[#13285c] hover:from-[#13285c] hover:to-[#0a1128] text-[#f5d061] border border-[#d4af37]/50 font-black text-xs rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Award className="w-4 h-4 text-[#d4af37]" />
              <span>Take New Assessment</span>
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {uploadSuccessMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-medium flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{uploadSuccessMsg}</span>
          </div>
        )}

        {/* Upload External Certificate Collapsible Form */}
        {isUploading && (
          <form
            onSubmit={handleUploadSubmit}
            className="p-6 rounded-2xl bg-gradient-to-b from-[#f8fafc] to-white border-2 border-dashed border-[#d4af37]/60 space-y-4 animate-in fade-in duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#9c7717]" />
                <h4 className="font-black text-sm text-[#0a1128] font-heading">
                  Upload External Skill Diploma / Technical Certificate
                </h4>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                Supported: PDF, JPG, PNG (Max 5MB)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Certificate Title / Trade <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ITI Electrician / Tally Prime / AWS Cloud"
                  value={certForm.title}
                  onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium focus:outline-hidden focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Issuing Authority / Institution <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NCVT / University / Tally Education"
                  value={certForm.issuingAuthority}
                  onChange={(e) => setCertForm({ ...certForm, issuingAuthority: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium focus:outline-hidden focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Issue Year
                </label>
                <select
                  value={certForm.issueYear}
                  onChange={(e) => setCertForm({ ...certForm, issueYear: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium focus:outline-hidden focus:border-[#d4af37]"
                >
                  {['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2015'].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Select Certificate Document File
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setCertForm({ ...certForm, fileName: file.name });
                    }
                  }}
                  className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#0a1128] file:text-[#f5d061] hover:file:bg-[#152458] file:cursor-pointer"
                />
              </div>

              <div className="flex items-end justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploading(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0a1128] hover:bg-[#16295c] text-[#f5d061] font-bold rounded-xl border border-[#d4af37]/60 shadow-sm cursor-pointer flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  <span>Submit for SHIELD Verification</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Official MMP SHIELD™ Visual Seal Showcase Card */}
        <div className="bg-gradient-to-r from-[#030a1c] via-[#091838] to-[#040e26] text-white rounded-2xl p-5 sm:p-6 border border-[#d4af37]/35 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* The Prestigious Royal Gold Visual Seal */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#8a6813] via-[#ffd700] to-[#daa520] p-1 shadow-xl shadow-amber-950/40 border-2 border-[#fff2a3] flex items-center justify-center">
                <div className="w-full h-full rounded-full border border-dashed border-[#543b00] bg-gradient-to-b from-[#f9df74] to-[#c99516] flex flex-col items-center justify-center text-slate-950 p-1 text-center">
                  <ShieldCheck className="w-5 h-5 text-[#422e00] stroke-[2.5]" />
                  <span className="text-[7.5px] font-black uppercase tracking-wider font-heading leading-tight mt-0.5 text-[#2b1f02]">
                    MMP SHIELD™
                  </span>
                  <span className="text-[6.5px] font-black uppercase tracking-tight text-[#453000]">
                    OFFICIAL SEAL
                  </span>
                  <span className="text-[6px] font-mono font-bold text-[#3d2a01]">
                    ★ AUDIT PASS ★
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-[#f5d061] uppercase tracking-widest">
                  CRYPTOGRAPHIC CREDENTIAL GATE
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h4 className="text-base sm:text-lg font-black font-heading text-white">
                MMP SHIELD™ Verified Certificate Registry
              </h4>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                Every certificate generated through the MMP assessment portal includes a unique serial number, 
                audited test scorecard, and authorized digital stamp recognized by corporate recruiters across Karnataka and India.
              </p>
            </div>
          </div>

          <div className="text-xs font-mono bg-white/10 p-3.5 rounded-xl border border-white/20 text-slate-300 space-y-1.5 shrink-0 min-w-[220px]">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[10px]">VERIFIED BADGES:</span>
              <strong className="text-[#f5d061] font-bold">
                {currentCandidate.verifiedBadges?.length || 0}
              </strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[10px]">EXTERNAL CERTS:</span>
              <strong className="text-white font-bold">
                {currentCandidate.uploadedCertificates?.length || 0}
              </strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[10px]">SEAL AUTHENTICITY:</span>
              <strong className="text-emerald-400 font-bold">Active</strong>
            </div>
          </div>
        </div>

        {/* 1. Earned Badges & Official Generated Certificates */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-[#0a1128] font-heading flex items-center gap-2">
              <Award className="w-4 h-4 text-[#9c7717]" />
              <span>
                Assessment Badges & Generated Certificates ({currentCandidate.verifiedBadges?.length || 0})
              </span>
            </h3>
            <span className="text-xs text-slate-500">
              Click &quot;Generate Official Certificate&quot; to print or download as PDF
            </span>
          </div>

          {currentCandidate.verifiedBadges && currentCandidate.verifiedBadges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentCandidate.verifiedBadges.map((badge) => (
                <CandidateSkillBadgeCard
                  key={badge.id}
                  badge={badge}
                  onViewCertificate={(b) => setSelectedBadgeForCert(b)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600">
              <Award className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="font-bold text-slate-800">No verified assessment badges earned yet</p>
              <p className="text-slate-500 mt-1 max-w-sm mx-auto">
                Take a 5-minute practical assessment in Tally, SMT Electronics, Logistics, or Banking to earn your first certified badge.
              </p>
              <button
                onClick={() => setActivePage('skill-assessments')}
                className="mt-3 px-4 py-2 bg-[#0a1128] hover:bg-[#162758] text-[#f5d061] border border-[#d4af37]/50 rounded-xl font-bold cursor-pointer transition-all shadow-xs"
              >
                Browse Available Assessments →
              </button>
            </div>
          )}
        </div>

        {/* 2. Uploaded External Certificates List */}
        {currentCandidate.uploadedCertificates && currentCandidate.uploadedCertificates.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="text-sm font-black text-[#0a1128] font-heading flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-blue-700" />
              <span>
                Uploaded External Credentials & Diplomas ({currentCandidate.uploadedCertificates.length})
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {currentCandidate.uploadedCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 hover:bg-white hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-100 text-blue-800 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900">{cert.title}</h5>
                      <span className="text-[11px] text-slate-500 block">
                        {cert.issuingAuthority} • Year: {cert.issueYear}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        File: {cert.fileName}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        cert.verificationStatus === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {cert.verificationStatus}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      {cert.uploadedAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Applied Jobs & Interviews */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-black text-[#0a1128] font-heading">
          Applied Vacancies & Interview Drives ({candidateApplications.length})
        </h3>

        {candidateApplications.length > 0 ? (
          <div className="space-y-3">
            {candidateApplications.map((app) => (
              <div
                key={app.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-slate-300 transition-all"
              >
                <div>
                  <span className="font-bold text-slate-900 text-sm block">{app.jobTitle}</span>
                  <span className="text-slate-600 font-medium">{app.employerName}</span>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Applied on: <strong>{app.appliedDate}</strong> • App Ref: {app.id}
                  </div>
                  {app.interviewDate && (
                    <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-950 font-medium">
                      <strong>Scheduled Interview:</strong> {app.interviewDate} at {app.interviewLocation}
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900">
                    Status: {app.status}
                  </span>
                  {app.notes && (
                    <span className="text-[11px] text-slate-500 block mt-1.5 italic max-w-xs">
                      {app.notes}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
            No job applications submitted yet. Browse open vacancies to apply.
            <div className="mt-2">
              <button
                onClick={() => setActivePage('find-jobs')}
                className="text-[#0f2452] font-bold hover:underline"
              >
                Browse Active Jobs →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Payment History & Invoices */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-black text-[#0a1128] font-heading">
          Membership & Payment Invoices
        </h3>

        {candidatePayments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                  <th className="py-2.5 px-3">Invoice #</th>
                  <th className="py-2.5 px-3">Service</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Method</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {candidatePayments.map((p) => (
                  <tr key={p.id}>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-800">
                      {p.invoiceNumber}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">{p.planName}</td>
                    <td className="py-2.5 px-3">{p.date}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">
                      ₹{p.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-3">{p.paymentMethod}</td>
                    <td className="py-2.5 px-3 text-emerald-700 font-bold">Paid</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 bg-slate-50 rounded-2xl text-xs text-slate-500 text-center">
            No billing records on file. Free registration active.
          </div>
        )}
      </div>

      {/* Official Skill Certificate Modal Viewer */}
      {selectedBadgeForCert && (
        <SkillCertificateModal
          badge={selectedBadgeForCert}
          candidate={currentCandidate}
          onClose={() => setSelectedBadgeForCert(null)}
        />
      )}
    </div>
  );
};
