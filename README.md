

# 🛡️ GigShield AI — Parametric Income Insurance for Food Delivery Partners

> **DEVTrails 2026 | Team: CodeStorm | Phase 1 Submission**
> Protecting the livelihoods of Zomato & Swiggy delivery partners against uncontrollable income loss.

---

## 📌 Problem Statement

India's food delivery ecosystem runs on the backs of hundreds of thousands of delivery partners working for platforms like Zomato and Swiggy. These workers operate in highly unpredictable environments — extreme weather, flooding, dense pollution, and sudden civic disruptions can cut their working day entirely short.

**The harsh reality:**
- A food delivery partner earns ₹600–₹1,200/day on average.
- A single disruption day (heavy rain, flood, curfew) can wipe out 100% of daily income.
- Traditional insurance is too slow, too complex, and too expensive for week-to-week gig workers.
- There is **no existing safety net** for income loss from external, uncontrollable disruptions.

GigShield AI changes this.

---

## 💡 Our Solution

**GigShield AI** is a mobile-first, AI-powered **parametric insurance platform** exclusively for food delivery partners (Zomato/Swiggy). It uses real-time external data (weather, pollution, civic alerts) to automatically trigger income-loss payouts — **no paperwork, no manual claims, no waiting**.

Workers subscribe on a **weekly basis**, matching their natural income cycle, and receive automatic compensation whenever a qualifying disruption occurs in their active delivery zone.

---

## 👤 Persona: The Food Delivery Partner

**Name:** Raju Sharma
**City:** Mumbai, Maharashtra
**Platform:** Zomato
**Working Hours:** 10 AM – 10 PM (split shift)
**Average Weekly Earnings:** ₹4,500 – ₹6,000
**Key Vulnerabilities:**

| Scenario | Impact |
|---|---|
| Heavy monsoon rain (>50mm/day) | Cannot ride safely; orders dry up |
| AQI > 300 (Severe Pollution) | Dangerous to work outdoors for hours |
| Flash floods / waterlogging | Roads blocked; delivery zones inaccessible |
| Sudden municipal curfew / bandh | No movement allowed; zero earnings |
| Zomato app outage (>2 hours) | No orders assignable; idle time loss |

**Raju's Story:**
During Mumbai's monsoon season, Raju loses 2–4 full working days per month to extreme rainfall. His family depends on his daily earnings, but today he has no protection. GigShield AI ensures that when Raju cannot work due to a disruption beyond his control, he still receives instant income compensation.

---

## ⚙️ System Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                     GigShield AI Workflow                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Worker Onboarding                                       │
│     └─► Web App → KYC (Aadhaar/PAN) → Zone Registration    │
│                                                             │
│  2. Weekly Subscription                                     │
│     └─► AI calculates dynamic premium based on:            │
│         • Worker's delivery zone risk score                 │
│         • Historical disruption frequency (past 6 months)  │
│         • Season / weather forecast for the week            │
│         • Worker's active hours per day                     │
│                                                             │
│  3. Real-Time Monitoring (Background)                       │
│     └─► Weather API ──► Disruption detected?               │
│         Pollution API ─►       │                            │
│         Civic Alert API ──►    ▼                            │
│                           AI Engine evaluates               │
│                           severity + worker location        │
│                                                             │
│  4. Automated Claim Trigger                                 │
│     └─► Disruption confirmed in worker's active zone        │
│         → AI cross-checks worker's GPS activity             │
│         → Fraud check passed                                │
│         → Income loss calculated                            │
│                                                             │
│  5. Instant Payout                                          │
│     └─► UPI / Bank transfer within minutes                  │
│         Worker notified via app + SMS                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Parametric Triggers

These are predefined, objective thresholds. When a trigger fires in a worker's active zone during their registered working hours, a payout is automatically initiated. No manual claim needed.

| Trigger | Threshold | Data Source | Payout Multiplier |
|---|---|---|---|
| 🌧️ Heavy Rainfall | > 50mm in 3 hours | OpenWeatherMap API | 1.0x (Full Day) |
| 😷 Severe Air Pollution | AQI > 300 | CPCB / AQI API | 0.75x |
| 🌊 Flood / Waterlogging Alert | IMD Flood Warning Level 2+ | IMD API / NDMA | 1.0x (Full Day) |
| 🚫 Civic Curfew / Bandh | Official notification in zone | NewsAPI / govt feeds | 1.0x (Full Day) |
| 📵 Platform Outage | Zomato/Swiggy API downtime > 2hrs | Platform health monitors | 0.5x |

> **Note:** Triggers are zone-specific. A flood alert in Bandra does not trigger payouts for a worker in Thane. Worker's registered delivery zone determines applicability.

---

## 💰 Weekly Premium Model

Premiums are structured on a **weekly basis** to align with the typical payout cycle of delivery partners.

### Base Plans

| Plan | Weekly Premium | Coverage | Max Weekly Payout |
|---|---|---|---|
| Basic Shield | ₹49/week | Up to 3 disruption events | ₹900 |
| Pro Shield | ₹99/week | Unlimited disruption events | ₹2,100 |

### AI-Driven Dynamic Pricing

The base premium is adjusted dynamically each week based on the following AI model inputs:

```
Final Premium = Base Premium × Zone Risk Factor × Season Multiplier × Activity Score
```

Factors:
- Zone Risk Factor (0.8 – 1.3): Calculated from historical flood/disruption data for the worker's primary delivery zone.
- Season Multiplier (0.9 – 1.4): Higher during monsoon (June–September) and winter smog months (Nov–Jan).
- Activity Score (0.85 – 1.0): Workers with consistent 8+ hour active days get a loyalty discount.

