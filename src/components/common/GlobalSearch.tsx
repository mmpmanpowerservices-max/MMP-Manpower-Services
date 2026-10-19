import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  Briefcase,
  Zap,
  FileText,
  Shield,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Building,
  MapPin,
  CheckCircle2,
  Clock,
  Layers,
  Phone,
  UserCheck,
  CreditCard,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobVacancy } from '../../types';

interface SearchItem {
  id: string;
  type: 'job' | 'service' | 'doc' | 'portal';
  title: string;
  subtitle: string;
  badge?: string;
  categoryLabel: string;
  page: string;
  icon: any;
  queryAction?: string;
  meta?: string;
}

interface Props {
  setActivePage: (page: string) => void;
  className?: string;
}

export const GlobalSearch: React.FC<Props> = ({ setActivePage, className = '' }) => {
  const { jobs, setGlobalSearchQuery, setViewMode } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'job' | 'service' | 'doc'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global static knowledge base for services, policies, and documentation
  const staticItems: SearchItem[] = useMemo(
    () => [
      // Services & Solutions
      {
        id: 'srv-fast-track',
        type: 'service',
        title: 'Fast Track Candidate Screening',
        subtitle: 'Expedited 48-hour interview matching, priority verification & placement assurance (₹3,400)',
        badge: 'Priority Service',
        categoryLabel: 'Services & Acceleration',
        page: 'fast-track',
        icon: Zap,
        meta: '₹3,400 • 48-Hour Guarantee',
      },
      {
        id: 'srv-cand-reg',
        type: 'service',
        title: 'Candidate Registration (Free)',
        subtitle: '100% Free candidate profile creation, KYC document submission, and job matching',
        badge: 'Free',
        categoryLabel: 'Candidate Services',
        page: 'candidate-register',
        icon: UserCheck,
        meta: 'Free for all candidates',
      },
      {
        id: 'srv-cand-membership',
        type: 'service',
        title: 'Candidate Membership Plans',
        subtitle: 'Career Starter (₹499), Career Plus (₹1,499), and Career Pro (₹2,999) with recruiter support',
        badge: '₹499 - ₹2,999',
        categoryLabel: 'Candidate Services',
        page: 'candidate-membership',
        icon: CreditCard,
        meta: '3 Plans • Career Booster',
      },
      {
        id: 'srv-job-alerts',
        type: 'service',
        title: 'Job Alerts Subscription (WhatsApp & SMS)',
        subtitle: 'Instant WhatsApp notifications & daily localized SMS alerts based on your trade skills',
        badge: 'From ₹49',
        categoryLabel: 'Candidate Services',
        page: 'job-alerts',
        icon: Sparkles,
        meta: 'From ₹49/month',
      },
      {
        id: 'srv-skill-assessments',
        type: 'service',
        title: 'Trade Skill Assessments & Badges',
        subtitle: 'Online competency evaluations, skill scorecards, and verified trade badges',
        badge: 'Verified Badges',
        categoryLabel: 'Candidate Services',
        page: 'skill-assessments',
        icon: CheckCircle2,
        meta: 'Certification & Badges',
      },
      {
        id: 'srv-post-vacancy',
        type: 'service',
        title: 'Hire Talent & Post Vacancy',
        subtitle: 'Employer portal to submit staffing requirements across 36 industrial & technical roles',
        badge: 'For Employers',
        categoryLabel: 'Employer Hub',
        page: 'post-vacancy',
        icon: Briefcase,
        meta: 'Direct Hiring Desk',
      },
      {
        id: 'srv-client-membership',
        type: 'service',
        title: 'Employer Client Membership Plans',
        subtitle: 'Silver (₹10,000), Gold (₹25,000), Diamond (₹50,000), Platinum (₹1,00,000) staffing retainer',
        badge: 'Retainer Plans',
        categoryLabel: 'Employer Hub',
        page: 'client-membership',
        icon: Building,
        meta: 'Bulk & Retainer Hiring',
      },
      {
        id: 'srv-recruitment',
        type: 'service',
        title: 'Corporate Recruitment & Mass Staffing',
        subtitle: 'Permanent hiring, contractual staffing, payroll assistance & industrial workforce dispatch',
        badge: 'Enterprise',
        categoryLabel: 'Recruitment Solutions',
        page: 'recruitment-services',
        icon: Building,
        meta: 'End-to-End Staffing',
      },
      {
        id: 'srv-recruit-saathi',
        type: 'service',
        title: 'Recruit Saathi™ AI Match Engine',
        subtitle: 'Intelligent candidate-to-vacancy mapping algorithm ensuring zero-friction talent alignment',
        badge: 'Smart Engine',
        categoryLabel: 'Technology & Matching',
        page: 'recruit-saathi',
        icon: Sparkles,
        meta: 'Automated Match',
      },
      {
        id: 'srv-mmp-shield',
        type: 'service',
        title: 'MMP SHIELD™ Authenticity & Escrow Protection',
        subtitle: 'Zero-fraud guarantee, verified credentials registry, police verification, and fee protection',
        badge: 'Zero Fraud',
        categoryLabel: 'Trust & Protection',
        page: 'mmp-shield',
        icon: ShieldCheck,
        meta: '100% Escrow Security',
      },
      {
        id: 'srv-workforce-directory',
        type: 'service',
        title: 'Workforce Directory (6 Sectors, 36 Roles)',
        subtitle: 'Browse pre-screened talent across Manufacturing, BFSI, Logistics, IT, Sales, and Skilled Trades',
        badge: '36 Roles',
        categoryLabel: 'Talent Directory',
        page: 'workforce-directory',
        icon: Layers,
        meta: 'Pre-screened Pool',
      },
      {
        id: 'srv-franchise',
        type: 'service',
        title: 'Franchise & Branch Partner Program',
        subtitle: 'Partner with MMP Manpower Services to launch an authorized district or taluk staffing branch',
        badge: 'Business Partner',
        categoryLabel: 'Expansion & Partners',
        page: 'franchise',
        icon: Building,
        meta: 'Pan-India Network',
      },

      // Documentation, Legal & Compliance
      {
        id: 'doc-terms',
        type: 'doc',
        title: 'Terms & Conditions (Service Agreement)',
        subtitle: 'Official candidate & client engagement terms, statutory compliance, and fair recruitment rules',
        badge: 'Official Policy',
        categoryLabel: 'Legal & Documentation',
        page: 'terms',
        icon: FileText,
        meta: 'Statutory Compliance',
      },
      {
        id: 'doc-privacy',
        type: 'doc',
        title: 'Privacy Policy & Data Security',
        subtitle: 'Aadhaar masking standards, candidate data encryption, zero third-party disclosure guarantee',
        badge: 'Data Protection',
        categoryLabel: 'Legal & Documentation',
        page: 'privacy',
        icon: Shield,
        meta: 'GDPR & Privacy Compliant',
      },
      {
        id: 'doc-refund',
        type: 'doc',
        title: 'Refund & Replacement Policy',
        subtitle: '10-15 day free candidate replacement turnaround guarantee & transparent refund timelines',
        badge: '10-15 Day Guarantee',
        categoryLabel: 'Legal & Documentation',
        page: 'refund',
        icon: FileText,
        meta: 'Replacement Assurance',
      },
      {
        id: 'doc-contact',
        type: 'doc',
        title: 'Davanagere Head Office & Helplines',
        subtitle: 'Head Office: Davanagere – 577006, Karnataka. Phones: +91 99008 72399, +91 94499 40097',
        badge: 'Support & Desk',
        categoryLabel: 'Help & Contact',
        page: 'contact',
        icon: Phone,
        meta: 'Davanagere & Raichur',
      },
      {
        id: 'doc-insignia',
        type: 'doc',
        title: 'Official MMP Royal Insignia & Brand Assets',
        subtitle: 'YOUR WORKFORCE. OUR STRENGTH. YOUR SUCCESS. Royal 5-peak crown, Saffron & Emerald wings, golden handshake, vector SVG & PNG download',
        badge: 'Brand Kit',
        categoryLabel: 'Brand & Media',
        page: 'about',
        icon: Sparkles,
        meta: 'Vector SVG & HD PNG',
      },
      {
        id: 'doc-about',
        type: 'doc',
        title: 'About MMP Manpower Services (15+ Years Trust)',
        subtitle: 'Corporate profile, YOUR WORKFORCE. OUR STRENGTH. YOUR SUCCESS, vision, and pan-India network',
        badge: 'Corporate Profile',
        categoryLabel: 'About Us',
        page: 'about',
        icon: Shield,
        meta: '15+ Years Track Record',
      },

      // Portals & Dashboards
      {
        id: 'portal-candidate',
        type: 'portal',
        title: 'Candidate Self-Service Dashboard',
        subtitle: 'View submitted applications, interview call letters, certificate downloads, and badge statuses',
        badge: 'Candidate Portal',
        categoryLabel: 'Portal & Management',
        page: 'candidate-dashboard',
        icon: UserCheck,
        meta: 'My Applications & Badges',
      },
      {
        id: 'portal-employer',
        type: 'portal',
        title: 'Employer Management Dashboard',
        subtitle: 'Active vacancies, shortlisted resume pipeline, interview logs, and GST invoices',
        badge: 'Employer Portal',
        categoryLabel: 'Portal & Management',
        page: 'employer-dashboard',
        icon: Building,
        meta: 'Talent Pipeline & Invoices',
      },
      {
        id: 'portal-admin',
        type: 'portal',
        title: 'Enterprise ERP Admin Portal',
        subtitle: 'Super Admin, candidate KYC approvals, employer verification, fee logs, and audit trail',
        badge: 'ERP Admin',
        categoryLabel: 'Portal & Management',
        page: 'admin-erp',
        icon: ShieldCheck,
        meta: 'Restricted Staff Access',
      },
    ],
    []
  );

  // Transform dynamic jobs into search items
  const dynamicJobItems: SearchItem[] = useMemo(() => {
    return jobs.map((job) => ({
      id: `job-${job.id}`,
      type: 'job',
      title: job.title,
      subtitle: `${job.employerName} • ${job.location} • ${job.salaryRange}`,
      badge: job.employmentType,
      categoryLabel: job.category,
      page: 'find-jobs',
      icon: Briefcase,
      queryAction: job.title,
      meta: job.location,
    }));
  }, [jobs]);

  // Combined pool
  const allItems = useMemo(() => {
    return [...dynamicJobItems, ...staticItems];
  }, [dynamicJobItems, staticItems]);

  // Filtered results based on search query and active tab
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    let results = allItems;

    if (activeTab !== 'all') {
      if (activeTab === 'job') {
        results = results.filter((item) => item.type === 'job');
      } else if (activeTab === 'service') {
        results = results.filter((item) => item.type === 'service' || item.type === 'portal');
      } else if (activeTab === 'doc') {
        results = results.filter((item) => item.type === 'doc');
      }
    }

    if (!q) {
      // Return featured recommendations when search input is empty
      return results.slice(0, 7);
    }

    return results
      .filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(q);
        const subMatch = item.subtitle.toLowerCase().includes(q);
        const catMatch = item.categoryLabel.toLowerCase().includes(q);
        const metaMatch = item.meta ? item.meta.toLowerCase().includes(q) : false;
        const badgeMatch = item.badge ? item.badge.toLowerCase().includes(q) : false;
        return titleMatch || subMatch || catMatch || metaMatch || badgeMatch;
      })
      .slice(0, 10);
  }, [allItems, query, activeTab]);

  // Tab counts
  const counts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? allItems.filter((item) => {
          return (
            item.title.toLowerCase().includes(q) ||
            item.subtitle.toLowerCase().includes(q) ||
            item.categoryLabel.toLowerCase().includes(q) ||
            (item.meta && item.meta.toLowerCase().includes(q))
          );
        })
      : allItems;

    return {
      all: base.length,
      job: base.filter((i) => i.type === 'job').length,
      service: base.filter((i) => i.type === 'service' || i.type === 'portal').length,
      doc: base.filter((i) => i.type === 'doc').length,
    };
  }, [allItems, query]);

  // Keyboard shortcut listener (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setTimeout(() => inputRef.current?.focus(), 50);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

  // Handle keyboard navigation inside search list
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults.length > 0 && filteredResults[selectedIndex]) {
        handleSelectItem(filteredResults[selectedIndex]);
      } else if (query.trim()) {
        handleViewAllJobs();
      }
    }
  };

  const handleSelectItem = (item: SearchItem) => {
    if (item.type === 'job') {
      setGlobalSearchQuery(item.queryAction || item.title);
      setActivePage('find-jobs');
    } else if (item.type === 'portal') {
      if (item.page === 'candidate-dashboard') setViewMode('candidate');
      if (item.page === 'employer-dashboard') setViewMode('employer');
      if (item.page === 'admin-erp') setViewMode('admin');
      setActivePage(item.page);
    } else {
      setActivePage(item.page);
    }
    setIsOpen(false);
    setQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllJobs = () => {
    setGlobalSearchQuery(query.trim());
    setActivePage('find-jobs');
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <div className="absolute left-3 pointer-events-none text-[#d4af37]">
          <Search className="w-4 h-4" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleInputKeyDown}
          placeholder="Search jobs, services, policies..."
          className="w-full sm:w-64 md:w-80 lg:w-72 xl:w-88 pl-9 pr-14 py-1.5 text-xs bg-[#0b1739]/90 hover:bg-[#0f1f4d] focus:bg-[#070e24] text-white placeholder-slate-400 rounded-xl border border-[#d4af37]/35 focus:border-[#f5d061] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30 transition-all shadow-inner"
        />

        {/* Right Action: Clear button OR Keyboard shortcut badge */}
        <div className="absolute right-2 flex items-center gap-1">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 text-slate-400 hover:text-white rounded-md cursor-pointer transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-semibold text-amber-300/80 bg-[#162758] border border-[#d4af37]/30 rounded">
              <span>⌘</span>
              <span>K</span>
            </kbd>
          )}
        </div>
      </div>

      {/* Live Interactive Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 sm:right-auto right-0 sm:w-[480px] md:w-[540px] bg-[#070e24] border border-[#d4af37]/50 rounded-2xl shadow-2xl shadow-black/80 z-50 overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header Bar with Filter Tabs */}
          <div className="px-3 py-2 bg-[#0a1538] border-b border-[#d4af37]/20 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 overflow-x-auto text-[11px] py-0.5 no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                All ({counts.all})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('job')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'job'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <Briefcase className="w-3 h-3" />
                <span>Jobs ({counts.job})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('service')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'service'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <Zap className="w-3 h-3" />
                <span>Services ({counts.service})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('doc')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'doc'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <FileText className="w-3 h-3" />
                <span>Policies & Docs ({counts.doc})</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md cursor-pointer transition-colors"
              aria-label="Close search dropdown"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Search Chips if query is empty */}
          {!query && (
            <div className="px-3 py-2 bg-[#050b1d] border-b border-white/5">
              <span className="text-[10px] font-bold text-amber-300/80 uppercase tracking-wider block mb-1.5">
                Popular Searches:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'Fast Track (₹3,400)', action: 'Fast Track' },
                  { label: 'SMT Operator', action: 'SMT' },
                  { label: 'Refund Policy', action: 'Refund' },
                  { label: 'Candidate Membership', action: 'Membership' },
                  { label: 'MMP SHIELD™', action: 'SHIELD' },
                  { label: 'Davangere Head Office', action: 'Davangere' },
                ].map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => {
                      setQuery(chip.action);
                      inputRef.current?.focus();
                    }}
                    className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#0f2452] hover:bg-[#18367a] text-amber-200 border border-[#d4af37]/30 transition-all cursor-pointer"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-white/5 p-1">
            {filteredResults.length === 0 ? (
              <div className="py-8 px-4 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20">
                  <Search className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-200">
                  No matches found for <span className="text-amber-400">"{query}"</span>
                </div>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  Try searching for <span className="text-slate-200">"Driver"</span>,{' '}
                  <span className="text-slate-200">"Fast Track"</span>,{' '}
                  <span className="text-slate-200">"Membership"</span>, or{' '}
                  <span className="text-slate-200">"Refund"</span>.
                </p>
                <button
                  type="button"
                  onClick={handleViewAllJobs}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 cursor-pointer shadow-md"
                >
                  <span>Search in Job Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              filteredResults.map((item, idx) => {
                const ItemIcon = item.icon;
                const isSelected = selectedIndex === idx;

                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#102456] text-white border border-[#d4af37]/40 shadow-sm'
                        : 'hover:bg-[#0c1b42] text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`p-2 rounded-xl shrink-0 mt-0.5 border ${
                          item.type === 'job'
                            ? 'bg-blue-950/70 text-blue-400 border-blue-500/30'
                            : item.type === 'service'
                            ? 'bg-amber-950/70 text-amber-400 border-amber-500/30'
                            : item.type === 'doc'
                            ? 'bg-purple-950/70 text-purple-300 border-purple-500/30'
                            : 'bg-emerald-950/70 text-emerald-400 border-emerald-500/30'
                        }`}
                      >
                        <ItemIcon className="w-4 h-4" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white truncate">{item.title}</span>
                          {item.badge && (
                            <span className="px-1.5 py-0.5 text-[9px] font-black rounded uppercase tracking-wider bg-[#1b3472] text-[#f5d061] border border-[#d4af37]/30 shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{item.subtitle}</p>

                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                          <span className="text-amber-300/80 font-medium">{item.categoryLabel}</span>
                          {item.meta && (
                            <>
                              <span>•</span>
                              <span className="text-slate-300">{item.meta}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 text-slate-400 flex items-center gap-1 text-[11px] font-medium">
                      <span className="hidden sm:inline text-amber-300/70 text-[10px]">Open</span>
                      <ChevronRight className="w-4 h-4 text-[#d4af37]" />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Navigation Bar */}
          <div className="px-3 py-2 bg-[#040816] border-t border-[#d4af37]/20 flex items-center justify-between text-[10px] text-slate-400">
            <div className="flex items-center gap-3">
              <span className="hidden sm:flex items-center gap-1">
                <kbd className="px-1 py-0.2 bg-[#0c1737] border border-white/10 rounded text-[9px]">↑↓</kbd> to
                navigate
              </span>
              <span className="hidden sm:flex items-center gap-1">
                <kbd className="px-1 py-0.2 bg-[#0c1737] border border-white/10 rounded text-[9px]">↵</kbd> to
                select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.2 bg-[#0c1737] border border-white/10 rounded text-[9px]">ESC</kbd> to close
              </span>
            </div>

            {query && (
              <button
                type="button"
                onClick={handleViewAllJobs}
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>View all in Jobs Portal</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
