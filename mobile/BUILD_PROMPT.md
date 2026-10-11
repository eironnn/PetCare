# PROMPT: Build the CarePaws Pet-Owner Mobile App Frontend

Copy everything below the line into your AI coding assistant.

---

You are an expert Android developer. Build the complete frontend of the **CarePaws pet-owner mobile app** — *"CarePaws: A Smart Veterinary Management System"*, a capstone thesis project for Pet Care Veterinary Clinic.

## Tech stack (do not deviate)

- **Kotlin** + **Jetpack Compose** (Material 3), single-activity architecture
- Navigation Compose for all routing, ViewModel + Coroutines for state
- Retrofit + OkHttp + Gson for networking, DataStore (Preferences) for auth tokens — never SharedPreferences for tokens
- Coil for image loading
- minSdk 26, targetSdk 35, Kotlin 2.x, AGP 8.x, Compose BOM
- Package name: `com.carepaws.app`

## Brand (strict)

- Primary: `#F4741E` (orange) — buttons, highlights, active states
- Dark: `#1F2A37` (deep slate) — text, dark surfaces
- Light: `#FFF8F1` (warm off-white) — light background
- Support: white cards, muted gray `#6B7686` for secondary text, red `#D64545` for errors/destructive, green `#2E9E5B` for success
- Rounded corners everywhere (14–18dp cards, pill buttons), friendly pet-care aesthetic
- Dark mode support via Material 3 light/dark color schemes
- **Do not introduce any other accent colors.**

## Architecture

```
com.carepaws.app/
  MainActivity.kt                 # hosts the nav graph
  CarePawsApp.kt                  # Application class, manual dependency graph
  data/
    model/Models.kt               # data classes (User, Pet, Appointment, MedicalRecord,
                                  #   Vaccination, HealthFlag, TriageSubmission, Product,
                                  #   CartItem, Order, NotificationItem, ApiResult sealed class)
    remote/ApiService.kt          # Retrofit interface (see API contract below)
    remote/NetworkModule.kt       # OkHttp client + AuthInterceptor (Bearer JWT)
    local/SessionManager.kt       # DataStore: access token, refresh token, user JSON
    repository/AuthRepository.kt  # login / register / logout
    repository/CarePawsRepository.kt  # all feature data access
    repository/MockData.kt        # sample data
  ui/
    theme/ (Color.kt, Theme.kt, Type.kt)
    navigation/NavGraph.kt        # Routes object + NavHost + bottom tabs
    components/CommonUi.kt        # CarePawsButton, CarePawsTextField, CarePawsCard,
                                  #   FullScreenLoading, ErrorState, CarePawsBottomBar, TabScaffold
    screens/ (one package per flow, see below)
    viewmodel/ (one ViewModel per flow)
```

- Repository pattern: every data function returns `ApiResult<T>` (Success / Error / Loading).
- `CarePawsRepository.USE_MOCK_DATA = true` by default — **the entire app must run and demo with zero backend**, serving sample data. Each repository function tries the API first, falls back to mock data on failure.
- ViewModels expose `mutableStateOf` UI state and call repositories inside `viewModelScope`.

## Screens (build all of these)

### 1. Splash
Centered orange paw logo in a circle, "CarePaws" title, tagline "Healthy Pets, Happier Lives", orange "Get started" button → Onboarding.

### 2. Onboarding (3 swipeable pages, dots indicator, Skip, Next/Get Started → Login)
- Page 1: "Quality Care for Your Furry Friends" — book appointments, consult vets, all in one app.
- Page 2: "Easy & Convenient Pet Care" — bullet list: Book Appointments (choose time & doctor), Consult a Vet (professional advice anytime), Track Health Records (medical history in one place).
- Page 3: "Smart Support with AI Triage" — quick answers, health guidance, symptom checks with the AI-powered triage assistant.

### 3. Login / Register
- Login: paw logo, "CarePaws", "Pet owner sign in", email + password fields (password visibility toggle), orange Sign in button, "New here? Create an account" link. Inline error text on failure.
- Register: full name, email, phone (optional), password (6+ chars), validation, orange Create account button, back to sign in.
- On success: save JWT session via `SessionManager`, navigate to Home clearing the back stack.

### 4. Home (bottom tab)
- Greeting header ("Good morning," / "How can we help your pet today?"), notification bell → Notifications.
- Search field ("Search services, pets…").
- Horizontal pet switcher (circular avatar chips, selected = orange tint).
- 2×2 quick-action grid of cards with circular orange icons: **AI Triage**, **Book Appointment**, **Pet Records**, **Shop Products**.
- "Upcoming appointment" section: next appointment card (pet icon, type, date · time, status in orange) or empty state with "Book an appointment" button.
- Pull-to-refresh.

### 5. Pets (bottom tab) + Pet Detail
- Pet list with search field; each row: paw icon, name, species · breed, age. Tap → detail.
- Pet detail: header card (name, species · breed, age / sex / weight), **Health flags** section (warning icon, red accent), **Medical history** list (diagnosis, treatment, date · vet, follow-up in orange, notes), **Vaccinations** list (vaccine name, date given · vet, next-due in orange).

