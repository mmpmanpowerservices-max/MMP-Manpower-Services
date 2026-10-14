import React from 'react';
import {
  ArrowRight,
  Shield,
  Briefcase,
  Users,
  Building,
  CheckCircle2,
  Sparkles,
  Zap,
  Award,
  Search,
  PhoneCall,
  Clock,
  MapPin,
  TrendingUp,
  FileCheck,
  Megaphone,
  Palette,
  Layers,
  ChevronRight,
  Globe,
  Compass,
} from 'lucide-react';
import { MmpLogo } from '../components/common/MmpLogo';
import { useApp } from '../context/AppContext';
import { CORPORATE_EXPOSURE } from '../data/mockData';

interface Props {
  setActivePage: (page: string) => void;
  onOpenPayment?: (plan: any) => void;
}

export const HomePage: React.FC<Props> = ({ setActivePage }) => {
  const { jobs } = useApp();
  const featuredJobs = jobs.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Luxury Corporate Gold & Navy Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#030714] via-[#07112c] to-[#040817] text-white pt-12 pb-20 px-4 sm:px-6 border-b border-[#d4af37]/30">
        {/* Shimmering Gold & Navy Radial Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[#d4af37]/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#16295c]/40 blur-[140px] pointer-events-none rounded-full" />

        <div className="relative max-w-7xl mx-auto">
          {/* Centered Brand Emblem Badge */}
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <div className="p-4 sm:p-6 bg-gradient-to-b from-[#0e1e47] via-[#060c20] to-[#020510] rounded-3xl border-2 border-[#d4af37]/70 shadow-2xl shadow-amber-950/60 mb-5 hover:scale-105 transition-all duration-300 relative group flex items-center justify-center">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#d4af37]/25 via-transparent to-[#d4af37]/20 pointer-events-none" />
              <MmpLogo size="hero" showText={false} withContainer={false} />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1432] border border-[#d4af37]/50 text-[#f5d061] text-xs font-black tracking-wide shadow-md mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>OFFICIAL MMP MANPOWER SERVICES RECRUITMENT PORTAL</span>
            </div>
            <p className="text-xs sm:text-sm font-bold tracking-widest text-amber-200/90 uppercase font-mono">
              Empowering Bharat's Growth with Integrity and Trust
            </p>
          </div>

          {/* Main Heading in Radiant Gold Foil */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase font-heading bg-gradient-to-r from-white via-amber-100 to-[#f5d061] bg-clip-text text-transparent">
              BUILDING CAREERS. GROWING BUSINESSES. CONNECTING OPPORTUNITIES.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              MMP Manpower Services connects job seekers and businesses through professional recruitment, skilled & unskilled manpower, and comprehensive staffing solutions across Karnataka and PAN-India.
            </p>
          </div>

          {/* 4 Main Action CTAs in Corporate Gold & Navy */}
          <div className="mt-10 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => setActivePage('find-jobs')}
              className="px-4 py-3.5 bg-gradient-to-r from-[#ffe685] via-[#d4af37] to-[#b08d24] hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-amber-950/30 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95 border border-[#ffe685]/50"
            >
              <Search className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              <span>FIND JOBS</span>
            </button>
            <button
              onClick={() => setActivePage('post-vacancy')}
              className="px-4 py-3.5 bg-gradient-to-r from-[#0d1c44] to-[#081028] hover:border-[#d4af37] text-[#f5d061] font-black text-xs sm:text-sm rounded-2xl shadow-xl transition-all flex flex-col items-center justify-center gap-1 cursor-pointer border border-[#d4af37]/60 active:scale-95"
            >
              <Briefcase className="w-5 h-5 text-[#f5d061]" />
              <span>HIRE TALENT</span>
            </button>
            <button
              onClick={() => setActivePage('candidate-register')}
              className="px-4 py-3.5 bg-[#09132e]/90 hover:bg-[#0f1f4d] text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/20 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95"
            >
              <Users className="w-5 h-5 text-emerald-400" />
              <span>REGISTER CANDIDATE</span>
            </button>
            <button
              onClick={() => setActivePage('employers')}
              className="px-4 py-3.5 bg-[#09132e]/90 hover:bg-[#0f1f4d] text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/20 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95"
            >
              <Building className="w-5 h-5 text-[#f5d061]" />
              <span>REGISTER EMPLOYER</span>
            </button>
          </div>

          {/* Trust Highlights Grid */}
          <div className="mt-12 pt-10 border-t border-[#d4af37]/20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            <div className="p-3.5 bg-[#08122d]/80 rounded-2xl border border-[#d4af37]/30 shadow-xs">
              <span className="text-xl sm:text-2xl font-black text-[#f5d061] font-heading block">15+ Years</span>
              <span className="text-xs text-slate-300 font-medium">Industry Heritage</span>
            </div>
            <div className="p-3.5 bg-[#08122d]/80 rounded-2xl border border-[#d4af37]/30 shadow-xs">
              <span className="text-xl sm:text-2xl font-black text-white font-heading block">Pan-India</span>
              <span className="text-xs text-slate-300 font-medium">Mobility Network</span>
            </div>
            <div className="p-3.5 bg-[#08122d]/80 rounded-2xl border border-[#d4af37]/30 shadow-xs">
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-heading block">6 Sectors</span>
              <span className="text-xs text-slate-300 font-medium">36+ Ready Roles</span>
            </div>
            <div className="p-3.5 bg-[#08122d]/80 rounded-2xl border border-[#d4af37]/30 shadow-xs">
              <span className="text-xl sm:text-2xl font-black text-[#f5d061] font-heading block">MMP SHIELD™</span>
              <span className="text-xs text-slate-300 font-medium">10-Stage Audit Gate</span>
            </div>
            <div className="p-3.5 bg-[#08122d]/80 rounded-2xl border border-[#d4af37]/30 shadow-xs">
              <span className="text-xl sm:text-2xl font-black text-amber-300 font-heading block">48–72 Hr</span>
              <span className="text-xs text-slate-300 font-medium">Rapid Mobilization</span>
            </div>
            <div className="p-3.5 bg-[#08122d]/80 rounded-2xl border border-[#d4af37]/30 shadow-xs">
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-heading block">10–15 Days</span>
              <span className="text-xs text-slate-300 font-medium">Replacement SLA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Workforce Directory Spotlight Callout (From Official PDF Page 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#07112c] via-[#0d1d49] to-[#07112c] rounded-3xl p-6 sm:p-8 border border-[#d4af37]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f5d061] text-xs font-bold font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>COMPLETE WORKFORCE PROFILES DIRECTORY</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
              Verified Talent for Every Need: 6 Core Sectors • 36+ Ready Roles
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Facility & Office Administration, Security & Asset Protection, Industrial & Logistics, Technical & IT, Field Sales, Events & Hospitality.
            </p>
          </div>
          <button
            onClick={() => setActivePage('workforce-directory')}
            className="shrink-0 px-6 py-3 bg-gradient-to-r from-[#ffe685] via-[#d4af37] to-[#b08d24] hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg cursor-pointer transition-all flex items-center gap-2"
          >
            <span>Explore 36+ Roles Directory</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </section>

      {/* Corporate Exposure & Experience Ribbon with Statutory Compliance Note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#b08d24] block font-mono">
                Track Record & Network
              </span>
              <h3 className="text-xl font-black text-slate-900 font-heading">
                Associated Recruitment Exposure & Business Experience
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 max-w-md italic leading-tight">
              *Note: Company names reflect past or current recruitment exposure, candidate sourcing channels, or associated business domain experience, and do not imply an active commercial contract unless specifically verified.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {CORPORATE_EXPOSURE.map((corp, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-[#fbfbf8] hover:bg-amber-50/50 border border-slate-200 hover:border-[#d4af37]/50 transition-colors text-center flex flex-col justify-center shadow-2xs"
              >
                <span className="font-bold text-slate-900 text-sm">{corp.name}</span>
                <span className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{corp.domain}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Homepage Conversion Flow in Corporate Gold & Navy Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#916e10] bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
            TRANSPARENT 2-SIDED RECRUITMENT ECOSYSTEM
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-heading">
            How MMP Manpower Services Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Structured digital workflow ensuring verified candidates, authentic employers, and fast placements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Job Seeker Flow Card */}
          <div className="bg-gradient-to-br from-[#f8faff] via-white to-slate-50 rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 bg-gradient-to-br from-blue-700 to-indigo-900 text-white rounded-2xl shadow-md">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 font-mono">Pathway 01</span>
                <h3 className="text-lg font-black text-slate-900 font-heading">FOR JOB SEEKERS & CANDIDATES</h3>
              </div>
            </div>

            <div className="space-y-3 relative">
              {[
                { title: '1. Free Registration', desc: 'Create your permanent MMP Candidate ID (MMP-CAN-XXXXXX)' },
                { title: '2. Profile & Skill Verification', desc: 'Upload documents & take MMP Skill Assessments to earn verified badges' },
                { title: '3. Choose Job Alert / Membership', desc: 'Select targeted alert plan (₹49) or Career Membership' },
                { title: '4. Receive Matched Opportunities', desc: 'Direct recruiter alerts matching your education, location & salary goals' },
                { title: '5. Apply, Interview & Joining', desc: 'Shortlisted by verified employers with structured interview passes' },
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-2xl border border-blue-100 shadow-2xs">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{step.title}</h4>
                    <p className="text-[11px] text-slate-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between">
              <span className="text-xs text-slate-600 font-semibold">Join thousands of job seekers</span>
              <button
                onClick={() => setActivePage('candidate-register')}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Register as Candidate</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Employer Flow Card */}
          <div className="bg-gradient-to-br from-[#fffdf7] via-white to-slate-50 rounded-3xl p-6 sm:p-8 border border-amber-300 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 bg-gradient-to-br from-[#0c183b] to-[#040918] text-[#f5d061] rounded-2xl shadow-md border border-[#d4af37]/30">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#b08d24] font-mono">Pathway 02</span>
                <h3 className="text-lg font-black text-slate-900 font-heading">FOR EMPLOYERS & BUSINESSES</h3>
              </div>
            </div>

            <div className="space-y-3 relative">
              {[
                { title: '1. Employer Registration', desc: 'Register company profile & generate permanent MMP-CLI ID' },
                { title: '2. Compliance & Verification', desc: '24-48h SLA verification review & ₹3,000 onboarding' },
                { title: '3. Select Hiring Package', desc: 'QuickConnect, Client Membership (Basic to Platinum), or TotalCare' },
                { title: '4. Post Vacancies & Receive Dossiers', desc: 'Screened & MMP SHIELD™ verified candidate profiles' },
                { title: '5. Interview, Select & Hire', desc: 'Coordinate interviews, verify offer letters, and manage onboarding' },
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-2xl border border-amber-200 shadow-2xs">
                  <span className="w-6 h-6 rounded-full bg-[#0a1432] text-[#f5d061] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-[#d4af37]/40">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{step.title}</h4>
                    <p className="text-[11px] text-slate-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-amber-200 flex items-center justify-between">
              <span className="text-xs text-slate-600 font-semibold">Immediate hiring requirements</span>
              <button
                onClick={() => setActivePage('post-vacancy')}
                className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-105 text-slate-950 font-black text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Post a Vacancy Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#b08d24] font-mono">
              Direct From Verified Employers
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Featured Job Vacancies in Karnataka & PAN-India
            </h2>
          </div>
          <button
            onClick={() => setActivePage('find-jobs')}
            className="px-4 py-2 border border-slate-300 hover:border-slate-400 bg-white text-slate-800 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <span>View All Vacancies ({jobs.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#d4af37] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                    {job.category}
                  </span>
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
                    MMP Verified
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 hover:text-blue-700 leading-snug">
                  {job.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-semibold">{job.employerName}</p>

                <div className="grid grid-cols-2 gap-2 my-4 text-xs text-slate-600 bg-[#fbfbf9] p-3.5 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{job.employmentType}</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2 font-bold text-slate-900">
                    <span className="text-emerald-700">{job.salaryRange}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">
                  {job.vacanciesCount} Vacancies Available
                </span>
                <button
                  onClick={() => setActivePage('find-jobs')}
                  className="px-4 py-2 bg-gradient-to-r from-[#0c183b] to-[#040918] hover:border-[#d4af37] text-[#f5d061] border border-[#d4af37]/40 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  View Details & Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MMP SHIELD™ Highlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#040817] via-[#0b173b] to-[#040817] rounded-3xl p-8 sm:p-12 text-white border border-[#d4af37]/40 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f5d061] text-xs font-bold font-mono">
              <Shield className="w-4 h-4 text-[#d4af37]" />
              <span>MMP SHIELD™ SECURITY & QUALITY GATE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-heading leading-tight">
              VERIFY • DOCUMENT • TRACK • CONTROL • AUDIT
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              MMP SHIELD™ protects candidates, employers, and recruitment transactions through verified identities, encrypted audit logs, anti-direct-hiring enforcement, and a 10-Stage Process Control & Quality Gate.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-center">
                <span className="text-xs font-bold text-white block">Candidate ID</span>
                <span className="text-[10px] text-amber-200/70">KYC & Skill Check</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-center">
                <span className="text-xs font-bold text-white block">Employer ID</span>
                <span className="text-[10px] text-amber-200/70">GST & MCA Audited</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-center">
                <span className="text-xs font-bold text-white block">Anti-Bypass</span>
                <span className="text-[10px] text-amber-200/70">Protected Direct Hiring</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-center">
                <span className="text-xs font-bold text-white block">10-Gate Quality</span>
                <span className="text-[10px] text-amber-200/70">End-to-End Governance</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActivePage('mmp-shield')}
                className="px-6 py-3 bg-gradient-to-r from-[#ffe685] via-[#d4af37] to-[#b08d24] text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Access MMP SHIELD™ Verification Desk
              </button>
              <button
                onClick={() => setActivePage('skill-assessments')}
                className="px-5 py-3 border border-[#d4af37]/50 hover:bg-white/10 text-[#f5d061] font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Take Skill Assessment Test
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MMP Franchise Opportunity Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#fffcf2] to-[#fff8e7] border border-amber-300 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8a650c] bg-amber-200/60 px-3 py-1 rounded-full font-mono">
              Business Partnership Opportunity
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
              MMP Franchise: Build a Local Recruitment Outlet
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 max-w-xl leading-relaxed">
              Turnkey ₹5 Lakh infrastructure office model (10×10 office setup concept) with full MMP branding, candidate database access, recruitment tools, and comprehensive training.
            </p>
          </div>
          <button
            onClick={() => setActivePage('franchise')}
            className="shrink-0 px-6 py-3 bg-[#0a1432] hover:bg-[#102254] text-[#f5d061] border border-[#d4af37]/40 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Explore Franchise Details →
          </button>
        </div>
      </section>

      {/* Final Website Message (Section 30) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center bg-gradient-to-b from-[#030714] to-[#08122d] text-white rounded-3xl p-10 sm:p-14 border border-[#d4af37]/40 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex justify-center mb-3">
              <MmpLogo size="md" showText={false} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#f5d061] font-mono">
              MMP MANPOWER SERVICES
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight leading-tight uppercase">
              ONE PLATFORM. TWO SIDES. COUNTLESS OPPORTUNITIES.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              MMP connects people with opportunities and businesses with the workforce they need.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setActivePage('candidate-register')}
                className="px-6 py-3.5 bg-gradient-to-r from-blue-700 to-indigo-900 hover:brightness-110 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg cursor-pointer transition-all border border-blue-400/30"
              >
                JOIN MMP TODAY • BUILD YOUR CAREER
              </button>
              <button
                onClick={() => setActivePage('post-vacancy')}
                className="px-6 py-3.5 bg-gradient-to-r from-[#ffe685] via-[#d4af37] to-[#b08d24] hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl cursor-pointer transition-all"
              >
                BUILD YOUR BUSINESS • HIRE TALENT
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
