import { useState, useMemo } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { HeartPulse, AlertCircle, Info, ShieldCheck, Heart, Sparkles, ArrowRight, ClipboardList, Activity, Search } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function HeartDiseaseRiskCalculator() {
  const [age, setAge] = useState<number>(50);
  const [totalCholesterol, setTotalCholesterol] = useState<number>(200);
  const [hdl, setHdl] = useState<number>(50);
  const [systolicBp, setSystolicBp] = useState<number>(120);
  const [treatedBp, setTreatedBp] = useState<boolean>(false);
  const [smoker, setSmoker] = useState<boolean>(false);
  const [diabetes, setDiabetes] = useState<boolean>(false);
  const [familyHistory, setFamilyHistory] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);

  const faqs = [
    { q: "Are women at risk for heart disease?", a: "Yes. Heart disease is the leading cause of death for women in the United States, killing more women than all forms of cancer combined." },
    { q: "What is the Framingham Risk Score?", a: "The Framingham Risk Score is a gender-specific algorithm used to estimate the 10-year cardiovascular risk of an individual. It evaluates factors like age, cholesterol, blood pressure, and smoking." },
    { q: "How do women's heart attack symptoms differ from men's?", a: "While women can experience chest pain, they are more likely than men to experience atypical symptoms such as shortness of breath, nausea/vomiting, and back or jaw pain." },
    { q: "Can heart disease be prevented?", a: "Up to 80% of premature heart disease and stroke events are preventable through lifestyle changes like diet, exercise, and not smoking." }
  ];

  const calculate = () => {
    // Simplified Framingham Risk Score approximation for Women
    let points = 0;

    // Age
    if (age >= 30 && age <= 34) points -= 7;
    else if (age >= 35 && age <= 39) points -= 3;
    else if (age >= 40 && age <= 44) points += 0;
    else if (age >= 45 && age <= 49) points += 3;
    else if (age >= 50 && age <= 54) points += 6;
    else if (age >= 55 && age <= 59) points += 8;
    else if (age >= 60 && age <= 64) points += 10;
    else if (age >= 65 && age <= 69) points += 12;
    else if (age >= 70 && age <= 74) points += 14;
    else if (age >= 75) points += 16;

    // Total Cholesterol
    if (age >= 20 && age <= 39) {
      if (totalCholesterol >= 160 && totalCholesterol <= 199) points += 4;
      else if (totalCholesterol >= 200 && totalCholesterol <= 239) points += 8;
      else if (totalCholesterol >= 240 && totalCholesterol <= 279) points += 11;
      else if (totalCholesterol >= 280) points += 13;
    } else if (age >= 40 && age <= 49) {
      if (totalCholesterol >= 160 && totalCholesterol <= 199) points += 3;
      else if (totalCholesterol >= 200 && totalCholesterol <= 239) points += 6;
      else if (totalCholesterol >= 240 && totalCholesterol <= 279) points += 8;
      else if (totalCholesterol >= 280) points += 10;
    } else if (age >= 50 && age <= 59) {
      if (totalCholesterol >= 160 && totalCholesterol <= 199) points += 2;
      else if (totalCholesterol >= 200 && totalCholesterol <= 239) points += 4;
      else if (totalCholesterol >= 240 && totalCholesterol <= 279) points += 5;
      else if (totalCholesterol >= 280) points += 7;
    } else if (age >= 60 && age <= 69) {
      if (totalCholesterol >= 160 && totalCholesterol <= 199) points += 1;
      else if (totalCholesterol >= 200 && totalCholesterol <= 239) points += 2;
      else if (totalCholesterol >= 240 && totalCholesterol <= 279) points += 3;
      else if (totalCholesterol >= 280) points += 4;
    }

    // Smoking
    if (smoker) {
      if (age >= 20 && age <= 39) points += 9;
      else if (age >= 40 && age <= 49) points += 7;
      else if (age >= 50 && age <= 59) points += 4;
      else if (age >= 60 && age <= 69) points += 2;
      else if (age >= 70) points += 1;
    }

    // HDL
    if (hdl >= 60) points -= 1;
    else if (hdl >= 50 && hdl <= 59) points += 0;
    else if (hdl >= 40 && hdl <= 49) points += 1;
    else if (hdl < 40) points += 2;

    // Systolic BP
    if (!treatedBp) {
      if (systolicBp >= 120 && systolicBp <= 129) points += 1;
      else if (systolicBp >= 130 && systolicBp <= 139) points += 2;
      else if (systolicBp >= 140 && systolicBp <= 159) points += 3;
      else if (systolicBp >= 160) points += 4;
    } else {
      if (systolicBp >= 120 && systolicBp <= 129) points += 3;
      else if (systolicBp >= 130 && systolicBp <= 139) points += 4;
      else if (systolicBp >= 140 && systolicBp <= 159) points += 5;
      else if (systolicBp >= 160) points += 6;
    }

    // Diabetes multiplier
    if (diabetes) points += 4;

    // Family History multiplier (Simplified)
    if (familyHistory) points += 2;

    // Convert points to risk percentage
    let riskPercent = 0;
    if (points <= 9) riskPercent = 1;
    else if (points >= 10 && points <= 12) riskPercent = 1;
    else if (points === 13 || points === 14) riskPercent = 2;
    else if (points === 15) riskPercent = 3;
    else if (points === 16) riskPercent = 4;
    else if (points === 17) riskPercent = 5;
    else if (points === 18) riskPercent = 6;
    else if (points === 19) riskPercent = 8;
    else if (points === 20) riskPercent = 11;
    else if (points === 21) riskPercent = 14;
    else if (points === 22) riskPercent = 17;
    else if (points === 23) riskPercent = 22;
    else if (points === 24) riskPercent = 27;
    else if (points >= 25) riskPercent = 30;

    let status = "Low Risk";
    let message = "Your estimated 10-year risk of cardiovascular disease is low. Continue maintaining a healthy lifestyle with a balanced diet and regular exercise.";
    let color = 'text-success';
    let bgColor = 'bg-success/5';
    let borderColor = 'border-success/10';

    if (riskPercent >= 20) {
      status = "High Risk";
      message = "Your estimated 10-year risk is high. You should consult a healthcare provider immediately to discuss aggressive risk reduction strategies, which may include medication.";
      color = 'text-rose-600';
      bgColor = 'bg-rose-50';
      borderColor = 'border-rose-100';
    } else if (riskPercent >= 7.5) {
      status = "Intermediate Risk";
      message = "Your estimated 10-year risk is intermediate. Guidelines suggest discussing preventive therapies, such as statins, with your doctor.";
      color = 'text-amber-600';
      bgColor = 'bg-amber-50';
      borderColor = 'border-amber-100';
    }

    setResults({
      riskPercent,
      status,
      message,
      color,
      bgColor,
      borderColor
    });
  };

  return (
    <CalculatorLayout
      title="Heart Disease Risk Assessment for Women"
      description="Estimate your 10-year risk of cardiovascular disease using gender-specific clinical algorithms. Expert guidance on women's heart health."
      intro="Heart disease is the leading cause of death for women, yet it is often underdiagnosed. This calculator uses the Framingham Risk Score, specifically calibrated for women, to estimate your statistical probability of developing cardiovascular disease over the next decade."
      schema={[
        generateSoftwareAppSchema(
          "Heart Disease Risk Calculator",
          "Estimate 10-year cardiovascular risk for women.",
          "https://femhealth.com/heart-disease-risk-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Heart Disease Risk Calculator", item: "https://femhealth.com/heart-disease-risk-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>This tool uses a point-based system derived from the Framingham Heart Study, specifically calibrated for women:</p>
          <ul>
            <li><strong>Age:</strong> Risk increases significantly with age, particularly after menopause when protective estrogen levels drop.</li>
            <li><strong>Cholesterol:</strong> High Total Cholesterol and low HDL ("good" cholesterol) increase plaque buildup in arteries.</li>
            <li><strong>Blood Pressure:</strong> High systolic blood pressure forces the heart to work harder.</li>
            <li><strong>Smoking & Diabetes:</strong> Both are massive independent risk factors that damage blood vessels.</li>
            <li><strong>Family History:</strong> Having a parent or sibling with early heart disease (before age 55 for men, 65 for women) increases your risk.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Women's BMI Calculator", path: "/womens-bmi-calculator" },
        { name: "Breast Cancer Risk Calculator", path: "/breast-cancer-risk-calculator" },
        { name: "Menopause Symptom Checker", path: "/menopause-checker" }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className={`${results.bgColor} ${results.borderColor} p-10 rounded-[2.5rem] border text-center shadow-sm`}>
            <div className={`flex justify-center mb-4 ${results.color}`}>
              <HeartPulse className="w-12 h-12" />
            </div>
            <p className={`${results.color} font-bold uppercase tracking-widest text-xs mb-2`}>10-Year Cardiovascular Risk</p>
            <h2 className={`text-6xl md:text-7xl font-serif font-bold ${results.color}`}>
              {results.riskPercent}%
            </h2>
            <p className={`text-xl font-bold mt-2 ${results.color}`}>{results.status}</p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-primary-light flex items-start gap-6 shadow-sm">
            <div className="p-3 bg-primary-light/20 text-primary rounded-xl shadow-sm">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-text-dark">Clinical Guidance</h3>
              <p className="text-text-medium mt-2 leading-relaxed text-lg">{results.message}</p>
            </div>
          </div>

          <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-4">
            <Info className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
            <p className="text-sm text-amber-800 leading-relaxed italic">
              <strong>Note:</strong> This tool provides a statistical estimate for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Heart Disease in Women: The Silent Threat</h2>
            <p>
              For decades, heart disease was viewed as a "man's disease." However, we now know that it is the leading cause of death for women globally. Women often experience heart disease differently than men, making awareness and early screening critical.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Atypical Symptoms</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  While men often feel "crushing chest pain," women are more likely to experience shortness of breath, extreme fatigue, nausea, and pain in the jaw, neck, or back.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">The Menopause Shift</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Estrogen provides a protective effect on blood vessels. As estrogen levels drop during menopause, a woman's risk of heart disease increases significantly.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Key Risk Factors for Women</h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-text-dark">High Blood Pressure</h4>
                  <p className="text-sm text-text-medium">Often called the "silent killer," hypertension is a major risk factor for stroke and heart attack. It can be managed through diet (DASH) and medication.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-text-dark">Diabetes</h4>
                  <p className="text-sm text-text-medium">Diabetes increases the risk of heart disease more in women than it does in men. It changes the way you experience pain, making "silent" heart attacks more common.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-bold text-text-dark">Mental Health</h4>
                  <p className="text-sm text-text-medium">Chronic stress, depression, and anxiety have a direct physiological impact on the heart. For women, emotional health is deeply intertwined with cardiovascular health.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10 text-center">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4">Expert Insight: Prevention is the Best Medicine</h3>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed text-text-medium italic">
              "The most important thing a woman can do for her heart is to know her numbers: blood pressure, cholesterol, and blood sugar. Once you know your risk, you have the power to change it. Small shifts in daily habits—like a 30-minute walk or choosing whole foods—can literally save your life."
            </p>
          </section>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-primary-light space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Current Age</label>
              <input 
                type="number" 
                value={age} 
                onChange={(e) => setAge(Number(e.target.value))} 
                className="input-field" 
              />
            </div>

            <div className="space-y-3">
              <Tooltip content="The top number of your blood pressure reading (e.g., 120)." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Systolic Blood Pressure</label>
              </Tooltip>
              <input 
                type="number" 
                value={systolicBp} 
                onChange={(e) => setSystolicBp(Number(e.target.value))} 
                className="input-field" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Tooltip content="Your total cholesterol level in mg/dL." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Total Cholesterol</label>
              </Tooltip>
              <input 
                type="number" 
                value={totalCholesterol} 
                onChange={(e) => setTotalCholesterol(Number(e.target.value))} 
                className="input-field" 
              />
            </div>

            <div className="space-y-3">
              <Tooltip content="Your HDL (High-Density Lipoprotein) level, often called 'good' cholesterol." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">HDL Cholesterol</label>
              </Tooltip>
              <input 
                type="number" 
                value={hdl} 
                onChange={(e) => setHdl(Number(e.target.value))} 
                className="input-field" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-4 border-t border-neutral-100">
            <label className="flex items-center gap-4 p-5 rounded-2xl border border-neutral-100 cursor-pointer hover:bg-neutral-50 transition-all">
              <input 
                type="checkbox" 
                checked={treatedBp} 
                onChange={(e) => setTreatedBp(e.target.checked)} 
                className="w-6 h-6 rounded-lg text-primary focus:ring-primary border-neutral-300" 
              />
              <span className="text-sm font-medium text-text-dark">I am taking blood pressure medication</span>
            </label>

            <label className="flex items-center gap-4 p-5 rounded-2xl border border-neutral-100 cursor-pointer hover:bg-neutral-50 transition-all">
              <input 
                type="checkbox" 
                checked={smoker} 
                onChange={(e) => setSmoker(e.target.checked)} 
                className="w-6 h-6 rounded-lg text-primary focus:ring-primary border-neutral-300" 
              />
              <span className="text-sm font-medium text-text-dark">I currently smoke tobacco</span>
            </label>

            <label className="flex items-center gap-4 p-5 rounded-2xl border border-neutral-100 cursor-pointer hover:bg-neutral-50 transition-all">
              <input 
                type="checkbox" 
                checked={diabetes} 
                onChange={(e) => setDiabetes(e.target.checked)} 
                className="w-6 h-6 rounded-lg text-primary focus:ring-primary border-neutral-300" 
              />
              <span className="text-sm font-medium text-text-dark">I have been diagnosed with Diabetes</span>
            </label>

            <label className="flex items-center gap-4 p-5 rounded-2xl border border-neutral-100 cursor-pointer hover:bg-neutral-50 transition-all">
              <input 
                type="checkbox" 
                checked={familyHistory} 
                onChange={(e) => setFamilyHistory(e.target.checked)} 
                className="w-6 h-6 rounded-lg text-primary focus:ring-primary border-neutral-300" 
              />
              <span className="text-sm font-medium text-text-dark">Family history of early heart disease</span>
            </label>
          </div>
        </div>

        <button 
          onClick={calculate} 
          className="btn-primary w-full py-5 text-lg shadow-xl shadow-primary/20"
        >
          Calculate My Risk Score
        </button>
      </div>
    </CalculatorLayout>
  );
}
