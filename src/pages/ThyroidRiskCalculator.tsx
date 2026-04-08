import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Activity, AlertCircle, Info, ShieldCheck, Heart, Sparkles, ArrowRight, ClipboardList, Search, Thermometer, Wind } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function ThyroidRiskCalculator() {
  const [hypoSymptoms, setHypoSymptoms] = useState<string[]>([]);
  const [hyperSymptoms, setHyperSymptoms] = useState<string[]>([]);
  const [familyHistory, setFamilyHistory] = useState<boolean>(false);
  const [postpartum, setPostpartum] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);

  const faqs = [
    { q: "What is the difference between hypothyroidism and hyperthyroidism?", a: "Hypothyroidism is an underactive thyroid (not producing enough hormones), leading to a slowed metabolism. Hyperthyroidism is an overactive thyroid (producing too much hormone), leading to an accelerated metabolism." },
    { q: "Why are women more prone to thyroid issues?", a: "Women are 5 to 8 times more likely than men to have thyroid problems. This is largely due to autoimmune factors (like Hashimoto's or Graves' disease) which disproportionately affect women, often triggered by hormonal changes during pregnancy or menopause." },
    { q: "How is a thyroid disorder diagnosed?", a: "A doctor will diagnose a thyroid disorder using a simple blood test called a TSH (Thyroid Stimulating Hormone) test, sometimes accompanied by tests for Free T4, Free T3, and thyroid antibodies." },
    { q: "What is postpartum thyroiditis?", a: "It is an inflammation of the thyroid gland that occurs after giving birth. It often starts with a phase of hyperthyroidism followed by a phase of hypothyroidism before the thyroid returns to normal." }
  ];

  const hypoOptions = [
    { id: 'fatigue', label: 'Severe fatigue / sluggishness' },
    { id: 'weight_gain', label: 'Unexplained weight gain' },
    { id: 'cold', label: 'Feeling cold constantly' },
    { id: 'hair_loss', label: 'Thinning hair / dry skin' },
    { id: 'constipation', label: 'Constipation' },
    { id: 'depression', label: 'Depression / brain fog' },
    { id: 'heavy_periods', label: 'Heavy or irregular periods' }
  ];

  const hyperOptions = [
    { id: 'anxiety', label: 'Anxiety / nervousness' },
    { id: 'weight_loss', label: 'Unexplained weight loss' },
    { id: 'heat', label: 'Feeling hot / sweating easily' },
    { id: 'heart_palpitations', label: 'Rapid heart rate / palpitations' },
    { id: 'diarrhea', label: 'Frequent bowel movements' },
    { id: 'insomnia', label: 'Difficulty sleeping' },
    { id: 'light_periods', label: 'Very light or skipped periods' }
  ];

  const toggleHypo = (id: string) => {
    if (hypoSymptoms.includes(id)) setHypoSymptoms(hypoSymptoms.filter(s => s !== id));
    else setHypoSymptoms([...hypoSymptoms, id]);
  };

  const toggleHyper = (id: string) => {
    if (hyperSymptoms.includes(id)) setHyperSymptoms(hyperSymptoms.filter(s => s !== id));
    else setHyperSymptoms([...hyperSymptoms, id]);
  };

  const calculate = () => {
    const hypoScore = hypoSymptoms.length;
    const hyperScore = hyperSymptoms.length;

    let status = "Low Risk";
    let message = "Based on your selections, you have few symptoms associated with thyroid dysfunction. If you still feel unwell, consult a doctor as these symptoms can overlap with many other conditions.";
    let color = 'text-success';
    let bgColor = 'bg-success/5';
    let borderColor = 'border-success/10';
    let isWarning = false;

    if (hypoScore >= 3 && hypoScore > hyperScore) {
      status = "Elevated Risk: Hypothyroidism";
      message = "You have selected multiple symptoms commonly associated with an underactive thyroid (Hypothyroidism). This slows down your metabolism. You should request a TSH blood test from your doctor.";
      color = 'text-blue-600';
      bgColor = 'bg-blue-50';
      borderColor = 'border-blue-100';
      isWarning = true;
    } else if (hyperScore >= 3 && hyperScore > hypoScore) {
      status = "Elevated Risk: Hyperthyroidism";
      message = "You have selected multiple symptoms commonly associated with an overactive thyroid (Hyperthyroidism). This accelerates your metabolism and can strain your heart. You should request a TSH blood test from your doctor.";
      color = 'text-rose-600';
      bgColor = 'bg-rose-50';
      borderColor = 'border-rose-100';
      isWarning = true;
    } else if (hypoScore >= 3 && hyperScore >= 3) {
      status = "Mixed Symptoms";
      message = "You are experiencing a mix of both hyper and hypo symptoms. This can sometimes happen with autoimmune thyroiditis (like Hashimoto's) during flare-ups. A medical evaluation is recommended.";
      color = 'text-purple-600';
      bgColor = 'bg-purple-50';
      borderColor = 'border-purple-100';
      isWarning = true;
    }

    if (familyHistory || postpartum) {
      message += " Your risk is further elevated by your family history or recent pregnancy status.";
    }

    setResults({
      status,
      message,
      color,
      bgColor,
      borderColor,
      isWarning,
      hypoScore,
      hyperScore
    });
  };

  return (
    <CalculatorLayout
      title="Thyroid Health Symptom Assessment"
      description="Analyze your symptoms to assess your risk for Hypothyroidism (underactive) or Hyperthyroidism (overactive). Expert guidance on thyroid health for women."
      intro={<>The thyroid gland is the master controller of your metabolism. When it's out of balance, every system in your body can feel the effects—from your energy levels and weight to your mood and <Link to="/period-calculator" className="text-primary hover:underline font-medium">menstrual cycle</Link>. This checker helps you identify patterns that may indicate a thyroid disorder.</>}
      schema={[
        generateSoftwareAppSchema(
          "Thyroid Risk Calculator",
          "Assess symptoms for hypo and hyperthyroidism.",
          "https://femhealth.com/thyroid-risk-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Thyroid Risk Calculator", item: "https://femhealth.com/thyroid-risk-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>This tool evaluates your symptoms against the classic clinical presentations of the two main thyroid disorders:</p>
          <ul>
            <li><strong>Hypothyroidism (Underactive):</strong> Characterized by a slowing down of bodily functions (weight gain, fatigue, feeling cold).</li>
            <li><strong>Hyperthyroidism (Overactive):</strong> Characterized by a speeding up of bodily functions (weight loss, anxiety, rapid heart rate).</li>
            <li><strong>Risk Factors:</strong> We also account for high-risk periods like the postpartum phase and family history.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "PCOS Symptom Checker", path: "/pcos-calculator" },
        { name: "Menopause Symptom Checker", path: "/menopause-checker" },
        { name: "Period Symptom Tracker", path: "/period-symptom-tracker" }
      ]}
      medicalReferences={[
        {
          title: "Thyroid Disease in Women",
          url: "https://www.womenshealth.gov/a-z-topics/thyroid-disease",
          source: "WomensHealth.gov"
        },
        {
          title: "Hypothyroidism (Underactive Thyroid)",
          url: "https://www.niddk.nih.gov/health-information/endocrine-diseases/hypothyroidism",
          source: "NIH"
        },
        {
          title: "Thyroid Problems",
          url: "https://www.nhs.uk/conditions/thyroid-problems/",
          source: "NHS"
        },
        {
          title: "Thyroid disease",
          url: "https://en.wikipedia.org/wiki/Thyroid_disease",
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
              <Activity className="w-12 h-12" />
            </div>
            <p className={`${results.color} font-bold uppercase tracking-widest text-xs mb-2`}>Assessment Result</p>
            <h2 className={`text-4xl md:text-5xl font-serif font-bold ${results.color}`}>
              {results.status}
            </h2>
            <p className="text-text-medium mt-4 max-w-lg mx-auto leading-relaxed text-lg">{results.message}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-blue-800 uppercase tracking-wider">Hypo Symptoms</span>
                <span className="text-xl font-bold text-blue-600">{results.hypoScore} / 7</span>
              </div>
              <div className="w-full bg-blue-50 rounded-full h-3">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(results.hypoScore / 7) * 100}%` }}
                  className="bg-blue-500 h-3 rounded-full shadow-sm"
                ></motion.div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-rose-800 uppercase tracking-wider">Hyper Symptoms</span>
                <span className="text-xl font-bold text-rose-600">{results.hyperScore} / 7</span>
              </div>
              <div className="w-full bg-rose-50 rounded-full h-3">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(results.hyperScore / 7) * 100}%` }}
                  className="bg-rose-500 h-3 rounded-full shadow-sm"
                ></motion.div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-4">
            <Info className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
            <p className="text-sm text-amber-800 leading-relaxed italic">
              <strong>Note:</strong> This tool is for educational purposes only. Thyroid disorders can only be diagnosed with a clinical blood test (TSH, Free T3, Free T4) ordered by a healthcare professional.
            </p>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our PCOS Symptom Checker.</p>
            </div>
            <Link to="/pcos-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              PCOS Symptom Checker &rarr;
            </Link>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">The Thyroid-Women Connection</h2>
            <p>
              Women are significantly more likely to develop thyroid issues than men. This is largely because thyroid function is closely linked to the female reproductive system and autoimmune responses.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Autoimmune Factors</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Most thyroid issues are autoimmune (Hashimoto's or Graves'). Women are generally more prone to autoimmune conditions, where the body's immune system mistakenly attacks its own tissues.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Hormonal Triggers</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Puberty, pregnancy, and menopause are all times of major hormonal shifts that can trigger or worsen underlying thyroid imbalances.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Hypo vs. Hyper: What's the Difference?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2">
                  <Thermometer className="w-5 h-5" /> Hypothyroidism
                </h3>
                <p className="text-sm text-text-medium">
                  Think of this as your body's "engine" running too slow. Everything slows down, leading to weight gain, fatigue, and a feeling of being "stuck."
                </p>
                <ul className="text-sm text-text-medium space-y-2 list-disc pl-5">
                  <li>Brain fog and memory issues</li>
                  <li>Dry, brittle hair and skin</li>
                  <li>Muscle aches and joint pain</li>
                  <li>High cholesterol</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-rose-700 flex items-center gap-2">
                  <Wind className="w-5 h-5" /> Hyperthyroidism
                </h3>
                <p className="text-sm text-text-medium">
                  This is your body's "engine" running too fast. It burns through energy too quickly, leading to weight loss, anxiety, and physical strain.
                </p>
                <ul className="text-sm text-text-medium space-y-2 list-disc pl-5">
                  <li>Tremors in the hands</li>
                  <li>Increased appetite but weight loss</li>
                  <li>Bulging eyes (in some cases)</li>
                  <li>Muscle weakness</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10 text-center">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4">Expert Insight: The TSH Test</h3>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed text-text-medium italic">
              "If you suspect a thyroid issue, don't just ask for a 'thyroid test.' Ask for a 'Full Thyroid Panel.' While TSH is the standard, it doesn't always tell the whole story. Checking Free T4, Free T3, and Thyroid Antibodies can provide a much clearer picture of what's actually happening in your body."
            </p>
          </section>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Thermometer className="w-5 h-5" /></div>
            <h3 className="text-lg font-bold text-text-dark">Hypo-like Symptoms (Slowed Metabolism)</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {hypoOptions.map(option => (
              <button
                key={option.id}
                onClick={() => toggleHypo(option.id)}
                className={`p-4 text-left rounded-2xl border text-sm font-medium transition-all shadow-sm ${
                  hypoSymptoms.includes(option.id) 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-blue-100' 
                    : 'bg-white border-neutral-200 text-text-medium hover:border-blue-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-lg"><Wind className="w-5 h-5" /></div>
            <h3 className="text-lg font-bold text-text-dark">Hyper-like Symptoms (Accelerated Metabolism)</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {hyperOptions.map(option => (
              <button
                key={option.id}
                onClick={() => toggleHyper(option.id)}
                className={`p-4 text-left rounded-2xl border text-sm font-medium transition-all shadow-sm ${
                  hyperSymptoms.includes(option.id) 
                    ? 'bg-rose-600 border-rose-600 text-white shadow-rose-100' 
                    : 'bg-white border-neutral-200 text-text-medium hover:border-rose-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-100 space-y-4">
          <p className="text-xs font-bold text-text-medium uppercase tracking-[0.15em] mb-4">Additional Risk Factors</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-4 p-5 rounded-2xl border border-neutral-100 cursor-pointer hover:bg-neutral-50 transition-all">
              <input 
                type="checkbox" 
                checked={familyHistory} 
                onChange={(e) => setFamilyHistory(e.target.checked)} 
                className="w-6 h-6 rounded-lg text-primary focus:ring-primary border-neutral-300" 
              />
              <span className="text-sm font-medium text-text-dark">Family history of thyroid disease</span>
            </label>

            <label className="flex items-center gap-4 p-5 rounded-2xl border border-neutral-100 cursor-pointer hover:bg-neutral-50 transition-all">
              <input 
                type="checkbox" 
                checked={postpartum} 
                onChange={(e) => setPostpartum(e.target.checked)} 
                className="w-6 h-6 rounded-lg text-primary focus:ring-primary border-neutral-300" 
              />
              <span className="text-sm font-medium text-text-dark">I am in the postpartum phase (within 1 year)</span>
            </label>
          </div>
        </div>

        <button 
          onClick={calculate} 
          disabled={hypoSymptoms.length === 0 && hyperSymptoms.length === 0}
          className="btn-primary w-full py-5 text-lg shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Analyze My Symptoms
        </button>
      </div>
    </CalculatorLayout>
  );
}
