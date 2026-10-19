package com.example.data

import com.example.data.model.*

object MmpRepository {

    val INITIAL_CANDIDATE_PLANS = listOf(
        CandidateMembershipPlan(
            id = "starter",
            name = "CAREER STARTER",
            price = 499,
            duration = "3 Months",
            badge = "Get Started",
            features = listOf(
                "MMP Membership ID (Permanent)",
                "Candidate Profile Creation in Master Pool",
                "Basic Resume Review",
                "Access to Eligible Job Opportunities",
                "Recruitment Drive Notifications",
                "Career Guidance",
                "Interview Preparation Resources"
            )
        ),
        CandidateMembershipPlan(
            id = "plus",
            name = "CAREER PLUS",
            price = 1499,
            duration = "6 Months",
            badge = "Grow Faster",
            recommended = true,
            features = listOf(
                "Everything in Starter",
                "Professional Resume Optimization",
                "Skill / Profile Assessment",
                "Priority Opportunity Notifications",
                "Interview Preparation",
                "Candidate Profile Enhancement",
                "Priority Consideration for MMP Recruitment Drives"
            )
        ),
        CandidateMembershipPlan(
            id = "pro",
            name = "CAREER PRO",
            price = 2999,
            duration = "1 Year",
            badge = "Go Further",
            features = listOf(
                "Everything in Plus",
                "Advanced Resume & Profile Optimization",
                "Career Counselling",
                "Priority Recruitment Drive Access",
                "Job Matching Based on Your Profile",
                "Profile Forwarding to Verified Employers",
                "Member-Only Opportunities",
                "Digital Membership ID"
            )
        ),
        CandidateMembershipPlan(
            id = "executive",
            name = "EXECUTIVE MEMBERSHIP",
            price = 7999,
            duration = "1 Year",
            badge = "Lead with Confidence",
            features = listOf(
                "Everything in Pro",
                "Confidential Executive Profile",
                "Senior-Level Career Counselling",
                "Executive Resume & Profile Development",
                "Suitable Senior Opportunity Alerts",
                "Confidential Employer Introductions",
                "Priority MMP Support"
            )
        )
    )

    val INITIAL_CLIENT_PLANS = listOf(
        ClientMembershipPlan(
            id = "client-basic",
            name = "BASIC",
            price = 5000,
            duration = "3 Months",
            candidateProfilesLimit = "10 Resumes",
            jobPostingsLimit = "Up to 2 Job Posts",
            features = listOf(
                "10 Screened candidate resumes",
                "Up to 2 active job postings",
                "Standard email support",
                "Basic candidate screening"
            )
        ),
        ClientMembershipPlan(
            id = "client-silver",
            name = "SILVER",
            price = 12000,
            duration = "6 Months",
            candidateProfilesLimit = "20 Resumes",
            jobPostingsLimit = "Up to 5 Job Posts",
            badge = "Priority Pipeline",
            features = listOf(
                "20 Screened candidate resumes",
                "Up to 5 active job postings",
                "Priority matching + talent pipeline access",
                "Multi-channel candidate sourcing",
                "Preliminary telephone interview notes"
            )
        ),
        ClientMembershipPlan(
            id = "client-gold",
            name = "GOLD",
            price = 25000,
            duration = "6 Months",
            candidateProfilesLimit = "50 Resumes",
            jobPostingsLimit = "Up to 15 Job Posts",
            badge = "Free Add-On Bonus",
            recommended = true,
            features = listOf(
                "50 Screened & pre-verified resumes",
                "Dedicated recruiter support assigned",
                "+ 1 Free Add-On Bonus Service included",
                "Candidate background screening support",
                "Interview coordination & schedule management",
                "10–15 days replacement turnaround guarantee"
            )
        ),
        ClientMembershipPlan(
            id = "client-diamond",
            name = "DIAMOND",
            price = 50000,
            duration = "1 Year",
            candidateProfilesLimit = "100 Resumes",
            jobPostingsLimit = "Unlimited Job Postings",
            badge = "Fast-Track Replacement",
            features = listOf(
                "100 Screened candidate resumes",
                "Fast-track replacement assurance",
                "Full candidate background dossier & police checks",
                "Unlimited job requisitions for 1 full year",
                "Walk-in recruitment drive on-site coordination"
            )
        )
    )

