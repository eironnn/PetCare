package com.carepaws.app.data.model

/**
 * Data models — mirror the NestJS /api/v1 response shapes
 * (see web frontend src/types/index.ts and the 16-table ERD).
 */

data class User(
    val id: String,
    val name: String,
    val email: String,
    val phone: String? = null,
    val role: String,
    val roleLabel: String,
    val status: String = "active"
)

data class AuthSession(
    val user: User,
    val accessToken: String,
    val refreshToken: String? = null
)

data class LoginRequest(val email: String, val password: String)
data class RegisterRequest(
    val name: String,
    val email: String,
    val password: String,
    val phone: String? = null
)

data class Pet(
    val id: String,
    val name: String,
    val species: String,
    val breed: String,
    val age: String? = null,
    val sex: String? = null,
    val weightKg: Double? = null,
    val ownerName: String? = null,
    val photoUrl: String? = null
)

data class Appointment(
    val id: String,
    val pet: String,
    val breed: String? = null,
    val owner: String? = null,
    val type: String,
    val date: String,
    val time: String,
    val vet: String? = null,
    val status: String, // pending | confirmed | completed | cancelled
    val notes: String? = null
)

data class CreateAppointmentRequest(
    val petId: String,
    val type: String,
    val date: String,
    val time: String,
    val notes: String? = null
)

data class MedicalRecord(
    val id: String,
    val petId: String,
    val date: String,
    val vet: String,
    val diagnosis: String,
    val treatment: String,
    val notes: String? = null,
    val followUp: String? = null
)

data class Vaccination(
    val id: String,
    val vaccine: String,
    val dateGiven: String,
    val nextDue: String? = null,
    val vet: String
)

data class HealthFlag(
    val id: String,
    val flag: String,
    val detail: String? = null,
    val createdAt: String
)

data class TriageSubmission(
    val id: String,
    val pet: String,
    val owner: String? = null,
    val symptoms: String,
    val photoUrl: String? = null,
    /** AI suggestion only — never a diagnosis. */
    val aiSuggestion: String,
    val severity: String, // low | medium | high | urgent
    val status: String,   // pending | reviewed
    val submittedAt: String
)

data class CreateTriageRequest(
    val petId: String,
    val symptoms: String
    // photo uploaded separately via multipart; wired when backend supports it
)

data class Product(
    val id: String,
    val name: String,
    val price: Double,
    val stock: Int,
    val photoUrl: String? = null
)

data class CartItem(val product: Product, val quantity: Int)

data class Order(
    val id: String,
    val items: List<OrderItem>,
    val total: Double,
    val status: String,
    val createdAt: String
)

data class OrderItem(
    val productId: String,
    val quantity: Int,
    val unitPrice: Double
)

data class CreateOrderRequest(val items: List<OrderItem>)

data class NotificationItem(
    val id: String,
    val kind: String, // appointment | stock | triage | invoice
    val title: String,
    val body: String? = null,
    val read: Boolean,
    val createdAt: String
)

/** Simple result wrapper used by repositories. */
sealed class ApiResult<out T> {
    data class Success<T>(val data: T) : ApiResult<T>()
    data class Error(val message: String) : ApiResult<Nothing>()
    data object Loading : ApiResult<Nothing>()
}
