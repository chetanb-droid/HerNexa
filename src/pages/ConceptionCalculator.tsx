import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema, formatDate, subDays, addDays, validateDate, validateNumber } from '../lib/calculators';
import { Heart, Calendar, ArrowRight, Info, Sparkles, Activity, AlertCircle, Dna } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function ConceptionCalculator() {
  const [calculationMethod, setCalculationMethod] = useState<'dueDate' | 'lmp'>('dueDate');
  const [inputDate, setInputDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const faqs = [
    { q: "How clinically accurate is a conception calculator?", a: "It provides a highly educated estimate based on standard physiological models. Because spermatozoa can remain viable in the female reproductive tract for up to 5 days, and the exact moment of ovulation can vary slightly even in regular cycles, conception usually occurs within a 5-7 day biological window rather than on one exact, predictable day." },
    { q: "Is the conception date the same as the date of intercourse?", a: "Not necessarily. If coitus occurred on a Monday, but ovulation (release of the ovum) did not occur until Thursday, the actual date of conception (fertilization) would be Thursday, utilizing viable sperm from the earlier intercourse." },
    { q: "Can a dating ultrasound change my estimated conception date?", a: "Yes. Early first-trimester ultrasounds (specifically measuring the Crown-Rump Length or CRL between 7-12 weeks) are the clinical gold standard for determining gestational age. This measurement can shift your estimated conception date by a few days compared to calculations based solely on LMP." },
    { q: "What if I have irregular menstrual cycles?", a: "If your cycles are irregular (e.g., due to PCOS or other factors), calculating by your estimated due date (EDD) derived from an early ultrasound is the most clinically accurate method to retrospectively determine your conception window." },
    { q: "Is there a how to conceive a baby girl naturally calculator?", a: "While many look for a 'how to conceive a baby girl naturally calculator', there is no medically guaranteed way to select gender at home. Some methods, like the Shettles method, suggest having intercourse 2-4 days before ovulation to conceive a girl, theorizing that male-producing sperm die off faster than female-producing sperm. However, scientific evidence on its effectiveness is mixed." }
  ];

  const calculate = () => {
    setError(null);
    
    const dateError = validateDate(inputDate, calculationMethod === 'dueDate' ? 'Due date' : 'Last menstrual period date');
    if (dateError) { setError(dateError); return; }

    const dateObj = new Date(inputDate);
    let estimatedConceptionDate;
    
    if (calculationMethod === 'dueDate') {
      // Due date is typically 266 days after conception (280 days - 14 days of follicular phase)
      estimatedConceptionDate = subDays(dateObj, 266);
    } else {
      const cycleError = validateNumber(cycleLength, 20, 45, 'Cycle length');
      if (cycleError) { setError(cycleError); return; }
      
      // Ovulation typically occurs 14 days before the NEXT period (luteal phase is relatively constant).
      const daysToOvulation = cycleLength - 14;
      estimatedConceptionDate = addDays(dateObj, daysToOvulation);
    }

    // Sperm can live up to 5 days before ovulation, and the egg lives for 12-24 hours after.
    const intercourseWindowStart = subDays(estimatedConceptionDate, 5);
    const intercourseWindowEnd = addDays(estimatedConceptionDate, 1);

    setResults({
      conceptionDate: estimatedConceptionDate,
      windowStart: intercourseWindowStart,
      windowEnd: intercourseWindowEnd,
      gestationalAge: calculationMethod === 'dueDate' ? 38 : 2 // approximate weeks at conception
    });
  };

  return (
    <CalculatorLayout
      title="Conception Calculator | When to Have Sex to Conceive"
      description="Use our clinical conception calculator to understand your biological fertile window. Find out when to have sex to conceive calculator estimates and learn how to conceive a baby girl naturally calculator tools evaluate gender selection myths."
      intro={<>Determining the exact date of conception is a common question for expectant parents. While it's difficult to pinpoint the exact minute, this clinical calculator works backwards from your Estimated <Link to="/due-date-calculator" className="text-primary hover:underline font-medium">Due Date</Link> (EDD) or Last Menstrual Period (LMP) to identify the most probable window of fertilization, providing insight into the very beginning of embryonic development. Understanding your <Link to="/ovulation-calculator" className="text-primary hover:underline font-medium">ovulation cycle</Link> is key to this calculation. If you are still trying to get pregnant, you can also use this as a <strong>when to have sex to conceive calculator</strong> to plan ahead. Note that our tool does not serve as a <strong>how to conceive a baby girl naturally calculator</strong>, as intercourse timing methods for gender selection are not scientifically validated.</>}
      schema={[
        generateSoftwareAppSchema(
          "Clinical Conception Calculator",
          "Calculate estimated conception dates and biological fertile windows.",
          "https://femhealth.com/conception-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Conception Calculator", item: "https://femhealth.com/conception-calculator" }
        ])
      ]}
      howItWorks={
        <div className="space-y-4">
          <p>Conception (fertilization) occurs when a spermatozoon successfully penetrates an ovum. We calculate this using two primary clinical models:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>From Estimated Due Date (EDD):</strong> A standard term pregnancy lasts 280 days from the LMP, or 266 days from conception. We subtract exactly 266 days from your ultrasound-confirmed or calculated due date to find the probable fertilization moment.</li>
            <li><strong>From Last Menstrual Period (LMP):</strong> If you know your average <Link to="/menstrual-cycle-length-calculator" className="text-primary hover:underline font-medium">cycle length</Link>, we estimate your ovulation day (typically 14 days before the onset of the next menses, as the luteal phase is relatively constant). Conception almost always occurs within 12-24 hours of ovulation.</li>
            <li><strong>The Biological Fertile Window:</strong> Spermatozoa can remain viable in the cervical mucus and upper reproductive tract for up to 5 days. Therefore, intercourse leading to conception could have occurred up to 5 days prior to the actual date of fertilization.</li>
          </ul>
        </div>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Due Date Calculator", path: "/due-date-calculator" },
        { name: "Ovulation Calculator", path: "/ovulation-calculator" },
        { name: "Pregnancy Week Calculator", path: "/pregnancy-week-calculator" }
      ]}
      medicalReferences={[
        {
          title: "Conception: How it Works",
          url: "https://www.mayoclinic.org/healthy-lifestyle/getting-pregnant/in-depth/pregnancy/art-20047524",
          source: "Mayo Clinic"
        },
        {
          title: "How Pregnancy Happens",
          url: "https://www.acog.org/womens-health/faqs/how-your-fetus-grows-during-pregnancy",
          source: "ACOG"
        },
        {
          title: "Conception and Early Pregnancy",
          url: "https://www.nhs.uk/pregnancy/trying-for-a-baby/how-to-get-pregnant/",
          source: "NHS"
        },
        {
          title: "Fertilization",
          url: "https://my.clevelandclinic.org/health/articles/11585-conception",
          source: "Cleveland Clinic"
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
            
            <div className="flex justify-center mb-6 relative z-10">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Dna className="w-10 h-10 text-white" />
              </div>
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-rose-100 mb-2 relative z-10">Estimated Conception Date</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white relative z-10">{formatDate(results.conceptionDate)}</h2>
            <p className="text-rose-50 mt-4 font-medium flex items-center justify-center gap-2 relative z-10">
              <Sparkles className="w-4 h-4" />
              The beginning of embryonic development
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-amber-600 font-bold uppercase tracking-wider text-xs">
              <Activity className="w-4 h-4" />
              Intercourse Window
            </div>
            <p className="text-sm text-neutral-500 max-w-md mx-auto">
              Because sperm can survive for up to 5 days, the intercourse that led to this pregnancy likely happened between:
            </p>
            <div className="flex items-center justify-center gap-4 text-2xl font-bold text-neutral-900">
              <span>{formatDate(results.windowStart)}</span>
              <ArrowRight className="w-5 h-5 text-rose-400" />
              <span>{formatDate(results.windowEnd)}</span>
            </div>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Due Date Calculator.</p>
            </div>
            <Link to="/due-date-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Due Date Calculator &rarr;
            </Link>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">The Biology of Conception Dating</h2>
            <p>
              Determining the exact date of conception involves understanding the interplay between the ovarian cycle and sperm viability. While many assume conception occurs on the day of coitus, it is frequently delayed. Here is the clinical breakdown:
            </p>
            <div className="space-y-6 mt-6">
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">1. The Ovulation Window</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Fertilization can only occur during a brief window—approximately 12 to 24 hours after an ovum is released from the ovary. In a typical cycle, the luteal phase (post-ovulation) is relatively constant at 14 days. Therefore, we estimate ovulation by subtracting 14 days from the anticipated onset of the next menses.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">2. Spermatozoan Viability</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  While the ovum has a short lifespan, spermatozoa are highly resilient within the favorable environment of fertile cervical mucus. They can remain viable in the female reproductive tract for up to 5 days. Thus, intercourse occurring up to 5 days prior to ovulation can result in conception on the day of ovulation.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">3. Gestational vs. Embryonic Age</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Obstetricians date pregnancy from the first day of the Last Menstrual Period (Gestational Age), which adds approximately two weeks to the embryo's actual age (Embryonic or Fetal Age). This calculator determines the true Embryonic Age by pinpointing the fertilization event.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Clinical Relevance of the Conception Date</h2>
            <p>
              While standard obstetric care relies on the Estimated Due Date (EDD), understanding the conception window has specific clinical and personal utility:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-text-medium">
              <li><strong>Embryological Tracking:</strong> It provides a precise timeline for embryogenesis and fetal development milestones.</li>
              <li><strong>Paternity Determination:</strong> In cases requiring paternity clarification, the biological conception window provides the necessary timeframe for identifying potential conception events.</li>
              <li><strong>Symptom Correlation:</strong> It allows for the accurate correlation of early pregnancy symptoms (e.g., implantation bleeding, which typically occurs 6-12 days post-conception) with physiological events.</li>
            </ul>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4 text-center">Clinical Standard: The Dating Ultrasound</h3>
            <p className="text-sm text-center max-w-2xl mx-auto leading-relaxed italic text-text-medium">
              "If menstrual dating and ultrasound dating are discordant, the ultrasound is the clinical gold standard. During the first trimester, embryonic growth is highly uniform. A Crown-Rump Length (CRL) measurement taken between 7 and 12 weeks provides the most accurate determination of gestational age and, retrospectively, the conception date."
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

        <div className="flex p-1 bg-neutral-100 rounded-2xl">
          <button
            onClick={() => { setCalculationMethod('dueDate'); setResults(null); }}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${calculationMethod === 'dueDate' ? 'bg-white text-rose-600 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            By Estimated Due Date
          </button>
          <button
            onClick={() => { setCalculationMethod('lmp'); setResults(null); }}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${calculationMethod === 'lmp' ? 'bg-white text-rose-600 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            By Last Menstrual Period
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Tooltip content="Select the date based on your chosen method." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">
                {calculationMethod === 'dueDate' ? 'Estimated Due Date' : 'First Day of Last Period'}
              </label>
            </Tooltip>
            <input 
              type="date" 
              value={inputDate} 
              onChange={(e) => setInputDate(e.target.value)} 
              className="input-field" 
            />
          </div>

          {calculationMethod === 'lmp' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Tooltip content="The average number of days in your cycle." showIcon>
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
                className="w-full accent-primary h-2 bg-primary-light rounded-lg appearance-none cursor-pointer" 
              />
            </div>
          )}
        </div>

        <button onClick={calculate} className="btn-primary w-full text-lg">
          Calculate Conception Date
        </button>
      </div>
    </CalculatorLayout>
  );
}