    val INITIAL_JOB_ALERT_PLANS = listOf(
        JobAlertPlan("alert-starter", "MMP STARTER", 199, "Per Month", "Basic verified job alert access.", listOf("WhatsApp Job Alerts", "Local & Walk-in Jobs", "Daily Verified Openings")),
        JobAlertPlan("alert-smart", "MMP SMART", 399, "Per Month", "Faster access to premium opportunities.", listOf("Priority Job Alerts", "Resume Review Support", "Direct WhatsApp Channel")),
        JobAlertPlan("alert-pro", "MMP PRO", 499, "Per Month", "Professional growth acceleration.", listOf("Premium Corporate Jobs Access", "Profile & CV Guidance", "Instant Interview Alerts"), recommended = true)
    )

    val INITIAL_CANDIDATES = listOf(
        Candidate(
            id = "MMP-CAN-100234",
            fullName = "Rajesh Kumar Biradar",
            mobile = "+91 98451 23450",
            whatsapp = "+91 98451 23450",
            email = "rajesh.biradar@example.com",
            dob = "1996-05-14",
            gender = "Male",
            currentLocation = "Davanagere, Karnataka",
            preferredLocation = "Davanagere / Hubli / Bangalore",
            education = "B.Com (Accounts & Tally ERP)",
            skills = listOf("Accounting", "Tally Prime", "GST Filing", "Bank Reconciliation", "MS Excel"),
            verifiedBadges = listOf(
                CandidateSkillBadge(
                    id = "BADGE-101",
                    skillName = "Tally Prime, GST & Accounting Essentials",
                    category = "Banking & BFSI",
                    assessmentId = "assess-tally-gst",
                    assessmentTitle = "Tally Prime, GST & Accounting Essentials",
                    scorePercentage = 92,
                    badgeLevel = "Gold Certified",
                    assessmentType = "Practical Scenario",
                    completedAt = "2026-09-15"
                )
            ),
            experienceYears = 4,
            currentSalary = "₹22,000 / month",
            expectedSalary = "₹28,000 / month",
            jobCategory = "Banking & BFSI",
            employmentType = "Full-Time",
            resumeFileName = "Rajesh_Biradar_CV.pdf",
            idProofType = "Aadhaar",
            idNumberMasked = "XXXX-XXXX-4198",
            verificationStatus = VerificationStatus.VERIFIED,
            status = CandidateStatus.MATCHED,
            registeredDate = "2026-08-10",
            activeMembershipPlan = "CAREER PLUS",
            activeMembershipExpires = "2027-02-10",
            hasFastTrack = true,
            hasJobAlerts = true
        ),
        Candidate(
            id = "MMP-CAN-100318",
            fullName = "Ananya S. Kulkarni",
            mobile = "+91 97412 88761",
            whatsapp = "+91 97412 88761",
            email = "ananya.kulkarni@example.com",
            dob = "2001-09-22",
            gender = "Female",
            currentLocation = "Raichur, Karnataka",
            preferredLocation = "Raichur / Hyderabad / Bangalore",
            education = "B.Tech (Electronics & Communication)",
            skills = listOf("PCB Assembly", "Quality Control", "SMT Line Operation", "Soldering"),
            verifiedBadges = listOf(
                CandidateSkillBadge(
                    id = "BADGE-102",
                    skillName = "SMT Assembly, Soldering & Quality Assurance",
                    category = "Manufacturing & Electronics",
                    assessmentId = "assess-electronics-smt",
                    assessmentTitle = "SMT Assembly, Soldering & Quality Assurance",
                    scorePercentage = 88,
                    badgeLevel = "Silver Certified",
                    assessmentType = "Technical SOP",
                    completedAt = "2026-09-20"
                )
            ),
            experienceYears = 1,
            currentSalary = "₹18,000 / month",
            expectedSalary = "₹25,000 / month",
            jobCategory = "Manufacturing & Electronics",
            employmentType = "Full-Time",
            resumeFileName = "Ananya_Kulkarni_Resume.pdf",
            idProofType = "Aadhaar",
            idNumberMasked = "XXXX-XXXX-8902",
            verificationStatus = VerificationStatus.VERIFIED,
            status = CandidateStatus.INTERVIEW,
            registeredDate = "2026-09-02",
            activeMembershipPlan = "CAREER PRO",
            activeMembershipExpires = "2027-09-02",
            hasFastTrack = true,
            hasJobAlerts = true
        ),
        Candidate(
            id = "MMP-CAN-100455",
            fullName = "Mohammad Tariq",
            mobile = "+91 99805 11204",
            whatsapp = "+91 99805 11204",
            email = "tariq.mmp@example.com",
            dob = "1998-11-04",
            gender = "Male",
            currentLocation = "Raichur, Karnataka",
            preferredLocation = "Raichur / Davanagere / Bellary",
            education = "Diploma in Electrical Engineering",
            skills = listOf("Industrial Wiring", "Substation Maintenance", "Motor Overhaul", "PLC Basics"),
            experienceYears = 3,
            currentSalary = "₹20,000 / month",
            expectedSalary = "₹26,000 / month",
            jobCategory = "Skilled Trade & Technical",
            employmentType = "Full-Time",
            resumeFileName = "Mohammad_Tariq_Electrical.pdf",
            idProofType = "Aadhaar",
            idNumberMasked = "XXXX-XXXX-6612",
            verificationStatus = VerificationStatus.VERIFIED,
            status = CandidateStatus.JOINED,
            registeredDate = "2026-07-15",
            activeMembershipPlan = "CAREER STARTER",
            activeMembershipExpires = "2026-10-15",
            hasFastTrack = false,
            hasJobAlerts = true
        )
    )

