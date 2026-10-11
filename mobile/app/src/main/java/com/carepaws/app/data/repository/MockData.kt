package com.carepaws.app.data.repository

import com.carepaws.app.data.model.Appointment
import com.carepaws.app.data.model.HealthFlag
import com.carepaws.app.data.model.MedicalRecord
import com.carepaws.app.data.model.NotificationItem
import com.carepaws.app.data.model.Order
import com.carepaws.app.data.model.OrderItem
import com.carepaws.app.data.model.Pet
import com.carepaws.app.data.model.Product
import com.carepaws.app.data.model.TriageSubmission
import com.carepaws.app.data.model.Vaccination

/**
 * Sample data used while USE_MOCK_DATA is true (and as offline fallback).
 * Replace with nothing — the repository simply stops using it once the
 * backend is live.
 */
object MockData {

    val pets = listOf(
        Pet("p1", "Milo", "Dog", "Golden Retriever", "3 yrs", "Male", 28.5, "Ana Reyes"),
        Pet("p2", "Luna", "Cat", "Persian", "2 yrs", "Female", 4.2, "Ana Reyes"),
        Pet("p3", "Choco", "Dog", "Shih Tzu", "5 yrs", "Male", 6.8, "Ana Reyes")
    )

    val appointments = listOf(
        Appointment("a1", "Milo", "Golden Retriever", "Ana Reyes", "Annual wellness exam",
            "2026-10-15", "9:00 AM", "Dr. Santos", "confirmed"),
        Appointment("a2", "Luna", "Persian", "Ana Reyes", "Vaccination",
            "2026-10-18", "10:30 AM", "Dr. Santos", "pending"),
        Appointment("a3", "Milo", "Golden Retriever", "Ana Reyes", "Dental check",
            "2026-09-20", "2:00 PM", "Dr. Santos", "completed")
    )

    val records = listOf(
        MedicalRecord("r1", "p1", "2026-09-20", "Dr. Santos",
            "Mild gingivitis", "Dental cleaning scheduled",
            "Tolerated handling well.", "2026-12-20"),
        MedicalRecord("r2", "p1", "2026-06-10", "Dr. Santos",
            "Healthy", "Annual wellness exam — all clear", null, "2027-06-10")
    )

    val vaccinations = listOf(
        Vaccination("v1", "Rabies (booster)", "2026-06-10", "2027-06-10", "Dr. Santos"),
        Vaccination("v2", "DHPP", "2026-06-10", "2027-06-10", "Dr. Santos")
    )

    val healthFlags = listOf(
        HealthFlag("h1", "Weight trend", "Up 8% since last visit — monitor diet.", "2026-09-20")
    )

    val triageHistory = listOf(
        TriageSubmission("t1", "Milo", "Ana Reyes",
            "Occasional sneezing for 2 days, appetite normal.",
            aiSuggestion = "Signs look mild and consistent with a minor upper-respiratory irritation. " +
                "Monitor for 24–48h; seek care sooner if appetite drops or discharge appears. " +
                "This is a preliminary suggestion, not a diagnosis — a vet will review.",
            severity = "low", status = "reviewed", submittedAt = "2026-10-08")
    )

    val products = listOf(
        Product("pr1", "Premium Dog Food 5kg", 1850.0, 24),
        Product("pr2", "Cat Litter 10L", 620.0, 40),
        Product("pr3", "Flea & Tick Drops", 450.0, 30),
        Product("pr4", "Dental Chews (pack)", 380.0, 50)
    )

    val orders = listOf(
        Order("o1",
            listOf(OrderItem("pr1", 1, 1850.0)),
            1850.0, "fulfilled", "2026-10-02")
    )

    val notifications = listOf(
        NotificationItem("n1", "appointment", "Appointment confirmed",
            "Milo's wellness exam on Oct 15, 9:00 AM is confirmed.", false, "2026-10-11"),
        NotificationItem("n2", "triage", "Triage reviewed",
            "Dr. Santos reviewed Milo's triage submission.", false, "2026-10-09"),
        NotificationItem("n3", "invoice", "Payment received",
            "Thank you — invoice #INV-1042 is settled.", true, "2026-10-05")
    )

    fun mockAiSuggestion(symptoms: String): String =
        "Thanks — based on what you described (\"$symptoms\"), this looks like something " +
            "to monitor rather than an emergency. Keep notes on appetite, energy, and any new " +
            "symptoms for 24–48h. This is a preliminary suggestion, not a diagnosis — " +
            "a veterinarian will review your submission shortly. If anything worsens, " +
            "call the clinic right away."

    fun mockOrder(items: List<OrderItem>): Order {
        val total = items.sumOf { it.quantity * it.unitPrice }
        return Order(
            id = "mock-${System.currentTimeMillis()}",
            items = items,
            total = total,
            status = "pending",
            createdAt = "Just now"
        )
    }
}
