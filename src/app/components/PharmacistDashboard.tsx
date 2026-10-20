import { useState, useEffect } from "react";
import { Pharmacist, Prescription } from "../types";
import { QrCode, ShieldCheck, CheckCircle2, AlertTriangle, Search, FileText, Pill, DollarSign, LogOut, Camera, RefreshCw, Printer } from "lucide-react";
import { Logo } from "./Logo";
import { toast } from "sonner";
import { DRUG_FORMULARY } from "../utils/clinicalEngine";

interface PharmacistDashboardProps {
  user: Pharmacist;
  onLogout: () => void;
}

export function PharmacistDashboard({ user, onLogout }: PharmacistDashboardProps) {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [searchRxId, setSearchRxId] = useState("");
  const [selectedRx, setSelectedRx] = useState<Prescription | null>(null);
  const [dispenseNotes, setDispenseNotes] = useState("");
  const [isDispensing, setIsDispensing] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const loadPrescriptions = () => {
    const all: Prescription[] = JSON.parse(localStorage.getItem("prescriptions") || "[]");
    setPrescriptions(all);
    if (all.length > 0 && !selectedRx) {
      setSelectedRx(all[0]);
    }
  };

  const handleLookup = () => {
    if (!searchRxId.trim()) {
      toast.error("Please enter a Prescription ID or phone number");
      return;
    }
    const found = prescriptions.find(
      (p) =>
        p.id.toLowerCase() === searchRxId.toLowerCase().trim() ||
        p.patientPhone.includes(searchRxId.trim())
    );

    if (found) {
      setSelectedRx(found);
      toast.success(`Found Prescription ${found.id} for ${found.patientName || "Patient"}`);
    } else {
      toast.error(`No prescription found matching "${searchRxId}"`);
    }
  };

  const handleSimulateQRScan = (rx: Prescription) => {
    setSelectedRx(rx);
    toast.success(`QR Code Scanned Successfully! Verified ID: ${rx.id}`);
  };

  const handleDispenseMedication = () => {
    if (!selectedRx) return;
    setIsDispensing(true);

    setTimeout(() => {
      const updated = prescriptions.map((p) => {
        if (p.id === selectedRx.id) {
          return {
            ...p,
            status: "dispensed" as const,
            dispensedInfo: {
              dispensedAt: new Date().toLocaleString(),
              pharmacistId: user.id,
              pharmacistName: user.name,
              pharmacyName: user.pharmacyName,
              notes: dispenseNotes || "Verified and dispensed per clinical protocol."
            },
            auditHistory: [
              ...(p.auditHistory || []),
              {
                timestamp: new Date().toISOString(),
                action: "Dispensed Medication to Patient",
                actor: user.name,
                actorRole: "Pharmacist"
              }
            ]
          };
        }
        return p;
      });

      localStorage.setItem("prescriptions", JSON.stringify(updated));
      setPrescriptions(updated);
      setSelectedRx(updated.find((p) => p.id === selectedRx.id) || null);
      setIsDispensing(false);
      toast.success(`Prescription ${selectedRx.id} marked as DISPENSED!`);
    }, 800);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-purple-50/50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Pharmacist Header */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8 border border-white/60">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
                <Pill className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-slate-800">{user.name}</h1>
                  <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">
                    Licensed Pharmacist
                  </span>
                </div>
                <p className="text-sm text-slate-600">{user.pharmacyName}</p>
                <p className="text-xs text-slate-400">License: {user.pharmacyLicense} | Address: {user.pharmacyAddress || "Metro Medical Center"}</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors font-semibold text-sm border border-rose-200"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Verification Workstation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: QR Scanner & Lookup */}
          <div className="space-y-6">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/60">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <QrCode className="w-4 h-4 text-purple-600" />
                Scan or Lookup Prescription
              </h3>

              {/* Manual Lookup */}
              <div className="space-y-3 mb-6">
                <label className="block text-xs font-semibold text-slate-700">Enter RX ID or Patient Phone</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchRxId}
                    onChange={(e) => setSearchRxId(e.target.value)}
                    placeholder="e.g. RX-884210"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none bg-slate-50 font-mono"
                  />
                  <button
                    onClick={handleLookup}
                    className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-md"
                  >
                    <Search className="w-3.5 h-3.5" />
                    Verify
                  </button>
                </div>
              </div>

              {/* Instant QR Simulator */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Quick-Scan from Recent Prescriptions:
                </label>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {prescriptions.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSimulateQRScan(p)}
                      className={`w-full text-left p-3 rounded-2xl border text-xs transition-all flex items-center justify-between ${
                        selectedRx?.id === p.id
                          ? "bg-purple-50 border-purple-400 text-purple-900 shadow-sm"
                          : "bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      <div>
                        <div className="font-bold flex items-center gap-1.5 font-mono">
                          <QrCode className="w-3.5 h-3.5 text-purple-600" />
                          {p.id}
                        </div>
                        <p className="text-[11px] text-slate-500">{p.patientName || "Patient"} • {p.patientPhone}</p>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          p.status === "dispensed"
                            ? "bg-slate-200 text-slate-600"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {p.status === "dispensed" ? "Dispensed" : "Ready"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right 2 Columns: Prescription Verification & Dispensing Panel */}
          <div className="lg:col-span-2 space-y-6">
            {selectedRx ? (
              <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8 border border-white/60 space-y-6">
                {/* Status & Authenticity Badge */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-slate-800 font-mono">{selectedRx.id}</h2>
                        <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Digitally Validated
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Prescribed by: <span className="font-semibold">{selectedRx.doctorName}</span> ({selectedRx.hospitalName})
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Date of Issue</span>
                    <span className="text-sm font-bold text-slate-800">{selectedRx.date}</span>
                  </div>
                </div>

                {/* Patient Information */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block font-semibold">Patient Name</span>
                    <span className="text-slate-800 font-bold">{selectedRx.patientName || "Robert Martinez"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Phone</span>
                    <span className="text-slate-800 font-mono font-bold">{selectedRx.patientPhone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Age / Gender</span>
                    <span className="text-slate-800 font-bold">{selectedRx.patientAge} yrs / {selectedRx.patientGender}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Known Allergies</span>
                    <span className="text-rose-600 font-bold">
                      {selectedRx.patientAllergies?.length ? selectedRx.patientAllergies.join(", ") : "None reported"}
                    </span>
                  </div>
                </div>

                {/* Safety Warning Review */}
                {selectedRx.warnings && selectedRx.warnings.length > 0 && (
                  <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-300 space-y-2">
                    <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      Prescription Safety Warnings ({selectedRx.warnings.length})
                    </div>
                    {selectedRx.warnings.map((w, i) => (
                      <div key={i} className="text-xs text-amber-900 font-medium pl-6">
                        • <span className="font-bold">{w.medicine}:</span> {w.message}
                      </div>
                    ))}
                  </div>
                )}

                {/* Prescribed Medications & Generic Alternatives Engine */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <Pill className="w-4 h-4 text-purple-600" />
                    Dispensing Items & Bioequivalent Generic Alternatives
                  </h3>

                  <div className="space-y-3">
                    {selectedRx.medicines.map((m) => {
                      const formularyMatch = DRUG_FORMULARY.find((d) =>
                        m.name.toLowerCase().includes(d.name.toLowerCase()) ||
                        m.name.toLowerCase().includes(d.genericName.toLowerCase())
                      );

                      return (
                        <div
                          key={m.id}
                          className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-purple-300 transition-all space-y-2"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <p className="font-bold text-slate-800 text-sm">{m.name}</p>
                              <p className="text-xs text-slate-500">
                                Dose: <span className="font-semibold text-slate-700">{m.dose}</span> • Duration:{" "}
                                <span className="font-semibold text-slate-700">{m.days} days</span> • Timing:{" "}
                                <span className="capitalize font-semibold text-slate-700">{m.timing} food</span>
                              </p>
                            </div>
                            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-xl text-xs font-semibold">
                              {m.category || "General"}
                            </span>
                          </div>

                          {m.precautions && (
                            <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-xl">
                              ⚠️ <span className="font-semibold">Patient Precaution:</span> {m.precautions}
                            </p>
                          )}

                          {/* Generic Alternative Cost Comparison Card */}
                          {formularyMatch?.costIndex && (
                            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 text-emerald-900">
                                <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
                                <div>
                                  <span className="font-bold">FDA Generic Available:</span> {formularyMatch.genericName}
                                  <span className="text-[11px] text-emerald-700 block">
                                    Brand: ${formularyMatch.costIndex.brandPrice} ➔ Generic: ${formularyMatch.costIndex.genericPrice}
                                  </span>
                                </div>
                              </div>
                              <span className="px-2 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold shrink-0">
                                Save {Math.round((1 - formularyMatch.costIndex.genericPrice / formularyMatch.costIndex.brandPrice) * 100)}%
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dispensing Actions */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  {selectedRx.status === "dispensed" ? (
                    <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-center space-y-1">
                      <div className="flex items-center justify-center gap-1.5 text-slate-700 font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        This prescription has already been dispensed
                      </div>
                      <p className="text-xs text-slate-500">
                        Dispensed at: {selectedRx.dispensedInfo?.dispensedAt || "Recently"} by {selectedRx.dispensedInfo?.pharmacistName}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-3">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Pharmacist Dispensing Notes</label>
                        <input
                          type="text"
                          value={dispenseNotes}
                          onChange={(e) => setDispenseNotes(e.target.value)}
                          placeholder="e.g. Batch verified, patient counseled regarding food precautions."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none bg-slate-50"
                        />
                      </div>

                      <button
                        onClick={handleDispenseMedication}
                        disabled={isDispensing}
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>{isDispensing ? "Dispensing & Signing..." : "Confirm Dispensing & Sign Fulfillment"}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-12 border border-white/60 text-center text-slate-400">
                <QrCode className="w-16 h-16 mx-auto mb-3 opacity-30 text-purple-600" />
                <h3 className="text-lg font-bold text-slate-700 mb-1">No Prescription Selected</h3>
                <p className="text-xs">Scan a QR code or pick a prescription on the left to review and dispense.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
