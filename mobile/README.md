# CarePaws — Pet Owner Android App (Kotlin)

*"CarePaws: A Smart Veterinary Management System"* — capstone thesis project for **Pet Care Veterinary Clinic**.

This is the **pet-owner** mobile app. Clinic staff use the separate web frontend (`frontend/`).

## Stack

- Kotlin + Jetpack Compose (Material 3), single-activity + Navigation Compose
- Retrofit + OkHttp + Gson → NestJS `/api/v1` (REST/JSON, JWT Bearer)
- DataStore for auth tokens (never SharedPreferences)
- Coil for images, Coroutines + ViewModel for state
- minSdk 26 · targetSdk 35 · Kotlin 2.1 · AGP 8.7

## Brand

Same 3-color system as the staff site: `#F4741E` (primary orange), `#1F2A37` (deep slate), `#FFF8F1` (warm off-white). Defined in `ui/theme/Color.kt` — **no new accent colors without team sign-off.**

## Run it

1. Open this folder in **Android Studio** (latest stable).
2. Let Gradle sync (downloads AGP/Kotlin/Compose on first run).
3. Run on an emulator or device (API 26+).

Backend URL: `app/build.gradle.kts` → `API_BASE_URL` (default `https://carepaws-api.onrender.com/api/v1/`). For local dev against `localhost:3001`, use `http://10.0.2.2:3001/api/v1/`.

## Screens

| Flow | Screens |
| --- | --- |
| First run | Splash → Onboarding (3 pages) |
| Auth | Login, Register (JWT, session in DataStore) |
| Home | Greeting, search, pet switcher, quick-action grid, upcoming appointment |
| Pets | Pet list + search, pet detail (medical history, vaccinations, health flags) |
| Booking | Pet → visit type → date → time slot → notes → request |
| AI Triage | Chat-style symptom intake with quick prompts, AI suggestion bubble, result card with severity + "book appointment" CTA |
| Shop | Product grid + search, cart sheet, checkout |
| Notifications | List, tap to mark read |
| Profile | Owner card, my pets, my orders, settings (notifications, theme, language, privacy, help, about), log out |

## Project structure

```
app/src/main/java/com/carepaws/app/
  MainActivity.kt            # single activity, hosts the nav graph
  CarePawsApp.kt             # manual dependency graph (no DI framework in v1)
  data/
    model/Models.kt          # data classes mirroring /api/v1 shapes
    remote/ApiService.kt     # Retrofit interface (1:1 with backend contract)
    remote/NetworkModule.kt  # OkHttp + auth interceptor
    local/SessionManager.kt  # DataStore JWT session
    repository/              # AuthRepository, CarePawsRepository, MockData
  ui/
    theme/                   # Color, Theme, Type (brand system)
    navigation/NavGraph.kt   # all routes + bottom tabs
    components/CommonUi.kt   # buttons, cards, text fields, bottom bar, scaffold
    screens/                 # one package per flow
    viewmodel/               # one ViewModel per screen/flow
```

## Backend contract

`data/remote/ApiService.kt` declares every endpoint the NestJS backend must implement — same contract as the web frontend's `src/lib/api.ts`:

- `POST auth/login`, `POST auth/register`, `GET auth/me`
- `GET /pets`, `GET /pets/{id}/medical-records|vaccinations|health-flags`
- `GET/POST /appointments`
- `GET/POST /triage-submissions`
- `GET /products`, `POST /orders`, `GET /orders/mine`
- `GET /notifications`, `PATCH /notifications/{id}/read`

## Mock-data mode (thesis demo safety)

`CarePawsRepository.USE_MOCK_DATA = true` (default) serves sample data so the **entire app is demoable with no backend**. Flip to `false` when the NestJS API is live — calls fall back to mock data on network failure anyway.

## Delimitations (baked in)

- AI output is **suggestion-only** — the triage UI always shows "preliminary suggestion, not a diagnosis" and routes to vet review/booking.
- Single-branch clinic: no branch selection UI anywhere.
- The app never talks to Supabase directly — all data goes through NestJS.

## Conventions

- Simplified Git Flow: `main`, `develop`, `feature/*`, `fix/*`
- Keep the 3-color system; no palette drift
- Tokens in DataStore only; never log tokens

## Team

- Joanne Grace Z. Lauder — Frontend Developer
- Kimberly Jane M. Rolliog — Software Tester
- Lester Aaron A. Tomboc — Senior Programmer
- Krizza Nicole B. Yanzon — Junior Programmer
