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
  Download,
} from 'lucide-react';
import { MmpLogo } from '../components/common/MmpLogo';
import { CORPORATE_EXPOSURE, OFFICIAL_SUPPORT_TEAM } from '../data/mockData';

interface Props {
  setActivePage: (page: string) => void;
}

export const AboutPage: React.FC<Props> = ({ setActivePage }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-950 via-[#07112c] to-[#040817] text-white rounded-3xl p-8 sm:p-12 border border-[#d4af37]/50 shadow-2xl relative overflow-hidden">
        <div className="max-w-4xl space-y-4">
          <div className="flex items-center gap-3">
            <MmpLogo size="sm" showText={false} />
            <span className="text-xs font-bold uppercase tracking-widest text-[#f5d061] bg-[#d4af37]/20 px-3 py-1 rounded-full border border-[#d4af37]/40">
              OFFICIAL CORPORATE PROFILE
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading leading-tight uppercase">
            MMP MANPOWER SERVICES
          </h1>
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#d4af37]/25 border border-[#d4af37]/60 text-[#f5d061] text-xs sm:text-sm font-black tracking-widest uppercase font-mono">
            YOUR WORKFORCE. OUR STRENGTH. YOUR SUCCESS.
          </div>
          <p className="text-sm sm:text-base font-bold text-amber-200/90 font-mono tracking-wide">
            BUILDING CAREERS • GROWING BUSINESSES • CONNECTING OPPORTUNITIES
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5 text-blue-300">
              <MapPin className="w-4 h-4 text-[#d4af37]" /> Head Office: Davangere – 577006, Karnataka
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-emerald-300">
              <Globe className="w-4 h-4 text-emerald-400" /> Reach: Pan-India Recruitment Network
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-amber-300">
              <Phone className="w-4 h-4 text-amber-400" /> Direct Helpline: +91 99008 72399
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

      {/* Official Insignia & Royal Brand Heritage Showcase */}
      <div className="bg-gradient-to-b from-[#070e24] via-[#050b1f] to-[#02050e] text-white rounded-3xl p-8 sm:p-10 border border-[#d4af37]/50 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#d4af37]/20 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#f5d061]">
              ROYAL EMBLEM & HERALDRY
            </span>
            <h3 className="text-2xl font-black font-heading text-white mt-1">
              Official MMP Brand Insignia
            </h3>
            <p className="text-xs text-amber-200/70 font-mono mt-0.5">
              YOUR WORKFORCE. OUR STRENGTH. YOUR SUCCESS.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/mmp-official-logo.svg"
              download="mmp_official_logo.svg"
              className="px-3.5 py-2 bg-gradient-to-r from-[#ffe685] via-[#d4af37] to-[#b08d24] text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 hover:brightness-110 shadow-md cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Vector SVG</span>
            </a>
            <a
              href="/mmp-logo.png"
              download="mmp_official_logo.png"
              className="px-3.5 py-2 bg-[#0f2452] hover:bg-[#153472] border border-[#d4af37]/50 text-[#f5d061] font-black text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Master HD PNG</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center justify-center p-6 bg-[#040817] rounded-3xl border border-[#d4af37]/40 shadow-inner">
            <MmpLogo size="hero" showText={false} withContainer={false} />
            <div className="mt-3 text-center">
              <span className="text-xs font-black text-[#f5d061] tracking-widest uppercase font-mono block">
                MMP MANPOWER SERVICES
              </span>
              <span className="text-[10px] text-amber-200/70 block mt-0.5">
                Karnataka State & Pan-India Registry
              </span>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3 text-xs text-slate-300">
            <div className="p-3 bg-[#0a1432] rounded-xl border border-white/10">
              <strong className="text-[#f5d061] block mb-1">1. Royal 5-Peak Crown with Precious Jewels:</strong>
              Topped with 5 golden pearl finials radiating excellence across candidate screening, verification, training, placement, and SLA compliance. Adorned with central Saffron Topaz and flanking Emerald gems.
            </div>
            <div className="p-3 bg-[#0a1432] rounded-xl border border-white/10">
              <strong className="text-[#f5d061] block mb-1">2. 3D Fluted M·M·P Monogram:</strong>
              Precision-beveled fluted golden pillars in an inverted emerald shield tapering to a central spear point, forming the distinctive letters M · M · P.
            </div>
            <div className="p-3 bg-[#0a1432] rounded-xl border border-white/10">
              <strong className="text-[#f5d061] block mb-1">3. Golden Handshake of Trust:</strong>
              Sculpted clasping golden hands at the center of the insignia, symbolizing the sacred partnership bridging candidate careers and corporate expansion.
            </div>
            <div className="p-3 bg-[#0a1432] rounded-xl border border-white/10">
              <strong className="text-[#f5d061] block mb-1">4. Sweeping Saffron & Emerald Wings:</strong>
              Multi-tiered plumage featuring India's tricolor Saffron on the left and Emerald Green on the right, symbolizing nationwide upward career mobility.
            </div>
            <div className="p-3 bg-[#0a1432] rounded-xl border border-white/10">
              <strong className="text-[#f5d061] block mb-1">5. Dual-Tone Typography & Tricolor Baseline:</strong>
              <strong>MAN</strong> in Saffron and <strong>POWER</strong> in Emerald Green outlined in 24K gold foil, with <strong>SERVICES</strong> and the official motto: <em>YOUR WORKFORCE. OUR STRENGTH. YOUR SUCCESS.</em>
            </div>
          </div>
        </div>
      </div>

      {/* Head Office & Regional Desk Hubs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
            <Building className="w-5 h-5" />
            <span>Head Office — Davanagere</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-mono">
            {OFFICIAL_SUPPORT_TEAM.headOfficeAddress}
          </p>
          <div className="pt-2 text-xs font-semibold text-slate-800 space-y-1">
            <div>Helpline: <a href={`tel:${OFFICIAL_SUPPORT_TEAM.phonePrimary}`} className="text-blue-700 hover:underline">{OFFICIAL_SUPPORT_TEAM.phonePrimary}</a></div>
            <div>Secondary: <a href={`tel:${OFFICIAL_SUPPORT_TEAM.phoneSecondary}`} className="text-emerald-700 hover:underline">{OFFICIAL_SUPPORT_TEAM.phoneSecondary}</a></div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <MapPin className="w-5 h-5" />
            <span>Regional Desk — Raichur</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-mono">
            {OFFICIAL_SUPPORT_TEAM.raichurOfficeAddress}
          </p>
          <div className="pt-2 text-xs font-semibold text-slate-800 space-y-1">
            <div>Email: <a href={`mailto:${OFFICIAL_SUPPORT_TEAM.email}`} className="text-blue-700 hover:underline">{OFFICIAL_SUPPORT_TEAM.email}</a></div>
            <div>Working Hours: <span className="text-slate-600 font-normal">{OFFICIAL_SUPPORT_TEAM.workingHours}</span></div>
          </div>
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