    val INITIAL_EMPLOYERS = listOf(
        Employer(
            id = "MMP-CLI-800121",
            companyName = "Apex Electronics Manufacturing Pvt Ltd",
            contactPerson = "Suresh N. Reddy",
            designation = "Head of HR & Plant Operations",
            mobile = "+91 99008 11092",
            whatsapp = "+91 99008 11092",
            email = "hr@apexelectronics.in",
            companyAddress = "Plot No. 42, Karur Industrial Area, Davanagere",
            city = "Davanagere",
            state = "Karnataka",
            industry = "Electronics & Component Assembly",
            website = "https://apexelectronics.in",
            gstOrPan = "29AAACA1234D1Z5",
            verificationStatus = VerificationStatus.VERIFIED,
            status = EmployerStatus.ACTIVE,
            registeredDate = "2026-06-12",
            membershipPlan = "GOLD (12 Months)",
            membershipExpiresAt = "2027-06-12",
            vacanciesCount = 3,
            openings = listOf("MMP-JOB-7701", "MMP-JOB-7704")
        ),
        Employer(
            id = "MMP-CLI-800294",
            companyName = "Tungabhadra Agro Logistics & Cold Storage",
            contactPerson = "Veeresh Patil",
            designation = "Managing Director",
            mobile = "+91 94481 55209",
            whatsapp = "+91 94481 55209",
            email = "operations@tbalogistics.com",
            companyAddress = "Industrial Sub-Station Ring Road, Raichur",
            city = "Raichur",
            state = "Karnataka",
            industry = "Agro Logistics & Warehousing",
            gstOrPan = "29AAGCT9081F1Z8",
            verificationStatus = VerificationStatus.VERIFIED,
            status = EmployerStatus.ACTIVE,
            registeredDate = "2026-07-20",
            membershipPlan = "SILVER (6 Months)",
            membershipExpiresAt = "2027-01-20",
            vacanciesCount = 2,
            openings = listOf("MMP-JOB-7702")
        ),
        Employer(
            id = "MMP-CLI-800452",
            companyName = "Kalyana Karnataka Financial Services",
            contactPerson = "Deepa Hegde",
            designation = "Senior Talent Acquisition Manager",
            mobile = "+91 98801 44321",
            whatsapp = "+91 98801 44321",
            email = "deepa.talent@kkfs.co.in",
            companyAddress = "PB Road, Near Bapuji Hospital, Davanagere",
            city = "Davanagere",
            state = "Karnataka",
            industry = "Banking & Financial Distribution",
            gstOrPan = "29AAACK5512B1ZA",
            verificationStatus = VerificationStatus.VERIFIED,
            status = EmployerStatus.ACTIVE,
            registeredDate = "2026-08-05",
            membershipPlan = "DIAMOND (12 Months)",
            membershipExpiresAt = "2027-08-05",
            vacanciesCount = 2,
            openings = listOf("MMP-JOB-7703")
        )
    )

