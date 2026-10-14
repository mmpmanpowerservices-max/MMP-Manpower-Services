import React, { useState } from 'react';
import {
  Shield,
  Search,
  CheckCircle2,
  AlertTriangle,
  Lock,
  FileCheck,
  TrendingUp,
  AlertCircle,
  Clock,
  Award,
  Send,
  Building,
  User,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { CandidateSkillBadgeCard } from '../components/common/CandidateSkillBadgeCard';
import { MmpLogo } from '../components/common/MmpLogo';

interface Props {
  setActivePage: (page: string) => void;
}

export const MmpShieldPage: React.FC<Props> = ({ setActivePage }) => {
  const { lookupShieldRecord, submitComplaint } = useApp();

  const [lookupQuery, setLookupQuery] = useState('MMP-CAN-100234');
  const [lookupResult, setLookupResult] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Complaint Form
  const [complaintForm, setComplaintForm] = useState({
    submittedBy: '',
    userType: 'Candidate' as 'Candidate' | 'Employer' | 'Public',
    userId: '',
    contactNumber: '+91 ',
    subject: '',
    category: 'Service Issue' as any,
    description: '',
  });
  const [complaintSuccess, setComplaintSuccess] = useState<string | null>(null);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const res = lookupShieldRecord(lookupQuery);
    setLookupResult(res);
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket = submitComplaint(complaintForm);
    setComplaintSuccess(newTicket.id);
    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    } catch (err) {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-12 border border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <MmpLogo size="sm" showText={false} />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
              TRUST, SECURITY & AUDIT PROTOCOL
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading leading-tight tracking-tight">
            MMP SHIELD™ VERIFICATION
          </h1>
          <p className="text-sm sm:text-base font-bold text-amber-300 font-mono tracking-widest">
            VERIFY • DOCUMENT • TRACK • CONTROL • AUDIT
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            MMP SHIELD™ is our proprietary trust framework protecting candidates, employers, and recruitment transactions from fraudulent offers, unauthorized bypassing, and misrepresentation.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> 100% Audited Identities
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <Lock className="w-4 h-4" /> Masked Sensitive PII Protection
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-blue-400">
              <FileCheck className="w-4 h-4" /> Anti-Direct Hiring Safeguard
            </span>
          </div>
        </div>
      </div>

      {/* Live Public Credential Verification Tool */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 max-w-4xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            MMP SHIELD™ AUDIT ENGINE
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading mt-2">
            Verify Candidate, Employer or Job ID
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Instantly check authentication status, verified skills, and compliance standing in the MMP Manpower ERP registry.
          </p>
        </div>

        <form onSubmit={handleLookup} className="flex gap-2 max-w-2xl mx-auto mb-6">
          <input
            type="text"
            required
            value={lookupQuery}
            onChange={(e) => setLookupQuery(e.target.value)}
            placeholder="e.g. MMP-CAN-100234, MMP-CLI-800121, or MMP-JOB-7701"
            className="flex-1 text-xs sm:text-sm font-mono font-bold px-4 py-3 border border-slate-300 rounded-2xl focus:border-blue-600 outline-hidden uppercase bg-slate-50 focus:bg-white"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl shadow-md cursor-pointer flex items-center gap-2 transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Verify ID</span>
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-500 mb-6">
          <span>Quick Samples to test:</span>
          <button
            type="button"
            onClick={() => setLookupQuery('MMP-CAN-100234')}
            className="text-blue-700 font-mono font-semibold hover:underline bg-slate-100 px-2 py-0.5 rounded"
          >
            MMP-CAN-100234
          </button>
          <button
            type="button"
            onClick={() => setLookupQuery('MMP-CAN-100318')}
            className="text-blue-700 font-mono font-semibold hover:underline bg-slate-100 px-2 py-0.5 rounded"
          >
            MMP-CAN-100318
          </button>
          <button
            type="button"
            onClick={() => setLookupQuery('MMP-CLI-800121')}
            className="text-purple-700 font-mono font-semibold hover:underline bg-slate-100 px-2 py-0.5 rounded"
          >
            MMP-CLI-800121
          </button>
          <button
            type="button"
            onClick={() => setLookupQuery('MMP-JOB-7701')}
            className="text-emerald-700 font-mono font-semibold hover:underline bg-slate-100 px-2 py-0.5 rounded"
          >
            MMP-JOB-7701
          </button>
        </div>

        {/* Verification Result Output */}
        {hasSearched && (
          <div className="border-t border-slate-100 pt-6">
            {lookupResult && lookupResult.found ? (
              <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200/60 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                        MMP SHIELD™ Verified Record • {lookupResult.type}
                      </span>
                      <h3 className="text-base font-bold text-slate-900">
                        {lookupResult.type === 'Candidate'
                          ? lookupResult.record.fullName
                          : lookupResult.type === 'Employer'
                          ? lookupResult.record.companyName
                          : lookupResult.record.title}
                      </h3>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>AUTHENTIC & VERIFIED</span>
                  </span>
                </div>

                {/* Candidate Specific Details */}
                {lookupResult.type === 'Candidate' && (
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-slate-500 block text-[11px]">Candidate ID</span>
                        <strong className="font-mono text-slate-900">{lookupResult.record.id}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Location</span>
                        <strong className="text-slate-900">{lookupResult.record.currentLocation}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Job Category</span>
                        <strong className="text-slate-900">{lookupResult.record.jobCategory}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Audit Status</span>
                        <strong className="text-emerald-700">{lookupResult.record.verificationStatus}</strong>
                      </div>
                    </div>

                    {/* Masked Sensitive Data Notice */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        ID Proof: {lookupResult.record.idProofType} ({lookupResult.record.idNumberMasked})
                      </span>
                      <span className="italic">Sensitive PII protected under MMP Shield</span>
                    </div>

                    {/* Verified Skill Badges if any */}
                    {lookupResult.record.verifiedBadges && lookupResult.record.verifiedBadges.length > 0 && (
                      <div>
                        <span className="text-xs font-bold text-slate-800 block mb-2">
                          MMP SHIELD™ Verified Competencies & Assessment Scores:
                        </span>
                        <div className="space-y-2">
                          {lookupResult.record.verifiedBadges.map((badge: any) => (
                            <CandidateSkillBadgeCard key={badge.id} badge={badge} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Employer Specific Details */}
                {lookupResult.type === 'Employer' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Client ID</span>
                      <strong className="font-mono text-slate-900">{lookupResult.record.id}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Industry</span>
                      <strong className="text-slate-900">{lookupResult.record.industry}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">City, State</span>
                      <strong className="text-slate-900">{lookupResult.record.city}, {lookupResult.record.state}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Verification Standing</span>
                      <strong className="text-emerald-700">{lookupResult.record.verificationStatus} Client</strong>
                    </div>
                  </div>
                )}

                {/* Job Specific Details */}
                {lookupResult.type === 'Job' && (
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-900">{lookupResult.record.title}</span>
                      <span className="text-emerald-700 font-bold">{lookupResult.record.salaryRange}</span>
                    </div>
                    <p className="text-slate-600">{lookupResult.record.employerName} • {lookupResult.record.location}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-rose-600 mx-auto" />
                <h4 className="font-bold text-sm text-slate-900">Record Not Found in Verified Registry</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  The ID "{lookupQuery}" could not be confirmed in the active MMP database. If you suspect an unauthorized recruitment offer, report it to our grievance desk below.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Enterprise Quality Control: 10-Stage Process Control & Quality Gate (from Page 4) */}
      <div className="bg-slate-950 text-white rounded-3xl p-8 border border-amber-500/30 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
              ENTERPRISE QUALITY CONTROL
            </span>
            <h3 className="text-xl font-black font-heading text-white">
              MMP Shield (10-Stage Process Control & Quality Gate)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            PEOPLE • PROCESS • PROGRESS • TRUSTWORTHY GOVERNANCE
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { step: '01', title: 'Employer Verification', desc: 'MCA, GSTIN & physical plant audit' },
            { step: '02', title: 'Requirement Mapping', desc: 'JD, technical skills & compensation analysis' },
            { step: '03', title: 'Candidate Vetting', desc: 'Aadhaar, education & skill testing' },
            { step: '04', title: 'Interview Records', desc: 'Multi-round feedback & scorecards' },
            { step: '05', title: 'Selection & Offer', desc: 'Official letter & compensation sign-off' },
            { step: '06', title: 'Joining Evidence', desc: 'Biometric on-boarding & attendance start' },
            { step: '07', title: 'Attendance Audits', desc: 'Monthly biometric punch reviews' },
            { step: '08', title: 'Payroll Oversight', desc: 'Punctual salary & bank clearance audit' },
            { step: '09', title: 'Dispute Resolution', desc: 'Grievance desk & mediation support' },
            { step: '10', title: 'Periodic Review', desc: 'Quarterly client CSAT & retention audit' },
          ].map((gate) => (
            <div
              key={gate.step}
              className="bg-white/5 border border-white/10 p-3.5 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 block mb-1">
                  Gate {gate.step}
                </span>
                <strong className="text-xs font-bold text-white block leading-snug">
                  {gate.title}
                </strong>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">{gate.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5 MMP SHIELD Modules (Section 14) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <User className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Candidate Verification</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Authenticates candidate identity documents, education credentials, and practical skill tests. Generates the permanent MMP Candidate ID to eliminate duplicate entries.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <Building className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Employer & Anti-Bypass Control</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Validates GSTIN, plant locations, and business authenticity. Enforces strict anti-bypass safeguards so introduced candidates cannot be hired outside agreed terms.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Lifecycle Audit Tracking</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Digital audit trail across every recruitment milestone: Requisition → Candidate → Interview → Selection → Offer → Joining → Placement.
          </p>
        </div>
      </div>

      {/* Complaint & Grievance Redressal Form */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 max-w-3xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h3 className="text-xl font-black text-slate-900 font-heading">
            MMP SHIELD™ Grievance & Dispute Redressal Desk
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            File a service concern, fraud alert, or direct hiring violation. All submissions receive an encrypted ticket ID and formal resolution review.
          </p>
        </div>

        {!complaintSuccess ? (
          <form onSubmit={handleComplaintSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={complaintForm.submittedBy}
                  onChange={(e) => setComplaintForm({ ...complaintForm, submittedBy: e.target.value })}
                  placeholder="e.g. Anand Kumar / HR Manager"
                  className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone / WhatsApp *</label>
                <input
                  type="text"
                  required
                  value={complaintForm.contactNumber}
                  onChange={(e) => setComplaintForm({ ...complaintForm, contactNumber: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">I am filing as</label>
                <select
                  value={complaintForm.userType}
                  onChange={(e) => setComplaintForm({ ...complaintForm, userType: e.target.value as any })}
                  className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden bg-white"
                >
                  <option value="Candidate">Candidate / Job Seeker</option>
                  <option value="Employer">Employer / Client</option>
                  <option value="Public">Public / General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category of Grievance *</label>
                <select
                  value={complaintForm.category}
                  onChange={(e) => setComplaintForm({ ...complaintForm, category: e.target.value as any })}
                  className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden bg-white"
                >
                  <option value="Service Issue">Service Issue</option>
                  <option value="Direct Hiring Violation">Direct Hiring Violation (Employer Anti-Bypass)</option>
                  <option value="Fraud Report">Fraudulent Recruitment Report</option>
                  <option value="Payment Issue">Payment / Billing Issue</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject / Summary *</label>
                <input
                  type="text"
                  required
                  value={complaintForm.subject}
                  onChange={(e) => setComplaintForm({ ...complaintForm, subject: e.target.value })}
                  placeholder="Brief summary of the issue..."
                  className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description *</label>
                <textarea
                  rows={3}
                  required
                  value={complaintForm.description}
                  onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
                  placeholder="Provide all relevant dates, communication details, or reference IDs..."
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-slate-900 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Grievance to MMP Shield Desk</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-sm text-slate-900">Grievance Ticket Registered</h4>
            <div className="font-mono text-base font-bold text-emerald-800">{complaintSuccess}</div>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Our compliance team will review your record within 24 hours. You can also view this in the MMP ERP Admin portal.
            </p>
            <button
              onClick={() => {
                setComplaintSuccess(null);
                setComplaintForm({
                  submittedBy: '',
                  userType: 'Candidate',
                  userId: '',
                  contactNumber: '+91 ',
                  subject: '',
                  category: 'Service Issue',
                  description: '',
                });
              }}
              className="px-4 py-1.5 border border-slate-300 text-slate-700 hover:bg-white text-xs font-bold rounded-lg cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
