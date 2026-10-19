package com.example.ui.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.R
import com.example.data.model.JobVacancy
import com.example.ui.MmpViewModel
import com.example.ui.PaymentConfig
import com.example.ui.theme.*

@Composable
fun HomeScreen(
    viewModel: MmpViewModel,
    onNavigate: (Int) -> Unit
) {
    val jobs by viewModel.jobs.collectAsState()
    val candidates by viewModel.candidates.collectAsState()
    val employers by viewModel.employers.collectAsState()
    val featuredJobs = jobs.filter { it.featured }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(Navy950),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(18.dp)
    ) {
        // 1. Royal Hero Showcase Banner
        item {
            Card(
                shape = RoundedCornerShape(22.dp),
                colors = CardDefaults.cardColors(containerColor = Navy900),
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.5.dp, Gold400, RoundedCornerShape(22.dp))
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(
                            Brush.verticalGradient(
                                colors = listOf(Navy800, Navy950)
                            )
                        )
                        .padding(20.dp)
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        // Official Emblem Centerpiece
                        Box(
                            modifier = Modifier
                                .size(96.dp)
                                .clip(RoundedCornerShape(20.dp))
                                .background(Navy950)
                                .border(2.dp, Gold400, RoundedCornerShape(20.dp)),
                            contentAlignment = Alignment.Center
                        ) {
                            Image(
                                painter = painterResource(id = R.drawable.ic_mmp_logo),
                                contentDescription = "MMP Royal Crest",
                                modifier = Modifier.size(88.dp)
                            )
                        }

                        Spacer(modifier = Modifier.height(14.dp))

                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = "MMP",
                                color = Gold300,
                                fontSize = 20.sp,
                                fontWeight = FontWeight.Black,
                                letterSpacing = 1.sp
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = "MAN",
                                color = Saffron400,
                                fontSize = 20.sp,
                                fontWeight = FontWeight.Black,
                                letterSpacing = 1.sp
                            )
                            Text(
                                text = "POWER",
                                color = EmeraldGreen,
                                fontSize = 20.sp,
                                fontWeight = FontWeight.Black,
                                letterSpacing = 1.sp
                            )
                        }

                        Text(
                            text = "— SERVICES —",
                            color = Gold400,
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Bold,
                            letterSpacing = 4.sp
                        )

                        Spacer(modifier = Modifier.height(10.dp))

                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(20.dp))
                                .background(Navy800)
                                .border(1.5.dp, Gold400, RoundedCornerShape(20.dp))
                                .padding(horizontal = 14.dp, vertical = 6.dp)
                        ) {
                            Text(
                                text = "YOUR WORKFORCE. OUR STRENGTH. YOUR SUCCESS.",
                                color = Color.White,
                                fontSize = 10.5.sp,
                                fontWeight = FontWeight.ExtraBold,
                                letterSpacing = 0.5.sp
                            )
                        }

                        Spacer(modifier = Modifier.height(8.dp))

                        // Tiranga Accent Rule
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.Center,
                            modifier = Modifier.width(180.dp)
                        ) {
                            Box(modifier = Modifier.weight(1f).height(2.5.dp).background(Saffron500, RoundedCornerShape(2.dp)))
                            Spacer(modifier = Modifier.width(4.dp))
                            Box(modifier = Modifier.size(6.dp).clip(RoundedCornerShape(3.dp)).background(Gold400))
                            Spacer(modifier = Modifier.width(4.dp))
                            Box(modifier = Modifier.weight(1f).height(2.5.dp).background(TirangaGreen, RoundedCornerShape(2.dp)))
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        Text(
                            text = "Karnataka's Premier Verified Placement Network spanning Davanagere, Raichur, Bangalore & PAN-India.",
                            color = Slate300,
                            fontSize = 12.sp,
                            lineHeight = 17.sp,
                            modifier = Modifier.padding(horizontal = 8.dp),
                            textAlign = androidx.compose.ui.text.style.TextAlign.Center
                        )

                        Spacer(modifier = Modifier.height(16.dp))

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(10.dp)
                        ) {
                            Button(
                                onClick = { onNavigate(1) }, // Find jobs
                                modifier = Modifier
                                    .weight(1f)
                                    .height(44.dp),
                                shape = RoundedCornerShape(10.dp),
                                colors = ButtonDefaults.buttonColors(
                                    containerColor = Gold400,
                                    contentColor = Navy950
                                )
                            ) {
                                Icon(Icons.Default.Search, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(6.dp))
                                Text("FIND JOBS", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                            }

                            OutlinedButton(
                                onClick = { onNavigate(4) }, // Employers
                                modifier = Modifier
                                    .weight(1f)
                                    .height(44.dp),
                                shape = RoundedCornerShape(10.dp),
                                border = androidx.compose.foundation.BorderStroke(1.5.dp, Gold400),
                                colors = ButtonDefaults.outlinedButtonColors(
                                    contentColor = Gold300
                                )
                            ) {
                                Icon(Icons.Default.Business, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(6.dp))
                                Text("POST VACANCY", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                            }
                        }
                    }
                }
            }
        }

        // 2. Metrics & Trust Counters
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                MetricCard(
                    number = "${candidates.size * 1200}+",
                    label = "Candidates Placed",
                    icon = Icons.Default.Groups,
                    modifier = Modifier.weight(1f)
                )
                MetricCard(
                    number = "${employers.size * 80}+",
                    label = "Corporate Clients",
                    icon = Icons.Default.CorporateFare,
                    modifier = Modifier.weight(1f)
                )
                MetricCard(
                    number = "98.4%",
                    label = "SHIELD Verified",
                    icon = Icons.Default.Verified,
                    modifier = Modifier.weight(1f)
                )
            }
        }

        // 3. Fast-Track Banner Card
        item {
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Navy900),
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.dp, Gold500.copy(alpha = 0.5f), RoundedCornerShape(16.dp))
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Bolt, contentDescription = null, tint = Gold400, modifier = Modifier.size(20.dp))
                            Spacer(modifier = Modifier.width(6.dp))
                            Text("MMP Fast-Track™ Service", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        }
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "Expedited screening & interview coordination within 7–10 days.",
                            color = Slate400,
                            fontSize = 11.sp
                        )
                    }

                    Spacer(modifier = Modifier.width(8.dp))

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
                        shape = RoundedCornerShape(8.dp),
                        contentPadding = PaddingValues(horizontal = 10.dp, vertical = 6.dp)
                    ) {
                        Text("₹3,400", fontWeight = FontWeight.Black, fontSize = 12.sp)
                    }
                }
            }
        }

        // 4. Quick Portals Grid
        item {
            Text(
                text = "CORE RECRUITMENT PORTALS",
                color = Gold400,
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 1.sp
            )
            Spacer(modifier = Modifier.height(8.dp))

            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    PortalTile(
                        title = "Find Jobs",
                        subtitle = "${jobs.size} Active Vacancies",
                        icon = Icons.Default.Work,
                        modifier = Modifier.weight(1f),
                        onClick = { onNavigate(1) }
                    )
                    PortalTile(
                        title = "Workforce Hub",
                        subtitle = "Skilled & Semi-Skilled",
                        icon = Icons.Default.Badge,
                        modifier = Modifier.weight(1f),
                        onClick = { onNavigate(2) }
                    )
                }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    PortalTile(
                        title = "Candidate Desk",
                        subtitle = "Digital ID & Badges",
                        icon = Icons.Default.PersonSearch,
                        modifier = Modifier.weight(1f),
                        onClick = { onNavigate(3) }
                    )
                    PortalTile(
                        title = "MMP SHIELD™",
                        subtitle = "Instant Credential Check",
                        icon = Icons.Default.Security,
                        modifier = Modifier.weight(1f),
                        onClick = { onNavigate(5) }
                    )
                }
            }
        }

        // 5. Featured Openings Section Header
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "FEATURED JOB OPENINGS",
                    color = Gold400,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 1.sp
                )

                Text(
                    text = "View All (${jobs.size}) →",
                    color = Gold300,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold,
                    modifier = Modifier.clickable { onNavigate(1) }
                )
            }
        }

        // Featured jobs list items
        items(featuredJobs) { job ->
            FeaturedJobCard(
                job = job,
                onViewDetails = { viewModel.openJobDetail(job) },
                onQuickApply = { viewModel.applyForJob(job.id) }
            )
        }
    }
}

