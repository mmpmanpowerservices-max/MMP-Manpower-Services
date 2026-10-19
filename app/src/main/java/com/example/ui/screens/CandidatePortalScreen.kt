package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
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
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.MmpRepository
import com.example.data.model.Candidate
import com.example.data.model.CandidateMembershipPlan
import com.example.ui.MmpViewModel
import com.example.ui.PaymentConfig
import com.example.ui.theme.*

@Composable
fun CandidatePortalScreen(
    viewModel: MmpViewModel,
    onTakeAssessment: () -> Unit
) {
    val candidates by viewModel.candidates.collectAsState()
    val applications by viewModel.applications.collectAsState()
    val currentCandId by viewModel.currentCandidateId.collectAsState()
    val activeCandidate = candidates.find { it.id == currentCandId } ?: candidates.first()
    val myApplications = applications.filter { it.candidateId == activeCandidate.id }

    var selectedSubTab by remember { mutableStateOf(0) } // 0=ID & Profile, 1=My Applications, 2=Memberships, 3=Register Form

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Navy950)
            .padding(16.dp)
    ) {
        // Tab Row
        TabRow(
            selectedTabIndex = selectedSubTab,
            containerColor = Navy900,
            contentColor = Gold400,
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(10.dp))
                .border(1.dp, Gold500.copy(alpha = 0.35f), RoundedCornerShape(10.dp))
        ) {
            Tab(
                selected = selectedSubTab == 0,
                onClick = { selectedSubTab = 0 },
                text = { Text("Profile & ID", fontSize = 11.sp, fontWeight = FontWeight.Bold) }
            )
            Tab(
                selected = selectedSubTab == 1,
                onClick = { selectedSubTab = 1 },
                text = { Text("Applications (${myApplications.size})", fontSize = 11.sp, fontWeight = FontWeight.Bold) }
            )
            Tab(
                selected = selectedSubTab == 2,
                onClick = { selectedSubTab = 2 },
                text = { Text("Plans", fontSize = 11.sp, fontWeight = FontWeight.Bold) }
            )
            Tab(
                selected = selectedSubTab == 3,
                onClick = { selectedSubTab = 3 },
                text = { Text("Register", fontSize = 11.sp, fontWeight = FontWeight.Bold) }
            )
        }

        Spacer(modifier = Modifier.height(14.dp))

        when (selectedSubTab) {
            0 -> CandidateProfileView(candidate = activeCandidate, onTakeAssessment = onTakeAssessment, onUpgrade = { selectedSubTab = 2 })
            1 -> CandidateApplicationsView(applications = myApplications)
            2 -> CandidatePlansView(candidate = activeCandidate, viewModel = viewModel)
            3 -> CandidateRegisterForm(viewModel = viewModel, onRegistered = { selectedSubTab = 0 })
        }
    }
}

