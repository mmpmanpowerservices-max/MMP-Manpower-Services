import React from 'react';
import { Shield, FileText, AlertTriangle } from 'lucide-react';
import { MmpLogo } from '../components/common/MmpLogo';

interface Props {
  pageType: 'terms' | 'privacy' | 'refund';
  setActivePage: (page: string) => void;
}

export const PolicyPages: React.FC<Props> = ({ pageType, setActivePage }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Official Header Badge */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#030a1c] via-[#091a3e] to-[#040d24] rounded-2xl border border-[#d4af37]/40 shadow-lg text-white">
        <div className="flex items-center gap-3">
          <MmpLogo size="sm" showText={false} />
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#f5d061] font-mono block">
              MMP MANPOWER SERVICES • REGULATORY COMPLIANCE
            </span>
            <span className="text-xs text-slate-300">
              Official Corporate Policies & Operational Framework
            </span>
          </div>
        </div>
        <div className="hidden sm:block text-right text-[11px] font-mono text-amber-200">
          CIN / Reg: Karnataka & PAN-India
        </div>
      </div>

      {pageType === 'terms' && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              LEGAL & REGULATORY FRAMEWORK
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-1">
              Terms & Conditions & Employer Policy
            </h1>
            <p className="text-xs text-slate-500 mt-1">Effective Date: October 2026</p>
          </div>

          <section className="space-y-2">
            <h3 className="font-bold text-base text-slate-900">1. Candidate Services & Disclaimer</h3>
            <p>
              MMP Membership provides access to MMP recruitment services, opportunity matching, job alerts, and career support. Membership does <strong>NOT guarantee employment, interview selection, or job placement</strong>. Employment decisions rest exclusively with the respective hiring employer based on candidate suitability and qualifications.
            </p>
            <p>
              Registration, Membership, Job Alert Subscription, Fast Track, Recruitment Services, and Placement are independent, distinct professional services.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-base text-slate-900">2. Employer Registration & Anti-Bypass Agreement</h3>
            <p>
              Standard employer registration review fee is <strong>₹3,000 (non-refundable)</strong>, subject to applicable MMP terms.
            </p>
            <p>
              <strong>Anti-Bypass Policy:</strong> Candidates introduced or presented by MMP Manpower Services must <em>not be bypassed for direct hiring</em> outside the agreed MMP recruitment process. Any unauthorized direct employment of an MMP-introduced candidate without prior written consent shall constitute a breach of terms, incurring applicable commercial placement fees and legal remedies.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-base text-slate-900">3. Verification & MMP SHIELD™</h3>
            <p>
              MMP reserves the right to authenticate government identity proofs, educational marksheets, and GST/company filings. Submitting forged documents will result in immediate suspension and blacklisting.
            </p>
          </section>
        </div>
      )}

      {pageType === 'privacy' && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              DATA INTEGRITY & PRIVACY
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-1">
              Privacy Policy & Sensitive Data Protection
            </h1>
            <p className="text-xs text-slate-500 mt-1">Compliance with Digital Data Protection Norms</p>
          </div>

          <section className="space-y-2">
            <h3 className="font-bold text-base text-slate-900">1. Candidate Information Security</h3>
            <p>
              MMP Manpower Services never exposes candidate personal documents (such as full unmasked Aadhaar numbers, residential street addresses, or private financial records) publicly on the open web.
            </p>
            <p>
              Candidate profiles are shared exclusively with verified, registered employers who have executed non-disclosure and recruitment agreements with MMP.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-base text-slate-900">2. Communications & Job Alerts</h3>
            <p>
              Candidates opting into Job Alerts consent to receiving transactional SMS and WhatsApp notifications regarding verified job openings. You may modify your communication preferences in your Candidate Dashboard.
            </p>
          </section>
        </div>
      )}

      {pageType === 'refund' && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              TRANSPARENT BILLING
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-1">
              Refund & Cancellation Policy
            </h1>
          </div>

          <section className="space-y-2">
            <h3 className="font-bold text-base text-slate-900">1. Employer Registration Fee</h3>
            <p>
              The employer registration verification fee (₹3,000) is strictly non-refundable once administrative compliance processing and credential validation has commenced.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-base text-slate-900">2. Candidate Membership & Job Alerts</h3>
            <p>
              Candidate Membership, Fast Track (₹3,400), and Job Alert plans provide immediate digital provisioning, SMS broadcasts, and profile inclusion. Fees are non-refundable once services have been activated, as clear terms are agreed prior to payment.
            </p>
          </section>
        </div>
      )}
    </div>
  );
};
