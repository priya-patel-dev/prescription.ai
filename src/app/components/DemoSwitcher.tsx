import { useState } from "react";
import { UserRole, Doctor, Patient, Pharmacist, Caregiver, Prescription } from "../types";
import { DEMO_DOCTOR, DEMO_PATIENTS, DEMO_PHARMACIST, DEMO_CAREGIVER, INITIAL_PRESCRIPTIONS, INITIAL_REMINDERS } from "../utils/seedData";
import { Stethoscope, User, Pill, HeartHandshake, Sparkles, RefreshCcw, ShieldCheck, ChevronDown } from "lucide-react";
import { toast } from "sonner";

interface DemoSwitcherProps {
  currentRole: UserRole;
  onSwitchUser: (user: any) => void;
  onLogout: () => void;
  onLoadPresetScenario?: (scenarioName: string) => void;
}

export function DemoSwitcher({ currentRole, onSwitchUser, onLogout }: DemoSwitcherProps) {
  const [showPresets, setShowPresets] = useState(false);

  const handleSelectRole = (role: "doctor" | "patient" | "pharmacist" | "caregiver") => {
    if (role === "doctor") {
      localStorage.setItem("currentUser", JSON.stringify(DEMO_DOCTOR));
      onSwitchUser(DEMO_DOCTOR);
      toast.success("Switched to Dr. Sarah Johnson (Doctor)");
    } else if (role === "patient") {
      localStorage.setItem("currentUser", JSON.stringify(DEMO_PATIENTS[0]));
      onSwitchUser(DEMO_PATIENTS[0]);
      toast.success("Switched to Robert Martinez (Patient)");
    } else if (role === "pharmacist") {
      localStorage.setItem("currentUser", JSON.stringify(DEMO_PHARMACIST));
      onSwitchUser(DEMO_PHARMACIST);
      toast.success("Switched to Marcus Vance, PharmD (Pharmacist)");
    } else if (role === "caregiver") {
      localStorage.setItem("currentUser", JSON.stringify(DEMO_CAREGIVER));
      onSwitchUser(DEMO_CAREGIVER);
      toast.success("Switched to Elena Martinez (Caregiver)");
    }
  };

  const handleResetDemoData = () => {
    localStorage.setItem("doctors", JSON.stringify([DEMO_DOCTOR]));
    localStorage.setItem("users", JSON.stringify([
      DEMO_PATIENTS[0],
      DEMO_PATIENTS[1],
      DEMO_PHARMACIST,
      DEMO_CAREGIVER
    ]));
    localStorage.setItem("prescriptions", JSON.stringify(INITIAL_PRESCRIPTIONS));
    localStorage.setItem("reminders", JSON.stringify(INITIAL_REMINDERS));
    toast.success("Demo database reset to factory clinical state!");
    window.location.reload();
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-xs py-2 px-4 border-b border-indigo-800/40 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Branding badge */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold tracking-wider text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> CLINICAL TEST DRIVE
          </span>
          <span className="text-slate-400 hidden sm:inline">| Quick-Switch Role:</span>
        </div>

        {/* Center: Quick Role Switcher Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => handleSelectRole("doctor")}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
              currentRole === "doctor"
                ? "bg-blue-600 text-white shadow-sm ring-1 ring-blue-300"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5 text-blue-300" />
            <span>Doctor</span>
          </button>

          <button
            onClick={() => handleSelectRole("patient")}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
              currentRole === "patient"
                ? "bg-teal-600 text-white shadow-sm ring-1 ring-teal-300"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
          >
            <User className="w-3.5 h-3.5 text-teal-300" />
            <span>Patient</span>
          </button>

          <button
            onClick={() => handleSelectRole("pharmacist")}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
              currentRole === "pharmacist"
                ? "bg-purple-600 text-white shadow-sm ring-1 ring-purple-300"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
          >
            <Pill className="w-3.5 h-3.5 text-purple-300" />
            <span>Pharmacist</span>
          </button>

          <button
            onClick={() => handleSelectRole("caregiver")}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
              currentRole === "caregiver"
                ? "bg-amber-600 text-white shadow-sm ring-1 ring-amber-300"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />
            <span>Caregiver</span>
          </button>
        </div>

        {/* Right: Reset Data */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDemoData}
            title="Reset to factory demo database"
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 px-2 py-1 rounded hover:bg-slate-800 transition-colors"
          >
            <RefreshCcw className="w-3 h-3" />
            <span className="hidden md:inline">Reset Demo DB</span>
          </button>
        </div>
      </div>
    </div>
  );
}
