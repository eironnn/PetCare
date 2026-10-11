package com.carepaws.app.ui.screens.onboarding

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CalendarMonth
import androidx.compose.material.icons.filled.FolderShared
import androidx.compose.material.icons.filled.Pets
import androidx.compose.material.icons.filled.SupportAgent
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.carepaws.app.ui.components.CarePawsButton
import com.carepaws.app.ui.theme.BrandOrange
import com.carepaws.app.ui.theme.Cream
import kotlinx.coroutines.launch

@Composable
fun SplashScreen(onDone: () -> Unit) {
    // Simple branded splash — navigates onward after first frame.
    // (For a timed splash, add a LaunchedEffect delay here.)
    Column(
        modifier = Modifier.fillMaxSize().padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Surface(
            shape = CircleShape,
            color = BrandOrange,
            modifier = Modifier.size(96.dp)
        ) {
            androidx.compose.foundation.layout.Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier.fillMaxSize()
            ) {
                Icon(
                    Icons.Filled.Pets, contentDescription = null,
                    tint = Cream, modifier = Modifier.size(48.dp)
                )
            }
        }
        Spacer(Modifier.height(20.dp))
        Text("CarePaws", style = MaterialTheme.typography.displaySmall)
        Text(
            "Healthy Pets, Happier Lives",
            style = MaterialTheme.typography.bodyLarge,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(Modifier.height(32.dp))
        CarePawsButton("Get started", onClick = onDone)
    }
}

private data class OnboardingPage(
    val icon: ImageVector,
    val title: String,
    val body: String,
    val bullets: List<Pair<ImageVector, String>> = emptyList()
)

private val pages = listOf(
    OnboardingPage(
        icon = Icons.Filled.Pets,
        title = "Quality Care\nfor Your Furry Friends",
        body = "Book appointments, consult trusted veterinarians, and keep your pet healthy — all in one app."
    ),
    OnboardingPage(
        icon = Icons.Filled.CalendarMonth,
        title = "Easy & Convenient\nPet Care",
        body = "Everything you need, one tap away.",
        bullets = listOf(
            Icons.Filled.CalendarMonth to "Book Appointments — choose your preferred time and doctor.",
            Icons.Filled.SupportAgent to "Consult a Vet — professional advice anytime.",
            Icons.Filled.FolderShared to "Track Health Records — your pet's medical history in one place."
        )
    ),
    OnboardingPage(
        icon = Icons.Filled.SupportAgent,
        title = "Smart Support\nwith AI Triage",
        body = "Get quick answers, health guidance, and symptom checks with our AI-powered triage assistant. Always reviewed by a real vet."
    )
)

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun OnboardingScreen(onFinish: () -> Unit) {
    val pagerState = rememberPagerState(pageCount = { pages.size })
    val scope = rememberCoroutineScope()

    Column(
        modifier = Modifier.fillMaxSize().padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.End
        ) {
            TextButton(onClick = onFinish) { Text("Skip", color = BrandOrange) }
        }

        HorizontalPager(
            state = pagerState,
            modifier = Modifier.weight(1f).fillMaxWidth()
        ) { index ->
            val page = pages[index]
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center,
                modifier = Modifier.fillMaxSize()
            ) {
                Surface(
                    shape = CircleShape,
                    color = MaterialTheme.colorScheme.primaryContainer,
                    modifier = Modifier.size(120.dp)
                ) {
                    androidx.compose.foundation.layout.Box(
                        contentAlignment = Alignment.Center,
                        modifier = Modifier.fillMaxSize()
                    ) {
                        Icon(
                            page.icon, contentDescription = null,
                            tint = BrandOrange, modifier = Modifier.size(56.dp)
                        )
                    }
                }
                Spacer(Modifier.height(24.dp))
                Text(
                    page.title,
                    style = MaterialTheme.typography.headlineSmall,
                    textAlign = TextAlign.Center
                )
                Spacer(Modifier.height(12.dp))
                Text(
                    page.body,
                    style = MaterialTheme.typography.bodyLarge,
                    textAlign = TextAlign.Center,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                page.bullets.forEach { (icon, text) ->
                    Spacer(Modifier.height(12.dp))
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(icon, contentDescription = null, tint = BrandOrange,
                            modifier = Modifier.size(28.dp))
                        androidx.compose.foundation.layout.Spacer(
                            Modifier.size(12.dp))
                        Text(text, style = MaterialTheme.typography.bodyMedium)
                    }
                }
            }
        }

        // Dots
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            repeat(pages.size) { i ->
                val selected = pagerState.currentPage == i
                androidx.compose.foundation.layout.Box(
                    modifier = Modifier
                        .size(if (selected) 24.dp else 8.dp, 8.dp)
                        .clip(CircleShape)
                        .background(
                            if (selected) BrandOrange
                            else MaterialTheme.colorScheme.surfaceVariant
                        )
                )
            }
        }
        Spacer(Modifier.height(24.dp))
        CarePawsButton(
            text = if (pagerState.currentPage == pages.lastIndex) "Get Started" else "Next",
            onClick = {
                if (pagerState.currentPage == pages.lastIndex) onFinish()
                else scope.launch {
                    pagerState.animateScrollToPage(pagerState.currentPage + 1)
                }
            }
        )
    }
}
