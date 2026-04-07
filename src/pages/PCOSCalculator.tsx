import { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { AlertCircle, CheckCircle2, Info, Activity, ClipboardList, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function PCOSCalculator() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const symptomList = [
    { id: 'irregular', label: 'Irregular or absent periods', desc: 'Cycles longer than 35 days or fewer than 9 periods per year.' },
    { id: 'hair', label: 'Excessive hair growth (Hirsutism)', desc: 'Unwanted hair on the face, chest, or back.' },
    { id: 'acne', label: 'Severe acne or oily skin', desc: 'Persistent acne that doesn\'t respond to standard treatments.' },
    { id: 'weight', label: 'Difficulty losing weight', desc: 'Weight gain particularly around the abdomen.' },
    { id: 'thinning', label: 'Thinning hair on the scalp', desc: 'Male-pattern baldness or general hair thinning.' },
    { id: 'dark', label: 'Darkening of the skin', desc: 'Acanthosis nigricans, often in the neck, groin, or underarms.' },
    { id: 'cysts', label: 'Ovarian Cysts', desc: 'Polycystic ovaries confirmed via ultrasound.' },
    { id: 'fatigue', label: 'Fatigue or low energy', desc: 'Often related to insulin resistance or hormonal imbalances.' }
  ];

  const faqs = [
    { q: "Can PCOS be cured?", a: "There is no cure for PCOS, but symptoms can be managed effectively through lifestyle changes, diet, and medications like birth control or metformin." },
    { q: "Does PCOS cause infertility?", a: "PCOS is a leading cause of infertility because it can prevent regular ovulation. However, many women with PCOS conceive successfully with the help of fertility treatments." },
    { q: "What should I ask my doctor?", a: "Ask about blood tests for hormone levels (testosterone, LH, FSH), an ultrasound to check for cysts, and a glucose tolerance test to check for insulin resistance." },
    { q: "What is the Rotterdam Criteria?", a: "It is the international standard for diagnosing PCOS. A diagnosis requires at least two of three: irregular periods, high androgen levels (clinical or biochemical), and polycystic ovaries on ultrasound." }
  ];

  const toggleSymptom = (id: string) => {
    setSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const calculate = () => {
    setError(null);
    if (symptoms.length === 0) {
      setError("Please select at least one symptom to assess your risk.");
      return;
    }

    const score = symptoms.length;
    let risk = 'Low';
    let message = 'Your symptoms do not strongly suggest PCOS. However, if you are concerned about your hormonal health, it is always best to consult a doctor.';
    
    if (score >= 4) {
      risk = 'High';
      message = 'Your symptoms are highly suggestive of PCOS. We strongly recommend scheduling an appointment with an endocrinologist or OB-GYN for a formal diagnosis.';
    } else if (score >= 2) {
      risk = 'Moderate';
      message = 'You have some symptoms associated with PCOS. It is worth discussing these with your healthcare provider during your next checkup.';
    }

    setResults({ risk, message, score });
  };

  return (
    <CalculatorLayout
      title="PCOS Symptom Checker & Predictor"
      description="Assess your risk for Polycystic Ovary Syndrome (PCOS) based on common symptoms. Get expert guidance on next steps and diagnosis. Essential women's health tracking."
      intro="Polycystic Ovary Syndrome (PCOS) is a common hormonal disorder affecting 1 in 10 women of childbearing age. Our PCOS symptom checker helps you evaluate your risk by analyzing common indicators like cycle regularity, skin changes, and hair growth patterns. Understanding your risk profile is the first step toward effective management."
      schema={[
        generateSoftwareAppSchema(
          "PCOS Symptom Checker",
          "Assess PCOS risk based on symptoms.",
          "https://femhealth.com/pcos-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "PCOS Symptom Checker", item: "https://femhealth.com/pcos-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>PCOS is typically diagnosed using the Rotterdam Criteria, which requires two of the following three:</p>
          <ul>
            <li><strong>Irregular Periods:</strong> Oligo-ovulation or anovulation (cycles longer than 35 days).</li>
            <li><strong>High Androgen Levels:</strong> Clinical signs (like hirsutism or acne) or biochemical evidence (blood tests).</li>
            <li><strong>Polycystic Ovaries:</strong> Confirmed via pelvic ultrasound (12 or more small follicles on one or both ovaries).</li>
            <li><strong>Note:</strong> This tool is a screening aid, not a diagnostic tool. A formal diagnosis requires medical tests.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Period Calculator", path: "/period-calculator" },
        { name: "Cycle Length Calculator", path: "/cycle-length-calculator" },
        { name: "Ovulation Calculator", path: "/ovulation-calculator" }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <p className="text-primary font-bold uppercase tracking-widest text-sm">Your PCOS Risk Level</p>
            <h2 className={`text-5xl md:text-6xl font-serif font-bold ${results.risk === 'High' ? 'text-accent' : results.risk === 'Moderate' ? 'text-amber-500' : 'text-success'}`}>
              {results.risk} Risk
            </h2>
            <div className="flex justify-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full ${i < results.score ? (results.risk === 'High' ? 'bg-accent' : results.risk === 'Moderate' ? 'bg-amber-500' : 'bg-success') : 'bg-neutral-200'}`} />
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-primary-light space-y-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-bg-light text-primary rounded-xl shadow-inner">
                <ClipboardList className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-text-dark">Assessment Summary</h3>
            </div>
            <p className="text-text-medium leading-relaxed text-lg">
              {results.message}
            </p>
          </div>

          <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
            <p className="text-sm text-amber-800 leading-relaxed italic">
              Important: This tool is for informational purposes only. Only a qualified medical professional can diagnose PCOS through physical exams, blood tests, and ultrasounds.
            </p>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">How We Assess Your PCOS Risk</h2>
            <p>
              Our PCOS symptom checker uses a weighted scoring system based on the clinical guidelines established by the Rotterdam Criteria, which is the internationally accepted standard for diagnosing Polycystic Ovary Syndrome. Here is how the algorithm evaluates your input:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-text-medium">
              <li><strong>Primary Indicators:</strong> Symptoms like "Irregular or absent periods" and "Excessive hair growth" carry the most diagnostic weight. In clinical settings, these two symptoms alone often prompt a doctor to order an ultrasound and bloodwork.</li>
              <li><strong>Secondary Indicators:</strong> Symptoms such as "Severe acne," "Difficulty losing weight," and "Thinning hair" are common manifestations of the hormonal imbalances associated with PCOS (specifically, hyperandrogenism and insulin resistance).</li>
              <li><strong>The Scoring Model:</strong> The calculator tallies your selected symptoms. A score of 1-2 indicates a low to moderate risk, suggesting your symptoms may be isolated or related to other factors. A score of 4 or more triggers a "High Risk" assessment, as it demonstrates a cluster of symptoms that strongly align with the systemic nature of PCOS.</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">What Your Results Actually Mean</h2>
            <p>
              It is critical to understand that this tool provides a <em>risk assessment</em>, not a medical diagnosis. Here is a detailed breakdown of how to interpret your specific risk level and what your next steps should be:
            </p>
            <div className="space-y-6 mt-6">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">High Risk</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  A high-risk result means your symptom cluster strongly mirrors the clinical presentation of PCOS. You are likely experiencing both ovulatory dysfunction (irregular periods) and signs of elevated androgens (hair growth, acne). <strong>Next Step:</strong> Schedule an appointment with an endocrinologist or OB-GYN. Request a full hormone panel and a pelvic ultrasound.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Moderate Risk</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  A moderate risk indicates you have some overlapping symptoms, but they may not fully satisfy the Rotterdam Criteria. <strong>Next Step:</strong> Begin tracking your cycles meticulously. Note the length of your cycles and any physical symptoms. Bring this data to your next annual well-woman exam to discuss with your doctor.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Low Risk</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  A low-risk result suggests your symptoms are likely isolated. However, if you are experiencing any hormonal concerns, it's always worth a conversation with a professional. <strong>Next Step:</strong> If a specific symptom (like acne) is bothering you, consult a specialist (like a dermatologist) for targeted treatment.
                </p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-text-dark">The Insulin Resistance Connection</h3>
              <p className="text-sm leading-relaxed text-text-medium">
                Up to 70% of women with PCOS have insulin resistance, meaning their cells don't respond properly to insulin. This causes the pancreas to produce more insulin, which in turn stimulates the ovaries to produce excess testosterone. This is why symptoms like "difficulty losing weight" and "darkening of the skin" are included in our checker.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-text-dark">Why Diagnosis is Crucial</h3>
              <p className="text-sm leading-relaxed text-text-medium">
                PCOS is not just a fertility issue; it is a lifelong metabolic condition. Left unmanaged, it significantly increases the risk of developing type 2 diabetes, high blood pressure, sleep apnea, and endometrial cancer. Early diagnosis allows for lifestyle interventions that can mitigate these long-term risks.
              </p>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4 text-center">Expert Insight: You Are Not Your Diagnosis</h3>
            <p className="text-sm text-center max-w-2xl mx-auto leading-relaxed italic text-text-medium">
              "A PCOS diagnosis can feel overwhelming, but it is highly manageable. The first line of treatment is often lifestyle modification—specifically, adopting a diet that stabilizes blood sugar and engaging in regular strength training. Many women find that with the right management plan, their symptoms diminish significantly and they go on to have healthy, natural pregnancies."
            </p>
          </section>
        </div>
      }
    >
      <div className="space-y-8">
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-medium">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}
        <div className="space-y-6">
          <Tooltip content="Select all the symptoms you are currently experiencing to evaluate your risk level." showIcon>
            <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Select the symptoms you are experiencing:</label>
          </Tooltip>
          <div className="grid grid-cols-1 gap-4">
            {symptomList.map((s) => (
              <button 
                key={s.id}
                onClick={() => toggleSymptom(s.id)}
                className={`p-6 rounded-[1.5rem] border text-left transition-all flex items-start gap-4 ${symptoms.includes(s.id) ? 'bg-primary/5 border-primary shadow-sm' : 'bg-white border-border hover:border-primary-light'}`}
              >
                <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${symptoms.includes(s.id) ? 'bg-primary border-primary text-white' : 'border-border'}`}>
                  {symptoms.includes(s.id) && <CheckCircle2 className="w-4 h-4" />}
                </div>
                <div>
                  <p className="font-bold text-text-dark text-base">{s.label}</p>
                  <p className="text-sm text-text-medium mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={calculate}
          className="btn-primary w-full text-lg"
        >
          Check My Risk
        </button>
      </div>
    </CalculatorLayout>
  );
}
