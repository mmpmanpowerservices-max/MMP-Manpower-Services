import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Shield,
  ExternalLink,
  Lock,
  FileText,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { MmpLogo } from './MmpLogo';
import { OFFICIAL_GOOGLE_FORMS } from '../../data/mockData';

interface Props {
  setActivePage: (page: string) => void;
}

export const Footer: React.FC<Props> = ({ setActivePage }) => {
  const navigateTo = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030714] text-slate-300 border-t border-[#d4af37]/30">
      {/* Top Value / Trust Stripe in Corporate Gold & Navy */}
      <div className="bg-gradient-to-r from-[#040918] via-[#0b173b] to-[#040918] py-6 border-b border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f5d061] shadow-md shadow-amber-950/20">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-black text-sm tracking-wide font-heading">
                MMP SHIELD™ VERIFIED RECRUITMENT ECOSYSTEM
              </h4>
              <p className="text-xs text-amber-200/70 font-mono">
                VERIFY • DOCUMENT • TRACK • CONTROL • AUDIT — Protecting Candidates & Employers
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => navigateTo('mmp-shield')}
              className="px-4 py-2.5 bg-gradient-to-r from-[#ffe685] via-[#d4af37] to-[#b08d24] hover:brightness-110 text-slate-950 font-black rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-950/30"
            >
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              <span>Verify Candidate / Employer ID</span>
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="px-4 py-2.5 border border-[#d4af37]/40 hover:border-[#d4af37] text-white font-bold rounded-xl transition-colors cursor-pointer bg-white/5"
            >
              Grievance Desk
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & About Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <MmpLogo size="md" showText={false} />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-black tracking-wider uppercase text-white text-lg">
                    MMP
                  </span>
                  <span className="font-extrabold tracking-wider uppercase text-[#f5d061] text-sm">
                    MANPOWER SERVICES
                  </span>
                </div>
                <span className="text-amber-200/80 font-medium tracking-tight text-[10px]">
                  Building Careers • Growing Businesses • Connecting Opportunities
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mt-3">
              A premier national employment, recruitment, and workforce development organisation dedicated to creating large-scale job opportunities across India. Headquartered out of Davangere, Karnataka, MMP operates with a steadfast mission to empower youth through employment support, skill development, and tailored staffing solutions.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>
                  <strong>Head Office:</strong> Davangere – 577006, Karnataka, India • Pan-India Network
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>
                  <a href="tel:+919900872399" className="hover:text-[#f5d061] font-mono">+91 99008 72399</a> /{' '}
                  <a href="tel:+919449940097" className="hover:text-[#f5d061] font-mono">+91 94499 40097</a>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href="mailto:mmpmanpowerservices@gmail.com" className="hover:text-[#f5d061]">
                  mmpmanpowerservices@gmail.com
                </a>
              </div>
            </div>

            <div className="p-3 bg-[#0a1432] rounded-2xl border border-[#d4af37]/30 text-[11px] text-slate-300">
              <span className="text-[#f5d061] font-black block mb-0.5">Empowering Bharat's Growth</span>
              Built on integrity, transparent documentation, and digital recruitment management.
            </div>
          </div>

          {/* Candidates Column */}
          <div>
            <h5 className="text-[#f5d061] font-black text-xs uppercase tracking-wider mb-4 border-b border-[#d4af37]/20 pb-2">
              For Candidates
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('find-jobs')} className="hover:text-white transition-colors">
                  Find Jobs & Walk-Ins
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('workforce-directory')} className="hover:text-white transition-colors">
                  Workforce Directory (36+ Roles)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('candidate-register')} className="hover:text-white transition-colors">
                  Free Candidate Registration
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('candidate-membership')} className="hover:text-white transition-colors">
                  Candidate Membership Plans
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('job-alerts')} className="hover:text-white transition-colors">
                  Job Alert Plans (from ₹49)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('fast-track')} className="hover:text-white transition-colors">
                  Fast Track Service (₹3,400)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('skill-assessments')} className="text-[#f5d061] hover:underline font-bold transition-colors flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Skill Assessments & Badges</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('candidate-dashboard')} className="hover:text-white transition-colors text-amber-300 font-semibold">
                  Candidate Portal Dashboard
                </button>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-white/10">
              <span className="text-[10px] text-amber-300/60 block uppercase font-bold mb-1.5">Official Google Form</span>
              <a
                href={OFFICIAL_GOOGLE_FORMS.candidateRegistration}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <span>Free Candidate Form</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Employers Column */}
          <div>
            <h5 className="text-[#f5d061] font-black text-xs uppercase tracking-wider mb-4 border-b border-[#d4af37]/20 pb-2">
              For Employers & Clients
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('employers')} className="hover:text-white transition-colors">
                  Employers / Clients Overview
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('client-membership')} className="hover:text-white transition-colors">
                  Client Membership Plans
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('post-vacancy')} className="hover:text-white transition-colors">
                  Post a Vacancy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('recruitment-services')} className="hover:text-white transition-colors">
                  QuickConnect (Pay-per-Hire)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('recruitment-services')} className="hover:text-white transition-colors">
                  SmartSupport & TotalCare HR
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('employer-dashboard')} className="hover:text-white transition-colors text-amber-300 font-semibold">
                  Employer Portal Dashboard
                </button>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-white/10">
              <span className="text-[10px] text-amber-300/60 block uppercase font-bold mb-1.5">Official Employer Form</span>
              <a
                href={OFFICIAL_GOOGLE_FORMS.employerRegistration}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <span>Employer Registration Form</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Programs, ERP & Policies */}
          <div>
            <h5 className="text-[#f5d061] font-black text-xs uppercase tracking-wider mb-4 border-b border-[#d4af37]/20 pb-2">
              Governance & Policies
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('recruit-saathi')} className="hover:text-white transition-colors">
                  Recruit Saathi Program
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('mmp-shield')} className="hover:text-white transition-colors">
                  MMP SHIELD™ Verification
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('franchise')} className="hover:text-white transition-colors">
                  MMP Franchise (₹5L Office)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin-erp')} className="hover:text-white transition-colors text-[#f5d061] font-bold">
                  MMP Recruitment ERP Admin
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Contact & Branch Locations
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('terms')} className="hover:text-white transition-colors">
                  Terms & Employer Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">
                  Privacy & Data Protection
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('refund')} className="hover:text-white transition-colors">
                  Refund & Cancellation Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Statutory & Trust Notices in Corporate Gold & Navy Cards */}
        <div className="mt-10 pt-8 border-t border-[#d4af37]/20 space-y-4">
          <div className="bg-[#08122d] border border-[#d4af37]/30 rounded-2xl p-4 text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-[#f5d061] block mb-1">
              IMPORTANT CANDIDATE NOTICE & SERVICE CLARIFICATION:
            </span>
            MMP Membership provides access to MMP recruitment services, opportunities, job alerts, profile enhancement, and candidate support. Membership does <strong>NOT guarantee employment, interview calls, or selection</strong>. Employment offers depend entirely on employer requirements, candidate qualifications, interview performance, and final employer selection. Registration, Membership, Job Alert Subscription, Fast Track, Recruitment Service, and Placement are distinct professional services.
          </div>

          <div className="bg-[#08122d] border border-[#d4af37]/30 rounded-2xl p-4 text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-[#f5d061] block mb-1">
              EMPLOYER REGISTRATION POLICY & ANTI-BYPASS AGREEMENT:
            </span>
            Standard employer registration review fee is ₹3,000 (non-refundable, subject to applicable MMP terms). MMP-introduced candidates must <strong>not be bypassed for direct hiring</strong> outside the agreed MMP recruitment process. Unauthorized direct hiring of candidates introduced through MMP Manpower Services will result in applicable commercial recruitment charges and legal remedies as per agreed terms. Employer registration review SLA is normally 24–48 hours.
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 MMP Manpower Services • Harbingers of a New Bharat. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>www.mmpmanpowerservices.com</span>
            <span>•</span>
            <span>GSTIN Registered</span>
            <span>•</span>
            <span className="text-[#f5d061] flex items-center gap-1 font-semibold">
              <Lock className="w-3 h-3 text-[#d4af37]" /> 256-Bit SSL Encrypted
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
