import { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { validateNumber, generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Utensils, Info, Droplets, Activity, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import Tooltip from '../components/ui/Tooltip';

export default function PregnancyCalorieCalculator() {
  const [activeTab, setActiveTab] = useState<'calories' | 'iron' | 'folic' | 'hydration'>('calories');

  // Calorie State
  const [weight, setWeight] = useState<number>(65);
  const [height, setHeight] = useState<number>(165);
  const [age, setAge] = useState<number>(30);
  const [activity, setActivity] = useState<number>(1.2);
  const [trimester, setTrimester] = useState<number>(1);
  const [calorieResults, setCalorieResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Other State
  const [isPregnant, setIsPregnant] = useState<boolean>(true);
  const [hydrationStatus, setHydrationStatus] = useState<string>('pregnant');

  const faqs = [
    { q: "Do I really need extra calories in the first trimester?", a: "Generally, no. Most medical guidelines suggest that calorie needs don't increase significantly until the second trimester, unless you started pregnancy underweight." },
    { q: "How much iron do I need during pregnancy?", a: "The recommended daily intake for pregnant women is 27 mg, which is significantly higher than the 18 mg needed for non-pregnant women." },
    { q: "Why is folic acid important?", a: "Folic acid is essential for preventing major birth defects of the baby's brain and spine (neural tube defects). The recommended intake is 600 mcg during pregnancy." },
    { q: "How much water do I need during pregnancy?", a: "The recommended daily intake for pregnant women is approximately 10 cups (2.4 liters) of fluids." }
  ];

  const calculateCalories = () => {
    setError(null);
    
    const weightError = validateNumber(weight, 30, 250, 'Current weight');
    if (weightError) { setError(weightError); return; }
    
    const heightError = validateNumber(height, 100, 250, 'Height');
    if (heightError) { setError(heightError); return; }
    
    const ageError = validateNumber(age, 13, 60, 'Age');
    if (ageError) { setError(ageError); return; }

    // Mifflin-St Jeor Equation for Women
    const bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    const maintenance = bmr * activity;
    
    let extra = 0;
    if (trimester === 2) extra = 340;
    if (trimester === 3) extra = 450;

    setCalorieResults({
      bmr: Math.round(bmr),
      maintenance: Math.round(maintenance),
      total: Math.round(maintenance + extra),
      extra
    });
  };

  const calculateIron = () => {
    return isPregnant ? 27 : 18;
  };

  const calculateFolic = () => {
    return isPregnant ? 600 : 400;
  };

  const calculateHydration = () => {
    let intake = 10; // Base 10 cups (2.4L)
    if (hydrationStatus === 'breastfeeding') intake = 13; // 3.1L
    if (hydrationStatus === 'none') intake = 9; // 2.1L
    return intake;
  };

  return (
    <CalculatorLayout
      title="Pregnancy Nutrition Calculator"
      description="Calculate your daily calorie, iron, folic acid, and hydration needs during pregnancy. Get personalized recommendations for a healthy pregnancy."
      intro="Proper nutrition is vital for your baby's development and your own well-being. Use this comprehensive tool to determine your daily requirements for calories, iron, folic acid, and water."
      schema={[
        generateSoftwareAppSchema(
          "Pregnancy Nutrition Calculator",
          "Calculate daily calorie, iron, folic acid, and hydration requirements for pregnancy.",
          "https://femhealth.com/pregnancy-calorie-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Pregnancy Nutrition Calculator", item: "https://femhealth.com/pregnancy-calorie-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>This comprehensive calculator provides guidelines for four key nutritional areas:</p>
          <ul>
            <li><strong>Calories:</strong> Uses the Mifflin-St Jeor equation combined with prenatal guidelines to determine extra calorie needs per trimester.</li>
            <li><strong>Iron:</strong> Recommends 27 mg/day during pregnancy to support increased blood volume and fetal development.</li>
            <li><strong>Folic Acid:</strong> Recommends 600 mcg/day during pregnancy to prevent neural tube defects.</li>
            <li><strong>Hydration:</strong> Recommends fluid intake based on pregnancy or breastfeeding status (typically 10-13 cups/day).</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Pregnancy Weight Gain", path: "/pregnancy-weight-gain-calculator" },
        { name: "Breastfeeding Calories", path: "/breastfeeding-calorie-calculator" },
        { name: "Pregnancy BMI Calculator", path: "/pregnancy-bmi-calculator" }
      ]}
      results={
        <div className="space-y-8">
          {activeTab === 'calories' && calorieResults && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="text-center space-y-2">
                <p className="text-primary font-bold uppercase tracking-widest text-sm">Your Daily Calorie Goal</p>
                <h2 className="text-5xl md:text-6xl font-bold text-text-dark">{calorieResults.total} kcal</h2>
                <p className="text-text-medium font-medium">To support a healthy {trimester === 1 ? '1st' : trimester === 2 ? '2nd' : '3rd'} trimester</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-primary-light text-center">
                  <p className="text-xs text-text-medium uppercase font-bold">Base Needs</p>
                  <p className="text-xl font-bold text-text-dark">{calorieResults.maintenance}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-primary-light text-center">
                  <p className="text-xs text-text-medium uppercase font-bold">Pregnancy Extra</p>
                  <p className="text-xl font-bold text-accent">+{calorieResults.extra}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-primary-light text-center">
                  <p className="text-xs text-text-medium uppercase font-bold">BMR (Resting)</p>
                  <p className="text-xl font-bold text-text-dark">{calorieResults.bmr}</p>
                </div>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                <h3 className="font-bold text-lg text-primary-dark mb-4 flex items-center gap-2">
                  <Utensils className="w-5 h-5" />
                  What does {calorieResults.extra} calories look like?
                </h3>
                <ul className="space-y-3 text-text-medium">
                  {trimester === 1 ? (
                    <li>Focus on nutrient density rather than extra calories. A daily prenatal vitamin is crucial.</li>
                  ) : trimester === 2 ? (
                    <>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>1 apple with 2 tbsp peanut butter + 1 cup milk</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>1/2 cup Greek yogurt with berries + 1 oz almonds</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>Turkey sandwich on whole wheat + 1 piece of fruit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>1 cup oatmeal with nuts and fruit + 1 hard-boiled egg</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'iron' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
              <div className="p-8 bg-primary/5 border border-primary/10 rounded-3xl text-center">
                <p className="text-sm font-bold uppercase tracking-widest mb-2">Recommended Daily Iron Intake</p>
                <h2 className="text-4xl font-bold text-primary">{calculateIron()} mg</h2>
                <p className="text-sm text-text-medium mt-2">Ensure you are meeting this goal through diet and prenatal vitamins.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 flex gap-4">
                <Info className="w-6 h-6 text-primary shrink-0" />
                <p className="text-sm text-text-medium leading-relaxed">
                  Iron is best absorbed when taken with Vitamin C (like orange juice) and away from calcium-rich foods or caffeine.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'folic' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
              <div className="p-8 bg-primary/5 border border-primary/10 rounded-3xl text-center">
                <p className="text-sm font-bold uppercase tracking-widest mb-2">Recommended Daily Folic Acid</p>
                <h2 className="text-4xl font-bold text-primary">{calculateFolic()} mcg</h2>
                <p className="text-sm text-text-medium mt-2">Ensure you are meeting this goal through diet and prenatal vitamins.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 flex gap-4">
                <Info className="w-6 h-6 text-primary shrink-0" />
                <p className="text-sm text-text-medium leading-relaxed">
                  Most prenatal vitamins contain the recommended 600 mcg of folic acid for pregnant women.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'hydration' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
              <div className="p-8 bg-blue-50 border border-blue-100 rounded-3xl text-center">
                <div className="flex justify-center mb-4 text-blue-500"><Droplets className="w-12 h-12" /></div>
                <p className="text-sm font-bold uppercase tracking-widest mb-2 text-blue-600">Daily Fluid Goal</p>
                <h2 className="text-4xl font-bold text-blue-800">{calculateHydration()} Cups</h2>
                <p className="text-sm text-blue-600 mt-2">Approximately {(calculateHydration() * 0.24).toFixed(1)} Liters per day.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 flex gap-4">
                <Info className="w-6 h-6 text-primary shrink-0" />
                <p className="text-sm text-text-medium leading-relaxed">
                  If you are exercising or in a hot environment, you may need to increase your intake further.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      }
    >
      <div className="space-y-8">
        {/* Tool Selection Tabs */}
        <div className="flex flex-wrap gap-2 p-1 bg-white border border-border rounded-2xl">
          {[
            { id: 'calories', label: 'Calories' },
            { id: 'iron', label: 'Iron' },
            { id: 'folic', label: 'Folic Acid' },
            { id: 'hydration', label: 'Hydration' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setError(null);
              }}
              className={`flex-1 min-w-[100px] py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'text-text-medium hover:bg-bg-light hover:text-text-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="p-4 bg-error/10 text-error rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Dynamic Inputs based on Active Tab */}
        {activeTab === 'calories' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-medium uppercase tracking-wider">Current Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="input-field"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-medium uppercase tracking-wider">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="input-field"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-medium uppercase tracking-wider">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="input-field"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-medium uppercase tracking-wider flex items-center gap-2">
                Activity Level
                <Tooltip content="Select the level that best matches your daily routine, including exercise and work." />
              </label>
              <select
                value={activity}
                onChange={(e) => setActivity(Number(e.target.value))}
                className="input-field"
              >
                <option value={1.2}>Sedentary (little to no exercise)</option>
                <option value={1.375}>Lightly active (light exercise 1-3 days/week)</option>
                <option value={1.55}>Moderately active (moderate exercise 3-5 days/week)</option>
                <option value={1.725}>Very active (hard exercise 6-7 days/week)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-medium uppercase tracking-wider">Trimester</label>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTrimester(t)}
                    className={`p-3 rounded-xl border font-bold transition-all ${
                      trimester === t
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white border-border hover:border-primary text-text-medium'
                    }`}
                  >
                    {t}{t === 1 ? 'st' : t === 2 ? 'nd' : 'rd'}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={calculateCalories} className="btn-primary w-full py-4 text-lg">
              Calculate Calories
            </button>
          </motion.div>
        )}

        {(activeTab === 'iron' || activeTab === 'folic') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-medium uppercase tracking-wider">Are you currently pregnant?</label>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setIsPregnant(true)} className={`p-4 rounded-2xl border font-bold transition-all ${isPregnant ? 'bg-primary text-white border-primary' : 'bg-white border-border hover:border-primary'}`}>Yes</button>
                <button onClick={() => setIsPregnant(false)} className={`p-4 rounded-2xl border font-bold transition-all ${!isPregnant ? 'bg-primary text-white border-primary' : 'bg-white border-border hover:border-primary'}`}>No</button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'hydration' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-medium uppercase tracking-wider">Current Status</label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'pregnant', label: 'Currently Pregnant' },
                  { id: 'breastfeeding', label: 'Currently Breastfeeding' },
                  { id: 'none', label: 'Not Pregnant or Breastfeeding' }
                ].map((item) => (
                  <button key={item.id} onClick={() => setHydrationStatus(item.id)} className={`p-4 rounded-2xl border font-bold transition-all ${hydrationStatus === item.id ? 'bg-primary text-white border-primary' : 'bg-white border-border hover:border-primary'}`}>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </CalculatorLayout>
  );
}
