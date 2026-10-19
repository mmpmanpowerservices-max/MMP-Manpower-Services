package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Info
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.MmpViewModel
import com.example.ui.components.*
import com.example.ui.screens.*
import com.example.ui.theme.*

class MainActivity : ComponentActivity() {

    private val viewModel: MmpViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            MmpTheme {
                val selectedTab by viewModel.selectedTab.collectAsState()
                val jobDetail by viewModel.selectedJobDetail.collectAsState()
                val paymentConfig by viewModel.paymentConfig.collectAsState()
                val activeAssessment by viewModel.activeAssessment.collectAsState()
                val statusMessage by viewModel.statusBannerMessage.collectAsState()

                // BackHandler to return to home if on secondary tab
                BackHandler(enabled = selectedTab != 0) {
                    viewModel.selectTab(0)
                }

                Scaffold(
                    topBar = {
                        MmpTopBar(
                            selectedTab = selectedTab,
                            onTabSelected = { viewModel.selectTab(it) }
                        )
                    },
                    bottomBar = {
                        MmpBottomNav(
                            selectedTab = selectedTab,
                            onTabSelected = { viewModel.selectTab(it) }
                        )
                    },
                    containerColor = Navy950
                ) { innerPadding ->
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(innerPadding)
                    ) {
                        when (selectedTab) {
                            0 -> HomeScreen(
                                viewModel = viewModel,
                                onNavigate = { viewModel.selectTab(it) }
                            )
                            1 -> FindJobsScreen(
                                viewModel = viewModel
                            )
                            2 -> WorkforceDirectoryScreen(
                                viewModel = viewModel,
                                onRequestDeploy = { viewModel.selectTab(4) }
                            )
                            3 -> CandidatePortalScreen(
                                viewModel = viewModel,
                                onTakeAssessment = { viewModel.selectTab(5) }
                            )
                            4 -> EmployerPortalScreen(
                                viewModel = viewModel
                            )
                            5 -> ServicesAndShieldScreen(
                                viewModel = viewModel
                            )
                            6 -> AdminErpScreen(
                                viewModel = viewModel
                            )
                            else -> HomeScreen(
                                viewModel = viewModel,
                                onNavigate = { viewModel.selectTab(it) }
                            )
                        }

                        // Status notification banner
                        if (statusMessage != null) {
                            Box(
                                modifier = Modifier
                                    .align(Alignment.BottomCenter)
                                    .padding(16.dp)
                                    .clip(RoundedCornerShape(12.dp))
                                    .background(Navy900)
                                    .border(1.5.dp, Gold400, RoundedCornerShape(12.dp))
                                    .padding(horizontal = 16.dp, vertical = 12.dp)
                            ) {
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    modifier = Modifier.fillMaxWidth()
                                ) {
                                    Row(
                                        verticalAlignment = Alignment.CenterVertically,
                                        modifier = Modifier.weight(1f)
                                    ) {
                                        Icon(
                                            imageVector = Icons.Default.Info,
                                            contentDescription = null,
                                            tint = Gold400,
                                            modifier = Modifier.size(20.dp)
                                        )
                                        Spacer(modifier = Modifier.width(8.dp))
                                        Text(
                                            text = statusMessage ?: "",
                                            color = Color.White,
                                            fontSize = 12.sp,
                                            fontWeight = FontWeight.Medium
                                        )
                                    }

                                    TextButton(onClick = { viewModel.clearStatusBanner() }) {
                                        Text("Dismiss", color = Gold300, fontSize = 11.sp)
                                    }
                                }
                            }
                        }

                        // Dialogs
                        if (jobDetail != null) {
                            JobDetailDialog(
                                job = jobDetail!!,
                                onDismiss = { viewModel.openJobDetail(null) },
                                onApply = { notes ->
                                    viewModel.applyForJob(jobDetail!!.id, notes)
                                    viewModel.openJobDetail(null)
                                }
                            )
                        }

                        if (paymentConfig != null) {
                            PaymentDialog(
                                config = paymentConfig!!,
                                onDismiss = { viewModel.closePayment() },
                                onConfirmPayment = { method ->
                                    viewModel.processPayment(paymentConfig!!, method)
                                }
                            )
                        }

                        if (activeAssessment != null) {
                            SkillAssessmentDialog(
                                assessment = activeAssessment!!,
                                onDismiss = { viewModel.openAssessment(null) },
                                onCompleted = { score, correct, total ->
                                    viewModel.completeSkillAssessment(activeAssessment!!, score, correct, total)
                                }
                            )
                        }
                    }
                }
            }
        }
    }
}
