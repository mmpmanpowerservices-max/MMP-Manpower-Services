import React, { useState } from 'react';
import {
  Shield,
  Users,
  Building,
  Briefcase,
  FileCheck,
  CreditCard,
  MessageSquare,
  History,
  TrendingUp,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Download,
  Filter,
} from 'lucide-react';
import { useApp, AdminRole } from '../context/AppContext';
import { CandidateStatus, VerificationStatus } from '../types';
import { MmpLogo } from '../components/common/MmpLogo';

interface Props {
  setActivePage: (page: string) => void;
}

export const AdminErpPage: React.FC<Props> = ({ setActivePage }) => {
  const {
    candidates,
    employers,
    jobs,
    applications,
    complaints,
    payments,
    auditLogs,
    franchiseInquiries,
    adminRole,
    setAdminRole,
    updateCandidateVerification,
    updateCandidateStatus,
    updateEmployerVerification,
    updateComplaintStatus,
    resetToDefaultData,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'candidates' | 'employers' | 'jobs' | 'pipeline' | 'complaints' | 'financials' | 'audit' | 'franchise'
  >('candidates');

  const [searchFilter, setSearchFilter] = useState('');

  const roles: AdminRole[] = [
    'Super Admin',
    'Recruiter',
    'Verification Team',
    'Accounts',
    'Support Team',
    'Franchise Manager',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Admin Header */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <MmpLogo size="sm" showText={false} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
              INTERNAL RECRUITMENT ERP
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black font-heading mt-2">
            MMP Recruitment ERP Control Center
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Jobs → Candidates → Interviews → Offers → Joining → Placements
          </p>
        </div>

        {/* Role Switcher & System Reset */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-900 p-2 rounded-2xl border border-slate-800 text-xs">
            <label className="text-[10px] text-slate-400 uppercase block font-semibold mb-1">
              Active Staff Role:
            </label>
            <select
              value={adminRole}
              onChange={(e) => setAdminRole(e.target.value as AdminRole)}
              className="text-xs bg-slate-950 text-amber-300 font-bold px-3 py-1.5 rounded-lg border border-slate-700 outline-hidden cursor-pointer"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => {
              if (confirm('Reset mock database to initial seed state?')) {
                resetToDefaultData();
              }
            }}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 cursor-pointer"
            title="Reset ERP data to default demo state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo DB</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-500 block font-medium">Candidates</span>
          <span className="text-xl font-black text-slate-900 font-heading">{candidates.length}</span>
          <span className="text-[10px] text-emerald-700 block font-semibold mt-0.5">Master Database</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-500 block font-medium">Employers</span>
          <span className="text-xl font-black text-purple-700 font-heading">{employers.length}</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Active Clients</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-500 block font-medium">Vacancies</span>
          <span className="text-xl font-black text-blue-700 font-heading">{jobs.length}</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Live Requisitions</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-500 block font-medium">Applications</span>
          <span className="text-xl font-black text-amber-600 font-heading">{applications.length}</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Active Pipeline</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-500 block font-medium">Collections</span>
          <span className="text-xl font-black text-emerald-700 font-heading">
            ₹{payments.reduce((acc, p) => acc + p.amount, 0).toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Total Revenue</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-500 block font-medium">Complaints</span>
          <span className="text-xl font-black text-rose-600 font-heading">{complaints.length}</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Shield Grievances</span>
        </div>
      </div>

      {/* ERP Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto text-xs font-bold gap-1">
        {[
          { key: 'candidates', label: `Candidates (${candidates.length})` },
          { key: 'employers', label: `Employers (${employers.length})` },
          { key: 'jobs', label: `Jobs (${jobs.length})` },
          { key: 'pipeline', label: `Recruitment Pipeline (${applications.length})` },
          { key: 'complaints', label: `Shield Grievances (${complaints.length})` },
          { key: 'financials', label: `Financials (${payments.length})` },
          { key: 'franchise', label: `Franchises (${franchiseInquiries.length})` },
          { key: 'audit', label: `Audit Logs (${auditLogs.length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`py-3 px-4 border-b-2 whitespace-nowrap cursor-pointer transition-all ${
              activeTab === tab.key
                ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Candidates Management */}
      {activeTab === 'candidates' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h3 className="font-bold text-sm text-slate-900">
              Candidate Master Database & LifeCycle Stage Management
            </h3>
            <input
              type="text"
              placeholder="Search by name, ID or location..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="text-xs px-3 py-1.5 border border-slate-300 rounded-lg outline-hidden w-64"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                  <th className="py-2.5 px-3">Candidate ID</th>
                  <th className="py-2.5 px-3">Full Name</th>
                  <th className="py-2.5 px-3">Location</th>
                  <th className="py-2.5 px-3">Skills & Badges</th>
                  <th className="py-2.5 px-3">Verification</th>
                  <th className="py-2.5 px-3">Lifecycle Stage</th>
                  <th className="py-2.5 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {candidates
                  .filter(
                    (c) =>
                      c.fullName.toLowerCase().includes(searchFilter.toLowerCase()) ||
                      c.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
                      c.currentLocation.toLowerCase().includes(searchFilter.toLowerCase())
                  )
                  .map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-3 font-mono font-bold text-blue-700">{c.id}</td>
                      <td className="py-2.5 px-3">
                        <strong className="text-slate-900 block">{c.fullName}</strong>
                        <span className="text-[10px] text-slate-400">{c.mobile}</span>
                      </td>
                      <td className="py-2.5 px-3">{c.currentLocation}</td>
                      <td className="py-2.5 px-3">
                        <div className="flex flex-wrap gap-1">
                          {c.verifiedBadges?.map((b) => (
                            <span
                              key={b.id}
                              className="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-bold"
                            >
                              {b.badgeLevel.split(' ')[0]} ({b.scorePercentage}%)
                            </span>
                          ))}
                          {(!c.verifiedBadges || c.verifiedBadges.length === 0) && (
                            <span className="text-[10px] text-slate-400">Unassessed</span>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <select
                          value={c.verificationStatus}
                          onChange={(e) =>
                            updateCandidateVerification(c.id, e.target.value as VerificationStatus)
                          }
                          className="text-[11px] font-semibold bg-white border border-slate-200 rounded px-2 py-1 outline-hidden"
                        >
                          <option value="Verified">Verified</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Pending">Pending</option>
                          <option value="Flagged">Flagged</option>
                        </select>
                      </td>
                      <td className="py-2.5 px-3">
                        <select
                          value={c.status}
                          onChange={(e) => updateCandidateStatus(c.id, e.target.value as CandidateStatus)}
                          className="text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200 rounded px-2 py-1 outline-hidden"
                        >
                          <option value="Registered">Registered</option>
                          <option value="Verified">Verified</option>
                          <option value="Profile Active">Profile Active</option>
                          <option value="Matched">Matched</option>
                          <option value="Interview">Interview</option>
                          <option value="Selected">Selected</option>
                          <option value="Joined">Joined</option>
                        </select>
                      </td>
                      <td className="py-2.5 px-3">
                        <button
                          onClick={() => setActivePage('candidate-dashboard')}
                          className="text-blue-700 hover:underline font-bold text-[11px]"
                        >
                          View Profile →
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Employers Management */}
      {activeTab === 'employers' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900">
            Employer Database & Anti-Bypass Compliance Registry
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                  <th className="py-2.5 px-3">Client ID</th>
                  <th className="py-2.5 px-3">Company</th>
                  <th className="py-2.5 px-3">Contact Person</th>
                  <th className="py-2.5 px-3">Industry / City</th>
                  <th className="py-2.5 px-3">Membership Plan</th>
                  <th className="py-2.5 px-3">Compliance Status</th>
                  <th className="py-2.5 px-3">Anti-Bypass</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {employers.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/80">
                    <td className="py-2.5 px-3 font-mono font-bold text-purple-700">{emp.id}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{emp.companyName}</td>
                    <td className="py-2.5 px-3">{emp.contactPerson} ({emp.mobile})</td>
                    <td className="py-2.5 px-3">{emp.industry} • {emp.city}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{emp.membershipPlan || 'Basic'}</td>
                    <td className="py-2.5 px-3">
                      <select
                        value={emp.verificationStatus}
                        onChange={(e) =>
                          updateEmployerVerification(emp.id, e.target.value as VerificationStatus)
                        }
                        className="text-[11px] font-semibold bg-white border border-slate-200 rounded px-2 py-1 outline-hidden"
                      >
                        <option value="Verified">Verified</option>
                        <option value="Pending">Pending</option>
                        <option value="Under Review">Under Review</option>
                      </select>
                    </td>
                    <td className="py-2.5 px-3 font-bold text-emerald-700">Protected (Shield)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Complaints & Shield Grievance Desk */}
      {activeTab === 'complaints' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900">
            MMP SHIELD™ Grievance & Dispute Redressal Desk
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                  <th className="py-2.5 px-3">Ticket ID</th>
                  <th className="py-2.5 px-3">Complainant</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Subject</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Resolution Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {complaints.map((c) => (
                  <tr key={c.id}>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{c.id}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-900">{c.submittedBy} ({c.contactNumber})</td>
                    <td className="py-2.5 px-3">{c.category}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{c.subject}</td>
                    <td className="py-2.5 px-3">{c.date}</td>
                    <td className="py-2.5 px-3">
                      <select
                        value={c.status}
                        onChange={(e) => updateComplaintStatus(c.id, e.target.value as any)}
                        className="text-[11px] font-bold bg-white border border-slate-200 rounded px-2 py-1"
                      >
                        <option value="Open">Open</option>
                        <option value="Under Investigation">Under Investigation</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-500 max-w-xs truncate">
                      {c.resolutionNotes || 'Investigation assigned'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Audit Logs */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900">
            Immutable Audit Trail & Compliance Action Logs
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                  <th className="py-2.5 px-3">Log ID</th>
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Action Performed</th>
                  <th className="py-2.5 px-3">Actor & Role</th>
                  <th className="py-2.5 px-3">Target ID</th>
                  <th className="py-2.5 px-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px] text-slate-600">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60">
                    <td className="py-2 px-3 text-slate-400">{log.id}</td>
                    <td className="py-2 px-3">{log.timestamp}</td>
                    <td className="py-2 px-3 font-sans font-bold text-slate-800">{log.action}</td>
                    <td className="py-2 px-3 font-sans">{log.actor} ({log.role})</td>
                    <td className="py-2 px-3 font-bold text-blue-700">{log.targetId}</td>
                    <td className="py-2 px-3 font-sans text-slate-500 max-w-md truncate">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Financials */}
      {activeTab === 'financials' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900">
            Billing, Invoices & Collections Ledger
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                  <th className="py-2.5 px-3">Invoice #</th>
                  <th className="py-2.5 px-3">Txn Ref</th>
                  <th className="py-2.5 px-3">Payer / Entity</th>
                  <th className="py-2.5 px-3">Service & Plan</th>
                  <th className="py-2.5 px-3">Amount (INR)</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{p.invoiceNumber}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-400">{p.id}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-800">{p.userName} ({p.userType})</td>
                    <td className="py-2.5 px-3">{p.serviceType} - {p.planName}</td>
                    <td className="py-2.5 px-3 font-bold text-emerald-700">₹{p.amount.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3">{p.date}</td>
                    <td className="py-2.5 px-3 text-emerald-700 font-semibold">{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Franchise Inquiries */}
      {activeTab === 'franchise' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900">
            MMP Franchise Applications & Expansion Leads
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                  <th className="py-2.5 px-3">Inquiry ID</th>
                  <th className="py-2.5 px-3">Applicant Name</th>
                  <th className="py-2.5 px-3">Location Target</th>
                  <th className="py-2.5 px-3">Investment Budget</th>
                  <th className="py-2.5 px-3">Office Space</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {franchiseInquiries.map((frn) => (
                  <tr key={frn.id}>
                    <td className="py-2.5 px-3 font-mono font-bold text-amber-700">{frn.id}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{frn.fullName} ({frn.mobile})</td>
                    <td className="py-2.5 px-3">{frn.city}, {frn.state}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{frn.investmentCapacity}</td>
                    <td className="py-2.5 px-3">{frn.hasOfficeSpace ? 'Yes (Space Available)' : 'To be leased'}</td>
                    <td className="py-2.5 px-3">{frn.submittedAt}</td>
                    <td className="py-2.5 px-3 font-bold text-blue-700">{frn.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
