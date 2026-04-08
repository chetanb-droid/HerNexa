import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Scale, Info, ShieldCheck, Heart, Sparkles, ArrowRight, ClipboardList, Activity } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function IdealBodyWeightCalculator() {
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(4);
  const [heightCm, setHeightCm] = useState<number>(163);
  const [frameSize, setFrameSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [results, setResults] = useState<any>(null);

  const faqs = [
    { q: "What is Ideal Body Weight (IBW)?", a: "Ideal Body Weight (IBW) is a medical calculation originally used to determine medication dosages. Today, it is often used as a general guideline for a healthy weight range based on height." },
    { q: "Why are there different formulas?", a: "Over the years, different researchers (Robinson, Miller, Devine, Hamwi) developed slightly different formulas based on various population studies. No single formula is perfect, which is why we provide an average range." },
    { q: "Is IBW the same as a healthy weight?", a: "Not necessarily. IBW formulas are very strict and do not account for muscle mass, bone density, or age. A 'healthy weight' is often a broader range (like the healthy BMI range) rather than a specific number." },
    { q: "How does frame size affect ideal weight?", a: "People with larger bone structures (large frame) naturally weigh more than those with smaller structures (small frame) at the same height. Adjusting for frame size provides a more personalized target." }
  ];

  const calculate = () => {
    let totalInches = 0;

    if (unitSystem === 'imperial') {
      totalInches = (heightFeet * 12) + heightInches;
    } else {
      totalInches = heightCm / 2.54;
    }

    // Formulas are based on height over 5 feet (60 inches)
    const inchesOver5Ft = Math.max(0, totalInches - 60);

    // J. D. Robinson (1983): 49 kg + 1.7 kg per inch over 5 feet
    let robinsonKg = 49 + (1.7 * inchesOver5Ft);
    
    // D. R. Miller (1983): 53.1 kg + 1.36 kg per inch over 5 feet
    let millerKg = 53.1 + (1.36 * inchesOver5Ft);
    
    // G. J. Hamwi (1964): 45.5 kg + 2.2 kg per inch over 5 feet
    let hamwiKg = 45.5 + (2.2 * inchesOver5Ft);
    
    // B. J. Devine (1974): 45.5 kg + 2.3 kg per inch over 5 feet
    let devineKg = 45.5 + (2.3 * inchesOver5Ft);

    // Frame Size Adjustment (Standard is +/- 10%)
    const adjustForFrame = (kg: number) => {
      if (frameSize === 'small') return kg * 0.9;
      if (frameSize === 'large') return kg * 1.1;
      return kg;
    };

    robinsonKg = adjustForFrame(robinsonKg);
    millerKg = adjustForFrame(millerKg);
    hamwiKg = adjustForFrame(hamwiKg);
    devineKg = adjustForFrame(devineKg);

    const formatWeight = (kg: number) => {
      if (unitSystem === 'imperial') {
        return `${Math.round(kg * 2.20462)} lbs`;
      }
      return `${Math.round(kg)} kg`;
    };

    // Calculate healthy BMI range (18.5 - 24.9)
    const heightMeters = totalInches * 0.0254;
    const minHealthyKg = 18.5 * (heightMeters * heightMeters);
    const maxHealthyKg = 24.9 * (heightMeters * heightMeters);

    setResults({
      robinson: formatWeight(robinsonKg),
      miller: formatWeight(millerKg),
      hamwi: formatWeight(hamwiKg),
      devine: formatWeight(devineKg),
      average: formatWeight((robinsonKg + millerKg + hamwiKg + devineKg) / 4),
      healthyRange: `${formatWeight(minHealthyKg)} - ${formatWeight(maxHealthyKg)}`
    });
  };

  return (
    <CalculatorLayout
      title="Ideal Body Weight & Frame Size Calculator"
      description="Calculate your Ideal Body Weight (IBW) using the Robinson, Miller, Devine, and Hamwi medical formulas, adjusted for your unique frame size."
      intro="The concept of an 'ideal' weight is complex. While medical formulas provide a mathematical baseline, factors like bone structure (frame size) and muscle mass play a massive role. Our calculator uses four validated medical formulas and adjusts them for your specific body type."
      schema={[
        generateSoftwareAppSchema(
          "Ideal Body Weight Calculator",
          "Calculate Ideal Body Weight for women using medical formulas.",
          "https://femhealth.com/ideal-body-weight-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Ideal Body Weight Calculator", item: "https://femhealth.com/ideal-body-weight-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>This calculator applies four historically significant formulas specifically calibrated for women, with a modern adjustment for frame size:</p>
          <ul>
            <li><strong>Robinson & Miller (1983):</strong> Modern updates to the original formulas, often considered more accurate for women.</li>
            <li><strong>Devine (1974):</strong> The most widely used formula in clinical settings for medication dosing.</li>
            <li><strong>Hamwi (1964):</strong> The oldest and most 'traditional' formula, often yielding the lowest weight targets.</li>
            <li><strong>Frame Size Adjustment:</strong> We apply a +/- 10% adjustment based on your bone structure to provide a more realistic range.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Women's BMI Calculator", path: "/womens-bmi-calculator" },
        { name: "Women's TDEE Calculator", path: "/womens-tdee-calculator" },
        { name: "Macros Calculator", path: "/macros-calculator" }
      ]}
      medicalReferences={[
        {
          title: "Ideal Body Weight Calculation",
          url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4941268/",
          source: "PubMed"
        },
        {
          title: "Healthy Weight",
          url: "https://www.cdc.gov/healthyweight/index.html",
          source: "CDC"
        },
        {
          title: "Body Composition in Women",
          url: "https://www.womenshealth.gov/healthy-weight/body-composition",
          source: "WomensHealth.gov"
        },
        {
          title: "Ideal Body Weight",
          url: "https://en.wikipedia.org/wiki/Ideal_body_weight",
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
            <div className="flex justify-center mb-4 text-primary"><Scale className="w-12 h-12" /></div>
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Average Ideal Body Weight</p>
            <h2 className="text-6xl md:text-7xl font-serif font-bold text-text-dark">{results.average}</h2>
            <p className="text-text-medium mt-2 font-medium">based on medical formulas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 p-8 rounded-[2rem] border border-emerald-100 text-center shadow-sm space-y-2">
              <p className="text-[10px] text-emerald-600 uppercase font-bold tracking-wider">Healthy BMI Weight Range</p>
              <p className="text-3xl font-bold text-emerald-900">{results.healthyRange}</p>
              <p className="text-[10px] text-emerald-600">Based on a BMI of 18.5 - 24.9</p>
            </div>
            <div className="bg-bg-light p-8 rounded-[2rem] border border-primary-light text-center shadow-sm space-y-2">
              <p className="text-[10px] text-text-medium uppercase font-bold tracking-wider">Your Frame Size</p>
              <p className="text-3xl font-bold text-text-dark capitalize">{frameSize}</p>
              <p className="text-[10px] text-text-medium">Adjusted by {frameSize === 'medium' ? '0%' : frameSize === 'small' ? '-10%' : '+10%'}</p>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-primary-light overflow-hidden shadow-sm">
            <div className="p-6 bg-primary-light/20 border-b border-primary-light font-bold text-text-dark flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-primary" />
              Formula Comparison
            </div>
            <div className="divide-y divide-neutral-100">
              <div className="p-5 flex justify-between items-center hover:bg-neutral-50 transition-colors">
                <span className="text-sm text-text-medium">Robinson Formula (1983)</span>
                <span className="font-bold text-text-dark">{results.robinson}</span>
              </div>
              <div className="p-5 flex justify-between items-center hover:bg-neutral-50 transition-colors">
                <span className="text-sm text-text-medium">Miller Formula (1983)</span>
                <span className="font-bold text-text-dark">{results.miller}</span>
              </div>
              <div className="p-5 flex justify-between items-center hover:bg-neutral-50 transition-colors">
                <span className="text-sm text-text-medium">Devine Formula (1974)</span>
                <span className="font-bold text-text-dark">{results.devine}</span>
              </div>
              <div className="p-5 flex justify-between items-center hover:bg-neutral-50 transition-colors">
                <span className="text-sm text-text-medium">Hamwi Formula (1964)</span>
                <span className="font-bold text-text-dark">{results.hamwi}</span>
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
            <h2 className="text-3xl font-serif font-bold text-text-dark">The History of Ideal Weight</h2>
            <p>
              The term "Ideal Body Weight" (IBW) was first introduced in the 1940s by life insurance companies to estimate life expectancy. In the 1960s and 70s, researchers like Hamwi and Devine developed the formulas we use today.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Clinical Use</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  In hospitals, IBW is used to calculate dosages for medications that don't distribute well into body fat. It is a safety measure, not an aesthetic goal.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Modern Context</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Today, we recognize that these formulas are very strict. They don't account for the fact that muscle is denser than fat. A woman with high muscle mass will naturally be "overweight" by these formulas while being perfectly healthy.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">How to Determine Your Frame Size</h2>
            <p>
              The easiest way to estimate your frame size is by measuring your wrist circumference. For a woman between 5'2" and 5'5":
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">S</div>
                <div>
                  <h4 className="font-bold text-text-dark">Small Frame</h4>
                  <p className="text-sm text-text-medium">Wrist size less than 6 inches. Your ideal weight will be on the lower end of the spectrum.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">M</div>
                <div>
                  <h4 className="font-bold text-text-dark">Medium Frame</h4>
                  <p className="text-sm text-text-medium">Wrist size between 6 and 6.25 inches. This is the baseline for most medical formulas.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">L</div>
                <div>
                  <h4 className="font-bold text-text-dark">Large Frame</h4>
                  <p className="text-sm text-text-medium">Wrist size greater than 6.25 inches. Your body naturally supports more mass due to a larger bone structure.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10 text-center">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4">Expert Insight: Focus on Vitality, Not Just the Number</h3>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed text-text-medium italic">
              "I've seen women who are at their 'ideal' weight but have poor metabolic health, and women who are technically 'overweight' but have perfect blood pressure, high energy, and great strength. Use these formulas as a guide, but listen to your body's signals first."
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
            Imperial (ft/in)
          </button>
          <button
            onClick={() => setUnitSystem('metric')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${unitSystem === 'metric' ? 'bg-white text-primary shadow-sm' : 'text-text-medium hover:text-text-dark'}`}
          >
            Metric (cm)
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-primary-light space-y-8">
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

          <div className="space-y-4">
            <Tooltip content="Your frame size is determined by your bone structure. You can estimate this by measuring your wrist circumference." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Your Frame Size</label>
            </Tooltip>
            <div className="grid grid-cols-3 gap-3">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setFrameSize(size)}
                  className={`py-4 px-2 rounded-xl border-2 transition-all text-sm font-bold capitalize ${
                    frameSize === size 
                      ? 'border-primary bg-primary/5 text-primary shadow-sm' 
                      : 'border-neutral-100 text-text-medium hover:border-primary/30'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={calculate} 
          className="btn-primary w-full py-5 text-lg shadow-xl shadow-primary/20"
        >
          Calculate My Ideal Weight
        </button>
      </div>
    </CalculatorLayout>
  );
}
