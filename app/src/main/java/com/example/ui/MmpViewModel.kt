package com.example.ui

import androidx.lifecycle.ViewModel
import com.example.data.MmpRepository
import com.example.data.model.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlin.random.Random

data class PaymentConfig(
    val userId: String,
    val userName: String,
    val userType: String,
    val serviceType: String,
    val planName: String,
    val amount: Int
)

class MmpViewModel : ViewModel() {

    private val _candidates = MutableStateFlow<List<Candidate>>(MmpRepository.INITIAL_CANDIDATES)
    val candidates: StateFlow<List<Candidate>> = _candidates.asStateFlow()

    private val _employers = MutableStateFlow<List<Employer>>(MmpRepository.INITIAL_EMPLOYERS)
    val employers: StateFlow<List<Employer>> = _employers.asStateFlow()

    private val _jobs = MutableStateFlow<List<JobVacancy>>(MmpRepository.INITIAL_JOBS)
    val jobs: StateFlow<List<JobVacancy>> = _jobs.asStateFlow()

    private val _applications = MutableStateFlow<List<JobApplication>>(MmpRepository.INITIAL_APPLICATIONS)
    val applications: StateFlow<List<JobApplication>> = _applications.asStateFlow()

    private val _payments = MutableStateFlow<List<PaymentTransaction>>(MmpRepository.INITIAL_PAYMENTS)
    val payments: StateFlow<List<PaymentTransaction>> = _payments.asStateFlow()

    private val _complaints = MutableStateFlow<List<ComplaintTicket>>(emptyList())
    val complaints: StateFlow<List<ComplaintTicket>> = _complaints.asStateFlow()

    private val _auditLogs = MutableStateFlow<List<AuditLog>>(MmpRepository.INITIAL_AUDIT_LOGS)
    val auditLogs: StateFlow<List<AuditLog>> = _auditLogs.asStateFlow()

    private val _franchiseInquiries = MutableStateFlow<List<FranchiseInquiry>>(emptyList())
    val franchiseInquiries: StateFlow<List<FranchiseInquiry>> = _franchiseInquiries.asStateFlow()

    // Navigation and screen tab
    private val _selectedTab = MutableStateFlow(0) // 0=Home, 1=Jobs, 2=Directory, 3=Candidate, 4=Employer, 5=Shield/Services, 6=Admin
    val selectedTab: StateFlow<Int> = _selectedTab.asStateFlow()

    // Search and filters
    private val _searchQuery = MutableStateFlow("")
    val searchQuery: StateFlow<String> = _searchQuery.asStateFlow()

    private val _selectedCategoryFilter = MutableStateFlow("All")
    val selectedCategoryFilter: StateFlow<String> = _selectedCategoryFilter.asStateFlow()

    // Active users
    private val _currentCandidateId = MutableStateFlow("MMP-CAN-100234")
    val currentCandidateId: StateFlow<String> = _currentCandidateId.asStateFlow()

    private val _currentEmployerId = MutableStateFlow("MMP-CLI-800121")
    val currentEmployerId: StateFlow<String> = _currentEmployerId.asStateFlow()

    // Dialog & overlay states
    private val _selectedJobDetail = MutableStateFlow<JobVacancy?>(null)
    val selectedJobDetail: StateFlow<JobVacancy?> = _selectedJobDetail.asStateFlow()

    private val _paymentConfig = MutableStateFlow<PaymentConfig?>(null)
    val paymentConfig: StateFlow<PaymentConfig?> = _paymentConfig.asStateFlow()

    private val _activeAssessment = MutableStateFlow<SkillAssessment?>(null)
    val activeAssessment: StateFlow<SkillAssessment?> = _activeAssessment.asStateFlow()

    private val _shieldSearchQuery = MutableStateFlow("")
    val shieldSearchQuery: StateFlow<String> = _shieldSearchQuery.asStateFlow()

    private val _shieldLookupResult = MutableStateFlow<Pair<String, Any>?>(null) // ("Candidate", Candidate) etc.
    val shieldLookupResult: StateFlow<Pair<String, Any>?> = _shieldLookupResult.asStateFlow()

    private val _statusBannerMessage = MutableStateFlow<String?>(null)
    val statusBannerMessage: StateFlow<String?> = _statusBannerMessage.asStateFlow()

    fun selectTab(index: Int) {
        _selectedTab.value = index
    }

