package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.MmpRepository
import com.example.data.model.*
import com.example.ui.MmpViewModel
import com.example.ui.PaymentConfig
import com.example.ui.theme.*

@Composable
fun ServicesAndShieldScreen(
    viewModel: MmpViewModel
) {
    var selectedServiceTab by remember { mutableStateOf(0) } // 0=Shield Lookup, 1=Skill Assessments, 2=Fast Track, 3=Grievance, 4=Franchise

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Navy950)
            .padding(16.dp)
    ) {
        ScrollableTabRow(
            selectedTabIndex = selectedServiceTab,
            containerColor = Navy900,
            contentColor = Gold400,
            edgePadding = 0.dp,
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(10.dp))
                .border(1.dp, Gold500.copy(alpha = 0.35f), RoundedCornerShape(10.dp))
        ) {
            Tab(selected = selectedServiceTab == 0, onClick = { selectedServiceTab = 0 }, text = { Text("🛡️ SHIELD Lookup", fontSize = 11.sp, fontWeight = FontWeight.Bold) })
            Tab(selected = selectedServiceTab == 1, onClick = { selectedServiceTab = 1 }, text = { Text("📝 Assessments", fontSize = 11.sp, fontWeight = FontWeight.Bold) })
            Tab(selected = selectedServiceTab == 2, onClick = { selectedServiceTab = 2 }, text = { Text("⚡ Fast Track", fontSize = 11.sp, fontWeight = FontWeight.Bold) })
            Tab(selected = selectedServiceTab == 3, onClick = { selectedServiceTab = 3 }, text = { Text("⚖️ Grievance Desk", fontSize = 11.sp, fontWeight = FontWeight.Bold) })
            Tab(selected = selectedServiceTab == 4, onClick = { selectedServiceTab = 4 }, text = { Text("🤝 Franchise", fontSize = 11.sp, fontWeight = FontWeight.Bold) })
        }

        Spacer(modifier = Modifier.height(14.dp))

        when (selectedServiceTab) {
            0 -> ShieldLookupView(viewModel = viewModel)
            1 -> SkillAssessmentsCatalogueView(viewModel = viewModel)
            2 -> FastTrackServiceView(viewModel = viewModel)
            3 -> GrievanceDeskView(viewModel = viewModel)
            4 -> FranchiseInquiryView(viewModel = viewModel)
        }
    }
}

