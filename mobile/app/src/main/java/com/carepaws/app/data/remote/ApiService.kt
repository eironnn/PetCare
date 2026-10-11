package com.carepaws.app.data.remote

import com.carepaws.app.data.model.Appointment
import com.carepaws.app.data.model.AuthSession
import com.carepaws.app.data.model.CreateAppointmentRequest
import com.carepaws.app.data.model.CreateOrderRequest
import com.carepaws.app.data.model.CreateTriageRequest
import com.carepaws.app.data.model.HealthFlag
import com.carepaws.app.data.model.LoginRequest
import com.carepaws.app.data.model.MedicalRecord
import com.carepaws.app.data.model.NotificationItem
import com.carepaws.app.data.model.Order
import com.carepaws.app.data.model.Pet
import com.carepaws.app.data.model.Product
import com.carepaws.app.data.model.RegisterRequest
import com.carepaws.app.data.model.TriageSubmission
import com.carepaws.app.data.model.User
import com.carepaws.app.data.model.Vaccination
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.PATCH
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Query

/**
 * Retrofit interface — 1:1 with the NestJS /api/v1 contract
 * (see web frontend src/lib/api.ts for the same contract in TypeScript).
 */
interface ApiService {

    // Auth
    @POST("auth/login")
    suspend fun login(@Body body: LoginRequest): AuthSession

    @POST("auth/register")
    suspend fun register(@Body body: RegisterRequest): AuthSession

    @GET("auth/me")
    suspend fun me(): User

    // Pets
    @GET("pets")
    suspend fun getPets(@Query("q") q: String? = null): List<Pet>

    @GET("pets/{id}")
    suspend fun getPet(@Path("id") id: String): Pet

    @POST("pets")
    suspend fun createPet(@Body body: Map<String, String?>): Pet

    @GET("pets/{id}/medical-records")
    suspend fun getMedicalRecords(@Path("id") petId: String): List<MedicalRecord>

    @GET("pets/{id}/vaccinations")
    suspend fun getVaccinations(@Path("id") petId: String): List<Vaccination>

    @GET("pets/{id}/health-flags")
    suspend fun getHealthFlags(@Path("id") petId: String): List<HealthFlag>

    // Appointments
    @GET("appointments")
    suspend fun getAppointments(
        @Query("status") status: String? = null
    ): List<Appointment>

    @POST("appointments")
    suspend fun createAppointment(@Body body: CreateAppointmentRequest): Appointment

    @PATCH("appointments/{id}/status")
    suspend fun updateAppointmentStatus(
        @Path("id") id: String,
        @Body body: Map<String, String>
    ): Appointment

    // Triage
    @GET("triage-submissions")
    suspend fun getTriageSubmissions(): List<TriageSubmission>

    @POST("triage-submissions")
    suspend fun createTriage(@Body body: CreateTriageRequest): TriageSubmission

    // Shop
    @GET("products")
    suspend fun getProducts(): List<Product>

    @POST("orders")
    suspend fun createOrder(@Body body: CreateOrderRequest): Order

    @GET("orders/mine")
    suspend fun getMyOrders(): List<Order>

    // Notifications
    @GET("notifications")
    suspend fun getNotifications(): List<NotificationItem>

    @PATCH("notifications/{id}/read")
    suspend fun markNotificationRead(@Path("id") id: String): NotificationItem
}
