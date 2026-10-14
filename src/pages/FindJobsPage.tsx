import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  Clock,
  Briefcase,
  Shield,
  Filter,
  CheckCircle2,
  X,
  Send,
  Building,
  AlertCircle,
  FileText,
  User,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { JobCategory, JobVacancy } from '../types';
import { MmpLogo } from '../components/common/MmpLogo';

interface Props {
  setActivePage: (page: string) => void;
}

export const FindJobsPage: React.FC<Props> = ({ setActivePage }) => {
  const { jobs, candidates, currentCandidateId, applyForJob, applications, globalSearchQuery } = useApp();

  const [searchQuery, setSearchQuery] = useState(globalSearchQuery || '');

  useEffect(() => {
    if (globalSearchQuery !== undefined) {
      setSearchQuery(globalSearchQuery);
    }
  }, [globalSearchQuery]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobVacancy | null>(null);

  // Apply modal form
  const [applyCandidateId, setApplyCandidateId] = useState(currentCandidateId);
  const [applyNotes, setApplyNotes] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyError, setApplyError] = useState('');

  // Categories list
  const categories: string[] = [
    'All',
    'Manufacturing & Electronics',
    'Banking & BFSI',
    'Sales & Marketing',
    'Logistics & Supply Chain',
    'IT & Software',
    'Skilled Trade & Technical',
    'General & Unskilled Manpower',
  ];

  const locations = ['All', 'Davanagere', 'Raichur', 'Shimoga', 'Hubli', 'Bangalore', 'PAN-India'];
  const employmentTypes = ['All', 'Full-Time', 'Contract', 'Walk-In'];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.employerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesLocation =
      selectedLocation === 'All' || job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesType = selectedType === 'All' || job.employmentType === selectedType;

    return matchesSearch && matchesCategory && matchesLocation && matchesType;
  });

  const handleOpenApplyModal = (job: JobVacancy) => {
    setSelectedJobForModal(job);
    setApplyNotes('');
    setApplySuccess(false);
    setApplyError('');
  };

  const handleConfirmApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobForModal) return;

    if (!applyCandidateId.trim()) {
      setApplyError('Please enter your MMP Candidate ID (e.g. MMP-CAN-100234) or register first.');
      return;
    }

    const candidateExists = candidates.some(
      (c) => c.id.toUpperCase() === applyCandidateId.trim().toUpperCase()
    );

    if (!candidateExists) {
      setApplyError('Candidate ID not recognized. Please verify or complete Free Candidate Registration.');
      return;
    }

    const success = applyForJob(applyCandidateId.trim().toUpperCase(), selectedJobForModal.id, applyNotes);
    if (!success) {
      setApplyError('You have already submitted an application for this vacancy.');
      return;
    }

    setApplySuccess(true);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Title & Trust Header */}
      <div className="bg-gradient-to-r from-[#030a1c] via-[#091a3e] to-[#040d24] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-[#d4af37]/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f5d061] text-xs font-bold font-mono">
              <MmpLogo size="xs" showText={false} />
              <span>OFFICIAL MMP MANPOWER VACANCY PORTAL</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-heading text-white">
              Find Employment & Staffing Opportunities
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Browse verified job postings in Davanagere, Raichur, Karnataka and PAN-India. All positions are backed by MMP SHIELD™ employer verification.
            </p>
          </div>
          <div className="hidden lg:flex shrink-0 p-2.5 rounded-2xl bg-[#071230] border border-[#d4af37]/50 shadow-lg shadow-amber-950/30">
            <MmpLogo size="md" showText={false} />
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6 bg-white rounded-2xl p-2 shadow-2xl flex flex-col md:flex-row gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 text-slate-800">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Job title, company, skills, or keywords (e.g. Tally, Electronics, SMT, Warehouse)..."
              className="w-full text-xs sm:text-sm outline-hidden text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 border-t md:border-t-0 md:border-l border-slate-200 pt-2 md:pt-0 md:pl-2">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="text-xs text-slate-700 font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-hidden cursor-pointer"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === 'All' ? 'All Locations' : loc}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs text-slate-700 font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-hidden cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Sectors' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Counter */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {employmentTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedType === type
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {type === 'All' ? 'All Types' : type}
            </button>
          ))}
        </div>
        <span className="text-xs font-bold text-slate-500">
          Showing <strong>{filteredJobs.length}</strong> active verified vacancies
        </span>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => {
          const hasApplied = applications.some(
            (a) => a.candidateId === currentCandidateId && a.jobId === job.id
          );

          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                    {job.category}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    MMP SHIELD™
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 hover:text-blue-700 cursor-pointer transition-colors leading-snug">
                  {job.title}
                </h3>
                <p className="text-xs font-semibold text-slate-600 mt-0.5 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.employerName}</span>
                </p>

                <div className="grid grid-cols-2 gap-2 my-4 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="font-medium truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span className="font-medium">{job.employmentType}</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-1.5 text-emerald-800 font-bold">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{job.salaryRange}</span>
                  </div>
                  <div className="col-span-2 text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                    <strong>Req:</strong> {job.qualification} • {job.experienceRequired}
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {job.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="text-[11px] text-slate-400">
                  <span>Vacancies: <strong>{job.vacanciesCount}</strong></span>
                  <span className="mx-1.5">•</span>
                  <span>ID: {job.id}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenApplyModal(job)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
                    hasApplied
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {hasApplied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Applied</span>
                    </>
                  ) : (
                    <>
                      <span>Apply Now</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No vacancies match your criteria</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Try resetting your filters or registering for Job Alerts to receive direct notifications when matching positions are uploaded.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedLocation('All');
              setSelectedType('All');
            }}
            className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Apply Modal */}
      {selectedJobForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden my-6">
            <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                  Direct Application
                </span>
                <h3 className="text-base font-bold text-white">{selectedJobForModal.title}</h3>
                <span className="text-xs text-slate-300">{selectedJobForModal.employerName}</span>
              </div>
              <button
                onClick={() => setSelectedJobForModal(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!applySuccess ? (
              <form onSubmit={handleConfirmApply} className="p-6 space-y-4">
                {applyError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{applyError}</span>
                  </div>
                )}

                <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-blue-600" />
                    MMP Candidate ID Required
                  </div>
                  <p className="text-[11px] text-blue-800 leading-relaxed">
                    Applications are routed through the MMP Manpower ERP system. If you do not have an ID yet, you can register for free in 2 minutes.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your MMP Candidate ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={applyCandidateId}
                    onChange={(e) => setApplyCandidateId(e.target.value)}
                    placeholder="e.g. MMP-CAN-100234"
                    className="w-full text-xs font-mono font-bold px-3 py-2.5 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden bg-white uppercase"
                  />
                  <div className="flex justify-between items-center mt-1 text-[11px]">
                    <span className="text-slate-500">Need an ID?</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedJobForModal(null);
                        setActivePage('candidate-register');
                      }}
                      className="text-blue-700 font-bold hover:underline"
                    >
                      Free Candidate Registration →
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Application Note / Relevant Experience
                  </label>
                  <textarea
                    rows={3}
                    value={applyNotes}
                    onChange={(e) => setApplyNotes(e.target.value)}
                    placeholder="Briefly state why you are suitable for this role, relevant certifications, or when you are available to join..."
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:border-blue-600 outline-hidden bg-white"
                  />
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                  <strong>Notice:</strong> Submitting an application transmits your verified candidate profile to the employer. Shortlisting and interview calls depend on employer requirements and candidate suitability.
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedJobForModal(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Application</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Application Submitted!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your profile has been forwarded to the hiring team at{' '}
                  <strong>{selectedJobForModal.employerName}</strong>. You can track this application in your Candidate Dashboard.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedJobForModal(null);
                      setActivePage('candidate-dashboard');
                    }}
                    className="px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    Go to Candidate Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedJobForModal(null)}
                    className="px-4 py-2.5 border border-slate-300 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50 cursor-pointer"
                  >
                    Browse More Jobs
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
