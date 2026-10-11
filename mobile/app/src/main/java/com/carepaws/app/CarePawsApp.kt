package com.carepaws.app

import android.app.Application
import com.carepaws.app.data.local.SessionManager
import com.carepaws.app.data.remote.NetworkModule
import com.carepaws.app.data.repository.AuthRepository
import com.carepaws.app.data.repository.CarePawsRepository

/**
 * Application class — owns the singleton graph (no DI framework for v1;
 * keep it simple so the team can follow every wiring by reading this file).
 */
class CarePawsApp : Application() {

    lateinit var sessionManager: SessionManager
        private set

    lateinit var authRepository: AuthRepository
        private set

    lateinit var repository: CarePawsRepository
        private set

    override fun onCreate() {
        super.onCreate()
        sessionManager = SessionManager(applicationContext)
        val api = NetworkModule.createApi(sessionManager)
        authRepository = AuthRepository(api, sessionManager)
        repository = CarePawsRepository(api)
    }
}
