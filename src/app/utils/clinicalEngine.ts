import { DrugKnowledge, ClinicalWarning, Medicine, Patient } from "../types";

// ==========================================
// 1. EXTENSIVE CLINICAL DRUG FORMULARY
// ==========================================
export const DRUG_FORMULARY: DrugKnowledge[] = [
  // --- CARDIOLOGY & ANTICOAGULANTS ---
  {
    id: "warfarin",
    name: "Warfarin",
    genericName: "Warfarin Sodium",
    brandNames: ["Coumadin", "Jantoven"],
    category: "Anticoagulant",
    standardDoses: ["2mg", "2.5mg", "5mg"],
    maxDailyDoseMg: 10,
    standardTiming: "after",
    commonIndications: ["Deep vein thrombosis", "Atrial fibrillation", "Pulmonary embolism", "Stroke prevention"],
    contraindications: ["Active bleeding", "Severe hypertension", "Pregnancy", "Peptic ulcer"],
    foodInteractions: ["Avoid sudden changes in Vitamin K foods (Spinach, Kale)", "Alcohol", "Cranberry juice"],
    sideEffects: ["Severe bruising", "Prolonged bleeding", "Nausea"],
    pediatricSafe: false,
    geriatricPrecaution: true,
    pregnancyRiskCategory: "X",
    costIndex: { brandPrice: 48.0, genericPrice: 9.5 }
  },
  {
    id: "aspirin",
    name: "Aspirin",
    genericName: "Acetylsalicylic Acid",
    brandNames: ["Bayer", "Ecotrin", "Disprin"],
    category: "Antiplatelet / NSAID",
    standardDoses: ["75mg", "81mg", "150mg", "325mg"],
    maxDailyDoseMg: 4000,
    standardTiming: "after",
    commonIndications: ["Myocardial infarction prophylaxis", "Angina", "Cardiovascular protection", "Pain"],
    contraindications: ["Children under 16 with viral fever (Reye's Syndrome)", "Gastric ulcer", "Bleeding disorders"],
    foodInteractions: ["Alcohol increases stomach bleed risk", "Take with meals or milk"],
    sideEffects: ["Dyspepsia", "Gastric erosion", "Tinnitus"],
    pediatricSafe: false,
    geriatricPrecaution: true,
    pregnancyRiskCategory: "D",
    costIndex: { brandPrice: 12.0, genericPrice: 3.5 }
  },
  {
    id: "clopidogrel",
    name: "Clopidogrel",
    genericName: "Clopidogrel Bisulfate",
    brandNames: ["Plavix"],
    category: "Antiplatelet",
    standardDoses: ["75mg"],
    maxDailyDoseMg: 300,
    standardTiming: "after",
    commonIndications: ["Acute coronary syndrome", "Stent placement", "Stroke prevention", "Heart attack"],
    contraindications: ["Active pathological bleeding", "Severe hepatic impairment"],
    foodInteractions: ["Avoid Grapefruit juice (impairs activation)"],
    sideEffects: ["Bleeding", "Purpura", "Diarrhea"],
    pediatricSafe: false,
    geriatricPrecaution: true,
    pregnancyRiskCategory: "B",
    costIndex: { brandPrice: 185.0, genericPrice: 16.0 }
  },
  {
    id: "lisinopril",
    name: "Lisinopril",
    genericName: "Lisinopril",
    brandNames: ["Prinivil", "Zestril"],
    category: "ACE Inhibitor (Antihypertensive)",
    standardDoses: ["5mg", "10mg", "20mg", "40mg"],
    maxDailyDoseMg: 80,
    standardTiming: "before",
    commonIndications: ["Hypertension", "Heart failure", "Post-myocardial infarction", "High blood pressure"],
    contraindications: ["History of angioedema", "Pregnancy (2nd/3rd trimester)", "Bilateral renal artery stenosis"],
    foodInteractions: ["Avoid potassium salt substitutes and high potassium foods", "Avoid excessive bananas"],
    sideEffects: ["Persistent dry cough", "Hyperkalemia", "Dizziness", "Angioedema"],
    pediatricSafe: false,
    geriatricPrecaution: true,
    pregnancyRiskCategory: "D",
    costIndex: { brandPrice: 65.0, genericPrice: 8.0 }
  },
  {
    id: "amlodipine",
    name: "Amlodipine",
    genericName: "Amlodipine Besylate",
    brandNames: ["Norvasc"],
    category: "Calcium Channel Blocker",
    standardDoses: ["2.5mg", "5mg", "10mg"],
    maxDailyDoseMg: 10,
    standardTiming: "after",
    commonIndications: ["Hypertension", "Coronary artery disease", "Angina", "Chest pain"],
    contraindications: ["Severe aortic stenosis", "Cardiogenic shock"],
    foodInteractions: ["Grapefruit juice may elevate serum levels"],
    sideEffects: ["Peripheral edema (ankle swelling)", "Flushing", "Headache"],
    pediatricSafe: false,
    geriatricPrecaution: true,
    pregnancyRiskCategory: "C",
    costIndex: { brandPrice: 95.0, genericPrice: 11.0 }
  },
  {
    id: "atorvastatin",
    name: "Atorvastatin",
    genericName: "Atorvastatin Calcium",
    brandNames: ["Lipitor"],
    category: "HMG-CoA Reductase Inhibitor (Statin)",
    standardDoses: ["10mg", "20mg", "40mg", "80mg"],
    maxDailyDoseMg: 80,
    standardTiming: "bedtime",
    commonIndications: ["Hypercholesterolemia", "Cardiovascular disease prevention", "High cholesterol"],
    contraindications: ["Active liver disease", "Pregnancy & nursing"],
    foodInteractions: ["Avoid Grapefruit juice (causes severe CYP3A4 inhibition and toxicity)"],
    sideEffects: ["Myalgia", "Elevated liver enzymes", "Rhabdomyolysis (rare)"],
    pediatricSafe: false,
    geriatricPrecaution: false,
    pregnancyRiskCategory: "X",
    costIndex: { brandPrice: 175.0, genericPrice: 14.0 }
  },
  {
    id: "metoprolol",
    name: "Metoprolol",
    genericName: "Metoprolol Tartrate / Succinate",
    brandNames: ["Lopressor", "Toprol-XL"],
    category: "Beta-Blocker",
    standardDoses: ["25mg", "50mg", "100mg"],
    maxDailyDoseMg: 400,
    standardTiming: "with-food",
    commonIndications: ["Hypertension", "Angina pectoris", "Heart failure", "Tachycardia"],
    contraindications: ["Sinus bradycardia", "2nd/3rd degree heart block", "Severe asthma / COPD bronchospasm"],
    foodInteractions: ["Alcohol increases hypotensive effect"],
    sideEffects: ["Bradycardia", "Fatigue", "Cold extremities", "Bronchospasm"],
    pediatricSafe: false,
    geriatricPrecaution: true,
    pregnancyRiskCategory: "C",
    costIndex: { brandPrice: 72.0, genericPrice: 12.0 }
  },
  {
    id: "digoxin",
    name: "Digoxin",
    genericName: "Digoxin",
    brandNames: ["Lanoxin"],
    category: "Cardiac Glycoside",
    standardDoses: ["0.125mg", "0.25mg"],
    maxDailyDoseMg: 0.5,
    standardTiming: "after",
    commonIndications: ["Atrial fibrillation", "Congestive heart failure"],
    contraindications: ["Ventricular fibrillation", "Wolff-Parkinson-White syndrome"],
    foodInteractions: ["Avoid high-bran fiber within 2 hours of dose", "Watch potassium and magnesium intake"],
    sideEffects: ["Narrow therapeutic index", "Visual halo disturbance (yellow-green)", "Arrhythmias", "Nausea"],
    pediatricSafe: false,
    geriatricPrecaution: true,
    pregnancyRiskCategory: "C",
    costIndex: { brandPrice: 55.0, genericPrice: 18.0 }
  },
  {
    id: "nitroglycerin",
    name: "Nitroglycerin",
    genericName: "Glyceryl Trinitrate",
    brandNames: ["Nitrostat", "Nitrolingual"],
    category: "Vasodilator / Nitrate",
    standardDoses: ["0.4mg sublingual"],
    maxDailyDoseMg: 1.2,
    standardTiming: "before",
    commonIndications: ["Acute angina pectoris", "Chest pain", "Coronary artery spasm"],
    contraindications: ["Concurrent use of PDE-5 inhibitors (Sildenafil, Tadalafil)", "Severe anemia", "Hypotension"],
    foodInteractions: ["Strictly avoid alcohol (causes catastrophic collapse)"],
    sideEffects: ["Throbbing headache", "Severe orthostatic hypotension", "Syncope"],
    pediatricSafe: false,
    geriatricPrecaution: true,
    pregnancyRiskCategory: "C",
    costIndex: { brandPrice: 62.0, genericPrice: 19.0 }
  },

  // --- ANALGESICS & NSAIDS ---
  {
    id: "paracetamol",
    name: "Paracetamol",
    genericName: "Acetaminophen",
    brandNames: ["Tylenol", "Panadol", "Calpol", "Crocin"],
    category: "Analgesic / Antipyretic",
    standardDoses: ["500mg", "650mg", "1000mg"],
    maxDailyDoseMg: 4000,
    standardTiming: "after",
    commonIndications: ["Fever", "Headache", "Mild to moderate pain", "Osteoarthritis", "Body ache"],
    contraindications: ["Severe hepatic failure", "Chronic heavy alcohol abuse"],
    foodInteractions: ["Chronic alcohol co-ingestion drastically increases hepatotoxicity"],
    sideEffects: ["Liver damage on overdose", "Rare allergic skin reaction"],
    pediatricSafe: true,
    geriatricPrecaution: false,
    pregnancyRiskCategory: "B",
    costIndex: { brandPrice: 15.0, genericPrice: 3.0 }
  },
  {
    id: "ibuprofen",
    name: "Ibuprofen",
    genericName: "Ibuprofen",
    brandNames: ["Advil", "Motrin", "Brufen"],
    category: "NSAID",
    standardDoses: ["200mg", "400mg", "600mg", "800mg"],
    maxDailyDoseMg: 3200,
    standardTiming: "after",
    commonIndications: ["Pain", "Inflammation", "Fever", "Arthritis", "Dysmenorrhea", "Swelling"],
    contraindications: ["Active peptic ulcer", "Severe renal failure", "Third trimester of pregnancy", "Post-CABG surgery"],
    foodInteractions: ["Take with food or milk to minimize gastric distress", "Avoid alcohol"],
    sideEffects: ["Gastric ulceration", "Renal impairment", "Fluid retention", "Increased cardiovascular risk"],
    pediatricSafe: true,
    geriatricPrecaution: true,
    pregnancyRiskCategory: "D",
    costIndex: { brandPrice: 18.0, genericPrice: 4.5 }
  },
  {
    id: "tramadol",
    name: "Tramadol",
    genericName: "Tramadol Hydrochloride",
    brandNames: ["Ultram", "ConZip"],
    category: "Opioid Analgesic / SNRI",
    standardDoses: ["50mg", "100mg"],
    maxDailyDoseMg: 400,
    standardTiming: "after",
    commonIndications: ["Moderate to moderately severe acute or chronic pain"],
    contraindications: ["Children under 12", "Acute intoxication with alcohol/hypnotics", "Concurrent MAOIs or SSRIs"],
    foodInteractions: ["Avoid alcohol (respiratory depression)"],
    sideEffects: ["Drowsiness", "Nausea", "Seizure threshold lowering", "Serotonin syndrome risk", "Constipation"],
    pediatricSafe: false,
    geriatricPrecaution: true,
    pregnancyRiskCategory: "C",
    costIndex: { brandPrice: 85.0, genericPrice: 15.0 }
  },

  // --- ANTIBIOTICS & INFECTIOUS DISEASE ---
  {
    id: "amoxicillin",
    name: "Amoxicillin",
    genericName: "Amoxicillin Trihydrate",
    brandNames: ["Amoxil", "Moxatag", "Augmentin"],
    category: "Penicillin / Beta-lactam Antibiotic",
    standardDoses: ["250mg", "500mg", "875mg"],
    maxDailyDoseMg: 3000,
    standardTiming: "after",
    commonIndications: ["Bacterial sinusitis", "Otitis media", "Pneumonia", "Strep throat", "Skin infection"],
    contraindications: ["Hypersensitivity to Penicillins or Beta-lactams", "Infectious mononucleosis (rash)"],
    foodInteractions: ["Can be taken with or without food"],
    sideEffects: ["Diarrhea", "Allergic rash", "Anaphylaxis (in allergic patients)", "Nausea"],
    pediatricSafe: true,
    geriatricPrecaution: false,
    pregnancyRiskCategory: "B",
    costIndex: { brandPrice: 32.0, genericPrice: 7.0 }
  },
  {
    id: "ciprofloxacin",
    name: "Ciprofloxacin",
    genericName: "Ciprofloxacin Hydrochloride",
    brandNames: ["Cipro"],
    category: "Fluoroquinolone Antibiotic",
    standardDoses: ["250mg", "500mg", "750mg"],
    maxDailyDoseMg: 1500,
    standardTiming: "before",
    commonIndications: ["Urinary tract infection (UTI)", "Bacterial prostatitis", "Severe gastroenteritis", "Bone infections"],
    contraindications: ["Children under 18 (cartilage toxicity)", "Myasthenia gravis", "Concurrent Tizanidine"],
    foodInteractions: ["Dairy (milk, yogurt) and calcium/antacids drastically reduce absorption; separate by 2h"],
    sideEffects: ["Tendonitis & tendon rupture (Achilles)", "QT prolongation", "Peripheral neuropathy", "CNS excitation"],
    pediatricSafe: false,
    geriatricPrecaution: true,
    pregnancyRiskCategory: "C",
    costIndex: { brandPrice: 90.0, genericPrice: 12.0 }
  },
  {
    id: "azithromycin",
    name: "Azithromycin",
    genericName: "Azithromycin Dihydrate",
    brandNames: ["Zithromax", "Z-Pak"],
    category: "Macrolide Antibiotic",
    standardDoses: ["250mg", "500mg"],
    maxDailyDoseMg: 500,
    standardTiming: "before",
    commonIndications: ["Upper respiratory tract infection", "Community-acquired pneumonia", "Chlamydia", "Bronchitis"],
    contraindications: ["History of cholestatic jaundice with macrolides", "Known QT interval prolongation"],
    foodInteractions: ["Aluminum/magnesium antacids reduce rate of absorption"],
    sideEffects: ["GI cramping", "Nausea", "Cardiac QT prolongation", "Diarrhea"],
    pediatricSafe: true,
    geriatricPrecaution: false,
    pregnancyRiskCategory: "B",
    costIndex: { brandPrice: 45.0, genericPrice: 11.0 }
  },
  {
    id: "doxycycline",
    name: "Doxycycline",
    genericName: "Doxycycline Hyclate",
    brandNames: ["Vibramycin", "Doryx"],
    category: "Tetracycline Antibiotic",
    standardDoses: ["100mg"],
    maxDailyDoseMg: 200,
    standardTiming: "with-food",
    commonIndications: ["Lyme disease", "Acne vulgaris", "Atypical pneumonia", "Chlamydia", "Skin infection"],
    contraindications: ["Children under 8 years (permanent tooth discoloration & enamel hypoplasia)", "Pregnancy"],
    foodInteractions: ["Take with a full glass of water and stay upright for 30 min (esophagitis)", "Avoid dairy/calcium"],
    sideEffects: ["Severe photosensitivity (sunburn)", "Esophageal ulceration", "Nausea"],
    pediatricSafe: false,
    geriatricPrecaution: false,
    pregnancyRiskCategory: "D",
    costIndex: { brandPrice: 60.0, genericPrice: 9.0 }
  },

  // --- DIABETES & ENDOCRINE ---
  {
    id: "metformin",
    name: "Metformin",
    genericName: "Metformin Hydrochloride",
    brandNames: ["Glucophage", "Fortamet"],
    category: "Biguanide (Antidiabetic)",
    standardDoses: ["500mg", "850mg", "1000mg"],
    maxDailyDoseMg: 2550,
    standardTiming: "after",
    commonIndications: ["Type 2 Diabetes Mellitus", "Insulin resistance", "PCOS", "High blood sugar"],
    contraindications: ["Severe renal impairment (eGFR < 30 mL/min)", "Acute metabolic acidosis", "Iodinated contrast within 48h"],
    foodInteractions: ["Excessive alcohol intake greatly increases fatal lactic acidosis risk", "Take with meals to reduce nausea"],
    sideEffects: ["Gastrointestinal upset", "Diarrhea", "Lactic acidosis (rare but fatal)", "Vitamin B12 deficiency"],
    pediatricSafe: false,
    geriatricPrecaution: true,
    pregnancyRiskCategory: "B",
    costIndex: { brandPrice: 50.0, genericPrice: 6.0 }
  },
  {
    id: "glipizide",
    name: "Glipizide",
    genericName: "Glipizide",
    brandNames: ["Glucotrol"],
    category: "Sulfonylurea (Antidiabetic)",
    standardDoses: ["5mg", "10mg"],
    maxDailyDoseMg: 40,
    standardTiming: "before",
    commonIndications: ["Type 2 Diabetes Mellitus"],
    contraindications: ["Type 1 Diabetes", "Diabetic ketoacidosis", "Known sulfonamide hypersensitivity"],
    foodInteractions: ["Must take 30 minutes before first meal of the day; skipping meals causes severe hypoglycemia"],
    sideEffects: ["Hypoglycemia (shaking, sweating, confusion)", "Weight gain", "Dizziness"],
    pediatricSafe: false,
    geriatricPrecaution: true,
    pregnancyRiskCategory: "C",
    costIndex: { brandPrice: 55.0, genericPrice: 8.0 }
  },
  {
    id: "levothyroxine",
    name: "Levothyroxine",
    genericName: "Levothyroxine Sodium",
    brandNames: ["Synthroid", "Eltroxin"],
    category: "Thyroid Hormone",
    standardDoses: ["25mcg", "50mcg", "75mcg", "100mcg", "125mcg"],
    maxDailyDoseMg: 0.3,
    standardTiming: "before",
    commonIndications: ["Hypothyroidism", "Goiter suppression", "Thyroiditis"],
    contraindications: ["Uncorrected adrenal insufficiency", "Untreated thyrotoxicosis", "Acute myocardial infarction"],
    foodInteractions: ["Take strictly on an empty stomach with water 30-60 min before breakfast; avoid calcium/coffee"],
    sideEffects: ["Palpitations", "Insomnia", "Weight loss", "Heat intolerance (if over-replaced)"],
    pediatricSafe: true,
    geriatricPrecaution: true,
    pregnancyRiskCategory: "A",
    costIndex: { brandPrice: 42.0, genericPrice: 8.5 }
  },

  // --- GASTROINTESTINAL ---
  {
    id: "omeprazole",
    name: "Omeprazole",
    genericName: "Omeprazole Magnesium",
    brandNames: ["Prilosec", "Omez"],
    category: "Proton Pump Inhibitor (PPI)",
    standardDoses: ["20mg", "40mg"],
    maxDailyDoseMg: 80,
    standardTiming: "before",
    commonIndications: ["GERD", "Gastric ulcer", "Duodenal ulcer", "Acid reflux", "Heartburn"],
    contraindications: ["Concurrent Rilpivirine", "Hypersensitivity to PPIs"],
    foodInteractions: ["Take 30-60 minutes before morning meal for optimal acid pump inhibition"],
    sideEffects: ["Headache", "C. difficile diarrhea risk", "Hypomagnesemia on prolonged use", "Inhibits Clopidogrel"],
    pediatricSafe: false,
    geriatricPrecaution: true,
    pregnancyRiskCategory: "C",
    costIndex: { brandPrice: 38.0, genericPrice: 7.0 }
  },
  {
    id: "ondansetron",
    name: "Ondansetron",
    genericName: "Ondansetron Hydrochloride",
    brandNames: ["Zofran"],
    category: "5-HT3 Receptor Antagonist (Antiemetic)",
    standardDoses: ["4mg", "8mg"],
    maxDailyDoseMg: 24,
    standardTiming: "before",
    commonIndications: ["Nausea", "Vomiting", "Chemotherapy-induced emesis", "Post-operative nausea"],
    contraindications: ["Concurrent Apomorphine", "Congenital long QT syndrome"],
    foodInteractions: ["No major dietary interactions"],
    sideEffects: ["Constipation", "Headache", "QT prolongation", "Drowsiness"],
    pediatricSafe: true,
    geriatricPrecaution: false,
    pregnancyRiskCategory: "B",
    costIndex: { brandPrice: 82.0, genericPrice: 12.0 }
  },

  // --- PSYCHIATRIC & NEUROLOGY ---
  {
    id: "sertraline",
    name: "Sertraline",
    genericName: "Sertraline Hydrochloride",
    brandNames: ["Zoloft"],
    category: "SSRI Antidepressant",
    standardDoses: ["25mg", "50mg", "100mg"],
    maxDailyDoseMg: 200,
    standardTiming: "after",
    commonIndications: ["Major depressive disorder", "Panic disorder", "PTSD", "Anxiety", "OCD"],
    contraindications: ["Concurrent use of MAOIs, Pimozide, or Linezolid"],
    foodInteractions: ["Avoid Grapefruit juice", "Avoid St. John's Wort (serotonin syndrome)"],
    sideEffects: ["Nausea", "Insomnia", "Sexual dysfunction", "Serotonin syndrome risk", "Suicidal ideation in young adults"],
    pediatricSafe: false,
    geriatricPrecaution: true,
    pregnancyRiskCategory: "C",
    costIndex: { brandPrice: 98.0, genericPrice: 12.0 }
  },
  {
    id: "alprazolam",
    name: "Alprazolam",
    genericName: "Alprazolam",
    brandNames: ["Xanax"],
    category: "Benzodiazepine / Anxiolytic",
    standardDoses: ["0.25mg", "0.5mg", "1mg"],
    maxDailyDoseMg: 4,
    standardTiming: "after",
    commonIndications: ["Panic disorder", "Severe generalized anxiety"],
    contraindications: ["Acute narrow-angle glaucoma", "Severe respiratory depression", "Sleep apnea"],
    foodInteractions: ["Strictly NO alcohol (fatal respiratory arrest)", "Grapefruit juice slows clearance"],
    sideEffects: ["Severe sedation", "Physical dependence", "Memory impairment", "Fall risk in elderly (Beers list)"],
    pediatricSafe: false,
    geriatricPrecaution: true,
    pregnancyRiskCategory: "D",
    costIndex: { brandPrice: 75.0, genericPrice: 9.0 }
  },
  {
    id: "sildenafil",
    name: "Sildenafil",
    genericName: "Sildenafil Citrate",
    brandNames: ["Viagra", "Revatio"],
    category: "PDE-5 Inhibitor",
    standardDoses: ["25mg", "50mg", "100mg"],
    maxDailyDoseMg: 100,
    standardTiming: "before",
    commonIndications: ["Erectile dysfunction", "Pulmonary arterial hypertension"],
    contraindications: ["Concurrent Nitrates (Nitroglycerin) causes fatal hypotension", "Severe cardiovascular instability"],
    foodInteractions: ["High-fat meals delay absorption", "Avoid Grapefruit juice"],
    sideEffects: ["Headache", "Flushing", "Hypotension", "Visual blue tinting"],
    pediatricSafe: false,
    geriatricPrecaution: false,
    pregnancyRiskCategory: "B",
    costIndex: { brandPrice: 120.0, genericPrice: 18.0 }
  },
  {
    id: "finasteride",
    name: "Finasteride",
    genericName: "Finasteride",
    brandNames: ["Proscar", "Propecia"],
    category: "5-Alpha Reductase Inhibitor",
    standardDoses: ["1mg", "5mg"],
    maxDailyDoseMg: 5,
    standardTiming: "after",
    commonIndications: ["Benign Prostatic Hyperplasia (BPH)", "Androgenetic alopecia"],
    contraindications: ["Contraindicated in females / pregnancy (causes male fetus genital malformations)"],
    foodInteractions: ["None significant"],
    sideEffects: ["Decreased libido", "Erectile dysfunction", "Gynecomastia"],
    pediatricSafe: false,
    geriatricPrecaution: false,
    pregnancyRiskCategory: "X",
    costIndex: { brandPrice: 85.0, genericPrice: 11.0 }
  }
];

