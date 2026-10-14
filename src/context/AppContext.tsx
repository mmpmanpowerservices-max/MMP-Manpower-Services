import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Candidate,
  Employer,
  JobVacancy,
  JobApplication,
  ComplaintTicket,
  PaymentTransaction,
  AuditLog,
  FranchiseInquiry,
  CandidateStatus,
  VerificationStatus,
  CandidateSkillBadge,
} from '../types';
import {
  INITIAL_CANDIDATES,
  INITIAL_EMPLOYERS,
  INITIAL_JOBS,
  INITIAL_APPLICATIONS,
  INITIAL_COMPLAINTS,
  INITIAL_PAYMENTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_FRANCHISES,
} from '../data/mockData';

export type UserViewMode = 'public' | 'candidate' | 'employer' | 'admin';
export type AdminRole =
  | 'Super Admin'
  | 'Recruiter'
  | 'Verification Team'
  | 'Accounts'
  | 'Support Team'
  | 'Franchise Manager';

interface AppContextType {
  candidates: Candidate[];
  employers: Employer[];
  jobs: JobVacancy[];
  applications: JobApplication[];
  complaints: ComplaintTicket[];
  payments: PaymentTransaction[];
  auditLogs: AuditLog[];
  franchiseInquiries: FranchiseInquiry[];
  
  // Active User session simulation
  viewMode: UserViewMode;
  setViewMode: (mode: UserViewMode) => void;
  currentCandidateId: string;
  setCurrentCandidateId: (id: string) => void;
  currentEmployerId: string;
  setCurrentEmployerId: (id: string) => void;
  adminRole: AdminRole;
  setAdminRole: (role: AdminRole) => void;
  
  // Global Search state
  globalSearchQuery: string;
  setGlobalSearchQuery: (q: string) => void;
  
  // Core Actions
  registerCandidate: (data: Omit<Candidate, 'id' | 'registeredDate' | 'verificationStatus' | 'status'>) => Candidate;
  registerEmployer: (data: Omit<Employer, 'id' | 'registeredDate' | 'verificationStatus' | 'status' | 'vacanciesCount' | 'openings'>) => Employer;
  postJobVacancy: (data: Omit<JobVacancy, 'id' | 'postedDate' | 'status'>) => JobVacancy;
  applyForJob: (candidateId: string, jobId: string, notes?: string) => boolean;
  completeSkillAssessment: (
    candidateId: string,
    badgeData: Omit<CandidateSkillBadge, 'id' | 'completedAt' | 'verifiedByShield'>
  ) => CandidateSkillBadge;
  uploadCandidateCertificate: (
    candidateId: string,
    certData: {
      title: string;
      issuingAuthority: string;
      issueYear: string;
      fileName: string;
    }
  ) => any;
  purchaseMembershipOrService: (params: {
    userId: string;
    userName: string;
    userType: 'Candidate' | 'Employer';
    serviceType: PaymentTransaction['serviceType'];
    planName: string;
    amount: number;
    paymentMethod: PaymentTransaction['paymentMethod'];
    durationDays?: number;
  }) => PaymentTransaction;
  submitComplaint: (data: Omit<ComplaintTicket, 'id' | 'date' | 'status'>) => ComplaintTicket;
  submitFranchiseInquiry: (data: Omit<FranchiseInquiry, 'id' | 'submittedAt' | 'status'>) => FranchiseInquiry;
  
  // Status & Verification updates (Admin/Shield)
  updateCandidateVerification: (candidateId: string, status: VerificationStatus, note?: string) => void;
  updateCandidateStatus: (candidateId: string, status: CandidateStatus) => void;
  updateApplicationStatus: (applicationId: string, status: CandidateStatus, notes?: string) => void;
  updateEmployerVerification: (employerId: string, status: VerificationStatus) => void;
  updateComplaintStatus: (complaintId: string, status: ComplaintTicket['status'], resolution?: string) => void;
  
  // Credential lookup for MMP SHIELD™
  lookupShieldRecord: (id: string) => {
    found: boolean;
    type?: 'Candidate' | 'Employer' | 'Job' | 'Invoice';
    record?: any;
  };
  
