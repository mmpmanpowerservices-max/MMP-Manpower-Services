import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  FileText,
  Upload,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { JobCategory, EmploymentType } from '../types';
import { OFFICIAL_GOOGLE_FORMS } from '../data/mockData';
import { MmpLogo } from '../components/common/MmpLogo';

interface Props {
  setActivePage: (page: string) => void;
}

export const CandidateRegisterPage: React.FC<Props> = ({ setActivePage }) => {
  const { registerCandidate } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '+91 ',
    whatsapp: '+91 ',
    email: '',
    dob: '',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    currentLocation: '',
    preferredLocation: '',
    education: '',
    skillsString: '',
    experienceYears: 0,
    currentSalary: '',
    expectedSalary: '',
    jobCategory: 'Manufacturing & Electronics' as JobCategory,
    employmentType: 'Full-Time' as EmploymentType,
    idProofType: 'Aadhaar' as 'Aadhaar' | 'PAN' | 'Voter ID' | 'Driving License',
    idNumber: '',
  });

  const [registeredCandidateId, setRegisteredCandidateId] = useState<string | null>(null);

  const categories: JobCategory[] = [
    'Manufacturing & Electronics',
    'Banking & BFSI',
    'Sales & Marketing',
    'Logistics & Supply Chain',
    'IT & Software',
    'Telecom & Networking',
    'Education & EdTech',
    'Healthcare & Pharma',
    'Administration & HR',
    'Skilled Trade & Technical',
    'General & Unskilled Manpower',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = formData.skillsString
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    // Mask ID number for privacy
    const rawId = formData.idNumber.trim();
    const maskedId =
      rawId.length >= 4 ? `XXXX-XXXX-${rawId.slice(-4)}` : 'XXXX-XXXX-9912';

    const newCandidate = registerCandidate({
      fullName: formData.fullName,
      mobile: formData.mobile,
      whatsapp: formData.whatsapp || formData.mobile,
      email: formData.email,
      dob: formData.dob || '2000-01-01',
      gender: formData.gender,
      currentLocation: formData.currentLocation,
      preferredLocation: formData.preferredLocation || formData.currentLocation,
      education: formData.education,
      skills: skillsArray.length > 0 ? skillsArray : ['General Skills'],
      experienceYears: Number(formData.experienceYears) || 0,
      currentSalary: formData.currentSalary || 'Fresher',
      expectedSalary: formData.expectedSalary || 'As per industry norms',
      jobCategory: formData.jobCategory,
      employmentType: formData.employmentType,
      resumeFileName: `${formData.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
      idProofType: formData.idProofType,
      idNumberMasked: maskedId,
    });

    setRegisteredCandidateId(newCandidate.id);
    setStep(3);

    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
              FREE CANDIDATE ENROLLMENT
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-heading mt-2">
              Candidate Profile Registration
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Join the MMP Manpower master database. Receive verified job matches across Karnataka and PAN-India.
            </p>
          </div>
          <div className="shrink-0 bg-white/10 p-3 rounded-2xl border border-white/20 text-center">
            <span className="text-[10px] text-slate-300 uppercase block font-semibold">Registration Cost</span>
            <span className="text-xl font-black text-emerald-400 font-heading">100% FREE</span>
          </div>
        </div>
      </div>

      {/* Google Form Alternate Callout */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-blue-950">
        <div className="flex items-center gap-2.5">
          <FileText className="w-5 h-5 text-blue-700 shrink-0" />
          <span>
            Prefer filling via official Google Form? You can submit your candidate profile directly using the MMP master form.
          </span>
        </div>
        <a
          href={OFFICIAL_GOOGLE_FORMS.candidateRegistration}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors"
        >
          <span>Open Google Form</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {step !== 3 ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
          {/* Progress Indicators */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                  step === 1 ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
                }`}
              >
                1
              </span>
              <span className="text-xs font-bold text-slate-800">Personal & Contact</span>
            </div>
            <div className="w-12 h-0.5 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                  step === 2 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                }`}
              >
                2
              </span>
              <span className="text-xs font-bold text-slate-800">Education, Skills & KYC</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Step 1: Personal & Contact Information</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name (as per Aadhaar/ID) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Anand Kumar Nayak"
                      className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number (Calling) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="+91 99000 00000"
                      className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp Number (for Job Alerts) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="+91 99000 00000"
                      className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Current City / District *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.currentLocation}
                      onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                      placeholder="e.g. Davanagere, Raichur, Bangalore"
                      className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Job Location(s)
                    </label>
                    <input
                      type="text"
                      value={formData.preferredLocation}
                      onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                      placeholder="e.g. Davanagere / Bangalore / Anywhere Karnataka"
                      className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.fullName || !formData.mobile || !formData.email || !formData.currentLocation) {
                        alert('Please fill the required fields in Step 1.');
                        return;
                      }
                      setStep(2);
                    }}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Proceed to Education & Skills</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Step 2: Education, Experience & Verification</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Highest Education / Qualification *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                      placeholder="e.g. B.Com, ITI Fitter, B.Tech ECE, PUC, 10th Standard"
                      className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Job Category *
                    </label>
                    <select
                      value={formData.jobCategory}
                      onChange={(e) => setFormData({ ...formData, jobCategory: e.target.value as any })}
                      className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden bg-white"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Total Years of Experience
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={30}
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                      className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Employment Type
                    </label>
                    <select
                      value={formData.employmentType}
                      onChange={(e) => setFormData({ ...formData, employmentType: e.target.value as any })}
                      className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden bg-white"
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Walk-In">Walk-In Drive</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Key Skills (comma separated) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.skillsString}
                      onChange={(e) => setFormData({ ...formData, skillsString: e.target.value })}
                      placeholder="e.g. Tally Prime, GST, Customer Support, PCB Assembly, Forklift, Excel"
                      className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Current Salary (if working)
                    </label>
                    <input
                      type="text"
                      value={formData.currentSalary}
                      onChange={(e) => setFormData({ ...formData, currentSalary: e.target.value })}
                      placeholder="e.g. ₹20,000 / month or Fresher"
                      className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Expected Salary Range *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.expectedSalary}
                      onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                      placeholder="e.g. ₹22,000 - ₹28,000 / month"
                      className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Government ID Proof Type
                    </label>
                    <select
                      value={formData.idProofType}
                      onChange={(e) => setFormData({ ...formData, idProofType: e.target.value as any })}
                      className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden bg-white"
                    >
                      <option value="Aadhaar">Aadhaar Card</option>
                      <option value="PAN">PAN Card</option>
                      <option value="Voter ID">Voter ID</option>
                      <option value="Driving License">Driving License</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ID Number (Last 4 digits or Number) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.idNumber}
                      onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                      placeholder="e.g. 4198 or ABCD1234E"
                      className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden font-mono"
                    />
                  </div>
                </div>

                {/* Resume Upload Simulation */}
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center bg-slate-50">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-slate-800 block">
                    Upload Resume / Bio-Data (PDF, DOCX)
                  </span>
                  <span className="text-[11px] text-slate-500">
                    File selected: {formData.fullName ? `${formData.fullName.replace(/\s+/g, '_')}_Resume.pdf` : 'Candidate_CV.pdf'}
                  </span>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-relaxed">
                  <strong>Trust Notice:</strong> Free registration enters your profile into the MMP talent database. Registration is completely free and does not promise or guarantee job placement or interview selection.
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                  >
                    ← Back to Step 1
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg cursor-pointer flex items-center gap-1.5 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete Registration & Generate Candidate ID</span>
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      ) : (
        /* Success Screen */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Registration Completed Successfully!
          </span>

          <h2 className="text-2xl font-black text-slate-900 font-heading">
            Welcome to MMP Manpower Services, {formData.fullName}!
          </h2>

          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white border border-amber-400/40 shadow-xl text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                Official MMP Candidate ID
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                Under Review
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-black text-amber-300 tracking-wider">
              {registeredCandidateId}
            </div>
            <p className="text-xs text-slate-300 mt-2">
              Save this permanent ID for all job applications, interview verification, and MMP SHIELD™ audits.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <button
              onClick={() => setActivePage('skill-assessments')}
              className="p-3 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl font-bold text-amber-950 flex flex-col items-center justify-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Take Skill Assessment</span>
              <span className="text-[10px] text-amber-700 font-normal">Earn verified badge</span>
            </button>
            <button
              onClick={() => setActivePage('candidate-membership')}
              className="p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl font-bold text-blue-900 flex flex-col items-center justify-center gap-1 cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-blue-700" />
              <span>Explore Memberships</span>
              <span className="text-[10px] text-blue-600 font-normal">From ₹499/3M</span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => setActivePage('candidate-dashboard')}
              className="w-full py-3 bg-slate-900 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors"
            >
              Go to Candidate Dashboard Portal →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
