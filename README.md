# 🩺 Prescription.AI — Clinical Decision Support & Digital Prescription Safety System

**Prescription.AI** is a clinical decision support (CDS) and digital prescription safety platform designed to prevent adverse drug events (ADEs), drug-drug interactions (DDIs), pediatric/geriatric contraindications, and medication adherence failures across the entire continuum of healthcare.

---

## 🌟 Key Features & Architecture

### 1. 🔬 Real-Time Clinical AI Safety Guard
- **Comprehensive Formulary:** Contains clinical knowledge for 60+ common medications across all major classes (Cardiovascular, Antibiotics, NSAIDs/Analgesics, Diabetes, Psychiatric, etc.).
- **Multi-Drug Interaction Engine (DDI):** Detects critical pharmacokinetic and pharmacodynamic interactions (e.g., Warfarin + Aspirin synergistic hemorrhage; Sildenafil + Nitrates catastrophic hypotension; Lisinopril + Potassium hyperkalemia).
- **Pediatric & Geriatric Beers Criteria:** Flags pediatric contraindications (Aspirin & Reye's syndrome in <16yo, Fluoroquinolones in <18yo, Tetracyclines in <8yo) and Beers criteria alerts for seniors (high sedation Benzodiazepines, chronic NSAIDs).
- **Allergy & Cross-Reactivity:** Automatic detection of patient-documented allergies and structural cross-reactivity (e.g., Penicillin allergy vs. Amoxicillin/Beta-lactams).
- **Dosage Ceiling Guard:** Evaluates daily cumulative dosages (e.g., Paracetamol max 4000mg/24h).
- **Scientific Safety Alignment Index:** Dynamically calculates an objective safety confidence score ($0-100\%$) in real-time as the physician types.

### 2. 👨‍⚕️ Multi-Role Healthcare Ecosystem
- **Doctor Portal:** Real-time drug auto-complete search, instant clinical case presets (Safe Cardiac, DDI Alert, Pediatric Alert, Allergy Conflict), official digital signing, and print-ready hospital prescription templates.
- **Patient Portal:** Prescription history, daily medication schedule with pill reminders, time-of-day intake tracking, food/drink precautions (e.g., avoid Grapefruit/Alcohol), and adherence analytics.
- **Pharmacist Workstation:** Interactive QR scanner and manual RX ID lookup, cryptographic digital signature verification, FDA generic alternative substitution engine with patient cost savings calculation, and dispense fulfillment logging.
- **Caregiver Portal:** Manage elderly or juvenile dependents, view today's medication timeline, log administered doses, request pharmacy refills, and one-click contact with the primary physician.

### 3. 🧪 Live Clinical Test Drive Bar
- Integrated top toolbar allows instant switching between all 4 personas (**Doctor**, **Patient**, **Pharmacist**, **Caregiver**) and 1-click loading of clinical testing scenarios.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
```
Generates an optimized production bundle in the `dist/` directory.

---

## 📋 Technology Stack
- **Framework:** React 18 with TypeScript
- **Bundler:** Vite 6
- **Styling:** Tailwind CSS v4 & Lucide Icons
- **UI Components:** Radix UI primitives & Sonner notifications
- **QR Engine:** QRCodeSVG (vector level H/M)