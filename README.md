# MMP Manpower Services — Android Application

Native Android application for **MMP Manpower Services** built with **Kotlin** and **Jetpack Compose**, implementing Material Design 3 and the official Royal Navy & Gold brand identity.

## Architecture & Tech Stack

- **Platform:** Android (Min SDK 26, Target SDK 35, Compile SDK 35)
- **Language:** Kotlin 2.0.21
- **UI Framework:** Jetpack Compose (M3 Material Design)
- **Architecture:** MVVM (Model-View-ViewModel) + Single Activity Architecture (`MainActivity.kt`)
- **State Management:** Kotlin Coroutines `StateFlow` & reactive Compose state
- **Graphics & Branding:** Royal Crown Insignia with Saffron, White Diamond, and Green Emerald jewels, Crystalline Tiranga wings (Saffron left wing, Emerald Green right wing), golden partnership handshake, dual-tone MANPOWER typography, official tagline *"YOUR WORKFORCE. OUR STRENGTH. YOUR SUCCESS."*, and adaptive launcher icons across all screen densities (`mdpi`, `hdpi`, `xhdpi`, `xxhdpi`, `xxxhdpi`)

## Key Features & Modules

1. **Home & Executive Showcase (`HomeScreen.kt`)**:
   - Official 3D emblem showcase with Tiranga crystalline wings and dual-tone typography
   - Official brand motto: *"YOUR WORKFORCE. OUR STRENGTH. YOUR SUCCESS."*
   - Real-time placement metrics: 4,800+ candidates placed, 320+ corporate clients, 98.4% SHIELD verified
   - Fast-Track service banner with instant enrollment
   - Featured verified job openings

2. **Find Jobs Portal (`FindJobsScreen.kt` & `JobDetailDialog.kt`)**:
   - Live search by job role, employer name, or district (Davanagere, Raichur, Bangalore)
   - Sector filtering (Manufacturing, BFSI, Logistics, IT, Skilled Trade, Sales)
   - One-click job applications with recruiter notes

3. **Workforce Directory (`WorkforceDirectoryScreen.kt`)**:
   - Specialized operational roles across Facility Administration, Security Guarding, Logistics & Fleet, and Industrial & Tech
   - Turnkey staffing deployment requests

4. **Candidate Portal & Digital ID (`CandidatePortalScreen.kt`)**:
   - Official MMP SHIELD™ Digital ID card with verification level
   - Verified Skill Badges with Gold/Silver certified levels
   - Real-time job application lifecycle tracker (Matched → Interview → Selected → Joined)
   - Candidate membership plans (Career Starter ₹499, Plus ₹1,499, Pro ₹2,999, Executive ₹7,999)
   - Full candidate onboarding form

5. **Corporate Employer Desk (`EmployerPortalScreen.kt`)**:
   - Client account dashboard with GST & PAN validation
   - Vacancy posting engine with instant publishing
   - Applicant management pipeline with status progression
   - Corporate recruitment SLA tiers (Basic, Silver, Gold, Diamond)

6. **MMP SHIELD™ & Support Desk (`ServicesAndShieldScreen.kt`)**:
   - Instant credential verification lookup engine by Candidate ID, Client ID, Job Code, or Invoice
   - Interactive practical skill assessment engine with automated grading and explanations
   - Fast-Track expedited placement service (₹3,400)
   - Formal grievance and direct-hiring dispute ticketing
   - District franchise partnership expansion applications

7. **Admin ERP & Compliance Console (`AdminErpScreen.kt`)**:
   - Super Admin management console
   - Executive KPIs: Total Candidates, Active Clients, Vacancies Live, Revenue Collected
   - Candidate and employer verification queues with instant approval
   - Financial ledger & GST invoice audit records
   - Cryptographic system audit trail
