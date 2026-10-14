import React from 'react';
import {
  Bell,
  Check,
  Zap,
  MessageSquare,
  ShieldAlert,
  ArrowRight,
  Info,
  Smartphone,
  QrCode,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Phone,
  Mail,
  Award,
  Sparkles,
  CheckCircle2,
  Clock,
  UserCheck,
} from 'lucide-react';
import { JOB_ALERT_PLANS, OFFICIAL_SUPPORT_TEAM } from '../data/mockData';
import { JobAlertPlan } from '../types';
import { MmpLogo } from '../components/common/MmpLogo';

interface Props {
  setActivePage: (page: string) => void;
  onSelectAlertPlan: (plan: JobAlertPlan) => void;
}

export const JobAlertsPage: React.FC<Props> = ({ setActivePage, onSelectAlertPlan }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Official Gold & Navy Hero matching Brochure Image 4 */}
      <div className="bg-gradient-to-r from-[#030714] via-[#091535] to-[#040918] text-white rounded-3xl p-8 sm:p-12 border border-[#d4af37]/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <div className="flex justify-center mb-2">
            <MmpLogo size="lg" showText={false} />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1432] border border-[#d4af37]/40 text-[#f5d061] text-xs font-black tracking-widest font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>MMP JOB ALERT SUBSCRIPTION PLANS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading leading-tight uppercase tracking-tight text-white">
            RIGHT OPPORTUNITY. RIGHT TIME. RIGHT YOU.
          </h1>
          <p className="text-sm sm:text-base font-bold text-[#f5d061] font-mono tracking-wide">
            Premium Job Alerts • Verified Opportunities • Faster Access • Better Future
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 rounded-full border border-amber-400/30 text-amber-300 text-xs font-black">
            ★ TRUSTED BY THOUSANDS OF JOB SEEKERS ACROSS BHARAT ★
          </div>
        </div>
      </div>

      {/* Service Distinction Notice */}
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-5 text-xs text-blue-950 flex items-start gap-3.5 shadow-xs">
        <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block text-blue-900 font-heading text-sm">
            SERVICE DISTINCTION: JOB ALERT SUBSCRIPTION ≠ CANDIDATE MEMBERSHIP
          </strong>
          <p className="leading-relaxed text-slate-700">
            Job Alert plans are specialized digital broadcast notifications delivering daily verified vacancies via WhatsApp and SMS. They operate independently from comprehensive <em>Candidate Membership Plans</em>. Candidates are free to select either or both services according to their requirements.
          </p>
        </div>
      </div>

      {/* 5-TIER SUBSCRIPTION MATRIX (Brochure Image 4) */}
      <div className="space-y-4">
        <div className="text-center">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#9c7717] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            OFFICIAL 5-TIER SUBSCRIPTION MATRIX
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-2">
            Select Your Job Alert Plan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {JOB_ALERT_PLANS.map((plan, idx) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-5 bg-white flex flex-col justify-between transition-all relative ${
                plan.recommended
                  ? 'border-2 border-[#d4af37] shadow-xl ring-4 ring-[#d4af37]/15'
                  : 'border border-slate-200 shadow-xs hover:border-[#d4af37]/50'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                {/* Step indicator header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#0a1128] text-[#f5d061] text-xs font-black flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    <h3 className="font-heading font-black text-sm text-[#0a1128] truncate">
                      {plan.name}
                    </h3>
                  </div>
                </div>

                <div className="my-4 text-center">
                  <div className="text-3xl font-black text-[#0a1128] font-heading">
                    {typeof plan.price === 'number' ? `₹${plan.price}` : plan.price}
                  </div>
                  <span className="text-[11px] text-[#9c7717] font-bold block mt-0.5 font-mono">
                    / {plan.frequency}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-4 leading-normal min-h-[2.5rem]">
                  {plan.description}
                </p>

                <ul className="space-y-2 mb-6 border-t border-slate-100 pt-3">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onSelectAlertPlan(plan)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                  plan.recommended
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b08d24] text-slate-950 font-black hover:brightness-110'
                    : 'bg-[#0a1128] hover:bg-[#152554] text-[#f5d061] border border-[#d4af37]/40'
                }`}
              >
                {typeof plan.price === 'number' ? `Subscribe ₹${plan.price}` : 'Request Custom'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SCAN & SUBSCRIBE NOW BANNER with 4 Simple Steps (Brochure Image 4) */}
      <div className="bg-gradient-to-b from-[#040918] via-[#091535] to-[#040918] text-white rounded-3xl p-6 sm:p-10 border-2 border-[#d4af37]/50 shadow-2xl relative overflow-hidden">
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#f5d061]">
            START YOUR JOURNEY TO THE RIGHT CAREER!
          </span>
          <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
            Get Instant Access to Verified Job Alerts
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Verified Opportunities • Faster Access • Better Future
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* QR Code Presentation Box */}
          <div className="lg:col-span-4 flex flex-col items-center text-center p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-[#d4af37]/40 shadow-inner">
            <span className="text-xs font-bold text-[#f5d061] uppercase tracking-wider mb-3 font-mono">
              SCAN & SUBSCRIBE NOW
            </span>
            <div className="w-44 h-44 bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center border-2 border-[#d4af37]/50">
              <QrCode className="w-36 h-36 text-slate-900" />
            </div>
            <span className="text-[11px] text-slate-300 mt-3 font-mono">
              WhatsApp Support: <strong>{OFFICIAL_SUPPORT_TEAM.phonePrimary}</strong>
            </span>
          </div>

          {/* 4 Simple Steps */}
          <div className="lg:col-span-8 space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-[#f5d061] font-mono mb-2">
              Simple 4-Step Activation Process:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold shrink-0 text-sm">
                  1
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">Scan the QR Code</h5>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    Scan with your phone camera or click online checkout to open instant registration.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-[#f5d061] flex items-center justify-center font-bold shrink-0 text-sm">
                  2
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">Choose Your Plan</h5>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    Select Starter (₹199), Smart (₹399), Pro (₹499), or Elite (₹599).
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold shrink-0 text-sm">
                  3
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">Complete Transaction</h5>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    Pay securely via UPI / Card / NetBanking and share payment confirmation.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold shrink-0 text-sm">
                  4
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">Get Instant Activation</h5>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    Receive your activation SMS & WhatsApp broadcast enrollment confirmation.
                  </p>
                </div>
              </div>
            </div>

            {/* Crucial WhatsApp notice from Brochure */}
            <div className="mt-4 p-3.5 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl flex items-center gap-3 text-xs text-emerald-200">
              <Smartphone className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                <strong>CRITICAL REQUIREMENT:</strong> Please save the MMP official number{' '}
                <strong className="text-white underline">{OFFICIAL_SUPPORT_TEAM.phonePrimary}</strong> in your phone contacts, otherwise you will not receive our automated WhatsApp broadcast alerts.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 IMPORTANT TERMS & CONDITIONS (Exact Policy from Brochure Image 4) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#9c7717]">
            LEGAL, POLICY & STATUTORY SAFEGUARDS
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
            Important Terms & Conditions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Pillar 1 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-xs">
                1
              </span>
              <h4 className="font-black text-slate-900 text-sm font-heading">
                Payment & Refund Policy
              </h4>
            </div>
            <p className="text-slate-600 leading-relaxed">
              All fees paid for MMP Premium Plans (₹199, ₹399, ₹499, ₹599) are <strong>strictly non-refundable and non-transferable</strong> under any circumstances. MMP provides Job Information Delivery Services and Profile Verification; we do not sell, promise, or guarantee a final employment job offer.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 font-black flex items-center justify-center text-xs">
                2
              </span>
              <h4 className="font-black text-slate-900 text-sm font-heading">
                Candidate Authenticity & Behavior
              </h4>
            </div>
            <p className="text-slate-600 leading-relaxed">
              You certify that all documents, educational qualifications, and identity proofs uploaded are 100% genuine. If an interview is scheduled for you and you fail to attend without a <strong>24-hour prior warning</strong>, your membership will be permanently banned without refund.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 font-black flex items-center justify-center text-xs">
                3
              </span>
              <h4 className="font-black text-slate-900 text-sm font-heading">
                Anti-Fraud Disclaimer
              </h4>
            </div>
            <p className="text-slate-600 leading-relaxed">
              MMP never asks candidates for extra money to bribe company managers or pass interviews. <strong>Do not pay anyone cash for a job.</strong> MMP is not responsible for money lost to external fraudsters or unauthorized third parties.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 font-black flex items-center justify-center text-xs">
                4
              </span>
              <h4 className="font-black text-slate-900 text-sm font-heading">
                Limitation of Liability
              </h4>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Once a candidate joins an employer, the employment contract is strictly between the employer and the employee. MMP is not legally or financially responsible for workplace disputes, company policy changes, or salary delays.
            </p>
          </div>
        </div>

        <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium font-mono">
          YOUR CAREER. OUR MISSION. LET&apos;S BUILD YOUR FUTURE TOGETHER!
        </div>
      </div>
    </div>
  );
};