@Composable
private fun ShieldLookupView(viewModel: MmpViewModel) {
    var queryText by remember { mutableStateOf("MMP-CAN-100234") }
    val lookupResult by viewModel.shieldLookupResult.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        Text("MMP SHIELD™ CREDENTIAL VERIFICATION", color = Gold300, fontSize = 14.sp, fontWeight = FontWeight.Bold, letterSpacing = 0.5.sp)
        Text(
            text = "Enter any Candidate ID, Employer ID, Job Code, or Invoice Number to verify cryptographic authenticity.",
            color = Slate400,
            fontSize = 11.sp
        )

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            OutlinedTextField(
                value = queryText,
                onValueChange = { queryText = it },
                placeholder = { Text("e.g. MMP-CAN-100234", color = Slate700) },
                singleLine = true,
                modifier = Modifier.weight(1f),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedTextColor = Color.White,
                    unfocusedTextColor = Slate200,
                    focusedBorderColor = Gold400,
                    unfocusedBorderColor = Slate700,
                    focusedContainerColor = Navy900,
                    unfocusedContainerColor = Navy900
                )
            )

            Button(
                onClick = { viewModel.performShieldLookup(queryText) },
                colors = ButtonDefaults.buttonColors(containerColor = Gold400, contentColor = Navy950),
                shape = RoundedCornerShape(8.dp),
                modifier = Modifier.height(52.dp)
            ) {
                Icon(Icons.Default.Verified, contentDescription = null, modifier = Modifier.size(16.dp))
                Spacer(modifier = Modifier.width(4.dp))
                Text("Verify", fontWeight = FontWeight.Bold)
            }
        }

        // Quick helper buttons
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(6.dp)
        ) {
            QuickSampleChip("Sample Candidate") { queryText = "MMP-CAN-100234"; viewModel.performShieldLookup(queryText) }
            QuickSampleChip("Sample Employer") { queryText = "MMP-CLI-800121"; viewModel.performShieldLookup(queryText) }
            QuickSampleChip("Sample Job") { queryText = "MMP-JOB-7701"; viewModel.performShieldLookup(queryText) }
        }

        Spacer(modifier = Modifier.height(10.dp))

        // Result Card
        if (lookupResult != null) {
            val (type, record) = lookupResult!!
            if (type == "Not Found") {
                Card(
                    shape = RoundedCornerShape(14.dp),
                    colors = CardDefaults.cardColors(containerColor = Navy900),
                    modifier = Modifier.fillMaxWidth().border(1.dp, RubyRed, RoundedCornerShape(14.dp))
                ) {
                    Column(modifier = Modifier.padding(16.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                        Icon(Icons.Default.GppBad, contentDescription = null, tint = RubyRed, modifier = Modifier.size(44.dp))
                        Spacer(modifier = Modifier.height(8.dp))
                        Text("RECORD NOT FOUND IN MMP MASTER REPOSITORY", color = RubyRed, fontWeight = FontWeight.Bold, fontSize = 12.sp)
                        Text("No registered or verified credential exists for '$record'. Exercise vigilance against unauthorized agents.", color = Slate400, fontSize = 11.sp, textAlign = androidx.compose.ui.text.style.TextAlign.Center)
                    }
                }
            } else {
                Card(
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = Navy900),
                    modifier = Modifier.fillMaxWidth().border(2.dp, Gold400, RoundedCornerShape(16.dp))
                ) {
                    Column(modifier = Modifier.padding(18.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(Icons.Default.Verified, contentDescription = null, tint = EmeraldSuccess, modifier = Modifier.size(24.dp))
                                Spacer(modifier = Modifier.width(6.dp))
                                Text("OFFICIAL MMP SHIELD™ VERIFIED", color = EmeraldSuccess, fontWeight = FontWeight.Black, fontSize = 12.sp)
                            }
                            Text(text = type.uppercase(), color = Gold400, fontWeight = FontWeight.Bold, fontSize = 11.sp)
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        when (type) {
                            "Candidate" -> {
                                val c = record as Candidate
                                Text("Name: ${c.fullName}", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 16.sp)
                                Text("ID: ${c.id}", color = Gold300, fontSize = 12.sp)
                                Text("Location: ${c.currentLocation} • Education: ${c.education}", color = Slate300, fontSize = 12.sp)
                                Text("Verification Status: ${c.verificationStatus.label}", color = EmeraldSuccess, fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
                                Text("Skills: ${c.skills.joinToString(", ")}", color = Slate400, fontSize = 11.sp)
                            }
                            "Employer" -> {
                                val e = record as Employer
                                Text(e.companyName, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 16.sp)
                                Text("Client ID: ${e.id}", color = Gold300, fontSize = 12.sp)
                                Text("Contact: ${e.contactPerson} (${e.designation})", color = Slate300, fontSize = 12.sp)
                                Text("GST / PAN: ${e.gstOrPan} • Status: ${e.status.label}", color = EmeraldSuccess, fontSize = 12.sp)
                            }
                            "Job" -> {
                                val j = record as JobVacancy
                                Text(j.title, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 16.sp)
                                Text("Job ID: ${j.id} • Posted by: ${j.employerName}", color = Gold300, fontSize = 12.sp)
                                Text("Location: ${j.location} • Salary: ${j.salaryRange}", color = Slate300, fontSize = 12.sp)
                                Text("Vacancies: ${j.vacanciesCount} • Status: Active", color = EmeraldSuccess, fontSize = 12.sp)
                            }
                            "Invoice" -> {
                                val p = record as PaymentTransaction
                                Text("Invoice: ${p.invoiceNumber}", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 16.sp)
                                Text("Txn ID: ${p.id} • User: ${p.userName}", color = Gold300, fontSize = 12.sp)
                                Text("Amount: ₹${p.amount} • Service: ${p.serviceType}", color = Slate300, fontSize = 12.sp)
                                Text("Status: ${p.status} (Verified on Indian Banking Grid)", color = EmeraldSuccess, fontSize = 12.sp)
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun QuickSampleChip(label: String, onClick: () -> Unit) {
    Box(
        modifier = Modifier
            .clip(RoundedCornerShape(6.dp))
            .background(Navy800)
            .border(1.dp, Slate700, RoundedCornerShape(6.dp))
            .clickable(onClick = onClick)
            .padding(horizontal = 8.dp, vertical = 4.dp)
    ) {
        Text(text = label, color = Gold300, fontSize = 10.sp, fontWeight = FontWeight.Medium)
    }
}

@Composable
private fun SkillAssessmentsCatalogueView(viewModel: MmpViewModel) {
    val assessments = MmpRepository.SKILL_ASSESSMENTS

    LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Text("MMP SHIELD™ SKILL ASSESSMENTS", color = Gold300, fontSize = 14.sp, fontWeight = FontWeight.Bold)
            Text("Take practical assessments to earn digital badges verified on your candidate profile.", color = Slate400, fontSize = 11.sp)
        }

        items(assessments) { assessment ->
            Card(
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = Navy900),
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.dp, Gold500.copy(alpha = 0.4f), RoundedCornerShape(14.dp))
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(text = assessment.category.uppercase(), color = Gold400, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                        Text(text = "${assessment.durationMinutes} mins • ${assessment.difficulty}", color = Slate400, fontSize = 10.sp)
                    }

                    Spacer(modifier = Modifier.height(6.dp))

                    Text(text = assessment.title, color = Color.White, fontSize = 14.sp, fontWeight = FontWeight.Bold)
                    Text(text = assessment.description, color = Slate300, fontSize = 11.sp, lineHeight = 16.sp)

                    Spacer(modifier = Modifier.height(8.dp))

                    Text(text = "🎖️ Award: ${assessment.badgeAvailable}", color = Gold300, fontSize = 11.sp, fontWeight = FontWeight.SemiBold)

                    Spacer(modifier = Modifier.height(10.dp))

                    Button(
                        onClick = { viewModel.openAssessment(assessment) },
                        modifier = Modifier.fillMaxWidth().height(38.dp),
                        shape = RoundedCornerShape(8.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = Gold400, contentColor = Navy950)
                    ) {
                        Text("START PRACTICAL ASSESSMENT", fontWeight = FontWeight.Bold, fontSize = 11.sp)
                    }
                }
            }
        }
    }
}

@Composable
private fun FastTrackServiceView(viewModel: MmpViewModel) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        Card(
            shape = RoundedCornerShape(18.dp),
            colors = CardDefaults.cardColors(containerColor = Navy900),
            modifier = Modifier.fillMaxWidth().border(2.dp, Gold400, RoundedCornerShape(18.dp))
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.Bolt, contentDescription = null, tint = Gold400, modifier = Modifier.size(24.dp))
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("MMP FAST-TRACK™ EXPEDITED PLACEMENT", color = Color.White, fontWeight = FontWeight.Black, fontSize = 15.sp)
                }

                Spacer(modifier = Modifier.height(10.dp))

                Text(
                    text = "A prioritized screening and placement track designed for job seekers seeking immediate deployment in Karnataka industrial clusters.",
                    color = Slate300,
                    fontSize = 12.sp,
                    lineHeight = 18.sp
                )

                Spacer(modifier = Modifier.height(14.dp))

                FastTrackBullet("Priority CV Forwarding to top corporate HR heads")
                FastTrackBullet("Guaranteed interview scheduling within 7–10 working days")
                FastTrackBullet("Direct recruitment officer assigned for phone mock-interviews")
                FastTrackBullet("Zero commission deducted from candidate salary")

                Spacer(modifier = Modifier.height(18.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text("One-Time Processing Fee", color = Slate400, fontSize = 10.sp)
                        Text("₹3,400 (All Inclusive)", color = Gold300, fontSize = 18.sp, fontWeight = FontWeight.Black)
                    }

                    Button(
                        onClick = {
                            viewModel.openPayment(
                                PaymentConfig(
                                    userId = viewModel.currentCandidateId.value,
                                    userName = "Candidate Member",
                                    userType = "Candidate",
                                    serviceType = "Fast Track",
                                    planName = "MMP Fast Track Service (Expedited Screening & Placement)",
                                    amount = 3400
                                )
                            )
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = Gold400, contentColor = Navy950),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text("ENROLL IN FAST TRACK", fontWeight = FontWeight.Black, fontSize = 11.sp)
                    }
                }
            }
        }
    }
}

