import React from 'react';
import {
  Shield,
  CheckCircle2,
  Users,
  Building,
  MapPin,
  Phone,
  Mail,
  Award,
  Sparkles,
  Briefcase,
  Layers,
  Compass,
  Target,
  HeartHandshake,
  TrendingUp,
  Globe,
} from 'lucide-react';
import { MmpLogo } from '../components/common/MmpLogo';
import { CORPORATE_EXPOSURE } from '../data/mockData';

interface Props {
  setActivePage: (page: string) => void;
}

export const AboutPage: React.FC<Props> = ({ setActivePage }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-12 border border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="max-w-4xl space-y-4">
          <div className="flex items-center gap-3">
            <MmpLogo size="sm" showText={false} />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
              OFFICIAL CORPORATE PROFILE
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading leading-tight uppercase">
            MMP MANPOWER SERVICES
          </h1>
          <p className="text-base sm:text-lg font-bold text-amber-300 font-mono tracking-wide">
            BUILDING CAREERS • GROWING BUSINESSES • CONNECTING OPPORTUNITIES
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5 text-blue-300">
              <MapPin className="w-4 h-4 text-blue-400" /> Head Office: Davangere – 577006, Karnataka
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-emerald-300">
              <Globe className="w-4 h-4 text-emerald-400" /> Reach: Pan-India Recruitment Network
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-amber-300">
              <Phone className="w-4 h-4 text-amber-400" /> Direct Line: +91 99008 72399
            </span>
          </div>
        </div>
      </div>

      {/* Executive Summary Box (Page 1) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-4">
        <div className="inline-block px-3 py-1 bg-blue-50 text-blue-800 text-xs font-black uppercase tracking-wider rounded-md">
          EXECUTIVE SUMMARY
        </div>
        <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
          <strong>About MMP Manpower Services:</strong> A premier national employment, recruitment, and workforce development organisation dedicated to creating large-scale job opportunities across India. Headquartered out of Davangere, Karnataka, MMP operates with a steadfast mission to empower youth through employment support, skill development, career guidance, and tailored staffing solutions for modern enterprises.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white rounded-3xl p-8 border border-blue-800 shadow-md space-y-3">
          <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
            <Compass className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-black font-heading text-white">Our Vision</h3>
          </div>
          <blockquote className="text-sm text-slate-200 leading-relaxed italic border-l-2 border-amber-400 pl-3">
            “To build a powerful national employment network that connects skilled candidates with companies, industries, and organizations across India while supporting youth empowerment and career growth.”
          </blockquote>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-8 border border-indigo-800 shadow-md space-y-3">
          <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
            <Target className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-black font-heading text-white">Our Mission</h3>
          </div>
          <blockquote className="text-sm text-slate-200 leading-relaxed italic border-l-2 border-emerald-400 pl-3">
            “To provide trusted manpower recruitment services, employment opportunities, candidate support systems, and professional workforce solutions with integrity and excellence.”
          </blockquote>
        </div>
      </div>

      {/* Core Values 4 Grid */}
      <div className="space-y-4">
        <h3 className="text-center text-xs font-black uppercase tracking-widest text-slate-500">
          OUR CORE VALUES
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center">
            <strong className="text-base font-black text-slate-900 font-heading block">Integrity</strong>
            <span className="text-xs text-blue-700 font-semibold block mt-1">Transparent & Responsible</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center">
            <strong className="text-base font-black text-slate-900 font-heading block">Trust</strong>
            <span className="text-xs text-emerald-700 font-semibold block mt-1">Reliable Relationships</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center">
            <strong className="text-base font-black text-slate-900 font-heading block">Excellence</strong>
            <span className="text-xs text-purple-700 font-semibold block mt-1">Professional Standards</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center">
            <strong className="text-base font-black text-slate-900 font-heading block">Empowerment</strong>
            <span className="text-xs text-amber-700 font-semibold block mt-1">Growth & Opportunity</span>
          </div>
        </div>
      </div>

      {/* Why We Lead the Industry (Page 1) */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-2xl font-black text-slate-900 font-heading">
          Why We Lead the Industry
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <strong className="text-slate-900 font-bold block text-sm">Strategic Location Excellence</strong>
            <p>Leveraging Tier-2 hubs like Davangere as agile talent centers to orchestrate cost-effective national deployment.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <strong className="text-slate-900 font-bold block text-sm">Verified Integrity & Background Checks</strong>
            <p>Every candidate undergoes rigorous verification, document authentication, and credential screening under MMP SHIELD™.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <strong className="text-slate-900 font-bold block text-sm">Multilingual Management</strong>
            <p>Handling diverse workforce deployments across state borders and linguistic regions (Kannada, Hindi, English, Telugu) seamlessly.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <strong className="text-slate-900 font-bold block text-sm">Skill-First Philosophy</strong>
            <p>Moving beyond theoretical degrees to prioritize demonstrated competencies, hands-on tasks, and real-world aptitude.</p>
          </div>
        </div>
      </div>

      {/* Strategic Pillars Ribbon */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800">
        <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block text-center mb-4">
          OUR STRATEGIC PILLARS
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-sm font-bold text-white block">Large-Scale Job Opportunities</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-sm font-bold text-white block">Skill Development Support</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-sm font-bold text-white block">Career Guidance & Placement</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-sm font-bold text-white block">Pan-India Mobility Network</span>
          </div>
        </div>
      </div>

      {/* Corporate Exposure Section */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Track Record & Network</span>
          <h3 className="text-xl font-black text-slate-900 font-heading">
            Associated Recruitment Exposure & Business Experience
          </h3>
          <p className="text-xs text-slate-500 mt-1 italic">
            *Mentioned as past or current talent sourcing exposure or associated domain experience, and does not imply an active commercial contract unless specifically verified.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {CORPORATE_EXPOSURE.map((corp, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="font-bold text-slate-900 text-xs block">{corp.name}</span>
              <span className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{corp.domain}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