  // Helper to reset data
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from local storage or initial
  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem('mmp_candidates');
    return saved ? JSON.parse(saved) : INITIAL_CANDIDATES;
  });

  const [employers, setEmployers] = useState<Employer[]>(() => {
    const saved = localStorage.getItem('mmp_employers');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYERS;
  });

  const [jobs, setJobs] = useState<JobVacancy[]>(() => {
    const saved = localStorage.getItem('mmp_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('mmp_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [complaints, setComplaints] = useState<ComplaintTicket[]>(() => {
    const saved = localStorage.getItem('mmp_complaints');
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  const [payments, setPayments] = useState<PaymentTransaction[]>(() => {
    const saved = localStorage.getItem('mmp_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('mmp_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [franchiseInquiries, setFranchiseInquiries] = useState<FranchiseInquiry[]>(() => {
    const saved = localStorage.getItem('mmp_franchise_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_FRANCHISES;
  });

  // User View State
  const [viewMode, setViewMode] = useState<UserViewMode>('public');
  const [currentCandidateId, setCurrentCandidateId] = useState<string>('MMP-CAN-100234');
  const [currentEmployerId, setCurrentEmployerId] = useState<string>('MMP-CLI-800121');
  const [adminRole, setAdminRole] = useState<AdminRole>('Super Admin');
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mmp_candidates', JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem('mmp_employers', JSON.stringify(employers));
  }, [employers]);

  useEffect(() => {
    localStorage.setItem('mmp_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('mmp_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('mmp_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('mmp_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('mmp_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('mmp_franchise_inquiries', JSON.stringify(franchiseInquiries));
  }, [franchiseInquiries]);

  // Helpers
  const logAudit = (action: string, actor: string, role: string, targetId: string, details: string) => {
    const now = new Date();
    const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newLog: AuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: formatted,
      action,
      actor,
      role,
      targetId,
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const registerCandidate = (data: Omit<Candidate, 'id' | 'registeredDate' | 'verificationStatus' | 'status'>): Candidate => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const newId = `MMP-CAN-${randomDigits}`;
    const today = new Date().toISOString().split('T')[0];

    const newCandidate: Candidate = {
      ...data,
      id: newId,
      registeredDate: today,
      verificationStatus: 'Under Review',
      status: 'Registered',
    };

    setCandidates((prev) => [newCandidate, ...prev]);
    setCurrentCandidateId(newId);
    logAudit('Candidate Registered', data.fullName, 'Candidate Self-Service', newId, `New candidate profile created from ${data.currentLocation}`);
    return newCandidate;
  };

  const registerEmployer = (
    data: Omit<Employer, 'id' | 'registeredDate' | 'verificationStatus' | 'status' | 'vacanciesCount' | 'openings'>
  ): Employer => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const newId = `MMP-CLI-${randomDigits}`;
    const today = new Date().toISOString().split('T')[0];

    const newEmployer: Employer = {
      ...data,
      id: newId,
      registeredDate: today,
      verificationStatus: 'Pending',
      status: 'Pending Verification',
      vacanciesCount: 0,
      openings: [],
    };

    setEmployers((prev) => [newEmployer, ...prev]);
    setCurrentEmployerId(newId);
    logAudit('Employer Registered', data.contactPerson, 'Employer Self-Service', newId, `Employer ${data.companyName} registered. Pending ₹3,000 verification review.`);
    return newEmployer;
  };

  const postJobVacancy = (data: Omit<JobVacancy, 'id' | 'postedDate' | 'status'>): JobVacancy => {
    const randomNum = Math.floor(7000 + Math.random() * 2000);
    const newId = `MMP-JOB-${randomNum}`;
    const today = new Date().toISOString().split('T')[0];

    const newJob: JobVacancy = {
      ...data,
      id: newId,
      postedDate: today,
      status: 'Active',
      mmpShieldVerified: true,
    };

    setJobs((prev) => [newJob, ...prev]);
    // increment employer vacancy count
    setEmployers((prev) =>
      prev.map((emp) =>
        emp.id === data.employerId
          ? {
              ...emp,
              vacanciesCount: emp.vacanciesCount + 1,
              openings: [...emp.openings, newId],
            }
          : emp
      )
    );
    logAudit('Job Vacancy Posted', data.employerName, 'Client Employer', newId, `Vacancy for ${data.title} posted in ${data.location}`);
    return newJob;
  };

  const applyForJob = (candidateId: string, jobId: string, notes?: string): boolean => {
    const candidate = candidates.find((c) => c.id === candidateId);
    const job = jobs.find((j) => j.id === jobId);
    if (!candidate || !job) return false;

    // Check if already applied
    const exists = applications.some((a) => a.candidateId === candidateId && a.jobId === jobId);
    if (exists) return false;

    const newApp: JobApplication = {
      id: `MMP-APP-${Math.floor(1000 + Math.random() * 9000)}`,
      jobId: job.id,
      jobTitle: job.title,
      candidateId: candidate.id,
      candidateName: candidate.fullName,
      employerId: job.employerId,
      employerName: job.employerName,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Profile Active',
      notes: notes || 'Direct application through MMP Manpower Portal',
    };

    setApplications((prev) => [newApp, ...prev]);
    logAudit('Job Application Submitted', candidate.fullName, 'Candidate', newApp.id, `Applied to ${job.title} at ${job.employerName}`);
    return true;
  };

  const completeSkillAssessment = (
    candidateId: string,
    badgeData: Omit<CandidateSkillBadge, 'id' | 'completedAt' | 'verifiedByShield'>
  ): CandidateSkillBadge => {
    const today = new Date().toISOString().split('T')[0];
    const newBadge: CandidateSkillBadge = {
      ...badgeData,
      id: `BADGE-${Date.now().toString().slice(-4)}`,
      completedAt: today,
      verifiedByShield: true,
    };

    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === candidateId) {
          const currentBadges = c.verifiedBadges || [];
          // Replace if already assessed, else append
          const filtered = currentBadges.filter((b) => b.assessmentId !== badgeData.assessmentId);
          return {
            ...c,
            verifiedBadges: [...filtered, newBadge],
          };
        }
        return c;
      })
    );

    logAudit(
      'Skill Assessment Completed',
      candidateId,
      'Assessment Engine',
      newBadge.id,
      `Scored ${badgeData.scorePercentage}% in ${badgeData.assessmentTitle}. Awarded ${badgeData.badgeLevel}.`
    );

    return newBadge;
  };

  const uploadCandidateCertificate = (
    candidateId: string,
    certData: {
      title: string;
      issuingAuthority: string;
      issueYear: string;
      fileName: string;
    }
  ) => {
    const today = new Date().toISOString().split('T')[0];
    const newCert = {
      id: `CERT-UPL-${Date.now().toString().slice(-4)}`,
      ...certData,
      verificationStatus: 'Under Review' as const,
      uploadedAt: today,
    };

    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === candidateId) {
          const existing = c.uploadedCertificates || [];
          return {
            ...c,
            uploadedCertificates: [newCert, ...existing],
          };
        }
        return c;
      })
    );

    logAudit(
      'External Certificate Uploaded',
      candidateId,
      'Candidate Self-Service',
      newCert.id,
      `Uploaded ${certData.title} issued by ${certData.issuingAuthority}`
    );

    return newCert;
  };

  const purchaseMembershipOrService = (params: {
    userId: string;
    userName: string;
    userType: 'Candidate' | 'Employer';
    serviceType: PaymentTransaction['serviceType'];
    planName: string;
    amount: number;
    paymentMethod: PaymentTransaction['paymentMethod'];
    durationDays?: number;
  }): PaymentTransaction => {
    const today = new Date().toISOString().split('T')[0];
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const invoiceNum = `INV-MMP-${new Date().getFullYear()}-${randomDigits}`;
    const txnId = `MMP-TXN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPayment: PaymentTransaction = {
      id: txnId,
      userId: params.userId,
      userName: params.userName,
      userType: params.userType,
      amount: params.amount,
      serviceType: params.serviceType,
      planName: params.planName,
      date: today,
      paymentMethod: params.paymentMethod,
      status: 'Success',
      invoiceNumber: invoiceNum,
    };

    setPayments((prev) => [newPayment, ...prev]);

    // Calculate expiry
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + (params.durationDays || 90));
    const expiryStr = expiry.toISOString().split('T')[0];

    // Update entity
    if (params.userType === 'Candidate') {
      setCandidates((prev) =>
        prev.map((c) => {
          if (c.id === params.userId) {
            return {
              ...c,
              activeMembership:
                params.serviceType === 'Candidate Membership'
                  ? {
                      planName: params.planName,
                      expiresAt: expiryStr,
                      membershipId: `MMP-MEM-${Math.floor(1000 + Math.random() * 9000)}`,
                    }
                  : c.activeMembership,
              hasFastTrack: params.serviceType === 'Fast Track' ? true : c.hasFastTrack,
              hasJobAlerts: params.serviceType === 'Job Alerts' ? true : c.hasJobAlerts,
            };
          }
          return c;
        })
      );
    } else {
      setEmployers((prev) =>
        prev.map((e) => {
          if (e.id === params.userId) {
            return {
              ...e,
              status: 'Active Client',
              membershipPlan: `${params.planName}`,
              membershipExpiresAt: expiryStr,
            };
          }
          return e;
        })
      );
    }

    logAudit(
      'Payment Processed & Service Activated',
      params.userName,
      'Payment Gateway',
      txnId,
      `₹${params.amount} collected for ${params.serviceType} (${params.planName}). Invoice ${invoiceNum}`
    );

    return newPayment;
  };

  const submitComplaint = (data: Omit<ComplaintTicket, 'id' | 'date' | 'status'>): ComplaintTicket => {
    const newId = `MMP-CMP-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toISOString().split('T')[0];
    const newTicket: ComplaintTicket = {
      ...data,
      id: newId,
      date: today,
      status: 'Open',
    };
    setComplaints((prev) => [newTicket, ...prev]);
    logAudit('Complaint Ticket Logged', data.submittedBy, 'MMP Shield Desk', newId, `Subject: ${data.subject} | Category: ${data.category}`);
    return newTicket;
  };

  const submitFranchiseInquiry = (data: Omit<FranchiseInquiry, 'id' | 'submittedAt' | 'status'>): FranchiseInquiry => {
    const newId = `MMP-FRN-${Math.floor(100 + Math.random() * 900)}`;
    const today = new Date().toISOString().split('T')[0];
    const inquiry: FranchiseInquiry = {
      ...data,
      id: newId,
      submittedAt: today,
      status: 'New',
    };
    setFranchiseInquiries((prev) => [inquiry, ...prev]);
    logAudit('Franchise Inquiry Received', data.fullName, 'Franchise Desk', newId, `Location: ${data.city}, ${data.state}. Capacity: ${data.investmentCapacity}`);
    return inquiry;
  };

  const updateCandidateVerification = (candidateId: string, status: VerificationStatus, note?: string) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, verificationStatus: status } : c))
    );
    logAudit('Verification Status Updated', 'Verification Officer', 'Verification Team', candidateId, `Status set to ${status}. ${note || ''}`);
  };

  const updateCandidateStatus = (candidateId: string, status: CandidateStatus) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status } : c))
    );
    logAudit('Candidate Lifecycle Updated', 'Recruiter', 'Recruiter', candidateId, `Candidate status progressed to ${status}`);
  };

  const updateApplicationStatus = (applicationId: string, status: CandidateStatus, notes?: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === applicationId ? { ...app, status, notes: notes || app.notes } : app))
    );
    logAudit('Application Status Updated', 'Hiring Manager', 'Admin/Recruiter', applicationId, `Application marked as ${status}`);
  };

  const updateEmployerVerification = (employerId: string, status: VerificationStatus) => {
    setEmployers((prev) =>
      prev.map((emp) =>
        emp.id === employerId
          ? {
              ...emp,
              verificationStatus: status,
              status: status === 'Verified' ? 'Active Client' : emp.status,
            }
          : emp
      )
    );
    logAudit('Employer Verification Audited', 'Compliance Team', 'Super Admin', employerId, `Employer verification set to ${status}`);
  };

  const updateComplaintStatus = (complaintId: string, status: ComplaintTicket['status'], resolution?: string) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === complaintId ? { ...c, status, resolutionNotes: resolution || c.resolutionNotes } : c))
    );
    logAudit('Complaint Ticket Resolved', 'Grievance Officer', 'Support Team', complaintId, `Status: ${status}`);
  };

  const lookupShieldRecord = (queryId: string) => {
    const clean = queryId.trim().toUpperCase();
    if (!clean) return { found: false };

    // Candidate
    const candidate = candidates.find((c) => c.id.toUpperCase() === clean);
    if (candidate) {
      return { found: true, type: 'Candidate' as const, record: candidate };
    }

    // Employer
    const employer = employers.find((e) => e.id.toUpperCase() === clean);
    if (employer) {
      return { found: true, type: 'Employer' as const, record: employer };
    }

    // Job
    const job = jobs.find((j) => j.id.toUpperCase() === clean);
    if (job) {
      return { found: true, type: 'Job' as const, record: job };
    }

    // Invoice / Txn
    const payment = payments.find((p) => p.id.toUpperCase() === clean || p.invoiceNumber.toUpperCase() === clean);
    if (payment) {
      return { found: true, type: 'Invoice' as const, record: payment };
    }

    return { found: false };
  };

  const resetToDefaultData = () => {
    localStorage.clear();
    setCandidates(INITIAL_CANDIDATES);
    setEmployers(INITIAL_EMPLOYERS);
    setJobs(INITIAL_JOBS);
    setApplications(INITIAL_APPLICATIONS);
    setComplaints(INITIAL_COMPLAINTS);
    setPayments(INITIAL_PAYMENTS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setFranchiseInquiries(INITIAL_FRANCHISES);
  };

  return (
    <AppContext.Provider
      value={{
        candidates,
        employers,
        jobs,
        applications,
        complaints,
        payments,
        auditLogs,
        franchiseInquiries,
        viewMode,
        setViewMode,
        currentCandidateId,
        setCurrentCandidateId,
        currentEmployerId,
        setCurrentEmployerId,
        adminRole,
        setAdminRole,
        globalSearchQuery,
        setGlobalSearchQuery,
        registerCandidate,
        registerEmployer,
        postJobVacancy,
        applyForJob,
        completeSkillAssessment,
        uploadCandidateCertificate,
        purchaseMembershipOrService,
        submitComplaint,
        submitFranchiseInquiry,
        updateCandidateVerification,
        updateCandidateStatus,
        updateApplicationStatus,
        updateEmployerVerification,
        updateComplaintStatus,
        lookupShieldRecord,
        resetToDefaultData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