    fun setSearchQuery(query: String) {
        _searchQuery.value = query
    }

    fun setCategoryFilter(category: String) {
        _selectedCategoryFilter.value = category
    }

    fun openJobDetail(job: JobVacancy?) {
        _selectedJobDetail.value = job
    }

    fun openPayment(config: PaymentConfig) {
        _paymentConfig.value = config
    }

    fun closePayment() {
        _paymentConfig.value = null
    }

    fun openAssessment(assessment: SkillAssessment?) {
        _activeAssessment.value = assessment
    }

    fun setShieldQuery(q: String) {
        _shieldSearchQuery.value = q
    }

    fun clearStatusBanner() {
        _statusBannerMessage.value = null
    }

    fun showBanner(msg: String) {
        _statusBannerMessage.value = msg
    }

    // Candidate Registration
    fun registerCandidate(
        fullName: String,
        mobile: String,
        whatsapp: String,
        email: String,
        dob: String,
        gender: String,
        currentLocation: String,
        preferredLocation: String,
        education: String,
        skillsStr: String,
        experienceYears: Int,
        expectedSalary: String,
        jobCategory: String,
        idProofType: String,
        idNumberMasked: String
    ): Candidate {
        val rand = Random.nextInt(100000, 999999)
        val newId = "MMP-CAN-$rand"
        val skills = skillsStr.split(",").map { it.trim() }.filter { it.isNotEmpty() }
        val newCand = Candidate(
            id = newId,
            fullName = fullName,
            mobile = mobile,
            whatsapp = whatsapp,
            email = email,
            dob = dob,
            gender = gender,
            currentLocation = currentLocation,
            preferredLocation = preferredLocation,
            education = education,
            skills = skills,
            experienceYears = experienceYears,
            expectedSalary = expectedSalary,
            jobCategory = jobCategory,
            employmentType = "Full-Time",
            idProofType = idProofType,
            idNumberMasked = idNumberMasked,
            verificationStatus = VerificationStatus.UNDER_REVIEW,
            status = CandidateStatus.REGISTERED,
            registeredDate = "2026-10-18"
        )
        _candidates.value = listOf(newCand) + _candidates.value
        _currentCandidateId.value = newId
        addAudit("Candidate Registered", fullName, "Candidate Self-Service", newId, "New candidate registered from $currentLocation")
        showBanner("Registration submitted! Your MMP Candidate ID is $newId")
        return newCand
    }

    // Employer Registration
    fun registerEmployer(
        companyName: String,
        contactPerson: String,
        designation: String,
        mobile: String,
        whatsapp: String,
        email: String,
        companyAddress: String,
        city: String,
        state: String,
        industry: String,
        gstOrPan: String
    ): Employer {
        val rand = Random.nextInt(100000, 999999)
        val newId = "MMP-CLI-$rand"
        val newEmp = Employer(
            id = newId,
            companyName = companyName,
            contactPerson = contactPerson,
            designation = designation,
            mobile = mobile,
            whatsapp = whatsapp,
            email = email,
            companyAddress = companyAddress,
            city = city,
            state = state,
            industry = industry,
            gstOrPan = gstOrPan,
            verificationStatus = VerificationStatus.PENDING,
            status = EmployerStatus.PENDING,
            registeredDate = "2026-10-18"
        )
        _employers.value = listOf(newEmp) + _employers.value
        _currentEmployerId.value = newId
        addAudit("Employer Registered", contactPerson, "Employer Self-Service", newId, "$companyName registered. Pending ₹3,000 verification review.")
        showBanner("Employer registered! Client ID: $newId")
        return newEmp
    }

    // Post Vacancy
    fun postJobVacancy(
        title: String,
        category: String,
        location: String,
        salaryRange: String,
        qualification: String,
        experienceRequired: String,
        vacanciesCount: Int,
        workingHours: String,
        description: String
    ): JobVacancy {
        val emp = _employers.value.find { it.id == _currentEmployerId.value } ?: _employers.value.first()
        val rand = Random.nextInt(7100, 7999)
        val newId = "MMP-JOB-$rand"
        val newJob = JobVacancy(
            id = newId,
            employerId = emp.id,
            employerName = emp.companyName,
            title = title,
            category = category,
            location = location,
            employmentType = "Full-Time",
            salaryRange = salaryRange,
            qualification = qualification,
            experienceRequired = experienceRequired,
            vacanciesCount = vacanciesCount,
            workingHours = workingHours,
            description = description,
            postedDate = "2026-10-18",
            deadlineDate = "2026-11-18",
            status = "Active",
            featured = true,
            mmpShieldVerified = true
        )
        _jobs.value = listOf(newJob) + _jobs.value
        addAudit("Job Vacancy Posted", emp.companyName, "Employer", newId, "Posted vacancy for $title in $location")
        showBanner("Job opening $newId published successfully!")
        return newJob
    }

