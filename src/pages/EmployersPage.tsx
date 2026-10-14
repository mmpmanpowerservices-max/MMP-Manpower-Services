import React, { useState } from 'react';
import {
  Building,
  CheckCircle2,
  ShieldAlert,
  Clock,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  FileText,
  Lock,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { OFFICIAL_GOOGLE_FORMS } from '../data/mockData';
import { MmpLogo } from '../components/common/MmpLogo';

interface Props {
  setActivePage: (page: string) => void;
  onOpenEmployerFeePayment: (employer: any) => void;
}

export const EmployersPage: React.FC<Props> = ({ setActivePage, onOpenEmployerFeePayment }) => {
  const { registerEmployer } = useApp();

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    designation: '',
    mobile: '+91 ',
    whatsapp: '+91 ',
    email: '',
    companyAddress: '',
    city: 'Davanagere',
    state: 'Karnataka',
    industry: 'Electronics & Manufacturing',
    website: '',
    gstOrPan: '',
    recruitmentRequirement: '',
    vacanciesCount: 5,
    jobLocation: '',
    salaryRange: '',
    qualification: '',
    experience: '',
    workingHours: '8-Hour General Shift',
    jobDescription: '',
    agreedAntiBypass: false,
    agreedRegistrationFee: false,
  });

  const [registeredEmployer, setRegisteredEmployer] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedAntiBypass || !formData.agreedRegistrationFee) {
      alert('Please accept the Employer Policy and Anti-Bypass agreement to register.');
      return;
    }

    const newEmp = registerEmployer({
      companyName: formData.companyName,
      contactPerson: formData.contactPerson,
      designation: formData.designation,
      mobile: formData.mobile,
      whatsapp: formData.whatsapp || formData.mobile,
      email: formData.email,
      companyAddress: formData.companyAddress,
      city: formData.city,
      state: formData.state,
      industry: formData.industry,
      website: formData.website || undefined,
      gstOrPan: formData.gstOrPan || 'Pending Submission',
    });

    setRegisteredEmployer(newEmp);

    try {
      confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#030a1c] via-[#091a3e] to-[#040d24] text-white rounded-3xl p-8 sm:p-12 border border-[#d4af37]/40 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f5d061] text-xs font-bold font-mono">
              <MmpLogo size="xs" showText={false} />
              <span>OFFICIAL CORPORATE & MSME HIRING PORTAL</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-heading leading-tight text-white">
              Employer Registration & Talent Partnership
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Source pre-screened skilled and unskilled workforce with full MMP SHIELD™ credential verification. Streamline your hiring with Karnataka's trusted manpower partner.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Review SLA: 24–48 Hours</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#f5d061]" />
                <span>Verified Candidates Only</span>
              </span>
            </div>
          </div>
          <div className="hidden lg:flex shrink-0 p-3 rounded-2xl bg-[#071230] border border-[#d4af37]/50 shadow-xl shadow-amber-950/40">
            <MmpLogo size="lg" showText={false} />
          </div>
        </div>
      </div>

      {/* Mandatory Employer Policy & Anti-Bypass Banner (Section 13) */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-2 text-xs text-amber-950">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900 font-heading">
              MMP EMPLOYER REGISTRATION TERMS & ANTI-BYPASS POLICY
            </h3>
            <ul className="list-disc pl-4 space-y-1.5 leading-relaxed">
              <li>
                <strong>Employer Registration Review Fee:</strong> ₹3,000 (non-refundable, subject to applicable MMP terms). Covers initial corporate compliance audit, portal profile setup, and employer ID generation.
              </li>
              <li>
                <strong>Strict Anti-Bypass Agreement:</strong> Candidates introduced by MMP Manpower Services must <em>not be bypassed for direct hiring</em> outside the agreed MMP recruitment process.
              </li>
              <li>
                Unauthorized direct hiring of MMP-introduced candidates will result in applicable commercial recruitment charges and legal remedies as per agreed employer terms.
              </li>
              <li>
                <strong>Review SLA:</strong> Employer registration applications are audited and responded to normally within <strong>24–48 hours</strong>.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Form or Success State */}
      {!registeredEmployer ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 font-heading">
                Register Your Company / Enterprise
              </h3>
              <span className="text-[11px] text-slate-500">All fields marked * are required</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company / Business Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Apex Electronics Pvt Ltd"
                    className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Industry / Sector *</label>
                  <input
                    type="text"
                    required
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="e.g. Manufacturing, Retail, IT, BFSI, Logistics"
                    className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="e.g. Suresh Reddy"
                    className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="e.g. HR Manager / Plant Head"
                    className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Official Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="hr@company.com"
                    className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://company.com"
                    className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">GSTIN or PAN *</label>
                  <input
                    type="text"
                    required
                    value={formData.gstOrPan}
                    onChange={(e) => setFormData({ ...formData, gstOrPan: e.target.value })}
                    placeholder="e.g. 29AAACA1234D1Z5"
                    className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden font-mono uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City & State *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Davanagere, Karnataka"
                    className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Company Address *</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.companyAddress}
                    onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                    placeholder="Industrial area, plot number, street address..."
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Recruitment Requirement (Profiles & Roles Needed)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.recruitmentRequirement}
                    onChange={(e) => setFormData({ ...formData, recruitmentRequirement: e.target.value })}
                    placeholder="e.g. Need 15 SMT machine operators and 2 shift supervisors for plant in Davanagere..."
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden"
                  />
                </div>
              </div>

              {/* Mandatory Policy Checkboxes */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreedAntiBypass}
                    onChange={(e) => setFormData({ ...formData, agreedAntiBypass: e.target.checked })}
                    className="mt-0.5 text-purple-600 rounded"
                  />
                  <span>
                    We agree that <strong>MMP-introduced candidates must not be bypassed for direct hiring</strong> outside the agreed MMP recruitment process.
                  </span>
                </label>
                <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreedRegistrationFee}
                    onChange={(e) => setFormData({ ...formData, agreedRegistrationFee: e.target.checked })}
                    className="mt-0.5 text-purple-600 rounded"
                  />
                  <span>
                    We acknowledge that the <strong>employer registration review fee of ₹3,000 is non-refundable</strong>, subject to applicable MMP terms.
                  </span>
                </label>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <span className="text-xs text-slate-500">Normal Review SLA: 24–48 Hours</span>
                <button
                  type="submit"
                  className="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Employer Profile & Get Client ID</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Google Forms & Quick Benefits */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-sm space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                Official Google Form
              </span>
              <h4 className="font-bold text-base font-heading">
                Prefer Submitting via Existing MMP Google Form?
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                You can directly register your enterprise vacancies using our official recruitment requisition sheet.
              </p>
              <a
                href={OFFICIAL_GOOGLE_FORMS.employerRegistration}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Open Employer Google Form</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <h4 className="font-bold text-sm text-slate-900 font-heading">
                Why Top Companies Hire Through MMP
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Over 15+ years of Karnataka & regional recruitment depth</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>MMP SHIELD™ verified candidates with audited skill tests</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>QuickConnect (pay-per-hire) or membership flexibility</span>
                </li>
              </ul>
              <button
                onClick={() => setActivePage('client-membership')}
                className="w-full mt-3 py-2 border border-purple-600 text-purple-700 hover:bg-purple-50 font-bold text-xs rounded-xl cursor-pointer"
              >
                View Client Membership Plans →
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Employer Registration Success Card */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-heading">
            Employer Registration Submitted!
          </h2>
          <p className="text-xs text-slate-600">
            Welcome, <strong>{registeredEmployer.companyName}</strong>. Your account has been registered in the MMP recruitment ERP.
          </p>

          <div className="bg-gradient-to-br from-slate-900 to-purple-950 text-white p-6 rounded-2xl text-left border border-purple-400/30">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block mb-1">
              Permanent MMP Employer / Client ID
            </span>
            <div className="text-2xl font-black font-mono text-purple-300">
              {registeredEmployer.id}
            </div>
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span>Status: <strong>Pending Verification Review</strong></span>
              <span className="text-amber-400">SLA: 24–48 Hours</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() =>
                onOpenEmployerFeePayment({
                  userId: registeredEmployer.id,
                  userName: registeredEmployer.companyName,
                  planName: 'Employer Registration & Verification Fee',
                  amount: 3000,
                  serviceType: 'Employer Registration Fee',
                })
              }
              className="flex-1 py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
            >
              Pay ₹3,000 Verification Fee
            </button>
            <button
              onClick={() => setActivePage('post-vacancy')}
              className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
            >
              Post First Vacancy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
