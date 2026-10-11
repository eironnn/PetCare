package com.carepaws.app.ui.screens.pets

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.MedicalServices
import androidx.compose.material.icons.filled.Pets
import androidx.compose.material.icons.filled.Vaccines
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.carepaws.app.data.model.HealthFlag
import com.carepaws.app.data.model.MedicalRecord
import com.carepaws.app.data.model.Pet
import com.carepaws.app.data.model.Vaccination
import com.carepaws.app.data.repository.CarePawsRepository
import com.carepaws.app.ui.components.CarePawsCard
import com.carepaws.app.ui.components.CarePawsTextField
import com.carepaws.app.ui.components.FullScreenLoading
import com.carepaws.app.ui.components.TabScaffold
import com.carepaws.app.ui.navigation.Routes
import com.carepaws.app.ui.theme.BrandOrange
import com.carepaws.app.ui.theme.Danger
import com.carepaws.app.ui.viewmodel.PetDetailViewModel
import com.carepaws.app.ui.viewmodel.PetsViewModel

@Composable
fun PetsScreen(
    repository: CarePawsRepository,
    onPetClick: (String) -> Unit,
    onNavigate: (String) -> Unit
) {
    val vm: PetsViewModel = viewModel { PetsViewModel(repository) }

    TabScaffold(
        title = "My pets",
        currentRoute = Routes.PETS,
        onNavigate = onNavigate
    ) {
        Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
            CarePawsTextField(
                value = vm.query,
                onValueChange = { vm.onQueryChange(it) },
                label = "Search pets"
            )
            Spacer(Modifier.height(12.dp))
            if (vm.isLoading) {
                FullScreenLoading()
            } else {
                LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    items(vm.filtered) { pet ->
                        PetRow(pet = pet, onClick = { onPetClick(pet.id) })
                    }
                }
            }
        }
    }
}

@Composable
private fun PetRow(pet: Pet, onClick: () -> Unit) {
    CarePawsCard(modifier = Modifier.clickable(onClick = onClick)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(Icons.Filled.Pets, contentDescription = null, tint = BrandOrange)
            Spacer(Modifier.width(12.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(pet.name, style = MaterialTheme.typography.titleMedium)
                Text(
                    "${pet.species} · ${pet.breed}",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            pet.age?.let {
                Text(it, style = MaterialTheme.typography.labelLarge)
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PetDetailScreen(
    petId: String,
    repository: CarePawsRepository,
    onBack: () -> Unit
) {
    val vm: PetDetailViewModel = viewModel { PetDetailViewModel(repository, petId) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(vm.pet?.name ?: "Pet") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Filled.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        }
    ) { padding ->
        if (vm.isLoading) {
            FullScreenLoading()
        } else {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(padding)
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                vm.pet?.let { pet ->
                    item {
                        CarePawsCard {
                            Text(pet.name, style = MaterialTheme.typography.headlineSmall)
                            Text(
                                "${pet.species} · ${pet.breed}",
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                            Spacer(Modifier.height(8.dp))
                            Text(
                                listOfNotNull(
                                    pet.age?.let { "Age: $it" },
                                    pet.sex?.let { "Sex: $it" },
                                    pet.weightKg?.let { "Weight: $it kg" }
                                ).joinToString("   "),
                                style = MaterialTheme.typography.bodyMedium
                            )
                        }
                    }
                }

                if (vm.healthFlags.isNotEmpty()) {
                    item {
                        Text("Health flags", style = MaterialTheme.typography.titleMedium)
                        Spacer(Modifier.height(8.dp))
                    }
                    items(vm.healthFlags) { flag -> HealthFlagRow(flag) }
                }

                item {
                    Text("Medical history", style = MaterialTheme.typography.titleMedium)
                    Spacer(Modifier.height(8.dp))
                }
                if (vm.records.isEmpty()) {
                    item { Text("No records yet.", style = MaterialTheme.typography.bodyMedium) }
                } else {
                    items(vm.records) { record -> RecordRow(record) }
                }

                item {
                    Text("Vaccinations", style = MaterialTheme.typography.titleMedium)
                    Spacer(Modifier.height(8.dp))
                }
                if (vm.vaccinations.isEmpty()) {
                    item { Text("No vaccinations recorded.", style = MaterialTheme.typography.bodyMedium) }
                } else {
                    items(vm.vaccinations) { vax -> VaccinationRow(vax) }
                }
            }
        }
    }
}

@Composable
private fun HealthFlagRow(flag: HealthFlag) {
    CarePawsCard {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(Icons.Filled.Warning, contentDescription = null, tint = Danger)
            Spacer(Modifier.width(12.dp))
            Column {
                Text(flag.flag, style = MaterialTheme.typography.titleMedium)
                flag.detail?.let {
                    Text(it, style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }
    }
}

@Composable
private fun RecordRow(record: MedicalRecord) {
    CarePawsCard {
        Row {
            Icon(Icons.Filled.MedicalServices, contentDescription = null, tint = BrandOrange)
            Spacer(Modifier.width(12.dp))
            Column {
                Text(record.diagnosis, style = MaterialTheme.typography.titleMedium)
                Text("Treatment: ${record.treatment}",
                    style = MaterialTheme.typography.bodyMedium)
                Spacer(Modifier.height(4.dp))
                Text("${record.date} · ${record.vet}",
                    style = MaterialTheme.typography.labelLarge,
                    color = MaterialTheme.colorScheme.onSurfaceVariant)
                record.followUp?.let {
                    Text("Follow-up: $it",
                        style = MaterialTheme.typography.bodyMedium, color = BrandOrange)
                }
            }
        }
        record.notes?.let {
            Spacer(Modifier.height(8.dp))
            HorizontalDivider()
            Spacer(Modifier.height(8.dp))
            Text(it, style = MaterialTheme.typography.bodyMedium)
        }
    }
}

@Composable
private fun VaccinationRow(vax: Vaccination) {
    CarePawsCard {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(Icons.Filled.Vaccines, contentDescription = null, tint = BrandOrange)
            Spacer(Modifier.width(12.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(vax.vaccine, style = MaterialTheme.typography.titleMedium)
                Text("Given ${vax.dateGiven} · ${vax.vet}",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
            vax.nextDue?.let {
                Text("Due $it", style = MaterialTheme.typography.labelLarge, color = BrandOrange)
            }
        }
    }
}
