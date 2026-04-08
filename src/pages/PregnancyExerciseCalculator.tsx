import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { motion } from 'motion/react';
import { Info, Activity } from 'lucide-react';

export default function PregnancyExerciseCalculator() {
  const [age, setAge] = useState<number>(30);
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const maxHR = 220 - age;
    const targetMin = Math.round(maxHR * 0.6);
    const targetMax = Math.round(maxHR * 0.7);
    setResults({ targetMin, targetMax });
  };

  const faqs = [
    { q: "Is exercise safe during pregnancy?", a: "For most women, regular physical activity is safe and highly recommended during pregnancy." },
    { q: "What is the 'talk test'?", a: "A good rule of thumb is that you should be able to carry on a conversation while exercising. If you're too breathless to talk, you're working too hard." },
    { q: "What exercises should I avoid?", a: "Avoid contact sports, activities with a high risk of falling, and exercising flat on your back after the first trimester." }
  ];

  return (
    <CalculatorLayout
      title="Pregnancy Exercise Intensity Calculator"
      description="Find your safe target heart rate zones for exercise during pregnancy based on your age."
      intro="Staying active during pregnancy has many benefits. This tool helps you identify the safe heart rate zones for moderate-intensity exercise."
      schema={[
        generateSoftwareAppSchema("Pregnancy Exercise Calculator", "Calculate exercise heart rate", "https://femhealth.com/pregnancy-exercise-calculator"),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Exercise Intensity", item: "https://femhealth.com/pregnancy-exercise-calculator" }
        ])
      ]}
      faqs={faqs}
      howItWorks={
        <div className="space-y-4">
          <p>The Pregnancy Exercise Intensity Calculator helps you identify the safe heart rate zones for moderate-intensity exercise based on your age. Moderate intensity is typically 60-70% of your maximum heart rate.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Max Heart Rate:</strong> 220 minus your age.</li>
            <li><strong>Target Zone:</strong> 60-70% of your maximum heart rate.</li>
          </ul>
        </div>
      }
      medicalReferences={[
        {
          title: "Exercise During Pregnancy",
          url: "https://www.acog.org/womens-health/faqs/exercise-during-pregnancy",
          source: "ACOG"
        },
        {
          title: "Pregnancy and Exercise",
          url: "https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/pregnancy-and-exercise/art-20046896",
          source: "Mayo Clinic"
        },
        {
          title: "Exercise in Pregnancy",
          url: "https://www.nhs.uk/pregnancy/keeping-well/exercise/",
          source: "NHS"
        },
        {
          title: "Exercise and pregnancy",
          url: "https://en.wikipedia.org/wiki/Exercise_and_pregnancy",
          source: "Wikipedia"
        }
      ]}
      relatedTools={[
        { name: "Pregnancy Calorie Calculator", path: "/pregnancy-calorie-calculator" },
        { name: "Pregnancy Weight Gain", path: "/pregnancy-weight-gain-calculator" },
        { name: "Blood Volume Calculator", path: "/blood-volume-calculator" }
      ]}
      results={results && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-primary/5 border border-primary/10 rounded-3xl text-center">
            <div className="flex justify-center mb-4 text-primary"><Activity className="w-12 h-12" /></div>
            <p className="text-sm font-bold uppercase tracking-widest mb-2">Target Heart Rate Zone</p>
            <h2 className="text-4xl font-bold text-text-dark">{results.targetMin} - {results.targetMax} BPM</h2>
            <p className="text-sm text-text-medium mt-2">Moderate intensity (60-70% of max heart rate).</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-primary/10 flex gap-4">
            <Info className="w-6 h-6 text-primary shrink-0" />
            <p className="text-sm text-text-medium leading-relaxed">
              Always consult your healthcare provider before starting a new exercise routine during pregnancy.
            </p>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Pregnancy Calorie Calculator.</p>
            </div>
            <Link to="/pregnancy-calorie-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Pregnancy Calorie Calculator &rarr;
            </Link>
          </div>
        </motion.div>
      )}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-medium uppercase tracking-wider">Maternal Age</label>
          <input type="number" value={age} onChange={(e) => setAge(parseInt(e.target.value))} className="input-field" />
        </div>
        <button onClick={calculate} className="btn-primary w-full py-4 text-lg">Calculate Zone</button>
      </div>
    </CalculatorLayout>
  );
}
