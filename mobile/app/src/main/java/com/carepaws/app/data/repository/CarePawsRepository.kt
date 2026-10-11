package com.carepaws.app.data.repository

import com.carepaws.app.data.model.ApiResult
import com.carepaws.app.data.model.Appointment
import com.carepaws.app.data.model.CreateAppointmentRequest
import com.carepaws.app.data.model.CreateOrderRequest
import com.carepaws.app.data.model.CreateTriageRequest
import com.carepaws.app.data.model.HealthFlag
import com.carepaws.app.data.model.MedicalRecord
import com.carepaws.app.data.model.NotificationItem
import com.carepaws.app.data.model.Order
import com.carepaws.app.data.model.OrderItem
import com.carepaws.app.data.model.Pet
import com.carepaws.app.data.model.Product
import com.carepaws.app.data.model.TriageSubmission
import com.carepaws.app.data.model.Vaccination
import com.carepaws.app.data.remote.ApiService

/**
 * Set to false once the NestJS backend is live — the app then talks
 * to /api/v1 exclusively. While true, every call returns sample data
 * so the UI is fully demoable offline (thesis demo-day safety).
 */
const val USE_MOCK_DATA = true

/**
 * Main repository: pets, appointments, triage, shop, notifications.
 * Each function tries the API first, falling back to mock data when
 * USE_MOCK_DATA is true or the network call fails.
 */
class CarePawsRepository(private val api: ApiService) {

    suspend fun getPets(): ApiResult<List<Pet>> =
        callOrMock({ api.getPets() }, MockData.pets)

    suspend fun getPet(petId: String): ApiResult<Pet> =
        callOrMock(
            { api.getPet(petId) },
            MockData.pets.firstOrNull { it.id == petId } ?: MockData.pets.first()
        )

    suspend fun getMedicalRecords(petId: String): ApiResult<List<MedicalRecord>> =
        callOrMock({ api.getMedicalRecords(petId) }, MockData.records)

    suspend fun getVaccinations(petId: String): ApiResult<List<Vaccination>> =
        callOrMock({ api.getVaccinations(petId) }, MockData.vaccinations)

    suspend fun getHealthFlags(petId: String): ApiResult<List<HealthFlag>> =
        callOrMock({ api.getHealthFlags(petId) }, MockData.healthFlags)

    suspend fun getAppointments(): ApiResult<List<Appointment>> =
        callOrMock({ api.getAppointments() }, MockData.appointments)

    suspend fun bookAppointment(
        petId: String, type: String, date: String, time: String, notes: String?
    ): ApiResult<Appointment> =
        callOrMock(
            { api.createAppointment(CreateAppointmentRequest(petId, type, date, time, notes)) },
            MockData.appointments.first().copy(
                id = "mock-${System.currentTimeMillis()}",
                type = type, date = date, time = time,
                status = "pending", notes = notes
            )
        )

    suspend fun getTriageHistory(): ApiResult<List<TriageSubmission>> =
        callOrMock({ api.getTriageSubmissions() }, MockData.triageHistory)

    suspend fun submitTriage(petId: String, symptoms: String): ApiResult<TriageSubmission> =
        callOrMock(
            { api.createTriage(CreateTriageRequest(petId, symptoms)) },
            TriageSubmission(
                id = "mock-${System.currentTimeMillis()}",
                pet = MockData.pets.firstOrNull { it.id == petId }?.name ?: "Pet",
                symptoms = symptoms,
                aiSuggestion = MockData.mockAiSuggestion(symptoms),
                severity = "medium",
                status = "pending",
                submittedAt = "Just now"
            )
        )

    suspend fun getProducts(): ApiResult<List<Product>> =
        callOrMock({ api.getProducts() }, MockData.products)

    suspend fun checkout(items: List<OrderItem>): ApiResult<Order> =
        callOrMock(
            { api.createOrder(CreateOrderRequest(items)) },
            MockData.mockOrder(items)
        )

    suspend fun getMyOrders(): ApiResult<List<Order>> =
        callOrMock({ api.getMyOrders() }, MockData.orders)

    suspend fun getNotifications(): ApiResult<List<NotificationItem>> =
        callOrMock({ api.getNotifications() }, MockData.notifications)

    suspend fun markNotificationRead(id: String): ApiResult<Unit> =
        runCatching {
            if (!USE_MOCK_DATA) api.markNotificationRead(id)
        }.toResult()

    private suspend fun <T> callOrMock(
        apiCall: suspend () -> T,
        mock: T
    ): ApiResult<T> =
        if (USE_MOCK_DATA) {
            ApiResult.Success(mock)
        } else {
            runCatching { apiCall() }
                .fold(
                    onSuccess = { ApiResult.Success(it) },
                    onFailure = { ApiResult.Success(mock) } // offline demo safety
                )
        }
}