### 6. Booking
- Step cards: **Which pet?** (chips), **Visit type** (dropdown: General consultation, Vaccination, Dental check, Grooming, Follow-up, Emergency), **Date** (text field, e.g. 2026-10-20), **Time slot** (chip grid: 9:00 AM … 4:00 PM), **Notes for the vet** (optional multiline).
- Orange "Request appointment" button, validation ("Please choose a pet, date, and time."), loading spinner, note: "The clinic confirms booking requests — you'll get a notification."

### 7. AI Triage (bottom tab, chat-style — the signature screen)
- Pet selector chips at top.
- Chat message list: AI messages (paw avatar, light bubble) and user messages (orange bubble, cream text). Auto-scroll to latest.
- AI welcome message on open. Quick-prompt chips: "My pet is not eating", "My pet is vomiting", "My pet has diarrhea", "My pet is acting unusual".
- Rounded input field + circular orange send button. Typing indicator while submitting.
- On submit: append user message, call `submitTriage`, append the AI suggestion as the AI reply, then show a **result card**: warning icon, "Possible concern" (red), severity level, the AI suggestion text, the disclaimer **"This is a preliminary suggestion, not a diagnosis. A veterinarian will review your submission."**, "Still concerned?" + "Book an appointment with a vet for a proper check-up." + orange "Book appointment" button.
- Below: "Previous submissions" history list (severity colored label, symptoms, date).

### 8. Shop (bottom tab) + Cart
- Search field, 2-column product grid; each card: image placeholder (orange-tinted), name, price in orange (₱ peso), orange "Add to cart" button.
- Cart icon in top bar → full-screen cart: quantity steppers (+/−), remove, subtotal card, orange Checkout button, loading state, success dialog ("Order placed! The clinic will prepare your items for pickup.").

### 9. Notifications
- List with kind icons (appointment = calendar, triage = agent, invoice = receipt), unread titles bold with orange icon, tap marks read. Empty state text.

### 10. Profile (bottom tab) + Settings
- Owner card (avatar circle, name, email).
- "My pets" → Manage pets (navigates to Pets tab).
- "My orders" list (order id, item count · date, total in orange).
- "Settings" card: Notifications toggle, Dark theme toggle, Language (English), Privacy & Security, Help & Support, About CarePaws (Version 1.0) — each a row with orange icon, title, subtitle, chevron.
- Red "Log out" text with confirmation dialog.

### Bottom tabs (5)
Home, Pets, Triage, Shop, Profile — orange selected indicator, shared `TabScaffold` (top app bar + bottom bar).

## API contract (NestJS, base `/api/v1`, JWT Bearer)

```
POST auth/login {email, password} -> {user, accessToken, refreshToken}
POST auth/register {name, email, password, phone?} -> {user, accessToken, refreshToken}
GET  auth/me -> User
GET  pets?q= -> Pet[]
GET  pets/{id} -> Pet
GET  pets/{id}/medical-records -> MedicalRecord[]
GET  pets/{id}/vaccinations -> Vaccination[]
GET  pets/{id}/health-flags -> HealthFlag[]
GET  appointments?status= -> Appointment[]
POST appointments {petId, type, date, time, notes?} -> Appointment
GET  triage-submissions -> TriageSubmission[]
POST triage-submissions {petId, symptoms} -> TriageSubmission
GET  products -> Product[]
POST orders {items: [{productId, quantity, unitPrice}]} -> Order
GET  orders/mine -> Order[]
GET  notifications -> NotificationItem[]
PATCH notifications/{id}/read -> NotificationItem
```

`ApiService.kt` must declare all of these. `NetworkModule` attaches `Authorization: Bearer <token>` via interceptor, 20s connect / 30s read timeouts, BASIC logging.

## Non-negotiable rules

1. **AI is suggestion-only.** Every AI output in the UI carries the "preliminary suggestion, not a diagnosis" disclaimer and a path to a real vet (triage result → book appointment). Never present AI text as a diagnosis.
2. **Single-branch clinic** — no branch picker UI anywhere.
3. **All data through the backend** — the app never talks to Supabase/Firebase directly.
4. **Mock-data mode** — with `USE_MOCK_DATA = true`, every screen works fully offline with realistic sample pets, appointments, records, products, and notifications.
5. **Tokens in DataStore only.** Never log tokens. Never hardcode secrets.
6. Currency is Philippine peso (₱).

## Definition of done

- `MainActivity` launches → Splash → Onboarding → Login → Home with bottom tabs; every screen above reachable and functional.
- All strings user-facing; no `TODO()` or `NotImplementedError` in shipping paths.
- Code organized exactly per the Architecture section; ViewModels named `<Flow>ViewModel`.
- Builds without errors in Android Studio (AGP 8.x, Kotlin 2.x).

---

End of prompt.
