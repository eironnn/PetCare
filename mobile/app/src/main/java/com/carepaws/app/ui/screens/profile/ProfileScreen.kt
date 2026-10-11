package com.carepaws.app.ui.screens.profile

import androidx.compose.foundation.clickable
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
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ChevronRight
import androidx.compose.material.icons.filled.DarkMode
import androidx.compose.material.icons.filled.HelpOutline
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Language
import androidx.compose.material.icons.filled.Logout
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Pets
import androidx.compose.material.icons.filled.Receipt
import androidx.compose.material.icons.filled.Security
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Switch
import androidx.compose.material3.SwitchDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.carepaws.app.data.local.SessionManager
import com.carepaws.app.data.model.Order
import com.carepaws.app.data.repository.AuthRepository
import com.carepaws.app.data.repository.CarePawsRepository
import com.carepaws.app.ui.components.CarePawsCard
import com.carepaws.app.ui.components.FullScreenLoading
import com.carepaws.app.ui.components.TabScaffold
import com.carepaws.app.ui.navigation.Routes
import com.carepaws.app.ui.theme.BrandOrange
import com.carepaws.app.ui.viewmodel.ProfileViewModel
import java.text.NumberFormat
import java.util.Locale

@Composable
fun ProfileScreen(
    authRepository: AuthRepository,
    repository: CarePawsRepository,
    sessionManager: SessionManager,
    onLogout: () -> Unit,
    onNavigate: (String) -> Unit
) {
    val vm: ProfileViewModel = viewModel {
        ProfileViewModel(authRepository, repository, sessionManager)
    }
    var showLogoutConfirm by remember { mutableStateOf(false) }

    TabScaffold(
        title = "Profile",
        currentRoute = Routes.PROFILE,
        onNavigate = onNavigate
    ) {
        if (vm.isLoading) {
            FullScreenLoading()
        } else {
            LazyColumn(
                modifier = Modifier.fillMaxSize().padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                item {
                    CarePawsCard {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Surface(
                                shape = CircleShape,
                                color = MaterialTheme.colorScheme.primaryContainer,
                                modifier = Modifier.size(64.dp)
                            ) {
                                androidx.compose.foundation.layout.Box(
                                    contentAlignment = Alignment.Center,
                                    modifier = Modifier.fillMaxSize()
                                ) {
                                    Icon(Icons.Filled.Person, contentDescription = null,
                                        tint = BrandOrange, modifier = Modifier.size(32.dp))
                                }
                            }
                            Spacer(Modifier.width(16.dp))
                            Column {
                                Text(vm.user?.name ?: "Pet Owner",
                                    style = MaterialTheme.typography.titleLarge)
                                Text(vm.user?.email ?: "",
                                    style = MaterialTheme.typography.bodyMedium,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant)
                            }
                        }
                    }
                }

                item {
                    Text("My pets", style = MaterialTheme.typography.titleMedium)
                    Spacer(Modifier.height(8.dp))
                    SettingRow(Icons.Filled.Pets, "Manage pets",
                        "View and update your pet profiles") {
                        onNavigate(Routes.PETS)
                    }
                }

                if (vm.orders.isNotEmpty()) {
                    item {
                        Text("My orders", style = MaterialTheme.typography.titleMedium)
                        Spacer(Modifier.height(8.dp))
                    }
                    items(vm.orders) { order -> OrderRow(order) }
                }

                item {
                    Text("Settings", style = MaterialTheme.typography.titleMedium)
                    Spacer(Modifier.height(8.dp))
                    CarePawsCard {
                        SettingToggle(
                            Icons.Filled.Notifications, "Notifications",
                            "Appointment reminders, updates",
                            checked = vm.notificationsEnabled,
                            onCheckedChange = { vm.notificationsEnabled = it }
                        )
                        SettingToggle(
                            Icons.Filled.DarkMode, "Dark theme",
                            "Light / Dark",
                            checked = vm.darkMode,
                            onCheckedChange = { vm.darkMode = it }
                        )
                        SettingRow(Icons.Filled.Language, "Language", "English") {}
                        SettingRow(Icons.Filled.Security, "Privacy & Security",
                            "Data and account settings") {}
                        SettingRow(Icons.Filled.HelpOutline, "Help & Support",
                            "FAQs and contact") {}
                        SettingRow(Icons.Filled.Info, "About CarePaws",
                            "Version 1.0") {}
                    }
                }

                item {
                    Text(
                        "Log out",
                        color = MaterialTheme.colorScheme.error,
                        style = MaterialTheme.typography.titleMedium,
                        modifier = Modifier
                            .clickable { showLogoutConfirm = true }
                            .padding(vertical = 8.dp)
                    )
                }
            }
        }
    }

    if (showLogoutConfirm) {
        AlertDialog(
            onDismissRequest = { showLogoutConfirm = false },
            title = { Text("Log out?") },
            text = { Text("You'll need to sign in again to manage your pets.") },
            confirmButton = {
                TextButton(onClick = {
                    showLogoutConfirm = false
                    vm.logout(onLogout)
                }) { Text("Log out", color = MaterialTheme.colorScheme.error) }
            },
            dismissButton = {
                TextButton(onClick = { showLogoutConfirm = false }) { Text("Cancel") }
            }
        )
    }
}

@Composable
private fun SettingRow(
    icon: ImageVector,
    title: String,
    subtitle: String,
    onClick: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(vertical = 12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(icon, contentDescription = null, tint = BrandOrange,
            modifier = Modifier.size(24.dp))
        Spacer(Modifier.width(16.dp))
        Column(modifier = Modifier.weight(1f)) {
            Text(title, style = MaterialTheme.typography.titleMedium)
            Text(subtitle, style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
        Icon(Icons.Filled.ChevronRight, contentDescription = null,
            tint = MaterialTheme.colorScheme.onSurfaceVariant)
    }
}

@Composable
private fun SettingToggle(
    icon: ImageVector,
    title: String,
    subtitle: String,
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(icon, contentDescription = null, tint = BrandOrange,
            modifier = Modifier.size(24.dp))
        Spacer(Modifier.width(16.dp))
        Column(modifier = Modifier.weight(1f)) {
            Text(title, style = MaterialTheme.typography.titleMedium)
            Text(subtitle, style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
        Switch(
            checked = checked,
            onCheckedChange = onCheckedChange,
            colors = SwitchDefaults.colors(checkedThumbColor = BrandOrange)
        )
    }
}

@Composable
private fun OrderRow(order: Order) {
    CarePawsCard {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(Icons.Filled.Receipt, contentDescription = null, tint = BrandOrange)
            Spacer(Modifier.width(12.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text("Order ${order.id}", style = MaterialTheme.typography.titleMedium)
                Text(
                    "${order.items.sumOf { it.quantity }} items · ${order.createdAt}",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            Text(
                "₱" + NumberFormat.getNumberInstance(Locale.US)
                    .format(order.total.toInt()),
                style = MaterialTheme.typography.titleMedium,
                color = BrandOrange
            )
        }
    }
}