    // Apply for Job
    fun applyForJob(jobId: String, notes: String = ""): Boolean {
        val cand = _candidates.value.find { it.id == _currentCandidateId.value } ?: _candidates.value.first()
        val job = _jobs.value.find { it.id == jobId } ?: return false

        // Check if already applied
        if (_applications.value.any { it.candidateId == cand.id && it.jobId == jobId }) {
            showBanner("You have already applied for this opening!")
            return false
        }

        val newApp = JobApplication(
            id = "MMP-APP-${Random.nextInt(1000, 9999)}",
            jobId = job.id,
            jobTitle = job.title,
            candidateId = cand.id,
            candidateName = cand.fullName,
            employerId = job.employerId,
            employerName = job.employerName,
            appliedDate = "2026-10-18",
            status = CandidateStatus.PROFILE_ACTIVE,
            notes = if (notes.isNotBlank()) notes else "Direct application via MMP Manpower Portal"
        )
        _applications.value = listOf(newApp) + _applications.value
        addAudit("Job Application", cand.fullName, "Candidate", newApp.id, "Applied to ${job.title} at ${job.employerName}")
        showBanner("Application submitted for ${job.title}!")
        return true
    }

    // Complete Skill Assessment & Award Badge
    fun completeSkillAssessment(
        assessment: SkillAssessment,
        scorePercentage: Int,
        correctAnswers: Int,
        totalQuestions: Int
    ) {
        val candId = _currentCandidateId.value
        val level = if (scorePercentage >= 90) "Gold Certified" else if (scorePercentage >= 75) "Silver Certified" else "Bronze Certified"
        val badge = CandidateSkillBadge(
            id = "BADGE-${Random.nextInt(100, 999)}",
            skillName = assessment.badgeAvailable,
            category = assessment.category,
            assessmentId = assessment.id,
            assessmentTitle = assessment.title,
            scorePercentage = scorePercentage,
            badgeLevel = level,
            assessmentType = assessment.type,
            completedAt = "2026-10-18",
            verifiedByShield = true,
            totalQuestions = totalQuestions,
            correctAnswers = correctAnswers
        )

        _candidates.value = _candidates.value.map { c ->
            if (c.id == candId) {
                val existing = c.verifiedBadges.filter { it.assessmentId != assessment.id }
                c.copy(verifiedBadges = existing + badge)
            } else c
        }

        addAudit("Skill Assessment Completed", candId, "Assessment Engine", badge.id, "Scored $scorePercentage% in ${assessment.title}. Awarded $level.")
        showBanner("Congratulations! You earned the $level MMP SHIELD™ badge!")
    }

    // Process Payment
    fun processPayment(
        config: PaymentConfig,
        paymentMethod: String
    ): PaymentTransaction {
        val rand = Random.nextInt(1000, 9999)
        val invoice = "INV-MMP-2026-$rand"
        val txnId = "MMP-TXN-2026-$rand"
        val txn = PaymentTransaction(
            id = txnId,
            userId = config.userId,
            userName = config.userName,
            userType = config.userType,
            amount = config.amount,
            serviceType = config.serviceType,
            planName = config.planName,
            date = "2026-10-18",
            paymentMethod = paymentMethod,
            status = "Success",
            invoiceNumber = invoice
        )

        _payments.value = listOf(txn) + _payments.value

        // Update candidate or employer state
        if (config.userType == "Candidate") {
            _candidates.value = _candidates.value.map { c ->
                if (c.id == config.userId) {
                    c.copy(
                        activeMembershipPlan = if (config.serviceType == "Candidate Membership") config.planName else c.activeMembershipPlan,
                        activeMembershipExpires = if (config.serviceType == "Candidate Membership") "2027-10-18" else c.activeMembershipExpires,
                        hasFastTrack = if (config.serviceType == "Fast Track") true else c.hasFastTrack,
                        hasJobAlerts = if (config.serviceType == "Job Alerts") true else c.hasJobAlerts
                    )
                } else c
            }
        } else {
            _employers.value = _employers.value.map { e ->
                if (e.id == config.userId) {
                    e.copy(
                        status = EmployerStatus.ACTIVE,
                        membershipPlan = config.planName,
                        membershipExpiresAt = "2027-10-18"
                    )
                } else e
            }
        }

        addAudit("Payment Processed", config.userName, "Payment Gateway", txnId, "₹${config.amount} paid for ${config.serviceType}. Invoice $invoice")
        closePayment()
        showBanner("Payment successful! Invoice $invoice generated.")
        return txn
    }

