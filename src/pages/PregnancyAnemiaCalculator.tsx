import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { motion } from 'motion/react';
import { AlertCircle, Info } from 'lucide-react';

export default function PregnancyAnemiaCalculator() {
  const [hemoglobin, setHemoglobin] = useState<number>(12);
  const [trimester, setTrimester] = useState<number>(1);
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    let isAnemic = false;
    let threshold = 11;
    if (trimester === 2) threshold = 10.5;
    if (trimester === 3) threshold = 11;
    
    if (hemoglobin < threshold) isAnemic = true;
    
    setResults({ isAnemic, threshold });
  };

  const faqs = [
    { q: "What is anemia in pregnancy?", a: "Anemia is a condition where you don't have enough healthy red blood cells to carry adequate oxygen to your tissues and your baby." },
    { q: "Why do hemoglobin thresholds change by trimester?", a: "During the second trimester, blood volume expands rapidly, leading to a natural dilution of red blood cells (hemodilution)." },
    { q: "What are the symptoms of anemia?", a: "Common symptoms include fatigue, weakness, dizziness, shortness of breath, and pale skin." }
  ];

  return (
    <CalculatorLayout
      title="Pregnancy Anemia Risk Calculator"
      description="Evaluate your risk factors for iron-deficiency anemia during pregnancy based on hemoglobin levels."
      intro="Iron-deficiency anemia is common during pregnancy. This tool helps you understand if your hemoglobin levels are within the normal range for your specific trimester."
      schema={[
        generateSoftwareAppSchema("Pregnancy Anemia Calculator", "Evaluate anemia risk", "https://hernexa.com/pregnancy-anemia-calculator"),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://hernexa.com" },
          { name: "Tools", item: "https://hernexa.com/tools" },
          { name: "Anemia Risk", item: "https://hernexa.com/pregnancy-anemia-calculator" }
        ])
      ]}
      faqs={faqs}
      howItWorks={
        <div className="space-y-4">
          <p>This calculator evaluates your risk of iron-deficiency anemia by comparing your hemoglobin levels to the recommended thresholds for each trimester of pregnancy.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Trimester 1:</strong> Threshold is typically 11.0 g/dL.</li>
            <li><strong>Trimester 2:</strong> Threshold drops to 10.5 g/dL due to blood volume expansion.</li>
            <li><strong>Trimester 3:</strong> Threshold returns to 11.0 g/dL.</li>
          </ul>
        </div>
      }
      medicalReferences={[
        {
          title: "Anemia and Pregnancy",
          url: "https://www.hematology.org/education/patients/anemia/pregnancy",
          source: "American Society of Hematology"
        },
        {
          title: "Nutrition During Pregnancy",
          url: "https://www.acog.org/womens-health/faqs/nutrition-during-pregnancy",
          source: "ACOG"
        },
        {
          title: "Iron Deficiency Anemia in Pregnancy",
          url: "https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/anemia-during-pregnancy/art-20114455",
          source: "Mayo Clinic"
        },
        {
          title: "Anemia in pregnancy",
          url: "https://en.wikipedia.org/wiki/Anemia_in_pregnancy",
          source: "Wikipedia"
        }
      ]}
      relatedTools={[
        { name: "Iron Intake Calculator", path: "/iron-intake-calculator" },
        { name: "Blood Volume Calculator", path: "/blood-volume-calculator" },
        { name: "Folic Acid Calculator", path: "/folic-acid-calculator" }
      ]}
      results={results && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className={`p-8 rounded-3xl border text-center ${results.isAnemic ? 'bg-rose-50 border-rose-100' : 'bg-success/5 border-success/10'}`}>
            <p className="text-sm font-bold uppercase tracking-widest mb-2">Anemia Status</p>
            <h2 className={`text-4xl font-bold ${results.isAnemic ? 'text-rose-600' : 'text-success'}`}>
              {results.isAnemic ? 'Potential Anemia' : 'Normal Range'}
            </h2>
            <p className="text-sm text-text-medium mt-2">Threshold for Trimester {trimester}: {results.threshold} g/dL</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-primary/10 flex gap-4">
            <Info className="w-6 h-6 text-primary shrink-0" />
            <p className="text-sm text-text-medium leading-relaxed">
              {results.isAnemic ? "Your hemoglobin level is below the recommended threshold. Please consult your healthcare provider for further testing and potential iron supplementation." : "Your hemoglobin level is currently within the normal range for your trimester. Continue your prenatal vitamins as prescribed."}
            </p>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Iron Intake Calculator.</p>
            </div>
            <Link to="/iron-intake-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Iron Intake Calculator &rarr;
            </Link>
          </div>
        </motion.div>
      )}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-medium uppercase tracking-wider">Current Trimester</label>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((t) => (
              <button key={t} onClick={() => setTrimester(t)} className={`p-4 rounded-2xl border font-bold transition-all ${trimester === t ? 'bg-primary text-white border-primary' : 'bg-white border-border hover:border-primary'}`}>
                T{t}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-medium uppercase tracking-wider">Hemoglobin Level (g/dL)</label>
          <input type="number" step="0.1" value={hemoglobin} onChange={(e) => setHemoglobin(parseFloat(e.target.value))} className="input-field" />
        </div>
        <button onClick={calculate} className="btn-primary w-full py-4 text-lg">Check Status</button>
      </div>
    </CalculatorLayout>
  );
}
