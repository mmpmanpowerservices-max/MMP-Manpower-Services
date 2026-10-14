export type JobCategory =
  | 'Manufacturing & Electronics'
  | 'IT & Software'
  | 'Banking & BFSI'
  | 'Sales & Marketing'
  | 'Telecom & Networking'
  | 'Education & EdTech'
  | 'Logistics & Supply Chain'
  | 'Healthcare & Pharma'
  | 'Administration & HR'
  | 'Skilled Trade & Technical'
  | 'General & Unskilled Manpower';

export type EmploymentType = 'Full-Time' | 'Part-Time' | 'Contract' | 'Walk-In' | 'Fresher Friendly';

export type CandidateStatus =
  | 'Registered'
  | 'Verified'
  | 'Profile Active'
  | 'Matched'
  | 'Interview'
  | 'Selected'
  | 'Joined';

export type EmployerStatus = 'Pending Verification' | 'Active Client' | 'Suspended';

export type VerificationStatus = 'Pending' | 'Verified' | 'Under Review' | 'Flagged';

export interface CandidateSkillBadge {
  id: string;
  skillName: string;
  category: JobCategory;
  assessmentId: string;
  assessmentTitle: string;
  scorePercentage: number;
  badgeLevel: 'Gold Certified' | 'Silver Certified' | 'Bronze Certified';
  assessmentType: 'Multiple Choice' | 'Practical Scenario' | 'Technical SOP';
  completedAt: string;
  verifiedByShield: boolean;
  totalQuestions: number;
  correctAnswers: number;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  type?: 'multiple-choice' | 'scenario' | 'practical-sop';
}

export interface SkillAssessment {
  id: string;
  title: string;
  category: JobCategory;
  description: string;
  durationMinutes: number;
  passingScore: number; // percentage, e.g. 60
  badgeAvailable: string;
  type: 'Multiple Choice' | 'Practical Scenario' | 'Technical SOP';
  difficulty: 'Entry Level' | 'Intermediate' | 'Advanced';
  questions: AssessmentQuestion[];
  instructions: string[];
}

export interface UploadedCertificate {
  id: string;
  title: string;
  issuingAuthority: string;
  issueYear: string;
  fileName: string;
  verificationStatus: 'Verified' | 'Under Review';
  uploadedAt: string;
}

export interface Candidate {
  id: string; // e.g., MMP-CAN-102938
  fullName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  currentLocation: string;
  preferredLocation: string;
  education: string;
  skills: string[];
  verifiedBadges?: CandidateSkillBadge[];
  uploadedCertificates?: UploadedCertificate[];
  experienceYears: number;
  currentSalary?: string;
  expectedSalary: string;
  jobCategory: JobCategory;
  employmentType: EmploymentType;
  resumeFileName?: string;
  photoUrl?: string;
  idProofType: 'Aadhaar' | 'PAN' | 'Voter ID' | 'Driving License';
  idNumberMasked: string; // e.g. XXXX-XXXX-4589
  verificationStatus: VerificationStatus;
  status: CandidateStatus;
  registeredDate: string;
  activeMembership?: {
    planName: string;
    expiresAt: string;
    membershipId: string;
  };
  hasFastTrack?: boolean;
  hasJobAlerts?: boolean;
}

export interface Employer {
  id: string; // e.g., MMP-CLI-401928
  companyName: string;
  contactPerson: string;
  designation: string;
  mobile: string;
  whatsapp: string;
  email: string;
  companyAddress: string;
  city: string;
  state: string;
  industry: string;
  website?: string;
  gstOrPan: string;
  verificationStatus: VerificationStatus;
  status: EmployerStatus;
  registeredDate: string;
  membershipPlan?: string;
  membershipExpiresAt?: string;
  vacanciesCount: number;
  openings: string[];
}

export interface JobVacancy {
  id: string; // e.g., MMP-JOB-7701
  employerId: string;
  employerName: string;
  title: string;
  category: JobCategory;
  location: string;
  employmentType: EmploymentType;
  salaryRange: string;
  qualification: string;
  experienceRequired: string;
  vacanciesCount: number;
  workingHours: string;
  description: string;
  postedDate: string;
  deadlineDate: string;
  status: 'Active' | 'Closing Soon' | 'Filled' | 'On Hold';
  featured?: boolean;
  mmpShieldVerified?: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateId: string;
  candidateName: string;
  employerId: string;
  employerName: string;
  appliedDate: string;
  status: CandidateStatus;
  interviewDate?: string;
  interviewLocation?: string;
  notes?: string;
}

export interface CandidateMembershipPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  badge?: string;
  features: string[];
  recommended?: boolean;
}

export interface ClientMembershipPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  candidateProfilesLimit: string;
  jobPostingsLimit: string;
  badge?: string;
  features: string[];
  recommended?: boolean;
}

export interface JobAlertPlan {
  id: string;
  name: string;
  price: number | 'Custom';
  description: string;
  frequency: string;
  features: string[];
  recommended?: boolean;
}

export interface ComplaintTicket {
  id: string; // e.g., MMP-CMP-9041
  submittedBy: string;
  userType: 'Candidate' | 'Employer' | 'Public';
  userId?: string;
  contactNumber: string;
  subject: string;
  category: 'Service Issue' | 'Direct Hiring Violation' | 'Fraud Report' | 'Payment Issue' | 'Other';
  description: string;
  date: string;
  status: 'Open' | 'Under Investigation' | 'Resolved' | 'Closed';
  resolutionNotes?: string;
}

export interface PaymentTransaction {
  id: string; // e.g., MMP-TXN-2026-8890
  userId: string;
  userName: string;
  userType: 'Candidate' | 'Employer';
  amount: number;
  serviceType: 'Candidate Membership' | 'Client Membership' | 'Job Alerts' | 'Fast Track' | 'Employer Registration Fee';
  planName: string;
  date: string;
  paymentMethod: 'UPI' | 'NetBanking' | 'Debit/Credit Card' | 'NEFT/RTGS';
  status: 'Success' | 'Pending Verification' | 'Failed';
  invoiceNumber: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  role: string;
  targetId: string;
  details: string;
}

export interface FranchiseInquiry {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  state: string;
  hasOfficeSpace: boolean;
  investmentCapacity: string;
  submittedAt: string;
  status: 'New' | 'Contacted' | 'Site Visit' | 'Approved';
}
