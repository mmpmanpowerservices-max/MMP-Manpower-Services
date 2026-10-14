import React, { useState } from 'react';
import {
  Building,
  Briefcase,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  ShieldCheck,
  Calendar,
  CreditCard,
  Award,
  Filter,
  Search,
  ExternalLink,
  Eye,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CandidateSkillBadgeCard } from '../components/common/CandidateSkillBadgeCard';
import { SkillCertificateModal } from '../components/common/SkillCertificateModal';
import { MmpLogo } from '../components/common/MmpLogo';
import { CandidateStatus, CandidateSkillBadge, Candidate } from '../types';

interface Props {
  setActivePage: (page: string) => void;
}

export const EmployerDashboardPage: React.FC<Props> = ({ setActivePage }) => {
  const {
    employers,
    currentEmployerId,
    setCurrentEmployerId,
    jobs,
    applications,
    candidates,
    updateApplicationStatus,
    payments,
  } = useApp();

  const currentEmployer =
    employers.find((e) => e.id === currentEmployerId) || employers[0];

  const employerJobs = jobs.filter((j) => j.employerId === currentEmployer?.id);
  const employerApplications = applications.filter(
    (app) => app.employerId === currentEmployer?.id
  );
  const employerPayments = payments.filter((p) => p.userId === currentEmployer?.id);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'vacancies' | 'applicants' | 'invoices'>('applicants');

  // Certificate Modal State for Employer Review
  const [selectedBadgeForCert, setSelectedBadgeForCert] = useState<{
    badge: CandidateSkillBadge;
    candidate: Candidate;
  } | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Top Banner with Corporate Gold & Navy Styling */}
      <div className="bg-gradient-to-r from-[#030a1c] via-[#091a3e] to-[#040d24] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#d4af37]/35 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5 relative z-10">
          <div className="shrink-0 p-1.5 rounded-2xl bg-gradient-to-b from-[#0a142f] to-[#020614] border border-[#d4af37]/40 shadow-lg">
            <MmpLogo size="sm" showText={false} />
          </div>

          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black font-heading text-white">
                {currentEmployer.companyName}
              </h1>
              <span className="text-[11px] font-black px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                ✓ {currentEmployer.status}
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 text-[#f5d061] border border-[#d4af37]/40">
                {currentEmployer.membershipPlan || 'Corporate Partner'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-300 font-mono">
              <span>
                Client ID: <strong className="text-[#f5d061]">{currentEmployer.id}</strong>
              </span>
              <span>•</span>
              <span>
                {currentEmployer.city}, {currentEmployer.state}
              </span>
              <span>•</span>
              <span className="text-blue-200">Sector: {currentEmployer.industry}</span>
            </div>
          </div>
        </div>

        {/* Switcher & Post Vacancy Action */}
        <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-[#d4af37]/30 text-xs">
            <label className="text-[10px] text-[#f5d061] uppercase block font-bold mb-1 tracking-wider font-mono">
              Switch Employer Account:
            </label>
            <select
              value={currentEmployer.id}
              onChange={(e) => setCurrentEmployerId(e.target.value)}
              className="text-xs bg-[#040918] text-[#f5d061] px-3 py-1.5 rounded-xl border border-[#d4af37]/40 outline-hidden font-mono cursor-pointer"
            >
              {employers.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.companyName} ({emp.id})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setActivePage('post-vacancy')}
            className="px-5 py-3 bg-gradient-to-r from-[#d4af37] to-[#b8860b] hover:from-[#e5c158] hover:to-[#c99516] text-[#040918] font-black text-xs rounded-2xl shadow-xl flex items-center gap-2 cursor-pointer transition-all border border-[#fff2a3]/40"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Post New Vacancy</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Metric Cards in Gold & Navy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:border-[#d4af37]/50 transition-all">
          <span className="text-xs font-bold text-slate-500 block">Total Received Applications</span>
          <span className="text-2xl font-black text-[#0a1128] font-heading mt-1 block">
            {employerApplications.length} Candidates
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
            All screened through MMP SHIELD™
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:border-[#d4af37]/50 transition-all">
          <span className="text-xs font-bold text-slate-500 block">Active Job Postings</span>
          <span className="text-2xl font-black text-[#0f2452] font-heading mt-1 block">
            {employerJobs.length} Positions
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Circulated across Davanagere & Raichur
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:border-[#d4af37]/50 transition-all">
          <span className="text-xs font-bold text-slate-500 block">Skill-Certified Candidates</span>
          <span className="text-2xl font-black text-[#9c7717] font-heading mt-1 block">
            {
              employerApplications.filter((app) => {
                const c = candidates.find((cand) => cand.id === app.candidateId);
                return c?.verifiedBadges && c.verifiedBadges.length > 0;
              }).length
            }{' '}
            Profiles
          </span>
          <span className="text-[11px] text-amber-800 font-semibold mt-1 block">
            With Gold/Silver Competency Badges
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:border-[#d4af37]/50 transition-all">
          <span className="text-xs font-bold text-slate-500 block">Corporate Support SLA</span>
          <span className="text-2xl font-black text-blue-900 font-heading mt-1 block">
            24–48 Hours
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Replacement guarantee: 10–15 days
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto bg-white rounded-2xl px-3 shadow-xs">
        <button
          onClick={() => setActiveTab('applicants')}
          className={`py-3.5 px-6 text-xs font-black tracking-wide border-b-2 cursor-pointer transition-all flex items-center gap-2 ${
            activeTab === 'applicants'
              ? 'border-[#0a1128] text-[#0a1128]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4 text-[#9c7717]" />
          <span>Candidate Talent Pipeline ({employerApplications.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('vacancies')}
          className={`py-3.5 px-6 text-xs font-black tracking-wide border-b-2 cursor-pointer transition-all flex items-center gap-2 ${
            activeTab === 'vacancies'
              ? 'border-[#0a1128] text-[#0a1128]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4 text-blue-800" />
          <span>Active Job Requisitions ({employerJobs.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`py-3.5 px-6 text-xs font-black tracking-wide border-b-2 cursor-pointer transition-all flex items-center gap-2 ${
            activeTab === 'invoices'
              ? 'border-[#0a1128] text-[#0a1128]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CreditCard className="w-4 h-4 text-slate-600" />
          <span>Billing & Invoices ({employerPayments.length})</span>
        </button>
      </div>

      {/* Tab: Applicants Pipeline with Verified Skill Badges & Certificates */}
      {activeTab === 'applicants' && (
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/80 border border-[#d4af37]/40 rounded-2xl flex items-center justify-between text-xs text-slate-800 shadow-xs">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-[#9c7717] shrink-0" />
              <span>
                <strong className="text-[#0a1128]">MMP SHIELD™ Verified Skills Transparency:</strong>{' '}
                Candidates below display verified skill assessment test scorecards, certified badge tiers, and official visual seals to assist your technical shortlisting with zero false claims.
              </span>
            </div>
          </div>

          {employerApplications.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {employerApplications.map((app) => {
                const candidateObj = candidates.find((c) => c.id === app.candidateId);

                return (
                  <div
                    key={app.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:border-[#d4af37]/60 hover:shadow-md transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-black text-base text-[#0a1128] font-heading">
                            {app.candidateName}
                          </h3>
                          <span className="text-[11px] font-mono text-[#0a1128] bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-lg font-bold">
                            {app.candidateId}
                          </span>
                          {candidateObj?.verifiedBadges && candidateObj.verifiedBadges.length > 0 && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#d4af37]/20 text-[#856512] border border-[#d4af37]/40 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-[#856512]" />
                              {candidateObj.verifiedBadges.length} Certified Skills
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-1 font-medium">
                          Applying for: <strong className="text-slate-900">{app.jobTitle}</strong>
                        </p>
                      </div>

                      {/* Status progression changer */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-bold">Hiring Stage:</span>
                        <select
                          value={app.status}
                          onChange={(e) =>
                            updateApplicationStatus(
                              app.id,
                              e.target.value as CandidateStatus,
                              `Status changed to ${e.target.value} by hiring manager`
                            )
                          }
                          className="text-xs font-black px-3.5 py-1.5 rounded-xl border border-slate-300 bg-slate-50 text-[#0a1128] cursor-pointer hover:border-[#d4af37]"
                        >
                          <option value="Profile Active">Profile Active</option>
                          <option value="Matched">Matched</option>
                          <option value="Interview">Interview Scheduled</option>
                          <option value="Selected">Selected</option>
                          <option value="Joined">Joined & Deployed</option>
                        </select>
                      </div>
                    </div>

                    {/* Candidate Details & Education */}
                    {candidateObj && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/80 p-3.5 rounded-2xl text-xs text-slate-700 border border-slate-100">
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">
                            Education
                          </span>
                          <strong className="text-slate-900">{candidateObj.education}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">
                            Experience
                          </span>
                          <strong className="text-slate-900">{candidateObj.experienceYears} Years</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">
                            Location
                          </span>
                          <strong className="text-slate-900">{candidateObj.currentLocation}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">
                            Expected CTC
                          </span>
                          <strong className="text-emerald-700">{candidateObj.expectedSalary}</strong>
                        </div>
                      </div>
                    )}

                    {/* Verified Skill Badges Display on Profile with Certificate View Action */}
                    {candidateObj?.verifiedBadges && candidateObj.verifiedBadges.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <span className="text-xs font-black text-[#0a1128] block flex items-center gap-1.5 font-heading">
                          <Award className="w-4 h-4 text-[#9c7717]" />
                          <span>Candidate Verified Skill Assessments & Official Certificates:</span>
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {candidateObj.verifiedBadges.map((badge) => (
                            <CandidateSkillBadgeCard
                              key={badge.id}
                              badge={badge}
                              onViewCertificate={(b) =>
                                setSelectedBadgeForCert({ badge: b, candidate: candidateObj })
                              }
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Application notes & Interview schedule */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-slate-500 border-t border-slate-100">
                      <span>
                        Application Reference: <strong className="font-mono">{app.id}</strong> (Applied {app.appliedDate})
                      </span>
                      {app.interviewDate && (
                        <span className="text-amber-900 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                          📅 Scheduled Interview: {app.interviewDate} at {app.interviewLocation}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 bg-white rounded-3xl border border-slate-200 text-center text-xs text-slate-500">
              No candidate applications received yet. Vacancies are being circulated by our recruitment desk.
            </div>
          )}
        </div>
      )}

      {/* Tab: Vacancies */}
      {activeTab === 'vacancies' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700">Active Job Requisitions</span>
            <button
              onClick={() => setActivePage('post-vacancy')}
              className="px-4 py-2 bg-[#0a1128] hover:bg-[#16295c] text-[#f5d061] border border-[#d4af37]/40 font-bold text-xs rounded-xl shadow-xs cursor-pointer"
            >
              + Create Requisition
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {employerJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs hover:border-[#d4af37]/50 transition-all space-y-3"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h4 className="font-black text-sm text-[#0a1128] font-heading">{job.title}</h4>
                    <span className="text-xs text-slate-500 font-medium">
                      {job.category} • {job.employmentType}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                    {job.status}
                  </span>
                </div>

                <div className="text-xs text-slate-600 line-clamp-2">{job.description}</div>

                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl text-[11px] text-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">Location</span>
                    <strong className="truncate block">{job.location}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">Salary</span>
                    <strong className="text-emerald-700 truncate block">{job.salaryRange}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">Openings</span>
                    <strong>{job.vacanciesCount} Positions</strong>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 text-[11px] text-slate-400 border-t border-slate-100">
                  <span className="font-mono">Ref: {job.id}</span>
                  <span>Posted: {job.postedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Invoices */}
      {activeTab === 'invoices' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <h3 className="font-black text-base text-[#0a1128] font-heading">
            Official Tax Invoices & Billing Ledger
          </h3>
          {employerPayments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                    <th className="py-2.5 px-3">Invoice #</th>
                    <th className="py-2.5 px-3">Plan / Fee</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Payment Mode</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {employerPayments.map((p) => (
                    <tr key={p.id}>
                      <td className="py-2.5 px-3 font-mono font-bold text-[#0a1128]">
                        {p.invoiceNumber}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-800">{p.planName}</td>
                      <td className="py-2.5 px-3">{p.date}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">
                        ₹{p.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2.5 px-3">{p.paymentMethod}</td>
                      <td className="py-2.5 px-3 text-emerald-700 font-bold">Settled</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 bg-slate-50 rounded-2xl text-xs text-slate-500 text-center">
              No invoice records logged.
            </div>
          )}
        </div>
      )}

      {/* Employer Modal for Verifying and Viewing Candidate Certificate with Official Seal */}
      {selectedBadgeForCert && (
        <SkillCertificateModal
          badge={selectedBadgeForCert.badge}
          candidate={selectedBadgeForCert.candidate}
          onClose={() => setSelectedBadgeForCert(null)}
        />
      )}
    </div>
  );
};
