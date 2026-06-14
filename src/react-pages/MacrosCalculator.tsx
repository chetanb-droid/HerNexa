import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Utensils, Activity, Info, ShieldCheck, Heart, Sparkles, ArrowRight, ClipboardList, Scale, Flame } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function MacrosCalculator() {
  const [tdee, setTdee] = useState<number>(2000);
  const [goal, setGoal] = useState<string>('maintain');
  const [diet, setDiet] = useState<string>('balanced');
  const [results, setResults] = useState<any>(null);

  const faqs = [
    { q: "What are macronutrients (macros)?", a: "Macronutrients are the three main categories of nutrients you eat that provide you with energy: protein, carbohydrates, and fats. Your body needs all three in varying amounts to function optimally." },
    { q: "Why should I track macros instead of just calories?", a: "While calories dictate weight loss or gain, macros dictate body composition. Eating enough protein ensures you maintain muscle while losing fat. Balancing fats and carbs ensures optimal hormone function and energy levels." },
    { q: "How many calories are in each macro?", a: "Protein has 4 calories per gram. Carbohydrates have 4 calories per gram. Fats have 9 calories per gram." },
    { q: "What is the best macro ratio for women?", a: "There is no single 'best' ratio. However, many women find success with a balanced approach (30/30/40) or a slightly higher protein approach to support lean muscle mass and satiety." }
  ];

  const calculate = () => {
    // Adjust calories based on goal
    let targetCalories = tdee;
    if (goal === 'cut') targetCalories -= 500;
    if (goal === 'bulk') targetCalories += 300;

    let proteinRatio = 0;
    let fatRatio = 0;
    let carbRatio = 0;

    // Set ratios based on diet preference
    switch (diet) {
      case 'balanced':
        proteinRatio = 0.30;
        fatRatio = 0.30;
        carbRatio = 0.40;
        break;
      case 'low_carb':
        proteinRatio = 0.40;
        fatRatio = 0.40;
        carbRatio = 0.20;
        break;
      case 'high_protein':
        proteinRatio = 0.40;
        fatRatio = 0.25;
        carbRatio = 0.35;
        break;
      case 'keto':
        proteinRatio = 0.20;
        fatRatio = 0.75;
        carbRatio = 0.05;
        break;
    }

    // Calculate grams (Protein: 4 cal/g, Carbs: 4 cal/g, Fat: 9 cal/g)
    const proteinGrams = (targetCalories * proteinRatio) / 4;
    const fatGrams = (targetCalories * fatRatio) / 9;
    const carbGrams = (targetCalories * carbRatio) / 4;

    setResults({
      calories: Math.round(targetCalories),
      protein: Math.round(proteinGrams),
      fat: Math.round(fatGrams),
      carbs: Math.round(carbGrams),
      ratios: {
        protein: Math.round(proteinRatio * 100),
        fat: Math.round(fatRatio * 100),
        carbs: Math.round(carbRatio * 100)
      }
    });
  };

  return (
    <CalculatorLayout
      title="Precision Macro & Nutrition Calculator"
      description="Calculate your optimal daily macronutrients (protein, fats, carbs) based on your TDEE, fitness goals, and diet preferences. Tailored for women's health."
      intro="Macronutrients are the building blocks of your nutrition. While calories determine whether you lose or gain weight, your macros determine the quality of that weight change. Use our calculator to find the perfect balance for your unique goals and lifestyle."
      schema={[
        generateSoftwareAppSchema(
          "Macro Calculator",
          "Calculate daily macronutrient targets.",
          "https://hernexa.com/macros-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://hernexa.com" },
          { name: "Tools", item: "https://hernexa.com/tools" },
          { name: "Macro Calculator", item: "https://hernexa.com/macros-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>This calculator uses your Total Daily Energy Expenditure (TDEE) as a baseline and applies scientifically backed macronutrient ratios:</p>
          <ul>
            <li><strong>Goal Adjustment:</strong> We subtract 500 calories for weight loss (cutting) or add 300 calories for muscle gain (bulking).</li>
            <li><strong>Dietary Ratios:</strong> We apply your chosen diet preference (e.g., Balanced is 30% Protein, 30% Fat, 40% Carbs).</li>
            <li><strong>Gram Conversion:</strong> We convert the caloric percentages into grams by dividing by 4 for protein and carbs, and by 9 for fats.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Women's TDEE Calculator", path: "/womens-tdee-calculator" },
        { name: "Women's BMI Calculator", path: "/womens-bmi-calculator" },
        { name: "Ideal Body Weight", path: "/ideal-body-weight-calculator" }
      ]}
      medicalReferences={[
        {
          title: "Dietary Reference Intakes",
          url: "https://www.ncbi.nlm.nih.gov/books/NBK56068/table/summarytables.t4/?report=objectonly",
          source: "NIH"
        },
        {
          title: "Macronutrient Ratios",
          url: "https://www.healthline.com/nutrition/best-macronutrient-ratio",
          source: "Healthline"
        },
        {
          title: "Nutrition and Healthy Eating",
          url: "https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/basics/nutrition-basics/hlv-20049477",
          source: "Mayo Clinic"
        },
        {
          title: "Macronutrient",
          url: "https://en.wikipedia.org/wiki/Macronutrient",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-emerald-50 p-10 rounded-[2.5rem] border border-emerald-100 text-center shadow-sm">
            <div className="flex justify-center mb-4 text-emerald-500"><Flame className="w-12 h-12" /></div>
            <p className="text-emerald-700 font-bold uppercase tracking-widest text-sm mb-2">Daily Calorie Target</p>
            <h2 className="text-6xl md:text-7xl font-serif font-bold text-emerald-950">{results.calories}</h2>
            <p className="text-emerald-700 mt-2 font-medium">calories per day</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-8 rounded-[2rem] border border-blue-100 text-center shadow-sm">
              <p className="text-[10px] text-blue-500 uppercase font-bold tracking-wider mb-2">Protein ({results.ratios.protein}%)</p>
              <p className="font-bold text-blue-900 text-4xl">{results.protein}g</p>
              <p className="text-[10px] text-blue-400 mt-2">4 kcal per gram</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-amber-100 text-center shadow-sm">
              <p className="text-[10px] text-amber-500 uppercase font-bold tracking-wider mb-2">Fats ({results.ratios.fat}%)</p>
              <p className="font-bold text-amber-900 text-4xl">{results.fat}g</p>
              <p className="text-[10px] text-amber-400 mt-2">9 kcal per gram</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-emerald-100 text-center shadow-sm">
              <p className="text-[10px] text-emerald-500 uppercase font-bold tracking-wider mb-2">Carbs ({results.ratios.carbs}%)</p>
              <p className="font-bold text-emerald-900 text-4xl">{results.carbs}g</p>
              <p className="text-[10px] text-emerald-400 mt-2">4 kcal per gram</p>
            </div>
          </div>

          <div className="bg-bg-light p-8 rounded-2xl border border-primary-light space-y-6 shadow-sm">
            <h3 className="font-bold text-text-dark flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" />
              Why Macros Matter for Women
            </h3>
            <p className="text-sm text-text-medium leading-relaxed">
              For women, macros are about more than just muscle. Adequate <strong>fat intake</strong> is essential for hormone production (estrogen and progesterone), while <strong>protein</strong> supports metabolic health and bone density. <strong>Carbohydrates</strong> fuel your brain and your workouts, helping to prevent burnout and hormonal disruption.
            </p>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Women's TDEE Calculator.</p>
            </div>
            <a href="/womens-tdee-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Women's TDEE Calculator &rarr;
            </a>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">The Role of Each Macronutrient</h2>
            <p>
              Every macro plays a specific and vital role in your body's ecosystem. Understanding these roles helps you stay motivated to hit your targets.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm">
                <h4 className="text-lg font-bold text-blue-900 mb-2">Protein</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  The "building blocks." Essential for muscle repair, immune function, and the production of enzymes and hormones. It also has the highest thermic effect, meaning you burn more calories digesting it.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm">
                <h4 className="text-lg font-bold text-amber-900 mb-2">Fats</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  The "regulators." Crucial for brain health, vitamin absorption (A, D, E, K), and maintaining healthy skin and hair. For women, fats are the foundation of a healthy endocrine system.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm">
                <h4 className="text-lg font-bold text-emerald-900 mb-2">Carbohydrates</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  The "fuel." Your body's preferred source of energy for high-intensity movement and brain function. Fiber, a type of carb, is also essential for digestive health and estrogen detoxification.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Choosing the Right Diet Strategy</h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold">B</div>
                <div>
                  <h4 className="font-bold text-text-dark">Balanced (30/30/40)</h4>
                  <p className="text-sm text-text-medium">Best for most women. Provides enough energy for workouts, enough fat for hormones, and enough protein for muscle maintenance.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">P</div>
                <div>
                  <h4 className="font-bold text-text-dark">High Protein (40/25/35)</h4>
                  <p className="text-sm text-text-medium">Ideal for those focused on body recomposition (losing fat while building muscle) or those who struggle with hunger during a cut.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 font-bold">L</div>
                <div>
                  <h4 className="font-bold text-text-dark">Low Carb (40/40/20)</h4>
                  <p className="text-sm text-text-medium">Often used by those with insulin resistance or PCOS who find that lower carb intake helps stabilize energy and weight.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10 text-center">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4">The "80/20" Rule of Nutrition</h3>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed text-text-medium italic">
              "Don't let the pursuit of perfect macros ruin your relationship with food. Aim to hit your protein and calorie targets 80% of the time, and allow for flexibility the other 20%. Consistency beats perfection every single time."
            </p>
          </section>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-primary-light space-y-8">
          <div className="space-y-3">
            <Tooltip content="Your Total Daily Energy Expenditure. This is the number of calories you burn at your current weight and activity level." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Your Daily Maintenance Calories (TDEE)</label>
            </Tooltip>
            <div className="relative">
              <input 
                type="number" 
                value={tdee} 
                onChange={(e) => setTdee(Number(e.target.value))} 
                className="input-field pr-16" 
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-text-medium">kcal</div>
            </div>
            <p className="text-[10px] text-text-medium">Don't know your TDEE? Use our <a href="/womens-tdee-calculator" className="text-primary hover:underline font-bold">TDEE Calculator</a> first.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Tooltip content="Select your primary health or fitness objective." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Your Primary Goal</label>
              </Tooltip>
              <select 
                value={goal} 
                onChange={(e) => setGoal(e.target.value)} 
                className="input-field bg-white"
              >
                <option value="cut">Lose Weight (Fat Loss)</option>
                <option value="maintain">Maintain Current Weight</option>
                <option value="bulk">Build Muscle (Strength)</option>
              </select>
            </div>

            <div className="space-y-3">
              <Tooltip content="Choose a macronutrient split that aligns with your dietary preferences." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Dietary Preference</label>
              </Tooltip>
              <select 
                value={diet} 
                onChange={(e) => setDiet(e.target.value)} 
                className="input-field bg-white"
              >
                <option value="balanced">Balanced (30/30/40)</option>
                <option value="low_carb">Low Carb (40/40/20)</option>
                <option value="high_protein">High Protein (40/25/35)</option>
                <option value="keto">Keto (20/75/5)</option>
              </select>
            </div>
          </div>
        </div>

        <button 
          onClick={calculate} 
          className="btn-primary w-full py-5 text-lg shadow-xl shadow-primary/20"
        >
          Calculate My Macros
        </button>
      </div>
    </CalculatorLayout>
  );
}
