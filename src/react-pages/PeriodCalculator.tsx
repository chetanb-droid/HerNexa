import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { formatDate, addDays, validateDate, validateNumber, generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Calendar, Heart, Activity, Sparkles, AlertCircle, Info, Clock } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function PeriodCalculator() {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodDuration, setPeriodDuration] = useState<number>(5);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const faqs = [
    { q: "How many days is a normal menstrual cycle?", a: "A typical cycle is 28 days, but anything between 21 and 35 days is considered normal for adults. For teens, the range can be wider (21-45 days)." },
    { q: "Why is my period late?", a: "Common reasons for a late period include pregnancy, stress, sudden weight changes, hormonal imbalances (like PCOS), or illness. If you are more than 7 days late, consider taking a pregnancy test." },
    { q: "Can I use this for irregular periods?", a: "Yes, but use your average cycle length over the last 3-6 months. Note that predictions for irregular cycles will have a higher margin of error." },
    { q: "What is considered a 'heavy' period?", a: "A period is considered heavy if you need to change your pad or tampon every 1-2 hours, or if you pass clots larger than a quarter. If this happens, consult a healthcare provider." }
  ];

  const calculate = () => {
    setError(null);
    const dateError = validateDate(date, 'Last period date');
    if (dateError) { setError(dateError); return; }

    const cycleError = validateNumber(cycleLength, 20, 45, 'Cycle length');
    if (cycleError) { setError(cycleError); return; }

    const durationError = validateNumber(periodDuration, 2, 10, 'Period duration');
    if (durationError) { setError(durationError); return; }

    const lmpDate = new Date(date);
    const nextPeriods = [];
    
    for (let i = 1; i <= 6; i++) {
      const start = addDays(lmpDate, cycleLength * i);
      const end = addDays(start, periodDuration - 1);
      const ovulation = addDays(start, -14);
      nextPeriods.push({
        start,
        end,
        ovulation,
        fertileStart: addDays(ovulation, -5),
        fertileEnd: ovulation
      });
    }

    setResults(nextPeriods);
  };

  return (
    <CalculatorLayout
      title="Clinical Period & Cycle Tracker"
      description="Predict your next 6 period dates with our free clinical period calculator. Track your cycle, find your ovulation dates, and plan ahead with accuracy. Essential menstrual health tracking."
      intro={<>Stay ahead of your cycle with our comprehensive clinical period calculator. By entering your last period date, average <a href="/menstrual-cycle-length-calculator" className="text-primary hover:underline font-medium">cycle length</a>, and period duration, you can predict your next six periods, identify your upcoming <a href="/ovulation-calculator" className="text-primary hover:underline font-medium">ovulation dates</a>, and better understand your body's natural rhythm. Accurate tracking is a fundamental aspect of monitoring gynecological health and identifying <a href="/period-symptom-tracker" className="text-primary hover:underline font-medium">menstrual symptoms</a>.</>}
      schema={[
        generateSoftwareAppSchema(
          "Clinical Period & Cycle Tracker",
          "Predict future period dates and fertile windows.",
          "https://hernexa.com/period-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://hernexa.com" },
          { name: "Tools", item: "https://hernexa.com/tools" },
          { name: "Period Calculator", item: "https://hernexa.com/period-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>This clinical tracker uses standard gynecological algorithms to project your future menstrual cycles:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li><strong>Cycle Projection:</strong> We add your average cycle length (the number of days from the first day of one period to the first day of the next) to your last period start date to predict subsequent cycles.</li>
            <li><strong>Menstruation Duration:</strong> We account for your typical bleeding duration to estimate the full window of your next menses.</li>
            <li><strong>Luteal Phase & Ovulation:</strong> Based on the standard medical assumption of a 14-day luteal phase, ovulation is estimated to occur 14 days prior to the onset of your next predicted period.</li>
            <li><strong>Fertile Window:</strong> This is calculated as the 5 days preceding ovulation plus the day of ovulation itself, representing the maximum lifespan of sperm in the reproductive tract and the viability of the egg.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Ovulation Calculator", path: "/ovulation-calculator" },
        { name: "Due Date Calculator", path: "/due-date-calculator" },
        { name: "Cervical Mucus Tracker", path: "/cervical-mucus-tracker" }
      ]}
      medicalReferences={[
        {
          title: "Your Menstrual Cycle",
          url: "https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle",
          source: "WomensHealth.gov"
        },
        {
          title: "Normal Menstruation",
          url: "https://www.acog.org/womens-health/faqs/normal-menstruation",
          source: "ACOG"
        },
        {
          title: "Menstrual cycle: What's normal, what's not",
          url: "https://www.mayoclinic.org/healthy-lifestyle/womens-health/in-depth/menstrual-cycle/art-20047186",
          source: "Mayo Clinic"
        },
        {
          title: "Periods and Fertility",
          url: "https://www.nhs.uk/conditions/periods/fertility-in-the-menstrual-cycle/",
          source: "NHS"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-primary text-white p-10 rounded-[3rem] text-center shadow-lg shadow-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
            
            <div className="flex justify-center mb-6 text-white">
              <Calendar className="w-16 h-16" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary-light mb-2 relative z-10">Next Expected Period</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white relative z-10">{formatDate(results[0].start)}</h2>
            <p className="text-white/90 mt-4 font-medium flex items-center justify-center gap-2 relative z-10">
              <Clock className="w-4 h-4" />
              Estimated to last until {formatDate(results[0].end)}
            </p>
          </div>

          <h3 className="text-2xl font-serif font-bold text-text-dark border-b border-border pb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            6-Cycle Clinical Projection
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((period: any, i: number) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-border space-y-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">Cycle {i + 1}</span>
                  {i === 0 && <span className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1"><Sparkles className="w-3 h-3"/> Next</span>}
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-text-medium font-bold uppercase tracking-wider">Period Window</p>
                  <p className="text-xl font-bold text-text-dark">
                    {formatDate(period.start).split(',')[1]} - {formatDate(period.end).split(',')[1]}
                  </p>
                </div>
                <div className="pt-4 border-t border-neutral-50 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-text-medium font-bold uppercase tracking-wider mb-1">Fertile Window</p>
                    <p className="text-sm font-bold text-accent">{formatDate(period.fertileStart).split(',')[1]} - {formatDate(period.fertileEnd).split(',')[1]}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-text-medium font-bold uppercase tracking-wider mb-1">Ovulation</p>
                    <p className="text-sm font-bold text-success">{formatDate(period.ovulation).split(',')[1]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-6 bg-primary-light/20 rounded-2xl border border-primary-light flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-primary shrink-0 mt-1" />
            <div className="space-y-1">
              <p className="font-bold text-text-dark">Clinical Insight: Cycle Variability</p>
              <p className="text-sm text-text-medium leading-relaxed">
                While this calculator provides a mathematical projection, it is normal for cycles to vary by a few days. Factors such as stress, illness, travel, and significant weight changes can temporarily alter your cycle length.
              </p>
            </div>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Ovulation Calculator.</p>
            </div>
            <a href="/ovulation-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Ovulation Calculator &rarr;
            </a>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">The Clinical Science of Cycle Prediction</h2>
            <p>
              Our clinical period calculator utilizes the standard "Calendar Method" to project your menstrual cycle. This predictive model relies on the historical data you provide to establish a baseline rhythm. Here is exactly how the algorithm computes your dates based on the physiological phases of the menstrual cycle:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-text-dark flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  The Follicular Phase
                </h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  This phase begins on Day 1 of menstruation and concludes at ovulation. It is the most variable portion of the cycle. During this time, rising estrogen levels stimulate the thickening of the uterine lining (endometrium) and the maturation of an ovarian follicle.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-text-dark flex items-center gap-2">
                  <Activity className="w-5 h-5 text-accent" />
                  The Luteal Phase
                </h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Occurring post-ovulation and lasting until the onset of the next menses, the luteal phase is remarkably consistent across individuals, typically lasting 14 days. This physiological constant allows us to estimate ovulation by subtracting 14 days from the projected start of the next cycle.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Interpreting Your Clinical Results</h2>
            <p>
              The dates generated by the calculator serve as a roadmap for your upcoming hormonal fluctuations. Here is how to interpret and utilize this clinical data:
            </p>
            <div className="space-y-6 mt-6">
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Menstruation Onset (Day 1)</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  This date marks the beginning of the menstrual phase. Hormonally, estrogen and progesterone are at their nadir. This is often accompanied by lower energy levels and potential dysmenorrhea (cramps), making it an ideal time to plan for rest.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">The Fertile Window</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  This 6-day range is critical for family planning. It encompasses the lifespan of sperm within the female reproductive tract (up to 5 days) and the viability of the ovum (12-24 hours). Note: The calendar method is not a reliable form of contraception on its own.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Estimated Ovulation</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  This is the estimated peak of your cycle when an egg is released from the ovary. Hormonally, this is preceded by a surge in Luteinizing Hormone (LH) and peak estrogen levels.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10 text-center space-y-4">
            <h3 className="text-xl font-serif font-bold text-text-dark">Expert Insight: The "Fifth Vital Sign"</h3>
            <p className="text-sm leading-relaxed max-w-2xl mx-auto italic text-text-medium">
              "Medical professionals increasingly view the menstrual cycle as a 'fifth vital sign.' A consistently regular cycle is a strong indicator of overall hormonal balance and health. By tracking these predicted dates against your actual experience, you create a valuable health record that can help your doctor identify issues like PCOS or thyroid imbalances much earlier."
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <Tooltip content="The first day of your most recent period." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Last Period Start</label>
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
              <Tooltip content="The average number of days between the start of one period and the next." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Cycle Length</label>
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

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Tooltip content="How many days your period usually lasts." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Period Duration</label>
              </Tooltip>
              <span className="text-primary font-bold">{periodDuration} Days</span>
            </div>
            <input 
              type="range" 
              min="2" 
              max="10" 
              value={periodDuration}
              onChange={(e) => setPeriodDuration(parseInt(e.target.value))}
              className="w-full accent-primary h-2 bg-primary-light rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <button 
          onClick={calculate}
          className="btn-primary w-full text-lg"
        >
          Predict My Periods
        </button>
      </div>
    </CalculatorLayout>
  );
}