@Composable
private fun FastTrackBullet(text: String) {
    Row(modifier = Modifier.padding(vertical = 3.dp), verticalAlignment = Alignment.CenterVertically) {
        Icon(Icons.Default.CheckCircle, contentDescription = null, tint = Gold400, modifier = Modifier.size(16.dp))
        Spacer(modifier = Modifier.width(8.dp))
        Text(text = text, color = Slate200, fontSize = 12.sp)
    }
}

@Composable
private fun GrievanceDeskView(viewModel: MmpViewModel) {
    var name by remember { mutableStateOf("") }
    var contact by remember { mutableStateOf("") }
    var subject by remember { mutableStateOf("") }
    var description by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        Text("MMP SHIELD™ GRIEVANCE & SUPPORT DESK", color = Gold300, fontSize = 14.sp, fontWeight = FontWeight.Bold)
        Text("Report unauthorized direct hiring violations, service disputes, or payment queries directly to our compliance officer.", color = Slate400, fontSize = 11.sp)

        OutlinedTextField(
            value = name,
            onValueChange = { name = it },
            label = { Text("Your Name") },
            modifier = Modifier.fillMaxWidth(),
            colors = defaultColors()
        )

        OutlinedTextField(
            value = contact,
            onValueChange = { contact = it },
            label = { Text("Mobile Number") },
            modifier = Modifier.fillMaxWidth(),
            colors = defaultColors()
        )

        OutlinedTextField(
            value = subject,
            onValueChange = { subject = it },
            label = { Text("Complaint / Grievance Subject") },
            modifier = Modifier.fillMaxWidth(),
            colors = defaultColors()
        )

        OutlinedTextField(
            value = description,
            onValueChange = { description = it },
            label = { Text("Detailed Description of Incident / Concern") },
            modifier = Modifier.fillMaxWidth().height(100.dp),
            colors = defaultColors()
        )

        Button(
            onClick = {
                if (name.isNotBlank() && subject.isNotBlank()) {
                    viewModel.submitComplaint(
                        name = name,
                        userType = "Public",
                        contact = contact,
                        subject = subject,
                        category = "Service Issue",
                        description = description
                    )
                    name = ""; contact = ""; subject = ""; description = ""
                }
            },
            enabled = name.isNotBlank() && subject.isNotBlank(),
            modifier = Modifier.fillMaxWidth().height(46.dp),
            shape = RoundedCornerShape(10.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Gold400, contentColor = Navy950)
        ) {
            Text("SUBMIT FORMAL GRIEVANCE TICKET", fontWeight = FontWeight.Black)
        }
    }
}