@Composable
private fun CandidateProfileView(
    candidate: Candidate,
    onTakeAssessment: () -> Unit,
    onUpgrade: () -> Unit
) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Official Digital ID Card
        item {
            Card(
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = Navy900),
                modifier = Modifier
                    .fillMaxWidth()
                    .border(2.dp, Gold400, RoundedCornerShape(18.dp))
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(
                            Brush.verticalGradient(
                                listOf(Navy800, Navy950)
                            )
                        )
                        .padding(18.dp)
                ) {
                    Column {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column {
                                Text(
                                    text = "MMP SHIELD™ VERIFIED ID",
                                    color = Gold400,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Black,
                                    letterSpacing = 1.sp
                                )
                                Text(
                                    text = candidate.id,
                                    color = Color.White,
                                    fontSize = 15.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }

                            Box(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(8.dp))
                                    .background(EmeraldSuccess.copy(alpha = 0.2f))
                                    .border(1.dp, EmeraldSuccess, RoundedCornerShape(8.dp))
                                    .padding(horizontal = 8.dp, vertical = 4.dp)
                            ) {
                                Text(
                                    text = candidate.verificationStatus.label.uppercase(),
                                    color = EmeraldSuccess,
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }

                        Spacer(modifier = Modifier.height(14.dp))

                        Text(
                            text = candidate.fullName,
                            color = Color.White,
                            fontSize = 18.sp,
                            fontWeight = FontWeight.ExtraBold
                        )
                        Text(
                            text = "${candidate.education} • ${candidate.experienceYears} Years Exp",
                            color = Slate300,
                            fontSize = 12.sp
                        )

                        Spacer(modifier = Modifier.height(10.dp))

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Column {
                                Text("Current Location", color = Slate400, fontSize = 10.sp)
                                Text(candidate.currentLocation, color = Slate200, fontSize = 12.sp, fontWeight = FontWeight.Medium)
                            }
                            Column {
                                Text("Active Membership", color = Slate400, fontSize = 10.sp)
                                Text(candidate.activeMembershipPlan ?: "Standard", color = Gold300, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                            }
                        }

                        Spacer(modifier = Modifier.height(14.dp))

                        // Skills Pills
                        Text("VERIFIED SKILLS", color = Gold400, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                        Spacer(modifier = Modifier.height(4.dp))
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            candidate.skills.take(3).forEach { skill ->
                                Box(
                                    modifier = Modifier
                                        .clip(RoundedCornerShape(6.dp))
                                        .background(Navy900)
                                        .border(1.dp, Gold500.copy(alpha = 0.3f), RoundedCornerShape(6.dp))
                                        .padding(horizontal = 8.dp, vertical = 4.dp)
                                ) {
                                    Text(text = skill, color = Slate200, fontSize = 10.sp)
                                }
                            }
                        }

                        Spacer(modifier = Modifier.height(14.dp))

                        // Card Footer with Emblem & Tagline
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(8.dp))
                                .background(Navy900)
                                .border(1.dp, Gold500.copy(alpha = 0.3f), RoundedCornerShape(8.dp))
                                .padding(horizontal = 10.dp, vertical = 6.dp)
                        ) {
                            androidx.compose.foundation.Image(
                                painter = androidx.compose.ui.res.painterResource(id = com.example.R.drawable.ic_mmp_logo),
                                contentDescription = "MMP Crest",
                                modifier = Modifier.size(24.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "YOUR WORKFORCE. OUR STRENGTH. YOUR SUCCESS.",
                                color = Gold300,
                                fontSize = 8.5.sp,
                                fontWeight = FontWeight.Bold,
                                letterSpacing = 0.5.sp
                            )
                        }
                    }
                }
            }
        }

        // Verified Badges section
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "MMP SHIELD™ BADGES (${candidate.verifiedBadges.size})",
                    color = Gold300,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold
                )

                TextButton(onClick = onTakeAssessment) {
                    Text("+ Take Assessment", color = Gold400, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                }
            }

            if (candidate.verifiedBadges.isEmpty()) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(10.dp))
                        .background(Navy900)
                        .padding(16.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "No skill badges earned yet. Take an assessment to earn Gold/Silver certification!",
                        color = Slate400,
                        fontSize = 12.sp,
                        textAlign = androidx.compose.ui.text.style.TextAlign.Center
                    )
                }
            } else {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    candidate.verifiedBadges.forEach { badge ->
                        Card(
                            shape = RoundedCornerShape(10.dp),
                            colors = CardDefaults.cardColors(containerColor = Navy900),
                            modifier = Modifier
                                .fillMaxWidth()
                                .border(1.dp, Gold500.copy(alpha = 0.4f), RoundedCornerShape(10.dp))
                        ) {
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(12.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Column(modifier = Modifier.weight(1f)) {
                                    Text(
                                        text = badge.assessmentTitle,
                                        color = Color.White,
                                        fontSize = 13.sp,
                                        fontWeight = FontWeight.Bold
                                    )
                                    Text(
                                        text = "Scored ${badge.scorePercentage}% • ${badge.completedAt}",
                                        color = Slate400,
                                        fontSize = 11.sp
                                    )
                                }

                                Box(
                                    modifier = Modifier
                                        .clip(RoundedCornerShape(6.dp))
                                        .background(Gold400.copy(alpha = 0.15f))
                                        .border(1.dp, Gold400, RoundedCornerShape(6.dp))
                                        .padding(horizontal = 8.dp, vertical = 4.dp)
                                ) {
                                    Text(
                                        text = badge.badgeLevel,
                                        color = Gold300,
                                        fontSize = 10.sp,
                                        fontWeight = FontWeight.Bold
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }

        // Actions
        item {
            Button(
                onClick = onUpgrade,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(46.dp),
                shape = RoundedCornerShape(10.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Gold400, contentColor = Navy950)
            ) {
                Icon(Icons.Default.Star, contentDescription = null, modifier = Modifier.size(18.dp))
                Spacer(modifier = Modifier.width(6.dp))
                Text("UPGRADE CANDIDATE MEMBERSHIP", fontWeight = FontWeight.Bold, fontSize = 12.sp)
            }
        }
    }
}

@Composable
private fun CandidateApplicationsView(applications: List<com.example.data.model.JobApplication>) {
    if (applications.isEmpty()) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text("No job applications submitted yet. Browse jobs to apply!", color = Slate400, fontSize = 13.sp)
        }
    } else {
        LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            items(applications) { app ->
                Card(
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = Navy900),
                    modifier = Modifier
                        .fillMaxWidth()
                        .border(1.dp, Gold500.copy(alpha = 0.35f), RoundedCornerShape(12.dp))
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(text = app.id, color = Slate400, fontSize = 11.sp)
                            Box(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(6.dp))
                                    .background(Navy800)
                                    .padding(horizontal = 8.dp, vertical = 3.dp)
                            ) {
                                Text(
                                    text = app.status.label.uppercase(),
                                    color = if (app.status == com.example.data.model.CandidateStatus.JOINED) EmeraldSuccess else Gold400,
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }

                        Spacer(modifier = Modifier.height(6.dp))

                        Text(text = app.jobTitle, color = Color.White, fontSize = 14.sp, fontWeight = FontWeight.Bold)
                        Text(text = app.employerName, color = Gold400, fontSize = 12.sp)

                        Spacer(modifier = Modifier.height(8.dp))

                        if (app.interviewDate != null) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(Icons.Default.Event, contentDescription = null, tint = Gold300, modifier = Modifier.size(14.dp))
                                Spacer(modifier = Modifier.width(6.dp))
                                Text(text = "Interview: ${app.interviewDate}", color = Gold300, fontSize = 11.sp, fontWeight = FontWeight.SemiBold)
                            }
                        }

                        if (app.notes != null) {
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(text = "Notes: ${app.notes}", color = Slate400, fontSize = 11.sp)
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun CandidatePlansView(
    candidate: Candidate,
    viewModel: MmpViewModel
) {
    val plans = MmpRepository.INITIAL_CANDIDATE_PLANS

    LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Text(
                text = "CANDIDATE MEMBERSHIP TIERS",
                color = Gold400,
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 1.sp
            )
            Text(
                text = "Activate priority placement, resume review, and verified employer forwarding.",
                color = Slate400,
                fontSize = 11.sp
            )
        }

        items(plans) { plan ->
            Card(
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = Navy900),
                modifier = Modifier
                    .fillMaxWidth()
                    .border(
                        width = if (plan.recommended) 1.5.dp else 1.dp,
                        color = if (plan.recommended) Gold400 else Slate700,
                        shape = RoundedCornerShape(14.dp)
                    )
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(text = plan.name, color = Color.White, fontWeight = FontWeight.Black, fontSize = 15.sp)
                        Text(text = "₹${plan.price}", color = Gold300, fontWeight = FontWeight.Black, fontSize = 18.sp)
                    }

                    Text(text = "Duration: ${plan.duration}", color = Slate400, fontSize = 11.sp)

                    Spacer(modifier = Modifier.height(10.dp))

                    plan.features.take(4).forEach { feat ->
                        Row(modifier = Modifier.padding(vertical = 2.dp), verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Check, contentDescription = null, tint = EmeraldSuccess, modifier = Modifier.size(14.dp))
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(text = feat, color = Slate300, fontSize = 11.sp)
                        }
                    }

                    Spacer(modifier = Modifier.height(14.dp))

                    Button(
                        onClick = {
                            viewModel.openPayment(
                                PaymentConfig(
                                    userId = candidate.id,
                                    userName = candidate.fullName,
                                    userType = "Candidate",
                                    serviceType = "Candidate Membership",
                                    planName = "${plan.name} (${plan.duration})",
                                    amount = plan.price
                                )
                            )
                        },
                        modifier = Modifier.fillMaxWidth().height(40.dp),
                        shape = RoundedCornerShape(8.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = Gold400, contentColor = Navy950)
                    ) {
                        Text("SELECT ${plan.name} (₹${plan.price})", fontWeight = FontWeight.Bold, fontSize = 11.sp)
                    }
                }
            }
        }
    }
}

