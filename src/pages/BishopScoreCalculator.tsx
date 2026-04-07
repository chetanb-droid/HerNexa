import { useState, useMemo } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { motion } from 'motion/react';
import { Activity, Info, CheckCircle2, AlertCircle, Sparkles, ArrowRight, ClipboardList, Heart, Baby, ShieldCheck } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';

export default function BishopScoreCalculator() {
  const [dilation, setDilation] = useState<number>(0);
  const [effacement, setEffacement] = useState<number>(0);
  const [station, setStation] = useState<number>(0);
  const [consistency, setConsistency] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [results, setResults] = useState<any>(null);

  const faqs = [
    { q: "What is the Bishop Score?", a: "The Bishop Score is a pre-labor scoring system used by healthcare providers to determine how ready (or 'ripe') your cervix is for labor. It helps predict whether induction of labor will be successful." },
    { q: "What does a high score mean?", a: "A score of 8 or more suggests that the cervix is 'ripe' and that labor is likely to begin spontaneously soon, or that induction will be highly successful." },
    { q: "What does a low score mean?", a: "A score of 6 or less suggests that the cervix is 'unripe' and that induction may be less likely to succeed without the use of cervical ripening agents (like prostaglandins or a Foley bulb)." },
    { q: "Who performs the Bishop Score exam?", a: "A doctor or midwife performs a manual cervical exam to assess these five factors during your prenatal visits as you approach your due date." }
  ];

  const calculate = () => {
    const score = dilation + effacement + station + consistency + position;
    
    let interpretation = "Your score is intermediate. Your healthcare provider will determine the best course of action based on your overall clinical picture.";
    let color = "text-amber-600";
    let bgColor = "bg-amber-50";
    let borderColor = "border-amber-100";

    if (score >= 8) {
      interpretation = "Your cervix is considered 'ripe'. Induction is likely to be successful, and labor may even begin spontaneously soon.";
      color = "text-success";
      bgColor = "bg-success/5";
      borderColor = "border-success/10";
    } else if (score <= 6) {
      interpretation = "Your cervix is considered 'unripe'. If induction is necessary, cervical ripening agents or mechanical methods may be used first to prepare the cervix.";
      color = "text-rose-600";
      bgColor = "bg-rose-50";
      borderColor = "border-rose-100";
    }

    setResults({ score, interpretation, color, bgColor, borderColor });
  };

  return (
    <CalculatorLayout
      title="Bishop Score Calculator"
      description="Assess cervical ripeness to predict the likelihood of a successful labor induction. Expert guidance on labor readiness and cervical health."
      intro="The Bishop Score is the gold standard used by obstetricians and midwives to determine how prepared your body is for labor. By evaluating five key cervical factors, this tool helps you understand your 'readiness' score and what it might mean for a potential induction."
      schema={[
        generateSoftwareAppSchema(
          "Bishop Score Calculator", 
          "Assess cervical ripeness and labor induction success probability.", 
          "https://femhealth.com/bishop-score-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Bishop Score Calculator", item: "https://femhealth.com/bishop-score-calculator" }
        ])
      ]}
      faqs={faqs}
      howItWorks={
        <div className="space-y-4">
          <p>The Bishop Score assesses five specific physical characteristics of the cervix during a manual exam:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Dilation:</strong> The opening of the cervix (0 to 10 cm).</li>
            <li><strong>Effacement:</strong> The thinning and shortening of the cervix (0% to 100%).</li>
            <li><strong>Station:</strong> The position of the baby's head relative to the ischial spines (pelvic bones).</li>
            <li><strong>Consistency:</strong> How the cervix feels (firm like your nose, or soft like your lips).</li>
            <li><strong>Position:</strong> The direction the cervix is pointing (posterior, mid, or anterior).</li>
          </ul>
        </div>
      }
      relatedTools={[
        { name: "VBAC Calculator", path: "/vbac-calculator" },
        { name: "Due Date Calculator", path: "/due-date-calculator" },
        { name: "Contraction Timer", path: "/contraction-timer" }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="space-y-8"
        >
          <div className={`${results.bgColor} ${results.borderColor} p-10 rounded-[3rem] border text-center shadow-sm`}>
            <p className={`${results.color} font-bold uppercase tracking-widest text-xs mb-2`}>Total Bishop Score</p>
            <h2 className={`text-7xl md:text-8xl font-serif font-bold ${results.color}`}>
              {results.score}
            </h2>
            <p className="text-text-medium mt-6 max-w-lg mx-auto leading-relaxed font-medium italic">
              "{results.interpretation}"
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-primary-light flex items-start gap-6 shadow-sm">
            <div className="p-3 bg-primary-light/20 text-primary rounded-xl shadow-sm">
              <ClipboardList className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-text-dark">What This Means for You</h3>
              <p className="text-sm text-text-medium mt-2 leading-relaxed">
                A higher score indicates a higher probability of a successful vaginal delivery if induction is performed. If your score is low, your provider may discuss "cervical ripening" options to help prepare your body before starting Pitocin.
              </p>
            </div>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">The Five Factors of Cervical Ripening</h2>
            <p>
              Cervical ripening is the process by which the cervix transitions from a firm, closed structure to a soft, open one that allows for birth.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">Dilation</h4>
                <p className="text-sm text-text-medium leading-relaxed">The most well-known factor. It measures how many centimeters the cervix has opened.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">Effacement</h4>
                <p className="text-sm text-text-medium leading-relaxed">The thinning process. A cervix starts about 3-4 cm long and thins out to 'paper thin' (100%).</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">Station</h4>
                <p className="text-sm text-text-medium leading-relaxed">Measures how far down the baby's head has descended into the birth canal.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">Consistency</h4>
                <p className="text-sm text-text-medium leading-relaxed">As labor approaches, the cervix changes from firm to medium to soft.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">Position</h4>
                <p className="text-sm text-text-medium leading-relaxed">The cervix moves from a posterior position (pointing toward your back) to an anterior one (pointing forward).</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Understanding Labor Induction</h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-text-dark">Medical Induction</h4>
                  <p className="text-sm text-text-medium">Using medications like Pitocin to stimulate contractions when labor doesn't start on its own or when there's a medical reason to deliver.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-text-dark">Cervical Ripening</h4>
                  <p className="text-sm text-text-medium">If the Bishop Score is low, providers use prostaglandins or mechanical methods (like a Foley bulb) to 'ripen' the cervix before induction.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-bold text-text-dark">Spontaneous Labor</h4>
                  <p className="text-sm text-text-medium">A high Bishop Score often means your body is already doing the work and labor may start naturally very soon.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10 text-center">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4">Expert Insight: The Bishop Score is Dynamic</h3>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed text-text-medium italic">
              "It's important to remember that your Bishop Score can change quickly. A score of 3 in the morning could become a 7 by the evening as your body prepares for birth. It's a snapshot in time, not a permanent prediction."
            </p>
          </section>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Tooltip content="How many centimeters the cervix has opened (0-10 cm)." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Dilation (cm)</label>
            </Tooltip>
            <select value={dilation} onChange={(e) => setDilation(parseInt(e.target.value))} className="input-field">
              <option value={0}>Closed (0)</option>
              <option value={1}>1-2 cm (1)</option>
              <option value={2}>3-4 cm (2)</option>
              <option value={3}>5+ cm (3)</option>
            </select>
          </div>
          <div className="space-y-3">
            <Tooltip content="How thin the cervix has become (0-100%)." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Effacement (%)</label>
            </Tooltip>
            <select value={effacement} onChange={(e) => setEffacement(parseInt(e.target.value))} className="input-field">
              <option value={0}>0-30% (0)</option>
              <option value={1}>40-50% (1)</option>
              <option value={2}>60-70% (2)</option>
              <option value={3}>80%+ (3)</option>
            </select>
          </div>
          <div className="space-y-3">
            <Tooltip content="The position of the baby's head relative to the pelvic bones." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Fetal Station</label>
            </Tooltip>
            <select value={station} onChange={(e) => setStation(parseInt(e.target.value))} className="input-field">
              <option value={0}>-3 (0)</option>
              <option value={1}>-2 (1)</option>
              <option value={2}>-1, 0 (2)</option>
              <option value={3}>+1, +2 (3)</option>
            </select>
          </div>
          <div className="space-y-3">
            <Tooltip content="How the cervix feels during a manual exam." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Cervical Consistency</label>
            </Tooltip>
            <select value={consistency} onChange={(e) => setConsistency(parseInt(e.target.value))} className="input-field">
              <option value={0}>Firm (0)</option>
              <option value={1}>Medium (1)</option>
              <option value={2}>Soft (2)</option>
            </select>
          </div>
          <div className="space-y-3">
            <Tooltip content="The direction the cervix is pointing." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Cervical Position</label>
            </Tooltip>
            <select value={position} onChange={(e) => setPosition(parseInt(e.target.value))} className="input-field">
              <option value={0}>Posterior (0)</option>
              <option value={1}>Mid-position (1)</option>
              <option value={2}>Anterior (2)</option>
            </select>
          </div>
        </div>
        <button 
          onClick={calculate} 
          className="btn-primary w-full py-5 text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
        >
          <Activity className="w-5 h-5" />
          Calculate Bishop Score
        </button>
      </div>
    </CalculatorLayout>
  );
}
