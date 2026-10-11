package com.carepaws.app.ui.screens.auth

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Pets
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.carepaws.app.data.repository.AuthRepository
import com.carepaws.app.ui.components.CarePawsButton
import com.carepaws.app.ui.components.CarePawsCard
import com.carepaws.app.ui.components.CarePawsTextField
import com.carepaws.app.ui.theme.BrandOrange
import com.carepaws.app.ui.viewmodel.AuthViewModel

@Composable
fun LoginScreen(
    authRepository: AuthRepository,
    onLoginSuccess: () -> Unit,
    onGoRegister: () -> Unit
) {
    val vm: AuthViewModel = viewModel { AuthViewModel(authRepository) }
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var showPassword by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Icon(
            Icons.Filled.Pets, contentDescription = null,
            tint = BrandOrange, modifier = Modifier.size(64.dp)
        )
        Spacer(Modifier.height(12.dp))
        Text("CarePaws", style = MaterialTheme.typography.displaySmall)
        Text(
            "Pet owner sign in",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(Modifier.height(24.dp))

        CarePawsCard {
            CarePawsTextField(value = email, onValueChange = { email = it }, label = "Email")
            Spacer(Modifier.height(12.dp))
            CarePawsTextField(
                value = password,
                onValueChange = { password = it },
                label = "Password",
                visualTransformation = if (showPassword) VisualTransformation.None
                else PasswordVisualTransformation(),
                trailingIcon = {
                    IconButton(onClick = { showPassword = !showPassword }) {
                        Icon(
                            if (showPassword) Icons.Filled.VisibilityOff else Icons.Filled.Visibility,
                            contentDescription = if (showPassword) "Hide password" else "Show password"
                        )
                    }
                }
            )
            Spacer(Modifier.height(8.dp))
            vm.error?.let {
                Text(it, color = MaterialTheme.colorScheme.error,
                    style = MaterialTheme.typography.bodyMedium)
                Spacer(Modifier.height(8.dp))
            }
            if (vm.isLoading) {
                CircularProgressIndicator(
                    color = BrandOrange,
                    modifier = Modifier.align(Alignment.CenterHorizontally)
                )
            } else {
                CarePawsButton(
                    text = "Sign in",
                    onClick = { vm.login(email, password) { onLoginSuccess() } }
                )
            }
        }
        Spacer(Modifier.height(12.dp))
        TextButton(onClick = onGoRegister) {
            Text("New here? Create an account", color = BrandOrange)
        }
    }
}

@Composable
fun RegisterScreen(
    authRepository: AuthRepository,
    onRegisterSuccess: () -> Unit,
    onBack: () -> Unit
) {
    val vm: AuthViewModel = viewModel { AuthViewModel(authRepository) }
    var name by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var phone by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(24.dp),
        verticalArrangement = Arrangement.Center
    ) {
        Text("Create account", style = MaterialTheme.typography.displaySmall)
        Text(
            "Join CarePaws to manage your pets",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(Modifier.height(24.dp))
        CarePawsCard {
            CarePawsTextField(value = name, onValueChange = { name = it }, label = "Full name")
            Spacer(Modifier.height(12.dp))
            CarePawsTextField(value = email, onValueChange = { email = it }, label = "Email")
            Spacer(Modifier.height(12.dp))
            CarePawsTextField(value = phone, onValueChange = { phone = it }, label = "Phone (optional)")
            Spacer(Modifier.height(12.dp))
            CarePawsTextField(
                value = password, onValueChange = { password = it },
                label = "Password (6+ characters)",
                visualTransformation = PasswordVisualTransformation()
            )
            Spacer(Modifier.height(8.dp))
            vm.error?.let {
                Text(it, color = MaterialTheme.colorScheme.error,
                    style = MaterialTheme.typography.bodyMedium)
                Spacer(Modifier.height(8.dp))
            }
            if (vm.isLoading) {
                CircularProgressIndicator(color = BrandOrange,
                    modifier = Modifier.align(Alignment.CenterHorizontally))
            } else {
                CarePawsButton(
                    text = "Create account",
                    onClick = { vm.register(name, email, password, phone) { onRegisterSuccess() } }
                )
            }
        }
        Spacer(Modifier.height(12.dp))
        TextButton(onClick = onBack, modifier = Modifier.align(Alignment.CenterHorizontally)) {
            Text("Back to sign in", color = BrandOrange)
        }
    }
}
