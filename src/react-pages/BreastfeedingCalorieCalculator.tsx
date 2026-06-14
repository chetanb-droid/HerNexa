import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { validateNumber, generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Utensils, Info, TrendingUp, Activity, AlertCircle, Heart } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';

export default function BreastfeedingCalorieCalculator() {
  const [weight, setWeight] = useState<number>(65);
  const [height, setHeight] = useState<number>(165);
  const [age, setAge] = useState<number>(30);
  const [activity, setActivity] = useState<number>(1.2);
  const [breastfeedingType, setBreastfeedingType] = useState<string>('exclusive');
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const faqs = [
    { q: "How many extra calories do I need while breastfeeding?", a: "On average, breastfeeding mothers need an additional 450 to 500 calories per day compared to their pre-pregnancy needs, though this varies based on your activity level and whether you are exclusively breastfeeding." },
    { q: "Can I lose weight while breastfeeding?", a: "Yes, many women lose weight naturally while breastfeeding as the body uses stored fat to produce milk. However, it's important not to restrict calories too severely, as this can impact your milk supply." },
    { q: "What should I eat to support milk production?", a: "Focus on a balanced diet rich in proteins, healthy fats, and complex carbohydrates. Staying hydrated is also crucial for maintaining a healthy milk supply." }
  ];

  const calculate = () => {
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
    
    let extra = 500;
    if (breastfeedingType === 'partial') extra = 300;

    setResults({
      bmr: Math.round(bmr),
      maintenance: Math.round(maintenance),
      total: Math.round(maintenance + extra),
      extra
    });
  };

  return (
    <CalculatorLayout
      title="Breastfeeding Calorie Calculator"
      description="Calculate your daily calorie needs while breastfeeding and determine your chances of getting pregnant calculator for postpartum fertility. Essential nutrition tracking."
      intro="Producing breast milk is an energy-intensive process for your body. Our breastfeeding calorie calculator helps you determine how many additional calories you need to support both your own health and your baby's nutrition during the postpartum period. Mothers also frequently use our <strong>chances of getting pregnant calculator</strong> to understand their return to fertility while breastfeeding."
      schema={[
        generateSoftwareAppSchema(
          "Breastfeeding Calorie Calculator",
          "Calculate daily calorie requirements for breastfeeding mothers.",
          "https://hernexa.com/breastfeeding-calorie-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://hernexa.com" },
          { name: "Tools", item: "https://hernexa.com/tools" },
          { name: "Breastfeeding Calorie Calculator", item: "https://hernexa.com/breastfeeding-calorie-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>This calculator estimates your energy needs using the following factors:</p>
          <ul>
            <li><strong>Basal Metabolic Rate (BMR):</strong> Your body's baseline energy expenditure at rest.</li>
            <li><strong>Physical Activity:</strong> The calories burned through your daily movement and exercise.</li>
            <li><strong>Lactation Energy Cost:</strong> The additional energy required to produce milk (typically 300-500 calories depending on breastfeeding frequency).</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Breast Milk Calculator", path: "/breast-milk-calculator" },
        { name: "Pregnancy Calorie Calculator", path: "/pregnancy-calorie-calculator" },
        { name: "Pregnancy BMI Calculator", path: "/pregnancy-bmi-calculator" }
      ]}
      medicalReferences={[
        {
          title: "Maternal Diet",
          url: "https://www.cdc.gov/breastfeeding/breastfeeding-special-circumstances/diet-and-micronutrients/maternal-diet.html",
          source: "CDC"
        },
        {
          title: "Nutrition During Breastfeeding",
          url: "https://www.acog.org/womens-health/faqs/nutrition-during-pregnancy",
          source: "ACOG"
        },
        {
          title: "Breastfeeding and Diet",
          url: "https://www.nhs.uk/conditions/baby/breastfeeding-and-bottle-feeding/breastfeeding-and-lifestyle/diet/",
          source: "NHS"
        },
        {
          title: "Breastfeeding",
          url: "https://en.wikipedia.org/wiki/Breastfeeding",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <p className="text-primary font-bold uppercase tracking-widest text-sm">Your Daily Calorie Goal</p>
            <h2 className="text-5xl md:text-6xl font-bold text-text-dark">{results.total} kcal</h2>
            <p className="text-text-medium font-medium">To support {breastfeedingType === 'exclusive' ? 'exclusive' : 'partial'} breastfeeding</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-primary-light text-center">
              <p className="text-xs text-text-medium uppercase font-bold">Base Needs</p>
              <p className="text-xl font-bold text-text-dark">{results.maintenance}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-primary-light text-center">
              <p className="text-xs text-text-medium uppercase font-bold">Lactation Extra</p>
              <p className="text-xl font-bold text-accent">+{results.extra}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-primary-light text-center">
              <p className="text-xs text-text-medium uppercase font-bold">BMR</p>
              <p className="text-xl font-bold text-text-dark">{results.bmr}</p>
            </div>
          </div>

          <div className="bg-bg-light p-6 rounded-xl border border-primary-light flex items-start gap-4">
            <div className="p-2 bg-white rounded-lg text-primary shadow-sm"><Heart className="w-5 h-5" /></div>
            <div>
              <h3 className="font-bold text-text-dark">Postpartum Nutrition Tip</h3>
              <p className="text-text-medium text-sm leading-relaxed mt-1">
                Prioritize hydration and nutrient-dense foods. Your body needs extra fluids and vitamins to maintain a healthy milk supply and support your recovery.
              </p>
            </div>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Breast Milk Calculator.</p>
            </div>
            <a href="/breast-milk-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Breast Milk Calculator &rarr;
            </a>
          </div>
        </div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">How We Calculate Your Breastfeeding Calorie Needs</h2>
            <p>
              Producing breast milk is a highly metabolic process. To give you an accurate daily calorie target, our calculator uses a two-step scientific approach that combines your baseline energy needs with the specific energy demands of lactation. Here is how the math works:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-text-medium">
              <li><strong>Step 1: Calculating Your BMR:</strong> We use the Mifflin-St Jeor equation, widely considered the most accurate formula for estimating Basal Metabolic Rate (BMR) in modern clinical settings. Your BMR represents the absolute minimum number of calories your body needs to perform basic life-sustaining functions (like breathing and pumping blood) if you were to stay in bed all day. This is calculated using your weight, height, and age.</li>
              <li><strong>Step 2: Factoring in Activity (Maintenance Calories):</strong> We multiply your BMR by an activity multiplier (ranging from 1.2 for sedentary to 1.725 for very active). This gives us your "Maintenance Calories"—the amount of energy you need to maintain your current weight based on your daily movement, <em>before</em> accounting for breastfeeding.</li>
              <li><strong>Step 3: Adding the Lactation Cost:</strong> Finally, we add the caloric cost of producing milk. If you select "Exclusive Breastfeeding," we add 500 calories to your maintenance number. This is the standard medical estimate for the energy required to produce roughly 25-30 ounces of milk per day. If you select "Partial Breastfeeding" (meaning you are supplementing with formula or solid foods), we add 300 calories, reflecting a lower daily milk production volume.</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">What Your Results Actually Mean</h2>
            <p>
              The numbers provided are a nutritional roadmap designed to keep your energy high and your milk supply robust. Here is a detailed breakdown of how to interpret your specific results:
            </p>
            <div className="space-y-6 mt-6">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Your Daily Calorie Goal (Total)</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  This is your target intake to maintain your current weight while successfully nourishing your baby. Consistently eating significantly below this number can lead to maternal fatigue, nutrient depletion, and a drop in milk supply. If your goal is postpartum weight loss, you should aim for a very mild deficit (no more than 300-500 calories below this total number) and only after your milk supply is well established (usually after 6-8 weeks).
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Base Needs (Maintenance)</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  This number represents what your body needs just for <em>you</em>. It is crucial to understand that the "Lactation Extra" calories are pulled directly from your energy reserves. If you only eat your Base Needs, your body will prioritize making milk over your own energy, leaving you feeling exhausted and depleted.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Lactation Extra</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  This is the specific energy cost of milk production. To put this in perspective, 500 calories is roughly equivalent to an extra meal or two substantial snacks per day (e.g., an apple with two tablespoons of peanut butter, plus a bowl of oatmeal).
                </p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-text-dark">The Quality of Calories Matters</h3>
              <p className="text-sm leading-relaxed text-text-medium">
                While hitting your calorie target is important for volume, the <em>quality</em> of those calories impacts the nutritional profile of your milk and your own recovery. Focus on nutrient-dense foods: lean proteins, complex carbohydrates (like oats, which are also known to support lactation), and healthy fats (avocados, nuts, salmon) which are vital for your baby's brain development.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-text-dark">Weight Loss While Breastfeeding</h3>
              <p className="text-sm leading-relaxed text-text-medium">
                Many women naturally lose weight while breastfeeding because the 500-calorie lactation cost acts as a built-in deficit if they eat to their normal appetite. However, aggressive dieting (eating less than 1500-1800 calories total per day) is strongly discouraged, as it can release environmental toxins stored in body fat into your breast milk and rapidly diminish your supply.
              </p>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4 text-center">Expert Insight: Listen to Your Hunger</h3>
            <p className="text-sm text-center max-w-2xl mx-auto leading-relaxed italic text-text-medium">
              "The intense hunger many women feel while breastfeeding is biological, not a lack of willpower. Your body is working incredibly hard. Use this calculator as a baseline, but if you are hitting your calorie goal and still feel ravenous, eat! Your metabolism is unique, and your body's hunger cues are the most accurate indicator of what you need to sustain milk production."
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
            <Tooltip content="Your current weight in kilograms." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Current Weight (kg)</label>
            </Tooltip>
            <input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              className="input-field"
            />
          </div>
          <div className="space-y-3">
            <Tooltip content="Your current height in centimeters." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Height (cm)</label>
            </Tooltip>
            <input 
              type="number" 
              value={height}
              onChange={(e) => setHeight(parseFloat(e.target.value))}
              className="input-field"
            />
          </div>
          <div className="space-y-3">
            <Tooltip content="Your current age in years." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Age</label>
            </Tooltip>
            <input 
              type="number" 
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              className="input-field"
            />
          </div>
          <div className="space-y-3">
            <Tooltip content="Choose whether you are exclusively breastfeeding or combining it with formula/solids." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Breastfeeding Type</label>
            </Tooltip>
            <select 
              value={breastfeedingType}
              onChange={(e) => setBreastfeedingType(e.target.value)}
              className="input-field"
            >
              <option value="exclusive">Exclusive Breastfeeding</option>
              <option value="partial">Partial Breastfeeding / Supplementing</option>
            </select>
          </div>
          <div className="space-y-3 md:col-span-2">
            <Tooltip content="Select your typical daily activity level to estimate your baseline energy expenditure." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Activity Level</label>
            </Tooltip>
            <select 
              value={activity}
              onChange={(e) => setActivity(parseFloat(e.target.value))}
              className="input-field"
            >
              <option value="1.2">Sedentary (Little or no exercise)</option>
              <option value="1.375">Lightly Active (Light exercise 1-3 days/week)</option>
              <option value="1.55">Moderately Active (Moderate exercise 3-5 days/week)</option>
              <option value="1.725">Very Active (Hard exercise 6-7 days/week)</option>
            </select>
          </div>
        </div>

        <Tooltip content="Calculate your personalized daily calorie goal to support breastfeeding and your own health.">
          <button 
            onClick={calculate}
            className="btn-primary w-full text-lg"
          >
            Calculate Daily Calories
          </button>
        </Tooltip>
      </div>
    </CalculatorLayout>
  );
}
