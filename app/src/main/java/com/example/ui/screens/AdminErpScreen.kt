package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
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
import com.example.data.model.VerificationStatus
import com.example.ui.MmpViewModel
import com.example.ui.theme.*

@Composable
fun AdminErpScreen(
    viewModel: MmpViewModel
) {
    val candidates by viewModel.candidates.collectAsState()
    val employers by viewModel.employers.collectAsState()
    val jobs by viewModel.jobs.collectAsState()
    val payments by viewModel.payments.collectAsState()
    val auditLogs by viewModel.auditLogs.collectAsState()

    val totalRevenue = payments.sumOf { it.amount }

    var selectedAdminTab by remember { mutableStateOf(0) } // 0=Overview & Verifications, 1=Payments & Invoices, 2=Audit Trail

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Navy950)
            .padding(16.dp)
    ) {
        // Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "MMP ADMIN & COMPLIANCE ERP",
                    color = Gold300,
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Black,
                    letterSpacing = 1.sp
                )
                Text(
                    text = "Super Admin • Placement & Financial Operations Console",
                    color = Slate400,
                    fontSize = 10.sp
                )
            }

            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(6.dp))
                    .background(RubyRed.copy(alpha = 0.2f))
                    .border(1.dp, RubyRed, RoundedCornerShape(6.dp))
                    .padding(horizontal = 8.dp, vertical = 3.dp)
            ) {
                Text("RESTRICTED ACCESS", color = RubyRed, fontSize = 9.sp, fontWeight = FontWeight.Black)
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Executive KPI Cards
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            KpiMiniCard("Candidates", "${candidates.size}", modifier = Modifier.weight(1f))
            KpiMiniCard("Clients", "${employers.size}", modifier = Modifier.weight(1f))
            KpiMiniCard("Vacancies", "${jobs.size}", modifier = Modifier.weight(1f))
            KpiMiniCard("Revenue", "₹${totalRevenue / 1000}k", modifier = Modifier.weight(1f))
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Tab Selector
        TabRow(
            selectedTabIndex = selectedAdminTab,
            containerColor = Navy900,
            contentColor = Gold400,
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(8.dp))
                .border(1.dp, Gold500.copy(alpha = 0.35f), RoundedCornerShape(8.dp))
        ) {
            Tab(selected = selectedAdminTab == 0, onClick = { selectedAdminTab = 0 }, text = { Text("Verifications", fontSize = 11.sp, fontWeight = FontWeight.Bold) })
            Tab(selected = selectedAdminTab == 1, onClick = { selectedAdminTab = 1 }, text = { Text("Ledger (${payments.size})", fontSize = 11.sp, fontWeight = FontWeight.Bold) })
            Tab(selected = selectedAdminTab == 2, onClick = { selectedAdminTab = 2 }, text = { Text("Audit Trail", fontSize = 11.sp, fontWeight = FontWeight.Bold) })
        }

        Spacer(modifier = Modifier.height(12.dp))

        when (selectedAdminTab) {
            0 -> VerificationQueueView(
                candidates = candidates,
                onApprove = { id -> viewModel.updateCandidateVerification(id, VerificationStatus.VERIFIED) }
            )
            1 -> PaymentsLedgerView(payments = payments)
            2 -> AuditLogsView(logs = auditLogs)
        }
    }
}

@Composable
private fun KpiMiniCard(title: String, value: String, modifier: Modifier = Modifier) {
    Card(
        shape = RoundedCornerShape(10.dp),
        colors = CardDefaults.cardColors(containerColor = Navy900),
        modifier = modifier.border(1.dp, Gold500.copy(alpha = 0.3f), RoundedCornerShape(10.dp))
    ) {
        Column(modifier = Modifier.padding(10.dp), horizontalAlignment = Alignment.CenterHorizontally) {
            Text(text = title, color = Slate400, fontSize = 9.sp)
            Text(text = value, color = Gold300, fontWeight = FontWeight.Black, fontSize = 16.sp)
        }
    }
}

@Composable
private fun VerificationQueueView(
    candidates: List<com.example.data.model.Candidate>,
    onApprove: (String) -> Unit
) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        item {
            Text("CANDIDATE VERIFICATION QUEUE", color = Gold400, fontSize = 11.sp, fontWeight = FontWeight.Bold)
        }

        items(candidates) { cand ->
            Card(
                shape = RoundedCornerShape(10.dp),
                colors = CardDefaults.cardColors(containerColor = Navy900),
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.dp, Slate700, RoundedCornerShape(10.dp))
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(12.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(text = cand.fullName, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                        Text(text = "${cand.id} • ${cand.currentLocation}", color = Slate400, fontSize = 11.sp)
                        Text(text = "Status: ${cand.verificationStatus.label}", color = if (cand.verificationStatus == VerificationStatus.VERIFIED) EmeraldSuccess else AmberPending, fontSize = 11.sp)
                    }

                    if (cand.verificationStatus != VerificationStatus.VERIFIED) {
                        Button(
                            onClick = { onApprove(cand.id) },
                            shape = RoundedCornerShape(6.dp),
                            colors = ButtonDefaults.buttonColors(containerColor = EmeraldSuccess, contentColor = Color.White),
                            contentPadding = PaddingValues(horizontal = 10.dp, vertical = 4.dp),
                            modifier = Modifier.height(32.dp)
                        ) {
                            Text("Approve", fontWeight = FontWeight.Bold, fontSize = 11.sp)
                        }
                    } else {
                        Icon(Icons.Default.CheckCircle, contentDescription = "Approved", tint = EmeraldSuccess, modifier = Modifier.size(22.dp))
                    }
                }
            }
        }
    }
}

@Composable
private fun PaymentsLedgerView(payments: List<com.example.data.model.PaymentTransaction>) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        items(payments) { p ->
            Card(
                shape = RoundedCornerShape(10.dp),
                colors = CardDefaults.cardColors(containerColor = Navy900),
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.dp, Gold500.copy(alpha = 0.3f), RoundedCornerShape(10.dp))
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(12.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(text = p.planName, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 12.sp)
                        Text(text = "${p.invoiceNumber} • ${p.date} • ${p.paymentMethod}", color = Slate400, fontSize = 10.sp)
                        Text(text = "Payer: ${p.userName} (${p.userId})", color = Slate300, fontSize = 11.sp)
                    }

                    Text(text = "₹${p.amount}", color = Gold300, fontWeight = FontWeight.Black, fontSize = 15.sp)
                }
            }
        }
    }
}

@Composable
private fun AuditLogsView(logs: List<com.example.data.model.AuditLog>) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        items(logs) { log ->
            Card(
                shape = RoundedCornerShape(8.dp),
                colors = CardDefaults.cardColors(containerColor = Navy900),
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.dp, Slate700, RoundedCornerShape(8.dp))
            ) {
                Column(modifier = Modifier.padding(10.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = log.action, color = Gold400, fontWeight = FontWeight.Bold, fontSize = 11.sp)
                        Text(text = log.timestamp, color = Slate400, fontSize = 9.sp)
                    }
                    Spacer(modifier = Modifier.height(2.dp))
                    Text(text = log.details, color = Slate300, fontSize = 11.sp)
                    Spacer(modifier = Modifier.height(2.dp))
                    Text(text = "Actor: ${log.actor} (${log.role}) • Target: ${log.targetId}", color = Slate400, fontSize = 9.sp)
                }
            }
        }
    }
}
