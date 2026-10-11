package com.carepaws.app.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext

private val LightColors = lightColorScheme(
    primary = BrandOrange,
    onPrimary = Cream,
    primaryContainer = BrandOrangeLight,
    onPrimaryContainer = Slate,
    secondary = Slate,
    onSecondary = Cream,
    background = Cream,
    onBackground = Ink,
    surface = CardLight,
    onSurface = Ink,
    surfaceVariant = CreamDark,
    onSurfaceVariant = InkMuted,
    error = Danger,
    onError = Cream
)

private val DarkColors = darkColorScheme(
    primary = BrandOrange,
    onPrimary = Slate,
    primaryContainer = SlateLight,
    onPrimaryContainer = Cream,
    secondary = BrandOrangeLight,
    onSecondary = Slate,
    background = SurfaceDark,
    onBackground = Cream,
    surface = CardDark,
    onSurface = Cream,
    surfaceVariant = SlateLight,
    onSurfaceVariant = CreamDark,
    error = Danger,
    onError = Cream
)

@Composable
fun CarePawsTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = false, // keep brand colors; no dynamic recolor
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColors
        else -> LightColors
    }
    MaterialTheme(
        colorScheme = colorScheme,
        typography = CarePawsTypography,
        content = content
    )
}