    // Submit Grievance / Complaint
    fun submitComplaint(
        name: String,
        userType: String,
        contact: String,
        subject: String,
        category: String,
        description: String
    ): ComplaintTicket {
        val rand = Random.nextInt(1000, 9999)
        val ticket = ComplaintTicket(
            id = "MMP-CMP-$rand",
            submittedBy = name,
            userType = userType,
            contactNumber = contact,
            subject = subject,
            category = category,
            description = description,
            date = "2026-10-18",
            status = "Open"
        )
        _complaints.value = listOf(ticket) + _complaints.value
        addAudit("Complaint Logged", name, "MMP Shield Desk", ticket.id, "Subject: $subject")
        showBanner("Ticket ${ticket.id} registered. Our Grievance Officer will contact you.")
        return ticket
    }

    // Submit Franchise Inquiry
    fun submitFranchise(
        fullName: String,
        mobile: String,
        email: String,
        city: String,
        state: String,
        hasOfficeSpace: Boolean,
        investmentCapacity: String
    ): FranchiseInquiry {
        val rand = Random.nextInt(100, 999)
        val inq = FranchiseInquiry(
            id = "MMP-FRN-$rand",
            fullName = fullName,
            mobile = mobile,
            email = email,
            city = city,
            state = state,
            hasOfficeSpace = hasOfficeSpace,
            investmentCapacity = investmentCapacity,
            submittedAt = "2026-10-18",
            status = "New"
        )
        _franchiseInquiries.value = listOf(inq) + _franchiseInquiries.value
        addAudit("Franchise Inquiry", fullName, "Franchise Desk", inq.id, "Location: $city, $state")
        showBanner("Franchise application received! Reference: ${inq.id}")
        return inq
    }

    // MMP SHIELD™ Verification Lookup
    fun performShieldLookup(query: String) {
        val clean = query.trim().uppercase()
        if (clean.isBlank()) {
            _shieldLookupResult.value = null
            return
        }

        val cand = _candidates.value.find { it.id.uppercase() == clean }
        if (cand != null) {
            _shieldLookupResult.value = Pair("Candidate", cand)
            return
        }

        val emp = _employers.value.find { it.id.uppercase() == clean }
        if (emp != null) {
            _shieldLookupResult.value = Pair("Employer", emp)
            return
        }

        val job = _jobs.value.find { it.id.uppercase() == clean }
        if (job != null) {
            _shieldLookupResult.value = Pair("Job", job)
            return
        }

        val payment = _payments.value.find { it.id.uppercase() == clean || it.invoiceNumber.uppercase() == clean }
        if (payment != null) {
            _shieldLookupResult.value = Pair("Invoice", payment)
            return
        }

        _shieldLookupResult.value = Pair("Not Found", clean)
    }

    // Admin updates
    fun updateCandidateVerification(candidateId: String, status: VerificationStatus) {
        _candidates.value = _candidates.value.map {
            if (it.id == candidateId) it.copy(verificationStatus = status) else it
        }
        addAudit("Verification Updated", "Admin Desk", "Super Admin", candidateId, "Set to ${status.label}")
        showBanner("Candidate verification updated to ${status.label}")
    }

    fun updateApplicationStatus(appId: String, status: CandidateStatus) {
        _applications.value = _applications.value.map {
            if (it.id == appId) it.copy(status = status) else it
        }
        addAudit("Application Updated", "Recruiter", "Recruiter", appId, "Marked as ${status.label}")
        showBanner("Application $appId updated to ${status.label}")
    }

    private fun addAudit(action: String, actor: String, role: String, targetId: String, details: String) {
        val rand = Random.nextInt(1000, 9999)
        val log = AuditLog("LOG-$rand", "2026-10-18 13:30", action, actor, role, targetId, details)
        _auditLogs.value = listOf(log) + _auditLogs.value
    }
}
