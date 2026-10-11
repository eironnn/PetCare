package com.carepaws.app.data.repository

import com.carepaws.app.data.local.SessionManager
import com.carepaws.app.data.model.ApiResult
import com.carepaws.app.data.model.LoginRequest
import com.carepaws.app.data.model.RegisterRequest
import com.carepaws.app.data.model.User
import com.carepaws.app.data.remote.ApiService

/**
 * Auth: login / register / logout against NestJS, persisting the JWT session.
 */
class AuthRepository(
    private val api: ApiService,
    private val sessionManager: SessionManager
) {
    suspend fun login(email: String, password: String): ApiResult<User> =
        runCatching {
            val session = api.login(LoginRequest(email, password))
            sessionManager.saveSession(session.accessToken, session.refreshToken, session.user)
            session.user
        }.toResult()

    suspend fun register(
        name: String,
        email: String,
        password: String,
        phone: String?
    ): ApiResult<User> =
        runCatching {
            val session = api.register(RegisterRequest(name, email, password, phone))
            sessionManager.saveSession(session.accessToken, session.refreshToken, session.user)
            session.user
        }.toResult()

    suspend fun logout() {
        sessionManager.clearSession()
    }

    suspend fun currentUser(): User? =
        runCatching { api.me() }.getOrNull()
}

internal fun <T> Result<T>.toResult(): ApiResult<T> =
    fold(
        onSuccess = { ApiResult.Success(it) },
        onFailure = { ApiResult.Error(it.message ?: "Request failed") }
    )
