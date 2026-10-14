import React from 'react';
import {
  Check,
  Shield,
  HelpCircle,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  Zap,
  Lock,
  Award,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Eye,
  FileText,
  Clock,
  Phone,
  Mail,
  Users,
} from 'lucide-react';
import { CANDIDATE_MEMBERSHIP_PLANS, OFFICIAL_SUPPORT_TEAM } from '../data/mockData';
import { CandidateMembershipPlan } from '../types';
import { MmpLogo } from '../components/common/MmpLogo';

interface Props {
  setActivePage: (page: string) => void;
  onSelectPlan: (plan: CandidateMembershipPlan) => void;
}

export const CandidateMembershipPage: React.FC<Props> = ({ setActivePage, onSelectPlan }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Official Gold & Navy Hero matching Brochure Image 5 */}
      <div className="bg-gradient-to-r from-[#030714] via-[#091535] to-[#040918] text-white rounded-3xl p-8 sm:p-12 border border-[#d4af37]/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <div className="flex justify-center mb-2">
            <MmpLogo size="lg" showText={false} />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1432] border border-[#d4af37]/40 text-[#f5d061] text-xs font-black tracking-widest font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>MMP SHIELD™ • YOUR SAFETY OUR PRIORITY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading leading-tight uppercase tracking-tight text-white">
            BUILD YOUR CAREER. JOIN THE RIGHT NETWORK.
          </h1>
          <p className="text-sm sm:text-base font-bold text-[#f5d061] font-mono tracking-wide">
            YOUR WORKFORCE. OUR STRENGTH. YOUR SUCCESS.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
            <span className="flex items-center gap-1 text-[#f5d061] font-bold">
              ✓ Verified Opportunities
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-200 font-bold">
              ✓ Expert Guidance
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              ✓ Career Growth
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-blue-300 font-bold">
              ✓ Safe & Transparent
            </span>
          </div>
        </div>
      </div>

      {/* Mandatory Statutory Notice */}
      <div className="max-w-4xl mx-auto bg-amber-50/95 border-2 border-amber-300 rounded-3xl p-6 shadow-xs">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-amber-950">
            <h4 className="font-black uppercase tracking-wider text-amber-900 font-heading">
              IMPORTANT CANDIDATE TRUST POLICY & TRANSPARENCY DECLARATION
            </h4>
            <p className="leading-relaxed">
              <strong>Membership provides career-support services and access to opportunities.</strong> It does <strong>NOT guarantee employment, interview, selection, salary or joining</strong>. Final placement and selection remain strictly within the employer's prerogative based on merit, practical assessment, and organizational requirements.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Membership Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CANDIDATE_MEMBERSHIP_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-3xl p-6 transition-all flex flex-col justify-between relative bg-white ${
              plan.recommended
                ? 'border-2 border-[#d4af37] shadow-xl ring-4 ring-[#d4af37]/15'
                : 'border border-slate-200 shadow-sm hover:border-[#d4af37]/60'
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span
                  className={`px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    plan.recommended
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md'
                      : 'bg-[#0a1128] text-[#f5d061] border border-[#d4af37]/40'
                  }`}
                >
                  {plan.badge}
                </span>
              </div>
            )}

            <div>
              <div className="text-center pt-2 pb-4 border-b border-slate-100">
                <h3 className="font-heading font-black text-lg text-slate-900">{plan.name}</h3>
                <div className="mt-3 flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-black text-slate-900 font-heading">
                    ₹{plan.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">/ {plan.duration}</span>
                </div>
              </div>

              {/* Feature list */}
              <ul className="space-y-3 my-6">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-[#9c7717] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onSelectPlan(plan)}
              className={`w-full py-3 rounded-xl font-black text-xs transition-all cursor-pointer shadow-md ${
                plan.recommended
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#b08d24] text-slate-950 hover:brightness-110'
                  : 'bg-[#0a1128] hover:bg-[#162758] text-[#f5d061] border border-[#d4af37]/40'
              }`}
            >
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>

      {/* MMP SHIELD™ – 5 LAYER PROTECTION (Brochure Image 5) */}
      <div className="bg-gradient-to-b from-[#030714] via-[#091535] to-[#040918] text-white rounded-3xl p-6 sm:p-10 border-2 border-[#d4af37]/50 shadow-2xl space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-[#f5d061] text-xs font-black font-mono">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span>MMP SHIELD™ SECURITY PROTOCOL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
            MMP SHIELD™ – 5 LAYER PROTECTION
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            A zero-compromise institutional trust architecture ensuring integrity and transparency.
          </p>
        </div>

        {/* 5 Layer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#d4af37]/50 transition-all text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-black mx-auto">
              1
            </div>
            <h4 className="font-black text-sm text-white font-heading">1. VERIFY</h4>
            <p className="text-[11px] text-slate-300 leading-snug">
              Candidate & Employer Verification. Identity, documents & background audits.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#d4af37]/50 transition-all text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center font-black mx-auto">
              2
            </div>
            <h4 className="font-black text-sm text-white font-heading">2. DOCUMENT</h4>
            <p className="text-[11px] text-slate-300 leading-snug">
              Agreement, Terms & Consent. All service scopes and deliverables in writing.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#d4af37]/50 transition-all text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#f5d061] flex items-center justify-center font-black mx-auto">
              3
            </div>
            <h4 className="font-black text-sm text-white font-heading">3. TRACK</h4>
            <p className="text-[11px] text-slate-300 leading-snug">
              Every Introduction Traced. Candidate ID • Job ID • Employer ID logs.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#d4af37]/50 transition-all text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center font-black mx-auto">
              4
            </div>
            <h4 className="font-black text-sm text-white font-heading">4. CONTROL</h4>
            <p className="text-[11px] text-slate-300 leading-snug">
              Official Payments Only. No cash, no personal accounts, secure bank gateway.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#d4af37]/50 transition-all text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-black mx-auto">
              5
            </div>
            <h4 className="font-black text-sm text-white font-heading">5. AUDIT</h4>
            <p className="text-[11px] text-slate-300 leading-snug">
              Complete Records Maintained. Applications, interviews, selections, payments.
            </p>
          </div>
        </div>

        {/* 5 Core Trust Pillars */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-200">
          <span className="flex items-center gap-1.5 text-emerald-400">
            ✓ No Cash Policy
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            ✓ No Original Documents Retained
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            ✓ No False Promises
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            ✓ No &ldquo;Pay Later&rdquo; Traps
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            ✓ Data Privacy & Right to Erasure
          </span>
        </div>
      </div>

      {/* JOIN TODAY! SCAN TO REGISTER & BECOME A MEMBER BANNER */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9c7717] bg-amber-50 px-3 py-1 rounded-full border border-amber-200 font-mono">
            START YOUR CAREER JOURNEY WITH MMP NOW!
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            Join Today • Build Trusted Careers Through Verified Processes
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Head Office: {OFFICIAL_SUPPORT_TEAM.headOfficeAddress}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700 font-mono pt-1">
            <span>Phone: {OFFICIAL_SUPPORT_TEAM.phonePrimary}</span>
            <span>•</span>
            <span>Email: {OFFICIAL_SUPPORT_TEAM.email}</span>
          </div>
        </div>

        <div className="flex flex-col items-center text-center p-4 bg-slate-50 border border-slate-200 rounded-3xl shrink-0">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">
            Scan to Register
          </span>
          <div className="w-36 h-36 bg-white p-2.5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center">
            <QrCode className="w-28 h-28 text-slate-900" />
          </div>
          <span className="text-[10px] text-slate-500 mt-2 font-mono">
            RISE • SKILL • GET PLACED
          </span>
        </div>
      </div>
    </div>
  );
};
