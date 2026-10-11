package com.carepaws.app.ui.navigation

import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.carepaws.app.data.local.SessionManager
import com.carepaws.app.data.repository.AuthRepository
import com.carepaws.app.data.repository.CarePawsRepository
import com.carepaws.app.ui.screens.auth.LoginScreen
import com.carepaws.app.ui.screens.auth.RegisterScreen
import com.carepaws.app.ui.screens.booking.BookingScreen
import com.carepaws.app.ui.screens.home.HomeScreen
import com.carepaws.app.ui.screens.notifications.NotificationsScreen
import com.carepaws.app.ui.screens.onboarding.OnboardingScreen
import com.carepaws.app.ui.screens.onboarding.SplashScreen
import com.carepaws.app.ui.screens.pets.PetDetailScreen
import com.carepaws.app.ui.screens.pets.PetsScreen
import com.carepaws.app.ui.screens.profile.ProfileScreen
import com.carepaws.app.ui.screens.shop.ShopScreen
import com.carepaws.app.ui.screens.triage.TriageScreen

/** All destinations in the pet-owner app. */
object Routes {
    const val SPLASH = "splash"
    const val ONBOARDING = "onboarding"
    const val LOGIN = "login"
    const val REGISTER = "register"
    const val HOME = "home"
    const val PETS = "pets"
    const val PET_DETAIL = "pet_detail"
    const val BOOKING = "booking"
    const val TRIAGE = "triage"
    const val SHOP = "shop"
    const val NOTIFICATIONS = "notifications"
    const val PROFILE = "profile"

    fun petDetail(petId: String) = "$PET_DETAIL/$petId"
}

/** Bottom-tab destinations. */
val BottomTabs = listOf(Routes.HOME, Routes.PETS, Routes.TRIAGE, Routes.SHOP, Routes.PROFILE)

@Composable
fun CarePawsNavGraph(
    authRepository: AuthRepository,
    repository: CarePawsRepository,
    sessionManager: SessionManager
) {
    val navController = rememberNavController()
    val session by sessionManager.sessionFlow.collectAsState(initial = null)

    // Wait for the stored session before choosing the start destination.
    // (null = still loading; non-null = known logged-in/out state.)
    val startDestination = when {
        session == null -> Routes.SPLASH // replaced below once loaded
        session!!.isLoggedIn -> Routes.HOME
        else -> Routes.SPLASH
    }

    // Simple loading gate: hold the splash until DataStore answers.
    if (session == null) {
        com.carepaws.app.ui.components.FullScreenLoading()
        // Kick a re-read so we don't hang if the flow never emits.
        return
    }

    NavHost(navController = navController, startDestination = startDestination) {
        composable(Routes.SPLASH) {
            SplashScreen(onDone = {
                navController.navigate(Routes.ONBOARDING) {
                    popUpTo(Routes.SPLASH) { inclusive = true }
                }
            })
        }
        composable(Routes.ONBOARDING) {
            OnboardingScreen(onFinish = {
                navController.navigate(Routes.LOGIN) {
                    popUpTo(Routes.ONBOARDING) { inclusive = true }
                }
            })
        }
        composable(Routes.LOGIN) {
            LoginScreen(
                authRepository = authRepository,
                onLoginSuccess = {
                    navController.navigate(Routes.HOME) {
                        popUpTo(Routes.LOGIN) { inclusive = true }
                    }
                },
                onGoRegister = { navController.navigate(Routes.REGISTER) }
            )
        }
        composable(Routes.REGISTER) {
            RegisterScreen(
                authRepository = authRepository,
                onRegisterSuccess = {
                    navController.navigate(Routes.HOME) {
                        popUpTo(Routes.LOGIN) { inclusive = true }
                    }
                },
                onBack = { navController.popBackStack() }
            )
        }
        composable(Routes.HOME) {
            HomeScreen(
                repository = repository,
                onNavigate = { navController.navigate(it) },
                onLogout = {
                    navController.navigate(Routes.LOGIN) {
                        popUpTo(Routes.HOME) { inclusive = true }
                    }
                }
            )
        }
        composable(Routes.PETS) {
            PetsScreen(
                repository = repository,
                onPetClick = { navController.navigate(Routes.petDetail(it)) },
                onNavigate = { navController.navigate(it) }
            )
        }
        composable(
            route = "${Routes.PET_DETAIL}/{petId}",
            arguments = listOf(navArgument("petId") { type = NavType.StringType })
        ) { backStackEntry ->
            PetDetailScreen(
                petId = backStackEntry.arguments?.getString("petId").orEmpty(),
                repository = repository,
                onBack = { navController.popBackStack() }
            )
        }
        composable(Routes.BOOKING) {
            BookingScreen(
                repository = repository,
                onBack = { navController.popBackStack() },
                onBooked = {
                    navController.navigate(Routes.HOME) {
                        popUpTo(Routes.HOME) { inclusive = true }
                    }
                }
            )
        }
        composable(Routes.TRIAGE) {
            TriageScreen(
                repository = repository,
                onNavigate = { navController.navigate(it) }
            )
        }
        composable(Routes.SHOP) {
            ShopScreen(
                repository = repository,
                onNavigate = { navController.navigate(it) }
            )
        }
        composable(Routes.NOTIFICATIONS) {
            NotificationsScreen(
                repository = repository,
                onBack = { navController.popBackStack() }
            )
        }
        composable(Routes.PROFILE) {
            ProfileScreen(
                authRepository = authRepository,
                repository = repository,
                sessionManager = sessionManager,
                onLogout = {
                    navController.navigate(Routes.LOGIN) {
                        popUpTo(Routes.PROFILE) { inclusive = true }
                    }
                },
                onNavigate = { navController.navigate(it) }
            )
        }
    }
}
