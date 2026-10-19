package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.*

data class NavItem(
    val title: String,
    val icon: ImageVector,
    val tabIndex: Int
)

@Composable
fun MmpBottomNav(
    selectedTab: Int,
    onTabSelected: (Int) -> Unit
) {
    val items = listOf(
        NavItem("Home", Icons.Default.Home, 0),
        NavItem("Jobs", Icons.Default.Work, 1),
        NavItem("Directory", Icons.Default.Groups, 2),
        NavItem("Candidate", Icons.Default.Person, 3),
        NavItem("Employer", Icons.Default.Business, 4),
        NavItem("Services", Icons.Default.VerifiedUser, 5)
    )

    NavigationBar(
        containerColor = Navy950,
        contentColor = Gold400,
        tonalElevation = 8.dp,
        modifier = Modifier
            .navigationBarsPadding()
            .border(width = 1.dp, color = Gold500.copy(alpha = 0.25f))
    ) {
        items.forEach { item ->
            val isSelected = selectedTab == item.tabIndex
            NavigationBarItem(
                selected = isSelected,
                onClick = { onTabSelected(item.tabIndex) },
                icon = {
                    Icon(
                        imageVector = item.icon,
                        contentDescription = item.title,
                        tint = if (isSelected) Gold400 else Slate400
                    )
                },
                label = {
                    Text(
                        text = item.title,
                        fontSize = 11.sp,
                        color = if (isSelected) Gold300 else Slate400
                    )
                },
                colors = NavigationBarItemDefaults.colors(
                    indicatorColor = Navy800,
                    selectedIconColor = Gold400,
                    selectedTextColor = Gold300,
                    unselectedIconColor = Slate400,
                    unselectedTextColor = Slate400
                )
            )
        }
    }
}
