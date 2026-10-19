package com.example.ui.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val DarkColorScheme = darkColorScheme(
    primary = Gold400,
    onPrimary = Navy950,
    primaryContainer = Navy800,
    onPrimaryContainer = Gold300,
    secondary = Gold500,
    onSecondary = Navy950,
    background = Navy950,
    onBackground = Slate50,
    surface = Navy900,
    onSurface = Slate100,
    surfaceVariant = Navy800,
    onSurfaceVariant = Slate300,
    outline = Gold600
)

private val LightColorScheme = lightColorScheme(
    primary = Navy900,
    onPrimary = Slate50,
    primaryContainer = Slate100,
    onPrimaryContainer = Navy900,
    secondary = Gold600,
    onSecondary = Slate50,
    background = Slate50,
    onBackground = Navy900,
    surface = Slate50,
    onSurface = Navy900,
    surfaceVariant = Slate100,
    onSurfaceVariant = Slate700,
    outline = Slate300
)

@Composable
fun MmpTheme(
    darkTheme: Boolean = true, // MMP brand signature dark navy aesthetic by default
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = Navy950.toArgb()
            window.navigationBarColor = Navy950.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = !darkTheme
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}
