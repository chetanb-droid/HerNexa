import { useState, useMemo } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { calculateOvulation, formatDate, addDays, validateDate, generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Sparkles, Heart, Activity, Calendar, AlertCircle } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function OvulationCalculator() {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const timelineData = useMemo(() => {
    if (!results) return null;
    const total = cycleLength;
    const ovulationDay = total - 14;
    const fertileStart = ovulationDay - 5;
    
    return {
      follicular: { start: 0, end: fertileStart, label: 'Follicular Phase' },
      fertile: { start: fertileStart, end: ovulationDay, label: 'Fertile Window' },
      ovulation: { day: ovulationDay, label: 'Ovulation' },
      luteal: { start: ovulationDay + 1, end: total, label: 'Luteal Phase' }
    };
  }, [results, cycleLength]);

  const faqs = [
    { q: "How accurate is an ovulation calculator?", a: "Calendar-based calculators are estimates based on averages. For higher accuracy, we recommend combining this tool with basal body temperature (BBT) tracking or ovulation predictor kits (OPKs)." },
    { q: "What if my cycle length varies?", a: "If your cycle is irregular, use the average length of your last 3-6 cycles. If the variation is more than 7 days, consult a healthcare provider." },
    { q: "Can I get pregnant outside the fertile window?", a: "It is highly unlikely. Sperm can live inside the female reproductive tract for up to 5 days, which is why the window starts before ovulation occurs." }
  ];

  const calculate = () => {
    setError(null);
    
    const dateError = validateDate(date, 'Last period date');
    if (dateError) {
      setError(dateError);
      return;
    }

    const lmpDate = new Date(date);
    const data = calculateOvulation(lmpDate, cycleLength);
    
    setResults({
      ...data,
      bestDays: [
        addDays(data.ovulationDate, -2),
        addDays(data.ovulationDate, -1),
        data.ovulationDate
      ]
    });
  };

  return (
    <CalculatorLayout
      title="Clinical Ovulation & Fertility Window Tracker"
      description="Predict your most fertile days with our free ovulation calculator. Find your fertile window, ovulation date, and next period based on your cycle. Accurate fertility tracking for conception."
      intro="Trying to conceive? Our clinical ovulation calculator helps you identify your most fertile days by analyzing your menstrual cycle. By tracking the first day of your last period and your average cycle length, you can pinpoint the optimal window for conception based on standard obstetric guidelines."
      schema={[
        generateSoftwareAppSchema(
          "Clinical Ovulation & Fertility Window Tracker",
          "Predict your fertile window and ovulation date accurately.",
          "https://femhealth.com/ovulation-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Ovulation Calculator", item: "https://femhealth.com/ovulation-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>This calculator utilizes the standard obstetric calendar method to estimate your ovulation date and fertile window, based on the physiological phases of the menstrual cycle:</p>
          <ul>
            <li><strong>Luteal Phase Assumption:</strong> The luteal phase (the time between ovulation and the start of your next period) is relatively constant for most women, typically lasting 14 days. Therefore, ovulation is estimated by subtracting 14 days from your expected next period date.</li>
            <li><strong>Fertile Window:</strong> Sperm can survive in the female reproductive tract for up to 5 days, while an egg is viable for only 12-24 hours after ovulation. The "fertile window" encompasses the 5 days preceding ovulation and the day of ovulation itself.</li>
            <li><strong>Peak Fertility:</strong> The highest probability of conception occurs when intercourse takes place 1-2 days prior to ovulation, ensuring sperm are present when the egg is released.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Due Date Calculator", path: "/due-date-calculator" },
        { name: "Period Tracker", path: "/period-calculator" },
        { name: "Conception Date Calculator", path: "/conception-date-calculator" }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          <div className="bg-primary text-white p-10 rounded-[3rem] text-center shadow-lg shadow-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
            
            <div className="flex justify-center mb-6 text-white">
              <Sparkles className="w-16 h-16" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary-light mb-2 relative z-10">Estimated Ovulation Date</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white relative z-10">{formatDate(results.ovulationDate)}</h2>
            <p className="text-white/90 mt-4 font-medium flex items-center justify-center gap-2 relative z-10">
              <Heart className="w-4 h-4" />
              Peak Fertility Window
            </p>
          </div>

          {/* Visual Timeline */}
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
            <h3 className="font-bold text-text-dark flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Cycle Phase Timeline
            </h3>
            
            <div className="relative pt-8 pb-4">
              <div className="h-4 w-full bg-neutral-100 rounded-full flex overflow-hidden">
                <div 
                  className="h-full bg-neutral-200" 
                  style={{ width: `${(timelineData!.follicular.end / cycleLength) * 100}%` }}
                />
                <div 
                  className="h-full bg-rose-400" 
                  style={{ width: `${((timelineData!.fertile.end - timelineData!.fertile.start + 1) / cycleLength) * 100}%` }}
                />
                <div 
                  className="h-full bg-primary-light" 
                  style={{ width: `${((timelineData!.luteal.end - timelineData!.luteal.start + 1) / cycleLength) * 100}%` }}
                />
              </div>
              
              {/* Ovulation Marker */}
              <div 
                className="absolute top-0 flex flex-col items-center -translate-x-1/2"
                style={{ left: `${(timelineData!.ovulation.day / cycleLength) * 100}%` }}
              >
                <div className="w-0.5 h-12 bg-primary" />
                <div className="w-3 h-3 bg-primary rounded-full border-2 border-white shadow-sm" />
                <span className="text-[10px] font-bold text-primary mt-1 uppercase tracking-tighter">Ovulation</span>
              </div>

              <div className="flex justify-between mt-4 text-[10px] font-bold text-text-medium uppercase tracking-wider">
                <span>Day 1</span>
                <span>Day {cycleLength}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-neutral-200 rounded-full" />
                <span className="text-[10px] font-bold text-text-medium uppercase">Follicular</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-rose-400 rounded-full" />
                <span className="text-[10px] font-bold text-text-medium uppercase">Fertile</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary-light rounded-full" />
                <span className="text-[10px] font-bold text-text-medium uppercase">Luteal</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4">
              <div className="p-3 bg-accent/10 text-accent rounded-xl shrink-0">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-text-medium font-bold uppercase tracking-wider mb-1">Fertile Window</p>
                <p className="text-xl font-bold text-text-dark">{formatDate(results.fertileStart)} to {formatDate(results.fertileEnd)}</p>
                <p className="text-xs text-text-medium mt-1">High chance of conception</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4">
              <div className="p-3 bg-secondary/10 text-secondary rounded-xl shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-text-medium font-bold uppercase tracking-wider mb-1">Next Period</p>
                <p className="text-xl font-bold text-text-dark">{formatDate(results.nextPeriod)}</p>
                <p className="text-xs text-text-medium mt-1">Expected start date</p>
              </div>
            </div>
          </div>

          <div className="bg-bg-light p-6 rounded-2xl border border-border space-y-4 shadow-sm">
            <h3 className="font-bold text-text-dark flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Peak Fertility Days
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {results.bestDays.map((d: Date, i: number) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-border text-center shadow-sm">
                  <p className="text-[10px] text-text-medium font-bold uppercase tracking-wider mb-1">
                    {i === 0 ? '2 Days Before' : i === 1 ? 'Day Before' : 'Ovulation Day'}
                  </p>
                  <p className="font-bold text-primary">{formatDate(d)}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">How Your Ovulation Date is Calculated</h2>
            <p>
              Our ovulation calculator uses the standard biological model of the menstrual cycle, known as the "Luteal Phase Method," to estimate when your body is most likely to release an egg. Here is a detailed breakdown of the mathematics behind the prediction:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-text-medium">
              <li><strong>The Luteal Phase Constant:</strong> The menstrual cycle is divided into two main phases: the follicular phase (before ovulation) and the luteal phase (after ovulation). While the follicular phase can vary greatly in length from woman to woman, the luteal phase is remarkably consistent, almost always lasting exactly 14 days.</li>
              <li><strong>The Calculation:</strong> To find your estimated ovulation date, the algorithm takes your average cycle length and subtracts 14 days. For example, if you have a standard 28-day cycle, ovulation is estimated on Day 14 (28 - 14 = 14). If you have a longer 32-day cycle, ovulation is estimated on Day 18 (32 - 14 = 18).</li>
              <li><strong>The Fertile Window:</strong> Once the ovulation date is established, the calculator identifies your "fertile window." Because sperm can survive in the female reproductive tract for up to 5 days, and an egg lives for 12-24 hours, your fertile window spans the 5 days leading up to ovulation plus the day of ovulation itself.</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">What Your Results Actually Mean</h2>
            <p>
              The dates provided by the calculator are your highest probability days for conception based on historical averages. Here is how to interpret and use your specific results:
            </p>
            <div className="space-y-6 mt-6">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">The "Best Days to Conceive"</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  While the fertile window is 6 days long, your absolute highest chances of conceiving occur in the 24 to 48 hours immediately preceding ovulation. Having intercourse on the day before ovulation and the day of ovulation ensures that a high concentration of healthy, capacitated sperm is waiting in the fallopian tubes exactly when the egg is released.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">The Fertile Window</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Having intercourse at any point during this 6-day window gives you a chance of pregnancy. If you are actively trying to conceive, medical professionals generally recommend having intercourse every other day throughout this entire window to maximize your chances without causing sperm depletion.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Next Period Estimate</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  This date is calculated by adding your average cycle length to the first day of your last period. If this date passes and your period does not arrive, it is the appropriate time to take a home pregnancy test. Testing earlier than this date can result in false negatives because hCG hormone levels may not yet be high enough to detect.
                </p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-text-dark">Limitations of Calendar Methods</h3>
              <p className="text-sm leading-relaxed text-text-medium">
                It is important to note that this calculator provides a statistical estimate. The human body is not a clock. Stress, illness, travel, extreme exercise, and changes in weight can all delay ovulation, making the follicular phase longer than usual. For this reason, calendar methods should not be used as a primary form of contraception.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-text-dark">Confirming Ovulation</h3>
              <p className="text-sm leading-relaxed text-text-medium">
                To confirm that ovulation is actually happening on the predicted dates, pair this calculator with physical tracking. Ovulation Predictor Kits (OPKs) detect the Luteinizing Hormone (LH) surge that happens 24-36 hours before ovulation. Tracking Basal Body Temperature (BBT) will show a sustained temperature spike the day after ovulation occurs.
              </p>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4 text-center">Expert Tip: When to Test</h3>
            <p className="text-sm text-center max-w-2xl mx-auto leading-relaxed italic text-text-medium">
              "For the most accurate results, we recommend combining this mathematical estimate with physical tracking methods like Ovulation Predictor Kits (OPKs) or monitoring cervical fluid. Every woman's body is unique, and cycles can vary due to stress, diet, or underlying health conditions."
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Tooltip content="Select the first day of your most recent menstrual period." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">First Day of Last Period</label>
            </Tooltip>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Tooltip content="The average number of days between the start of one period and the next (typically 28 days)." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Average Cycle Length</label>
              </Tooltip>
              <span className="text-primary font-bold">{cycleLength} Days</span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="45" 
              value={cycleLength}
              onChange={(e) => setCycleLength(parseInt(e.target.value))}
              className="w-full accent-primary h-2 bg-primary-light rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <Tooltip content="Calculate your peak fertile days and ovulation date based on your cycle data.">
          <button 
            onClick={calculate}
            className="btn-primary w-full text-lg"
          >
            Calculate Fertile Window
          </button>
        </Tooltip>
      </div>
    </CalculatorLayout>
  );
}
