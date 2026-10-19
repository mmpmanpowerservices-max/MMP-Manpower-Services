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
import com.example.data.model.CandidateStatus
import com.example.data.model.Employer
import com.example.ui.MmpViewModel
import com.example.ui.PaymentConfig
import com.example.ui.theme.*

@Composable
fun EmployerPortalScreen(
    viewModel: MmpViewModel
) {
    val employers by viewModel.employers.collectAsState()
    val applications by viewModel.applications.collectAsState()
    val currentEmpId by viewModel.currentEmployerId.collectAsState()
    val activeEmployer = employers.find { it.id == currentEmpId } ?: employers.first()
    val employerApps = applications.filter { it.employerId == activeEmployer.id }

    var selectedSubTab by remember { mutableStateOf(0) } // 0=Corporate Desk, 1=Post Vacancy, 2=Client Memberships, 3=Register Company

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Navy950)
            .padding(16.dp)
    ) {
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
                text = { Text("Corporate Desk", fontSize = 10.sp, fontWeight = FontWeight.Bold) }
            )
            Tab(
                selected = selectedSubTab == 1,
                onClick = { selectedSubTab = 1 },
                text = { Text("Post Vacancy", fontSize = 10.sp, fontWeight = FontWeight.Bold) }
            )
            Tab(
                selected = selectedSubTab == 2,
                onClick = { selectedSubTab = 2 },
                text = { Text("Client Plans", fontSize = 10.sp, fontWeight = FontWeight.Bold) }
            )
            Tab(
                selected = selectedSubTab == 3,
                onClick = { selectedSubTab = 3 },
                text = { Text("Register", fontSize = 10.sp, fontWeight = FontWeight.Bold) }
            )
        }

        Spacer(modifier = Modifier.height(14.dp))

        when (selectedSubTab) {
            0 -> CorporateDeskView(
                employer = activeEmployer,
                applications = employerApps,
                onPostClick = { selectedSubTab = 1 },
                onUpgradeClick = { selectedSubTab = 2 },
                onUpdateAppStatus = { appId, status -> viewModel.updateApplicationStatus(appId, status) }
            )
            1 -> PostVacancyForm(viewModel = viewModel, onPosted = { selectedSubTab = 0 })
            2 -> ClientPlansView(employer = activeEmployer, viewModel = viewModel)
            3 -> EmployerRegisterForm(viewModel = viewModel, onRegistered = { selectedSubTab = 0 })
        }
    }
}