@Composable
private fun MetricCard(
    number: String,
    label: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    modifier: Modifier = Modifier
) {
    Card(
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Navy900),
        modifier = modifier.border(1.dp, Gold500.copy(alpha = 0.35f), RoundedCornerShape(12.dp))
    ) {
        Column(
            modifier = Modifier.padding(12.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Icon(imageVector = icon, contentDescription = null, tint = Gold400, modifier = Modifier.size(20.dp))
            Spacer(modifier = Modifier.height(4.dp))
            Text(text = number, color = Color.White, fontWeight = FontWeight.Black, fontSize = 15.sp)
            Text(text = label, color = Slate400, fontSize = 9.sp, textAlign = androidx.compose.ui.text.style.TextAlign.Center)
        }
    }
}

@Composable
private fun PortalTile(
    title: String,
    subtitle: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    modifier: Modifier = Modifier,
    onClick: () -> Unit
) {
    Card(
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = Navy900),
        modifier = modifier
            .border(1.dp, Gold500.copy(alpha = 0.4f), RoundedCornerShape(14.dp))
            .clickable(onClick = onClick)
    ) {
        Row(
            modifier = Modifier.padding(14.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(38.dp)
                    .clip(RoundedCornerShape(8.dp))
                    .background(Navy800),
                contentAlignment = Alignment.Center
            ) {
                Icon(imageVector = icon, contentDescription = title, tint = Gold400, modifier = Modifier.size(20.dp))
            }
            Spacer(modifier = Modifier.width(10.dp))
            Column {
                Text(text = title, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                Text(text = subtitle, color = Slate400, fontSize = 10.sp)
            }
        }
    }
}

