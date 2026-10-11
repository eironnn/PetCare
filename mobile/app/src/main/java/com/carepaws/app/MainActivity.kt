package com.carepaws.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.carepaws.app.ui.navigation.CarePawsNavGraph
import com.carepaws.app.ui.theme.CarePawsTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val app = application as CarePawsApp
        setContent {
            CarePawsTheme {
                CarePawsNavGraph(
                    authRepository = app.authRepository,
                    repository = app.repository,
                    sessionManager = app.sessionManager
                )
            }
        }
    }
}
