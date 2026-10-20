import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { UserRole, Doctor, Patient, Pharmacist, Caregiver, User } from "./types";
import { WelcomePage } from "./components/WelcomePage";
import { DoctorAuth } from "./components/DoctorAuth";
import { UserAuth } from "./components/UserAuth";
import { DoctorDashboard } from "./components/DoctorDashboard";
import { PatientDashboard } from "./components/PatientDashboard";
import { PharmacistDashboard } from "./components/PharmacistDashboard";
import { CaregiverDashboard } from "./components/CaregiverDashboard";
import { DemoSwitcher } from "./components/DemoSwitcher";
import { initializeDemoData } from "./utils/seedData";

type AppState =
  | { screen: "welcome" }
  | { screen: "doctor-auth"; mode: "signin" | "signup" | "forgot" }
  | { screen: "user-auth"; mode: "signin" | "signup"; role: "patient" | "pharmacist" | "caregiver" }
  | { screen: "doctor-dashboard"; user: Doctor }
  | { screen: "patient-dashboard"; user: Patient }
  | { screen: "pharmacist-dashboard"; user: Pharmacist }
  | { screen: "caregiver-dashboard"; user: Caregiver };

export default function App() {
  const [appState, setAppState] = useState<AppState>({ screen: "welcome" });

  // Initialize seed database on mount and check session
  useEffect(() => {
    initializeDemoData();

    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        routeUserToDashboard(user);
      } catch (e) {
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  const routeUserToDashboard = (user: User) => {
    if (user.role === "doctor") {
      setAppState({ screen: "doctor-dashboard", user: user as Doctor });
    } else if (user.role === "pharmacist") {
      setAppState({ screen: "pharmacist-dashboard", user: user as Pharmacist });
    } else if (user.role === "caregiver") {
      setAppState({ screen: "caregiver-dashboard", user: user as Caregiver });
    } else {
      setAppState({ screen: "patient-dashboard", user: user as Patient });
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    if (role === "doctor") {
      setAppState({ screen: "doctor-auth", mode: "signin" });
    } else {
      setAppState({
        screen: "user-auth",
        mode: "signin",
        role: (role as "patient" | "pharmacist" | "caregiver") || "patient"
      });
    }
  };

  const handleDoctorAuthComplete = (doctor: Doctor) => {
    localStorage.setItem("currentUser", JSON.stringify(doctor));
    setAppState({ screen: "doctor-dashboard", user: doctor });
  };

  const handleUserAuthComplete = (user: User) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    routeUserToDashboard(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setAppState({ screen: "welcome" });
    toast.info("Signed out successfully");
  };

  const handleBackToWelcome = () => {
    setAppState({ screen: "welcome" });
  };

  // Switch role directly from the top Demo Toolbar
  const handleSwitchUser = (user: User) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    routeUserToDashboard(user);
  };

  // Determine current active role for toolbar
  const getCurrentRole = (): UserRole => {
    if (appState.screen === "doctor-dashboard") return "doctor";
    if (appState.screen === "patient-dashboard") return "patient";
    if (appState.screen === "pharmacist-dashboard") return "pharmacist";
    if (appState.screen === "caregiver-dashboard") return "caregiver";
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex flex-col">
      <Toaster position="top-center" richColors />

      {/* Persistent Demo Quick-Switcher Toolbar */}
      <DemoSwitcher
        currentRole={getCurrentRole()}
        onSwitchUser={handleSwitchUser}
        onLogout={handleLogout}
      />

      <div className="flex-1">
        {appState.screen === "welcome" && (
          <WelcomePage onRoleSelect={handleRoleSelect} />
        )}

        {appState.screen === "doctor-auth" && (
          <DoctorAuth
            initialMode={appState.mode}
            onAuthComplete={handleDoctorAuthComplete}
            onBack={handleBackToWelcome}
          />
        )}

        {appState.screen === "user-auth" && (
          <UserAuth
            initialMode={appState.mode}
            initialRole={appState.role}
            onAuthComplete={handleUserAuthComplete}
            onBack={handleBackToWelcome}
          />
        )}

        {appState.screen === "doctor-dashboard" && (
          <DoctorDashboard user={appState.user} onLogout={handleLogout} />
        )}

        {appState.screen === "patient-dashboard" && (
          <PatientDashboard user={appState.user} onLogout={handleLogout} />
        )}

        {appState.screen === "pharmacist-dashboard" && (
          <PharmacistDashboard user={appState.user} onLogout={handleLogout} />
        )}

        {appState.screen === "caregiver-dashboard" && (
          <CaregiverDashboard user={appState.user} onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}
