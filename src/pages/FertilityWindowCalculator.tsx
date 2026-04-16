import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema, formatDate, addDays, subDays, validateDate, validateNumber } from '../lib/calculators';
import { Calendar, Heart, ArrowRight, Info, Sparkles, Activity, AlertCircle, CheckCircle2, TrendingUp, Clock, Zap } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function FertilityWindowCalculator() {
  const [lmp, setLmp] = useState<string>(new Date().toISOString().split('T')[0]);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [lutealPhase, setLutealPhase] = useState<number>(14);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const faqs = [
    { q: "What is the fertile window?", a: "The fertile window is the 6-day period ending on the day of ovulation. It is the only time during your menstrual cycle when intercourse can result in pregnancy." },
    { q: "Why is the fertile window 6 days long?", a: "Sperm can survive inside the female reproductive tract for up to 5 days, and the egg survives for about 24 hours after ovulation. Therefore, intercourse up to 5 days before ovulation can lead to conception." },
    { q: "When is the best time to have intercourse to get pregnant?", a: "The highest probability of conception occurs when intercourse takes place 1 to 2 days prior to ovulation." },
    { q: "How accurate is this calculator if my cycles are irregular?", a: "If your cycles vary by more than a few days, calendar-based calculators are less accurate. We recommend using ovulation predictor kits (OPKs) or tracking basal body temperature (BBT) alongside this tool." }
  ];

  const calculate = () => {
    setError(null);
    
    const dateError = validateDate(lmp, 'Last period date');
    if (dateError) { setError(dateError); return; }

    const cycleError = validateNumber(cycleLength, 20, 45, 'Cycle length');
    if (cycleError) { setError(cycleError); return; }

    const lutealError = validateNumber(lutealPhase, 10, 20, 'Luteal phase');
    if (lutealError) { setError(lutealError); return; }

    const lmpDate = new Date(lmp);
    
    const daysToOvulation = cycleLength - lutealPhase;
    const ovulationDate = addDays(lmpDate, daysToOvulation);
    
    const fertileStart = subDays(ovulationDate, 5);
    const fertileEnd = ovulationDate;
    
    const nextPeriod = addDays(lmpDate, cycleLength);

    setResults({
      ovulationDate,
      fertileStart,
      fertileEnd,
      nextPeriod,
      peakDays: [subDays(ovulationDate, 1), ovulationDate],
      highDays: [subDays(ovulationDate, 3), subDays(ovulationDate, 2)],
      lowDays: [subDays(ovulationDate, 5), subDays(ovulationDate, 4)]
    });
  };

  return (
    <CalculatorLayout
      title="Fertile Window Calculator | Pregnancy Probability Calculator Calendar"
      description="Use our fertile window calculator to view your pregnancy probability calculator calendar. Find your conception window and what are your chances of getting pregnant."
      intro={<>Timing is everything when trying to conceive. Our <strong>fertile window calculator</strong> pinpoints your most fertile days based on your menstrual cycle, helping you identify the exact 6-day <strong>conception window</strong> when pregnancy is possible. By adjusting for your specific <Link to="/menstrual-cycle-length-calculator" className="text-primary hover:underline font-medium">cycle length</Link> and luteal phase, we provide a more personalized estimate than standard <strong>fertility calculator</strong> tools. If you've been wondering, "<strong>what are my chances of getting pregnant calculator</strong>," this tool will give you clear insights.</>}
      schema={[
        generateSoftwareAppSchema(
          "Fertility Window Calculator",
          "Calculate the 6-day fertile window for conception.",
          "https://femhealth.com/fertility-window-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Fertility Window Calculator", item: "https://femhealth.com/fertility-window-calculator" }
        ])
      ]}
      howItWorks={
        <div className="space-y-4">
          <p>This calculator uses advanced calendar logic to determine your fertile window:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Luteal Phase Adjustment:</strong> While the average luteal phase is 14 days, it can range from 10 to 16 days. We allow you to input your specific length for better accuracy.</li>
            <li><strong>Sperm Longevity:</strong> We account for the fact that healthy sperm can survive for up to 5 days in fertile cervical mucus.</li>
            <li><strong>Egg Viability:</strong> We include the 12-24 hour window after ovulation when the egg is viable for fertilization.</li>
          </ul>
        </div>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Ovulation Calculator", path: "/ovulation-calculator" },
        { name: "Time to Conceive", path: "/time-to-conceive-calculator" },
        { name: "Conception Calculator", path: "/conception-calculator" }
      ]}
      medicalReferences={[
        {
          title: "The Fertile Window",
          url: "https://www.asrm.org/practice-guidance/practice-committee-documents/optimizing-natural-fertility-a-committee-opinion-2021/",
          source: "ASRM"
        },
        {
          title: "Fertility Awareness-Based Methods",
          url: "https://www.acog.org/womens-health/faqs/fertility-awareness-based-methods-of-family-planning",
          source: "ACOG"
        },
        {
          title: "Natural Family Planning",
          url: "https://www.nhs.uk/conditions/contraception/natural-family-planning/",
          source: "NHS"
        },
        {
          title: "Fertile window",
          url: "https://en.wikipedia.org/wiki/Fertile_window",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-rose-50 p-10 rounded-[2.5rem] border border-rose-100 text-center shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10"><Heart className="w-32 h-32 fill-current text-rose-500" /></div>
            <div className="flex justify-center mb-4 text-rose-500"><Zap className="w-12 h-12 fill-current" /></div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-800 mb-3">Your Most Fertile Window</p>
            <div className="flex items-center justify-center gap-4 text-3xl md:text-5xl font-serif font-bold text-rose-950">
              <span>{formatDate(results.fertileStart)}</span>
              <ArrowRight className="w-6 h-6 text-rose-400" />
              <span>{formatDate(results.fertileEnd)}</span>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> Peak: {formatDate(results.peakDays[0])} - {formatDate(results.peakDays[1])}
              </span>
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-3 h-3" /> High: {formatDate(results.highDays[0])} - {formatDate(results.highDays[1])}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-neutral-100 flex items-center gap-5 shadow-sm">
              <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl"><Activity className="w-7 h-7" /></div>
              <div>
                <p className="text-xs text-neutral-500 uppercase font-bold tracking-widest mb-1">Estimated Ovulation</p>
                <p className="font-serif font-bold text-neutral-900 text-2xl">{formatDate(results.ovulationDate)}</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-neutral-100 flex items-center gap-5 shadow-sm">
              <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl"><Calendar className="w-7 h-7" /></div>
              <div>
                <p className="text-xs text-neutral-500 uppercase font-bold tracking-widest mb-1">Next Expected Period</p>
                <p className="font-serif font-bold text-neutral-900 text-2xl">{formatDate(results.nextPeriod)}</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-primary-light/20 border border-primary/10 rounded-2xl flex items-start gap-4">
            <Info className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-text-dark leading-relaxed font-medium">
              For the best chance of conception, aim for intercourse at least every other day during your <strong>Peak</strong> and <strong>High</strong> fertility days.
            </p>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Ovulation Calculator.</p>
            </div>
            <Link to="/ovulation-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Ovulation Calculator &rarr;
            </Link>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-16">
          <section className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-4xl font-serif font-bold text-text-dark">Understanding the Fertile Window</h2>
              <p className="text-text-medium">The "fertile window" refers to the specific days in a woman's menstrual cycle when pregnancy is biologically possible.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-text-dark">Sperm Survival</h3>
                <p className="text-sm text-text-medium leading-relaxed">
                  Sperm can live for up to 5 days inside the uterus and fallopian tubes if fertile cervical mucus is present. This is why you can get pregnant even if you have sex days before ovulation.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-text-dark">Egg Lifespan</h3>
                <p className="text-sm text-text-medium leading-relaxed">
                  Once released, an egg only lives for about 12 to 24 hours. If it isn't fertilized in this time, it begins to dissolve and the fertile window closes for that cycle.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm space-y-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-text-dark">The Intersection</h3>
                <p className="text-sm text-text-medium leading-relaxed">
                  Pregnancy happens when live sperm are already present in the fallopian tubes at the moment of ovulation, or arrive shortly after the egg is released.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-serif font-bold text-text-dark text-center">How to Pinpoint Your Window</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-text-medium leading-relaxed">
                  While calendar calculators are a great starting point, combining them with physical signs of fertility provides the most accurate results.
                </p>
                <ul className="space-y-4">
                  {[
                    { title: "Cervical Mucus", desc: "Look for 'egg-white' consistency—clear, stretchy, and slippery." },
                    { title: "Basal Body Temperature", desc: "A slight rise in resting temperature confirms ovulation has occurred." },
                    { title: "Ovulation Kits (OPKs)", desc: "These detect the LH surge that happens 24-48 hours before ovulation." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-text-dark">{item.title}</h4>
                        <p className="text-sm text-text-medium">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-bg-light p-10 rounded-[2.5rem] border border-primary/5 space-y-6">
                <h4 className="text-xl font-serif font-bold text-text-dark">The "Peak" Days</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  The two days leading up to ovulation and the day of ovulation itself are your "peak" days. If you only have intercourse once, these are the days to aim for to maximize your chances.
                </p>
                <div className="p-6 bg-white rounded-2xl border border-primary/10">
                  <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Conception Probability</p>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>2 days before ovulation</span>
                      <span className="font-bold">~30%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>1 day before ovulation</span>
                      <span className="font-bold">~33%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Day of ovulation</span>
                      <span className="font-bold">~15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary-light/30 p-12 rounded-[3rem] border border-primary/10">
            <div className="max-w-3xl mx-auto space-y-6 text-center">
              <h3 className="text-2xl font-serif font-bold text-text-dark">Expert Insight: The Luteal Phase</h3>
              <p className="text-text-medium leading-relaxed italic">
                "Most women assume they ovulate on Day 14, but that's only true for a perfect 28-day cycle. Your ovulation is actually determined by your luteal phase—the time between ovulation and your next period. If you know your luteal phase is 12 days, you'll ovulate 12 days before your period, regardless of how long your total cycle is. Tracking this can be a game-changer for timing."
              </p>
            </div>
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

        <div className="bg-white p-8 rounded-3xl border border-primary-light space-y-8 shadow-sm">
          <div className="space-y-3">
            <Tooltip content="The first day of your most recent period." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Last Period Start Date</label>
            </Tooltip>
            <input 
              type="date" 
              value={lmp} 
              onChange={(e) => setLmp(e.target.value)} 
              className="input-field" 
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Tooltip content="The average number of days from the start of one period to the start of the next." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Average Cycle Length</label>
              </Tooltip>
              <span className="text-primary font-bold">{cycleLength} Days</span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="45" 
              value={cycleLength} 
              onChange={(e) => setCycleLength(Number(e.target.value))} 
              className="w-full accent-primary h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer" 
            />
            <div className="flex justify-between text-[10px] text-text-medium font-bold uppercase tracking-wider">
              <span>Short (20d)</span>
              <span>Average (28d)</span>
              <span>Long (45d)</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Tooltip content="The number of days between ovulation and your next period. Default is 14." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Luteal Phase Length</label>
              </Tooltip>
              <span className="text-primary font-bold">{lutealPhase} Days</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="20" 
              value={lutealPhase} 
              onChange={(e) => setLutealPhase(Number(e.target.value))} 
              className="w-full accent-primary h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer" 
            />
            <div className="flex justify-between text-[10px] text-text-medium font-bold uppercase tracking-wider">
              <span>Short (10d)</span>
              <span>Average (14d)</span>
              <span>Long (20d)</span>
            </div>
          </div>
        </div>

        <button 
          onClick={calculate} 
          className="btn-primary w-full py-5 text-xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
        >
          <Zap className="w-6 h-6" />
          Calculate My Fertile Window
        </button>
      </div>
    </CalculatorLayout>
  );
}
