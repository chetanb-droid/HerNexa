import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Activity, AlertCircle, Scale, Droplets, Info, ShieldCheck, Heart, Sparkles, ArrowRight, ClipboardList } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function WomensBMICalculator() {
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  const [weight, setWeight] = useState<number>(150);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(4);
  const [heightCm, setHeightCm] = useState<number>(163);
  const [waist, setWaist] = useState<number>(30);
  const [results, setResults] = useState<any>(null);

  const faqs = [
    { q: "Is BMI accurate for women?", a: "BMI is a general screening tool, not a diagnostic one. It does not distinguish between muscle and fat mass, nor does it account for fat distribution. However, it remains a useful starting point for assessing potential health risks." },
    { q: "What is a healthy BMI for a woman?", a: "According to the CDC and WHO, a healthy BMI range for adult women (and men) is between 18.5 and 24.9." },
    { q: "Does age affect what a healthy BMI is?", a: "Standard BMI categories do not change with age for adults. However, some research suggests that for older adults (over 65), a slightly higher BMI (25-27) might be protective against certain health risks." },
    { q: "Why is waist circumference important?", a: "Waist circumference is a measure of abdominal fat (visceral fat), which is more closely linked to heart disease and type 2 diabetes than total body fat." }
  ];

  const calculate = () => {
    let bmiValue = 0;
    let whtr = 0; // Waist-to-Height Ratio

    if (unitSystem === 'imperial') {
      const totalInches = (heightFeet * 12) + heightInches;
      bmiValue = (weight / (totalInches * totalInches)) * 703;
      whtr = waist / totalInches;
    } else {
      const heightMeters = heightCm / 100;
      bmiValue = weight / (heightMeters * heightMeters);
      whtr = waist / heightCm;
    }

    let category = '';
    let message = '';
    let color = 'text-success';
    let bgColor = 'bg-success/5';
    let borderColor = 'border-success/10';

    if (bmiValue < 18.5) {
      category = 'Underweight';
      message = 'Being underweight can weaken your immune system and increase the risk of osteoporosis and anemia. Consider consulting a healthcare provider or nutritionist.';
      color = 'text-blue-600';
      bgColor = 'bg-blue-50';
      borderColor = 'border-blue-100';
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = 'Healthy Weight';
      message = 'You are in a healthy weight range. Maintain this by eating a balanced diet and exercising regularly.';
      color = 'text-success';
      bgColor = 'bg-success/5';
      borderColor = 'border-success/10';
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = 'Overweight';
      message = 'Being overweight increases the risk of cardiovascular disease, type 2 diabetes, and high blood pressure. Small lifestyle changes can make a big difference.';
      color = 'text-amber-500';
      bgColor = 'bg-amber-50';
      borderColor = 'border-amber-100';
    } else {
      category = 'Obese';
      message = 'Obesity significantly increases the risk of severe health conditions. It is highly recommended to consult a healthcare provider for a personalized health plan.';
      color = 'text-rose-600';
      bgColor = 'bg-rose-50';
      borderColor = 'border-rose-100';
    }

    setResults({
      bmi: bmiValue.toFixed(1),
      whtr: whtr.toFixed(2),
      category,
      message,
      color,
      bgColor,
      borderColor
    });
  };

  return (
    <CalculatorLayout
      title="Women's BMI & Health Ratio Calculator"
      description="Calculate your Body Mass Index (BMI) and Waist-to-Height Ratio specifically designed for women. Get a comprehensive view of your health markers."
      intro="Body Mass Index (BMI) is a standard screening tool, but for women, it's often more accurate when paired with other markers like Waist-to-Height Ratio. Our calculator provides a more comprehensive view of your health by analyzing both your total mass and your fat distribution."
      schema={[
        generateSoftwareAppSchema(
          "Women's BMI Calculator",
          "Calculate Body Mass Index and health ratios for women.",
          "https://hernexa.com/womens-bmi-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://hernexa.com" },
          { name: "Tools", item: "https://hernexa.com/tools" },
          { name: "Women's BMI Calculator", item: "https://hernexa.com/womens-bmi-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>This tool uses two primary medical formulas to assess your health profile:</p>
          <ul>
            <li><strong>BMI Formula:</strong> Weight (kg) / [Height (m)]² or Weight (lb) / [Height (in)]² × 703. This measures total body mass relative to height.</li>
            <li><strong>Waist-to-Height Ratio (WHtR):</strong> Waist Circumference / Height. Research suggests that keeping your waist circumference to less than half your height is a key indicator of lower cardiovascular risk.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Pregnancy BMI Calculator", path: "/pregnancy-bmi-calculator" },
        { name: "Women's TDEE Calculator", path: "/womens-tdee-calculator" },
        { name: "Ideal Body Weight", path: "/ideal-body-weight-calculator" }
      ]}
      medicalReferences={[
        {
          title: "About Adult BMI",
          url: "https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/index.html",
          source: "CDC"
        },
        {
          title: "BMI and Health",
          url: "https://www.nhs.uk/live-well/healthy-weight/bmi-calculator/",
          source: "NHS"
        },
        {
          title: "Waist-to-Height Ratio Research",
          url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4155554/",
          source: "PubMed"
        },
        {
          title: "Body Mass Index (BMI)",
          url: "https://en.wikipedia.org/wiki/Body_mass_index",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className={`p-10 rounded-[2.5rem] border text-center ${results.bgColor} ${results.borderColor} shadow-sm`}>
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Your BMI Result</p>
            <h2 className={`text-6xl md:text-7xl font-serif font-bold ${results.color}`}>
              {results.bmi}
            </h2>
            <p className={`text-xl font-bold mt-2 ${results.color}`}>{results.category}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[2rem] border border-primary-light shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-light/20 text-primary rounded-lg"><Activity className="w-5 h-5" /></div>
                <h3 className="font-bold text-text-dark">Health Analysis</h3>
              </div>
              <p className="text-text-medium leading-relaxed text-sm">{results.message}</p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-primary-light shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary-light/20 text-secondary rounded-lg"><Scale className="w-5 h-5" /></div>
                <h3 className="font-bold text-text-dark">Waist-to-Height Ratio</h3>
              </div>
              <p className="text-3xl font-bold text-text-dark">{results.whtr}</p>
              <p className="text-xs text-text-medium">
                {parseFloat(results.whtr) <= 0.5 
                  ? "Your ratio is within the healthy range (under 0.5)." 
                  : "A ratio above 0.5 may indicate increased health risks related to abdominal fat."}
              </p>
            </div>
          </div>

          <div className="bg-bg-light p-8 rounded-2xl border border-primary-light space-y-6 shadow-sm">
            <h3 className="font-bold text-text-dark flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" />
              A Note on Body Composition
            </h3>
            <p className="text-sm text-text-medium leading-relaxed">
              BMI is a statistical tool, not a measure of body fat percentage. For women with high muscle mass (athletes) or those who are pregnant, BMI will not be an accurate reflection of health. Always consider these numbers alongside other markers like blood pressure, cholesterol, and energy levels.
            </p>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Pregnancy BMI Calculator.</p>
            </div>
            <Link to="/pregnancy-bmi-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Pregnancy BMI Calculator &rarr;
            </Link>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Why BMI is Different for Women</h2>
            <p>
              While the BMI formula is the same for everyone, the way it is interpreted for women often requires more nuance. Women naturally have a higher body fat percentage than men at the same BMI level, which is necessary for hormonal balance and reproductive health.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Hormonal Health</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  A BMI that is too low (under 18.5) can disrupt the production of estrogen, leading to irregular periods or amenorrhea, which can impact bone density and fertility.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Fat Distribution</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Women tend to store more subcutaneous fat (under the skin) in the hips and thighs, which is metabolically different from visceral fat (around the organs). This is why waist circumference is such a critical secondary measure.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Understanding the Categories</h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">18.5</div>
                <div>
                  <h4 className="font-bold text-text-dark">Underweight (&lt; 18.5)</h4>
                  <p className="text-sm text-text-medium">May indicate nutritional deficiencies or underlying health issues. Can lead to weakened immunity and bone loss.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold">24.9</div>
                <div>
                  <h4 className="font-bold text-text-dark">Healthy Weight (18.5 - 24.9)</h4>
                  <p className="text-sm text-text-medium">Associated with the lowest risk of chronic diseases and the highest life expectancy.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 font-bold">29.9</div>
                <div>
                  <h4 className="font-bold text-text-dark">Overweight (25.0 - 29.9)</h4>
                  <p className="text-sm text-text-medium">May increase the risk of metabolic issues. Fat distribution (waist size) becomes a more important factor here.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">30+</div>
                <div>
                  <h4 className="font-bold text-text-dark">Obese (30.0+)</h4>
                  <p className="text-sm text-text-medium">Higher risk for type 2 diabetes, heart disease, and certain cancers. Medical guidance is recommended.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10 text-center">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4">Expert Insight: The Scale is Only One Tool</h3>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed text-text-medium italic">
              "I always tell my patients that health is a mosaic. BMI is one tile in that mosaic, but so are your sleep quality, your stress levels, and your relationship with food. Use these numbers as data points, not as a definition of your worth or your health status."
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Tooltip content="Your current weight in your chosen unit." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Weight ({unitSystem === 'imperial' ? 'lbs' : 'kg'})</label>
              </Tooltip>
              <input 
                type="number" 
                value={weight} 
                onChange={(e) => setWeight(Number(e.target.value))} 
                className="input-field" 
              />
            </div>

            <div className="space-y-3">
              <Tooltip content="Your waist circumference measured at the narrowest point or just above the belly button." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Waist Circumference ({unitSystem === 'imperial' ? 'in' : 'cm'})</label>
              </Tooltip>
              <input 
                type="number" 
                value={waist} 
                onChange={(e) => setWaist(Number(e.target.value))} 
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
        </div>

        <button 
          onClick={calculate} 
          className="btn-primary w-full py-5 text-lg shadow-xl shadow-primary/20"
        >
          Calculate My Health Markers
        </button>
      </div>
    </CalculatorLayout>
  );
}
