import { Doctor, Patient, Pharmacist, Caregiver, Prescription, MedicineReminder } from "../types";

export const DEMO_DOCTOR: Doctor = {
  id: "doc-101",
  name: "Dr. Sarah Johnson, MD",
  email: "dr.johnson@stjudehealth.org",
  role: "doctor",
  medicalCouncilNo: "MC-789421",
  specialization: "Cardiology & Internal Medicine",
  hospitalName: "Metropolitan Academic Medical Center",
  licenseNumber: "MD-LIC-2024-992",
  verified: true,
  department: "Department of Cardiovascular Sciences"
};

export const DEMO_PATIENTS: Patient[] = [
  {
    id: "pat-201",
    name: "Robert Martinez",
    email: "robert.m@gmail.com",
    phone: "+1 (555) 019-2834",
    role: "patient",
    age: 71,
    gender: "male",
    allergies: ["Penicillin"],
    chronicConditions: ["Hypertension", "Atrial Fibrillation", "Type 2 Diabetes"],
    bloodGroup: "O+",
    emergencyContact: {
      name: "Elena Martinez (Daughter / Caregiver)",
      relationship: "Daughter",
      phone: "+1 (555) 019-8877"
    }
  },
  {
    id: "pat-202",
    name: "Emily Watson",
    email: "emily.parent@outlook.com",
    phone: "+1 (555) 014-9921",
    role: "patient",
    age: 9,
    gender: "female",
    allergies: ["Sulfa drugs"],
    chronicConditions: ["Asthma"],
    bloodGroup: "A+"
  }
];

export const DEMO_PHARMACIST: Pharmacist = {
  id: "pharm-301",
  name: "Marcus Vance, PharmD",
  email: "m.vance@apexrx.com",
  role: "pharmacist",
  pharmacyName: "Apex Health Care Pharmacy #402",
  pharmacyLicense: "RPH-55419-STATE",
  pharmacyAddress: "742 Medical Center Blvd, Suite 100",
  verified: true
};

export const DEMO_CAREGIVER: Caregiver = {
  id: "care-401",
  name: "Elena Martinez",
  email: "elena.martinez@familycare.org",
  phone: "+1 (555) 019-8877",
  role: "caregiver",
  relationship: "Daughter & Primary Caregiver",
  assignedPatients: ["pat-201"]
};

export const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    id: "RX-884210",
    date: new Date().toISOString().split("T")[0],
    doctorId: DEMO_DOCTOR.id,
    doctorName: DEMO_DOCTOR.name,
    doctorLicense: DEMO_DOCTOR.licenseNumber,
    hospitalName: DEMO_DOCTOR.hospitalName,
    patientId: DEMO_PATIENTS[0].id,
    patientName: DEMO_PATIENTS[0].name,
    patientPhone: DEMO_PATIENTS[0].phone!,
    patientAge: DEMO_PATIENTS[0].age!,
    patientGender: "male",
    patientAllergies: DEMO_PATIENTS[0].allergies,
    symptoms: "Elevated BP (158/92), chronic palpitations, mild chest heaviness on exertion.",
    diagnosis: "Stage 2 Essential Hypertension & Non-valvular Atrial Fibrillation",
    medicines: [
      {
        id: "m-1",
        name: "Lisinopril 10mg",
        genericName: "Lisinopril",
        dose: "10mg",
        frequency: "Once daily in morning",
        days: 30,
        timing: "before",
        precautions: "Do not use potassium salt substitutes. Report persistent dry cough.",
        category: "ACE Inhibitor"
      },
      {
        id: "m-2",
        name: "Atorvastatin 20mg",
        genericName: "Atorvastatin Calcium",
        dose: "20mg",
        frequency: "Once daily at bedtime",
        days: 30,
        timing: "bedtime",
        precautions: "Strictly avoid grapefruit juice. Report unexplained muscle soreness.",
        category: "Statin"
      },
      {
        id: "m-3",
        name: "Warfarin 5mg",
        genericName: "Warfarin Sodium",
        dose: "5mg",
        frequency: "Once daily in evening",
        days: 30,
        timing: "after",
        precautions: "Keep daily dietary vitamin K consistent. Avoid NSAIDs and Aspirin.",
        category: "Anticoagulant"
      }
    ],
    warnings: [
      {
        type: "food-interaction",
        severity: "medium",
        medicine: "Atorvastatin 20mg",
        message: "Grapefruit Juice CYP3A4 Statin Toxicity Alert",
        mechanism: "Grapefruit compounds inhibit intestinal CYP3A4, causing 2-3x higher blood statin levels."
      }
    ],
    safetyScore: 92,
    status: "active",
    digitalSignature: "SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
  }
];

export const INITIAL_REMINDERS: MedicineReminder[] = [
  {
    id: "rem-1",
    prescriptionId: "RX-884210",
    medicineId: "m-1",
    medicineName: "Lisinopril 10mg",
    dose: "1 tablet (10mg)",
    timeSlot: "morning",
    scheduledTime: "08:00",
    status: "taken",
    date: new Date().toISOString().split("T")[0],
    takenAt: "08:12 AM",
    timingInstruction: "Take on empty stomach 30 mins before breakfast"
  },
  {
    id: "rem-2",
    prescriptionId: "RX-884210",
    medicineId: "m-3",
    medicineName: "Warfarin 5mg",
    dose: "1 tablet (5mg)",
    timeSlot: "evening",
    scheduledTime: "19:00",
    status: "pending",
    date: new Date().toISOString().split("T")[0],
    timingInstruction: "Take with full glass of water after dinner"
  },
  {
    id: "rem-3",
    prescriptionId: "RX-884210",
    medicineId: "m-2",
    medicineName: "Atorvastatin 20mg",
    dose: "1 tablet (20mg)",
    timeSlot: "night",
    scheduledTime: "22:00",
    status: "pending",
    date: new Date().toISOString().split("T")[0],
    timingInstruction: "Take before sleeping"
  }
];

export function initializeDemoData() {
  if (!localStorage.getItem("prescription_ai_initialized")) {
    localStorage.setItem("doctors", JSON.stringify([DEMO_DOCTOR]));
    localStorage.setItem("users", JSON.stringify([
      DEMO_PATIENTS[0],
      DEMO_PATIENTS[1],
      DEMO_PHARMACIST,
      DEMO_CAREGIVER
    ]));
    localStorage.setItem("prescriptions", JSON.stringify(INITIAL_PRESCRIPTIONS));
    localStorage.setItem("reminders", JSON.stringify(INITIAL_REMINDERS));
    localStorage.setItem("prescription_ai_initialized", "true");
  }
}
