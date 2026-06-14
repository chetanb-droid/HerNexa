import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { motion } from 'motion/react';
import { Info } from 'lucide-react';

export default function VaginalPHGuide() {
  const [ph, setPh] = useState<number>(4.5);
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    let status = 'Normal';
    let description = 'A healthy vaginal pH is typically between 3.8 and 4.5.';
    if (ph > 4.5) {
      status = 'Elevated';
      description = 'An elevated pH (above 4.5) can be a sign of Bacterial Vaginosis (BV) or other infections.';
    } else if (ph < 3.8) {
      status = 'Low';
      description = 'A very low pH is less common but can sometimes be associated with certain conditions.';
    }
    setResults({ status, description });
  };

  const faqs = [
    { q: "What is vaginal pH?", a: "Vaginal pH is a measure of how acidic or alkaline the vaginal environment is." },
    { q: "What is a normal pH?", a: "A normal, healthy vaginal pH is typically between 3.8 and 4.5." },
    { q: "What can cause pH to change?", a: "Factors include infections, hormonal changes, sexual activity, and certain hygiene products." }
  ];

  return (
    <CalculatorLayout
      title="Vaginal pH Health Guide"
      description="Understand what your vaginal pH levels mean for your overall health."
      intro="Your vaginal pH is a key indicator of your vaginal microbiome health. This tool helps you interpret your pH test results."
      schema={[
        generateSoftwareAppSchema("Vaginal pH Guide", "Guide for vaginal pH", "https://hernexa.com/vaginal-ph-guide"),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://hernexa.com" },
          { name: "Tools", item: "https://hernexa.com/tools" },
          { name: "Vaginal pH", item: "https://hernexa.com/vaginal-ph-guide" }
        ])
      ]}
      faqs={faqs}
      howItWorks={
        <div className="space-y-4">
          <p>The Vaginal pH Health Guide helps you interpret the results of a vaginal pH test strip. A healthy vaginal environment is naturally acidic, which helps prevent infections.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Normal (3.8-4.5):</strong> Indicates a healthy balance of beneficial bacteria.</li>
            <li><strong>Elevated (&gt;4.5):</strong> May suggest an infection like Bacterial Vaginosis (BV).</li>
          </ul>
        </div>
      }
      medicalReferences={[
        {
          title: "Vaginal Health",
          url: "https://www.mayoclinic.org/healthy-lifestyle/womens-health/in-depth/vaginal-health/art-20046590",
          source: "Mayo Clinic"
        },
        {
          title: "Vaginitis",
          url: "https://www.acog.org/womens-health/faqs/vaginitis",
          source: "ACOG"
        },
        {
          title: "Vaginal Discharge",
          url: "https://www.nhs.uk/conditions/vaginal-discharge/",
          source: "NHS"
        },
        {
          title: "Vaginal flora",
          url: "https://en.wikipedia.org/wiki/Vaginal_flora",
          source: "Wikipedia"
        }
      ]}
      relatedTools={[
        { name: "Pelvic Floor Tracker", path: "/pelvic-floor-tracker" },
        { name: "Period Symptom Tracker", path: "/period-symptom-tracker" },
        { name: "Hormone Balance Quiz", path: "/hormone-balance-quiz" }
      ]}
      results={results && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className={`p-8 rounded-3xl border text-center ${results.status === 'Elevated' ? 'bg-rose-50 border-rose-100' : 'bg-success/5 border-success/10'}`}>
            <p className="text-sm font-bold uppercase tracking-widest mb-2">pH Status</p>
            <h2 className={`text-4xl font-bold ${results.status === 'Elevated' ? 'text-rose-600' : 'text-success'}`}>
              {results.status}
            </h2>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-primary/10 flex gap-4">
            <Info className="w-6 h-6 text-primary shrink-0" />
            <p className="text-sm text-text-medium leading-relaxed">{results.description}</p>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Pelvic Floor Tracker.</p>
            </div>
            <a href="/pelvic-floor-tracker" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Pelvic Floor Tracker &rarr;
            </a>
          </div>
        </motion.div>
      )}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-text-medium uppercase tracking-wider">Vaginal pH Level</label>
            <span className="text-primary font-bold">{ph.toFixed(1)}</span>
          </div>
          <input type="range" min="3.0" max="7.0" step="0.1" value={ph} onChange={(e) => setPh(parseFloat(e.target.value))} className="w-full h-2 bg-primary-light rounded-lg appearance-none cursor-pointer accent-primary" />
          <div className="flex justify-between text-[10px] font-bold text-text-medium uppercase">
            <span>Acidic (3.0)</span>
            <span>Normal (3.8-4.5)</span>
            <span>Alkaline (7.0)</span>
          </div>
        </div>
        <button onClick={calculate} className="btn-primary w-full py-4 text-lg">Interpret Result</button>
      </div>
    </CalculatorLayout>
  );
}
