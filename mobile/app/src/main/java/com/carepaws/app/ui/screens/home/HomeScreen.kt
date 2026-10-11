package com.carepaws.app.ui.screens.home

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CalendarMonth
import androidx.compose.material.icons.filled.FolderShared
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material.icons.filled.Pets
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.ShoppingBag
import androidx.compose.material.icons.filled.SupportAgent
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.pulltorefresh.PullToRefreshBox
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.carepaws.app.data.model.Appointment
import com.carepaws.app.data.model.Pet
import com.carepaws.app.data.repository.CarePawsRepository
import com.carepaws.app.ui.components.CarePawsButton
import com.carepaws.app.ui.components.CarePawsCard
import com.carepaws.app.ui.components.CarePawsTextField
import com.carepaws.app.ui.components.ErrorState
import com.carepaws.app.ui.components.FullScreenLoading
import com.carepaws.app.ui.components.TabScaffold
import com.carepaws.app.ui.navigation.Routes
import com.carepaws.app.ui.theme.BrandOrange
import com.carepaws.app.ui.theme.Cream
import com.carepaws.app.ui.viewmodel.HomeViewModel

private data class QuickAction(val label: String, val icon: ImageVector, val route: String)

private val quickActions = listOf(
    QuickAction("AI Triage", Icons.Filled.SupportAgent, Routes.TRIAGE),
    QuickAction("Book Appointment", Icons.Filled.CalendarMonth, Routes.BOOKING),
    QuickAction("Pet Records", Icons.Filled.FolderShared, Routes.PETS),
    QuickAction("Shop Products", Icons.Filled.ShoppingBag, Routes.SHOP)
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    repository: CarePawsRepository,
    onNavigate: (String) -> Unit,
    onLogout: () -> Unit
) {
    val vm: HomeViewModel = viewModel { HomeViewModel(repository) }

    TabScaffold(
        title = "CarePaws",
        currentRoute = Routes.HOME,
        onNavigate = onNavigate,
        actions = {
            IconButton(onClick = { onNavigate(Routes.NOTIFICATIONS) }) {
                Icon(Icons.Filled.Notifications, contentDescription = "Notifications")
            }
        }
    ) {
        when {
            vm.isLoading -> FullScreenLoading()
            vm.error != null -> ErrorState(vm.error!!, onRetry = { vm.refresh() })
            else -> PullToRefreshBox(
                isRefreshing = false,
                onRefresh = { vm.refresh() }
            ) {
                LazyColumn(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    // Greeting
                    item {
                        Text(
                            "Good morning,",
                            style = MaterialTheme.typography.bodyLarge,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Text(
                            "How can we help your pet today?",
                            style = MaterialTheme.typography.headlineSmall
                        )
                    }

                    // Search (filters pets for now; backend search later)
                    item {
                        CarePawsTextField(
                            value = vm.query,
                            onValueChange = { vm.onQueryChange(it) },
                            label = "Search services, pets…",
                            trailingIcon = {
                                Icon(Icons.Filled.Search, contentDescription = null)
                            }
                        )
                    }

                    // Pet switcher
                    item {
                        LazyRow(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                            items(vm.pets) { pet ->
                                PetAvatarChip(
                                    pet = pet,
                                    selected = pet.id == vm.selectedPet?.id,
                                    onClick = { vm.selectPet(pet) }
                                )
                            }
                        }
                    }

                    // Quick actions grid (2x2, like the reference)
                    item {
                        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(12.dp)
                            ) {
                                QuickActionTile(quickActions[0], Modifier.weight(1f), onNavigate)
                                QuickActionTile(quickActions[1], Modifier.weight(1f), onNavigate)
                            }
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(12.dp)
                            ) {
                                QuickActionTile(quickActions[2], Modifier.weight(1f), onNavigate)
                                QuickActionTile(quickActions[3], Modifier.weight(1f), onNavigate)
                            }
                        }
                    }

                    // Upcoming appointment
                    item {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text("Upcoming appointment",
                                style = MaterialTheme.typography.titleMedium)
                            Text(
                                "View all",
                                color = BrandOrange,
                                style = MaterialTheme.typography.labelLarge,
                                modifier = Modifier.padding(4.dp)
                            )
                        }
                        Spacer(Modifier.height(8.dp))
                        val next = vm.upcoming.firstOrNull()
                        if (next == null) {
                            CarePawsCard {
                                Text("No upcoming visits.",
                                    style = MaterialTheme.typography.bodyMedium)
                                Spacer(Modifier.height(8.dp))
                                CarePawsButton("Book an appointment") {
                                    onNavigate(Routes.BOOKING)
                                }
                            }
                        } else {
                            AppointmentCard(next)
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun PetAvatarChip(pet: Pet, selected: Boolean, onClick: () -> Unit) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier.padding(4.dp)
    ) {
        Surface(
            shape = CircleShape,
            color = if (selected) MaterialTheme.colorScheme.primaryContainer
            else MaterialTheme.colorScheme.surfaceVariant,
            modifier = Modifier.size(60.dp),
            onClick = onClick
        ) {
            androidx.compose.foundation.layout.Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier.fillMaxSize()
            ) {
                Icon(
                    Icons.Filled.Pets, contentDescription = pet.name,
                    tint = if (selected) BrandOrange
                    else MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.size(28.dp)
                )
            }
        }
        Spacer(Modifier.height(4.dp))
        Text(pet.name, style = MaterialTheme.typography.labelLarge)
    }
}

@Composable
private fun QuickActionTile(
    action: QuickAction,
    modifier: Modifier = Modifier,
    onNavigate: (String) -> Unit
) {
    Card(
        onClick = { onNavigate(action.route) },
        modifier = modifier,
        shape = RoundedCornerShape(18.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Surface(
                shape = CircleShape,
                color = MaterialTheme.colorScheme.primaryContainer,
                modifier = Modifier.size(52.dp)
            ) {
                androidx.compose.foundation.layout.Box(
                    contentAlignment = Alignment.Center,
                    modifier = Modifier.fillMaxSize()
                ) {
                    Icon(action.icon, contentDescription = null,
                        tint = BrandOrange, modifier = Modifier.size(26.dp))
                }
            }
            Spacer(Modifier.height(8.dp))
            Text(action.label, style = MaterialTheme.typography.labelLarge)
        }
    }
}

@Composable
private fun AppointmentCard(appt: Appointment) {
    CarePawsCard {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Surface(
                shape = CircleShape,
                color = MaterialTheme.colorScheme.primaryContainer,
                modifier = Modifier.size(52.dp)
            ) {
                androidx.compose.foundation.layout.Box(
                    contentAlignment = Alignment.Center,
                    modifier = Modifier.fillMaxSize()
                ) {
                    Icon(Icons.Filled.Pets, contentDescription = null,
                        tint = BrandOrange, modifier = Modifier.size(26.dp))
                }
            }
            Spacer(Modifier.width(12.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(appt.type, style = MaterialTheme.typography.titleMedium)
                Text(
                    "${appt.date} · ${appt.time}",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Text(
                    appt.status.replaceFirstChar { it.uppercase() },
                    style = MaterialTheme.typography.labelLarge,
                    color = BrandOrange
                )
            }
        }
    }
}
