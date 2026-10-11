package com.carepaws.app.ui.screens.booking

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.AssistChip
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.carepaws.app.data.repository.CarePawsRepository
import com.carepaws.app.ui.components.CarePawsButton
import com.carepaws.app.ui.components.CarePawsCard
import com.carepaws.app.ui.components.CarePawsTextField
import com.carepaws.app.ui.theme.BrandOrange
import com.carepaws.app.ui.viewmodel.BookingViewModel

@OptIn(ExperimentalMaterial3Api::class, ExperimentalLayoutApi::class)
@Composable
fun BookingScreen(
    repository: CarePawsRepository,
    onBack: () -> Unit,
    onBooked: () -> Unit
) {
    val vm: BookingViewModel = viewModel { BookingViewModel(repository) }
    var typeExpanded by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Book a visit") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Filled.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .verticalScroll(rememberScrollState())
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            CarePawsCard {
                Text("Which pet?", style = MaterialTheme.typography.titleMedium)
                Spacer(Modifier.height(8.dp))
                FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    vm.pets.forEach { pet ->
                        AssistChip(
                            onClick = { vm.selectedPetId = pet.id },
                            label = { Text(pet.name) },
                            leadingIcon = null,
                            colors = androidx.compose.material3.AssistChipDefaults.assistChipColors(
                                containerColor = if (vm.selectedPetId == pet.id)
                                    MaterialTheme.colorScheme.primaryContainer
                                else MaterialTheme.colorScheme.surface
                            )
                        )
                    }
                }
            }

            CarePawsCard {
                Text("Visit type", style = MaterialTheme.typography.titleMedium)
                Spacer(Modifier.height(8.dp))
                ExposedDropdownMenuBox(
                    expanded = typeExpanded,
                    onExpandedChange = { typeExpanded = !typeExpanded }
                ) {
                    CarePawsTextField(
                        value = vm.visitType,
                        onValueChange = {},
                        label = "Visit type",
                        readOnly = true,
                        modifier = Modifier.menuAnchor(),
                        trailingIcon = {
                            ExposedDropdownMenuDefaults.TrailingIcon(expanded = typeExpanded)
                        }
                    )
                    ExposedDropdownMenu(
                        expanded = typeExpanded,
                        onDismissRequest = { typeExpanded = false }
                    ) {
                        vm.visitTypes.forEach { type ->
                            DropdownMenuItem(
                                text = { Text(type) },
                                onClick = {
                                    vm.visitType = type
                                    typeExpanded = false
                                }
                            )
                        }
                    }
                }
            }

            CarePawsCard {
                Text("Date", style = MaterialTheme.typography.titleMedium)
                Spacer(Modifier.height(8.dp))
                CarePawsTextField(
                    value = vm.date,
                    onValueChange = { vm.date = it },
                    label = "Date (e.g. 2026-10-20)"
                )
            }

            CarePawsCard {
                Text("Time slot", style = MaterialTheme.typography.titleMedium)
                Spacer(Modifier.height(8.dp))
                FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    vm.timeSlots.forEach { slot ->
                        AssistChip(
                            onClick = { vm.time = slot },
                            label = { Text(slot) },
                            colors = androidx.compose.material3.AssistChipDefaults.assistChipColors(
                                containerColor = if (vm.time == slot)
                                    MaterialTheme.colorScheme.primaryContainer
                                else MaterialTheme.colorScheme.surface
                            )
                        )
                    }
                }
            }

            CarePawsCard {
                Text("Notes for the vet (optional)",
                    style = MaterialTheme.typography.titleMedium)
                Spacer(Modifier.height(8.dp))
                CarePawsTextField(
                    value = vm.notes,
                    onValueChange = { vm.notes = it },
                    label = "Symptoms, concerns…",
                    singleLine = false
                )
            }

            vm.error?.let {
                Text(it, color = MaterialTheme.colorScheme.error)
            }

            if (vm.isLoading) {
                CircularProgressIndicator(
                    color = BrandOrange,
                    modifier = Modifier.align(Alignment.CenterHorizontally)
                )
            } else {
                CarePawsButton("Request appointment") { vm.submit(onBooked) }
            }
            Text(
                "The clinic confirms booking requests — you'll get a notification.",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}
