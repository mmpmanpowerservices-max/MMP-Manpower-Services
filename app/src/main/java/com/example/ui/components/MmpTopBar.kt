package com.example.ui.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
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
import com.example.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MmpTopBar(
    selectedTab: Int,
    onTabSelected: (Int) -> Unit
) {
    var showMenu by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(
                Brush.verticalGradient(
                    colors = listOf(Navy950, Navy900)
                )
            )
            .border(width = 1.dp, color = Gold500.copy(alpha = 0.35f))
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .statusBarsPadding()
                .padding(horizontal = 16.dp, vertical = 10.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            // Brand Logo & Title
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier
                    .clip(RoundedCornerShape(8.dp))
                    .clickable { onTabSelected(0) }
            ) {
                // Insignia icon container
                Box(
                    modifier = Modifier
                        .size(44.dp)
                        .clip(RoundedCornerShape(10.dp))
                        .background(
                            Brush.verticalGradient(
                                listOf(Navy800, Navy950)
                            )
                        )
                        .border(1.5.dp, Gold400, RoundedCornerShape(10.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Image(
                        painter = painterResource(id = R.drawable.ic_mmp_logo),
                        contentDescription = "MMP Official Insignia",
                        modifier = Modifier.size(38.dp)
                    )
                }

                Spacer(modifier = Modifier.width(10.dp))

                Column {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = "MMP",
                            color = Gold300,
                            fontWeight = FontWeight.Black,
                            fontSize = 17.sp,
                            letterSpacing = 1.sp
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(
                            text = "MAN",
                            color = Saffron400,
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 14.sp,
                            letterSpacing = 0.5.sp
                        )
                        Text(
                            text = "POWER",
                            color = EmeraldGreen,
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 14.sp,
                            letterSpacing = 0.5.sp
                        )
                    }
                    Text(
                        text = "YOUR WORKFORCE. OUR STRENGTH. YOUR SUCCESS.",
                        color = Gold300.copy(alpha = 0.9f),
                        fontSize = 8.5.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 0.5.sp
                    )
                }
            }

            // Quick Portal Selector Menu
            Box {
                Button(
                    onClick = { showMenu = true },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Navy800,
                        contentColor = Gold300
                    ),
                    shape = RoundedCornerShape(20.dp),
                    contentPadding = PaddingValues(horizontal = 12.dp, vertical = 6.dp),
                    modifier = Modifier
                        .height(36.dp)
                        .border(1.dp, Gold500.copy(alpha = 0.5f), RoundedCornerShape(20.dp))
                ) {
                    Icon(
                        imageVector = Icons.Default.GridView,
                        contentDescription = "Portals",
                        modifier = Modifier.size(16.dp),
                        tint = Gold400
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "Portals",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = Gold300
                    )
                }

                DropdownMenu(
                    expanded = showMenu,
                    onDismissRequest = { showMenu = false },
                    modifier = Modifier
                        .background(Navy900)
                        .border(1.dp, Gold500.copy(alpha = 0.4f), RoundedCornerShape(8.dp))
                ) {
                    DropdownMenuItem(
                        text = { Text("🏛️ Home & Highlights", color = Color.White) },
                        onClick = { onTabSelected(0); showMenu = false }
                    )
                    DropdownMenuItem(
                        text = { Text("💼 Find Jobs (Portal)", color = Color.White) },
                        onClick = { onTabSelected(1); showMenu = false }
                    )
                    DropdownMenuItem(
                        text = { Text("👥 Workforce Directory", color = Color.White) },
                        onClick = { onTabSelected(2); showMenu = false }
                    )
                    DropdownMenuItem(
                        text = { Text("🎓 Candidate Desk & ID", color = Color.White) },
                        onClick = { onTabSelected(3); showMenu = false }
                    )
                    DropdownMenuItem(
                        text = { Text("🏢 Employer & Post Vacancy", color = Color.White) },
                        onClick = { onTabSelected(4); showMenu = false }
                    )
                    DropdownMenuItem(
                        text = { Text("🛡️ MMP SHIELD™ & Services", color = Gold400) },
                        onClick = { onTabSelected(5); showMenu = false }
                    )
                    DropdownMenuItem(
                        text = { Text("⚙️ Admin ERP Desk", color = AmberPending) },
                        onClick = { onTabSelected(6); showMenu = false }
                    )
                }
            }
        }
    }
}
