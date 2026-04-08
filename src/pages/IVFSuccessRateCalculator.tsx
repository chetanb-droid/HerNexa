import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema, validateNumber } from '../lib/calculators';
import { Activity, Info, Percent, AlertCircle, Sparkles, Heart, ArrowRight, ShieldCheck } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function IVFSuccessRateCalculator() {
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(150);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(4);
  const [priorPregnancies, setPriorPregnancies] = useState<string>('0');
  const [diagnosis, setDiagnosis] = useState<string>('unexplained');
  const [eggSource, setEggSource] = useState<string>('own');
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const faqs = [
    { q: "How accurate is this IVF success calculator?", a: "This calculator provides an estimate based on national averages from SART (Society for Assisted Reproductive Technology) data. Individual success rates vary based on specific clinic performance and detailed medical history." },
    { q: "What is the biggest factor in IVF success?", a: "Maternal age is statistically the most significant factor when using your own eggs, as egg quality and quantity naturally decline over time." },
    { q: "Does BMI affect IVF success?", a: "Yes, a BMI outside the normal range (either underweight or overweight) can impact hormone absorption and egg retrieval outcomes, slightly lowering success probabilities." },
    { q: "How many cycles of IVF are usually needed?", a: "Many couples require 2-3 cycles of IVF to achieve a successful pregnancy. Success rates are cumulative, meaning your overall chance of success increases with each cycle." }
  ];

  const calculate = () => {
    setError(null);
    
    const ageError = validateNumber(age, 18, 55, 'Female age');
    if (ageError) { setError(ageError); return; }

    const weightError = validateNumber(weight, 80, 400, 'Weight');
    if (weightError) { setError(weightError); return; }

    // Calculate BMI
    const heightInMeters = ((heightFeet * 12) + heightInches) * 0.0254;
    const weightInKg = weight * 0.453592;
    const bmi = weightInKg / (heightInMeters * heightInMeters);

    // Base probability based on age (using own eggs)
    let baseProb = 0;
    if (eggSource === 'donor') {
      baseProb = 52; // Donor eggs typically have a steady success rate regardless of recipient age
    } else {
      if (age < 35) baseProb = 48;
      else if (age >= 35 && age <= 37) baseProb = 38;
      else if (age >= 38 && age <= 40) baseProb = 24;
      else if (age >= 41 && age <= 42) baseProb = 11;
      else baseProb = 4;
    }

    // Adjustments based on diagnosis
    if (diagnosis === 'endometriosis') baseProb *= 0.95;
    if (diagnosis === 'diminished_reserve') baseProb *= 0.80;
    if (diagnosis === 'male_factor') baseProb *= 1.05; // Often bypassed effectively with ICSI

    // Adjustments based on prior pregnancies
    if (priorPregnancies === '1+') baseProb *= 1.1; // Proven fertility helps

    // Adjustments based on BMI
    if (bmi > 30 || bmi < 18.5) baseProb *= 0.90;

    // Cap probabilities
    let finalProb = Math.min(Math.max(Math.round(baseProb), 1), 85);

    setResults({
      probability: finalProb,
      liveBirthProb: Math.max(finalProb - 5, 1), // Live birth is slightly lower than clinical pregnancy
      bmi: bmi.toFixed(1),
      cumulativeProb2: Math.min(Math.round(finalProb + (finalProb * 0.6)), 95),
      cumulativeProb3: Math.min(Math.round(finalProb + (finalProb * 0.6) + (finalProb * 0.4)), 98)
    });
  };

  return (
    <CalculatorLayout
      title="Clinical IVF Success Rate Estimator"
      description="Estimate your chances of IVF success and live birth based on age, BMI, diagnosis, and reproductive history using clinical data models. Accurate IVF probability predictor."
      intro="In Vitro Fertilization (IVF) success rates depend on a variety of personal health factors. Our clinical calculator uses statistical models based on national ART (Assisted Reproductive Technology) data to give you an estimated probability of clinical pregnancy and live birth per embryo transfer. Understanding your baseline success rate is the first step in planning your fertility journey."
      schema={[
        generateSoftwareAppSchema(
          "Clinical IVF Success Rate Estimator",
          "Estimate IVF success and live birth probabilities.",
          "https://femhealth.com/ivf-success-rate-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "IVF Success Rate Calculator", item: "https://femhealth.com/ivf-success-rate-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>This calculator estimates your probability of a successful embryo transfer resulting in a clinical pregnancy and live birth. The algorithm factors in:</p>
          <ul>
            <li><strong>Maternal Age:</strong> The primary predictor of success when using your own eggs, reflecting egg quality and quantity.</li>
            <li><strong>Egg Source:</strong> Using donor eggs significantly changes the statistical model, as donor eggs typically come from younger, healthy donors.</li>
            <li><strong>Primary Diagnosis:</strong> Factors like diminished ovarian reserve, endometriosis, or male-factor infertility impact the baseline probability.</li>
            <li><strong>BMI (Body Mass Index):</strong> Extremes in BMI can affect medication efficacy, egg retrieval outcomes, and implantation rates.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Ovulation Calculator", path: "/ovulation-calculator" },
        { name: "Due Date Calculator", path: "/due-date-calculator" },
        { name: "Miscarriage Risk Calculator", path: "/miscarriage-risk-calculator" }
      ]}
      medicalReferences={[
        {
          title: "IVF Success Rates",
          url: "https://www.cdc.gov/art/artdata/index.html",
          source: "CDC"
        },
        {
          title: "In Vitro Fertilization (IVF)",
          url: "https://www.mayoclinic.org/tests-procedures/in-vitro-fertilization/about/pac-20384716",
          source: "Mayo Clinic"
        },
        {
          title: "IVF: What are the risks?",
          url: "https://www.nhs.uk/conditions/ivf/",
          source: "NHS"
        },
        {
          title: "In vitro fertilisation",
          url: "https://en.wikipedia.org/wiki/In_vitro_fertilisation",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-primary text-white p-10 rounded-[3rem] text-center shadow-lg shadow-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
            
            <div className="flex justify-center mb-6 text-white">
              <Percent className="w-16 h-16" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary-light mb-2 relative z-10">Estimated Live Birth Probability</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white relative z-10">{results.liveBirthProb}%</h2>
            <p className="text-white/90 mt-4 font-medium flex items-center justify-center gap-2 relative z-10">
              <Sparkles className="w-4 h-4" />
              Per single embryo transfer cycle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4">
              <div className="p-3 bg-accent/10 text-accent rounded-xl shrink-0">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-text-medium font-bold uppercase tracking-wider mb-1">Clinical Pregnancy</p>
                <p className="text-2xl font-bold text-text-dark">{results.probability}%</p>
                <p className="text-xs text-text-medium mt-1">Positive heartbeat on ultrasound</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4">
              <div className="p-3 bg-secondary/10 text-secondary rounded-xl shrink-0">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-text-medium font-bold uppercase tracking-wider mb-1">Cumulative Success</p>
                <p className="text-lg font-bold text-text-dark leading-tight">Up to {results.cumulativeProb3}%</p>
                <p className="text-xs text-text-medium mt-1">Estimated after 3 complete cycles</p>
              </div>
            </div>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Ovulation Calculator.</p>
            </div>
            <Link to="/ovulation-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Ovulation Calculator &rarr;
            </Link>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Factors Influencing IVF Success</h2>
            <p>
              IVF success is not a single number; it's a complex interplay of various biological and clinical factors. While age is the most significant factor, other elements play a crucial role in the outcome of a cycle:
            </p>
            <div className="space-y-6 mt-6">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">1. Egg Quality and Quantity</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  As women age, the number of eggs (ovarian reserve) and the quality (chromosomal normality) naturally decline. This is why success rates are highest for women under 35. Using donor eggs from a younger woman can significantly bypass this age-related decline.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">2. Sperm Quality</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  While IVF can overcome many male-factor infertility issues through ICSI (Intracytoplasmic Sperm Injection), the overall health and DNA integrity of the sperm still contribute to embryo quality and successful implantation.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">3. Uterine Environment</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  The health of the uterine lining (endometrium) is critical for implantation. Factors like fibroids, polyps, or endometriosis can impact the receptivity of the uterus to an embryo.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Cumulative Success Rates</h2>
            <p>
              It's important to understand that IVF is often a multi-cycle process. While the success rate for a single transfer might be 40%, the cumulative success rate after three cycles can be as high as 70-80%.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-text-medium">
              <li><strong>Cycle 1:</strong> Establishes how your body responds to stimulation and the quality of embryos produced.</li>
              <li><strong>Cycle 2 & 3:</strong> Allows for adjustments in medication and timing based on the first cycle's data, often leading to improved outcomes.</li>
              <li><strong>Frozen Embryo Transfers (FET):</strong> Many clinics now prefer FET, as it allows the woman's body to recover from stimulation and provides a more natural uterine environment for implantation.</li>
            </ul>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4 text-center">Expert Insight: Beyond the Numbers</h3>
            <p className="text-sm text-center max-w-2xl mx-auto leading-relaxed italic text-text-medium">
              "Statistics give us a baseline, but they don't tell the whole story. Every patient is unique. Factors like lifestyle, stress management, and the specific expertise of your embryology lab can all tilt the scales in your favor. Don't be discouraged by a single number; use it as a starting point for a deeper conversation with your specialist."
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Tooltip content="Your current age." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Female Age</label>
            </Tooltip>
            <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="input-field" />
          </div>
          <div className="space-y-3">
            <Tooltip content="Choose whether you are using your own eggs or donor eggs." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Egg Source</label>
            </Tooltip>
            <select value={eggSource} onChange={(e) => setEggSource(e.target.value)} className="input-field bg-white">
              <option value="own">Own Eggs</option>
              <option value="donor">Donor Eggs</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <Tooltip content="Your current weight in pounds." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Weight (lbs)</label>
            </Tooltip>
            <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="input-field" />
          </div>
          <div className="space-y-3">
            <Tooltip content="Your height in feet." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Height (ft)</label>
            </Tooltip>
            <input type="number" value={heightFeet} onChange={(e) => setHeightFeet(Number(e.target.value))} className="input-field" />
          </div>
          <div className="space-y-3">
            <Tooltip content="Your height in inches." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Height (in)</label>
            </Tooltip>
            <input type="number" value={heightInches} onChange={(e) => setHeightInches(Number(e.target.value))} className="input-field" />
          </div>
        </div>

        <div className="space-y-3">
          <Tooltip content="The primary reason for seeking IVF treatment." showIcon>
            <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Primary Infertility Diagnosis</label>
          </Tooltip>
          <select value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} className="input-field bg-white">
            <option value="unexplained">Unexplained Infertility</option>
            <option value="male_factor">Male Factor Infertility</option>
            <option value="endometriosis">Endometriosis</option>
            <option value="diminished_reserve">Diminished Ovarian Reserve</option>
            <option value="tubal_factor">Tubal Factor</option>
            <option value="pcos">PCOS / Ovulatory Dysfunction</option>
          </select>
        </div>

        <div className="space-y-3">
          <Tooltip content="Have you been pregnant before? Proven fertility can slightly increase success rates." showIcon>
            <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Prior Pregnancies</label>
          </Tooltip>
          <select value={priorPregnancies} onChange={(e) => setPriorPregnancies(e.target.value)} className="input-field bg-white">
            <option value="0">0 (Never been pregnant)</option>
            <option value="1+">1 or more prior pregnancies</option>
          </select>
        </div>

        <button onClick={calculate} className="btn-primary w-full text-lg">
          Calculate Success Rate
        </button>
      </div>
    </CalculatorLayout>
  );
}