Example:
Raju operates in Dharavi (high flood risk zone), during July (peak monsoon).
₹49 × 1.25 (zone) × 1.35 (monsoon) × 0.95 (active worker) = ₹79/week

---

## 🤖 AI/ML Integration Plan

### 1. Dynamic Premium Calculation
- Model: Linear Regression (scikit-learn)
- Inputs: Zone risk score, seasonal patterns, worker active hours, historical claims
- Output: Weekly premium multiplier

### 2. Fraud Detection and Anomaly Detection
- Model: Isolation Forest (unsupervised anomaly detection)
- What it detects:
  - GPS spoofing (static location reported as moving)
  - Claim outside registered zone
  - Suspicious claim frequency patterns
  - Multiple claims for the same event
- Data inputs: GPS coordinates, accelerometer data, cell tower IDs, historical claim behavior
- Action on detection: Claim flagged for review — not auto-rejected

### 3. Income Loss Estimation
- Model: Rule-based engine + regression
- Inputs: Time of disruption, worker's historical hourly earnings, order frequency
- Output: Estimated lost income → approved payout amount

---

## 🔐 Anti-Fraud and Anti-Spoofing Strategy

### Multi-Layer Verification

```
Layer 1: Parametric Verification
  └── Is the disruption actually happening per trusted external API?

Layer 2: Zone Verification
  └── Was the worker's device in the affected zone at disruption time?

Layer 3: Activity Verification
  └── Was the worker active (riding) before the disruption?
      (GPS velocity + accelerometer confirms real movement)

Layer 4: Behavioral Analysis
  └── Does this worker's claim pattern match historical fraud signatures?
```

### Spoof Prevention

| Attack Vector | Defense |
|---|---|
| GPS Spoofing | Cell tower triangulation + accelerometer cross-check |
| Fake weather claims | Claims only triggered by our verified API feed, not worker-reported |
| Zone boundary abuse | Polygon-based zone mapping, not just radius |
| Claim stacking | Deduplication — one payout per disruption event per worker |

### Fair Treatment
Suspicious claims are flagged, not auto-rejected. Workers receive a transparent notification explaining the hold, and partial payouts may be issued pending a 48-hour secondary review.

---

## 📱 Platform Choice: Web (React) — Mobile Accessible

We chose a React.js web app for Phase 1 because:

1. Works on any smartphone browser — no app installation needed, reducing onboarding friction.
2. Faster to build and demo — ideal for the hackathon timeline.
3. Full GPS and sensor access via browser APIs — sufficient for Phase 1 prototype.
4. UPI deep links work seamlessly in mobile browsers.
5. Upgradeable — can be wrapped into a Flutter mobile app in Phase 3.

---

## 🏗️ Tech Stack and Architecture

### Frontend
- React.js — responsive single-page web app with component-based UI for worker dashboard, plan selection, and claim status.
- HTML, CSS, JavaScript — base layer for styling and interactivity.

### Backend
- Node.js (Express) — REST API server handling user registration, weekly policy creation, real-time trigger evaluation, fraud checks, and payout processing.
- Python (Flask) — dedicated AI/ML microservice for premium calculation and fraud detection models.

### Database
- MySQL — stores worker profiles, zone registrations, weekly policies, disruption events, and claim/payout records.

### AI/ML Engine
- Python scikit-learn — called from the Flask microservice:
  - Premium calculation: Linear Regression model trained on zone and season risk data.
  - Fraud detection: Isolation Forest for anomaly detection on claim patterns.

### External APIs

| API | Purpose | Tier |
|---|---|---|
| OpenWeatherMap | Rainfall data | Free |
| OpenAQ | Pollution / AQI levels | Free |
| Google Maps JS API | Zone mapping | Free tier |
| Razorpay | Payout simulation | Test mode |

### Infrastructure
React frontend + Node.js backend + Python Flask AI service, all running locally for demo. MySQL on localhost.

---

## 🗓️ Development Plan

| Phase | Timeline | Focus |
|---|---|---|
| Phase 1 | March 4–20 | Ideation, architecture design, tech stack decisions, README |
| Phase 2 | March 21 – April 4 | Registration flow, policy management, dynamic premium engine, claims management UI |
| Phase 3 | April 5–17 | Advanced fraud detection, simulated payout system, analytics dashboard |

### Phase 2 Sprint Goals
- [ ] Worker onboarding and KYC flow
- [ ] Zone registration with map polygon selection
- [ ] Weekly plan subscription UI
- [ ] Dynamic premium calculator (AI model v1)
- [ ] Mock trigger engine (3–5 disruption types)
- [ ] Claim auto-initiation UI

### Phase 3 Sprint Goals
- [ ] Isolation Forest fraud detection integration
- [ ] GPS and accelerometer spoofing prevention
- [ ] Razorpay sandbox payout flow
- [ ] Worker dashboard: earnings protected, active coverage
- [ ] Admin dashboard: loss ratios, predictive disruption alerts
- [ ] Final 5-min demo video

---

## 🎯 Key Innovations

- Zero-touch claims — no forms, no calls, no waiting. Fully automated.
- Zone-aware parametric triggers — hyperlocal, not city-wide blanket triggers.
- AI dynamic pricing — fair premiums that reflect real risk, not fixed rates.
- Multi-layer fraud defense — prevents GPS spoofing without punishing honest workers.
- Weekly model — perfectly aligned with gig workers' income and payment cycles.
- Built for India — UPI payouts, Aadhaar KYC, regional civic alert integration.

---

## 👥 Team CodeStorm

> Building resilient, intelligent systems under pressure ⚡

| Member | Role |
|---|---|
| Team Lead | Product and Architecture |
| Developer | Backend and AI/ML |
| Developer | Frontend and Mobile |


