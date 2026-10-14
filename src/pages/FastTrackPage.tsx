import React, { useState } from 'react';
import {
  Zap,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Search,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MmpLogo } from '../components/common/MmpLogo';

interface Props {
  setActivePage: (page: string) => void;
  onOpenFastTrackPayment: () => void;
}

export const FastTrackPage: React.FC<Props> = ({ setActivePage, onOpenFastTrackPayment }) => {
  const { candidates } = useApp();
  const [lookupId, setLookupId] = useState('MMP-CAN-100234');
  const [trackResult, setTrackResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const candidate = candidates.find(
      (c) => c.id.toUpperCase() === lookupId.trim().toUpperCase()
    );
    setTrackResult(candidate || null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#030a1c] via-[#091a3e] to-[#040d24] text-white rounded-3xl p-8 sm:p-12 border border-[#d4af37]/40 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f5d061] text-xs font-bold font-mono">
              <MmpLogo size="xs" showText={false} />
              <span>MMP EXPEDITED RECRUITMENT PROCESSING</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-heading leading-tight text-white">
              MMP Fast Track Service
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Priority candidate profile processing, expedited screening, and fast-lane profile circulation to verified employers across Karnataka and PAN-India.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20">
                <span className="text-[10px] uppercase font-bold text-slate-300 block">Service Fee</span>
                <span className="text-2xl font-black text-rose-300 font-heading">₹3,400</span>
              </div>
              <button
                onClick={onOpenFastTrackPayment}
                className="px-6 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-rose-900/40 cursor-pointer transition-all flex items-center gap-2"
              >
                <span>Activate Fast Track (₹3,400)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="hidden lg:flex shrink-0 p-3 rounded-2xl bg-[#071230] border border-[#d4af37]/50 shadow-xl shadow-amber-950/40">
            <MmpLogo size="lg" showText={false} />
          </div>
        </div>
      </div>

      {/* Mandatory Statutory Notice (Section 8) */}
      <div className="max-w-4xl mx-auto bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 text-xs text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block text-amber-900 uppercase tracking-wide">
            TRANSPARENCY DECLARATION: PAYMENT DOES NOT GUARANTEE EMPLOYMENT
          </strong>
          <p className="leading-relaxed">
            MMP Fast Track is an administrative priority processing service designed to expedite profile audit, candidate screening, and recruitment circulation. <strong>Payment of ₹3,400 does NOT guarantee employment, job offer, or interview selection.</strong> Selection is solely at the discretion of the recruiting employer based on candidate merit and qualifications.
          </p>
        </div>
      </div>

      {/* 5 Core Deliverables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          {
            title: 'Priority Profile Processing',
            desc: 'Expedited document audit and verification within 24 hours of document submission.',
            icon: Clock,
          },
          {
            title: 'Recruitment Assistance',
            desc: 'Direct consultation with lead recruiter to optimize resume positioning.',
            icon: Zap,
          },
          {
            title: 'Opportunity Matching',
            desc: 'Immediate matching across active private and corporate vacancies.',
            icon: TrendingUp,
          },
          {
            title: 'Candidate Support Desk',
            desc: 'Direct WhatsApp and calling channel for real-time recruitment updates.',
            icon: ShieldCheck,
          },
          {
            title: 'Live Status Tracking',
            desc: 'Digital portal tracking showing verified candidate status across hiring stages.',
            icon: CheckCircle2,
          },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">{item.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Fast Track Status Tracking Simulator */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-3xl mx-auto shadow-sm">
        <h3 className="text-lg font-black text-slate-900 font-heading mb-2">
          Fast Track Processing Tracker
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          Enter your Candidate ID to view current fast-track status and recruiter notes.
        </p>

        <form onSubmit={handleTrack} className="flex gap-2 mb-6">
          <input
            type="text"
            required
            value={lookupId}
            onChange={(e) => setLookupId(e.target.value)}
            placeholder="e.g. MMP-CAN-100234"
            className="flex-1 text-xs font-mono font-bold px-3 py-2.5 border border-slate-300 rounded-xl uppercase outline-hidden"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-slate-900 hover:bg-blue-900 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Check Status</span>
          </button>
        </form>

        {searched && (
          <div>
            {trackResult ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div>
                    <strong className="text-slate-900 block text-sm">{trackResult.fullName}</strong>
                    <span className="font-mono text-slate-500 text-[11px]">{trackResult.id}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                    Fast Track Active
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Verification:</span>
                    <strong className="text-emerald-700">{trackResult.verificationStatus}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Current Stage:</span>
                    <strong className="text-blue-700">{trackResult.status}</strong>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                  <strong>Recruitment Note:</strong> Profile prioritized in active manufacturing and banking candidate dossiers.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 text-center">
                No active Fast Track record found for Candidate ID "{lookupId}". You can enroll above.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
