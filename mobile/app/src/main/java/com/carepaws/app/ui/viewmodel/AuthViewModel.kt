package com.carepaws.app.ui.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.carepaws.app.data.model.ApiResult
import com.carepaws.app.data.model.User
import com.carepaws.app.data.repository.AuthRepository
import kotlinx.coroutines.launch

class AuthViewModel(private val authRepository: AuthRepository) : ViewModel() {

    var isLoading by mutableStateOf(false)
        private set
    var error by mutableStateOf<String?>(null)
        private set

    fun login(email: String, password: String, onSuccess: (User) -> Unit) {
        if (email.isBlank() || password.isBlank()) {
            error = "Please enter your email and password."
            return
        }
        isLoading = true
        error = null
        viewModelScope.launch {
            when (val result = authRepository.login(email.trim(), password)) {
                is ApiResult.Success -> onSuccess(result.data)
                is ApiResult.Error -> error = result.message
                ApiResult.Loading -> Unit
            }
            isLoading = false
        }
    }

    fun register(
        name: String, email: String, password: String, phone: String,
        onSuccess: (User) -> Unit
    ) {
        if (name.isBlank() || email.isBlank() || password.length < 6) {
            error = "Please complete all fields (password: 6+ characters)."
            return
        }
        isLoading = true
        error = null
        viewModelScope.launch {
            when (val result = authRepository.register(
                name.trim(), email.trim(), password, phone.trim().ifBlank { null }
            )) {
                is ApiResult.Success -> onSuccess(result.data)
                is ApiResult.Error -> error = result.message
                ApiResult.Loading -> Unit
            }
            isLoading = false
        }
    }

    fun logout(onDone: () -> Unit) {
        viewModelScope.launch {
            authRepository.logout()
            onDone()
        }
    }

    fun clearError() { error = null }
}
