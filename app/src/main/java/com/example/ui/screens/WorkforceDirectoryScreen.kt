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
import com.example.data.MmpRepository
import com.example.data.model.WorkforceRole
import com.example.data.model.WorkforceSector
import com.example.ui.MmpViewModel
import com.example.ui.theme.*

@Composable
fun WorkforceDirectoryScreen(
    viewModel: MmpViewModel,
    onRequestDeploy: () -> Unit
) {
    val sectors = MmpRepository.WORKFORCE_SECTORS
    var selectedSectorId by remember { mutableStateOf(sectors.first().id) }
    val activeSector = sectors.find { it.id == selectedSectorId } ?: sectors.first()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Navy950)
            .padding(16.dp)
    ) {
        // Header
        Text(
            text = "MMP WORKFORCE DIRECTORY",
            color = Gold300,
            fontSize = 17.sp,
            fontWeight = FontWeight.Black,
            letterSpacing = 1.sp
        )
        Text(
            text = "Verified blue-collar, technical & administrative manpower across Karnataka",
            color = Slate400,
            fontSize = 11.sp
        )

        Spacer(modifier = Modifier.height(14.dp))

        // Sector selector tabs
        ScrollableTabRow(
            selectedTabIndex = sectors.indexOfFirst { it.id == selectedSectorId }.coerceAtLeast(0),
            containerColor = Navy900,
            contentColor = Gold400,
            edgePadding = 0.dp,
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(10.dp))
                .border(1.dp, Gold500.copy(alpha = 0.35f), RoundedCornerShape(10.dp))
        ) {
            sectors.forEach { sector ->
                val isSelected = selectedSectorId == sector.id
                Tab(
                    selected = isSelected,
                    onClick = { selectedSectorId = sector.id },
                    text = {
                        Text(
                            text = sector.badge,
                            fontSize = 11.sp,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
                            color = if (isSelected) Gold300 else Slate400
                        )
                    }
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Sector summary box
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(12.dp))
                .background(Navy900)
                .border(1.dp, Gold500.copy(alpha = 0.3f), RoundedCornerShape(12.dp))
                .padding(14.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = activeSector.categoryName,
                        color = Color.White,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "${activeSector.roles.size} Specialized Operational Roles • 100% Background Checked",
                        color = EmeraldSuccess,
                        fontSize = 10.sp
                    )
                }

                Button(
                    onClick = onRequestDeploy,
                    shape = RoundedCornerShape(8.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = Gold400, contentColor = Navy950),
                    contentPadding = PaddingValues(horizontal = 10.dp, vertical = 6.dp)
                ) {
                    Text("Deploy Staff", fontWeight = FontWeight.Bold, fontSize = 11.sp)
                }
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Roles List
        LazyColumn(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            items(activeSector.roles) { role ->
                RoleCard(role = role)
            }
        }
    }
}

@Composable
private fun RoleCard(role: WorkforceRole) {
    Card(
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Navy900),
        modifier = Modifier
            .fillMaxWidth()
            .border(1.dp, Slate700, RoundedCornerShape(12.dp))
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = role.title,
                    color = Color.White,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold
                )

                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(6.dp))
                        .background(Navy800)
                        .padding(horizontal = 6.dp, vertical = 2.dp)
                ) {
                    Text(text = role.focus, color = Gold300, fontSize = 9.sp, fontWeight = FontWeight.SemiBold)
                }
            }

            Spacer(modifier = Modifier.height(2.dp))

            Text(
                text = role.subtext,
                color = Gold400,
                fontSize = 11.sp,
                fontWeight = FontWeight.Medium
            )

            Spacer(modifier = Modifier.height(6.dp))

            Text(
                text = role.description,
                color = Slate300,
                fontSize = 12.sp,
                lineHeight = 16.sp
            )
        }
    }
}