@Composable
private fun FeaturedJobCard(
    job: JobVacancy,
    onViewDetails: () -> Unit,
    onQuickApply: () -> Unit
) {
    Card(
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = Navy900),
        modifier = Modifier
            .fillMaxWidth()
            .border(1.dp, Gold500.copy(alpha = 0.3f), RoundedCornerShape(14.dp))
            .clickable(onClick = onViewDetails)
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.Top
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = job.title,
                        color = Color.White,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(2.dp))
                    Text(
                        text = job.employerName,
                        color = Gold400,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Medium
                    )
                }

                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(6.dp))
                        .background(Navy800)
                        .border(1.dp, EmeraldSuccess.copy(alpha = 0.5f), RoundedCornerShape(6.dp))
                        .padding(horizontal = 6.dp, vertical = 2.dp)
                ) {
                    Text(text = "VERIFIED", color = EmeraldSuccess, fontSize = 9.sp, fontWeight = FontWeight.Bold)
                }
            }

            Spacer(modifier = Modifier.height(8.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                Text(text = "📍 ${job.location}", color = Slate300, fontSize = 11.sp)
                Text(text = "💰 ${job.salaryRange}", color = Gold300, fontSize = 11.sp, fontWeight = FontWeight.SemiBold)
            }

            Spacer(modifier = Modifier.height(10.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.End,
                verticalAlignment = Alignment.CenterVertically
            ) {
                TextButton(onClick = onViewDetails) {
                    Text("Details", color = Slate300, fontSize = 11.sp)
                }
                Spacer(modifier = Modifier.width(6.dp))
                Button(
                    onClick = onQuickApply,
                    colors = ButtonDefaults.buttonColors(containerColor = Gold400, contentColor = Navy950),
                    shape = RoundedCornerShape(6.dp),
                    contentPadding = PaddingValues(horizontal = 12.dp, vertical = 4.dp),
                    modifier = Modifier.height(32.dp)
                ) {
                    Text("Quick Apply", fontWeight = FontWeight.Bold, fontSize = 11.sp)
                }
            }
        }
    }
}
