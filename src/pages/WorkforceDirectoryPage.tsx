import React, { useState } from 'react';
import {
  Briefcase,
  Shield,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Building,
  Zap,
  Filter,
} from 'lucide-react';
import { WORKFORCE_SECTORS, WorkforceSector } from '../data/workforceDirectory';
import { MmpLogo } from '../components/common/MmpLogo';

interface Props {
  setActivePage: (page: string) => void;
  onSelectRoleToHire?: (roleTitle: string, sectorName: string) => void;
}

export const WorkforceDirectoryPage: React.FC<Props> = ({ setActivePage, onSelectRoleToHire }) => {
  const [selectedSectorId, setSelectedSectorId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSectors = WORKFORCE_SECTORS.map((sector) => {
    const matchingRoles = sector.roles.filter(
      (r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.subtext.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.focus.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...sector, roles: matchingRoles };
  }).filter((sector) => {
    const matchesSector = selectedSectorId === 'all' || sector.id === selectedSectorId;
    return matchesSector && sector.roles.length > 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Executive Header matching Page 2 */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-12 border border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="max-w-4xl space-y-4">
          <div className="flex items-center gap-3">
            <MmpLogo size="sm" showText={false} />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
              OFFICIAL MMP RECRUITMENT SPECIFICATION
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight leading-tight uppercase">
            COMPLETE WORKFORCE PROFILES DIRECTORY
          </h1>
          <p className="text-sm sm:text-base font-bold text-amber-300 font-mono tracking-wide">
            VERIFIED TALENT FOR EVERY NEED • 6 CORE SECTORS • 36+ READY ROLES
          </p>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Talent Tiers: <strong>Skilled, Semi-Skilled & General</strong> • Rapid <strong>48–72 Hr Mobilization</strong> across Davanagere, Raichur, Karnataka and PAN-India enterprises.
          </p>

          {/* 4 Guarantees Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3">
            <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/15 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-300 block">Sectors</span>
              <strong className="text-sm font-black text-amber-300 font-heading">6 Categories</strong>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/15 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-300 block">Ready Roles</span>
              <strong className="text-sm font-black text-blue-300 font-heading">36+ Job Profiles</strong>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/15 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-300 block">Identity Check</span>
              <strong className="text-sm font-black text-emerald-300 font-heading">100% Verified</strong>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/15 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-300 block">Replacement</span>
              <strong className="text-sm font-black text-purple-300 font-heading">10–15 Days SLA</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Sector Filters */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex-1 w-full flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across 36+ job profiles (e.g. SMT, Housekeeping, CCTV, Forklift, Tally, Telemarketing)..."
              className="w-full text-xs sm:text-sm bg-transparent outline-hidden text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <button
            onClick={() => setActivePage('post-vacancy')}
            className="shrink-0 px-5 py-2.5 bg-slate-950 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span>Hire Workforce Now</span>
          </button>
        </div>

        {/* Sector Filter Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <button
            onClick={() => setSelectedSectorId('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedSectorId === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All 6 Core Sectors (36 Roles)
          </button>
          {WORKFORCE_SECTORS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSectorId(s.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSectorId === s.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {s.badge}
            </button>
          ))}
        </div>
      </div>

      {/* 6 Core Sectors Grid */}
      <div className="space-y-10">
        {filteredSectors.map((sector) => (
          <div key={sector.id} className="space-y-4">
            {/* Sector Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-slate-900 text-amber-400">
                  {sector.badge}
                </span>
                <h2 className="text-xl font-black text-slate-900 font-heading">
                  {sector.categoryName}
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-semibold">
                {sector.roles.length} Ready Profiles
              </span>
            </div>

            {/* 6 Roles in this Sector */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sector.roles.map((role, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-500 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {role.focus}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        48-72h Deploy
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 leading-snug">
                      {role.title}
                    </h3>
                    <span className="text-xs text-slate-500 block font-medium mt-0.5">
                      {role.subtext}
                    </span>

                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">MMP Verified Profile</span>
                    <button
                      onClick={() => {
                        if (onSelectRoleToHire) {
                          onSelectRoleToHire(role.title, sector.categoryName);
                        } else {
                          setActivePage('post-vacancy');
                        }
                      }}
                      className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Deploy Role</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