@Composable
private fun CandidateRegisterForm(
    viewModel: MmpViewModel,
    onRegistered: () -> Unit
) {
    var fullName by remember { mutableStateOf("") }
    var mobile by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var currentLocation by remember { mutableStateOf("Davanagere, Karnataka") }
    var education by remember { mutableStateOf("Graduate") }
    var skills by remember { mutableStateOf("Tally, MS Excel, Inventory") }
    var expYears by remember { mutableStateOf("2") }
    var expectedSalary by remember { mutableStateOf("₹22,000 / month") }
    var idProof by remember { mutableStateOf("Aadhaar") }
    var idNumber by remember { mutableStateOf("XXXX-XXXX-1234") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        Text("NEW CANDIDATE REGISTRATION", color = Gold300, fontSize = 14.sp, fontWeight = FontWeight.Bold)

        OutlinedTextField(
            value = fullName,
            onValueChange = { fullName = it },
            label = { Text("Full Name (as per Aadhaar)") },
            modifier = Modifier.fillMaxWidth(),
            colors = defaultFieldColors()
        )

        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedTextField(
                value = mobile,
                onValueChange = { mobile = it },
                label = { Text("Mobile Number") },
                modifier = Modifier.weight(1f),
                colors = defaultFieldColors()
            )
            OutlinedTextField(
                value = email,
                onValueChange = { email = it },
                label = { Text("Email Address") },
                modifier = Modifier.weight(1f),
                colors = defaultFieldColors()
            )
        }

        OutlinedTextField(
            value = currentLocation,
            onValueChange = { currentLocation = it },
            label = { Text("Current City / District") },
            modifier = Modifier.fillMaxWidth(),
            colors = defaultFieldColors()
        )

        OutlinedTextField(
            value = education,
            onValueChange = { education = it },
            label = { Text("Highest Educational Qualification") },
            modifier = Modifier.fillMaxWidth(),
            colors = defaultFieldColors()
        )

        OutlinedTextField(
            value = skills,
            onValueChange = { skills = it },
            label = { Text("Key Skills (comma separated)") },
            modifier = Modifier.fillMaxWidth(),
            colors = defaultFieldColors()
        )

        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedTextField(
                value = expYears,
                onValueChange = { expYears = it },
                label = { Text("Years Experience") },
                modifier = Modifier.weight(1f),
                colors = defaultFieldColors()
            )
            OutlinedTextField(
                value = expectedSalary,
                onValueChange = { expectedSalary = it },
                label = { Text("Expected Salary") },
                modifier = Modifier.weight(1f),
                colors = defaultFieldColors()
            )
        }

        Button(
            onClick = {
                if (fullName.isNotBlank() && mobile.isNotBlank()) {
                    viewModel.registerCandidate(
                        fullName = fullName,
                        mobile = mobile,
                        whatsapp = mobile,
                        email = email,
                        dob = "2000-01-01",
                        gender = "Male",
                        currentLocation = currentLocation,
                        preferredLocation = currentLocation,
                        education = education,
                        skillsStr = skills,
                        experienceYears = expYears.toIntOrNull() ?: 1,
                        expectedSalary = expectedSalary,
                        jobCategory = "General & Skilled Manpower",
                        idProofType = idProof,
                        idNumberMasked = idNumber
                    )
                    onRegistered()
                }
            },
            enabled = fullName.isNotBlank() && mobile.isNotBlank(),
            modifier = Modifier.fillMaxWidth().height(48.dp),
            shape = RoundedCornerShape(10.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Gold400, contentColor = Navy950)
        ) {
            Text("SUBMIT CANDIDATE PROFILE", fontWeight = FontWeight.Black)
        }
    }
}

@Composable
private fun defaultFieldColors() = OutlinedTextFieldDefaults.colors(
    focusedTextColor = Color.White,
    unfocusedTextColor = Slate200,
    focusedBorderColor = Gold400,
    unfocusedBorderColor = Slate700,
    focusedLabelColor = Gold400,
    unfocusedLabelColor = Slate400,
    focusedContainerColor = Navy900,
    unfocusedContainerColor = Navy900
)