@Composable
private fun CorporateDeskView(
    employer: Employer,
    applications: List<com.example.data.model.JobApplication>,
    onPostClick: () -> Unit,
    onUpgradeClick: () -> Unit,
    onUpdateAppStatus: (String, CandidateStatus) -> Unit
) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(14.dp)) {
        // Corporate Client Card
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
                        .background(Brush.verticalGradient(listOf(Navy800, Navy950)))
                        .padding(18.dp)
                ) {
                    Column {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "MMP CORPORATE CLIENT",
                                color = Gold400,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Black,
                                letterSpacing = 1.sp
                            )

                            Box(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(8.dp))
                                    .background(EmeraldSuccess.copy(alpha = 0.2f))
                                    .border(1.dp, EmeraldSuccess, RoundedCornerShape(8.dp))
                                    .padding(horizontal = 8.dp, vertical = 3.dp)
                            ) {
                                Text(
                                    text = employer.verificationStatus.label.uppercase(),
                                    color = EmeraldSuccess,
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }

                        Spacer(modifier = Modifier.height(10.dp))

                        Text(
                            text = employer.companyName,
                            color = Color.White,
                            fontSize = 17.sp,
                            fontWeight = FontWeight.ExtraBold
                        )
                        Text(
                            text = "${employer.contactPerson} (${employer.designation})",
                            color = Slate300,
                            fontSize = 12.sp
                        )

                        Spacer(modifier = Modifier.height(10.dp))

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Column {
                                Text("GST / PAN", color = Slate400, fontSize = 10.sp)
                                Text(employer.gstOrPan, color = Slate200, fontSize = 11.sp, fontWeight = FontWeight.SemiBold)
                            }
                            Column {
                                Text("Membership Tier", color = Slate400, fontSize = 10.sp)
                                Text(employer.membershipPlan ?: "Silver Plan", color = Gold300, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                            }
                        }

                        Spacer(modifier = Modifier.height(14.dp))

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            Button(
                                onClick = onPostClick,
                                modifier = Modifier.weight(1f).height(40.dp),
                                shape = RoundedCornerShape(8.dp),
                                colors = ButtonDefaults.buttonColors(containerColor = Gold400, contentColor = Navy950)
                            ) {
                                Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(4.dp))
                                Text("Post Vacancy", fontWeight = FontWeight.Bold, fontSize = 11.sp)
                            }

                            OutlinedButton(
                                onClick = onUpgradeClick,
                                modifier = Modifier.weight(1f).height(40.dp),
                                shape = RoundedCornerShape(8.dp),
                                border = androidx.compose.foundation.BorderStroke(1.dp, Gold400)
                            ) {
                                Text("Plans & SLA", color = Gold300, fontSize = 11.sp, fontWeight = FontWeight.SemiBold)
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

        // Candidate Applications Received Pipeline
        item {
            Text(
                text = "APPLICANT PIPELINE (${applications.size})",
                color = Gold300,
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 0.5.sp
            )
        }

        if (applications.isEmpty()) {
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(10.dp))
                        .background(Navy900)
                        .padding(20.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "No candidate applications received for your vacancies yet. Post more vacancies to attract applicants!",
                        color = Slate400,
                        fontSize = 12.sp,
                        textAlign = androidx.compose.ui.text.style.TextAlign.Center
                    )
                }
            }
        } else {
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
                            Text(text = app.candidateName, color = Color.White, fontSize = 14.sp, fontWeight = FontWeight.Bold)
                            Box(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(6.dp))
                                    .background(Navy800)
                                    .padding(horizontal = 6.dp, vertical = 2.dp)
                            ) {
                                Text(text = app.status.label, color = Gold400, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                            }
                        }

                        Text(text = "Applied to: ${app.jobTitle}", color = Slate300, fontSize = 11.sp)
                        Text(text = "Application ID: ${app.id} • ${app.appliedDate}", color = Slate400, fontSize = 10.sp)

                        Spacer(modifier = Modifier.height(10.dp))

                        // Status Progression Action Buttons
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            StatusActionButton("Interview", modifier = Modifier.weight(1f)) {
                                onUpdateAppStatus(app.id, CandidateStatus.INTERVIEW)
                            }
                            StatusActionButton("Select", modifier = Modifier.weight(1f)) {
                                onUpdateAppStatus(app.id, CandidateStatus.SELECTED)
                            }
                            StatusActionButton("Joined", modifier = Modifier.weight(1f)) {
                                onUpdateAppStatus(app.id, CandidateStatus.JOINED)
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun StatusActionButton(label: String, modifier: Modifier = Modifier, onClick: () -> Unit) {
    OutlinedButton(
        onClick = onClick,
        modifier = modifier.height(30.dp),
        contentPadding = PaddingValues(horizontal = 4.dp, vertical = 2.dp),
        border = androidx.compose.foundation.BorderStroke(1.dp, Gold500.copy(alpha = 0.5f)),
        shape = RoundedCornerShape(6.dp)
    ) {
        Text(text = label, color = Gold300, fontSize = 10.sp, fontWeight = FontWeight.Bold)
    }
}

@Composable
private fun PostVacancyForm(
    viewModel: MmpViewModel,
    onPosted: () -> Unit
) {
    var title by remember { mutableStateOf("") }
    var category by remember { mutableStateOf("Manufacturing & Electronics") }
    var location by remember { mutableStateOf("Davanagere, Karnataka") }
    var salaryRange by remember { mutableStateOf("₹20,000 - ₹28,000 / month") }
    var qualification by remember { mutableStateOf("Diploma / ITI / Graduate") }
    var experienceRequired by remember { mutableStateOf("1 - 3 Years") }
    var vacanciesCount by remember { mutableStateOf("5") }
    var workingHours by remember { mutableStateOf("8-Hour Rotational Shifts") }
    var description by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        Text("POST CORPORATE JOB VACANCY", color = Gold300, fontSize = 14.sp, fontWeight = FontWeight.Bold)

        OutlinedTextField(
            value = title,
            onValueChange = { title = it },
            label = { Text("Job Title (e.g. SMT Operator, Sales Officer)") },
            modifier = Modifier.fillMaxWidth(),
            colors = defaultFieldColors()
        )

        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedTextField(
                value = location,
                onValueChange = { location = it },
                label = { Text("Job Location") },
                modifier = Modifier.weight(1f),
                colors = defaultFieldColors()
            )
            OutlinedTextField(
                value = vacanciesCount,
                onValueChange = { vacanciesCount = it },
                label = { Text("Openings Count") },
                modifier = Modifier.weight(0.7f),
                colors = defaultFieldColors()
            )
        }

        OutlinedTextField(
            value = salaryRange,
            onValueChange = { salaryRange = it },
            label = { Text("Salary Range (CTC/In-hand)") },
            modifier = Modifier.fillMaxWidth(),
            colors = defaultFieldColors()
        )

        OutlinedTextField(
            value = qualification,
            onValueChange = { qualification = it },
            label = { Text("Required Qualification") },
            modifier = Modifier.fillMaxWidth(),
            colors = defaultFieldColors()
        )

        OutlinedTextField(
            value = description,
            onValueChange = { description = it },
            label = { Text("Role Description & Duties") },
            modifier = Modifier.fillMaxWidth().height(100.dp),
            colors = defaultFieldColors()
        )

        Spacer(modifier = Modifier.height(6.dp))

        Button(
            onClick = {
                if (title.isNotBlank()) {
                    viewModel.postJobVacancy(
                        title = title,
                        category = category,
                        location = location,
                        salaryRange = salaryRange,
                        qualification = qualification,
                        experienceRequired = experienceRequired,
                        vacanciesCount = vacanciesCount.toIntOrNull() ?: 2,
                        workingHours = workingHours,
                        description = if (description.isNotBlank()) description else "Professional role at verified corporate employer in Karnataka."
                    )
                    onPosted()
                }
            },
            enabled = title.isNotBlank(),
            modifier = Modifier.fillMaxWidth().height(48.dp),
            shape = RoundedCornerShape(10.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Gold400, contentColor = Navy950)
        ) {
            Text("PUBLISH VACANCY TO MMP PORTAL", fontWeight = FontWeight.Black)
        }
    }
}

