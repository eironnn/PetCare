package com.carepaws.app.ui.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.carepaws.app.data.model.ApiResult
import com.carepaws.app.data.model.Appointment
import com.carepaws.app.data.model.Pet
import com.carepaws.app.data.repository.CarePawsRepository
import kotlinx.coroutines.launch

class HomeViewModel(private val repository: CarePawsRepository) : ViewModel() {

    var pets by mutableStateOf<List<Pet>>(emptyList())
        private set
    var upcoming by mutableStateOf<List<Appointment>>(emptyList())
        private set
    var selectedPet by mutableStateOf<Pet?>(null)
        private set
    var query by mutableStateOf("")
        private set
    var isLoading by mutableStateOf(true)
        private set
    var error by mutableStateOf<String?>(null)
        private set

    init { refresh() }

    fun refresh() {
        isLoading = true
        error = null
        viewModelScope.launch {
            when (val r = repository.getPets()) {
                is ApiResult.Success -> {
                    pets = r.data
                    if (selectedPet == null) selectedPet = r.data.firstOrNull()
                }
                is ApiResult.Error -> error = r.message
                ApiResult.Loading -> Unit
            }
            when (val r = repository.getAppointments()) {
                is ApiResult.Success ->
                    upcoming = r.data.filter { it.status == "pending" || it.status == "confirmed" }
                is ApiResult.Error -> if (error == null) error = r.message
                ApiResult.Loading -> Unit
            }
            isLoading = false
        }
    }

    fun selectPet(pet: Pet) { selectedPet = pet }

    fun onQueryChange(q: String) { query = q }
}
