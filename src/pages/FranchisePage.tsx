import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  DollarSign,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Send,
  AlertTriangle,
  Briefcase,
  Users,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { MmpLogo } from '../components/common/MmpLogo';

interface Props {
  setActivePage: (page: string) => void;
}

export const FranchisePage: React.FC<Props> = ({ setActivePage }) => {
  const { submitFranchiseInquiry } = useApp();

  const [form, setForm] = useState({
    fullName: '',
    mobile: '+91 ',
    email: '',
    city: '',
    state: 'Karnataka',
    hasOfficeSpace: false,
    investmentCapacity: '₹5 Lakh - ₹8 Lakh',
  });

  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = submitFranchiseInquiry(form);
    setSubmittedInquiryId(res.id);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-950 via-amber-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-amber-500/40 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <MmpLogo size="sm" showText={false} />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
              MMP DISTRICT EXPANSION PROGRAM
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading leading-tight">
            MMP FRANCHISE OPPORTUNITY
          </h1>
          <p className="text-sm sm:text-base text-amber-200 font-semibold">
            Build a Local Recruitment & Manpower Service Outlet in Your District
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Partner with Karnataka's established 15+ year recruitment brand. Open a turnkey recruitment center with full ERP software access, candidate databases, employer contracts, and operating training.
          </p>
        </div>
      </div>

      {/* Concept Pillars: 10x10 Office & 5 Lakh Budget */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 font-bold">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900">₹5 Lakh Infrastructure Model</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Lean capital requirement designed for high operational return. Covers interior branding, computing hardware, biometric verification setup, and working capital.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-bold">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Compact 10×10 Office Footprint</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Simple 100 sq.ft. commercial office space in prime district hubs (near bus terminals, educational colleges, or industrial belts) is ideal for walk-in operations.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 font-bold">
            <Briefcase className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Centralized MMP Support & Training</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Comprehensive recruiter onboarding, CRM software licenses, legal contract formats, and regional client requisition allocations directly from headquarters.
          </p>
        </div>
      </div>

      {/* Mandatory Business Opportunity & Returns Disclaimer (Section 20) */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 text-xs text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block text-amber-900 uppercase tracking-wide">
            TRANSPARENCY NOTICE ON BUSINESS RETURNS & PROJECTIONS
          </strong>
          <p className="leading-relaxed">
            The MMP Franchise is positioned as an entrepreneurial business opportunity. <strong>Actual revenue, profit margins, and return on investment depend on local market conditions, geographic location, local sales execution, recruitment placement volume, operating overheads, and franchisee performance.</strong> MMP does not provide speculative return guarantees.
          </p>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-xl font-black text-slate-900 font-heading">
            Submit Franchise Expression of Interest
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Our expansion team will schedule a site feasibility review with you within 48 hours.
          </p>
        </div>

        {!submittedInquiryId ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="e.g. Basavaraj Bellary"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:border-amber-600 outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Number *</label>
                <input
                  type="text"
                  required
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:border-amber-600 outline-hidden font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:border-amber-600 outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Proposed City / Taluk *</label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="e.g. Hospet, Shimoga, Bellary, Gulbarga"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:border-amber-600 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">State</label>
                <input
                  type="text"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:border-amber-600 outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Investment Capacity</label>
                <select
                  value={form.investmentCapacity}
                  onChange={(e) => setForm({ ...form, investmentCapacity: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:border-amber-600 outline-hidden bg-white"
                >
                  <option value="₹5 Lakh">₹5 Lakh (Standard 10×10 Model)</option>
                  <option value="₹5 Lakh - ₹8 Lakh">₹5 Lakh - ₹8 Lakh</option>
                  <option value="₹10 Lakh+">₹10 Lakh+ (District Hub)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Do you own or lease office space?</label>
                <select
                  value={form.hasOfficeSpace ? 'yes' : 'no'}
                  onChange={(e) => setForm({ ...form, hasOfficeSpace: e.target.value === 'yes' })}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:border-amber-600 outline-hidden bg-white"
                >
                  <option value="no">No, will identify after approval</option>
                  <option value="yes">Yes, commercial office ready</option>
                </select>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-amber-600 text-white hover:text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Franchise Enquiry</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-amber-700 mx-auto" />
            <h4 className="font-bold text-sm text-slate-900">Franchise Inquiry Received!</h4>
            <span className="font-mono text-xs font-bold text-amber-800">Reference ID: {submittedInquiryId}</span>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Thank you, {form.fullName}. An MMP expansion manager will connect with you via mobile {form.mobile} to share the franchise disclosure pack.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
