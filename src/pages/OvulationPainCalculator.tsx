import { useState, useMemo } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Activity, AlertCircle, Calendar, Info, ShieldCheck, Heart, Sparkles, ArrowRight, ClipboardList } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function OvulationPainCalculator() {
  const [painType, setPainType] = useState<string>('dull');
  const [painDuration, setPainDuration] = useState<string>('hours');
  const [painLocation, setPainLocation] = useState<string>('one_side');
  const [cycleDay, setCycleDay] = useState<number>(14);
  const [results, setResults] = useState<any>(null);

  const faqs = [
    { q: "What is ovulation pain (Mittelschmerz)?", a: "Mittelschmerz is one-sided, lower abdominal pain associated with ovulation. It occurs midway through a menstrual cycle, about 14 days before your next period." },
    { q: "Is ovulation pain normal?", a: "Yes, about 20% of women experience ovulation pain. It is generally harmless and a helpful sign that you are ovulating." },
    { q: "When should I see a doctor for ovulation pain?", a: "You should see a doctor if the pain is severe, lasts longer than a few days, or is accompanied by fever, vomiting, or heavy bleeding, as this could indicate a more serious condition like an ectopic pregnancy or appendicitis." },
    { q: "Can ovulation pain switch sides?", a: "Yes, it often switches sides from month to month depending on which ovary is releasing the egg during that cycle." }
  ];

  const calculate = () => {
    let score = 0;
    
    // Assess likelihood of it being Mittelschmerz
    if (painLocation === 'one_side') score += 3;
    if (painLocation === 'alternates') score += 4; // Classic sign
    
    if (painType === 'dull' || painType === 'sharp_brief') score += 3;
    if (painType === 'severe_cramping') score -= 2; // Less likely to be normal ovulation
    
    if (painDuration === 'minutes' || painDuration === 'hours') score += 3;
    if (painDuration === 'days') score -= 2; // Ovulation pain shouldn't last many days
    
    // Cycle timing (assuming 28 day cycle for simplicity, day 10-16 is prime)
    if (cycleDay >= 10 && cycleDay <= 16) score += 4;
    else score -= 3;

    let likelihood = "Low";
    let color = "text-amber-500";
    let bgColor = "bg-amber-50";
    let borderColor = "border-amber-100";
    let message = "Your symptoms or timing do not strongly align with typical ovulation pain (Mittelschmerz). If pain persists, consult a healthcare provider.";
    let isWarning = false;

    if (score >= 10) {
      likelihood = "High";
      color = "text-success";
      bgColor = "bg-success/5";
      borderColor = "border-success/10";
      message = "Your symptoms strongly match classic Mittelschmerz (ovulation pain). This is a normal part of the menstrual cycle for many women.";
    } else if (score >= 5) {
      likelihood = "Moderate";
      color = "text-blue-500";
      bgColor = "bg-blue-50";
      borderColor = "border-blue-100";
      message = "Your symptoms could be ovulation pain, but the timing or characteristics are slightly atypical.";
    }

    if (painType === 'severe_cramping' || painDuration === 'days') {
      isWarning = true;
      message += " However, severe or prolonged pain should be evaluated by a doctor to rule out cysts, endometriosis, or other conditions.";
    }

    setResults({
      likelihood,
      message,
      isWarning,
      color,
      bgColor,
      borderColor
    });
  };

  return (
    <CalculatorLayout
      title="Ovulation Pain (Mittelschmerz) Calculator"
      description="Analyze your mid-cycle abdominal pain to determine if it aligns with typical ovulation pain (Mittelschmerz). Understand your body's fertility signals."
      intro="Experiencing a twinge or cramp in your lower abdomen mid-cycle? About 20% of women feel ovulation pain, known as Mittelschmerz. This tool analyzes your symptoms and timing to help you determine if your pain is a normal sign of ovulation or something that warrants medical attention."
      schema={[
        generateSoftwareAppSchema(
          "Ovulation Pain Calculator",
          "Analyze mid-cycle pain symptoms for Mittelschmerz.",
          "https://femhealth.com/ovulation-pain-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Ovulation Pain Calculator", item: "https://femhealth.com/ovulation-pain-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>This symptom checker evaluates four key characteristics of your pain to determine the likelihood of Mittelschmerz:</p>
          <ul>
            <li><strong>Timing:</strong> True ovulation pain occurs mid-cycle, typically around day 14 of a 28-day cycle.</li>
            <li><strong>Location:</strong> It is usually localized to one side of the lower abdomen, often switching sides from month to month.</li>
            <li><strong>Duration:</strong> Normal ovulation pain is brief, lasting anywhere from a few minutes to a few hours.</li>
            <li><strong>Type of Pain:</strong> It is often described as a dull ache or a sharp sudden twinge.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Ovulation Calculator", path: "/ovulation-calculator" },
        { name: "Endometriosis Risk Calculator", path: "/endometriosis-risk-calculator" },
        { name: "Period Calculator", path: "/period-calculator" }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className={`p-10 rounded-[2.5rem] border text-center ${results.bgColor} ${results.borderColor} shadow-sm`}>
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Assessment Result</p>
            <h2 className={`text-5xl md:text-6xl font-serif font-bold ${results.color}`}>
              {results.likelihood} Likelihood
            </h2>
            <p className="text-text-medium mt-4 font-medium">Based on your reported symptom patterns.</p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-primary-light shadow-sm space-y-6">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl bg-primary-light/20 ${results.isWarning ? 'text-rose-500' : results.color}`}>
                {results.isWarning ? <AlertCircle className="w-6 h-6" /> : <Info className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-bold text-text-dark text-lg mb-2">Analysis & Guidance</h3>
                <p className="text-text-medium leading-relaxed">{results.message}</p>
              </div>
            </div>
          </div>

          <div className="bg-bg-light p-8 rounded-2xl border border-primary-light space-y-6 shadow-sm">
            <h3 className="font-bold text-text-dark flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" />
              Important Medical Note
            </h3>
            <p className="text-sm text-text-medium leading-relaxed italic">
              "Mittelschmerz is a normal physiological event for many women. However, severe pelvic pain can also be a sign of other conditions like ovarian cysts, appendicitis, or ectopic pregnancy. If your pain is debilitating or accompanied by fever, please seek medical attention immediately."
            </p>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">What is Mittelschmerz?</h2>
            <p>
              Mittelschmerz is a German word that literally translates to \"middle pain.\" It refers to the lower abdominal and pelvic pain that some women experience during ovulation. Ovulation typically occurs about midway between menstrual periods—hence the name.
            </p>
            <p>
              While the exact cause of Mittelschmerz is not known for certain, medical professionals believe it may be caused by:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-text-medium">
              <li><strong>Follicular Growth:</strong> Just before an egg is released with ovulation, follicle growth stretches the surface of your ovary, causing pain.</li>
              <li><strong>Irritation:</strong> At the time of ovulation, blood or fluid is released from the ruptured egg follicle and may irritate the abdominal lining (peritoneum).</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">How to Identify Ovulation Pain</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-rose-500" />
                  One-Sided Pain
                </h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  The pain is almost always on one side of your lower abdomen. It may switch sides from month to month, or stay on one side for several months in a row.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-rose-500" />
                  Mid-Cycle Timing
                </h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  It occurs about 14 days before your next period is expected. If you have a 28-day cycle, this is around day 14.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">When to See a Doctor</h2>
            <p>
              Most cases of Mittelschmerz don't require medical intervention. However, you should contact your healthcare provider if you experience:
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">!</div>
                <div>
                  <h4 className="font-bold text-text-dark">Severe Pain</h4>
                  <p className="text-sm text-text-medium">Pain that is so severe it prevents you from walking or performing daily activities.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">!</div>
                <div>
                  <h4 className="font-bold text-text-dark">Fever or Chills</h4>
                  <p className="text-sm text-text-medium">Pain accompanied by a fever, which could indicate an infection or appendicitis.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">!</div>
                <div>
                  <h4 className="font-bold text-text-dark">Vomiting or Diarrhea</h4>
                  <p className="text-sm text-text-medium">Gastrointestinal symptoms combined with severe pelvic pain require immediate evaluation.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10 text-center">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4">Using Pain as a Fertility Signal</h3>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed text-text-medium">
              If you are trying to conceive, Mittelschmerz can be a helpful (though not 100% reliable) indicator that you are in your fertile window. When you feel the pain, you are likely very close to ovulation, making it an ideal time for intercourse.
            </p>
          </section>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-primary-light space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <ClipboardList className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-text-dark">Symptom Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Tooltip content="Day 1 is the first day of your last period." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Cycle Day</label>
              </Tooltip>
              <input 
                type="number" 
                value={cycleDay} 
                onChange={(e) => setCycleDay(Number(e.target.value))} 
                className="input-field" 
              />
            </div>

            <div className="space-y-3">
              <Tooltip content="Where do you feel the discomfort?" showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Pain Location</label>
              </Tooltip>
              <select value={painLocation} onChange={(e) => setPainLocation(e.target.value)} className="input-field">
                <option value="one_side">One side of lower abdomen</option>
                <option value="alternates">One side (alternates monthly)</option>
                <option value="entire_pelvis">Across entire lower pelvis</option>
                <option value="upper_abdomen">Upper abdomen / stomach</option>
              </select>
            </div>

            <div className="space-y-3">
              <Tooltip content="Describe the sensation of the pain." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Pain Type</label>
              </Tooltip>
              <select value={painType} onChange={(e) => setPainType(e.target.value)} className="input-field">
                <option value="dull">Dull, mild ache</option>
                <option value="sharp_brief">Sharp, sudden twinge</option>
                <option value="severe_cramping">Severe, debilitating cramping</option>
              </select>
            </div>

            <div className="space-y-3">
              <Tooltip content="How long does the sensation last?" showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Pain Duration</label>
              </Tooltip>
              <select value={painDuration} onChange={(e) => setPainDuration(e.target.value)} className="input-field">
                <option value="minutes">A few minutes</option>
                <option value="hours">A few hours</option>
                <option value="days">Multiple days</option>
              </select>
            </div>
          </div>
        </div>

        <button 
          onClick={calculate} 
          className="btn-primary w-full py-5 text-lg shadow-xl shadow-primary/20"
        >
          Analyze My Symptoms
        </button>
      </div>
    </CalculatorLayout>
  );
}