@Composable
private fun ClientPlansView(
    employer: Employer,
    viewModel: MmpViewModel
) {
    val plans = MmpRepository.INITIAL_CLIENT_PLANS

    LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Text("CLIENT RECRUITMENT PLANS & SLAs", color = Gold400, fontSize = 12.sp, fontWeight = FontWeight.Bold)
            Text("Guaranteed talent pipelines, candidate background checks, and replacement turnaround.", color = Slate400, fontSize = 11.sp)
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
                        Text(text = plan.name, color = Color.White, fontWeight = FontWeight.Black, fontSize = 16.sp)
                        Text(text = "₹${plan.price}", color = Gold300, fontWeight = FontWeight.Black, fontSize = 18.sp)
                    }

                    Text(text = "Validity: ${plan.duration} • ${plan.candidateProfilesLimit}", color = Slate400, fontSize = 11.sp)

                    Spacer(modifier = Modifier.height(10.dp))

                    plan.features.take(4).forEach { feat ->
                        Row(modifier = Modifier.padding(vertical = 2.dp), verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Check, contentDescription = null, tint = EmeraldSuccess, modifier = Modifier.size(14.dp))
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(text = feat, color = Slate300, fontSize = 11.sp)
                        }
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Button(
                        onClick = {
                            viewModel.openPayment(
                                PaymentConfig(
                                    userId = employer.id,
                                    userName = employer.companyName,
                                    userType = "Employer",
                                    serviceType = "Client Membership",
                                    planName = "Client ${plan.name} (${plan.duration})",
                                    amount = plan.price
                                )
                            )
                        },
                        modifier = Modifier.fillMaxWidth().height(40.dp),
                        shape = RoundedCornerShape(8.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = Gold400, contentColor = Navy950)
                    ) {
                        Text("SELECT ${plan.name} PLAN (₹${plan.price})", fontWeight = FontWeight.Bold, fontSize = 11.sp)
                    }
                }
            }
        }
    }
}

