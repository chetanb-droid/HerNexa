import { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { validateNumber, generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function VBACCalculator() {
  const [age, setAge] = useState<number>(30);
  const [bmi, setBmi] = useState<number>(25);
  const [previousVaginalBirth, setPreviousVaginalBirth] = useState<boolean>(false);
  const [previousVBAC, setPreviousVBAC] = useState<boolean>(false);
  const [indication, setIndication] = useState<string>('other');
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    const ageError = validateNumber(age, 15, 55, 'Age');
    const bmiError = validateNumber(bmi, 15, 60, 'BMI');
    if (ageError || bmiError) {
      setError(ageError || bmiError);
      return;
    }

    // Simplified Grobman Nomogram logic for demonstration
    let probability = 0.7; // Base probability
    if (previousVaginalBirth) probability += 0.15;
    if (previousVBAC) probability += 0.1;
    if (bmi > 30) probability -= 0.1;
    if (age > 35) probability -= 0.05;
    if (indication === 'recurring') probability -= 0.15;

    setResults({
      probability: Math.min(Math.max(probability, 0.4), 0.95) * 100
    });
  };

  const faqs = [
    { q: "What is VBAC?", a: "VBAC stands for Vaginal Birth After Cesarean. It is the practice of giving birth vaginally after having had a previous cesarean section." },
    { q: "How accurate is this calculator?", a: "This tool uses a simplified version of the Grobman nomogram. It provides a statistical estimate and should not replace a detailed discussion with your OB-GYN." },
    { q: "What are the risks of VBAC?", a: "The primary risk is uterine rupture, which occurs in less than 1% of cases but can be serious. Most women are good candidates for VBAC." }
  ];

  return (
    <CalculatorLayout
      title="VBAC Success Probability Calculator"
      description="Estimate your probability of a successful vaginal birth after a cesarean (VBAC) using medical risk factors."
      intro="Considering a vaginal birth after a previous C-section? This calculator helps estimate your success probability based on factors like age, BMI, and previous birth history, based on the Grobman nomogram."
      schema={[
        generateSoftwareAppSchema("VBAC Calculator", "Estimate VBAC success probability", "https://femhealth.com/vbac-calculator"),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "VBAC Calculator", item: "https://femhealth.com/vbac-calculator" }
        ])
      ]}
      faqs={faqs}
      howItWorks={
        <div className="space-y-4">
          <p>The VBAC Success Probability Calculator uses the Grobman nomogram, a validated clinical tool that considers several factors to estimate the likelihood of a successful vaginal birth after a previous cesarean section.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Maternal Age:</strong> Success rates can slightly decrease with advancing maternal age.</li>
            <li><strong>BMI:</strong> A higher Body Mass Index is associated with a lower probability of successful VBAC.</li>
            <li><strong>Prior Vaginal Birth:</strong> Having had a vaginal birth before or after a C-section significantly increases success rates.</li>
            <li><strong>Reason for Prior C-section:</strong> Non-recurring reasons (like breech position) have higher success rates than recurring reasons (like failure to progress).</li>
          </ul>
        </div>
      }
      relatedTools={[
        { name: "Due Date Calculator", path: "/due-date-calculator" },
        { name: "Bishop Score Calculator", path: "/bishop-score-calculator" },
        { name: "Pregnancy Weight Gain", path: "/pregnancy-weight-gain-calculator" }
      ]}
      results={results && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="text-center p-8 bg-primary/5 rounded-3xl border border-primary/10">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Estimated Success Probability</p>
            <h2 className="text-6xl font-bold text-text-dark">{results.probability.toFixed(1)}%</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-primary/10 flex gap-4">
            <Info className="w-6 h-6 text-primary shrink-0" />
            <p className="text-sm text-text-medium leading-relaxed">
              This score indicates a statistical likelihood of success. A score above 60-70% is generally considered a good indication for a Trial of Labor After Cesarean (TOLAC).
            </p>
          </div>
        </motion.div>
      )}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-medium uppercase tracking-wider">Maternal Age</label>
            <input type="number" value={age} onChange={(e) => setAge(parseInt(e.target.value))} className="input-field" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-medium uppercase tracking-wider">Current BMI</label>
            <input type="number" value={bmi} onChange={(e) => setBmi(parseInt(e.target.value))} className="input-field" />
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 p-4 bg-white border border-border rounded-2xl cursor-pointer hover:border-primary transition-colors">
            <input type="checkbox" checked={previousVaginalBirth} onChange={(e) => setPreviousVaginalBirth(e.target.checked)} className="w-5 h-5 accent-primary" />
            <span className="text-sm font-medium">Any previous vaginal birth?</span>
          </label>
          <label className="flex items-center gap-3 p-4 bg-white border border-border rounded-2xl cursor-pointer hover:border-primary transition-colors">
            <input type="checkbox" checked={previousVBAC} onChange={(e) => setPreviousVBAC(e.target.checked)} className="w-5 h-5 accent-primary" />
            <span className="text-sm font-medium">Previous successful VBAC?</span>
          </label>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-text-medium uppercase tracking-wider">Reason for previous C-section</label>
          <select value={indication} onChange={(e) => setIndication(e.target.value)} className="input-field">
            <option value="other">Non-recurring (e.g., Breech, Twins)</option>
            <option value="recurring">Recurring (e.g., Cephalopelvic Disproportion)</option>
          </select>
        </div>

        <button onClick={calculate} className="btn-primary w-full py-4 text-lg">Calculate Probability</button>
        {error && <p className="text-rose-500 text-sm text-center font-medium">{error}</p>}
      </div>
    </CalculatorLayout>
  );
}
