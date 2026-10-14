import React from 'react';
import { ShieldCheck, Award, CheckCircle2, Clock } from 'lucide-react';
import { CandidateSkillBadge } from '../../types';

interface Props {
  badge: CandidateSkillBadge;
  compact?: boolean;
  onViewCertificate?: (badge: CandidateSkillBadge) => void;
}

export const CandidateSkillBadgeCard: React.FC<Props> = ({
  badge,
  compact = false,
  onViewCertificate,
}) => {
  const isGold = badge.badgeLevel.includes('Gold');
  const isSilver = badge.badgeLevel.includes('Silver');

  const badgeTheme = isGold
    ? {
        border: 'border-[#d4af37]/60',
        bg: 'bg-gradient-to-r from-[#fffbf0] via-white to-[#fff8e7]',
        text: 'text-amber-950',
        iconBg: 'bg-gradient-to-tr from-[#9c7717] to-[#d4af37] text-white',
        tagBg: 'bg-amber-100 text-amber-900 border border-amber-300/80',
      }
    : isSilver
    ? {
        border: 'border-slate-300',
        bg: 'bg-gradient-to-r from-slate-50 via-white to-slate-100',
        text: 'text-slate-800',
        iconBg: 'bg-slate-600 text-white',
        tagBg: 'bg-slate-100 text-slate-800 border border-slate-300',
      }
    : {
        border: 'border-amber-700/30',
        bg: 'bg-gradient-to-r from-amber-50/60 via-white to-orange-50/60',
        text: 'text-amber-950',
        iconBg: 'bg-amber-700 text-white',
        tagBg: 'bg-amber-100 text-amber-900 border border-amber-300',
      };

  if (compact) {
    return (
      <span
        onClick={() => onViewCertificate && onViewCertificate(badge)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${badgeTheme.border} ${badgeTheme.bg} ${badgeTheme.text} shadow-xs ${
          onViewCertificate ? 'cursor-pointer hover:border-amber-500 hover:shadow-sm transition-all' : ''
        }`}
        title={`Verified by MMP SHIELD™: ${badge.scorePercentage}% score. Click to view certificate.`}
      >
        <Award className="w-3.5 h-3.5 text-[#b8860b]" />
        <span>{badge.skillName}</span>
        <span className="font-bold text-[10px] px-1 py-0.2 rounded bg-white/90 border border-amber-300/60 text-slate-900 font-mono">
          {badge.scorePercentage}%
        </span>
      </span>
    );
  }

  return (
    <div
      className={`p-4 rounded-2xl border ${badgeTheme.border} ${badgeTheme.bg} flex flex-col justify-between shadow-xs hover:shadow-md transition-all relative overflow-hidden group`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2.5 rounded-xl shrink-0 ${badgeTheme.iconBg} shadow-sm`}>
          <Award className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h4 className="font-black text-sm text-[#0a1128] font-heading truncate">
              {badge.skillName}
            </h4>
            <span
              className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${badgeTheme.tagBg}`}
            >
              ★ {badge.badgeLevel}
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5 font-medium">
            Assessment: {badge.assessmentTitle} ({badge.assessmentType})
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1 text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md font-bold font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Score: {badge.scorePercentage}% ({badge.correctAnswers}/{badge.totalQuestions})
            </span>
            <span className="flex items-center gap-1 text-slate-600 text-[11px]">
              <Clock className="w-3 h-3 text-slate-400" />
              Verified: {badge.completedAt}
            </span>
            <span className="flex items-center gap-1 text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md text-[10px] font-bold">
              <ShieldCheck className="w-3 h-3 text-blue-700" />
              MMP SHIELD™ Audit Pass
            </span>
          </div>
        </div>
      </div>

      {onViewCertificate && (
        <div className="mt-3 pt-3 border-t border-amber-200/50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            Audit ID: MMP-CERT-{badge.id.replace('BADGE-', '')}
          </span>
          <button
            type="button"
            onClick={() => onViewCertificate(badge)}
            className="px-3 py-1.5 bg-[#0a1128] hover:bg-[#16234d] text-[#f5d061] border border-[#d4af37]/50 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <Award className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Generate Official Certificate</span>
          </button>
        </div>
      )}
    </div>
  );
};