    val INITIAL_JOBS = listOf(
        JobVacancy(
            id = "MMP-JOB-7701",
            employerId = "MMP-CLI-800121",
            employerName = "Apex Electronics Manufacturing Pvt Ltd",
            title = "SMT Machine Operator & Assembly Technician",
            category = "Manufacturing & Electronics",
            location = "Davanagere, Karnataka",
            employmentType = "Full-Time",
            salaryRange = "₹18,000 - ₹24,000 / month + Shift Allowance",
            qualification = "Diploma (ECE/EEE/Mechanical) or ITI Electronics",
            experienceRequired = "1 - 3 Years (Freshers with high aptitude considered)",
            vacanciesCount = 15,
            workingHours = "8-Hour Rotational Shifts",
            description = "Responsible for operating high-speed Surface Mount Technology (SMT) pick-and-place lines, solder paste printers, inspection of printed circuit boards, and line quality checks in ISO certified facility.",
            postedDate = "2026-10-01",
            deadlineDate = "2026-10-31",
            status = "Active",
            featured = true,
            mmpShieldVerified = true
        ),
        JobVacancy(
            id = "MMP-JOB-7702",
            employerId = "MMP-CLI-800294",
            employerName = "Tungabhadra Agro Logistics & Cold Storage",
            title = "Warehouse Operations Supervisor & Dispatch Lead",
            category = "Logistics & Supply Chain",
            location = "Raichur, Karnataka",
            employmentType = "Full-Time",
            salaryRange = "₹22,000 - ₹30,000 / month",
            qualification = "Graduate in Any Discipline (B.Com/B.Sc/B.A)",
            experienceRequired = "2 - 5 Years in Warehousing or Cold Storage",
            vacanciesCount = 4,
            workingHours = "9:00 AM - 6:30 PM",
            description = "Oversee dispatch scheduling, loading/unloading operations, cold-chain temperature monitoring, inventory logging in ERP, and leading a team of 15 warehouse floor associates.",
            postedDate = "2026-09-28",
            deadlineDate = "2026-10-25",
            status = "Active",
            featured = true,
            mmpShieldVerified = true
        ),
        JobVacancy(
            id = "MMP-JOB-7703",
            employerId = "MMP-CLI-800452",
            employerName = "Kalyana Karnataka Financial Services",
            title = "Branch Relationship Officer - Retail Loans & CASA",
            category = "Banking & BFSI",
            location = "Davanagere & Shimoga, Karnataka",
            employmentType = "Full-Time",
            salaryRange = "₹20,000 - ₹28,000 / month + Incentives",
            qualification = "Any Degree (B.Com / BBA / MBA Preferred)",
            experienceRequired = "1 - 4 Years Banking/NBFC sales",
            vacanciesCount = 6,
            workingHours = "9:30 AM - 6:00 PM",
            description = "Drive sourcing of current & savings accounts, retail loan applications, conducting KYC verifications, customer documentation, and organizing local merchant financial camps.",
            postedDate = "2026-10-04",
            deadlineDate = "2026-11-05",
            status = "Active",
            featured = true,
            mmpShieldVerified = true
        ),
        JobVacancy(
            id = "MMP-JOB-7704",
            employerId = "MMP-CLI-800121",
            employerName = "Apex Electronics Manufacturing Pvt Ltd",
            title = "Quality Control Inspector (IPC-A-610 Standards)",
            category = "Manufacturing & Electronics",
            location = "Davanagere, Karnataka",
            employmentType = "Full-Time",
            salaryRange = "₹20,000 - ₹26,000 / month",
            qualification = "Diploma / BE in Electronics or Mechanical",
            experienceRequired = "1 - 3 Years in Electronics QA",
            vacanciesCount = 5,
            workingHours = "General Shift (8:30 AM - 5:30 PM)",
            description = "Inspect incoming components and finished PCB assemblies using digital microscopes. Log defect travelers into MES and ensure strict adherence to IPC-A-610 Class 2 standards.",
            postedDate = "2026-10-08",
            deadlineDate = "2026-11-10",
            status = "Active",
            featured = false,
            mmpShieldVerified = true
        )
    )

