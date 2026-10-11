package com.carepaws.app.ui.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.carepaws.app.data.local.SessionManager
import com.carepaws.app.data.model.ApiResult
import com.carepaws.app.data.model.NotificationItem
import com.carepaws.app.data.model.Order
import com.carepaws.app.data.model.User
import com.carepaws.app.data.repository.AuthRepository
import com.carepaws.app.data.repository.CarePawsRepository
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch

class NotificationsViewModel(private val repository: CarePawsRepository) : ViewModel() {

    var notifications by mutableStateOf<List<NotificationItem>>(emptyList())
        private set
    var isLoading by mutableStateOf(true)
        private set

    init { refresh() }

    fun refresh() {
        isLoading = true
        viewModelScope.launch {
            (repository.getNotifications() as? ApiResult.Success)?.let {
                notifications = it.data
            }
            isLoading = false
        }
    }

    fun markRead(id: String) {
        viewModelScope.launch {
            repository.markNotificationRead(id)
            notifications = notifications.map {
                if (it.id == id) it.copy(read = true) else it
            }
        }
    }
}

class ProfileViewModel(
    private val authRepository: AuthRepository,
    private val repository: CarePawsRepository,
    private val sessionManager: SessionManager
) : ViewModel() {

    var user by mutableStateOf<User?>(null)
        private set
    var orders by mutableStateOf<List<Order>>(emptyList())
        private set
    var isLoading by mutableStateOf(true)
        private set

    // Settings toggles (persist to DataStore when backend prefs exist)
    var notificationsEnabled by mutableStateOf(true)
    var darkMode by mutableStateOf(false)

    init { refresh() }

    fun refresh() {
        isLoading = true
        viewModelScope.launch {
            user = sessionManager.sessionFlow.first().user
                ?: authRepository.currentUser()
            (repository.getMyOrders() as? ApiResult.Success)?.let {
                orders = it.data
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
}
