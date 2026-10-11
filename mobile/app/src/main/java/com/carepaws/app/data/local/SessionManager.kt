package com.carepaws.app.data.local

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import com.carepaws.app.data.model.User
import com.google.gson.Gson
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

private val Context.dataStore: DataStore<Preferences> by preferencesDataStore("carepaws_session")

/**
 * Session storage — DataStore, never SharedPreferences, for auth tokens.
 */
class SessionManager(private val context: Context) {

    private val gson = Gson()

    val accessTokenFlow: Flow<String?> =
        context.dataStore.data.map { it[KEY_ACCESS_TOKEN] }

    val sessionFlow: Flow<SessionState> =
        context.dataStore.data.map { prefs ->
            val token = prefs[KEY_ACCESS_TOKEN]
            val userJson = prefs[KEY_USER]
            if (token.isNullOrBlank() || userJson.isNullOrBlank()) {
                SessionState(isLoggedIn = false, user = null)
            } else {
                SessionState(
                    isLoggedIn = true,
                    user = runCatching {
                        gson.fromJson(userJson, User::class.java)
                    }.getOrNull()
                )
            }
        }

    suspend fun saveSession(accessToken: String, refreshToken: String?, user: User) {
        context.dataStore.edit { prefs ->
            prefs[KEY_ACCESS_TOKEN] = accessToken
            if (!refreshToken.isNullOrBlank()) prefs[KEY_REFRESH_TOKEN] = refreshToken
            prefs[KEY_USER] = gson.toJson(user)
        }
    }

    suspend fun clearSession() {
        context.dataStore.edit { it.clear() }
    }

    data class SessionState(val isLoggedIn: Boolean, val user: User?)

    private companion object {
        val KEY_ACCESS_TOKEN = stringPreferencesKey("access_token")
        val KEY_REFRESH_TOKEN = stringPreferencesKey("refresh_token")
        val KEY_USER = stringPreferencesKey("user_json")
    }
}