    val INITIAL_APPLICATIONS = listOf(
        JobApplication(
            id = "MMP-APP-1021",
            jobId = "MMP-JOB-7701",
            jobTitle = "SMT Machine Operator & Assembly Technician",
            candidateId = "MMP-CAN-100318",
            candidateName = "Ananya S. Kulkarni",
            employerId = "MMP-CLI-800121",
            employerName = "Apex Electronics Manufacturing Pvt Ltd",
            appliedDate = "2026-10-02",
            status = CandidateStatus.INTERVIEW,
            interviewDate = "2026-10-22 at 11:00 AM",
            notes = "Shortlisted on MMP Fast-Track screening"
        ),
        JobApplication(
            id = "MMP-APP-1022",
            jobId = "MMP-JOB-7703",
            jobTitle = "Branch Relationship Officer - Retail Loans & CASA",
            candidateId = "MMP-CAN-100234",
            candidateName = "Rajesh Kumar Biradar",
            employerId = "MMP-CLI-800452",
            employerName = "Kalyana Karnataka Financial Services",
            appliedDate = "2026-10-05",
            status = CandidateStatus.MATCHED,
            notes = "Direct application via MMP Portal"
        )
    )

    val SKILL_ASSESSMENTS = listOf(
        SkillAssessment(
            id = "assess-tally-gst",
            title = "Tally Prime, GST & Accounting Essentials",
            category = "Banking & BFSI",
            description = "Verify practical ledger creation, GST tax invoice generation, reverse charge mechanisms, and monthly reconciliation skills.",
            durationMinutes = 10,
            passingScore = 65,
            badgeAvailable = "MMP Certified Tally & GST Specialist",
            type = "Practical Scenario",
            difficulty = "Intermediate",
            instructions = listOf(
                "Contains 6 scenario-based questions including voucher entries and tax calculations.",
                "Passing score is 65%. Scoring 90%+ awards Gold Certification.",
                "Instant MMP SHIELD™ badge generated on your Candidate ID."
            ),
            questions = listOf(
                AssessmentQuestion(
                    id = "q1",
                    question = "Under Indian GST rules, which voucher type in Tally Prime is used to record sales made to an inter-state registered buyer with IGST?",
                    options = listOf(
                        "Receipt Voucher (F6) with Tax Analysis",
                        "Sales Voucher (F8) with IGST Tax Ledger",
                        "Journal Voucher (F7) with Debit Note",
                        "Payment Voucher (F5) with Reverse Charge"
                    ),
                    correctOptionIndex = 1,
                    explanation = "F8 (Sales Voucher) is used in Tally Prime. For inter-state sales, Integrated GST (IGST) is applied instead of CGST+SGST."
                ),
                AssessmentQuestion(
                    id = "q2",
                    question = "A company in Karnataka purchases goods worth ₹1,00,000 from a vendor in Maharashtra at 18% GST. What is the correct tax accounting entry?",
                    options = listOf(
                        "Debit Input CGST ₹9,000 and Input SGST ₹9,000",
                        "Debit Input IGST ₹18,000",
                        "Credit Output IGST ₹18,000",
                        "Debit Expense ₹1,18,000 without separate tax ledger"
                    ),
                    correctOptionIndex = 1,
                    explanation = "Inter-state purchase attracts IGST. As a purchase, input tax credit is recorded by debiting Input IGST ₹18,000."
                ),
                AssessmentQuestion(
                    id = "q3",
                    question = "In Bank Reconciliation in Tally, an employer issued a cheque of ₹45,000 on March 28th which cleared on April 4th. How does this affect the March 31st reconciliation?",
                    options = listOf(
                        "Deduct from cash book balance",
                        "Add to passbook balance as cheques issued but not yet presented",
                        "No reconciliation needed as transaction is in both financial years",
                        "Reverse the entry in March sales register"
                    ),
                    correctOptionIndex = 1,
                    explanation = "Cheques issued but not yet presented for payment are added back to passbook balance in BRS."
                ),
                AssessmentQuestion(
                    id = "q4",
                    question = "What is the mandatory threshold requirement for generating an E-Way Bill for inter-state consignment goods under GST rules?",
                    options = listOf(
                        "Consignment value exceeding ₹50,000",
                        "Consignment value exceeding ₹10,000",
                        "Only for consignments exceeding ₹5,00,000",
                        "Every consignment regardless of value"
                    ),
                    correctOptionIndex = 0,
                    explanation = "Under GST rules, an E-Way Bill is mandatory for inter-state transportation of goods when the consignment value exceeds ₹50,000."
                ),
                AssessmentQuestion(
                    id = "q5",
                    question = "Which shortcut key in Tally Prime allows you to drill down into Detailed Ledger Vouchers from a Balance Sheet or Trial Balance?",
                    options = listOf(
                        "Alt + F1 (or Alt + F5)",
                        "Ctrl + Shift + Enter",
                        "Alt + P",
                        "F12 Configure"
                    ),
                    correctOptionIndex = 0,
                    explanation = "Alt + F1 (or Alt + F5 in modern Tally Prime) toggles between condensed and detailed views across reports."
                )
            )
        ),
        SkillAssessment(
            id = "assess-electronics-smt",
            title = "SMT Assembly, Soldering & Quality Assurance",
            category = "Manufacturing & Electronics",
            description = "Technical evaluation of electronic circuit assembly, surface mount technology (SMT) handling, ESD safety, and IPC-A-610 inspection standards.",
            durationMinutes = 8,
            passingScore = 60,
            badgeAvailable = "MMP Certified Electronics Assembly Technician",
            type = "Technical SOP",
            difficulty = "Intermediate",
            instructions = listOf(
                "5 technical questions covering ESD precautions, component polarity, and solder joint defects.",
                "Passing score is 60% (3/5)."
            ),
            questions = listOf(
                AssessmentQuestion(
                    id = "e1",
                    question = "What is the primary purpose of wearing an ESD wrist strap with a 1 Megaohm resistor on the shop floor?",
                    options = listOf(
                        "To prevent physical shocks from 440V high tension power",
                        "To safely bleed static charges from the operator body to ground without rapid discharge",
                        "To measure body temperature during shift change",
                        "To keep the hands steady during micro-soldering"
                    ),
                    correctOptionIndex = 1,
                    explanation = "The wrist strap safely dissipates static electricity to ground to prevent destroying sensitive microchips."
                ),
                AssessmentQuestion(
                    id = "e2",
                    question = "When inspecting SMT solder joints under magnification, what does a 'tombstoning' defect indicate?",
                    options = listOf(
                        "The PCB board is burnt black from excessive heat",
                        "A two-terminal passive component has lifted on one end during reflow soldering",
                        "The solder paste has completely evaporated without trace",
                        "Solder has bridged across 10 adjacent integrated circuit pins"
                    ),
                    correctOptionIndex = 1,
                    explanation = "Tombstoning occurs when one end of an SMT chip component lifts off the pad due to unequal wetting tension."
                ),
                AssessmentQuestion(
                    id = "e3",
                    question = "Which of the following components is POLARIZED and will fail or explode if mounted backwards on the circuit board?",
                    options = listOf(
                        "Standard ceramic surface capacitor (0805 MLCC)",
                        "Electrolytic capacitor & Diode",
                        "10 kΩ Surface mount resistor",
                        "Ferrite bead inductor"
                    ),
                    correctOptionIndex = 1,
                    explanation = "Electrolytic capacitors and diodes have strict positive/negative polarity requirements."
                )
            )
        )
    )

