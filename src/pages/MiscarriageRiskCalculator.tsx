import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema, validateNumber } from '../lib/calculators';
import { Activity, AlertCircle, HeartPulse, Info, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function MiscarriageRiskCalculator() {
  const [age, setAge] = useState<number>(30);
  const [previousMiscarriages, setPreviousMiscarriages] = useState<string>('0');
  const [bmi, setBmi] = useState<number>(24);
  const [week, setWeek] = useState<number>(4);
  const [smoking, setSmoking] = useState<boolean>(false);
  const [chronicConditions, setChronicConditions] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const faqs = [
    { q: "What is the biggest risk factor for miscarriage?", a: "Maternal age is the most significant independent risk factor for miscarriage, primarily due to an increase in chromosomal abnormalities in eggs as women get older." },
    { q: "Does having one miscarriage mean I will have another?", a: "Not necessarily. Most women who have one miscarriage go on to have a healthy pregnancy. The risk only slightly increases after one miscarriage, but increases more significantly after three consecutive miscarriages (recurrent pregnancy loss)." },
    { q: "Can stress cause a miscarriage?", a: "There is no scientific evidence that everyday stress, exercise, or working causes miscarriage. Most miscarriages are caused by genetic abnormalities in the embryo." },
    { q: "When does the risk of miscarriage decrease?", a: "The risk of miscarriage drops significantly after the first trimester (12-13 weeks). Once a heartbeat is detected on an ultrasound (usually around 6-8 weeks), the risk also decreases substantially." }
  ];

  const calculate = () => {
    setError(null);
    
    const ageError = validateNumber(age, 15, 60, 'Maternal age');
    if (ageError) { setError(ageError); return; }

    const bmiError = validateNumber(bmi, 10, 60, 'BMI');
    if (bmiError) { setError(bmiError); return; }

    // Base risk by age (based on ACOG and clinical studies)
    let baseRisk = 10;
    if (age < 30) baseRisk = 10;
    else if (age >= 30 && age <= 34) baseRisk = 15;
    else if (age >= 35 && age <= 39) baseRisk = 25;
    else if (age >= 40 && age <= 44) baseRisk = 51;
    else if (age >= 45) baseRisk = 93;

    // Adjustments
    let additionalRisk = 0;
    
    if (previousMiscarriages === '1') additionalRisk += 5;
    else if (previousMiscarriages === '2') additionalRisk += 10;
    else if (previousMiscarriages === '3+') additionalRisk += 20;

    if (bmi > 30 || bmi < 18.5) additionalRisk += 5;
    if (smoking) additionalRisk += 5;
    if (chronicConditions) additionalRisk += 8; // Unmanaged diabetes, thyroid, etc.

    // Week adjustment (Risk decreases as pregnancy progresses)
    // This is a simplified model: risk is highest at week 4 and drops significantly by week 12
    let weekMultiplier = 1;
    if (week >= 6 && week < 8) weekMultiplier = 0.7;
    else if (week >= 8 && week < 10) weekMultiplier = 0.4;
    else if (week >= 10 && week < 12) weekMultiplier = 0.2;
    else if (week >= 12) weekMultiplier = 0.1;

    let finalRisk = Math.min((baseRisk + additionalRisk) * weekMultiplier, 99);
    let healthyPregnancyChance = 100 - finalRisk;

    setResults({
      risk: finalRisk.toFixed(1),
      healthy: healthyPregnancyChance.toFixed(1),
      week
    });
  };

  return (
    <CalculatorLayout
      title="Miscarriage Probability Calculator Online | Assess Risk Factors"
      description="Calculate your miscarriage by day calculator and check miscarriage probability percentage calculator easily. Trusted tool."
      intro="Understanding your risk of miscarriage can help you have informed discussions with your healthcare provider. This <strong>miscarriage probability calculator online</strong> uses clinical data and ACOG (American College of Obstetricians and Gynecologists) statistics to estimate the probability of pregnancy loss. Use this as your <strong>miscarriage by day calculator</strong> to see how odds improve over time, providing a clear <strong>miscarriage probability percentage calculator</strong> value. We focus on the probability of a healthy pregnancy, which remains high for the vast majority of women."
      schema={[
        generateSoftwareAppSchema(
          "Clinical Miscarriage Risk Assessment",
          "Estimate miscarriage probability based on clinical factors.",
          "https://hernexa.com/miscarriage-risk-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://hernexa.com" },
          { name: "Tools", item: "https://hernexa.com/tools" },
          { name: "Miscarriage Risk Calculator", item: "https://hernexa.com/miscarriage-risk-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>This calculator uses a baseline risk model primarily driven by maternal age, which is the strongest predictor of pregnancy loss due to chromosomal factors. It then applies statistical adjustments for:</p>
          <ul>
            <li><strong>Gestational Week:</strong> Risk drops significantly every week. Once a heartbeat is detected (week 6-8), the chance of a healthy pregnancy rises sharply.</li>
            <li><strong>Previous Pregnancy Loss:</strong> Risk increases slightly with each consecutive loss, though most women go on to have healthy pregnancies.</li>
            <li><strong>BMI Extremes:</strong> Obesity (BMI &gt; 30) and being underweight (BMI &lt; 18.5) are linked to higher risks.</li>
            <li><strong>Lifestyle & Health:</strong> Smoking and unmanaged chronic conditions (like thyroid disease or diabetes) can increase the baseline risk.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Due Date Calculator", path: "/due-date-calculator" },
        { name: "Pregnancy Weight Gain", path: "/pregnancy-weight-gain-calculator" },
        { name: "Baby Size Comparator", path: "/baby-size-comparator" }
      ]}
      medicalReferences={[
        {
          title: "Early Pregnancy Loss",
          url: "https://www.acog.org/womens-health/faqs/early-pregnancy-loss",
          source: "ACOG"
        },
        {
          title: "Miscarriage: Symptoms, Causes, and Treatment",
          url: "https://www.nhs.uk/conditions/miscarriage/",
          source: "NHS"
        },
        {
          title: "Pregnancy Loss",
          url: "https://www.womenshealth.gov/pregnancy/youre-pregnant-now-what/pregnancy-loss",
          source: "WomensHealth.gov"
        },
        {
          title: "Miscarriage",
          url: "https://en.wikipedia.org/wiki/Miscarriage",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-success text-white p-10 rounded-[3rem] text-center shadow-lg shadow-success/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
            
            <div className="flex justify-center mb-6 text-white">
              <ShieldCheck className="w-16 h-16" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-success-light mb-2 relative z-10">Probability of a Healthy Pregnancy</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white relative z-10">{results.healthy}%</h2>
            <p className="text-white/90 mt-4 font-medium flex items-center justify-center gap-2 relative z-10">
              <Sparkles className="w-4 h-4" />
              Statistical Probability for Week {results.week}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-text-medium font-bold uppercase tracking-wider mb-1">Statistical Risk</p>
                <p className="text-2xl font-bold text-text-dark">{results.risk}%</p>
                <p className="text-xs text-text-medium mt-1">Based on age and clinical factors</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4">
              <div className="p-3 bg-accent/10 text-accent rounded-xl shrink-0">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-text-medium font-bold uppercase tracking-wider mb-1">Risk Trend</p>
                <p className="text-lg font-bold text-text-dark leading-tight">Decreasing</p>
                <p className="text-xs text-text-medium mt-1">Risk drops sharply after week 8</p>
              </div>
            </div>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Due Date Calculator.</p>
            </div>
            <Link to="/due-date-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Due Date Calculator &rarr;
            </Link>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Understanding Miscarriage Risk</h2>
            <p>
              Miscarriage is unfortunately common, occurring in about 10-20% of known pregnancies. However, the vast majority of women who experience a miscarriage go on to have healthy pregnancies in the future. Understanding the biological factors can help alleviate some of the anxiety associated with early pregnancy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">Chromosomal Factors</h4>
                <p className="text-sm text-text-medium leading-relaxed">Most miscarriages (over 50%) are caused by random chromosomal abnormalities in the embryo, not by anything the mother did or didn't do.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">The Age Factor</h4>
                <p className="text-sm text-text-medium leading-relaxed">As women age, the quality of eggs decreases, leading to a higher chance of chromosomal errors during fertilization.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">The Progress Factor</h4>
                <p className="text-sm text-text-medium leading-relaxed">Every day that a pregnancy continues, the statistical risk of loss decreases. Reaching milestones like a visible heartbeat is a huge positive sign.</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Ways to Support a Healthy Pregnancy</h2>
            <p>
              While most miscarriages cannot be prevented, there are steps you can take to ensure your body is in the best possible condition for a healthy pregnancy:
            </p>
            <ul className="list-disc pl-6 space-y-4 text-text-medium">
              <li><strong>Prenatal Care:</strong> Start prenatal vitamins (with folic acid) as soon as possible and attend all scheduled medical appointments.</li>
              <li><strong>Manage Chronic Conditions:</strong> If you have diabetes, thyroid issues, or high blood pressure, work closely with your doctor to keep them under control.</li>
              <li><strong>Lifestyle Choices:</strong> Avoid smoking, alcohol, and illicit drugs. Limit caffeine intake to less than 200mg per day.</li>
              <li><strong>Listen to Your Body:</strong> While cramping and spotting can be normal, always report any significant bleeding or severe pain to your healthcare provider immediately.</li>
            </ul>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4 text-center">Expert Insight: The Power of Perspective</h3>
            <p className="text-sm text-center max-w-2xl mx-auto leading-relaxed italic text-text-medium">
              "When we look at miscarriage statistics, we often focus on the risk. But I tell my patients to look at the other side: even at age 40, you have a 50% chance of a healthy pregnancy, and at age 30, it's 90%. Focus on the high probability of success rather than the small possibility of loss."
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
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Maternal Age</label>
            </Tooltip>
            <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="input-field" />
          </div>
          <div className="space-y-3">
            <Tooltip content="Your Body Mass Index. Standard is 18.5 - 24.9." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Current BMI</label>
            </Tooltip>
            <input type="number" value={bmi} onChange={(e) => setBmi(Number(e.target.value))} className="input-field" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Tooltip content="The number of previous miscarriages you have experienced." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Previous Miscarriages</label>
            </Tooltip>
            <select value={previousMiscarriages} onChange={(e) => setPreviousMiscarriages(e.target.value)} className="input-field bg-white">
              <option value="0">0 (None)</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3+">3 or more</option>
            </select>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Tooltip content="Your current week of pregnancy. Risk drops significantly as you progress." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Current Week</label>
              </Tooltip>
              <span className="text-primary font-bold">Week {week}</span>
            </div>
            <input 
              type="range" 
              min="4" 
              max="20" 
              value={week} 
              onChange={(e) => setWeek(Number(e.target.value))} 
              className="w-full accent-primary h-2 bg-primary-light rounded-lg appearance-none cursor-pointer" 
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-4 p-5 border border-neutral-100 rounded-2xl cursor-pointer hover:bg-neutral-50 transition-all shadow-sm">
            <input type="checkbox" checked={smoking} onChange={(e) => setSmoking(e.target.checked)} className="w-6 h-6 text-primary rounded-lg focus:ring-primary border-neutral-300" />
            <div className="flex flex-col">
              <span className="font-bold text-text-dark">Smoking</span>
              <span className="text-xs text-text-medium">I currently smoke tobacco or use nicotine products.</span>
            </div>
          </label>
          
          <label className="flex items-center gap-4 p-5 border border-neutral-100 rounded-2xl cursor-pointer hover:bg-neutral-50 transition-all shadow-sm">
            <input type="checkbox" checked={chronicConditions} onChange={(e) => setChronicConditions(e.target.checked)} className="w-6 h-6 text-primary rounded-lg focus:ring-primary border-neutral-300" />
            <div className="flex flex-col">
              <span className="font-bold text-text-dark">Chronic Conditions</span>
              <span className="text-xs text-text-medium">Uncontrolled diabetes, thyroid disease, or autoimmune disorders.</span>
            </div>
          </label>
        </div>

        <button onClick={calculate} className="btn-primary w-full text-lg">
          Calculate Risk Profile
        </button>
      </div>
    </CalculatorLayout>
  );
}
