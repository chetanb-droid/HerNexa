import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { validateNumber, generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Baby, Info, Sparkles, ShoppingBag, Calendar, Clock, AlertCircle, CheckCircle2, TrendingUp, ShoppingCart } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function DiaperCalculator() {
  const [age, setAge] = useState<number>(3);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    const ageError = validateNumber(age, 0, 36, "Baby's age");
    if (ageError) {
      setError(ageError);
      return;
    }

    let daily = 10;
    if (age > 1) daily = 8;
    if (age > 3) daily = 7;
    if (age > 6) daily = 6;
    if (age > 12) daily = 5;

    setResults({
      daily,
      weekly: daily * 7,
      monthly: daily * 30,
      totalToDate: age * 30 * daily // Very rough estimate
    });
  };

  const faqs = [
    { q: "How many diapers does a newborn typically use?", a: "Neonates have a highly active gastrocolic reflex and small bladder capacity, typically requiring 10-12 diaper changes per 24-hour period. Frequent changes are essential to prevent diaper dermatitis (diaper rash) and monitor adequate hydration and nutrition." },
    { q: "When does the frequency of diaper changes decrease?", a: "As the infant's renal system matures and bladder capacity increases, the frequency of urination decreases. By 6 months of age, most infants require approximately 6-8 diaper changes daily." },
    { q: "How can I clinically assess if my baby is well-hydrated based on diapers?", a: "A well-hydrated infant should produce at least 6-8 heavy, wet diapers per 24 hours. Urine should be pale yellow and odorless. Dark, concentrated urine or urate crystals (pink/orange 'brick dust' in the diaper) beyond the first few days of life can indicate dehydration and warrant pediatric evaluation." },
    { q: "What are the clinical signs that an infant needs a larger diaper size?", a: "Signs include frequent leakage, erythematous (red) pressure marks around the thighs or abdomen, or difficulty securing the fastening tabs. A properly fitting diaper should allow two fingers to fit comfortably under the waistband." }
  ];

  return (
    <CalculatorLayout
      title="Clinical Infant Diaper Need Estimator"
      description="Estimate daily, weekly, and monthly infant diaper requirements based on pediatric developmental milestones and average output."
      intro="Monitoring an infant's diaper output is a fundamental clinical indicator of adequate hydration, nutrition, and gastrointestinal function. This tool estimates the anticipated diaper usage based on average pediatric developmental stages, assisting parents in practical planning and recognizing normal physiological patterns."
      schema={[
        generateSoftwareAppSchema("Clinical Diaper Calculator", "Estimate baby diaper needs based on pediatric averages", "https://hernexa.com/diaper-calculator"),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://hernexa.com" },
          { name: "Tools", item: "https://hernexa.com/tools" },
          { name: "Diaper Calculator", item: "https://hernexa.com/diaper-calculator" }
        ])
      ]}
      faqs={faqs}
      howItWorks={
        <div className="space-y-4">
          <p>This estimator utilizes average physiological output data across different pediatric developmental stages:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Neonatal Period (0-1 month):</strong> Characterized by high frequency due to limited bladder capacity and a strong gastrocolic reflex (typically 10-12 changes/day).</li>
            <li><strong>Early Infancy (2-6 months):</strong> Output frequency begins to stabilize as the gastrointestinal and renal systems mature (typically 7-9 changes/day).</li>
            <li><strong>Late Infancy (6-12 months):</strong> The introduction of complementary solid foods and increased bladder capacity further reduces frequency (typically 5-7 changes/day).</li>
            <li><strong>Toddlerhood (12+ months):</strong> Output becomes more predictable as the child approaches the physiological readiness for toilet training (typically 4-6 changes/day).</li>
          </ul>
        </div>
      }
      relatedTools={[
        { name: "Milk Calculator", path: "/breast-milk-calculator" },
        { name: "Baby Sleep Schedule", path: "/baby-sleep-schedule" },
        { name: "Baby Growth Percentile", path: "/baby-growth-percentile" }
      ]}
      medicalReferences={[
        {
          title: "Diapering Your Baby",
          url: "https://www.healthychildren.org/English/ages-stages/baby/diapers-clothing/Pages/Diapering-Your-Baby.aspx",
          source: "AAP"
        },
        {
          title: "Baby's First Days: Bowel Movements and Urination",
          url: "https://www.acog.org/womens-health/faqs/your-babys-first-days",
          source: "ACOG"
        },
        {
          title: "Nappy Rash",
          url: "https://www.nhs.uk/conditions/baby/caring-for-a-newborn/nappy-rash/",
          source: "NHS"
        },
        {
          title: "Diaper",
          url: "https://en.wikipedia.org/wiki/Diaper",
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
            <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3">Estimated Daily Changes</p>
            <div className="flex items-center justify-center gap-4">
              <h2 className="text-6xl md:text-7xl font-serif font-bold text-text-dark">{results.daily}</h2>
              <span className="text-2xl font-serif text-text-medium">diapers</span>
            </div>
            <p className="text-text-medium mt-4 font-medium italic">
              That's about one change every {Math.round(24 / results.daily)} hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm space-y-3 text-center">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-text-medium uppercase tracking-wider">Weekly Need</p>
              <p className="text-4xl font-bold text-text-dark">{results.weekly} <span className="text-lg font-normal text-text-medium">diapers</span></p>
              <p className="text-[10px] text-text-medium">Approx. 1-2 standard packs</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm space-y-3 text-center">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-text-medium uppercase tracking-wider">Monthly Need</p>
              <p className="text-4xl font-bold text-text-dark">{results.monthly} <span className="text-lg font-normal text-text-medium">diapers</span></p>
              <p className="text-[10px] text-text-medium">Approx. 1-2 bulk boxes</p>
            </div>
          </div>

          <div className="p-6 bg-primary-light/20 border border-primary/10 rounded-2xl flex items-center gap-4">
            <TrendingUp className="w-6 h-6 text-primary shrink-0" />
            <p className="text-sm text-text-dark font-medium">
              By the time your infant is 1 year old, you will have changed approximately <strong>{results.totalToDate.toLocaleString()}</strong> diapers.
            </p>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Milk Calculator.</p>
            </div>
            <Link to="/breast-milk-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Milk Calculator &rarr;
            </Link>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-16">
          <section className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-4xl font-serif font-bold text-text-dark">Clinical Diapering Through the Stages</h2>
              <p className="text-text-medium">An infant's diapering needs evolve significantly as their gastrointestinal and renal systems mature.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-border shadow-sm space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Baby className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-text-dark">The Neonatal Phase</h3>
                <p className="text-sm text-text-medium leading-relaxed">
                  Characterized by a highly active gastrocolic reflex. Neonates often pass meconium initially, transitioning to transitional stools, and then to frequent, loose milk stools. Expect 10-12 changes daily.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-border shadow-sm space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-text-dark">Introduction of Solids</h3>
                <p className="text-sm text-text-medium leading-relaxed">
                  Around 6 months, the introduction of complementary foods alters the gut microbiome. Stools become more formed and less frequent. Urine output remains a key indicator of hydration.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-border shadow-sm space-y-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-text-dark">Toddlerhood</h3>
                <p className="text-sm text-text-medium leading-relaxed">
                  As bladder capacity increases and sphincter control begins to develop (typically 18-24 months), diaper changes become less frequent. This is the physiological precursor to toilet training readiness.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-serif font-bold text-text-dark text-center">Clinical Diaper Size Guide</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-bg-light border-b border-border">
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-medium">Size</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-medium">Weight Range (kg)</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-medium">Weight Range (lbs)</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-medium">Typical Age</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {[
                    { size: "Newborn", kg: "Up to 4.5 kg", lbs: "Up to 10 lbs", age: "0-1 month" },
                    { size: "Size 1", kg: "3.5 - 6.5 kg", lbs: "8 - 14 lbs", age: "1-4 months" },
                    { size: "Size 2", kg: "5.5 - 8 kg", lbs: "12 - 18 lbs", age: "3-6 months" },
                    { size: "Size 3", kg: "7 - 13 kg", lbs: "16 - 28 lbs", age: "5-18 months" },
                    { size: "Size 4", kg: "10 - 17 kg", lbs: "22 - 37 lbs", age: "12-24 months" },
                    { size: "Size 5", kg: "12+ kg", lbs: "27+ lbs", age: "24+ months" }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-neutral-50 transition-colors">
                      <td className="p-4 text-sm font-bold text-text-dark">{row.size}</td>
                      <td className="p-4 text-sm text-text-medium">{row.kg}</td>
                      <td className="p-4 text-sm text-text-medium">{row.lbs}</td>
                      <td className="p-4 text-sm text-text-medium">{row.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-border space-y-8 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Tooltip content="Select the infant's current age in months." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Infant's Age (months)</label>
              </Tooltip>
              <span className="text-sm font-bold text-primary">{age} {age === 1 ? 'month' : 'months'}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="36" 
              step="1"
              value={age} 
              onChange={(e) => setAge(parseInt(e.target.value))} 
              className="w-full accent-primary h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-text-medium font-bold uppercase tracking-wider">
              <span>Newborn</span>
              <span>18 months</span>
              <span>3 years</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-medium">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        <button 
          onClick={calculate} 
          className="btn-primary w-full py-5 text-xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
        >
          <Clock className="w-6 h-6" />
          Estimate Clinical Output
        </button>
      </div>
    </CalculatorLayout>
  );
}
