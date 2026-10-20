import { useState } from "react";
import { User, Patient, Pharmacist, Caregiver } from "../types";
import { ArrowLeft, Eye, EyeOff, Smartphone, Shield, Pill, HeartHandshake, User as UserIcon } from "lucide-react";
import { Logo } from "./Logo";
import { toast } from "sonner";

interface UserAuthProps {
  initialMode: "signin" | "signup";
  initialRole?: "patient" | "pharmacist" | "caregiver";
  onAuthComplete: (user: User) => void;
  onBack: () => void;
}

export function UserAuth({ initialMode, initialRole = "patient", onAuthComplete, onBack }: UserAuthProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
    name: "",
    role: initialRole,
    pharmacyName: "Apex Community Pharmacy",
    pharmacyLicense: "RPH-99214-STATE",
    relationship: "Primary Caregiver"
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user exists
    const savedUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = savedUsers.find(
      (u: any) =>
        (formData.phone && u.phone === formData.phone) ||
        (formData.email && u.email?.toLowerCase() === formData.email.toLowerCase())
    );

    if (existingUser) {
      // Sign in flow
      if (!formData.password || formData.password === existingUser.password) {
        toast.success("Welcome back, " + existingUser.name);
        onAuthComplete(existingUser);
      } else {
        toast.error("Invalid password. Please try again.");
      }
    } else {
      // Auto sign up - create new user
      if (!formData.name) {
        toast.error("Please enter your name to create an account");
        return;
      }

      let newUser: User;
      const baseInfo = {
        id: `user-${Date.now()}`,
        email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, "")}@example.com`,
        password: formData.password || "password123",
        name: formData.name,
        phone: formData.phone || "+1 (555) 000-0000"
      };

      if (formData.role === "pharmacist") {
        newUser = {
          ...baseInfo,
          role: "pharmacist",
          pharmacyName: formData.pharmacyName,
          pharmacyLicense: formData.pharmacyLicense,
          verified: true
        } as Pharmacist;
      } else if (formData.role === "caregiver") {
        newUser = {
          ...baseInfo,
          role: "caregiver",
          relationship: formData.relationship,
          assignedPatients: []
        } as Caregiver;
      } else {
        newUser = {
          ...baseInfo,
          role: "patient",
          allergies: [],
          age: 35,
          gender: "other"
        } as Patient;
      }

      savedUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(savedUsers));

      toast.success("Account created successfully!");
      onAuthComplete(newUser);
    }
  };

  const getRoleIcon = () => {
    switch (formData.role) {
      case "pharmacist":
        return <Pill className="w-5 h-5 text-purple-600" />;
      case "caregiver":
        return <HeartHandshake className="w-5 h-5 text-amber-600" />;
      default:
        return <UserIcon className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full animate-slide-in-up">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Welcome</span>
        </button>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                {getRoleIcon()}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2 capitalize">
              {formData.role} Portal Access
            </h2>
            <p className="text-gray-600">
              Sign in or enter details to continue as {formData.role}
            </p>
          </div>

          <form onSubmit={handleContinue} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g. Robert Martinez"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none bg-gray-50/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none bg-gray-50/50"
                  required
                />
                <Smartphone className="w-4 h-4 text-gray-400 absolute right-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="user@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none bg-gray-50/50"
              />
            </div>

            {formData.role === "pharmacist" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Pharmacy Name
                  </label>
                  <input
                    type="text"
                    value={formData.pharmacyName}
                    onChange={(e) => handleInputChange("pharmacyName", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Pharmacy State License
                  </label>
                  <input
                    type="text"
                    value={formData.pharmacyLicense}
                    onChange={(e) => handleInputChange("pharmacyLicense", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none bg-gray-50/50"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none bg-gray-50/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all"
            >
              Enter {formData.role} Portal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
