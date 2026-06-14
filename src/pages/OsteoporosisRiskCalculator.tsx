import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Bone, AlertCircle, Info, ShieldCheck, Heart, Sparkles, ArrowRight, ClipboardList, Activity, Search } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function OsteoporosisRiskCalculator() {
  const [age, setAge] = useState<number>(55);
  const [weight, setWeight] = useState<number>(130);
  const [height, setHeight] = useState<number>(64); // inches
  const [previousFracture, setPreviousFracture] = useState<boolean>(false);
  const [parentFracture, setParentFracture] = useState<boolean>(false);
  const [smoking, setSmoking] = useState<boolean>(false);
  const [steroids, setSteroids] = useState<boolean>(false);
  const [rheumatoid, setRheumatoid] = useState<boolean>(false);
  const [menopauseStatus, setMenopauseStatus] = useState<string>('pre');
  const [results, setResults] = useState<any>(null);

  const faqs = [
    { q: "What is osteoporosis?", a: "Osteoporosis is a bone disease that develops when bone mineral density and bone mass decrease, or when the quality or structure of bone changes. This can lead to a decrease in bone strength that can increase the risk of broken bones (fractures)." },
    { q: "Why are women at higher risk?", a: "Women have smaller, thinner bones than men. Furthermore, estrogen, a hormone in women that protects bones, decreases sharply when women reach menopause, which can cause rapid bone loss." },
    { q: "How can I prevent osteoporosis?", a: "A diet rich in calcium and vitamin D, regular weight-bearing exercise (like walking or lifting weights), and avoiding smoking and excessive alcohol can help prevent bone loss." },
    { q: "What is a DEXA scan?", a: "A Dual-Energy X-ray Absorptiometry (DEXA) scan is a non-invasive test that measures bone mineral density. It is the gold standard for diagnosing osteoporosis." }
  ];

  const calculate = () => {
    // Simplified risk assessment inspired by FRAX and OST (Osteoporosis Self-Assessment Tool)
    // OST = (Weight in kg - Age in years) * 0.2
    
    const weightKg = weight * 0.453592;
    const ostScore = (weightKg - age) * 0.2;

    let riskLevel = "Low Risk";
    let message = "Based on your age and weight, your baseline risk for osteoporosis is low. Continue healthy lifestyle habits like weight-bearing exercise and adequate calcium intake.";
    let color = 'text-success';
    let bgColor = 'bg-success/5';
    let borderColor = 'border-success/10';

    if (ostScore < -3) {
      riskLevel = "High Risk";
      message = "Based on your age and weight profile, you are at a higher risk for osteoporosis. You should discuss a DEXA scan (bone density test) with your doctor.";
      color = 'text-rose-600';
      bgColor = 'bg-rose-50';
      borderColor = 'border-rose-100';
    } else if (ostScore >= -3 && ostScore <= 1) {
      riskLevel = "Moderate Risk";
      message = "You have a moderate risk for osteoporosis. Discuss your bone health with your doctor at your next checkup, especially if you have other risk factors.";
      color = 'text-amber-600';
      bgColor = 'bg-amber-50';
      borderColor = 'border-amber-100';
    }

    // Clinical risk factors that elevate risk regardless of OST
    let clinicalFactors = 0;
    if (previousFracture) clinicalFactors++;
    if (parentFracture) clinicalFactors++;
    if (smoking) clinicalFactors++;
    if (steroids) clinicalFactors++;
    if (rheumatoid) clinicalFactors++;
    if (menopauseStatus === 'post') clinicalFactors++;

    if (clinicalFactors >= 2 && riskLevel !== "High Risk") {
      riskLevel = "Elevated Risk (Clinical)";
      message = "While your age/weight profile might be okay, you have multiple clinical risk factors that elevate your risk of bone fractures. A medical evaluation is highly recommended.";
      color = 'text-amber-600';
      bgColor = 'bg-amber-50';
      borderColor = 'border-amber-100';
    }

    setResults({
      riskLevel,
      message,
      color,
      bgColor,
      borderColor,
      ostScore: ostScore.toFixed(1),
      clinicalFactors
    });
  };

  return (
    <CalculatorLayout
      title="Osteoporosis Risk Assessment for Women"
      description="Assess your risk of osteoporosis and bone fractures based on age, weight, and clinical history. Expert guidance on bone health and prevention."
      intro="Osteoporosis is often called a 'silent disease' because bone loss occurs without symptoms until a fracture happens. This tool uses the Osteoporosis Self-Assessment Tool (OST) and clinical risk factors to help you understand your bone health profile and determine if a DEXA scan is appropriate."
      schema={[
        generateSoftwareAppSchema(
          "Osteoporosis Risk Calculator",
          "Assess risk for osteoporosis and bone fractures.",
          "https://hernexa.com/osteoporosis-risk-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://hernexa.com" },
          { name: "Tools", item: "https://hernexa.com/tools" },
          { name: "Osteoporosis Risk Calculator", item: "https://hernexa.com/osteoporosis-risk-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>This calculator uses a combination of the Osteoporosis Self-Assessment Tool (OST) and clinical risk factors:</p>
          <ul>
            <li><strong>OST Score:</strong> A validated formula based purely on age and weight. Lower body weight and older age significantly increase risk.</li>
            <li><strong>Clinical Factors:</strong> We evaluate secondary risk factors like family history, smoking, and the use of glucocorticoids (steroids).</li>
            <li><strong>Hormonal Status:</strong> Menopause is a primary driver of bone loss due to the sharp decline in estrogen.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Menopause Symptom Checker", path: "/menopause-checker" },
        { name: "Women's BMI Calculator", path: "/womens-bmi-calculator" },
        { name: "Thyroid Risk Calculator", path: "/thyroid-risk-calculator" }
      ]}
      medicalReferences={[
        {
          title: "Osteoporosis in Women",
          url: "https://www.womenshealth.gov/a-z-topics/osteoporosis",
          source: "WomensHealth.gov"
        },
        {
          title: "Bone Health and Osteoporosis",
          url: "https://www.nia.nih.gov/health/osteoporosis",
          source: "NIH"
        },
        {
          title: "Osteoporosis Prevention",
          url: "https://www.cdc.gov/genomics/resources/diseases/osteoporosis.htm",
          source: "CDC"
        },
        {
          title: "Osteoporosis",
          url: "https://en.wikipedia.org/wiki/Osteoporosis",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className={`${results.bgColor} ${results.borderColor} p-10 rounded-[2.5rem] border text-center shadow-sm`}>
            <div className={`flex justify-center mb-4 ${results.color}`}>
              <Bone className="w-12 h-12" />
            </div>
            <p className={`${results.color} font-bold uppercase tracking-widest text-xs mb-2`}>Bone Health Assessment</p>
            <h2 className={`text-5xl md:text-6xl font-serif font-bold ${results.color}`}>
              {results.riskLevel}
            </h2>
            <p className="text-text-medium mt-4 max-w-lg mx-auto leading-relaxed">{results.message}</p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-primary-light flex items-start gap-6 shadow-sm">
            <div className="p-3 bg-primary-light/20 text-primary rounded-xl shadow-sm">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-text-dark">Analysis Details</h3>
              <p className="text-text-medium mt-2 leading-relaxed">
                Your calculated OST score is <strong>{results.ostScore}</strong>. You reported <strong>{results.clinicalFactors}</strong> clinical risk factor(s) that can negatively impact bone density.
              </p>
            </div>
          </div>

          <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-4">
            <Info className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
            <p className="text-sm text-amber-800 leading-relaxed italic">
              <strong>Note:</strong> This tool is for educational purposes only and does not replace a clinical FRAX assessment or a DEXA scan performed by a medical professional.
            </p>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Menopause Symptom Checker.</p>
            </div>
            <Link to="/menopause-checker" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Menopause Symptom Checker &rarr;
            </Link>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Why Bone Health Matters for Women</h2>
            <p>
              Women are disproportionately affected by osteoporosis. In fact, 80% of Americans with osteoporosis are women. Understanding why can help you take better care of your skeleton.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">The Estrogen Connection</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Estrogen helps keep bones strong. When levels drop during menopause, bone loss can accelerate rapidly—sometimes up to 20% of bone density is lost in the first 5-7 years after menopause.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Peak Bone Mass</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Most people reach their "peak bone mass" around age 30. Women generally have smaller, thinner bones than men to begin with, leaving less "bone in the bank" as they age.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">How to Build and Protect Bone</h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-text-dark">Weight-Bearing Exercise</h4>
                  <p className="text-sm text-text-medium">Activities like walking, jogging, dancing, and weightlifting put stress on your bones, which signals them to build more density.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-text-dark">Calcium & Vitamin D</h4>
                  <p className="text-sm text-text-medium">Calcium is the building block of bone, but Vitamin D is the "key" that lets your body absorb it. Aim for 1,200mg of calcium daily after age 50.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-bold text-text-dark">Limit Bone-Depleters</h4>
                  <p className="text-sm text-text-medium">Smoking and excessive alcohol consumption (more than 2 drinks a day) interfere with the balance of calcium and bone-building hormones.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10 text-center">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4">Expert Insight: Don't Wait for a Break</h3>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed text-text-medium italic">
              "Osteoporosis is often preventable and treatable if caught early. If you are over 65, or over 50 with risk factors, a DEXA scan should be a routine part of your health screenings. Knowing your T-score is just as important as knowing your blood pressure."
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
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Weight (lbs)</label>
              <input 
                type="number" 
                value={weight} 
                onChange={(e) => setWeight(Number(e.target.value))} 
                className="input-field" 
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Menopause Status</label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setMenopauseStatus('pre')}
                className={`p-4 rounded-xl border font-medium transition-all ${menopauseStatus === 'pre' ? 'bg-primary text-white border-primary' : 'bg-white text-text-medium border-neutral-200 hover:border-primary'}`}
              >
                Pre-Menopausal
              </button>
              <button 
                onClick={() => setMenopauseStatus('post')}
                className={`p-4 rounded-xl border font-medium transition-all ${menopauseStatus === 'post' ? 'bg-primary text-white border-primary' : 'bg-white text-text-medium border-neutral-200 hover:border-primary'}`}
              >
                Post-Menopausal
              </button>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-neutral-100">
            <p className="text-xs font-bold text-text-medium uppercase tracking-[0.15em] mb-4">Clinical Risk Factors</p>
            
            <label className="flex items-center gap-4 p-4 rounded-xl border border-neutral-100 cursor-pointer hover:bg-neutral-50 transition-all">
              <input type="checkbox" checked={previousFracture} onChange={(e) => setPreviousFracture(e.target.checked)} className="w-6 h-6 rounded-lg text-primary focus:ring-primary border-neutral-300" />
              <span className="text-sm font-medium text-text-dark">Previous fracture as an adult (minor fall)</span>
            </label>

            <label className="flex items-center gap-4 p-4 rounded-xl border border-neutral-100 cursor-pointer hover:bg-neutral-50 transition-all">
              <input type="checkbox" checked={parentFracture} onChange={(e) => setParentFracture(e.target.checked)} className="w-6 h-6 rounded-lg text-primary focus:ring-primary border-neutral-300" />
              <span className="text-sm font-medium text-text-dark">Parent fractured their hip</span>
            </label>

            <label className="flex items-center gap-4 p-4 rounded-xl border border-neutral-100 cursor-pointer hover:bg-neutral-50 transition-all">
              <input type="checkbox" checked={smoking} onChange={(e) => setSmoking(e.target.checked)} className="w-6 h-6 rounded-lg text-primary focus:ring-primary border-neutral-300" />
              <span className="text-sm font-medium text-text-dark">Current smoker</span>
            </label>

            <label className="flex items-center gap-4 p-4 rounded-xl border border-neutral-100 cursor-pointer hover:bg-neutral-50 transition-all">
              <input type="checkbox" checked={steroids} onChange={(e) => setSteroids(e.target.checked)} className="w-6 h-6 rounded-lg text-primary focus:ring-primary border-neutral-300" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-text-dark">Long-term steroid use (e.g., Prednisone)</span>
                <span className="text-[10px] text-text-medium uppercase tracking-wider">More than 3 months</span>
              </div>
            </label>

            <label className="flex items-center gap-4 p-4 rounded-xl border border-neutral-100 cursor-pointer hover:bg-neutral-50 transition-all">
              <input type="checkbox" checked={rheumatoid} onChange={(e) => setRheumatoid(e.target.checked)} className="w-6 h-6 rounded-lg text-primary focus:ring-primary border-neutral-300" />
              <span className="text-sm font-medium text-text-dark">Rheumatoid Arthritis diagnosis</span>
            </label>
          </div>
        </div>

        <button 
          onClick={calculate} 
          className="btn-primary w-full py-5 text-lg shadow-xl shadow-primary/20"
        >
          Assess My Bone Health
        </button>
      </div>
    </CalculatorLayout>
  );
}
