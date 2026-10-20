import { useState, useEffect, useMemo } from "react";
import { Doctor, Medicine, Prescription, ClinicalWarning } from "../types";
import { ArrowLeft, Plus, Trash2, AlertTriangle, ShieldCheck, ShieldAlert, Sparkles, CheckCircle2, Search, Info, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { PrescriptionDetailsScreen } from "./PrescriptionDetailsScreen";
import { evaluatePrescriptionSafety, searchDrugs, findDrugInFormulary, DRUG_FORMULARY } from "../utils/clinicalEngine";

interface NewPrescriptionScreenProps {
  doctor: Doctor;
  onBack: () => void;
}

type PrescriptionView = "form" | "details";

export function NewPrescriptionScreen({ doctor, onBack }: NewPrescriptionScreenProps) {
  const [currentView, setCurrentView] = useState<PrescriptionView>("form");
  const [generatedPrescription, setGeneratedPrescription] = useState<Prescription | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    patientName: "Robert Martinez",
    patientPhone: "+1 (555) 019-2834",
    patientAge: "71",
    patientGender: "male" as "male" | "female" | "other",
    allergies: "Penicillin",
    symptoms: "Stage 2 Hypertension, palpitations, elevated LDL",
    diagnosis: "Essential Hypertension & Dyslipidemia"
  });

  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: "med-1",
      name: "Lisinopril 10mg",
      genericName: "Lisinopril",
      dose: "10mg",
      frequency: "Once daily in morning",
      days: 30,
      timing: "before",
      precautions: "Avoid potassium supplements or excessive bananas",
      category: "ACE Inhibitor"
    },
    {
      id: "med-2",
      name: "Atorvastatin 20mg",
      genericName: "Atorvastatin Calcium",
      dose: "20mg",
      frequency: "Once daily at bedtime",
      days: 30,
      timing: "bedtime",
      precautions: "Avoid grapefruit juice",
      category: "Statin"
    }
  ]);

  // Drug auto-complete search state
  const [activeSearchIndex, setActiveSearchIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(() => {
    return searchDrugs(searchQuery);
  }, [searchQuery]);

  // Live real-time Clinical AI Evaluation
  const clinicalEvaluation = useMemo(() => {
    const ageNum = parseInt(formData.patientAge) || 30;
    const allergiesArray = formData.allergies
      ? formData.allergies.split(",").map(a => a.trim()).filter(Boolean)
      : [];

    return evaluatePrescriptionSafety(
      {
        age: ageNum,
        gender: formData.patientGender,
        allergies: allergiesArray,
        symptoms: formData.symptoms
      },
      medicines.filter(m => m.name.trim().length > 0)
    );
  }, [formData, medicines]);

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleMedicineChange = (id: string, field: keyof Medicine, value: any) => {
    setMedicines(medicines.map((med) =>
      med.id === id ? { ...med, [field]: value } : med
    ));
  };

  const handleSelectDrugSuggestion = (index: number, drug: typeof DRUG_FORMULARY[0]) => {
    const updated = [...medicines];
    updated[index] = {
      ...updated[index],
      name: `${drug.name} ${drug.standardDoses[0] || ""}`,
      genericName: drug.genericName,
      dose: drug.standardDoses[0] || "1 tablet",
      timing: drug.standardTiming,
      precautions: drug.foodInteractions[0] || "Take as directed",
      category: drug.category
    };
    setMedicines(updated);
    setActiveSearchIndex(null);
    setSearchQuery("");
    toast.success(`Selected ${drug.name} (${drug.category})`);
  };

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      {
        id: `med-${Date.now()}`,
        name: "",
        genericName: "",
        dose: "1 tablet",
        frequency: "Once daily",
        days: 14,
        timing: "after",
        precautions: "",
        category: "General"
      }
    ]);
  };

  const removeMedicine = (id: string) => {
    if (medicines.length === 1) {
      toast.error("Prescription must contain at least one medicine");
      return;
    }
    setMedicines(medicines.filter((med) => med.id !== id));
  };

  // Preset Clinical Scenarios for Testing
  const loadScenario = (type: "cardiac" | "interaction" | "pediatric" | "allergy") => {
    if (type === "cardiac") {
      setFormData({
        patientName: "Robert Martinez",
        patientPhone: "+1 (555) 019-2834",
        patientAge: "71",
        patientGender: "male",
        allergies: "Sulfa",
        symptoms: "Stage 2 Hypertension, palpitations, elevated LDL",
        diagnosis: "Essential Hypertension & Dyslipidemia"
      });
      setMedicines([
        {
          id: "c1",
          name: "Lisinopril 10mg",
          genericName: "Lisinopril",
          dose: "10mg",
          frequency: "Once daily morning",
          days: 30,
          timing: "before",
          precautions: "Avoid potassium substitutes",
          category: "ACE Inhibitor"
        },
        {
          id: "c2",
          name: "Atorvastatin 20mg",
          genericName: "Atorvastatin Calcium",
          dose: "20mg",
          frequency: "Bedtime",
          days: 30,
          timing: "bedtime",
          precautions: "Avoid grapefruit juice",
          category: "Statin"
        }
      ]);
      toast.success("Loaded Scenario: Elderly Cardiac Patient (Optimal Safety Score)");
    } else if (type === "interaction") {
      setFormData({
        patientName: "Arthur Vance",
        patientPhone: "+1 (555) 019-3311",
        patientAge: "68",
        patientGender: "male",
        allergies: "None",
        symptoms: "Deep Vein Thrombosis & acute knee osteoarthritis pain",
        diagnosis: "DVT & Acute Knee Arthritis"
      });
      setMedicines([
        {
          id: "i1",
          name: "Warfarin 5mg",
          genericName: "Warfarin Sodium",
          dose: "5mg",
          frequency: "Evening",
          days: 30,
          timing: "after",
          precautions: "INR monitoring required",
          category: "Anticoagulant"
        },
        {
          id: "i2",
          name: "Aspirin 325mg",
          genericName: "Acetylsalicylic Acid",
          dose: "325mg",
          frequency: "Twice daily",
          days: 7,
          timing: "after",
          precautions: "Take with food",
          category: "NSAID"
        }
      ]);
      toast.warning("Loaded Scenario: Critical Drug-Drug Interaction (Warfarin + Aspirin)");
    } else if (type === "pediatric") {
      setFormData({
        patientName: "Emily Watson",
        patientPhone: "+1 (555) 014-9921",
        patientAge: "9",
        patientGender: "female",
        allergies: "None",
        symptoms: "Acute high fever (102.5°F), body ache, flu symptoms",
        diagnosis: "Viral Influenza A"
      });
      setMedicines([
        {
          id: "p1",
          name: "Aspirin 150mg",
          genericName: "Acetylsalicylic Acid",
          dose: "150mg",
          frequency: "Twice daily",
          days: 3,
          timing: "after",
          precautions: "Fever relief",
          category: "NSAID"
        }
      ]);
      toast.error("Loaded Scenario: Pediatric Contraindication (Aspirin < 16 yrs)");
    } else if (type === "allergy") {
      setFormData({
        patientName: "James Miller",
        patientPhone: "+1 (555) 012-7744",
        patientAge: "42",
        patientGender: "male",
        allergies: "Penicillin",
        symptoms: "Severe bacterial sinusitis with facial pressure",
        diagnosis: "Acute Maxillary Sinusitis"
      });
      setMedicines([
        {
          id: "a1",
          name: "Amoxicillin 500mg",
          genericName: "Amoxicillin",
          dose: "500mg",
          frequency: "Three times daily",
          days: 10,
          timing: "after",
          precautions: "Finish full course",
          category: "Penicillin"
        }
      ]);
      toast.error("Loaded Scenario: Documented Penicillin Allergy Conflict");
    }
  };

  const handleGeneratePrescription = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.patientName || !formData.patientPhone || !formData.patientAge || !formData.symptoms) {
      toast.error("Please fill in all required patient fields");
      return;
    }

    if (medicines.some((med) => !med.name.trim())) {
      toast.error("Please provide medication names for all rows");
      return;
    }

    const ageNum = parseInt(formData.patientAge);
    if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
      toast.error("Please enter a valid age between 1 and 120");
      return;
    }

    const { warnings, safetyScore } = clinicalEvaluation;

    // Build prescription object
    const newPrescription: Prescription = {
      id: `RX-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split("T")[0],
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorLicense: doctor.licenseNumber,
      hospitalName: doctor.hospitalName,
      patientName: formData.patientName,
      patientPhone: formData.patientPhone,
      patientAge: ageNum,
      patientGender: formData.patientGender,
      patientAllergies: formData.allergies ? formData.allergies.split(",").map(a => a.trim()).filter(Boolean) : [],
      symptoms: formData.symptoms,
      diagnosis: formData.diagnosis,
      medicines: medicines,
      warnings: warnings,
      safetyScore: safetyScore,
      status: "active",
      digitalSignature: `SHA256:${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`,
      auditHistory: [
        {
          timestamp: new Date().toISOString(),
          action: "Prescription Created & Signed",
          actor: doctor.name,
          actorRole: "Doctor"
        }
      ]
    };

    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem("prescriptions") || "[]");
    saved.unshift(newPrescription);
    localStorage.setItem("prescriptions", JSON.stringify(saved));

    if (warnings.some(w => w.severity === "critical")) {
      toast.warning("Prescription generated with CRITICAL safety warnings!");
    } else {
      toast.success("Prescription generated & digitally verified!");
    }

    setGeneratedPrescription(newPrescription);
    setCurrentView("details");
  };

  if (currentView === "details" && generatedPrescription) {
    return (
      <PrescriptionDetailsScreen
        prescription={generatedPrescription}
        onBack={() => {
          setCurrentView("form");
          onBack();
        }}
      />
    );
  }

  const { warnings, safetyScore, recommendations, summary } = clinicalEvaluation;
  const criticalCount = warnings.filter(w => w.severity === "critical").length;
  const highCount = warnings.filter(w => w.severity === "high").length;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-50 via-blue-50/40 to-teal-50/30">
      <div className="max-w-5xl mx-auto">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          {/* Preset Buttons for Instant Clinical Testing */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-500 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Presets:
            </span>
            <button
              type="button"
              onClick={() => loadScenario("cardiac")}
              className="px-2.5 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg font-medium hover:bg-emerald-100 transition-colors"
            >
              Safe Cardiac
            </button>
            <button
              type="button"
              onClick={() => loadScenario("interaction")}
              className="px-2.5 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg font-medium hover:bg-rose-100 transition-colors"
            >
              DDI: Warfarin + Aspirin
            </button>
            <button
              type="button"
              onClick={() => loadScenario("pediatric")}
              className="px-2.5 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg font-medium hover:bg-amber-100 transition-colors"
            >
              Pediatric Alert
            </button>
            <button
              type="button"
              onClick={() => loadScenario("allergy")}
              className="px-2.5 py-1.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg font-medium hover:bg-purple-100 transition-colors"
            >
              Penicillin Allergy
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT 2 COLS: The Clinical Prescription Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8 border border-white/60">
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">New Clinical Prescription</h1>
                  <p className="text-sm text-slate-500">
                    Prescriber: <span className="font-semibold text-blue-600">Dr. {doctor.name}</span> ({doctor.specialization})
                  </p>
                </div>
                <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-200">
                  {doctor.hospitalName}
                </div>
              </div>

              <form onSubmit={handleGeneratePrescription} className="space-y-6">
                {/* Patient Demographics Card */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Patient Demographics & Medical Profile
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Patient Full Name *</label>
                      <input
                        type="text"
                        value={formData.patientName}
                        onChange={(e) => handleInputChange("patientName", e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50"
                        placeholder="e.g. Robert Martinez"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (SMS / Rx Link) *</label>
                      <input
                        type="tel"
                        value={formData.patientPhone}
                        onChange={(e) => handleInputChange("patientPhone", e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50"
                        placeholder="+1 (555) 019-2834"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Age (Years) *</label>
                        <input
                          type="number"
                          value={formData.patientAge}
                          onChange={(e) => handleInputChange("patientAge", e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50"
                          placeholder="e.g. 71"
                          required
                          min="0"
                          max="125"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Gender *</label>
                        <select
                          value={formData.patientGender}
                          onChange={(e) => handleInputChange("patientGender", e.target.value as any)}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Clinical Allergies & Diagnosis */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Known Drug Allergies <span className="text-rose-500 font-normal">(Comma-separated)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.allergies}
                        onChange={(e) => handleInputChange("allergies", e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none bg-rose-50/30 text-rose-900"
                        placeholder="e.g. Penicillin, Sulfa, NSAIDs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Clinical Diagnosis / Working Assessment</label>
                      <input
                        type="text"
                        value={formData.diagnosis}
                        onChange={(e) => handleInputChange("diagnosis", e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50"
                        placeholder="e.g. Stage 2 Essential Hypertension"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Presenting Symptoms & Vitals *</label>
                    <textarea
                      value={formData.symptoms}
                      onChange={(e) => handleInputChange("symptoms", e.target.value)}
                      rows={2}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50"
                      placeholder="e.g. Elevated BP (158/92), chronic palpitations, mild chest heaviness on exertion"
                      required
                    />
                  </div>
                </div>

                {/* Medication Items */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                      Rx Prescribed Medications ({medicines.length})
                    </h3>
                    <button
                      type="button"
                      onClick={addMedicine}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Medication
                    </button>
                  </div>

                  <div className="space-y-4">
                    {medicines.map((med, index) => (
                      <div
                        key={med.id}
                        className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 relative hover:border-slate-300 transition-all"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-slate-500">
                            #{index + 1} Medication Item
                          </span>
                          {medicines.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeMedicine(med.id)}
                              className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                              title="Remove medication"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {/* Drug Name with Live Auto-complete */}
                          <div className="md:col-span-2 relative">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Drug Name & Strength *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={med.name}
                                onChange={(e) => {
                                  handleMedicineChange(med.id, "name", e.target.value);
                                  setSearchQuery(e.target.value);
                                  setActiveSearchIndex(index);
                                }}
                                onFocus={() => {
                                  setSearchQuery(med.name);
                                  setActiveSearchIndex(index);
                                }}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium"
                                placeholder="Type drug name (e.g. Warfarin, Amoxicillin, Lisinopril)..."
                                required
                              />
                              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                            </div>

                            {/* Dropdown Suggestions */}
                            {activeSearchIndex === index && searchResults.length > 0 && (
                              <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden divide-y divide-slate-100 max-h-60 overflow-y-auto">
                                <div className="px-3 py-1.5 bg-slate-100/70 text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                                  Clinical Formulary Match ({searchResults.length})
                                </div>
                                {searchResults.map((drug) => (
                                  <button
                                    key={drug.id}
                                    type="button"
                                    onClick={() => handleSelectDrugSuggestion(index, drug)}
                                    className="w-full text-left px-4 py-2.5 hover:bg-blue-50/80 transition-colors flex items-center justify-between"
                                  >
                                    <div>
                                      <p className="text-sm font-bold text-slate-800">{drug.name} <span className="text-xs text-slate-500 font-normal">({drug.category})</span></p>
                                      <p className="text-xs text-slate-500">Standard Doses: {drug.standardDoses.join(", ")} | Max: {drug.maxDailyDoseMg}mg/day</p>
                                    </div>
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Select</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Dose */}
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Dosage Schedule
                            </label>
                            <input
                              type="text"
                              value={med.dose}
                              onChange={(e) => handleMedicineChange(med.id, "dose", e.target.value)}
                              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                              placeholder="e.g. 10mg or 1-0-1"
                            />
                          </div>
                        </div>

                        {/* Frequency, Duration, Timing */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Duration (Days)</label>
                            <input
                              type="number"
                              value={med.days}
                              onChange={(e) => handleMedicineChange(med.id, "days", parseInt(e.target.value) || 1)}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                              min="1"
                              max="365"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Food Timing</label>
                            <select
                              value={med.timing}
                              onChange={(e) => handleMedicineChange(med.id, "timing", e.target.value as any)}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                            >
                              <option value="after">After Food (Post-prandial)</option>
                              <option value="before">Before Food (Empty stomach)</option>
                              <option value="with-food">With Food / Milk</option>
                              <option value="bedtime">Bedtime</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Precautions / Notes</label>
                            <input
                              type="text"
                              value={med.precautions || ""}
                              onChange={(e) => handleMedicineChange(med.id, "precautions", e.target.value)}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                              placeholder="e.g. Avoid grapefruit juice"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-base shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>Generate & Digitally Sign Prescription</span>
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-2">
                    Digital signature SHA-256 seal will be embedded with QR verification for pharmacy dispensing.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT COL: Real-time Live Clinical AI Safety Assistant */}
          <div className="space-y-6">
            {/* Live Safety Alignment Score Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/60 sticky top-16">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  Live AI Clinical Guard
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 ${
                    safetyScore >= 90
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : safetyScore >= 70
                      ? "bg-amber-100 text-amber-800 border border-amber-300"
                      : "bg-rose-100 text-rose-800 border border-rose-300 animate-pulse"
                  }`}
                >
                  {safetyScore >= 90 ? (
                    <ShieldCheck className="w-3.5 h-3.5" />
                  ) : (
                    <ShieldAlert className="w-3.5 h-3.5" />
                  )}
                  {safetyScore}% Alignment
                </span>
              </div>

              {/* Score Meter Visual */}
              <div className="text-center py-4 bg-slate-50 rounded-2xl border border-slate-100 mb-4">
                <div className="text-4xl font-black text-slate-800 mb-1">
                  {safetyScore}
                  <span className="text-lg font-bold text-slate-400">/100</span>
                </div>
                <p className="text-xs font-medium text-slate-500">{summary}</p>
              </div>

              {/* Breakdown metrics */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs mb-4">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="block font-black text-lg text-rose-600">{criticalCount}</span>
                  <span className="text-slate-500">Critical Risks</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="block font-black text-lg text-amber-600">{highCount}</span>
                  <span className="text-slate-500">Major Warnings</span>
                </div>
              </div>

              {/* Real-time Warning Cards */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {warnings.length === 0 ? (
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-800 text-xs">
                    <div className="flex items-center gap-2 font-bold mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      All Clinical Checks Passed
                    </div>
                    No drug interactions, pediatric risks, or allergy conflicts identified in the current regimen.
                  </div>
                ) : (
                  warnings.map((w, i) => (
                    <div
                      key={i}
                      className={`p-3.5 rounded-2xl border text-xs space-y-1.5 transition-all ${
                        w.severity === "critical"
                          ? "bg-rose-50/90 border-rose-300 text-rose-900"
                          : w.severity === "high"
                          ? "bg-amber-50/90 border-amber-300 text-amber-900"
                          : "bg-blue-50/90 border-blue-200 text-blue-900"
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span className="flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {w.type} ({w.severity})
                        </span>
                        <span className="font-semibold text-slate-700">{w.medicine}</span>
                      </div>
                      <p className="font-bold text-slate-900">{w.message}</p>
                      {w.mechanism && (
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          <span className="font-semibold">Mechanism:</span> {w.mechanism}
                        </p>
                      )}
                      {w.recommendation && (
                        <div className="mt-1.5 pt-1.5 border-t border-slate-200/60 font-medium text-[11px] text-emerald-800 bg-emerald-50/60 p-2 rounded-xl">
                          💡 <span className="font-bold">Recommendation:</span> {w.recommendation}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
