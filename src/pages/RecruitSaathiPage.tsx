import React, { useState } from 'react';
import {
  Users,
  Building,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  HeartHandshake,
  Target,
  Compass,
} from 'lucide-react';
import { MmpLogo } from '../components/common/MmpLogo';

interface Props {
  setActivePage: (page: string) => void;
}

export const RecruitSaathiPage: React.FC<Props> = ({ setActivePage }) => {
  const [activeTab, setActiveTab] = useState<'seeker' | 'employer'>('seeker');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-blue-800/40 shadow-xl text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex justify-center mb-2">
            <MmpLogo size="sm" showText={false} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/20 px-3.5 py-1 rounded-full border border-amber-400/30">
            MMP SIGNATURE RECRUITMENT INITIATIVE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-heading leading-tight">
            RECRUIT SAATHI
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Your trusted career companion and hiring partner. Connecting deserving candidates with authentic opportunities, and supporting employers with pre-screened manpower across Karnataka.
          </p>

          {/* Dual CTAs as requested in Section 9 */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setActiveTab('seeker');
                setActivePage('candidate-register');
              }}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-blue-400/30"
            >
              <Users className="w-4 h-4 text-blue-200" />
              <span>I AM A JOB SEEKER</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('employer');
                setActivePage('post-vacancy');
              }}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-amber-300"
            >
              <Building className="w-4 h-4 text-slate-950" />
              <span>I AM AN EMPLOYER</span>
            </button>
          </div>
        </div>
      </div>

      {/* Saathi Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('seeker')}
            className={`px-6 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'seeker'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            For Job Seekers (Saathi Support)
          </button>
          <button
            onClick={() => setActiveTab('employer')}
            className={`px-6 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'employer'
                ? 'bg-purple-700 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            For Employers (Talent Partner)
          </button>
        </div>
      </div>

      {/* Content based on Tab */}
      {activeTab === 'seeker' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Career Direction & Advisory</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Understand industry compensation benchmarks, high-demand local trades (electronics assembly, banking CASA, warehouse dispatch), and realistic career paths.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">MMP Skill Assessment & Endorsement</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Take certified assessments in Tally, SMT assembly, logistics, and retail banking to prove your competency and earn verified MMP SHIELD™ badges.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Interview Readiness & Direct Introductions</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Structured preparation for HR questions, document checklist verification, and direct introduction to verified hiring managers.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-700">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Local Candidate Sourcing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Deep regional sourcing networks across Davanagere, Raichur, Bellary, Hubli, and rural taluks, ensuring dependable candidate availability.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Pre-Verified Credentials</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Aadhaar, education marksheets, and practical skill test scores audited before candidate resumes land on your desk.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Flexible Hiring Formats</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Choose QuickConnect (pay-per-hire), monthly recruitment retainers, or TotalCare outsourced workforce staffing.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