// ==========================================
// 2. CLINICAL DRUG-DRUG INTERACTION MATRIX
// ==========================================
interface InteractionRule {
  drugs: [string, string];
  severity: "critical" | "high" | "medium";
  message: string;
  mechanism: string;
  recommendation: string;
}

export const DRUG_INTERACTIONS: InteractionRule[] = [
  {
    drugs: ["warfarin", "aspirin"],
    severity: "critical",
    message: "Severe Synergistic Bleeding Hazard",
    mechanism: "Concurrent Warfarin (anticoagulant) and Aspirin (antiplatelet + gastric mucosal irritant) results in a 3-5x increased risk of life-threatening gastrointestinal and intracerebral hemorrhage.",
    recommendation: "Avoid co-administration unless explicitly indicated by cardiologist for mechanical valve. Monitor INR and stool for occult blood."
  },
  {
    drugs: ["warfarin", "ibuprofen"],
    severity: "critical",
    message: "High Risk of GI Hemorrhage & Renal Toxicity",
    mechanism: "Ibuprofen displaces Warfarin from plasma albumin binding sites and suppresses platelet COX-1 while eroding gastric mucosal barrier.",
    recommendation: "Discontinue Ibuprofen immediately. Replace with Acetaminophen (Paracetamol max 2000mg/day) for pain management."
  },
  {
    drugs: ["sildenafil", "nitroglycerin"],
    severity: "critical",
    message: "Catastrophic Refractory Hypotension & Cardiac Arrest",
    mechanism: "Nitroglycerin increases cGMP production while Sildenafil inhibits cGMP degradation (PDE-5). The resulting massive accumulation of cGMP produces catastrophic peripheral vasodilation and coronary hypoperfusion.",
    recommendation: "Absolute contraindication. Never administer Nitrates within 24 hours of Sildenafil."
  },
  {
    drugs: ["lisinopril", "potassium"],
    severity: "critical",
    message: "Life-Threatening Hyperkalemia & Ventricular Arrhythmia",
    mechanism: "ACE inhibitors reduce aldosterone secretion, decreasing renal potassium excretion. Co-administration causes dangerous serum potassium elevation.",
    recommendation: "Avoid potassium supplements. Monitor serum potassium and creatinine within 1-2 weeks."
  },
  {
    drugs: ["sertraline", "tramadol"],
    severity: "high",
    message: "Serotonin Syndrome & Lowered Seizure Threshold",
    mechanism: "Both agents inhibit serotonin reuptake. Concurrent use risks life-threatening serotonin toxicity (hyperreflexia, clonus, hyperthermia) and lowers the seizure threshold.",
    recommendation: "Avoid concurrent use. Use alternative non-serotonergic analgesic like Paracetamol or moderate NSAID."
  },
  {
    drugs: ["atorvastatin", "azithromycin"],
    severity: "high",
    message: "Statin Toxicity & Risk of Rhabdomyolysis",
    mechanism: "Macrolide antibiotics inhibit CYP3A4-mediated hepatic metabolism of Atorvastatin, drastically spiking systemic statin exposure.",
    recommendation: "Temporarily pause Atorvastatin during antibiotic course, or switch to Rosuvastatin / non-CYP3A4 antibiotic."
  },
  {
    drugs: ["clopidogrel", "omeprazole"],
    severity: "high",
    message: "Reduced Antiplatelet Efficacy (CYP2C19 Inhibition)",
    mechanism: "Omeprazole inhibits CYP2C19, the primary enzyme required to biotransform Clopidogrel into its active antiplatelet metabolite, increasing thrombotic risk.",
    recommendation: "Switch Omeprazole to Pantoprazole or an H2 blocker (Famotidine) which does not inhibit CYP2C19."
  },
  {
    drugs: ["ciprofloxacin", "paracetamol"],
    severity: "medium",
    message: "Mild Hepatic Clearance Interaction",
    mechanism: "Ciprofloxacin can moderately inhibit CYP1A2, which plays an auxiliary role in acetaminophen metabolism.",
    recommendation: "Safe in therapeutic doses, but avoid Paracetamol exceeding 3000mg/day."
  },
  {
    drugs: ["metformin", "alcohol"],
    severity: "high",
    message: "Risk of Acute Lactic Acidosis",
    mechanism: "Ethanol inhibits hepatic gluconeogenesis and lactate clearance, potentiating Metformin-induced lactic acidosis, especially when dehydrated.",
    recommendation: "Counsel patient to strictly avoid alcohol while on Metformin therapy."
  },
  {
    drugs: ["digoxin", "metoprolol"],
    severity: "high",
    message: "Severe Additive Bradycardia & AV Block",
    mechanism: "Both Digoxin and Beta-blockers slow atrioventricular (AV) nodal conduction, risking profound bradycardia and complete heart block.",
    recommendation: "Perform baseline ECG and closely monitor pulse rate and serum Digoxin concentration."
  }
];

