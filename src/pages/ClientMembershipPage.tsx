import React from 'react';
import {
  Check,
  Shield,
  Building,
  Zap,
  Award,
  ArrowRight,
  Headphones,
  CheckCircle2,
  Lock,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  Layers,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import {
  CLIENT_MEMBERSHIP_PLANS,
  STRATEGIC_SERVICE_MODELS,
  FINANCIAL_STRUCTURE,
  MMP_SHIELD_EMPLOYER_POINTS,
  OFFICIAL_SUPPORT_TEAM,
} from '../data/mockData';
import { ClientMembershipPlan } from '../types';
import { MmpLogo } from '../components/common/MmpLogo';

interface Props {
  setActivePage: (page: string) => void;
  onSelectClientPlan: (plan: ClientMembershipPlan) => void;
}

export const ClientMembershipPage: React.FC<Props> = ({ setActivePage, onSelectClientPlan }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header in Corporate Gold & Navy */}
      <div className="bg-gradient-to-r from-[#030714] via-[#091535] to-[#040918] text-white rounded-3xl p-8 sm:p-12 border border-[#d4af37]/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="relative max-w-4xl space-y-4">
          <div className="flex items-center gap-3">
            <MmpLogo size="sm" showText={false} />
            <span className="text-xs font-bold uppercase tracking-widest text-[#f5d061] bg-[#d4af37]/20 px-3.5 py-1 rounded-full border border-[#d4af37]/40 font-mono">
              EXCLUSIVE EMPLOYER MEMBERSHIP SCHEME
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading leading-tight uppercase text-white">
            STRATEGIC RECRUITMENT & WORKFORCE MEMBERSHIP
          </h1>
          <p className="text-sm sm:text-base font-bold text-[#f5d061] font-mono tracking-wide">
            MORE ACCESS • MORE TALENT • MORE VALUE • HARBINGERS OF A NEW BHARAT
          </p>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Gain verified ongoing access to Karnataka and Pan-India pre-screened talent. 
            Reduce hiring cycles, eliminate fraudulent profiles, and streamline workforce management with institutional process controls.
          </p>
        </div>
      </div>

      {/* SECTION 1: STRATEGIC SERVICE MODELS (Brochure Image 1) */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#9c7717] bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
            STRATEGIC SERVICE ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            Strategic Service Models
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Choose the engagement model that matches your operational scale and staffing timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STRATEGIC_SERVICE_MODELS.map((model) => (
            <div
              key={model.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 hover:border-[#d4af37] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#0a1128] text-[#f5d061]">
                    {model.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">{model.subtitle}</span>
                </div>

                <h3 className="text-xl font-black text-[#0a1128] font-heading">{model.name}</h3>
                <p className="text-xs font-semibold text-[#856512] mt-0.5">{model.subtitle}</p>

                <div className="my-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">Pricing Model</span>
                  <strong className="text-slate-900 block mt-0.5">{model.pricingModel}</strong>
                  <span className="text-[11px] text-[#9c7717] block mt-1 italic">{model.description}</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {model.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setActivePage('post-vacancy')}
                className="w-full py-2.5 bg-[#0a1128] hover:bg-[#152554] text-[#f5d061] border border-[#d4af37]/40 rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs"
              >
                Inquire for {model.name} →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: EXCLUSIVE EMPLOYER MEMBERSHIP SCHEME (Brochure Image 1) */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#9c7717] bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
            TALENT SUBSCRIPTION PACKAGES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            Exclusive Employer Membership Scheme
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Enjoy priority verification, professional matching, talent pipeline access, and exclusive enrollment bonuses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {CLIENT_MEMBERSHIP_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-5 bg-white flex flex-col justify-between transition-all relative ${
                plan.recommended
                  ? 'border-2 border-[#d4af37] shadow-xl ring-4 ring-[#d4af37]/15'
                  : 'border border-slate-200 shadow-xs hover:border-[#d4af37]/60'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className={`px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
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
                <div className="text-center pt-2 pb-3 border-b border-slate-100">
                  <h3 className="font-heading font-black text-base text-slate-900">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-2xl font-black text-[#0a1128] font-heading">
                      ₹{plan.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-slate-500 block font-semibold">/ {plan.duration}</span>
                  </div>
                </div>

                {/* Candidate Limits Box */}
                <div className="bg-[#fcfaf2] border border-amber-200 rounded-xl p-2.5 my-3 text-[11px] text-slate-900 font-bold space-y-1 text-center">
                  <div className="text-[#856512] font-mono">{plan.candidateProfilesLimit} Access</div>
                  <div className="text-slate-600 text-[10px]">{plan.jobPostingsLimit}</div>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-[#b08d24] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onSelectClientPlan(plan)}
                className={`w-full py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer uppercase tracking-wider ${
                  plan.recommended
                    ? 'bg-gradient-to-r from-[#ffe685] via-[#d4af37] to-[#b08d24] text-slate-950 shadow-md hover:brightness-110'
                    : 'bg-[#0a1128] hover:bg-[#152554] text-[#f5d061] border border-[#d4af37]/40'
                }`}
              >
                Enroll as Client
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: FINANCIAL STRUCTURE, MASTER TERMS & MMP SHIELD (Brochure Image 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Financial Structure & Master Terms */}
        <div className="lg:col-span-6 space-y-6">
          {/* Financial Structure */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9c7717] font-mono block">
              INSTITUTIONAL FINANCIAL STRUCTURE
            </span>
            <h3 className="text-lg font-black text-slate-900 font-heading">
              Transparent Commercial Structure
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <span className="text-slate-500 block text-[11px] font-mono">Employer Registration Fee</span>
                <strong className="text-xl font-black text-slate-900 font-heading block mt-0.5">₹3,000</strong>
                <span className="text-[10px] text-rose-700 font-semibold block mt-1">Non-Refundable • 1-Year Base Validity</span>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <span className="text-slate-500 block text-[11px] font-mono">Security Deposit / Advance</span>
                <strong className="text-xl font-black text-slate-900 font-heading block mt-0.5">20% – 50%</strong>
                <span className="text-[10px] text-emerald-700 font-semibold block mt-1">Adjustable / Refundable subject to closure</span>
              </div>
            </div>
          </div>

          {/* Master Terms & Conditions */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9c7717] font-mono block">
              MASTER TERMS & CONDITIONS
            </span>
            <div className="space-y-2 text-xs">
              {FINANCIAL_STRUCTURE.masterTerms.map((term, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
                  <span className="font-bold text-slate-800">{term.title}</span>
                  <span className="text-emerald-800 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                    {term.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: MMP SHIELD 10-Point Employer Protection */}
        <div className="lg:col-span-6 bg-gradient-to-b from-[#030714] via-[#091535] to-[#040918] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#d4af37]/40 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#0a1128] border border-[#d4af37]/40 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-[#d4af37]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#f5d061] font-mono">
                MMP SHIELD™ PROTOCOL
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white font-heading">
                Employer Protection & Process Control (10 Gates)
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2">
            {MMP_SHIELD_EMPLOYER_POINTS.map((pt, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Check className="w-4 h-4 text-[#f5d061] shrink-0" />
                <span className="text-slate-200 text-[11px] font-medium">{pt}</span>
              </div>
            ))}
          </div>

          {/* National Support Team Address Box */}
          <div className="mt-4 pt-4 border-t border-white/15 text-xs text-slate-300 space-y-1">
            <span className="font-bold text-[#f5d061] font-mono uppercase text-[10px] block">
              NATIONAL SUPPORT TEAM & HEADQUARTERS
            </span>
            <p className="leading-snug">{OFFICIAL_SUPPORT_TEAM.headOfficeAddress}</p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono text-[#f5d061]">
              <span>Phone: {OFFICIAL_SUPPORT_TEAM.phonePrimary}</span>
              <span>•</span>
              <span>Email: {OFFICIAL_SUPPORT_TEAM.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
