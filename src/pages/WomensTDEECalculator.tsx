import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Activity, Flame, Utensils, Info, ShieldCheck, Heart, Sparkles, ArrowRight, ClipboardList, Scale } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function WomensTDEECalculator() {
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(150);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(4);
  const [heightCm, setHeightCm] = useState<number>(163);
  const [activityLevel, setActivityLevel] = useState<number>(1.2);
  const [bodyFat, setBodyFat] = useState<number | ''>('');
  const [results, setResults] = useState<any>(null);

  const faqs = [
    { q: "What is TDEE?", a: "TDEE stands for Total Daily Energy Expenditure. It is the total number of calories your body burns in a day, accounting for your basal metabolic rate (BMR) and your physical activity level." },
    { q: "Why is this calculator specifically for women?", a: "Men and women have different body compositions, which affects metabolic rate. This calculator uses the Mifflin-St Jeor equation, which has a specific modifier (-161) for women to provide a more accurate BMR estimate." },
    { q: "How do I use my TDEE to lose weight?", a: "To lose weight, you need to consume fewer calories than your TDEE. A safe and sustainable deficit is typically 300 to 500 calories below your TDEE, which generally leads to about 0.5 to 1 pound of weight loss per week." },
    { q: "What is the difference between BMR and TDEE?", a: "BMR is the energy your body needs at complete rest (like sleeping). TDEE is your BMR plus the energy needed for daily movement, digestion, and exercise." }
  ];

  const calculate = () => {
    let weightKg = weight;
    let heightCmCalc = heightCm;

    if (unitSystem === 'imperial') {
      weightKg = weight * 0.453592;
      heightCmCalc = ((heightFeet * 12) + heightInches) * 2.54;
    }

    let bmr = 0;
    
    // Use Katch-McArdle if body fat is provided, otherwise Mifflin-St Jeor
    if (typeof bodyFat === 'number' && bodyFat > 0) {
      const leanBodyMass = weightKg * (1 - (bodyFat / 100));
      bmr = 370 + (21.6 * leanBodyMass);
    } else {
      bmr = (10 * weightKg) + (6.25 * heightCmCalc) - (5 * age) - 161;
    }
    
    const tdee = bmr * activityLevel;

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      maintenance: Math.round(tdee),
      cutting: Math.round(tdee - 500),
      aggressiveCutting: Math.round(tdee - 750),
      bulking: Math.round(tdee + 300),
      method: typeof bodyFat === 'number' ? 'Katch-McArdle' : 'Mifflin-St Jeor'
    });
  };

  return (
    <CalculatorLayout
      title="Women's TDEE & Metabolism Calculator"
      description="Calculate your Total Daily Energy Expenditure (TDEE) and Basal Metabolic Rate (BMR) using formulas specifically calibrated for women. Plan your nutrition with precision."
      intro="Your Total Daily Energy Expenditure (TDEE) is the foundation of any fitness or health goal. Whether you want to lose fat, build muscle, or maintain your current physique, knowing exactly how many calories your body requires is the first step toward success."
      schema={[
        generateSoftwareAppSchema(
          "Women's TDEE Calculator",
          "Calculate Total Daily Energy Expenditure for women.",
          "https://femhealth.com/womens-tdee-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Women's TDEE Calculator", item: "https://femhealth.com/womens-tdee-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>This calculator uses two of the most scientifically validated formulas in nutrition science:</p>
          <ul>
            <li><strong>Mifflin-St Jeor:</strong> The gold standard for most people. It uses age, weight, and height to estimate BMR. For women, it includes a -161 adjustment to account for typical body composition differences.</li>
            <li><strong>Katch-McArdle:</strong> If you know your body fat percentage, this formula is even more accurate as it bases your metabolism on your Lean Body Mass (LBM).</li>
            <li><strong>Activity Factor:</strong> We then apply a multiplier (1.2 to 1.9) based on your daily movement to find your final TDEE.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Women's BMI Calculator", path: "/womens-bmi-calculator" },
        { name: "Macros Calculator", path: "/macros-calculator" },
        { name: "Ideal Body Weight", path: "/ideal-body-weight-calculator" }
      ]}
      medicalReferences={[
        {
          title: "Total Daily Energy Expenditure in Women",
          url: "https://pubmed.ncbi.nlm.nih.gov/15886634/",
          source: "PubMed"
        },
        {
          title: "How Many Calories Should You Eat?",
          url: "https://www.healthline.com/nutrition/how-many-calories-per-day",
          source: "Healthline"
        },
        {
          title: "Calorie Calculator",
          url: "https://www.mayoclinic.org/healthy-lifestyle/weight-loss/in-depth/calorie-calculator/itt-20084939",
          source: "Mayo Clinic"
        },
        {
          title: "Total Daily Energy Expenditure",
          url: "https://en.wikipedia.org/wiki/Basal_metabolic_rate#Total_daily_energy_expenditure",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-primary/5 p-10 rounded-[2.5rem] border border-primary/10 text-center shadow-sm">
            <div className="flex justify-center mb-4 text-primary"><Flame className="w-12 h-12" /></div>
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Daily Maintenance Calories</p>
            <h2 className="text-6xl md:text-7xl font-serif font-bold text-text-dark">{results.tdee}</h2>
            <p className="text-text-medium mt-2 font-medium">calories per day</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-primary-light text-center shadow-sm">
              <p className="text-[10px] text-text-medium uppercase font-bold tracking-wider mb-1">Fat Loss</p>
              <p className="font-bold text-text-dark text-2xl">{results.cutting}</p>
              <p className="text-[10px] text-text-medium mt-1">(-500 cal/day)</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border-2 border-primary text-center shadow-md scale-105 z-10">
              <p className="text-[10px] text-primary uppercase font-bold tracking-wider mb-1">Maintenance</p>
              <p className="font-bold text-primary text-3xl">{results.maintenance}</p>
              <p className="text-[10px] text-primary mt-1">Current Weight</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-primary-light text-center shadow-sm">
              <p className="text-[10px] text-text-medium uppercase font-bold tracking-wider mb-1">Muscle Gain</p>
              <p className="font-bold text-text-dark text-2xl">{results.bulking}</p>
              <p className="text-[10px] text-text-medium mt-1">(+300 cal/day)</p>
            </div>
          </div>

          <div className="bg-bg-light p-8 rounded-2xl border border-primary-light space-y-6 shadow-sm">
            <div className="flex items-start gap-4">
              <Activity className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-text-dark">Basal Metabolic Rate (BMR): {results.bmr} kcal</h3>
                <p className="text-sm text-text-medium mt-1 leading-relaxed">
                  This is the energy your body requires just to stay alive (heart beating, lungs breathing). Calculated using the <strong>{results.method}</strong> method. You should generally avoid eating below this number consistently.
                </p>
              </div>
            </div>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Women's BMI Calculator.</p>
            </div>
            <Link to="/womens-bmi-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Women's BMI Calculator &rarr;
            </Link>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Understanding Your Metabolism</h2>
            <p>
              Metabolism isn't just a single number; it's a dynamic process. Your TDEE is made up of four main components:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">BMR (60-70%)</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Basal Metabolic Rate: The energy used for basic life-sustaining functions. This is largely determined by your lean muscle mass.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">NEAT (15-30%)</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Non-Exercise Activity Thermogenesis: Energy used for everything we do that isn't sleeping, eating, or sports-like exercise (walking, fidgeting, cleaning).
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">TEF (10%)</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Thermic Effect of Food: The energy used to digest, absorb, and process the nutrients in your meals. Protein has the highest TEF.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">EAT (5-10%)</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Exercise Activity Thermogenesis: The energy burned during intentional exercise. Surprisingly, this is often the smallest part of TDEE for most people.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">How to Use These Numbers</h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-text-dark">Track for Consistency</h4>
                  <p className="text-sm text-text-medium">Calculators provide an estimate. Track your intake and your weight for 2-3 weeks to see how your body actually responds.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-text-dark">Prioritize Protein</h4>
                  <p className="text-sm text-text-medium">Regardless of your goal, eating enough protein helps preserve lean muscle mass, which keeps your BMR higher.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-bold text-text-dark">Adjust Slowly</h4>
                  <p className="text-sm text-text-medium">Don't drop your calories too low too fast. A 300-500 calorie deficit is sustainable and prevents metabolic adaptation.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10 text-center">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4">Metabolic Adaptation in Women</h3>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed text-text-medium">
              Women's bodies are biologically wired to protect energy stores for reproduction. If you eat too little for too long, your body may downregulate your NEAT and even your BMR to compensate. This is why "reverse dieting" or taking "maintenance breaks" can be so effective for long-term health.
            </p>
          </section>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="flex p-1 bg-neutral-100 rounded-2xl">
          <button
            onClick={() => setUnitSystem('imperial')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${unitSystem === 'imperial' ? 'bg-white text-primary shadow-sm' : 'text-text-medium hover:text-text-dark'}`}
          >
            Imperial (lbs/in)
          </button>
          <button
            onClick={() => setUnitSystem('metric')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${unitSystem === 'metric' ? 'bg-white text-primary shadow-sm' : 'text-text-medium hover:text-text-dark'}`}
          >
            Metric (kg/cm)
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-primary-light space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Age</label>
              <input 
                type="number" 
                value={age} 
                onChange={(e) => setAge(Number(e.target.value))} 
                className="input-field" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Weight ({unitSystem === 'imperial' ? 'lbs' : 'kg'})</label>
              <input 
                type="number" 
                value={weight} 
                onChange={(e) => setWeight(Number(e.target.value))} 
                className="input-field" 
              />
            </div>
          </div>

          {unitSystem === 'imperial' ? (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Height (ft)</label>
                <input 
                  type="number" 
                  value={heightFeet} 
                  onChange={(e) => setHeightFeet(Number(e.target.value))} 
                  className="input-field" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Height (in)</label>
                <input 
                  type="number" 
                  value={heightInches} 
                  onChange={(e) => setHeightInches(Number(e.target.value))} 
                  className="input-field" 
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Height (cm)</label>
              <input 
                type="number" 
                value={heightCm} 
                onChange={(e) => setHeightCm(Number(e.target.value))} 
                className="input-field" 
              />
            </div>
          )}

          <div className="space-y-3">
            <Tooltip content="Choose the level that best describes your daily movement and exercise routine." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Activity Level</label>
            </Tooltip>
            <select 
              value={activityLevel} 
              onChange={(e) => setActivityLevel(Number(e.target.value))} 
              className="input-field bg-white"
            >
              <option value={1.2}>Sedentary (Office job, little to no exercise)</option>
              <option value={1.375}>Lightly Active (Light exercise 1-3 days/week)</option>
              <option value={1.55}>Moderately Active (Moderate exercise 3-5 days/week)</option>
              <option value={1.725}>Very Active (Heavy exercise 6-7 days/week)</option>
              <option value={1.9}>Extremely Active (Physical job or training 2x/day)</option>
            </select>
          </div>

          <div className="pt-4 border-t border-neutral-100">
            <div className="space-y-3">
              <Tooltip content="Optional: Providing your body fat percentage allows us to use the Katch-McArdle formula, which is more accurate for very active individuals." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Body Fat % (Optional)</label>
              </Tooltip>
              <input 
                type="number" 
                placeholder="e.g. 22"
                value={bodyFat} 
                onChange={(e) => setBodyFat(e.target.value === '' ? '' : Number(e.target.value))} 
                className="input-field" 
              />
            </div>
          </div>
        </div>

        <button 
          onClick={calculate} 
          className="btn-primary w-full py-5 text-lg shadow-xl shadow-primary/20"
        >
          Calculate My Metabolism
        </button>
      </div>
    </CalculatorLayout>
  );
}
