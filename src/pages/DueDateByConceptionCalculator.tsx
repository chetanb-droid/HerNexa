import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Calendar, Baby, ArrowRight, Activity, Info, Sparkles } from 'lucide-react';
import { format, addDays, parseISO } from 'date-fns';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function DueDateByConceptionCalculator() {
  const [conceptionDate, setConceptionDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [results, setResults] = useState<any>(null);

  const faqs = [
    { q: "Is calculating the due date by conception more clinically accurate?", a: "Yes, significantly. If the exact date of conception (or ovulation) is known—such as through Intrauterine Insemination (IUI), In Vitro Fertilization (IVF), or meticulous basal body temperature (BBT) tracking—calculating from that specific date is far more accurate than relying on the Last Menstrual Period (LMP) method. The LMP method inherently assumes a standard 28-day cycle with ovulation occurring exactly on day 14, which is not the physiological reality for many women." },
    { q: "How many days does human gestation last from conception?", a: "A standard human pregnancy is clinically defined as lasting approximately 266 days (38 weeks) from the exact moment of fertilization (conception)." },
    { q: "Why do obstetricians typically use LMP instead of the conception date?", a: "Historically, and practically, most women do not know their exact date of ovulation or conception, but they can usually recall the first day of their last menstrual period. Therefore, the medical standard convention is to date pregnancy from the LMP (280 days or 40 weeks), which includes the approximately two weeks of the follicular phase prior to conception." },
    { q: "How does this affect my gestational age?", a: "Gestational age is always calculated as Fetal Age (time since conception) plus two weeks. Even if you know your conception date, your doctor will still refer to your pregnancy in standard gestational weeks (e.g., adding two weeks to your conception date to determine your 'clinical' weeks pregnant)." }
  ];

  const calculate = () => {
    if (!conceptionDate) return;

    const dateObj = parseISO(conceptionDate);
    
    // Due date is 266 days from conception (38 weeks of fetal development)
    const dueDate = addDays(dateObj, 266);
    
    // First trimester ends at 13 weeks 6 days gestational (97 days from LMP, or 83 days from conception)
    const firstTrimesterEnd = addDays(dateObj, 83);
    
    // Second trimester ends at 27 weeks 6 days gestational (195 days from LMP, or 181 days from conception)
    const secondTrimesterEnd = addDays(dateObj, 181);

    setResults({
      dueDate: format(dueDate, 'MMMM d, yyyy'),
      firstTrimesterEnd: format(firstTrimesterEnd, 'MMM d, yyyy'),
      secondTrimesterEnd: format(secondTrimesterEnd, 'MMM d, yyyy')
    });
  };

  return (
    <CalculatorLayout
      title="Clinical Due Date by Conception Calculator"
      description="Calculate your highly accurate pregnancy due date based on a known date of conception, ovulation, IUI, or IVF transfer."
      intro={<>For women who have meticulously tracked their ovulation, undergone Intrauterine Insemination (IUI), or had an In Vitro Fertilization (IVF) transfer, the standard Last Menstrual Period (LMP) calculation can be inaccurate. This clinical calculator bypasses the assumptions of the LMP method, utilizing your exact conception date to provide a highly precise Estimated Due Date (EDD) and trimester timeline.</>}
      schema={[
        generateSoftwareAppSchema(
          "Clinical Due Date by Conception Calculator",
          "Calculate precise due dates from an exact conception or ovulation date.",
          "https://femhealth.com/due-date-by-conception"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Due Date by Conception", item: "https://femhealth.com/due-date-by-conception" }
        ])
      ]}
      howItWorks={
        <div className="space-y-4">
          <p>The standard obstetric calculation for an Estimated Due Date (EDD) adds 280 days (40 weeks) to the first day of the Last Menstrual Period (LMP). However, this method relies on the assumption of a perfect 28-day cycle with ovulation occurring precisely on day 14.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>The Embryological Reality:</strong> Human gestation (fetal development) typically lasts 266 days (38 weeks) from the actual moment of fertilization.</li>
            <li><strong>The Calculation:</strong> By utilizing a known conception date, we eliminate the variability of the follicular phase (the time before ovulation). We simply add exactly 266 days to your known conception date to determine the EDD.</li>
            <li><strong>Clinical Superiority:</strong> For women with irregular cycles, PCOS, or those utilizing Assisted Reproductive Technology (ART), this method provides a significantly more accurate timeline than the LMP method, preventing unnecessary medical interventions for presumed 'post-term' pregnancies.</li>
          </ul>
        </div>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Conception Calculator", path: "/conception-calculator" },
        { name: "Pregnancy Week Calculator", path: "/pregnancy-week-calculator" },
        { name: "IVF Success Rate Calculator", path: "/ivf-success-rate-calculator" }
      ]}
      medicalReferences={[
        {
          title: "Methods for Estimating the Due Date",
          url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date",
          source: "ACOG"
        },
        {
          title: "Calculating Your Due Date",
          url: "https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/due-date-calculator/art-20048514",
          source: "Mayo Clinic"
        },
        {
          title: "Your Pregnancy Due Date",
          url: "https://www.nhs.uk/pregnancy/finding-out/your-due-date/",
          source: "NHS"
        },
        {
          title: "Gestational age",
          url: "https://en.wikipedia.org/wiki/Gestational_age",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-rose-500 p-10 rounded-[3rem] border border-rose-600 text-center shadow-lg shadow-rose-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
            
            <div className="flex justify-center mb-6 relative z-10">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Baby className="w-10 h-10 text-white" />
              </div>
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-rose-100 mb-2 relative z-10">Estimated Due Date (EDD)</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white relative z-10">{results.dueDate}</h2>
            <p className="text-rose-50 mt-4 font-medium flex items-center justify-center gap-2 relative z-10">
              <Sparkles className="w-4 h-4" />
              Based on a 266-day gestation period
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-border flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl"><Calendar className="w-6 h-6" /></div>
              <div>
                <p className="text-xs text-text-medium uppercase font-bold tracking-wider mb-1">End of 1st Trimester</p>
                <p className="font-bold text-text-dark text-xl">{results.firstTrimesterEnd}</p>
                <p className="text-xs text-text-medium mt-1">13 Weeks, 6 Days</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-border flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><Activity className="w-6 h-6" /></div>
              <div>
                <p className="text-xs text-text-medium uppercase font-bold tracking-wider mb-1">End of 2nd Trimester</p>
                <p className="font-bold text-text-dark text-xl">{results.secondTrimesterEnd}</p>
                <p className="text-xs text-text-medium mt-1">27 Weeks, 6 Days</p>
              </div>
            </div>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Conception Calculator.</p>
            </div>
            <Link to="/conception-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Conception Calculator &rarr;
            </Link>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">The Clinical Advantage of Conception Dating</h2>
            <p>
              While the Last Menstrual Period (LMP) is the standard metric used in obstetrics, it is fundamentally an approximation. The LMP method assumes a perfectly regular 28-day menstrual cycle with ovulation occurring exactly on day 14. For many women, this is not the physiological reality.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">The Problem with LMP</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  If a woman has a 35-day cycle, she likely ovulates around day 21. If her due date is calculated using LMP, the resulting EDD will be a full week earlier than the actual biological due date. This can lead to unnecessary concerns about fetal growth or premature inductions for "post-term" pregnancies.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">The Precision of Conception Dating</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  By utilizing the exact date of conception (or ovulation), we bypass the variability of the follicular phase (the first half of the menstrual cycle). We calculate based solely on the actual duration of embryonic and fetal development, which is remarkably consistent at approximately 266 days.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">When is this Calculator Most Useful?</h2>
            <ul className="list-disc pl-6 space-y-3 text-text-medium">
              <li><strong>Assisted Reproductive Technology (ART):</strong> For patients undergoing Intrauterine Insemination (IUI), the exact date of fertilization is known. (Note: For IVF, calculations must adjust for the age of the embryo at transfer—e.g., a 3-day or 5-day blastocyst).</li>
              <li><strong>Meticulous Cycle Tracking:</strong> Women who track Basal Body Temperature (BBT) or use Ovulation Predictor Kits (OPKs) can often pinpoint their ovulation date with high confidence.</li>
              <li><strong>Irregular Cycles or PCOS:</strong> Women with Polycystic Ovary Syndrome (PCOS) or naturally irregular cycles benefit greatly from conception dating, as their LMP is an unreliable indicator of ovulation.</li>
            </ul>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4 text-center">Clinical Note: The Ultrasound Confirmation</h3>
            <p className="text-sm text-center max-w-2xl mx-auto leading-relaxed italic text-text-medium">
              "Even with a known conception date, your obstetrician will likely perform an early dating ultrasound (typically between 7 and 12 weeks). The Crown-Rump Length (CRL) measurement taken during this scan is the ultimate clinical gold standard for confirming gestational age and finalizing your Estimated Due Date."
            </p>
          </section>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <Tooltip content="Enter the exact date of conception, ovulation, or IUI procedure." showIcon>
            <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Known Conception / Ovulation Date</label>
          </Tooltip>
          <input 
            type="date" 
            value={conceptionDate} 
            onChange={(e) => setConceptionDate(e.target.value)} 
            className="input-field" 
          />
        </div>

        <button onClick={calculate} className="btn-primary w-full">
          Calculate Clinical Due Date
        </button>
      </div>
    </CalculatorLayout>
  );
}
