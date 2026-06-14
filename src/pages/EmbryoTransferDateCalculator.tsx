import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Calendar, Baby, Clock, Activity, Info, ShieldCheck, Heart, Sparkles, ArrowRight, ClipboardList } from 'lucide-react';
import { format, addDays, subDays, parseISO } from 'date-fns';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function EmbryoTransferDateCalculator() {
  const [transferDate, setTransferDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [embryoType, setEmbryoType] = useState<number>(5); // Day 3 or Day 5
  const [results, setResults] = useState<any>(null);

  const faqs = [
    { q: "How is the IVF due date calculated?", a: "Unlike a natural pregnancy calculated from the first day of your last period, an IVF due date is calculated precisely from the date of embryo transfer and the age of the embryo (usually 3 or 5 days old)." },
    { q: "What is the difference between a Day 3 and Day 5 transfer?", a: "A Day 3 embryo has been developing for 3 days after egg retrieval, while a Day 5 embryo (blastocyst) has developed for 5 days. The due date calculation adjusts for these 2 days of difference." },
    { q: "When can I take a pregnancy test after transfer?", a: "For a Day 5 transfer, a blood test (beta hCG) is typically scheduled 9-11 days later. For a Day 3 transfer, it is usually 11-14 days later." },
    { q: "Is an IVF due date more accurate?", a: "Yes, IVF due dates are considered the most accurate because the exact moment of fertilization and the age of the embryo are known, removing the uncertainty of ovulation timing." }
  ];

  const calculate = () => {
    if (!transferDate) return;

    const dateObj = parseISO(transferDate);
    
    // Standard human gestation is 280 days from LMP.
    // At the time of a Day 5 transfer, the woman is technically 2 weeks and 5 days (19 days) pregnant.
    // At a Day 3 transfer, she is 2 weeks and 3 days (17 days) pregnant.
    
    const daysToSubtract = embryoType === 5 ? 19 : 17;
    const estimatedLMP = subDays(dateObj, daysToSubtract);
    const dueDate = addDays(estimatedLMP, 280);
    
    // Milestones
    const betaTestDate = addDays(dateObj, embryoType === 5 ? 10 : 12);
    const heartbeatUltrasound = addDays(dateObj, 28); // ~6.5 weeks pregnant

    setResults({
      dueDate: format(dueDate, 'MMMM d, yyyy'),
      estimatedLMP: format(estimatedLMP, 'MMMM d, yyyy'),
      betaTestDate: format(betaTestDate, 'MMMM d, yyyy'),
      heartbeatUltrasound: format(heartbeatUltrasound, 'MMMM d, yyyy'),
      gestationalAgeAtTransfer: embryoType === 5 ? '2w 5d' : '2w 3d'
    });
  };

  return (
    <CalculatorLayout
      title="IVF Due Date Calculator | Embryo Transfer Due Date"
      description="Calculate your exact pregnancy due date using our IVF due date calculator. Predict your fet due date and ivf pregnancy tracker milestones based on transfer."
      intro={<>If you conceived through IVF (In Vitro Fertilization) or FET (Frozen Embryo Transfer), standard subjective tools using your last menstrual period won't be accurate. This specialized <strong>IVF due date calculator</strong> uses your transfer date and embryo age to provide the most mathematically precise <strong>ivf pregnancy calculator</strong> estimates. Whether you need a <strong>fet due date calculator</strong> or a general <strong>ivf calculator</strong>, tracking your <Link to="/due-date-calculator" className="text-primary hover:underline font-medium">due date</Link> with precision is critical for the next milestones.</>}
      schema={[
        generateSoftwareAppSchema(
          "Embryo Transfer Date Calculator",
          "Calculate IVF due dates based on embryo transfer.",
          "https://hernexa.com/embryo-transfer-date-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://hernexa.com" },
          { name: "Tools", item: "https://hernexa.com/tools" },
          { name: "Embryo Transfer Due Date", item: "https://hernexa.com/embryo-transfer-date-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>IVF pregnancies are dated with extreme precision because the exact moment of fertilization is known. Here is how the math works:</p>
          <ul>
            <li><strong>Day 5 Transfer (Blastocyst):</strong> On the day of transfer, you are considered exactly 2 weeks and 5 days (19 days) pregnant. We add 261 days to your transfer date to find your due date.</li>
            <li><strong>Day 3 Transfer (Cleavage Stage):</strong> On the day of transfer, you are considered exactly 2 weeks and 3 days (17 days) pregnant. We add 263 days to your transfer date to find your due date.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "IVF Success Rate Calculator", path: "/ivf-success-rate-calculator" },
        { name: "Pregnancy Week Calculator", path: "/pregnancy-week-calculator" },
        { name: "Due Date Calculator", path: "/due-date-calculator" }
      ]}
      medicalReferences={[
        {
          title: "IVF Pregnancy Dating",
          url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date",
          source: "ACOG"
        },
        {
          title: "Embryo Transfer",
          url: "https://www.nhs.uk/conditions/ivf/what-happens/",
          source: "NHS"
        },
        {
          title: "IVF Milestones",
          url: "https://www.mayoclinic.org/tests-procedures/in-vitro-fertilization/about/pac-20384716",
          source: "Mayo Clinic"
        },
        {
          title: "Embryo transfer",
          url: "https://en.wikipedia.org/wiki/Embryo_transfer",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <p className="text-primary font-bold uppercase tracking-widest text-sm">Estimated Due Date</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-text-dark">{results.dueDate}</h2>
            <p className="text-success font-bold flex items-center justify-center gap-2 text-sm">
              <Sparkles className="w-5 h-5" />
              Congratulations on your successful transfer!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-primary-light text-center shadow-sm">
              <Calendar className="w-6 h-6 text-indigo-500 mx-auto mb-3" />
              <p className="text-[10px] text-text-medium uppercase font-bold tracking-wider">Estimated LMP</p>
              <p className="font-bold text-text-dark mt-1">{results.estimatedLMP}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-primary-light text-center shadow-sm">
              <Activity className="w-6 h-6 text-emerald-500 mx-auto mb-3" />
              <p className="text-[10px] text-text-medium uppercase font-bold tracking-wider">Beta hCG Test</p>
              <p className="font-bold text-text-dark mt-1">{results.betaTestDate}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-primary-light text-center shadow-sm">
              <Clock className="w-6 h-6 text-amber-500 mx-auto mb-3" />
              <p className="text-[10px] text-text-medium uppercase font-bold tracking-wider">First Ultrasound</p>
              <p className="font-bold text-text-dark mt-1">{results.heartbeatUltrasound}</p>
            </div>
          </div>

          <div className="bg-bg-light p-8 rounded-2xl border border-primary-light space-y-6 shadow-sm">
            <h3 className="font-bold text-text-dark flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" />
              Why This Date is Precise
            </h3>
            <p className="text-sm text-text-medium leading-relaxed">
              In a natural conception, the exact date of ovulation can vary. In IVF, the embryo's age is known down to the hour. On your transfer day, you were technically <strong>{results.gestationalAgeAtTransfer}</strong> pregnant. This removes the "guesswork" often found in traditional due date calculations.
            </p>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our IVF Success Rate Calculator.</p>
            </div>
            <Link to="/ivf-success-rate-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              IVF Success Rate Calculator &rarr;
            </Link>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">How IVF Due Dates are Calculated</h2>
            <p>
              The standard human pregnancy lasts 266 days from conception, or 280 days from the first day of the last menstrual period (LMP). In IVF, we don't need to guess when conception happened—we know exactly when the egg was fertilized and how long it grew in the lab.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Day 3 Transfer</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  A Day 3 embryo is at the "cleavage stage." To calculate the due date, we count the transfer date as being 17 days after an imaginary LMP. We then add 263 days to the transfer date.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Day 5 Transfer</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  A Day 5 embryo is a "blastocyst." Because it is two days older than a Day 3 embryo, we count the transfer date as being 19 days after an imaginary LMP. We then add 261 days to the transfer date.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Key IVF Milestones</h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-text-dark">The Two-Week Wait (2WW)</h4>
                  <p className="text-sm text-text-medium">The period between your transfer and your pregnancy test. During this time, the embryo is implanting into the uterine lining.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-text-dark">Beta hCG Test</h4>
                  <p className="text-sm text-text-medium">A blood test that measures the level of Human Chorionic Gonadotropin (hCG). This is the definitive way to confirm pregnancy after IVF.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-bold text-text-dark">Viability Ultrasound</h4>
                  <p className="text-sm text-text-medium">Usually performed around 6.5 to 7 weeks of pregnancy (about 4 weeks after transfer) to confirm a heartbeat and proper implantation.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10 text-center">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4">A Note on FET (Frozen Embryo Transfer)</h3>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed text-text-medium">
              The calculation for a Frozen Embryo Transfer is identical to a fresh transfer. The "age" of the embryo at the time it was frozen (Day 3 or Day 5) is the age used for the calculation, regardless of how long it was in storage.
            </p>
          </section>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-primary-light space-y-8">
          <div className="space-y-3">
            <Tooltip content="The date your embryo was transferred into your uterus." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Date of Embryo Transfer</label>
            </Tooltip>
            <input 
              type="date" 
              value={transferDate} 
              onChange={(e) => setTransferDate(e.target.value)} 
              className="input-field" 
            />
          </div>

          <div className="space-y-4">
            <Tooltip content="The age of the embryo at the time of transfer." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Embryo Age at Transfer</label>
            </Tooltip>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setEmbryoType(3)}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  embryoType === 3 
                    ? 'border-primary bg-primary/5 text-primary shadow-sm' 
                    : 'border-neutral-100 text-text-medium hover:border-primary/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${embryoType === 3 ? 'bg-primary text-white' : 'bg-neutral-100 text-text-medium'}`}>
                  <Activity className="w-5 h-5" />
                </div>
                <span className="font-bold">Day 3 Embryo</span>
                <span className="text-[10px] uppercase tracking-wider opacity-60">Cleavage Stage</span>
              </button>
              <button
                onClick={() => setEmbryoType(5)}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  embryoType === 5 
                    ? 'border-primary bg-primary/5 text-primary shadow-sm' 
                    : 'border-neutral-100 text-text-medium hover:border-primary/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${embryoType === 5 ? 'bg-primary text-white' : 'bg-neutral-100 text-text-medium'}`}>
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="font-bold">Day 5 Embryo</span>
                <span className="text-[10px] uppercase tracking-wider opacity-60">Blastocyst Stage</span>
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={calculate} 
          className="btn-primary w-full py-5 text-lg shadow-xl shadow-primary/20"
        >
          Calculate My Due Date
        </button>
      </div>
    </CalculatorLayout>
  );
}
