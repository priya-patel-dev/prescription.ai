export type UserRole = "doctor" | "patient" | "pharmacist" | "caregiver" | null;

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  password?: string;
  avatarUrl?: string;
}

export interface Doctor extends BaseUser {
  role: "doctor";
  medicalCouncilNo: string;
  specialization: string;
  hospitalName: string;
  licenseNumber: string;
  verified: boolean;
  department?: string;
}

export interface Patient extends BaseUser {
  role: "patient";
  dateOfBirth?: string;
  age?: number;
  gender?: "male" | "female" | "other";
  allergies: string[];
  chronicConditions?: string[];
  bloodGroup?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface Pharmacist extends BaseUser {
  role: "pharmacist";
  pharmacyName: string;
  pharmacyLicense: string;
  pharmacyAddress?: string;
  verified: boolean;
}

export interface Caregiver extends BaseUser {
  role: "caregiver";
  relationship: string;
  assignedPatients: string[]; // Patient IDs
}

export type User = Doctor | Patient | Pharmacist | Caregiver;

export interface Medicine {
  id: string;
  name: string;
  genericName?: string;
  dose: string; // e.g. "500mg" or "1-0-1"
  frequency?: string; // e.g. "Twice daily"
  days: number;
  timing: "before" | "after" | "with-food" | "bedtime";
  route?: "oral" | "topical" | "inhalation" | "injection";
  precautions?: string;
  category?: string;
  instructions?: string;
}

export type WarningSeverity = "critical" | "high" | "medium" | "low";
export type WarningType = 
  | "interaction" 
  | "age-risk" 
  | "gender-risk" 
  | "allergy" 
  | "dosage-overdose" 
  | "mismatch" 
  | "beers-criteria" 
  | "food-interaction";

export interface ClinicalWarning {
  type: WarningType;
  severity: WarningSeverity;
  message: string;
  medicine: string;
  recommendation?: string;
  mechanism?: string;
}

export interface Prescription {
  id: string;
  date: string;
  doctorId: string;
  doctorName: string;
  doctorLicense?: string;
  hospitalName: string;
  patientId?: string;
  patientName?: string;
  patientPhone: string;
  patientAge: number;
  patientGender: "male" | "female" | "other";
  patientAllergies?: string[];
  symptoms: string;
  diagnosis?: string;
  medicines: Medicine[];
  warnings: ClinicalWarning[];
  safetyScore: number; // 0 - 100
  qrCode?: string;
  digitalSignature?: string;
  status: "active" | "dispensed" | "cancelled" | "expired";
  dispensedInfo?: {
    dispensedAt: string;
    pharmacistId: string;
    pharmacistName: string;
    pharmacyName: string;
    notes?: string;
    genericSubstitutions?: string[];
  };
  auditHistory?: Array<{
    timestamp: string;
    action: string;
    actor: string;
    actorRole: string;
  }>;
}

export interface MedicineReminder {
  id: string;
  prescriptionId: string;
  medicineId: string;
  medicineName: string;
  dose: string;
  timeSlot: "morning" | "afternoon" | "evening" | "night";
  scheduledTime: string; // HH:mm
  status: "pending" | "taken" | "delayed" | "missed";
  date: string;
  takenAt?: string;
  timingInstruction?: string;
}

export interface DrugKnowledge {
  id: string;
  name: string;
  genericName: string;
  brandNames: string[];
  category: string;
  standardDoses: string[];
  maxDailyDoseMg: number;
  standardTiming: "before" | "after" | "with-food" | "bedtime";
  commonIndications: string[];
  contraindications: string[];
  foodInteractions: string[];
  sideEffects: string[];
  pediatricSafe: boolean;
  geriatricPrecaution: boolean;
  pregnancyRiskCategory: "A" | "B" | "C" | "D" | "X";
  costIndex?: {
    brandPrice: number;
    genericPrice: number;
  };
}