@Composable
private fun FranchiseInquiryView(viewModel: MmpViewModel) {
    var fullName by remember { mutableStateOf("") }
    var mobile by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var city by remember { mutableStateOf("Hubli-Dharwad, Karnataka") }
    var capacity by remember { mutableStateOf("₹5 Lakhs - ₹10 Lakhs") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        Text("FRANCHISE PARTNERSHIP EXPANSION", color = Gold300, fontSize = 14.sp, fontWeight = FontWeight.Bold)
        Text("Join MMP Manpower Services as an authorized district franchise partner across tier-2 and tier-3 Karnataka centres.", color = Slate400, fontSize = 11.sp)

        OutlinedTextField(
            value = fullName,
            onValueChange = { fullName = it },
            label = { Text("Full Name of Applicant") },
            modifier = Modifier.fillMaxWidth(),
            colors = defaultColors()
        )

        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedTextField(
                value = mobile,
                onValueChange = { mobile = it },
                label = { Text("Mobile Number") },
                modifier = Modifier.weight(1f),
                colors = defaultColors()
            )
            OutlinedTextField(
                value = email,
                onValueChange = { email = it },
                label = { Text("Email Address") },
                modifier = Modifier.weight(1f),
                colors = defaultColors()
            )
        }

        OutlinedTextField(
            value = city,
            onValueChange = { city = it },
            label = { Text("Proposed Franchise City / District") },
            modifier = Modifier.fillMaxWidth(),
            colors = defaultColors()
        )

        OutlinedTextField(
            value = capacity,
            onValueChange = { capacity = it },
            label = { Text("Investment Capacity") },
            modifier = Modifier.fillMaxWidth(),
            colors = defaultColors()
        )

        Button(
            onClick = {
                if (fullName.isNotBlank() && mobile.isNotBlank()) {
                    viewModel.submitFranchise(
                        fullName = fullName,
                        mobile = mobile,
                        email = email,
                        city = city,
                        state = "Karnataka",
                        hasOfficeSpace = true,
                        investmentCapacity = capacity
                    )
                    fullName = ""; mobile = ""; email = ""
                }
            },
            enabled = fullName.isNotBlank() && mobile.isNotBlank(),
            modifier = Modifier.fillMaxWidth().height(46.dp),
            shape = RoundedCornerShape(10.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Gold400, contentColor = Navy950)
        ) {
            Text("SUBMIT FRANCHISE INQUIRY", fontWeight = FontWeight.Black)
        }
    }
}

@Composable
private fun defaultColors() = OutlinedTextFieldDefaults.colors(
    focusedTextColor = Color.White,
    unfocusedTextColor = Slate200,
    focusedBorderColor = Gold400,
    unfocusedBorderColor = Slate700,
    focusedLabelColor = Gold400,
    unfocusedLabelColor = Slate400,
    focusedContainerColor = Navy900,
    unfocusedContainerColor = Navy900
)
