import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Shield,
  ChevronDown,
  Menu,
  X,
  User,
  Building,
  Briefcase,
  Zap,
  Award,
  Bell,
  HelpCircle,
  Settings,
  Sparkles,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { MmpLogo } from './MmpLogo';
import { LogoModal } from './LogoModal';
import { GlobalSearch } from './GlobalSearch';
import { useApp, UserViewMode } from '../../context/AppContext';

interface Props {
  activePage: string;
  setActivePage: (page: string) => void;
}

export const Header: React.FC<Props> = ({ activePage, setActivePage }) => {
  const { viewMode, setViewMode, adminRole, setAdminRole } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [candidateDropdown, setCandidateDropdown] = useState(false);
  const [employerDropdown, setEmployerDropdown] = useState(false);
  const [logoModalOpen, setLogoModalOpen] = useState(false);

  const navigateTo = (page: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    setCandidateDropdown(false);
    setEmployerDropdown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070e24]/95 backdrop-blur-md border-b border-[#d4af37]/30 shadow-lg shadow-black/20">
      {/* Top Bar for trust & contact in Deep Midnight Navy with Gold Highlights */}
      <div className="bg-[#030714] text-slate-300 text-xs py-2 px-4 sm:px-6 border-b border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Contact Details */}
          <div className="flex flex-wrap items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-amber-300/90 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Head Office: Davangere – 577006, Karnataka • Pan-India Network</span>
            </span>
            <a
              href="tel:+919900872399"
              className="flex items-center gap-1.5 text-slate-200 hover:text-[#f5d061] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="font-mono font-semibold">+91 99008 72399</span>
            </a>
            <a
              href="tel:+919449940097"
              className="hidden md:flex items-center gap-1.5 text-slate-200 hover:text-[#f5d061] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="font-mono font-semibold">+91 94499 40097</span>
            </a>
            <a
              href="mailto:mmpmanpowerservices@gmail.com"
              className="hidden lg:flex items-center gap-1.5 text-slate-300 hover:text-[#f5d061] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>mmpmanpowerservices@gmail.com</span>
            </a>
          </div>

          {/* Brand & Logo Kit + Role / Portal Switcher */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setLogoModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#d4af37]/20 hover:bg-[#d4af37]/35 border border-[#d4af37]/60 text-[#f5d061] text-[11px] font-black cursor-pointer transition-all shadow-xs"
              title="View Official Royal Insignia, Heraldry & Download Media Kit"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden sm:inline">Official Logo & Details</span>
              <span className="sm:hidden">Logo & Details</span>
            </button>

            <span className="text-[11px] text-amber-200/70 hidden lg:inline font-medium">Portal:</span>
            <div className="flex items-center bg-[#0d1b3e] rounded-lg p-0.5 border border-[#d4af37]/40 text-[11px]">
              <button
                type="button"
                onClick={() => {
                  setViewMode('public');
                  navigateTo('home');
                }}
                className={`px-2.5 py-0.5 rounded cursor-pointer transition-all ${
                  viewMode === 'public'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Website
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewMode('candidate');
                  navigateTo('candidate-dashboard');
                }}
                className={`px-2.5 py-0.5 rounded cursor-pointer transition-all ${
                  viewMode === 'candidate'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Candidate
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewMode('employer');
                  navigateTo('employer-dashboard');
                }}
                className={`px-2.5 py-0.5 rounded cursor-pointer transition-all ${
                  viewMode === 'employer'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Employer
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewMode('admin');
                  navigateTo('admin-erp');
                }}
                className={`px-2.5 py-0.5 rounded cursor-pointer transition-all ${
                  viewMode === 'admin'
                    ? 'bg-[#d4af37] text-slate-950 font-black shadow-xs'
                    : 'text-amber-300 hover:text-white'
                }`}
              >
                ERP Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar in Corporate Gold & Navy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo with User Uploaded Emblem */}
        <div
          onClick={() => navigateTo('home')}
          className="cursor-pointer group shrink-0"
        >
          <div className="flex items-center gap-3">
            <MmpLogo size="sm" showText={false} animated />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-heading font-black tracking-wider uppercase text-white text-base sm:text-lg">
                  MMP
                </span>
                <span className="font-extrabold tracking-wider uppercase text-[#f5d061] text-xs sm:text-sm">
                  MANPOWER SERVICES
                </span>
              </div>
              <span className="text-[#f5d061] font-bold tracking-tight text-[8px] sm:text-[9.5px] uppercase font-mono hidden sm:block">
                YOUR WORKFORCE. OUR STRENGTH. YOUR SUCCESS.
              </span>
              <span className="text-amber-200/70 font-medium tracking-tight text-[8px] hidden md:block">
                Building Careers • Growing Businesses • Connecting Opportunities
              </span>
            </div>
          </div>
        </div>

        {/* Global Search Bar (Desktop & Tablets) */}
        <div className="hidden sm:block shrink-0">
          <GlobalSearch setActivePage={navigateTo} />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-bold text-slate-200">
          <button
            onClick={() => navigateTo('home')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activePage === 'home'
                ? 'text-[#f5d061] bg-[#0f2452] font-black border border-[#d4af37]/40'
                : 'hover:text-[#f5d061] hover:bg-white/5'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => navigateTo('about')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activePage === 'about'
                ? 'text-[#f5d061] bg-[#0f2452] font-black border border-[#d4af37]/40'
                : 'hover:text-[#f5d061] hover:bg-white/5'
            }`}
          >
            About MMP
          </button>

          <button
            onClick={() => navigateTo('find-jobs')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activePage === 'find-jobs'
                ? 'text-[#f5d061] bg-[#0f2452] font-black border border-[#d4af37]/40'
                : 'hover:text-[#f5d061] hover:bg-white/5'
            }`}
          >
            Find Jobs
          </button>

          <button
            onClick={() => navigateTo('workforce-directory')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activePage === 'workforce-directory'
                ? 'text-[#f5d061] bg-[#0f2452] font-black border border-[#d4af37]/40'
                : 'hover:text-[#f5d061] hover:bg-white/5'
            }`}
          >
            <span>Workforce Directory</span>
            <span className="bg-[#d4af37] text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full">36+</span>
          </button>

          {/* Candidate Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setCandidateDropdown(!candidateDropdown);
                setEmployerDropdown(false);
              }}
              className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                ['candidate-register', 'candidate-membership', 'job-alerts', 'fast-track', 'skill-assessments', 'candidate-dashboard'].includes(
                  activePage
                )
                  ? 'text-[#f5d061] bg-[#0f2452] font-black border border-[#d4af37]/40'
                  : 'hover:text-[#f5d061] hover:bg-white/5'
              }`}
            >
              <span>Candidates</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#d4af37]" />
            </button>

            {candidateDropdown && (
              <div
                className="absolute top-full left-0 mt-2 w-64 bg-[#0a1432] rounded-2xl shadow-2xl border border-[#d4af37]/40 py-2 z-50 text-xs animate-in fade-in slide-in-from-top-1 backdrop-blur-xl"
                onMouseLeave={() => setCandidateDropdown(false)}
              >
                <button
                  onClick={() => navigateTo('candidate-register')}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#142657] text-slate-200 hover:text-[#f5d061] flex items-center gap-2.5 cursor-pointer font-medium"
                >
                  <User className="w-4 h-4 text-[#d4af37]" />
                  <div>
                    <span className="font-bold text-white block">Free Candidate Registration</span>
                    <span className="text-[10px] text-amber-200/70">Get your MMP-CAN ID</span>
                  </div>
                </button>
                <button
                  onClick={() => navigateTo('candidate-membership')}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#142657] text-slate-200 hover:text-[#f5d061] flex items-center gap-2.5 cursor-pointer font-medium"
                >
                  <Briefcase className="w-4 h-4 text-[#d4af37]" />
                  <div>
                    <span className="font-bold text-white block">Candidate Membership Plans</span>
                    <span className="text-[10px] text-amber-200/70">From ₹499/3 Months</span>
                  </div>
                </button>
                <button
                  onClick={() => navigateTo('job-alerts')}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#142657] text-slate-200 hover:text-[#f5d061] flex items-center gap-2.5 cursor-pointer font-medium"
                >
                  <Bell className="w-4 h-4 text-[#d4af37]" />
                  <div>
                    <span className="font-bold text-white block">Job Alerts (SMS & WhatsApp)</span>
                    <span className="text-[10px] text-amber-200/70">Plans from ₹49</span>
                  </div>
                </button>
                <button
                  onClick={() => navigateTo('fast-track')}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#142657] text-slate-200 hover:text-[#f5d061] flex items-center gap-2.5 cursor-pointer font-medium"
                >
                  <Zap className="w-4 h-4 text-[#d4af37]" />
                  <div>
                    <span className="font-bold text-white block">Fast Track Service (₹3,400)</span>
                    <span className="text-[10px] text-amber-200/70">Priority recruitment processing</span>
                  </div>
                </button>
                <button
                  onClick={() => navigateTo('skill-assessments')}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#142657] text-slate-200 hover:text-[#f5d061] flex items-center gap-2.5 cursor-pointer font-medium"
                >
                  <Award className="w-4 h-4 text-[#d4af37]" />
                  <div>
                    <span className="font-bold text-white block flex items-center gap-1.5">
                      Skill Assessments & Badges
                      <span className="bg-[#d4af37] text-slate-950 px-1.5 py-0.2 rounded text-[9px] font-black">Shield</span>
                    </span>
                    <span className="text-[10px] text-amber-200/70">Take test & earn verified badge</span>
                  </div>
                </button>
                <button
                  onClick={() => navigateTo('candidate-dashboard')}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#142657] text-slate-200 hover:text-[#f5d061] flex items-center gap-2.5 cursor-pointer font-medium"
                >
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  <div>
                    <span className="font-bold text-white block flex items-center gap-1.5">
                      Skill Verification & Certificates
                      <span className="bg-[#d4af37] text-slate-950 px-1.5 py-0.2 rounded text-[9px] font-black">Official Seal</span>
                    </span>
                    <span className="text-[10px] text-amber-200/70">Upload credentials & print certificates</span>
                  </div>
                </button>
                <div className="border-t border-[#d4af37]/20 my-1"></div>
                <button
                  onClick={() => navigateTo('candidate-dashboard')}
                  className="w-full text-left px-4 py-2 hover:bg-[#142657] text-[#f5d061] font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>Open Candidate Dashboard →</span>
                </button>
              </div>
            )}
          </div>

          {/* Employer Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setEmployerDropdown(!employerDropdown);
                setCandidateDropdown(false);
              }}
              className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                ['employers', 'client-membership', 'post-vacancy', 'recruitment-services', 'employer-dashboard'].includes(
                  activePage
                )
                  ? 'text-[#f5d061] bg-[#0f2452] font-black border border-[#d4af37]/40'
                  : 'hover:text-[#f5d061] hover:bg-white/5'
              }`}
            >
              <span>Employers</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#d4af37]" />
            </button>

            {employerDropdown && (
              <div
                className="absolute top-full left-0 mt-2 w-64 bg-[#0a1432] rounded-2xl shadow-2xl border border-[#d4af37]/40 py-2 z-50 text-xs animate-in fade-in slide-in-from-top-1 backdrop-blur-xl"
                onMouseLeave={() => setEmployerDropdown(false)}
              >
                <button
                  onClick={() => navigateTo('employers')}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#142657] text-slate-200 hover:text-[#f5d061] flex items-center gap-2.5 cursor-pointer font-medium"
                >
                  <Building className="w-4 h-4 text-[#d4af37]" />
                  <div>
                    <span className="font-bold text-white block">Employers & Client Overview</span>
                    <span className="text-[10px] text-amber-200/70">Register company & terms</span>
                  </div>
                </button>
                <button
                  onClick={() => navigateTo('client-membership')}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#142657] text-slate-200 hover:text-[#f5d061] flex items-center gap-2.5 cursor-pointer font-medium"
                >
                  <Briefcase className="w-4 h-4 text-[#d4af37]" />
                  <div>
                    <span className="font-bold text-white block">Client Membership Plans</span>
                    <span className="text-[10px] text-amber-200/70">Basic, Silver, Gold, Diamond, Platinum</span>
                  </div>
                </button>
                <button
                  onClick={() => navigateTo('post-vacancy')}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#142657] text-slate-200 hover:text-[#f5d061] flex items-center gap-2.5 cursor-pointer font-medium"
                >
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  <div>
                    <span className="font-bold text-white block">Post a Vacancy</span>
                    <span className="text-[10px] text-amber-200/70">Instant requirement submission</span>
                  </div>
                </button>
                <button
                  onClick={() => navigateTo('recruitment-services')}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#142657] text-slate-200 hover:text-[#f5d061] flex items-center gap-2.5 cursor-pointer font-medium"
                >
                  <Settings className="w-4 h-4 text-[#d4af37]" />
                  <div>
                    <span className="font-bold text-white block">Recruitment Services</span>
                    <span className="text-[10px] text-amber-200/70">QuickConnect, SmartSupport, TotalCare</span>
                  </div>
                </button>
                <div className="border-t border-[#d4af37]/20 my-1"></div>
                <button
                  onClick={() => navigateTo('employer-dashboard')}
                  className="w-full text-left px-4 py-2 hover:bg-[#142657] text-[#f5d061] font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>Open Employer Dashboard →</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => navigateTo('recruit-saathi')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activePage === 'recruit-saathi'
                ? 'text-[#f5d061] bg-[#0f2452] font-black border border-[#d4af37]/40'
                : 'hover:text-[#f5d061] hover:bg-white/5'
            }`}
          >
            Recruit Saathi
          </button>

          <button
            onClick={() => navigateTo('mmp-shield')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activePage === 'mmp-shield'
                ? 'text-[#f5d061] bg-[#0f2452] font-black border border-[#d4af37]/40'
                : 'hover:text-[#f5d061] hover:bg-white/5'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>MMP SHIELD™</span>
          </button>

          <button
            onClick={() => navigateTo('franchise')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activePage === 'franchise'
                ? 'text-[#f5d061] bg-[#0f2452] font-black border border-[#d4af37]/40'
                : 'hover:text-[#f5d061] hover:bg-white/5'
            }`}
          >
            Franchise
          </button>

          <button
            onClick={() => navigateTo('contact')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activePage === 'contact'
                ? 'text-[#f5d061] bg-[#0f2452] font-black border border-[#d4af37]/40'
                : 'hover:text-[#f5d061] hover:bg-white/5'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Action CTAs in Corporate Gold & Navy */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={() => navigateTo('candidate-register')}
            className="px-3.5 py-2 text-xs font-bold text-[#f5d061] bg-[#0c183b] hover:bg-[#12255e] border border-[#d4af37]/50 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            Register Free
          </button>
          <button
            onClick={() => navigateTo('post-vacancy')}
            className="px-4 py-2 text-xs font-black text-slate-950 bg-gradient-to-r from-[#ffe685] via-[#d4af37] to-[#b08d24] hover:brightness-110 rounded-xl transition-all cursor-pointer shadow-md shadow-amber-950/30 flex items-center gap-1.5"
          >
            <Briefcase className="w-3.5 h-3.5 text-slate-950" />
            <span>Hire Talent</span>
          </button>
        </div>

        {/* Mobile controls (Search & Hamburger) */}
        <div className="flex sm:hidden items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className={`p-2 rounded-lg transition-colors cursor-pointer border ${
              mobileSearchOpen
                ? 'bg-[#122452] border-[#d4af37] text-[#f5d061]'
                : 'border-transparent text-slate-200 hover:bg-white/10'
            }`}
            aria-label="Toggle Global Search"
          >
            <Search className="w-5 h-5 text-[#d4af37]" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-200 hover:bg-white/10 cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#d4af37]" /> : <Menu className="w-6 h-6 text-[#d4af37]" />}
          </button>
        </div>

        {/* Desktop-only hamburger for screens between sm and lg where nav is still hidden */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="hidden sm:inline-flex lg:hidden p-2 rounded-lg text-slate-200 hover:bg-white/10 cursor-pointer"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#d4af37]" /> : <Menu className="w-6 h-6 text-[#d4af37]" />}
        </button>
      </div>

      {/* Expandable Mobile Search Bar (Direct below header) */}
      {mobileSearchOpen && (
        <div className="sm:hidden bg-[#060c1e] px-4 py-3 border-b border-[#d4af37]/40 shadow-xl animate-in fade-in slide-in-from-top-1 duration-200">
          <GlobalSearch setActivePage={navigateTo} className="w-full" />
        </div>
      )}

      {/* Mobile Drawer Menu in Corporate Gold & Navy */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#060d21] border-b border-[#d4af37]/30 px-4 pt-2 pb-6 space-y-3 max-h-[85vh] overflow-y-auto">
          {/* Mobile In-Drawer Search */}
          <div className="pb-2 border-b border-white/10">
            <GlobalSearch setActivePage={navigateTo} className="w-full" />
          </div>
          {/* Quick Action buttons */}
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/10">
            <button
              onClick={() => navigateTo('find-jobs')}
              className="py-2.5 px-3 bg-[#0f2452] text-[#f5d061] border border-[#d4af37]/40 rounded-xl font-black text-xs text-center"
            >
              FIND JOBS
            </button>
            <button
              onClick={() => navigateTo('post-vacancy')}
              className="py-2.5 px-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded-xl font-black text-xs text-center shadow-md"
            >
              HIRE TALENT
            </button>
          </div>

          <div className="space-y-1 text-xs font-bold text-slate-200">
            <button
              onClick={() => navigateTo('home')}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-slate-100"
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('about')}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-slate-100"
            >
              About MMP (15+ Years)
            </button>
            <button
              onClick={() => navigateTo('find-jobs')}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-slate-100"
            >
              Find Jobs & Vacancies
            </button>
            <button
              onClick={() => navigateTo('workforce-directory')}
              className="w-full text-left px-3 py-2 rounded-lg bg-[#0e1d44] border border-[#d4af37]/30 text-[#f5d061] font-bold flex items-center justify-between"
            >
              <span>Workforce Directory (6 Sectors)</span>
              <span className="bg-[#d4af37] text-slate-950 px-2 py-0.5 rounded text-[10px] font-black">36 Roles</span>
            </button>

            <div className="pt-2 pb-1 border-t border-white/10 text-[10px] font-black text-amber-400 uppercase tracking-widest px-3">
              Candidate Services
            </div>
            <button
              onClick={() => navigateTo('candidate-register')}
              className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-white/5 text-slate-300 font-medium"
            >
              • Free Candidate Registration
            </button>
            <button
              onClick={() => navigateTo('candidate-membership')}
              className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-white/5 text-slate-300 font-medium"
            >
              • Candidate Membership Plans
            </button>
            <button
              onClick={() => navigateTo('job-alerts')}
              className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-white/5 text-slate-300 font-medium"
            >
              • Job Alerts (from ₹49)
            </button>
            <button
              onClick={() => navigateTo('fast-track')}
              className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-white/5 text-slate-300 font-medium"
            >
              • Fast Track Service (₹3,400)
            </button>
            <button
              onClick={() => navigateTo('skill-assessments')}
              className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-white/5 text-amber-400 font-bold"
            >
              • Skill Assessment & Badges
            </button>
            <button
              onClick={() => navigateTo('candidate-dashboard')}
              className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-white/5 text-[#f5d061] font-bold"
            >
              • Skill Verification & Official Certificates
            </button>
            <button
              onClick={() => navigateTo('candidate-dashboard')}
              className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-[#142657] text-[#f5d061] font-black"
            >
              • Candidate Dashboard Portal
            </button>

            <div className="pt-2 pb-1 border-t border-white/10 text-[10px] font-black text-amber-400 uppercase tracking-widest px-3">
              Corporate & Employer Hub
            </div>
            <button
              onClick={() => navigateTo('employers')}
              className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-white/5 text-slate-300 font-medium"
            >
              • Employers / Clients Portal
            </button>
            <button
              onClick={() => navigateTo('client-membership')}
              className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-white/5 text-slate-300 font-medium"
            >
              • Client Membership Plans
            </button>
            <button
              onClick={() => navigateTo('post-vacancy')}
              className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-white/5 text-slate-300 font-medium"
            >
              • Post a Vacancy
            </button>
            <button
              onClick={() => navigateTo('recruitment-services')}
              className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-white/5 text-slate-300 font-medium"
            >
              • Recruitment Services (QuickConnect & TotalCare)
            </button>
            <button
              onClick={() => navigateTo('employer-dashboard')}
              className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-[#142657] text-[#f5d061] font-black"
            >
              • Employer Dashboard Portal
            </button>

            <div className="pt-2 pb-1 border-t border-white/10 text-[10px] font-black text-amber-400 uppercase tracking-widest px-3">
              Governance & Networks
            </div>
            <button
              onClick={() => navigateTo('recruit-saathi')}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-slate-300 font-semibold"
            >
              Recruit Saathi
            </button>
            <button
              onClick={() => navigateTo('mmp-shield')}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 flex items-center gap-1.5 text-amber-300 font-black"
            >
              <Shield className="w-4 h-4 text-[#d4af37]" />
              <span>MMP SHIELD™ Verification</span>
            </button>
            <button
              onClick={() => navigateTo('franchise')}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-slate-300 font-semibold"
            >
              MMP Franchise (₹5 Lakh Setup)
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-slate-300 font-semibold"
            >
              Contact MMP
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setLogoModalOpen(true);
              }}
              className="w-full text-left px-3 py-2 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#f5d061] font-black flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>Official Logo, Heraldry & Details</span>
            </button>
            <button
              onClick={() => navigateTo('admin-erp')}
              className="w-full text-left px-3 py-2 rounded-lg bg-[#0e1d44] border border-[#d4af37]/40 text-[#f5d061] font-black"
            >
              MMP Recruitment ERP Admin
            </button>
          </div>
        </div>
      )}

      {/* Official Insignia & Brand Specification Modal */}
      <LogoModal isOpen={logoModalOpen} onClose={() => setLogoModalOpen(false)} />
    </header>
  );
};