    val WORKFORCE_SECTORS = listOf(
        WorkforceSector(
            id = "facility-admin",
            categoryName = "Facility & Office Administration",
            badge = "OFFICE & ADMIN",
            roles = listOf(
                WorkforceRole("Housekeeping Staff", "Sanitation & Cleanliness", "Facility Hygiene", "Commercial facility cleaning, waste disposal, floor scrubbing, and sanitized workplace standards."),
                WorkforceRole("Office Assistants & Peons", "Office Errands & Support", "Day-to-Day Operations", "Document delivery, bank visits, printing, conference room setups, and administrative support."),
                WorkforceRole("Front Desk Receptionist", "Visitor Desk & Calls", "Guest Relations", "Visitor sign-in, EPABX call routing, courier management, and professional representation."),
                WorkforceRole("Data Entry Operator (DEO)", "Typing & MS Excel Records", "Digital Records", "Fast numeric/alpha typing (35+ WPM), Excel maintenance, data cleaning, and ERP entry.")
            )
        ),
        WorkforceSector(
            id = "security-guarding",
            categoryName = "Security & Asset Protection",
            badge = "SECURITY GUARDING",
            roles = listOf(
                WorkforceRole("Day & Night Security Guards", "24/7 Perimeter Protection", "Static Guarding", "Round-the-clock entrance guarding, perimeter checks, visitor register tracking, and incident logging."),
                WorkforceRole("Commercial Complex Guards", "Malls & Corporate Towers", "Access Control", "Metal detector screening, baggage checks, parking lane discipline, and lift surveillance."),
                WorkforceRole("Security Field Supervisors", "Shift Roster & Patrolling", "Team Leadership", "Managing 10-30 guard shifts, turn-out inspection, guard briefing, and client escalation handling.")
            )
        ),
        WorkforceSector(
            id = "logistics-warehousing",
            categoryName = "Logistics, Warehousing & Fleet",
            badge = "LOGISTICS & FLEET",
            roles = listOf(
                WorkforceRole("Warehouse Floor Associates", "Picking, Packing & Stacking", "Material Handling", "Manual loading/unloading, inventory sorting, barcoding, bin replenishment, and 5S compliance."),
                WorkforceRole("Forklift & Reach Truck Drivers", "Licensed High-Mast Stacking", "Heavy Equipment", "Certified pallet truck/forklift operation, high-rack storage, dock maneuvering, and daily checks."),
                WorkforceRole("Delivery Riders & Field Messengers", "Last-Mile Commercial Delivery", "Route Dispatch", "Licensed two-wheeler delivery riders, COD cash collection, geofenced customer drops.")
            )
        ),
        WorkforceSector(
            id = "manufacturing-industrial",
            categoryName = "Manufacturing & Assembly Technicians",
            badge = "INDUSTRIAL & TECH",
            roles = listOf(
                WorkforceRole("Assembly Line Operators", "High-Volume Shopfloor Production", "Precision Assembly", "Repetitive electro-mechanical sub-assembly, pneumatic screw-driving, torque inspection."),
                WorkforceRole("SMT Machine Operators", "Pick-and-Place Electronics", "Surface Mount Tech", "Component reel feeder setup, solder paste stencil alignment, reflow oven profile checks."),
                WorkforceRole("Industrial Electricians", "Panel Wiring & Maintenance", "Electrical Utilities", "LT/HT panel wiring, motor star-delta starter repair, backup diesel generator servicing.")
            )
        )
    )

