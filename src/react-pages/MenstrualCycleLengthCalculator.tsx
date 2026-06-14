import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema, formatDate } from '../lib/calculators';
import { Calendar, Activity, AlertCircle, Info, ArrowRight, Sparkles, ShieldCheck, History } from 'lucide-react';
import { parseISO, differenceInDays } from 'date-fns';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function MenstrualCycleLengthCalculator() {
  const [date1, setDate1] = useState<string>('');
  const [date2, setDate2] = useState<string>('');
  const [date3, setDate3] = useState<string>('');
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const faqs = [
    { q: "What is a normal menstrual cycle length?", a: "A normal menstrual cycle length for adults ranges from 21 to 35 days, with the average being 28 days. For teens, cycles can range from 21 to 45 days." },
    { q: "How do I count my cycle length?", a: "Day 1 of your cycle is the first day of full bleeding (not just spotting). The last day of your cycle is the day before your next period begins." },
    { q: "Why is my cycle length irregular?", a: "Irregular cycles can be caused by stress, significant weight changes, excessive exercise, PCOS, thyroid issues, or approaching menopause. If your cycle is consistently outside the 21-35 day range, consult a doctor." },
    { q: "Can my cycle length change as I age?", a: "Yes, it's common for cycles to be longer and more irregular during adolescence and then again during perimenopause (the transition to menopause)." }
  ];

  const calculate = () => {
    setError(null);
    if (!date1 || !date2) {
      setError("Please enter at least the first two period start dates.");
      return;
    }

    const d1 = parseISO(date1);
    const d2 = parseISO(date2);
    
    if (d2 <= d1) {
      setError("Period 2 must be after Period 1.");
      return;
    }

    const length1 = differenceInDays(d2, d1);

    let averageLength = length1;
    let length2 = null;
    let variance = 0;

    if (date3) {
      const d3 = parseISO(date3);
      if (d3 <= d2) {
        setError("Period 3 must be after Period 2.");
        return;
      }
      length2 = differenceInDays(d3, d2);
      averageLength = Math.round((length1 + length2) / 2);
      variance = Math.abs(length1 - length2);
    }

    let status = "Normal";
    let message = "Your cycle length falls within the typical healthy range of 21-35 days.";
    let color = "text-success";
    
    if (averageLength < 21) {
      status = "Short";
      message = "Your cycle is shorter than the typical 21-day minimum. This is known as polymenorrhea.";
      color = "text-amber-500";
    } else if (averageLength > 35) {
      status = "Long";
      message = "Your cycle is longer than the typical 35-day maximum. This is known as oligomenorrhea.";
      color = "text-amber-500";
    }

    if (variance > 7) {
      status = "Irregular";
      message = "There is a significant variation (more than 7 days) between your cycles, indicating irregularity.";
      color = "text-rose-500";
    }

    setResults({
      averageLength,
      length1,
      length2,
      status,
      message,
      variance,
      color
    });
  };

  return (
    <CalculatorLayout
      title="Cycle Length Calculator | Irregular Menstrual Cycle Calculator"
      description="Use our cycle length calculator to determine if your menstrual cycle is regular. Highly accurate irregular menstrual cycle calculator."
      intro={<>Knowing your exact menstrual cycle length is the foundation of tracking your reproductive health. Whether you need a standard <strong>cycle length calculator</strong> or an <strong>irregular menstrual cycle calculator</strong>, this tool helps you find your rhythm. By analyzing the dates of your last few <a href="/period-calculator" className="text-primary hover:underline font-medium">periods</a>, our calculator identifies your average cycle length, checks for irregularities, and helps you understand your body's unique timeline.</>}
      schema={[
        generateSoftwareAppSchema(
          "Menstrual Cycle Length Calculator",
          "Calculate average menstrual cycle length and regularity.",
          "https://hernexa.com/menstrual-cycle-length-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://hernexa.com" },
          { name: "Tools", item: "https://hernexa.com/tools" },
          { name: "Cycle Length Calculator", item: "https://hernexa.com/menstrual-cycle-length-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>This calculator measures the exact number of days between the start of one period and the start of the next.</p>
          <ul>
            <li><strong>Data Points:</strong> By entering 2 or 3 consecutive period start dates, we can calculate the exact length of each cycle.</li>
            <li><strong>Averaging:</strong> If you enter 3 dates, we average the two cycle lengths to give you a more accurate baseline.</li>
            <li><strong>Variance Check:</strong> We analyze the difference between your cycles. A variation of up to 7 days is generally considered normal, but wider swings may indicate an irregular cycle.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Period Calculator", path: "/period-calculator" },
        { name: "Ovulation Calculator", path: "/ovulation-calculator" },
        { name: "PCOS Symptom Checker", path: "/pcos-calculator" }
      ]}
      medicalReferences={[
        {
          title: "Normal Menstrual Cycle",
          url: "https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle",
          source: "WomensHealth.gov"
        },
        {
          title: "Menstruation in Girls and Adolescents",
          url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2015/12/menstruation-in-girls-and-adolescents-using-the-menstrual-cycle-as-a-vital-sign",
          source: "ACOG"
        },
        {
          title: "Irregular Periods",
          url: "https://www.nhs.uk/conditions/irregular-periods/",
          source: "NHS"
        },
        {
          title: "Menstrual cycle",
          url: "https://en.wikipedia.org/wiki/Menstrual_cycle",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-rose-500 p-10 rounded-[3rem] border border-rose-600 text-center shadow-lg shadow-rose-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
            
            <p className="text-rose-100 font-bold uppercase tracking-widest text-sm relative z-10 mb-2">Average Cycle Length</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white relative z-10">{results.averageLength} Days</h2>
            <div className="flex justify-center mt-4">
              <span className={`px-4 py-2 bg-white/20 text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 backdrop-blur-sm relative z-10`}>
                <Activity className="w-4 h-4" />
                Status: {results.status}
              </span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-primary-light shadow-sm space-y-6">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl bg-primary-light/20 ${results.color}`}>
                <Info className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-text-dark text-lg mb-2">What This Means</h3>
                <p className="text-text-medium leading-relaxed">{results.message}</p>
              </div>
            </div>

            {results.length2 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-100">
                <div className="p-4 bg-neutral-50 rounded-2xl text-center">
                  <p className="text-[10px] font-bold text-text-medium uppercase tracking-wider mb-1">Cycle 1</p>
                  <p className="text-xl font-bold text-text-dark">{results.length1} Days</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-2xl text-center">
                  <p className="text-[10px] font-bold text-text-medium uppercase tracking-wider mb-1">Cycle 2</p>
                  <p className="text-xl font-bold text-text-dark">{results.length2} Days</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-2xl text-center">
                  <p className="text-[10px] font-bold text-text-medium uppercase tracking-wider mb-1">Variance</p>
                  <p className={`text-xl font-bold ${results.variance > 7 ? 'text-rose-500' : 'text-success'}`}>{results.variance} Days</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-bg-light p-8 rounded-2xl border border-primary-light space-y-6 shadow-sm">
            <h3 className="font-bold text-text-dark flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" />
              Health Recommendation
            </h3>
            <p className="text-sm text-text-medium leading-relaxed">
              {results.status === 'Normal' && results.variance <= 7 
                ? "Your cycle appears healthy and regular. Continue tracking to maintain a baseline of your reproductive health."
                : "Your results show some irregularity. While occasional variation is normal, consistent irregularity should be discussed with a healthcare provider to rule out conditions like PCOS or thyroid imbalances."}
            </p>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Period Calculator.</p>
            </div>
            <a href="/period-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Period Calculator &rarr;
            </a>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Understanding Your Menstrual Cycle</h2>
            <p>
              A menstrual cycle is measured from the first day of one period to the first day of the next. While the "standard" cycle is often cited as 28 days, very few women have a perfect 28-day cycle every month. Understanding your own average and variance is crucial for fertility planning and overall health monitoring.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">What is "Normal"?</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Medical professionals consider a cycle length between 21 and 35 days to be normal for adult women. For teenagers, cycles can be longer (up to 45 days) as the body's hormonal systems mature.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">The Role of Variance</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Variance is the difference in length between your shortest and longest cycles. A variance of up to 7 to 9 days is typically considered "regular." If your cycles vary by more than 10 days, they are clinically considered irregular.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Why Cycle Length Matters</h2>
            <p>
              Your cycle length is a vital sign of your overall health. It reflects the complex interplay of hormones between your brain and your ovaries.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-text-dark">Predicting Ovulation</h4>
                  <p className="text-sm text-text-medium">Knowing your cycle length is the first step in calculating when you ovulate. Ovulation typically occurs 14 days before your next period starts.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-text-dark">Identifying Health Issues</h4>
                  <p className="text-sm text-text-medium">Consistently short or long cycles can be early indicators of conditions like Polycystic Ovary Syndrome (PCOS), endometriosis, or thyroid dysfunction.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-bold text-text-dark">Tracking Life Stages</h4>
                  <p className="text-sm text-text-medium">Changes in cycle length are often the first sign of perimenopause, the transition period leading up to menopause.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4 text-center">Expert Tip: How to Track Accurately</h3>
            <p className="text-sm text-center max-w-2xl mx-auto leading-relaxed italic text-text-medium">
              "Always mark Day 1 as the first day of bright red, full flow. Spotting that occurs before your period starts should be considered part of the previous cycle. For the most accurate average, try to track at least 3 to 6 consecutive months."
            </p>
          </section>
        </div>
      }
    >
      <div className="space-y-8">
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-medium">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-primary-light space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <History className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-text-dark">Enter Your Period Start Dates</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Tooltip content="The first day of your oldest tracked period." showIcon>
                  <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Period 1 (Oldest)</label>
                </Tooltip>
                <input 
                  type="date" 
                  value={date1} 
                  onChange={(e) => setDate1(e.target.value)} 
                  className="input-field" 
                />
              </div>

              <div className="space-y-3">
                <Tooltip content="The first day of the period following Period 1." showIcon>
                  <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Period 2</label>
                </Tooltip>
                <input 
                  type="date" 
                  value={date2} 
                  onChange={(e) => setDate2(e.target.value)} 
                  className="input-field" 
                />
              </div>

              <div className="space-y-3">
                <Tooltip content="The first day of your most recent period (optional, but recommended for accuracy)." showIcon>
                  <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Period 3 (Recent)</label>
                </Tooltip>
                <input 
                  type="date" 
                  value={date3} 
                  onChange={(e) => setDate3(e.target.value)} 
                  className="input-field" 
                />
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={calculate} 
          disabled={!date1 || !date2}
          className="btn-primary w-full text-lg"
        >
          Calculate Cycle Length & Regularity
        </button>
      </div>
    </CalculatorLayout>
  );
}