// ==========================================
// 3. MAIN COMPREHENSIVE CLINICAL VALIDATOR
// ==========================================
export function evaluatePrescriptionSafety(
  patient: {
    age: number;
    gender: "male" | "female" | "other";
    allergies?: string[];
    symptoms?: string;
  },
  medicines: Medicine[]
): {
  warnings: ClinicalWarning[];
  safetyScore: number;
  recommendations: string[];
  summary: string;
} {
  const warnings: ClinicalWarning[] = [];
  const recommendations: string[] = [];
  const normalizedMeds = medicines.map(m => ({
    ...m,
    lowerName: m.name.toLowerCase().trim()
  }));

  // 1. DRUG-DRUG INTERACTIONS
  for (let i = 0; i < normalizedMeds.length; i++) {
    for (let j = i + 1; j < normalizedMeds.length; j++) {
      const m1 = normalizedMeds[i].lowerName;
      const m2 = normalizedMeds[j].lowerName;

      for (const rule of DRUG_INTERACTIONS) {
        const [d1, d2] = rule.drugs;
        const match =
          (m1.includes(d1) && m2.includes(d2)) ||
          (m1.includes(d2) && m2.includes(d1));

        if (match) {
          warnings.push({
            type: "interaction",
            severity: rule.severity,
            medicine: `${normalizedMeds[i].name} + ${normalizedMeds[j].name}`,
            message: rule.message,
            mechanism: rule.mechanism,
            recommendation: rule.recommendation
          });
          recommendations.push(rule.recommendation);
        }
      }
    }
  }

  // 2. AGE-BASED CONTRAINDICATIONS & PEDIATRIC / BEERS CRITERIA
  normalizedMeds.forEach(med => {
    // Aspirin & Reye's Syndrome in pediatrics
    if (med.lowerName.includes("aspirin") && patient.age < 16) {
      warnings.push({
        type: "age-risk",
        severity: "critical",
        medicine: med.name,
        message: "Fatal Reye's Syndrome Contraindication in Patients < 16 Years",
        mechanism: "Administration of Aspirin during viral infections in children/adolescents carries high mortality risk due to acute encephalopathy and fatty liver.",
        recommendation: "Replace immediately with Pediatric Paracetamol (Acetaminophen) or Ibuprofen."
      });
      recommendations.push(`Replace ${med.name} with Paracetamol for patient aged ${patient.age}`);
    }

    // Fluoroquinolones in pediatrics (<18)
    if (med.lowerName.includes("cipro") && patient.age < 18) {
      warnings.push({
        type: "age-risk",
        severity: "high",
        medicine: med.name,
        message: "Pediatric Cartilage & Arthropathy Risk",
        mechanism: "Fluoroquinolones cause articular cartilage damage in juvenile weight-bearing joints.",
        recommendation: "Consider Amoxicillin-Clavulanate or Cephalosporin instead."
      });
    }

    // Tetracyclines in young children (<8)
    if (med.lowerName.includes("doxycycline") && patient.age < 8) {
      warnings.push({
        type: "age-risk",
        severity: "high",
        medicine: med.name,
        message: "Permanent Dental Discoloration & Bone Retardation",
        mechanism: "Tetracyclines chelate calcium during active dentition, causing permanent yellow-brown tooth staining.",
        recommendation: "Switch to Azithromycin or Amoxicillin."
      });
    }

    // Geriatric / Beers Criteria (Age > 65)
    if (patient.age >= 65) {
      if (med.lowerName.includes("xanax") || med.lowerName.includes("alprazolam")) {
        warnings.push({
          type: "beers-criteria",
          severity: "high",
          medicine: med.name,
          message: "Beers Criteria Alert: High Sedation & Fall/Fracture Risk in Elderly",
          mechanism: "Benzodiazepines have prolonged half-lives in seniors due to diminished hepatic clearance, causing daytime sedation, ataxia, delirium, and falls.",
          recommendation: "Taper dosage by 50% or replace with non-pharmacologic sleep hygiene or SSRI."
        });
      }
      if (med.lowerName.includes("ibuprofen") && med.days > 7) {
        warnings.push({
          type: "beers-criteria",
          severity: "medium",
          medicine: med.name,
          message: "Beers Criteria: Chronic NSAID Use in Elderly Increases Acute Renal Failure",
          mechanism: "Elderly kidneys rely heavily on prostaglandin-mediated vasodilation; NSAIDs abruptly drop eGFR.",
          recommendation: "Limit NSAID duration to under 5 days and add gastroprotection (PPI)."
        });
      }
    }
  });

  // 3. GENDER & PREGNANCY/TERATOGENIC CONTRAINDICATIONS
  normalizedMeds.forEach(med => {
    if (med.lowerName.includes("finasteride") && patient.gender === "female") {
      warnings.push({
        type: "gender-risk",
        severity: "critical",
        medicine: med.name,
        message: "Contraindicated in Female Patients (Teratogenicity / Male Fetus Malformation)",
        mechanism: "Inhibits 5-alpha reductase, preventing normal male external genitalia development in utero.",
        recommendation: "Do not prescribe or handle by females of childbearing potential."
      });
    }
  });

  // 4. ALLERGY & CROSS-REACTIVITY CHECKS
  if (patient.allergies && patient.allergies.length > 0) {
    const allergyList = patient.allergies.map(a => a.toLowerCase().trim());

    normalizedMeds.forEach(med => {
      // Direct allergy match
      for (const allergy of allergyList) {
        if (med.lowerName.includes(allergy) || allergy.includes(med.lowerName)) {
          warnings.push({
            type: "allergy",
            severity: "critical",
            medicine: med.name,
            message: `Documented Patient Allergy: ${allergy.toUpperCase()}`,
            mechanism: `Patient has documented hypersensitivity to ${allergy}. Administration risks severe anaphylaxis or angioedema.`,
            recommendation: `Discontinue ${med.name} immediately. Choose a non-cross-reactive medication class.`
          });
          recommendations.push(`Do NOT dispense ${med.name}: matches documented allergy [${allergy}]`);
        }

        // Penicillin Cross-Reactivity
        if (allergy.includes("penicillin")) {
          if (med.lowerName.includes("amoxicillin") || med.lowerName.includes("augmentin") || med.lowerName.includes("ampicillin")) {
            warnings.push({
              type: "allergy",
              severity: "critical",
              medicine: med.name,
              message: "Penicillin Cross-Reactivity: Anaphylaxis Risk",
              mechanism: "Amoxicillin shares the core beta-lactam ring with penicillin and will trigger allergic cross-reactions.",
              recommendation: "Switch to Macrolide (Azithromycin) or Fluoroquinolone if age allows."
            });
          }
        }

        // Sulfa allergy check
        if (allergy.includes("sulfa")) {
          if (med.lowerName.includes("glipizide") || med.lowerName.includes("bactrim") || med.lowerName.includes("septra")) {
            warnings.push({
              type: "allergy",
              severity: "high",
              medicine: med.name,
              message: "Sulfonamide Cross-Reactivity Warning",
              mechanism: "Glipizide contains a sulfonylurea moiety which may trigger reactions in patients with sulfonamide allergies.",
              recommendation: "Consider Metformin or DPP-4 inhibitors."
            });
          }
        }
      }
    });
  }

  // 5. MAX DAILY DOSE & OVERDOSE DETECTOR
  normalizedMeds.forEach(med => {
    // Check Paracetamol / Acetaminophen
    if (med.lowerName.includes("paracetamol") || med.lowerName.includes("acetaminophen") || med.lowerName.includes("tylenol") || med.lowerName.includes("panadol")) {
      // Extract numeric dose
      const doseNum = parseInt(med.dose.replace(/\D/g, "")) || 500;
      let timesPerDay = 2;
      if (med.dose.includes("1-1-1") || med.dose.toLowerCase().includes("three")) timesPerDay = 3;
      if (med.dose.includes("1-1-1-1") || med.dose.toLowerCase().includes("four")) timesPerDay = 4;
      const totalDailyMg = doseNum * timesPerDay;

      if (totalDailyMg > 4000) {
        warnings.push({
          type: "dosage-overdose",
          severity: "critical",
          medicine: med.name,
          message: `Daily Dose of ${totalDailyMg}mg Exceeds Safe Ceiling (4000mg/24h)`,
          mechanism: "Hepatotoxic metabolite NAPQI depletes hepatic glutathione, causing acute liver necrosis.",
          recommendation: "Reduce total daily dose to under 3000-4000mg."
        });
      }
    }
  });

  // 6. SYMPTOM / INDICATION COMPATIBILITY
  if (patient.symptoms) {
    const symLower = patient.symptoms.toLowerCase();
    normalizedMeds.forEach(med => {
      // Antacid prescribed for acute fever only
      if (symLower.includes("fever") && !symLower.includes("heartburn") && !symLower.includes("acidity") && !symLower.includes("gerd")) {
        if (med.lowerName.includes("antacid") || med.lowerName.includes("omeprazole")) {
          warnings.push({
            type: "mismatch",
            severity: "low",
            medicine: med.name,
            message: "Clinical Indication Mismatch: Antacid Prescribed for Isolated Fever",
            mechanism: "Antacids and PPIs have no antipyretic efficacy for febrile conditions.",
            recommendation: "Verify if patient also has gastric symptoms, or omit unnecessary PPI."
          });
        }
      }
    });
  }

  // 7. SCIENTIFIC SAFETY SCORE COMPUTATION (0 - 100)
  let score = 100;
  warnings.forEach(w => {
    if (w.severity === "critical") score -= 30;
    else if (w.severity === "high") score -= 15;
    else if (w.severity === "medium") score -= 8;
    else if (w.severity === "low") score -= 3;
  });
  score = Math.max(0, Math.min(100, score));

  // Generate executive clinical summary
  let summary = "Prescription verified with no critical contraindications detected.";
  if (warnings.length > 0) {
    const criticalCount = warnings.filter(w => w.severity === "critical").length;
    const highCount = warnings.filter(w => w.severity === "high").length;
    if (criticalCount > 0) {
      summary = `CRITICAL ALERT: ${criticalCount} life-threatening contraindication(s) detected. Doctor intervention required before dispensing.`;
    } else if (highCount > 0) {
      summary = `SAFETY NOTICE: ${highCount} major clinical risk(s) identified. Dose adjustment or patient monitoring advised.`;
    } else {
      summary = `Cautionary notes identified: ${warnings.length} mild precaution(s) noted.`;
    }
  }

  return {
    warnings,
    safetyScore: score,
    recommendations,
    summary
  };
}

// Helper to look up drug details from formulary
export function findDrugInFormulary(query: string): DrugKnowledge | undefined {
  const q = query.toLowerCase().trim();
  if (!q) return undefined;
  return DRUG_FORMULARY.find(d => 
    d.name.toLowerCase().includes(q) ||
    d.genericName.toLowerCase().includes(q) ||
    d.brandNames.some(b => b.toLowerCase().includes(q))
  );
}

// Search suggestions for auto-complete
export function searchDrugs(query: string): DrugKnowledge[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return DRUG_FORMULARY.filter(d => 
    d.name.toLowerCase().includes(q) ||
    d.genericName.toLowerCase().includes(q) ||
    d.brandNames.some(b => b.toLowerCase().includes(q))
  ).slice(0, 6);
}
