package com.carepaws.app.ui.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.carepaws.app.data.model.ApiResult
import com.carepaws.app.data.model.Pet
import com.carepaws.app.data.repository.CarePawsRepository
import kotlinx.coroutines.launch

class BookingViewModel(private val repository: CarePawsRepository) : ViewModel() {

    var pets by mutableStateOf<List<Pet>>(emptyList())
        private set
    var selectedPetId by mutableStateOf<String?>(null)
    var visitType by mutableStateOf("General consultation")
    var date by mutableStateOf("")
    var time by mutableStateOf("")
    var notes by mutableStateOf("")
    var isLoading by mutableStateOf(false)
        private set
    var error by mutableStateOf<String?>(null)
        private set
    var booked by mutableStateOf(false)
        private set

    val visitTypes = listOf(
        "General consultation",
        "Vaccination",
        "Dental check",
        "Grooming",
        "Follow-up",
        "Emergency"
    )

    // Simplified slot matrix for v1 — the backend will expose real availability.
    val timeSlots = listOf(
        "9:00 AM", "10:00 AM", "11:00 AM",
        "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
    )

    init {
        viewModelScope.launch {
            (repository.getPets() as? ApiResult.Success)?.let {
                pets = it.data
                selectedPetId = it.data.firstOrNull()?.id
            }
        }
    }

    fun submit(onSuccess: () -> Unit) {
        val petId = selectedPetId
        if (petId.isNullOrBlank() || date.isBlank() || time.isBlank()) {
            error = "Please choose a pet, date, and time."
            return
        }
        isLoading = true
        error = null
        viewModelScope.launch {
            when (val r = repository.bookAppointment(petId, visitType, date, time, notes.ifBlank { null })) {
                is ApiResult.Success -> {
                    booked = true
                    onSuccess()
                }
                is ApiResult.Error -> error = r.message
                ApiResult.Loading -> Unit
            }
            isLoading = false
        }
    }
}