@Composable
private fun EmployerRegisterForm(
    viewModel: MmpViewModel,
    onRegistered: () -> Unit
) {
    var companyName by remember { mutableStateOf("") }
    var contactPerson by remember { mutableStateOf("") }
    var designation by remember { mutableStateOf("HR Manager") }
    var mobile by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var address by remember { mutableStateOf("Karur Industrial Area, Davanagere") }
    var gst by remember { mutableStateOf("29AAACK1234F1Z5") }
    var industry by remember { mutableStateOf("Manufacturing & Industrial") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        Text("CORPORATE EMPLOYER ONBOARDING", color = Gold300, fontSize = 14.sp, fontWeight = FontWeight.Bold)

        OutlinedTextField(
            value = companyName,
            onValueChange = { companyName = it },
            label = { Text("Company Legal Name") },
            modifier = Modifier.fillMaxWidth(),
            colors = defaultFieldColors()
        )

        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedTextField(
                value = contactPerson,
                onValueChange = { contactPerson = it },
                label = { Text("Contact Person") },
                modifier = Modifier.weight(1f),
                colors = defaultFieldColors()
            )
            OutlinedTextField(
                value = designation,
                onValueChange = { designation = it },
                label = { Text("Designation") },
                modifier = Modifier.weight(1f),
                colors = defaultFieldColors()
            )
        }

        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedTextField(
                value = mobile,
                onValueChange = { mobile = it },
                label = { Text("Phone / WhatsApp") },
                modifier = Modifier.weight(1f),
                colors = defaultFieldColors()
            )
            OutlinedTextField(
                value = email,
                onValueChange = { email = it },
                label = { Text("Official Corporate Email") },
                modifier = Modifier.weight(1f),
                colors = defaultFieldColors()
            )
        }

        OutlinedTextField(
            value = gst,
            onValueChange = { gst = it },
            label = { Text("GSTIN or Corporate PAN") },
            modifier = Modifier.fillMaxWidth(),
            colors = defaultFieldColors()
        )

        OutlinedTextField(
            value = address,
            onValueChange = { address = it },
            label = { Text("Registered Plant / Office Address") },
            modifier = Modifier.fillMaxWidth(),
            colors = defaultFieldColors()
        )

        Button(
            onClick = {
                if (companyName.isNotBlank() && mobile.isNotBlank()) {
                    viewModel.registerEmployer(
                        companyName = companyName,
                        contactPerson = contactPerson,
                        designation = designation,
                        mobile = mobile,
                        whatsapp = mobile,
                        email = email,
                        companyAddress = address,
                        city = "Davanagere",
                        state = "Karnataka",
                        industry = industry,
                        gstOrPan = gst
                    )
                    onRegistered()
                }
            },
            enabled = companyName.isNotBlank() && mobile.isNotBlank(),
            modifier = Modifier.fillMaxWidth().height(48.dp),
            shape = RoundedCornerShape(10.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Gold400, contentColor = Navy950)
        ) {
            Text("REGISTER & SUBMIT FOR VERIFICATION", fontWeight = FontWeight.Black)
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
