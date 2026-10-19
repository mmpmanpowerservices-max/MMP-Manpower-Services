package com.example.data.model

enum class JobCategory(val displayName: String) {
    MANUFACTURING("Manufacturing & Electronics"),
    IT_SOFTWARE("IT & Software"),
    BANKING_BFSI("Banking & BFSI"),
    SALES_MARKETING("Sales & Marketing"),
    TELECOM("Telecom & Networking"),
    EDUCATION("Education & EdTech"),
    LOGISTICS("Logistics & Supply Chain"),
    HEALTHCARE("Healthcare & Pharma"),
    ADMINISTRATION("Administration & HR"),
    SKILLED_TRADE("Skilled Trade & Technical"),
    GENERAL_MANPOWER("General & Unskilled Manpower")
}

enum class EmploymentType(val label: String) {
    FULL_TIME("Full-Time"),
    PART_TIME("Part-Time"),
    CONTRACT("Contract"),
    WALK_IN("Walk-In"),
    FRESHER("Fresher Friendly")
}

enum class CandidateStatus(val label: String) {
    REGISTERED("Registered"),
    VERIFIED("Verified"),
    PROFILE_ACTIVE("Profile Active"),
    MATCHED("Matched"),
    INTERVIEW("Interview"),
    SELECTED("Selected"),
    JOINED("Joined")
}

enum class EmployerStatus(val label: String) {
    PENDING("Pending Verification"),
    ACTIVE("Active Client"),
    SUSPENDED("Suspended")
}

enum class VerificationStatus(val label: String) {
    PENDING("Pending"),
    VERIFIED("Verified"),
    UNDER_REVIEW("Under Review"),
    FLAGGED("Flagged")
}

data class CandidateSkillBadge(
    val id: String,
    val skillName: String,
    val category: String,
    val assessmentId: String,
    val assessmentTitle: String,
    val scorePercentage: Int,
    val badgeLevel: String, // "Gold Certified", "Silver Certified", "Bronze Certified"
    val assessmentType: String,
    val completedAt: String,
    val verifiedByShield: Boolean = true,
    val totalQuestions: Int = 5,
    val correctAnswers: Int = 4
)

data class AssessmentQuestion(
    val id: String,
    val question: String,
    val options: List<String>,
    val correctOptionIndex: Int,
    val explanation: String
)

data class SkillAssessment(
    val id: String,
    val title: String,
    val category: String,
    val description: String,
    val durationMinutes: Int,
    val passingScore: Int,
    val badgeAvailable: String,
    val type: String,
    val difficulty: String,
    val questions: List<AssessmentQuestion>,
    val instructions: List<String>
)

data class Candidate(
    val id: String,
    val fullName: String,
    val mobile: String,
    val whatsapp: String,
    val email: String,
    val dob: String,
    val gender: String,
    val currentLocation: String,
    val preferredLocation: String,
    val education: String,
    val skills: List<String>,
    val verifiedBadges: List<CandidateSkillBadge> = emptyList(),
    val experienceYears: Int,
    val currentSalary: String? = null,
    val expectedSalary: String,
    val jobCategory: String,
    val employmentType: String,
    val resumeFileName: String? = null,
    val idProofType: String,
    val idNumberMasked: String,
    val verificationStatus: VerificationStatus,
    val status: CandidateStatus,
    val registeredDate: String,
    val activeMembershipPlan: String? = null,
    val activeMembershipExpires: String? = null,
    val hasFastTrack: Boolean = false,
    val hasJobAlerts: Boolean = false
)

data class Employer(
    val id: String,
    val companyName: String,
    val contactPerson: String,
    val designation: String,
    val mobile: String,
    val whatsapp: String,
    val email: String,
    val companyAddress: String,
    val city: String,
    val state: String,
    val industry: String,
    val website: String? = null,
    val gstOrPan: String,
    val verificationStatus: VerificationStatus,
    val status: EmployerStatus,
    val registeredDate: String,
    val membershipPlan: String? = null,
    val membershipExpiresAt: String? = null,
    val vacanciesCount: Int = 0,
    val openings: List<String> = emptyList()
)

data class JobVacancy(
    val id: String,
    val employerId: String,
    val employerName: String,
    val title: String,
    val category: String,
    val location: String,
    val employmentType: String,
    val salaryRange: String,
    val qualification: String,
    val experienceRequired: String,
    val vacanciesCount: Int,
    val workingHours: String,
    val description: String,
    val postedDate: String,
    val deadlineDate: String,
    val status: String = "Active",
    val featured: Boolean = false,
    val mmpShieldVerified: Boolean = true
)

data class JobApplication(
    val id: String,
    val jobId: String,
    val jobTitle: String,
    val candidateId: String,
    val candidateName: String,
    val employerId: String,
    val employerName: String,
    val appliedDate: String,
    val status: CandidateStatus,
    val interviewDate: String? = null,
    val notes: String? = null
)

data class CandidateMembershipPlan(
    val id: String,
    val name: String,
    val price: Int,
    val duration: String,
    val badge: String? = null,
    val features: List<String>,
    val recommended: Boolean = false
)

data class ClientMembershipPlan(
    val id: String,
    val name: String,
    val price: Int,
    val duration: String,
    val candidateProfilesLimit: String,
    val jobPostingsLimit: String,
    val badge: String? = null,
    val features: List<String>,
    val recommended: Boolean = false
)

data class JobAlertPlan(
    val id: String,
    val name: String,
    val price: Int,
    val frequency: String,
    val description: String,
    val features: List<String>,
    val recommended: Boolean = false
)

data class ComplaintTicket(
    val id: String,
    val submittedBy: String,
    val userType: String,
    val contactNumber: String,
    val subject: String,
    val category: String,
    val description: String,
    val date: String,
    val status: String = "Open",
    val resolutionNotes: String? = null
)

data class PaymentTransaction(
    val id: String,
    val userId: String,
    val userName: String,
    val userType: String,
    val amount: Int,
    val serviceType: String,
    val planName: String,
    val date: String,
    val paymentMethod: String,
    val status: String = "Success",
    val invoiceNumber: String
)

data class AuditLog(
    val id: String,
    val timestamp: String,
    val action: String,
    val actor: String,
    val role: String,
    val targetId: String,
    val details: String
)

data class FranchiseInquiry(
    val id: String,
    val fullName: String,
    val mobile: String,
    val email: String,
    val city: String,
    val state: String,
    val hasOfficeSpace: Boolean,
    val investmentCapacity: String,
    val submittedAt: String,
    val status: String = "New"
)

data class WorkforceRole(
    val title: String,
    val subtext: String,
    val focus: String,
    val description: String
)

data class WorkforceSector(
    val id: String,
    val categoryName: String,
    val badge: String,
    val roles: List<WorkforceRole>
)
