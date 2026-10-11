package com.carepaws.app.ui.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.carepaws.app.data.model.ApiResult
import com.carepaws.app.data.model.Pet
import com.carepaws.app.data.model.TriageSubmission
import com.carepaws.app.data.repository.CarePawsRepository
import kotlinx.coroutines.launch

class TriageViewModel(private val repository: CarePawsRepository) : ViewModel() {

    var pets by mutableStateOf<List<Pet>>(emptyList())
        private set
    var selectedPetId by mutableStateOf<String?>(null)
    var symptoms by mutableStateOf("")
    var history by mutableStateOf<List<TriageSubmission>>(emptyList())
        private set
    var isLoading by mutableStateOf(true)
        private set
    var isSubmitting by mutableStateOf(false)
        private set
    var error by mutableStateOf<String?>(null)
        private set
    var justSubmitted by mutableStateOf<TriageSubmission?>(null)
        private set

    init { refresh() }

    fun refresh() {
        isLoading = true
        viewModelScope.launch {
            (repository.getPets() as? ApiResult.Success)?.let {
                pets = it.data
                if (selectedPetId == null) selectedPetId = it.data.firstOrNull()?.id
            }
            (repository.getTriageHistory() as? ApiResult.Success)?.let {
                history = it.data
            }
            isLoading = false
        }
    }

    fun submit() {
        val petId = selectedPetId
        if (petId.isNullOrBlank() || symptoms.isBlank()) {
            error = "Please choose a pet and describe the symptoms."
            return
        }
        isSubmitting = true
        error = null
        viewModelScope.launch {
            when (val r = repository.submitTriage(petId, symptoms.trim())) {
                is ApiResult.Success -> {
                    justSubmitted = r.data
                    symptoms = ""
                    refresh()
                }
                is ApiResult.Error -> error = r.message
                ApiResult.Loading -> Unit
            }
            isSubmitting = false
        }
    }

    fun dismissResult() { justSubmitted = null }
}
