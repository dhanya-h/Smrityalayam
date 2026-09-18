# 🧠 Smrityalayam (SIH26003)

> **AI-Driven Cognitive Gaming & Memory Assistance Platform for Elderly Dementia Care**  
> *Part of the [NeuroSangam](https://github.com/dhanya-h) healthcare technology portfolio.*

---

## 📌 Overview

**Smrityalayam** is a specialized digital intervention platform designed to support elderly individuals living with mild cognitive impairment (MCI) and early-stage dementia. By combining adaptive cognitive gaming, personalized memory portals, and wearable biometric monitoring, Smrityalayam aims to slow cognitive decline, preserve daily functional autonomy, and simplify caregiver management.

Developed as an early conceptual exploration for **Smart India Hackathon (SIH 2026 - PS 104)**, this project serves as a foundational prototype under the **NeuroSangam** initiative—exploring the confluence of neuroscience, bioengineering, interactive design, and AI.

---

## ✨ Key Features

### 🧩 1. Adaptive Cognitive Gaming
* **Memory Match & Sorting Games:** Interactive exercises tailored for cognitive stimulation without inducing stress or decision fatigue.
* **Cultural Contextualization:** Culturally familiar themes (including North-East & regional heritage modules) to promote emotional resonance and recall.

### 🖼️ 2. Personalized Memory Portal
* Digital nostalgia therapy engine storing family photographs, familiar voices, and key life milestones to assist with orientation and identity retention.

### ⌚ 3. Biometric & Habit Integration (Fitbit Panel)
* Integrated dashboard tracking vital biometrics, activity, and sleep patterns to correlate physiological health with daily cognitive engagement.

### 🌐 4. Accessibility & Caregiver Support
* **Multilingual & Voice-First UX:** Text-to-speech (`ReadAloud`) and localized interfaces for elderly usability across diverse literacy levels.
* **Caregiver Monitoring Interface:** Centralized hub for family and care teams to set reminders, monitor game progress, and detect sudden behavioral shifts.

---

## 🛠️ Tech Stack

* **Frontend:** [Next.js](https://nextjs.org/) (React, TypeScript)
* **Styling & UI:** Tailwind CSS, Lucide React Icons
* **Localization & Speech:** Web Speech API, Custom i18n localization hooks (`useSpeech`, `useT`)
* **Analytics & State:** Custom React state management & Fitbit API integration protocols
* **Progressive Web App (PWA):** Offline-first service worker architecture (`public/sw.js`)

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18.x or higher)
* **npm** or **yarn** / **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/dhanya-h/Smrityalayam.git](https://github.com/dhanya-h/Smrityalayam.git)
   cd Smrityalayam
