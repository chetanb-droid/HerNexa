import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { motion } from 'motion/react';
import { Info, CheckCircle2 } from 'lucide-react';

export default function PelvicFloorTracker() {
  const [reps, setReps] = useState<number>(10);
  const [sets, setSets] = useState<number>(3);
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const total = reps * sets;
    setResults({ total });
  };

  const faqs = [
    { q: "What is pelvic floor health?", a: "Pelvic floor health involves the strength and function of the muscles that support the bladder, uterus, and bowel." },
    { q: "How often should I do Kegels?", a: "Most experts recommend doing Kegel exercises 3 times a day, with 10-15 repetitions per set." },
    { q: "What are the benefits?", a: "Benefits include improved bladder control, better sexual function, and support for the pelvic organs." }
  ];

  return (
    <CalculatorLayout
      title="Pelvic Floor (Kegel) Tracker"
      description="Monitor your Kegel exercise progress and pelvic floor health milestones."
      intro="Strengthening your pelvic floor is essential for overall health. This tool helps you track your daily exercise progress and stay consistent."
      schema={[
        generateSoftwareAppSchema("Pelvic Floor Tracker", "Track Kegel exercises", "https://femhealth.com/pelvic-floor-tracker"),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Pelvic Floor", item: "https://femhealth.com/pelvic-floor-tracker" }
        ])
      ]}
      faqs={faqs}
      howItWorks={
        <div className="space-y-4">
          <p>The Pelvic Floor Tracker helps you log your daily Kegel exercises. Consistent training of the pelvic floor muscles is key to improving bladder control and overall pelvic health.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Repetitions:</strong> The number of times you contract and relax the muscle in one set.</li>
            <li><strong>Sets:</strong> The number of times you repeat the group of repetitions.</li>
          </ul>
        </div>
      }
      relatedTools={[
        { name: "Vaginal pH Guide", path: "/vaginal-ph-guide" },
        { name: "Pregnancy Exercise", path: "/pregnancy-exercise-calculator" },
        { name: "Postpartum Recovery", path: "/epds-screener" }
      ]}
      medicalReferences={[
        {
          title: "Pelvic Floor Exercises",
          url: "https://www.nhs.uk/common-health-questions/womens-health/what-are-pelvic-floor-exercises/",
          source: "NHS"
        },
        {
          title: "Pelvic Floor Disorders",
          url: "https://www.acog.org/womens-health/faqs/pelvic-floor-disorders",
          source: "ACOG"
        },
        {
          title: "Kegel Exercises",
          url: "https://www.mayoclinic.org/healthy-lifestyle/womens-health/in-depth/kegel-exercises/art-20045283",
          source: "Mayo Clinic"
        },
        {
          title: "Pelvic floor",
          url: "https://en.wikipedia.org/wiki/Pelvic_floor",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-success/5 border border-success/10 rounded-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest mb-2">Daily Progress</p>
            <h2 className="text-4xl font-bold text-success">{results.total} Repetitions</h2>
            <p className="text-sm text-text-medium mt-2">Great job! Consistency is key to pelvic health.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-primary/10 flex gap-4">
            <CheckCircle2 className="w-6 h-6 text-success shrink-0" />
            <p className="text-sm text-text-medium leading-relaxed">
              You've completed your daily goal. Aim for at least 3 sets of 10-15 repetitions every day for the best results.
            </p>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Vaginal pH Guide.</p>
            </div>
            <Link to="/vaginal-ph-guide" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Vaginal pH Guide &rarr;
            </Link>
          </div>
        </motion.div>
      )}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-medium uppercase tracking-wider">Repetitions per Set</label>
            <input type="number" value={reps} onChange={(e) => setReps(parseInt(e.target.value))} className="input-field" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-medium uppercase tracking-wider">Sets Completed</label>
            <input type="number" value={sets} onChange={(e) => setSets(parseInt(e.target.value))} className="input-field" />
          </div>
        </div>
        <button onClick={calculate} className="btn-primary w-full py-4 text-lg">Log Progress</button>
      </div>
    </CalculatorLayout>
  );
}
