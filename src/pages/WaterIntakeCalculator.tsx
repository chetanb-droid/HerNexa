import { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Droplets, Activity, Baby } from 'lucide-react';

export default function WaterIntakeCalculator() {
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  const [weight, setWeight] = useState<number>(150);
  const [exerciseMinutes, setExerciseMinutes] = useState<number>(30);
  const [pregnancyStatus, setPregnancyStatus] = useState<string>('none');
  const [climate, setClimate] = useState<string>('moderate');
  const [results, setResults] = useState<any>(null);

  const faqs = [
    { q: "Is the '8 glasses a day' rule accurate?", a: "The '8 glasses a day' rule is a reasonable general guideline, but it's not scientifically tailored to individuals. Your actual water needs depend heavily on your body weight, activity level, climate, and whether you are pregnant or breastfeeding." },
    { q: "Do coffee and tea count towards my water intake?", a: "Yes. While caffeine is a mild diuretic, the water in coffee and tea still contributes to your overall daily hydration. However, plain water is always the best primary source of hydration." },
    { q: "How much extra water do I need if I'm pregnant?", a: "Pregnant women generally need an additional 10-12 ounces (about 300 ml) of water per day to support the increased blood volume and amniotic fluid. Breastfeeding women need even more—about 24 extra ounces (700 ml) per day to support milk production." }
  ];

  const calculate = () => {
    let baseOz = 0;
    
    // Base: Weight in lbs / 2 = ounces of water
    let weightLbs = weight;
    if (unitSystem === 'metric') {
      weightLbs = weight * 2.20462;
    }
    
    baseOz = weightLbs / 2;

    // Exercise: Add 12 oz for every 30 mins of exercise
    const exerciseOz = (exerciseMinutes / 30) * 12;

    // Pregnancy/Lactation
    let pregnancyOz = 0;
    if (pregnancyStatus === 'pregnant') pregnancyOz = 10;
    if (pregnancyStatus === 'breastfeeding') pregnancyOz = 24;

    // Climate
    let climateOz = 0;
    if (climate === 'hot') climateOz = 16; // Add 16 oz for hot/dry climates

    const totalOz = baseOz + exerciseOz + pregnancyOz + climateOz;
    
    // Conversions
    const totalMl = totalOz * 29.5735;
    const totalLiters = totalMl / 1000;
    const totalCups = totalOz / 8;

    setResults({
      oz: Math.round(totalOz),
      liters: totalLiters.toFixed(1),
      cups: Math.round(totalCups),
      breakdown: {
        base: Math.round(baseOz),
        exercise: Math.round(exerciseOz),
        pregnancy: pregnancyOz,
        climate: climateOz
      }
    });
  };

  return (
    <CalculatorLayout
      title="Daily Water Intake Calculator"
      description="Calculate exactly how much water you should drink daily based on your weight, activity level, and pregnancy status."
      intro="Proper hydration is essential for energy, skin health, digestion, and overall well-being. This calculator moves beyond the generic '8 glasses a day' rule to provide a personalized daily water intake goal based on your specific body and lifestyle."
      schema={[
        generateSoftwareAppSchema(
          "Water Intake Calculator",
          "Calculate personalized daily water intake needs.",
          "https://femhealth.com/water-intake-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Water Intake Calculator", item: "https://femhealth.com/water-intake-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>This calculator uses standard physiological guidelines to determine your hydration needs:</p>
          <ul>
            <li><strong>Base Hydration:</strong> You need approximately half an ounce of water for every pound you weigh.</li>
            <li><strong>Activity Adjustment:</strong> You lose water through sweat. We add 12 ounces of water for every 30 minutes of exercise.</li>
            <li><strong>Pregnancy & Lactation:</strong> Your body requires significantly more water to build amniotic fluid, increase blood volume, and produce breast milk. We add 10 oz for pregnancy and 24 oz for breastfeeding.</li>
            <li><strong>Climate:</strong> Hot or dry climates increase insensible water loss (through breathing and skin), requiring an additional 16 oz.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Women's TDEE Calculator", path: "/womens-tdee-calculator" },
        { name: "Pregnancy Nutrition Calculator", path: "/pregnancy-calorie-calculator" },
        { name: "Breast Milk Calculator", path: "/breast-milk-calculator" }
      ]}
      results={results && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 text-center">
            <div className="flex justify-center mb-4 text-blue-500"><Droplets className="w-12 h-12" /></div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-800 mb-2">Daily Water Goal</p>
            <h2 className="text-5xl font-bold text-blue-950">{results.oz} oz</h2>
            <p className="text-blue-700 mt-2 font-medium">({results.liters} Liters / ~{results.cups} Cups)</p>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
            <div className="p-4 bg-neutral-50 border-b border-neutral-200 font-bold text-neutral-700">
              Your Hydration Breakdown
            </div>
            <div className="divide-y divide-neutral-100">
              <div className="p-4 flex justify-between items-center">
                <span className="text-neutral-600">Base (from weight)</span>
                <span className="font-bold text-neutral-900">+{results.breakdown.base} oz</span>
              </div>
              {results.breakdown.exercise > 0 && (
                <div className="p-4 flex justify-between items-center">
                  <span className="text-neutral-600">Exercise</span>
                  <span className="font-bold text-neutral-900">+{results.breakdown.exercise} oz</span>
                </div>
              )}
              {results.breakdown.pregnancy > 0 && (
                <div className="p-4 flex justify-between items-center">
                  <span className="text-neutral-600">Pregnancy/Lactation</span>
                  <span className="font-bold text-neutral-900">+{results.breakdown.pregnancy} oz</span>
                </div>
              )}
              {results.breakdown.climate > 0 && (
                <div className="p-4 flex justify-between items-center">
                  <span className="text-neutral-600">Hot/Dry Climate</span>
                  <span className="font-bold text-neutral-900">+{results.breakdown.climate} oz</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    >
      <div className="space-y-6">
        <div className="flex p-1 bg-neutral-100 rounded-xl">
          <button
            onClick={() => setUnitSystem('imperial')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all ${unitSystem === 'imperial' ? 'bg-white text-blue-600 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            Imperial (lbs)
          </button>
          <button
            onClick={() => setUnitSystem('metric')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all ${unitSystem === 'metric' ? 'bg-white text-blue-600 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            Metric (kg)
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider">Weight ({unitSystem === 'imperial' ? 'lbs' : 'kg'})</label>
          <input 
            type="number" 
            value={weight} 
            onChange={(e) => setWeight(Number(e.target.value))} 
            className="w-full p-4 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider">Daily Exercise (Minutes)</label>
          <input 
            type="number" 
            value={exerciseMinutes} 
            onChange={(e) => setExerciseMinutes(Number(e.target.value))} 
            className="w-full p-4 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider">Pregnancy Status</label>
          <select value={pregnancyStatus} onChange={(e) => setPregnancyStatus(e.target.value)} className="w-full p-4 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white">
            <option value="none">Not Pregnant or Breastfeeding</option>
            <option value="pregnant">Pregnant</option>
            <option value="breastfeeding">Breastfeeding</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider">Climate</label>
          <select value={climate} onChange={(e) => setClimate(e.target.value)} className="w-full p-4 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white">
            <option value="moderate">Moderate / Indoor</option>
            <option value="hot">Hot or Very Dry</option>
          </select>
        </div>

        <button onClick={calculate} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-lg shadow-md">
          Calculate Water Needs
        </button>
      </div>
    </CalculatorLayout>
  );
}
