import { useState, useEffect } from "react";
import { Doctor, Prescription } from "../types";
import { LogOut, Plus, FileText, Users, ShieldCheck, Clock, Eye, Printer, Search } from "lucide-react";
import { Logo } from "./Logo";
import { NewPrescriptionScreen } from "./NewPrescriptionScreen";
import { PrescriptionDetailsScreen } from "./PrescriptionDetailsScreen";

interface DoctorDashboardProps {
  user: Doctor;
  onLogout: () => void;
}

type DoctorView = "dashboard" | "new-prescription" | "view-details";

export function DoctorDashboard({ user, onLogout }: DoctorDashboardProps) {
  const [currentView, setCurrentView] = useState<DoctorView>("dashboard");
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("prescriptions") || "[]");
    setPrescriptions(all);
  }, [currentView]);

  if (currentView === "new-prescription") {
    return (
      <NewPrescriptionScreen
        doctor={user}
        onBack={() => setCurrentView("dashboard")}
      />
    );
  }

  if (currentView === "view-details" && selectedPrescription) {
    return (
      <PrescriptionDetailsScreen
        prescription={selectedPrescription}
        onBack={() => {
          setSelectedPrescription(null);
          setCurrentView("dashboard");
        }}
      />
    );
  }

  // Calculate doctor metrics
  const totalPrescriptions = prescriptions.length;
  const uniquePatients = new Set(prescriptions.map((p) => p.patientPhone)).size;
  const avgSafetyScore =
    totalPrescriptions > 0
      ? Math.round(
          prescriptions.reduce((acc, p) => acc + (p.safetyScore || 100), 0) /
            totalPrescriptions
        )
      : 100;

  const filteredPrescriptions = prescriptions.filter(
    (p) =>
      p.patientName?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.patientPhone.includes(searchFilter) ||
      p.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.symptoms.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-50/50 via-white to-teal-50/30">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Doctor Header Profile */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 md:p-8 border border-white/60">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Logo size="sm" showText={false} />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-slate-800">{user.name}</h1>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                    Licensed & Verified
                  </span>
                </div>
                <p className="text-sm text-slate-600">{user.specialization} • {user.department || "Cardiovascular Sciences"}</p>
                <p className="text-xs text-slate-500">{user.hospitalName} | Reg: {user.medicalCouncilNo}</p>
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

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider">Total Prescriptions</span>
                <FileText className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-3xl font-black text-slate-800">{totalPrescriptions}</p>
              <p className="text-xs text-slate-400 mt-0.5">Digitally signed & hashed</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider">Registered Patients</span>
                <Users className="w-4 h-4 text-teal-500" />
              </div>
              <p className="text-3xl font-black text-slate-800">{uniquePatients}</p>
              <p className="text-xs text-slate-400 mt-0.5">Active under care</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider">AI Safety Index</span>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-3xl font-black text-emerald-700">{avgSafetyScore}%</p>
              <p className="text-xs text-slate-400 mt-0.5">Clinical regimen adherence</p>
            </div>
          </div>
        </div>

        {/* Action Banner to Generate New Prescription */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl shadow-xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-bold">Write AI-Validated Digital Prescription</h2>
            <p className="text-blue-100 text-sm max-w-xl">
              Automatic drug-drug interaction detection, pediatric/geriatric Beers criteria checks, allergy cross-reactivity, and QR verification for pharmacy dispensing.
            </p>
          </div>

          <button
            onClick={() => setCurrentView("new-prescription")}
            className="flex items-center gap-2 px-6 py-4 bg-white text-blue-700 rounded-2xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all text-sm shrink-0"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Prescription</span>
          </button>
        </div>

        {/* Clinical History & Recent Prescriptions */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 md:p-8 border border-white/60 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Recent Prescriptions Ledger</h3>
              <p className="text-xs text-slate-500">History of generated clinical regimens and their dispensing status</p>
            </div>

            {/* Search Filter */}
            <div className="relative">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search patient, symptoms, Rx ID..."
                className="px-4 py-2 pl-9 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none w-64 bg-slate-50"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {filteredPrescriptions.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold">No prescriptions found</p>
              <p className="text-xs">Click "Create New Prescription" above to write your first prescription.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredPrescriptions.map((rx) => (
                <div
                  key={rx.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 p-3 rounded-2xl transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-800 text-sm">
                        {rx.patientName || "Patient"}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        ({rx.patientPhone})
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                        {rx.id}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                          rx.safetyScore >= 90
                            ? "bg-emerald-100 text-emerald-800"
                            : rx.safetyScore >= 70
                            ? "bg-amber-100 text-amber-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {rx.safetyScore}% Safety
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-1">
                      <span className="font-semibold text-slate-700">Diagnosis:</span> {rx.diagnosis || rx.symptoms}
                    </p>

                    <p className="text-xs text-slate-500">
                      Medicines ({rx.medicines.length}): {rx.medicines.map((m) => m.name).join(", ")}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setSelectedPrescription(rx);
                        setCurrentView("view-details");
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View & Print
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
