import React from 'react';
import {
  Briefcase,
  Users,
  Layers,
  CheckCircle2,
  AlertCircle,
  Megaphone,
  Palette,
  ArrowRight,
  ShieldCheck,
  Building,
  Zap,
  Sparkles,
  TrendingUp,
  Award,
  Shield,
  Clock,
  Check,
  Phone,
} from 'lucide-react';
import {
  STRATEGIC_SERVICE_MODELS,
  CORE_WORKFORCE_SOLUTIONS,
  EMPLOYER_ADDON_SERVICES,
  OFFICIAL_SUPPORT_TEAM,
} from '../data/mockData';
import { MmpLogo } from '../components/common/MmpLogo';

interface Props {
  setActivePage: (page: string) => void;
}

export const RecruitmentServicesPage: React.FC<Props> = ({ setActivePage }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header in Corporate Gold & Navy matching Brochure Image 2 */}
      <div className="bg-gradient-to-r from-[#030714] via-[#091535] to-[#040918] text-white rounded-3xl p-8 sm:p-12 border border-[#d4af37]/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="relative max-w-4xl space-y-4">
          <div className="flex items-center gap-3">
            <MmpLogo size="sm" showText={false} />
            <span className="text-xs font-bold uppercase tracking-widest text-[#f5d061] bg-[#d4af37]/20 px-3.5 py-1 rounded-full border border-[#d4af37]/40 font-mono">
              COMPREHENSIVE WORKFORCE & ADD-ON SUITE
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading leading-tight uppercase text-white">
            BEYOND RECRUITMENT • BEYOND WORKFORCE • BEYOND EXPECTATIONS
          </h1>
          <p className="text-sm sm:text-base font-bold text-[#f5d061] font-mono tracking-wide">
            THE RIGHT PEOPLE FOR EVERY NEED • INTEGRATED ENTERPRISE ENABLEMENT
          </p>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            From industrial assembly and technical specialists to on-ground promotional brand ambassadors, 
            MMP provides holistic manpower sourcing, managed services, and growth execution.
          </p>
        </div>
      </div>

      {/* CORE WORKFORCE SOLUTIONS (6 Sectors from Brochure Image 2) */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#9c7717] bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
            TALENT EXCELLENCE
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            Core Workforce Solutions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Vetted, audited, and rapidly mobilizable staff across 6 strategic enterprise sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_WORKFORCE_SOLUTIONS.map((sec, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-3xl border border-slate-200 hover:border-[#d4af37] shadow-sm hover:shadow-lg transition-all space-y-4"
            >
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-[#0a1128] text-[#f5d061] text-xs font-black flex items-center justify-center font-mono">
                  {idx + 1}
                </span>
                <h3 className="font-heading font-black text-base text-[#0a1128]">
                  {sec.title}
                </h3>
              </div>

              <p className="text-xs text-slate-500 font-medium">{sec.description}</p>

              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
                  Included Roles:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {sec.roles.map((role, rIdx) => (
                    <span
                      key={rIdx}
                      className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STRATEGIC SERVICE MODELS (QuickConnect, SmartSupport, TotalCare) */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#9c7717] bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
            FLEXIBLE ENGAGEMENT TIERS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            Strategic Service Models
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Three powerful paths to staffing success tailored to your internal capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STRATEGIC_SERVICE_MODELS.map((model) => (
            <div
              key={model.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 hover:border-[#d4af37] shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#0a1128] text-[#f5d061] mb-2 inline-block">
                  {model.badge}
                </span>
                <h3 className="text-2xl font-black text-[#0a1128] font-heading">{model.name}</h3>
                <p className="text-xs font-semibold text-[#856512] mt-0.5">{model.subtitle}</p>

                <div className="my-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">Commercial Terms</span>
                  <strong className="text-slate-900 block mt-0.5">{model.pricingModel}</strong>
                  <span className="text-[11px] text-[#9c7717] block mt-1 italic">{model.description}</span>
                </div>

                <ul className="space-y-2.5 mb-6 text-xs text-slate-600">
                  {model.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setActivePage('post-vacancy')}
                className="w-full py-2.5 bg-[#0a1128] hover:bg-[#152554] text-[#f5d061] border border-[#d4af37]/40 rounded-xl font-bold text-xs cursor-pointer shadow-xs"
              >
                Inquire {model.name} →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* EMPLOYER ADD-ON SERVICES (8 Services from Brochure Image 2) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#9c7717] font-mono">
            360° BUSINESS & MARKETING ENABLEMENT
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            Employer Add-On Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Enhance market visibility, organize recruitment drives, and deploy on-ground marketing teams.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EMPLOYER_ADDON_SERVICES.map((srv, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#d4af37] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-[#9c7717] uppercase block mb-1">
                  ADD-ON #{idx + 1}
                </span>
                <h4 className="font-heading font-black text-base text-slate-900 mb-1">
                  {srv.category}
                </h4>
                <p className="text-[11px] font-bold text-slate-700 mb-2 font-mono">
                  {srv.summary}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {srv.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prominent Golden Banner: YOUR REQUIREMENT • OUR SOLUTION (Brochure Image 2) */}
      <div className="bg-gradient-to-r from-[#ffe685] via-[#d4af37] to-[#b08d24] rounded-3xl p-6 sm:p-8 text-center text-slate-950 shadow-xl border border-[#ffe685]/50 space-y-3">
        <h3 className="text-2xl sm:text-4xl font-black font-heading uppercase tracking-wide">
          YOUR REQUIREMENT • OUR SOLUTION
        </h3>
        <p className="text-xs sm:text-sm font-bold max-w-xl mx-auto">
          Whatever your staffing volume or specialized trade requirement, MMP delivers verified personnel with strict compliance and rapid turnaround.
        </p>
        <div className="pt-2">
          <button
            onClick={() => setActivePage('post-vacancy')}
            className="px-8 py-3.5 bg-[#0a1128] hover:bg-[#152554] text-[#f5d061] border border-[#d4af37]/60 font-black text-xs sm:text-sm rounded-2xl shadow-xl cursor-pointer transition-all uppercase tracking-wider"
          >
            Post Your Custom Hiring Requirement
          </button>
        </div>
      </div>
    </div>
  );
};
