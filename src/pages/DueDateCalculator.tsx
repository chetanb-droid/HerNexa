import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { calculateEDD_LMP, calculateEDD_IVF, calculateEDD_CRL, formatDate, daysBetween, getWeeksAndDays, addDays, validateDate, validateNumber, generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Calendar, Info, Baby, Heart, Activity, AlertCircle } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';

type Method = 'LMP' | 'Conception' | 'IVF3' | 'IVF5' | 'Ultrasound';

export default function DueDateCalculator() {
  const [method, setMethod] = useState<Method>('LMP');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [crl, setCrl] = useState<number>(0);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const faqs = [
    { q: "How accurate is a due date calculator?", a: "While only about 5% of babies are born on their actual due date, a calculator provides a vital reference point for monitoring fetal development and scheduling prenatal care." },
    { q: "Can an ultrasound change my due date?", a: "Yes, especially in the first trimester. If the ultrasound measurement (CRL) differs from your LMP date by more than 7 days, your provider may adjust your official due date." },
    { q: "What if my cycle isn't 28 days?", a: "Our calculator allows you to adjust for cycle length. A longer cycle typically means a later ovulation and a later due date." }
  ];

  const calculate = () => {
    setError(null);
    
    const dateError = validateDate(date, 'Selected date');
    if (dateError) {
      setError(dateError);
      return;
    }

    if (method === 'Ultrasound') {
      const crlError = validateNumber(crl, 1, 100, 'CRL measurement');
      if (crlError) {
        setError(crlError);
        return;
      }
    }

    const inputDate = new Date(date);
    let edd: Date;

    switch (method) {
      case 'LMP': edd = calculateEDD_LMP(inputDate, cycleLength); break;
      case 'Conception': edd = addDays(inputDate, 266); break;
      case 'IVF3': edd = calculateEDD_IVF(inputDate, 3); break;
      case 'IVF5': edd = calculateEDD_IVF(inputDate, 5); break;
      case 'Ultrasound': edd = calculateEDD_CRL(crl); break;
      default: edd = new Date();
    }

    const today = new Date();
    const lmpDate = method === 'LMP' ? inputDate : addDays(edd, -280);
    const totalDays = daysBetween(lmpDate, today);
    const { weeks, days } = getWeeksAndDays(totalDays);
    const daysRemaining = daysBetween(today, edd);

    setResults({
      edd,
      weeks,
      days,
      daysRemaining,
      trimester: weeks < 13 ? '1st' : weeks < 27 ? '2nd' : '3rd',
      milestones: [
        { name: 'First Heartbeat Detected', week: 6, date: addDays(lmpDate, 42), desc: "Fetal cardiac activity typically visible via transvaginal ultrasound." },
        { name: 'NIPT / NT Scan Window', week: '11-14', date: addDays(lmpDate, 77), desc: "Optimal window for genetic screening and nuchal translucency measurement." },
        { name: 'Fetal Anatomy Scan', week: '18-22', date: addDays(lmpDate, 126), desc: "Comprehensive ultrasound to evaluate fetal structures and placenta." },
        { name: 'Viability Milestone', week: 24, date: addDays(lmpDate, 168), desc: "The point at which a fetus has a chance of survival outside the womb with NICU support." },
        { name: 'Early Term', week: 37, date: addDays(lmpDate, 259), desc: "Fetal lung maturity is generally reached." },
        { name: 'Full Term', week: 39, date: addDays(lmpDate, 273), desc: "Optimal time for delivery; lowest risk of respiratory issues." },
      ]
    });
  };

  return (
    <CalculatorLayout
      title="Clinical Due Date Calculator"
      description="Calculate your estimated due date (EDD) using LMP, conception date, or IVF transfer. Use our pregnancy chance calendar and best best days to get pregnant calculator tools alongside your EDD."
      intro={<>Knowing your due date is the first step in your pregnancy journey. Our comprehensive clinical calculator supports multiple methods including Last Menstrual Period (LMP) with cycle adjustments, <Link to="/conception-calculator" className="text-primary hover:underline font-medium">conception date</Link>, IVF transfer dates, and ultrasound measurements (CRL) to give you the most accurate estimate possible. If you are still trying, utilize a <strong>pregnancy chance calendar</strong> or <strong>best days to get pregnant calculator</strong> to optimize your timing.</>}
      schema={[
        generateSoftwareAppSchema(
          "Clinical Due Date Calculator",
          "Calculate your estimated due date using multiple medical methods.",
          "https://femhealth.com/due-date-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Due Date Calculator", item: "https://femhealth.com/due-date-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>This calculator utilizes standardized obstetric formulas to determine your Estimated Due Date (EDD) and <Link to="/pregnancy-week-calculator" className="text-primary hover:underline font-medium">gestational age</Link>:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li><strong>Naegele's Rule (LMP):</strong> The standard obstetric method which adds 280 days (40 weeks) to the first day of your last menstrual period. Our calculator dynamically adjusts this based on your specific <Link to="/menstrual-cycle-length-calculator" className="text-primary hover:underline font-medium">cycle length</Link> (e.g., adding days for cycles longer than 28 days).</li>
            <li><strong>IVF Transfer Dating:</strong> Highly accurate dating calculated by adding 261 days for a Day 5 blastocyst transfer or 263 days for a Day 3 cleavage-stage embryo transfer.</li>
            <li><strong>Ultrasound (CRL):</strong> Uses the Crown-Rump Length (CRL) measurement. According to ACOG guidelines, ultrasound dating in the first trimester (up to 13 6/7 weeks) is the most accurate method to establish or confirm gestational age.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Pregnancy Weight Gain", path: "/pregnancy-weight-gain-calculator" },
        { name: "Baby Size Comparator", path: "/baby-size-comparator" },
        { name: "Miscarriage Risk Calculator", path: "/miscarriage-risk-calculator" }
      ]}
      medicalReferences={[
        {
          title: "Methods for Estimating the Due Date",
          url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date",
          source: "ACOG"
        },
        {
          title: "Calculating Your Due Date",
          url: "https://www.nhs.uk/pregnancy/finding-out/your-due-date/",
          source: "NHS"
        },
        {
          title: "The Science of Pregnancy Dating",
          url: "https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/due-date-calculator/art-20048514",
          source: "Mayo Clinic"
        },
        {
          title: "Ultrasonic fetal measurements",
          url: "https://pubmed.ncbi.nlm.nih.gov/11829237/",
          source: "PubMed (NIH)"
        }
      ]}
      results={results && (
        <div className="space-y-8">
          <div className="bg-primary text-white p-8 rounded-[2rem] text-center shadow-lg shadow-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
            
            <p className="text-primary-light font-bold uppercase tracking-widest text-sm mb-2 relative z-10">Estimated Due Date (EDD)</p>
            <p className="text-4xl md:text-5xl font-serif font-bold mb-6 relative z-10">{formatDate(results.edd)}</p>
            
            <div className="grid grid-cols-3 gap-4 border-t border-white/20 pt-6 relative z-10">
              <div>
                <p className="text-primary-light text-xs uppercase font-bold tracking-wider mb-1">Gestational Age</p>
                <p className="text-xl font-bold">{results.weeks}w {results.days}d</p>
              </div>
              <div>
                <p className="text-primary-light text-xs uppercase font-bold tracking-wider mb-1">Trimester</p>
                <p className="text-xl font-bold">{results.trimester}</p>
              </div>
              <div>
                <p className="text-primary-light text-xs uppercase font-bold tracking-wider mb-1">Days to Go</p>
                <p className="text-xl font-bold">{results.daysRemaining}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-border shadow-sm">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Clinical Milestones
            </h3>
            <div className="space-y-6">
              {results.milestones.map((m: any, i: number) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== results.milestones.length - 1 && (
                    <div className="absolute left-[11px] top-8 bottom-[-24px] w-0.5 bg-primary/10" />
                  )}
                  <div className="w-6 h-6 rounded-full bg-primary-light border-2 border-primary flex items-center justify-center shrink-0 z-10 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <p className="font-bold text-text-dark">{m.name}</p>
                      <span className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded-full">Week {m.week}</span>
                    </div>
                    <p className="text-sm text-text-medium mb-1">{formatDate(m.date)}</p>
                    <p className="text-xs text-text-medium/80 italic">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Now that you know your due date, see how big your baby is this week!</p>
            </div>
            <Link to="/baby-size-comparator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Compare Baby Size &rarr;
            </Link>
          </div>
        </div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">How Your Due Date is Calculated</h2>
            <p>
              Calculating an Estimated Due Date (EDD) involves more than just adding nine months to a calendar. Depending on the information available, healthcare providers use specific medical formulas to determine when your baby is likely to arrive. Here is a detailed breakdown of the methodologies our calculator uses:
            </p>
            <div className="space-y-6 mt-6">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">1. Naegele's Rule (Last Menstrual Period)</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  The most common method is Naegele's Rule. It assumes a standard 28-day menstrual cycle with ovulation occurring on day 14. The formula adds exactly 280 days (40 weeks) to the first day of your Last Menstrual Period (LMP). Because not all women have 28-day cycles, our calculator adjusts this formula: if your cycle is 30 days, ovulation likely occurred on day 16, pushing your due date back by 2 days.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">2. Conception Date</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  If you were tracking ovulation closely (via basal body temperature or OPK strips) and know the exact date of conception, the calculation is more precise. We simply add 266 days (38 weeks) to the conception date. This bypasses the variability of the follicular phase of your menstrual cycle.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">3. In Vitro Fertilization (IVF)</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  IVF due dates are the most mathematically precise because the exact age of the embryo is known at the time of transfer. For a Day 3 embryo transfer, we add 263 days to the transfer date. For a Day 5 blastocyst transfer, we add 261 days. This accounts for the days the embryo developed in the lab before implantation.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">4. Ultrasound (Crown-Rump Length)</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  During a first-trimester ultrasound (typically between 7 and 12 weeks), the technician measures the baby from the top of the head to the bottom of the buttocks (Crown-Rump Length or CRL). Because embryos grow at a highly predictable rate during these early weeks, the CRL measurement in millimeters can be converted directly into gestational age with an accuracy of +/- 3 to 5 days.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">What Your Estimated Due Date Actually Means</h2>
            <p>
              It is crucial to understand that an Estimated Due Date is exactly that—an estimate. It is not a deadline or a guaranteed birth date. In fact, <strong>only about 4% to 5% of babies are born exactly on their EDD.</strong>
            </p>
            <p>
              Medically, a pregnancy is considered "full term" anywhere between 39 weeks and 0 days to 40 weeks and 6 days. The EDD serves as the central anchor point for this window. Here is how your provider uses this date:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-text-medium">
              <li><strong>Scheduling Prenatal Care:</strong> Your EDD dictates when you should have crucial screenings, such as the Nuchal Translucency (NT) scan (between 11-14 weeks), the anatomy scan (18-22 weeks), and glucose tolerance testing (24-28 weeks).</li>
              <li><strong>Monitoring Fetal Growth:</strong> By knowing the exact gestational age, doctors can compare your baby's size and weight against standard growth charts to ensure they are developing properly.</li>
              <li><strong>Managing Post-Term Pregnancies:</strong> If you pass your due date, the EDD helps doctors decide when to begin closer monitoring (like non-stress tests) or when to recommend medical induction (usually between 41 and 42 weeks) to prevent complications.</li>
            </ul>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4 text-center">Expert Insight: The "Due Month"</h3>
            <p className="text-sm text-center max-w-2xl mx-auto leading-relaxed italic text-text-medium">
              "I always advise my patients to think of a 'due month' rather than a due date. Any time between 37 and 42 weeks is considered a normal time to go into labor. Fixating on a single date can lead to unnecessary anxiety if that day comes and goes without contractions. Use the EDD for medical planning, but give your body the grace of a flexible timeline."
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
            <Tooltip content="Choose the medical method you'd like to use to estimate your due date." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Calculation Method</label>
            </Tooltip>
            <select 
              value={method} 
              onChange={(e) => setMethod(e.target.value as Method)}
              className="input-field"
            >
              <option value="LMP">Last Period (LMP)</option>
              <option value="Conception">Conception Date</option>
              <option value="IVF3">IVF Transfer (Day 3)</option>
              <option value="IVF5">IVF Transfer (Day 5)</option>
              <option value="Ultrasound">Ultrasound (CRL)</option>
            </select>
          </div>

          <div className="space-y-3">
            <Tooltip content="Select the date corresponding to your chosen calculation method." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">
                {method === 'LMP' ? 'First Day of Last Period' : 
                 method === 'Conception' ? 'Date of Conception' :
                 method === 'Ultrasound' ? 'Date of Ultrasound' : 'Transfer Date'}
              </label>
            </Tooltip>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-field"
            />
          </div>

          {method === 'LMP' && (
            <div className="space-y-3 md:col-span-2">
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
          )}

          {method === 'Ultrasound' && (
            <div className="space-y-3 md:col-span-2">
              <Tooltip content="The Crown-Rump Length measurement from your ultrasound scan, in millimeters." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">CRL Measurement (mm)</label>
              </Tooltip>
              <input 
                type="number" 
                placeholder="e.g. 15"
                value={crl}
                onChange={(e) => setCrl(parseFloat(e.target.value))}
                className="input-field"
              />
            </div>
          )}
        </div>

        <Tooltip content="Calculate your estimated due date based on your selected method and date.">
          <button 
            onClick={calculate}
            className="btn-primary w-full text-lg"
          >
            Calculate My Due Date
          </button>
        </Tooltip>
      </div>
    </CalculatorLayout>
  );
}
