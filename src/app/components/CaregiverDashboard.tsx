import { useState, useEffect } from "react";
import { Caregiver, Prescription, MedicineReminder } from "../types";
import { HeartHandshake, LogOut, Bell, Clock, CheckCircle2, AlertCircle, Phone, MessageSquare, ShieldCheck, UserCheck, Calendar } from "lucide-react";
import { toast } from "sonner";

interface CaregiverDashboardProps {
  user: Caregiver;
  onLogout: () => void;
}

export function CaregiverDashboard({ user, onLogout }: CaregiverDashboardProps) {
  const [reminders, setReminders] = useState<MedicineReminder[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [activeDependent, setActiveDependent] = useState({
    name: "Robert Martinez (Father)",
    age: 71,
    phone: "+1 (555) 019-2834",
    conditions: ["Hypertension", "Atrial Fibrillation", "Type 2 Diabetes"],
    doctor: "Dr. Sarah Johnson, MD",
    doctorPhone: "+1 (555) 019-4400"
  });

  useEffect(() => {
    const allReminders: MedicineReminder[] = JSON.parse(localStorage.getItem("reminders") || "[]");
    setReminders(allReminders);

    const allPrescriptions: Prescription[] = JSON.parse(localStorage.getItem("prescriptions") || "[]");
    setPrescriptions(allPrescriptions);
  }, []);

  const handleMarkGiven = (reminderId: string) => {
    const updated = reminders.map((r) => {
      if (r.id === reminderId) {
        return {
          ...r,
          status: "taken" as const,
          takenAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };
      }
      return r;
    });

    setReminders(updated);
    localStorage.setItem("reminders", JSON.stringify(updated));
    toast.success("Dose verified & logged as administered by Caregiver!");
  };

  const handleRequestRefill = () => {
    toast.success("Prescription refill request sent to Apex Health Care Pharmacy!");
  };

  // Metrics
  const totalReminders = reminders.length;
  const takenCount = reminders.filter((r) => r.status === "taken").length;
  const adherencePct = totalReminders > 0 ? Math.round((takenCount / totalReminders) * 100) : 0;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Caregiver Header */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8 border border-white/60">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-200">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-slate-800">{user.name}</h1>
                  <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                    Authorized Caregiver
                  </span>
                </div>
                <p className="text-sm text-slate-600">{user.relationship} • Managing: <span className="font-semibold text-slate-800">{activeDependent.name}</span></p>
                <p className="text-xs text-slate-400">HIPAA Consented Family Access Portal</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-100">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Today's Adherence Rate
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-amber-600">{adherencePct}%</span>
                <span className="text-xs text-slate-400">({takenCount}/{totalReminders} taken)</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Active Regimens
              </span>
              <p className="text-3xl font-black text-slate-800">{prescriptions.length}</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Primary Prescriber
              </span>
              <p className="text-sm font-bold text-slate-800">{activeDependent.doctor}</p>
              <p className="text-xs text-slate-500">{activeDependent.doctorPhone}</p>
            </div>
          </div>
        </div>

        {/* Managed Patient Care Card & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Dependent Details & Emergency Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/60 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-amber-600" />
                Dependent Medical Profile
              </h3>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold">Name & Age</span>
                  <p className="text-slate-800 font-bold text-sm">{activeDependent.name}</p>
                  <p className="text-slate-500">{activeDependent.age} Years Old • Male</p>
                </div>

                <div>
                  <span className="text-slate-400 block font-semibold">Chronic Conditions</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {activeDependent.conditions.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block font-semibold">Allergies</span>
                  <span className="text-rose-600 font-bold">Penicillin (Severe)</span>
                </div>
              </div>

              {/* Emergency & Quick Communication */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Quick Actions
                </span>

                <button
                  onClick={() => toast.info(`Dialing primary doctor: ${activeDependent.doctorPhone}`)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" /> Call Prescribing Doctor
                  </span>
                  <span>{activeDependent.doctorPhone}</span>
                </button>

                <button
                  onClick={handleRequestRefill}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition-colors"
                >
                  <Clock className="w-3.5 h-3.5" /> Request Pharmacy Refill
                </button>
              </div>
            </div>
          </div>

          {/* Right 2 Columns: Today's Pill Schedule & Adherence Verification */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8 border border-white/60 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Today's Medication Tracker</h3>
                  <p className="text-xs text-slate-500">Track doses administered to {activeDependent.name}</p>
                </div>
                <span className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-bold border border-amber-200">
                  {new Date().toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}
                </span>
              </div>

              <div className="space-y-3">
                {reminders.map((rem) => (
                  <div
                    key={rem.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      rem.status === "taken"
                        ? "bg-emerald-50/70 border-emerald-200"
                        : "bg-white border-slate-200 hover:border-amber-300"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-sm">{rem.medicineName}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-slate-100 text-slate-700">
                          {rem.dose}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-bold capitalize ${
                            rem.status === "taken"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {rem.status === "taken" ? `Taken (${rem.takenAt || "Logged"})` : "Pending Dose"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Scheduled for: <span className="font-semibold text-slate-700">{rem.scheduledTime}</span> ({rem.timeSlot})
                        {rem.timingInstruction && ` • ${rem.timingInstruction}`}
                      </p>
                    </div>

                    <div className="shrink-0">
                      {rem.status === "taken" ? (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1.5 rounded-xl">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Administered
                        </div>
                      ) : (
                        <button
                          onClick={() => handleMarkGiven(rem.id)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Mark Given by Caregiver
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
