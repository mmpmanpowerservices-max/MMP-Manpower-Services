import React from 'react';
import {
  X,
  Printer,
  Download,
  ShieldCheck,
  Award,
  CheckCircle2,
  Lock,
  ExternalLink,
  QrCode,
} from 'lucide-react';
import { MmpLogo } from './MmpLogo';
import { CandidateSkillBadge, Candidate } from '../../types';

interface Props {
  badge: CandidateSkillBadge;
  candidate: Candidate;
  onClose: () => void;
}

export const SkillCertificateModal: React.FC<Props> = ({ badge, candidate, onClose }) => {
  const certSerial = `MMP-CERT-${badge.completedAt.replace(/-/g, '')}-${badge.id.replace('BADGE-', '')}`;

  const isGold = badge.badgeLevel.includes('Gold');
  const isSilver = badge.badgeLevel.includes('Silver');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full border border-amber-400/40 overflow-hidden my-4">
        {/* Modal Top Control Bar */}
        <div className="bg-[#040918] text-white px-6 py-3.5 flex items-center justify-between border-b border-[#d4af37]/30">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#d4af37]" />
            <span className="font-heading font-black text-sm text-[#f5d061] tracking-wide">
              Official MMP SHIELD™ Certificate of Competency
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-[#0f2452] hover:bg-[#163578] text-[#f5d061] border border-[#d4af37]/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Royal Certificate Surface */}
        <div className="p-6 sm:p-10 bg-[#fefefe] text-slate-900 select-none">
          {/* Ornate Double Golden Border Frame */}
          <div className="relative p-6 sm:p-10 border-4 border-[#d4af37] rounded-3xl bg-gradient-to-b from-[#fffdf5] via-white to-[#fffbf0] shadow-inner">
            {/* Corner Filigree Accents */}
            <div className="absolute top-2 left-2 w-10 h-10 border-t-2 border-l-2 border-[#856512] rounded-tl-xl pointer-events-none" />
            <div className="absolute top-2 right-2 w-10 h-10 border-t-2 border-r-2 border-[#856512] rounded-tr-xl pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-10 h-10 border-b-2 border-l-2 border-[#856512] rounded-bl-xl pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-10 h-10 border-b-2 border-r-2 border-[#856512] rounded-br-xl pointer-events-none" />

            {/* Certificate Header with Royal Golden Emblem */}
            <div className="text-center space-y-2 mb-6">
              <div className="flex justify-center mb-1">
                <MmpLogo size="lg" showText={false} />
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-widest text-[#0a1128] uppercase">
                MMP MANPOWER SERVICES
              </h2>
              <p className="text-[10px] sm:text-xs font-black tracking-widest text-[#856512] uppercase font-mono">
                HEAD OFFICE: DAVANGERE – 577006, KARNATAKA • PAN-INDIA RECRUITMENT NETWORK
              </p>
              <p className="text-[9px] text-slate-500 font-semibold tracking-wider uppercase">
                MMP SHIELD™ ENTERPRISE PROCESS CONTROL & QUALITY GATE
              </p>
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-2" />
            </div>

            {/* Certificate Title */}
            <div className="text-center my-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600 font-mono block">
                Official Credential of Competency
              </span>
              <h1 className="text-xl sm:text-3xl font-serif font-bold text-[#0a1128] tracking-wide mt-1">
                Certificate of Skill Assessment
              </h1>
              <span className="text-xs text-[#856512] font-semibold italic">
                Verified Technical Evaluation & Aptitude Verification
              </span>
            </div>

            {/* Recipient Statement */}
            <div className="text-center max-w-2xl mx-auto space-y-4 my-6">
              <p className="text-xs sm:text-sm text-slate-600 font-serif italic">
                This is to officially certify that
              </p>

              <div className="py-2 border-b-2 border-[#d4af37]/60 inline-block px-8 min-w-[280px]">
                <span className="text-2xl sm:text-3xl font-black font-heading text-[#0a1128] tracking-tight">
                  {candidate.fullName}
                </span>
                <span className="text-xs font-mono font-bold text-slate-500 block mt-0.5">
                  Candidate ID: <strong className="text-blue-900">{candidate.id}</strong>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
                has successfully appeared for, cleared, and demonstrated verified competency in the specialized professional assessment:
              </p>

              {/* Subject Title & Tier */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50/80 via-white to-amber-50/80 border border-[#d4af37]/40 shadow-xs">
                <span className="text-base sm:text-xl font-black text-[#0a1128] block font-heading">
                  {badge.assessmentTitle}
                </span>
                <div className="flex flex-wrap items-center justify-center gap-3 mt-2 text-xs font-bold">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-xs">
                    ★ {badge.badgeLevel}
                  </span>
                  <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-mono">
                    Score: {badge.scorePercentage}% ({badge.correctAnswers}/{badge.totalQuestions} Questions Cleared)
                  </span>
                  <span className="text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                    {badge.assessmentType}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed max-w-xl mx-auto italic">
                The candidate's score, time of completion, and responses have been logged under the immutable MMP SHIELD™ audit ledger and are accessible to verified enterprise employers across India.
              </p>
            </div>

            {/* Bottom Row: Official Gold Visual Seal, Serial, and Signatures */}
            <div className="mt-10 pt-6 border-t-2 border-[#d4af37]/40 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              {/* Left: Certificate Serial & Verification QR */}
              <div className="text-left space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-white border border-slate-300 rounded-lg p-1 flex items-center justify-center shadow-xs">
                    <QrCode className="w-10 h-10 text-slate-800" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Certificate Serial</span>
                    <span className="font-mono font-bold text-slate-900 text-[11px] block">{certSerial}</span>
                    <span className="text-[10px] text-slate-500 block">Date: {badge.completedAt}</span>
                  </div>
                </div>
              </div>

              {/* Center: Radiant Royal Gold Visual Seal */}
              <div className="flex justify-center">
                <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-[#9c7717] via-[#ffd700] to-[#daa520] p-1 shadow-xl shadow-amber-950/20 border-2 border-[#fff2a3] flex items-center justify-center text-center">
                  {/* Inner Seal Ring */}
                  <div className="w-full h-full rounded-full border border-dashed border-[#543b00] bg-gradient-to-b from-[#f9df74] to-[#c99516] flex flex-col items-center justify-center text-slate-950 p-1">
                    <ShieldCheck className="w-6 h-6 text-[#543b00] stroke-[2.5]" />
                    <span className="text-[8px] font-black uppercase tracking-wider font-heading leading-tight mt-0.5">
                      MMP SHIELD™
                    </span>
                    <span className="text-[7px] font-bold uppercase tracking-tight text-[#453000]">
                      OFFICIAL SEAL
                    </span>
                    <span className="text-[6.5px] font-mono font-semibold text-[#543b00]">
                      ★ VERIFIED ★
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Authorized Signatures */}
              <div className="text-right space-y-1 text-xs">
                <div className="space-y-0.5">
                  <div className="font-serif italic text-sm text-[#0a1128] font-bold">
                    Praveen M. Biradar
                  </div>
                  <div className="w-32 h-0.5 bg-slate-400 ml-auto" />
                  <span className="text-[10px] font-bold text-slate-700 block uppercase">
                    Head of Verification Operations
                  </span>
                  <span className="text-[9px] text-slate-500 block">
                    MMP Manpower Services, Davangere
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
