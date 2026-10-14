import React, { useState } from 'react';
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building,
  Sparkles,
  ArrowRight,
  Shield,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { JobCategory, EmploymentType } from '../types';
import { MmpLogo } from '../components/common/MmpLogo';

interface Props {
  setActivePage: (page: string) => void;
}

export const PostVacancyPage: React.FC<Props> = ({ setActivePage }) => {
  const { postJobVacancy, employers, currentEmployerId } = useApp();

  const [formData, setFormData] = useState({
    employerId: currentEmployerId || 'MMP-CLI-800121',
    employerName: 'Apex Electronics Manufacturing Pvt Ltd',
    title: '',
    category: 'Manufacturing & Electronics' as JobCategory,
    location: 'Davanagere, Karnataka',
    employmentType: 'Full-Time' as EmploymentType,
    salaryRange: '₹18,000 - ₹24,000 / month',
    qualification: 'Diploma (ECE/Mechanical) or ITI',
    experienceRequired: '1 - 3 Years',
    vacanciesCount: 5,
    workingHours: '8-Hour General Shift',
    description: '',
    deadlineDays: 30,
  });

  const [submittedJob, setSubmittedJob] = useState<any>(null);

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

    const deadline = new Date();
    deadline.setDate(deadline.getDate() + Number(formData.deadlineDays || 30));

    const newJob = postJobVacancy({
      employerId: formData.employerId,
      employerName: formData.employerName,
      title: formData.title,
      category: formData.category,
      location: formData.location,
      employmentType: formData.employmentType,
      salaryRange: formData.salaryRange,
      qualification: formData.qualification,
      experienceRequired: formData.experienceRequired,
      vacanciesCount: Number(formData.vacanciesCount) || 1,
      workingHours: formData.workingHours,
      description: formData.description,
      deadlineDate: deadline.toISOString().split('T')[0],
      featured: true,
      mmpShieldVerified: true,
    });

    setSubmittedJob(newJob);

    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#030a1c] via-[#091a3e] to-[#040d24] text-white rounded-3xl p-8 border border-[#d4af37]/40 shadow-xl flex items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f5d061] text-[10px] font-bold font-mono">
            <MmpLogo size="xs" showText={false} />
            <span>MMP HIRING REQUISITION DESK</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-heading mt-2 text-white">
            Post an Active Vacancy
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            Broadcast your job opening instantly across the MMP Manpower candidate portal, job alerts, and verified SMS network.
          </p>
        </div>
        <div className="hidden sm:flex shrink-0 p-2.5 rounded-2xl bg-[#071230] border border-[#d4af37]/50 shadow-lg shadow-amber-950/30">
          <MmpLogo size="md" showText={false} />
        </div>
      </div>

      {!submittedJob ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Employer / Client ID *
                </label>
                <input
                  type="text"
                  required
                  value={formData.employerId}
                  onChange={(e) => {
                    const id = e.target.value;
                    const foundEmp = employers.find((emp) => emp.id.toUpperCase() === id.trim().toUpperCase());
                    setFormData({
                      ...formData,
                      employerId: id,
                      employerName: foundEmp ? foundEmp.companyName : formData.employerName,
                    });
                  }}
                  placeholder="e.g. MMP-CLI-800121"
                  className="w-full text-xs font-mono font-bold px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.employerName}
                  onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                  placeholder="e.g. Apex Electronics Pvt Ltd"
                  className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Job Position Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. SMT Machine Operator & Quality Inspector"
                  className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Job Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden bg-white"
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
                  Job Location (City / Plant) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Davanagere, Karnataka"
                  className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Employment Type
                </label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => setFormData({ ...formData, employmentType: e.target.value as any })}
                  className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden bg-white"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Walk-In">Walk-In Recruitment Drive</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Number of Vacancies *
                </label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  required
                  value={formData.vacanciesCount}
                  onChange={(e) => setFormData({ ...formData, vacanciesCount: Number(e.target.value) })}
                  className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Salary / Compensation Range *
                </label>
                <input
                  type="text"
                  required
                  value={formData.salaryRange}
                  onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                  placeholder="e.g. ₹18,000 - ₹24,000 / month + Incentives"
                  className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Working Hours & Shifts
                </label>
                <input
                  type="text"
                  value={formData.workingHours}
                  onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                  placeholder="e.g. 8-Hour Rotational Shift / 9:30 AM - 6:00 PM"
                  className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Minimum Qualification Required *
                </label>
                <input
                  type="text"
                  required
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  placeholder="e.g. Diploma / ITI / Any Graduate / SSLC"
                  className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Experience Required
                </label>
                <input
                  type="text"
                  value={formData.experienceRequired}
                  onChange={(e) => setFormData({ ...formData, experienceRequired: e.target.value })}
                  placeholder="e.g. Freshers Friendly / 1-3 Years"
                  className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Job Description & Roles/Responsibilities *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detail the daily responsibilities, machines or software used, perks, and working conditions..."
                  className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:border-purple-600 outline-hidden"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Posted vacancies are instantly broadcast on the MMP job board
              </span>
              <button
                type="submit"
                className="px-7 py-3 bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Publish Vacancy to MMP Portal</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Success Screen */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-heading">
            Job Vacancy Published Successfully!
          </h2>
          <p className="text-xs text-slate-600">
            Your vacancy is now live on the MMP Manpower Services platform and visible to verified candidates.
          </p>

          <div className="bg-slate-900 text-white p-5 rounded-2xl text-left border border-slate-800">
            <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2 mb-2">
              <span className="text-amber-400 font-mono font-bold">{submittedJob.id}</span>
              <span className="text-emerald-400 font-bold">STATUS: ACTIVE</span>
            </div>
            <h4 className="font-bold text-sm text-white">{submittedJob.title}</h4>
            <p className="text-xs text-slate-400 mt-0.5">{submittedJob.employerName} • {submittedJob.location}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setActivePage('find-jobs')}
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl"
            >
              View on Job Board
            </button>
            <button
              onClick={() => setActivePage('employer-dashboard')}
              className="flex-1 py-2.5 border border-slate-300 text-slate-800 hover:bg-slate-50 font-bold text-xs rounded-xl"
            >
              Manage in Employer Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
