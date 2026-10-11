package com.carepaws.app.ui.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.carepaws.app.data.model.ApiResult
import com.carepaws.app.data.model.HealthFlag
import com.carepaws.app.data.model.MedicalRecord
import com.carepaws.app.data.model.Pet
import com.carepaws.app.data.model.Vaccination
import com.carepaws.app.data.repository.CarePawsRepository
import kotlinx.coroutines.launch

class PetsViewModel(private val repository: CarePawsRepository) : ViewModel() {

    var pets by mutableStateOf<List<Pet>>(emptyList())
        private set
    var query by mutableStateOf("")
        private set
    var isLoading by mutableStateOf(true)
        private set

    init { refresh() }

    fun refresh() {
        isLoading = true
        viewModelScope.launch {
            when (val r = repository.getPets()) {
                is ApiResult.Success -> pets = r.data
                else -> Unit
            }
            isLoading = false
        }
    }

    fun onQueryChange(q: String) { query = q }

    val filtered: List<Pet>
        get() = if (query.isBlank()) pets
        else pets.filter {
            it.name.contains(query, ignoreCase = true) ||
                it.breed.contains(query, ignoreCase = true)
        }
}

class PetDetailViewModel(
    private val repository: CarePawsRepository,
    private val petId: String
) : ViewModel() {

    var pet by mutableStateOf<Pet?>(null)
        private set
    var records by mutableStateOf<List<MedicalRecord>>(emptyList())
        private set
    var vaccinations by mutableStateOf<List<Vaccination>>(emptyList())
        private set
    var healthFlags by mutableStateOf<List<HealthFlag>>(emptyList())
        private set
    var isLoading by mutableStateOf(true)
        private set

    init { refresh() }

    fun refresh() {
        isLoading = true
        viewModelScope.launch {
            (repository.getPet(petId) as? ApiResult.Success)?.let { pet = it.data }
            (repository.getMedicalRecords(petId) as? ApiResult.Success)?.let { records = it.data }
            (repository.getVaccinations(petId) as? ApiResult.Success)?.let { vaccinations = it.data }
            (repository.getHealthFlags(petId) as? ApiResult.Success)?.let { healthFlags = it.data }
            isLoading = false
        }
    }
}