    val INITIAL_PAYMENTS = listOf(
        PaymentTransaction(
            id = "MMP-TXN-2026-8801",
            userId = "MMP-CAN-100234",
            userName = "Rajesh Kumar Biradar",
            userType = "Candidate",
            amount = 1499,
            serviceType = "Candidate Membership",
            planName = "CAREER PLUS (6 Months)",
            date = "2026-08-10",
            paymentMethod = "UPI",
            status = "Success",
            invoiceNumber = "INV-MMP-2026-8801"
        ),
        PaymentTransaction(
            id = "MMP-TXN-2026-9214",
            userId = "MMP-CLI-800121",
            userName = "Apex Electronics Manufacturing Pvt Ltd",
            userType = "Employer",
            amount = 25000,
            serviceType = "Client Membership",
            planName = "Client GOLD Plan (12 Months)",
            date = "2026-06-12",
            paymentMethod = "NEFT/RTGS",
            status = "Success",
            invoiceNumber = "INV-MMP-2026-9214"
        )
    )

    val INITIAL_AUDIT_LOGS = listOf(
        AuditLog("LOG-9001", "2026-10-18 10:14", "Candidate Verified", "Compliance Desk", "Super Admin", "MMP-CAN-100234", "Candidate documents & skill certificate verified with SHIELD cryptographic badge."),
        AuditLog("LOG-9002", "2026-10-17 15:30", "Job Vacancy Approved", "Talent Acquisition", "Recruiter", "MMP-JOB-7701", "Apex Electronics SMT Operator 15 openings published to master portal."),
        AuditLog("LOG-9003", "2026-10-16 09:20", "Employer Audit Passed", "Verification Team", "Verification Officer", "MMP-CLI-800121", "GST 29AAACA1234D1Z5 and Karur industrial plot registered.")
    )
}
