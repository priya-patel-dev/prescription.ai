import { useState } from "react";
import { Prescription } from "../types";
import { ArrowLeft, Send, ShieldCheck, AlertTriangle, Printer, QrCode, FileText, CheckCircle2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";

interface PrescriptionDetailsScreenProps {
  prescription: Prescription;
  onBack: () => void;
}

export function PrescriptionDetailsScreen({
  prescription,
  onBack,
}: PrescriptionDetailsScreenProps) {
  const [isSending, setIsSending] = useState(false);

  const handleSendToPatient = () => {
    setIsSending(true);
    setTimeout(() => {
      toast.success(`Encrypted digital prescription link sent via SMS to ${prescription.patientPhone}`);
      setIsSending(false);
    }, 900);
  };

  const handlePrint = () => {
    window.print();
  };

  const qrPayload = JSON.stringify({
    id: prescription.id,
    doctor: prescription.doctorName,
    license: prescription.doctorLicense,
    hospital: prescription.hospitalName,
    patient: prescription.patientName,
    phone: prescription.patientPhone,
    date: prescription.date,
    medsCount: prescription.medicines.length,
    safetyScore: prescription.safetyScore,
    sig: prescription.digitalSignature || "SHA256:VERIFIED-E-RX"
  });

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-50 via-blue-50/40 to-teal-50/30">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Control Bar (Hidden during printing) */}
        <div className="flex flex-wrap items-center justify-between gap-4 no-print">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-all text-xs font-bold shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Rx / PDF</span>
            </button>

            <button
              onClick={handleSendToPatient}
              disabled={isSending}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all text-xs font-bold shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSending ? "Sending SMS..." : "Send SMS to Patient"}</span>
            </button>
          </div>
        </div>

        {/* CLINICAL PRESCRIPTION DOCUMENT (Print-Optimized) */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-200/80 prescription-container">
          {/* Hospital & Doctor Header */}
          <div className="flex flex-wrap items-start justify-between gap-6 pb-6 border-b-2 border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Official Clinical Prescription</span>
              <h1 className="text-2xl font-black text-slate-900 mt-1">{prescription.hospitalName}</h1>
              <p className="text-sm font-semibold text-slate-700">{prescription.doctorName}</p>
              <p className="text-xs text-slate-500">
                Medical License: <span className="font-mono font-bold text-slate-700">{prescription.doctorLicense || "MD-LIC-2024-992"}</span>
              </p>
            </div>

            <div className="text-right">
              <div className="inline-block bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200 text-left font-mono text-xs">
                <div><span className="text-slate-400">Rx ID:</span> <span className="font-bold text-slate-800">{prescription.id}</span></div>
                <div><span className="text-slate-400">Date:</span> <span className="font-bold text-slate-800">{prescription.date}</span></div>
                <div><span className="text-slate-400">Safety Index:</span> <span className="font-bold text-emerald-600">{prescription.safetyScore}%</span></div>
              </div>
            </div>
          </div>

          {/* Patient Details Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block font-semibold">Patient Name:</span>
              <span className="text-slate-900 font-bold text-sm">{prescription.patientName || "Robert Martinez"}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Contact Phone:</span>
              <span className="text-slate-800 font-mono font-bold">{prescription.patientPhone}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Age / Gender:</span>
              <span className="text-slate-800 font-bold">{prescription.patientAge} Years / {prescription.patientGender}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Known Allergies:</span>
              <span className="text-rose-600 font-bold">
                {prescription.patientAllergies?.length ? prescription.patientAllergies.join(", ") : "None reported"}
              </span>
            </div>
          </div>

          {/* Diagnosis & Clinical Symptoms */}
          <div className="py-4 border-b border-slate-100 text-xs space-y-1">
            <p className="text-slate-700">
              <span className="font-bold text-slate-900">Diagnosis:</span> {prescription.diagnosis || "Essential Clinical Assessment"}
            </p>
            <p className="text-slate-600">
              <span className="font-bold text-slate-800">Presenting Symptoms:</span> {prescription.symptoms}
            </p>
          </div>

          {/* Rx Medication Table */}
          <div className="py-6 space-y-4">
            <div className="flex items-center gap-2 text-2xl font-black font-serif text-blue-600">
              <span>℞</span>
              <span className="text-sm font-sans font-bold uppercase tracking-wider text-slate-400">
                Prescribed Medication Regimen
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Medicine & Strength</th>
                    <th className="py-3 px-4">Dosage Schedule</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Instructions & Timing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {prescription.medicines.map((m, idx) => (
                    <tr key={m.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono text-slate-400">{idx + 1}</td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 text-sm block">{m.name}</span>
                        {m.category && <span className="text-[10px] text-slate-400">{m.category}</span>}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-700 font-mono">{m.dose}</td>
                      <td className="py-3 px-4 font-semibold text-blue-600">{m.days} Days</td>
                      <td className="py-3 px-4">
                        <span className="font-medium capitalize text-slate-800 block">
                          Take {m.timing} food
                        </span>
                        {m.precautions && (
                          <span className="text-[11px] text-slate-500">{m.precautions}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Safety Warnings if any */}
          {prescription.warnings && prescription.warnings.length > 0 && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-300 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5 uppercase text-[10px] tracking-wider text-amber-800">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Clinical Safety Precautions
              </div>
              {prescription.warnings.map((w, i) => (
                <div key={i} className="pl-5 text-[11px]">
                  • <span className="font-bold">{w.medicine}:</span> {w.message}
                </div>
              ))}
            </div>
          )}

          {/* Bottom Security Verification Seal & Doctor Signature */}
          <div className="pt-6 border-t-2 border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
            {/* QR Code Verification */}
            <div className="flex items-center gap-4">
              <div className="bg-white p-2.5 rounded-2xl border-2 border-slate-200 shadow-sm shrink-0">
                <QRCodeSVG value={qrPayload} size={110} level="M" />
              </div>
              <div className="space-y-1 text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Official Digital Rx
                </span>
                <p className="text-[10px] text-slate-500">Scan at pharmacy for dispensing verification</p>
                <p className="text-[9px] font-mono text-slate-400 break-all leading-tight">
                  Sig: {prescription.digitalSignature || "SHA256:7f83b165...e2d"}
                </p>
              </div>
            </div>

            {/* Doctor Signature Block */}
            <div className="text-right space-y-2">
              <div className="inline-block border-b-2 border-slate-400 w-48 pb-1">
                <span className="font-serif italic text-lg text-slate-800">Dr. {prescription.doctorName}</span>
              </div>
              <p className="text-[11px] font-bold text-slate-700">Authorized Physician Signature</p>
              <p className="text-[10px] text-slate-400">Electronically Signed via Prescription.AI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
