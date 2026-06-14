import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { formatDate, daysBetween, getWeeksAndDays, addDays, validateDate, validateNumber, generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Baby, Info, Calendar, Activity, AlertCircle, Ruler, Weight, Heart, Sparkles, ArrowRight } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

const fetalData: Record<number, any> = {
  4: { fruit: "Poppy Seed", weight: "< 1g", length: "2mm", desc: "Your baby is an embryo consisting of two layers of cells. The neural tube, which will become the brain and spinal cord, is starting to form." },
  6: { fruit: "Sweet Pea", weight: "1g", length: "5mm", desc: "The heart is beating! Basic facial features like eyes and nostrils are beginning to appear." },
  8: { fruit: "Raspberry", weight: "1g", length: "1.6cm", desc: "Embryonic tail is gone. Fingers and toes are starting to form, and the baby is moving, though you can't feel it yet." },
  10: { fruit: "Prune", weight: "4g", length: "3.1cm", desc: "Your baby is now officially a fetus. Vital organs like the kidneys, intestines, and brain are in place and starting to function." },
  12: { fruit: "Lime", weight: "14g", length: "5.4cm", desc: "Your baby is fully formed from head to toes. Reflexes are developing, and the baby can now open and close its fingers." },
  14: { fruit: "Lemon", weight: "43g", length: "8.7cm", desc: "The baby's kidneys are producing urine, and they are starting to grow fine hair called lanugo all over their body." },
  16: { fruit: "Avocado", weight: "100g", length: "11.6cm", desc: "Baby can now make a fist and even suck their thumb. The eyes are starting to move, although the eyelids are still shut." },
  18: { fruit: "Bell Pepper", weight: "190g", length: "14.2cm", desc: "Baby's ears are in their final position and they can start to hear sounds from the outside world." },
  20: { fruit: "Banana", weight: "300g", length: "25.6cm", desc: "You've reached the halfway point! Baby is covered in vernix, a waxy coating that protects their skin from amniotic fluid." },
  22: { fruit: "Papaya", weight: "430g", length: "27.8cm", desc: "Baby's lips and eyebrows are more distinct. They are starting to look like a miniature newborn." },
  24: { fruit: "Ear of Corn", weight: "600g", length: "30cm", desc: "Baby's lungs are developing surfactant to help them breathe after birth. Their skin is still translucent but starting to fill out." },
  26: { fruit: "Kale", weight: "760g", length: "35.6cm", desc: "Baby is starting to inhale and exhale amniotic fluid to practice breathing. Their eyes are starting to open." },
  28: { fruit: "Eggplant", weight: "1kg", length: "37.6cm", desc: "Baby can open and close their eyes and sense light. They are starting to develop a regular sleep-wake cycle." },
  30: { fruit: "Cabbage", weight: "1.3kg", length: "39.9cm", desc: "Baby is growing rapidly and their brain is developing billions of neurons. They are starting to shed their lanugo hair." },
  32: { fruit: "Squash", weight: "1.7kg", length: "42.4cm", desc: "Baby is practicing breathing by inhaling amniotic fluid. They are starting to move into a head-down position for birth." },
  34: { fruit: "Cantaloupe", weight: "2.1kg", length: "45cm", desc: "Baby's central nervous system and lungs are maturing. Their bones are fully developed but still soft." },
  36: { fruit: "Romaine Lettuce", weight: "2.6kg", length: "47.4cm", desc: "Baby is shedding their downy hair (lanugo) and vernix. They are gaining about an ounce of weight every day." },
  38: { fruit: "Winter Melon", weight: "3kg", length: "49.8cm", desc: "Baby is considered full-term. Their organs are ready to function on their own outside the womb." },
  40: { fruit: "Small Pumpkin", weight: "3.4kg", length: "51.2cm", desc: "Full term! Your baby is ready to meet the world. They have developed a layer of fat to help regulate their temperature." }
};

export default function PregnancyWeekCalculator() {
  const [activeTool, setActiveTool] = useState<'progress' | 'size' | 'conception'>('progress');
  const [method, setMethod] = useState<'LMP' | 'EDD'>('LMP');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [weekInput, setWeekInput] = useState<number>(20);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const faqs = [
    { q: "Why am I considered 4 weeks pregnant if I conceived only 2 weeks ago?", a: "Obstetricians universally date pregnancy from the first day of your Last Menstrual Period (LMP), not the date of conception. This is because the exact date of ovulation and fertilization is usually unknown, whereas the LMP is a reliable, observable event. This means you are technically considered 'pregnant' for the two weeks before conception actually occurs." },
    { q: "How many weeks constitutes a full-term pregnancy?", a: "A pregnancy is considered 'full-term' between 39 weeks 0 days and 40 weeks 6 days. Deliveries between 37 weeks 0 days and 38 weeks 6 days are considered 'early term,' and those after 41 weeks are 'late term.'" },
    { q: "Can my estimated gestational age change during my pregnancy?", a: "Your actual gestational age doesn't change, but your Estimated Due Date (EDD) might be adjusted. If an early first-trimester ultrasound (measuring Crown-Rump Length) shows a discrepancy of more than 5-7 days from your LMP-calculated date, your provider will likely change your official EDD to match the ultrasound, as it is the clinical gold standard for dating." },
    { q: "What is the most accurate clinical method to date a pregnancy?", a: "An early ultrasound performed between 8 and 12 weeks of gestation is the most accurate method. During this specific window, embryonic growth is highly uniform across all pregnancies, allowing for very precise dating." }
  ];

  const calculate = () => {
    setError(null);

    if (activeTool === 'size') {
      const weeks = Object.keys(fetalData).map(Number);
      const closest = weeks.reduce((prev, curr) => 
        Math.abs(curr - weekInput) < Math.abs(prev - weekInput) ? curr : prev
      );
      setResults({ type: 'size', data: fetalData[closest], week: weekInput });
      return;
    }

    if (activeTool === 'conception') {
      const dateError = validateDate(date, 'Due date');
      if (dateError) { setError(dateError); return; }
      const eddDate = new Date(date);
      const conceptionDate = addDays(eddDate, -266);
      setResults({
        type: 'conception',
        conceptionDate,
        windowStart: addDays(conceptionDate, -5),
        windowEnd: addDays(conceptionDate, 1)
      });
      return;
    }

    // Progress Tool
    const dateError = validateDate(date, method === 'LMP' ? 'Last menstrual period date' : 'Estimated due date');
    if (dateError) { setError(dateError); return; }

    const inputDate = new Date(date);
    let lmpDate: Date;
    let edd: Date;

    if (method === 'LMP') {
      lmpDate = inputDate;
      edd = addDays(lmpDate, 280);
    } else {
      edd = inputDate;
      lmpDate = addDays(edd, -280);
    }

    const today = new Date();
    const totalDays = daysBetween(lmpDate, today);
    const { weeks, days } = getWeeksAndDays(totalDays);
    const daysRemaining = daysBetween(today, edd);

    setResults({
      type: 'progress',
      weeks,
      days,
      edd,
      daysRemaining,
      trimester: weeks < 13 ? '1st' : weeks < 27 ? '2nd' : '3rd',
      progress: Math.min(Math.max(Math.round((totalDays / 280) * 100), 0), 100)
    });
  };

  return (
    <CalculatorLayout
      title="Clinical Pregnancy Progress & Milestones"
      description="Calculate your current gestational age, trimester, fetal development metrics, and estimated conception date. A comprehensive clinical tracking tool."
      intro={<>Welcome to your comprehensive clinical pregnancy tracker. Accurate gestational dating is fundamental to obstetric care, influencing everything from screening schedules to assessing fetal growth. Select a tool below to determine your exact gestational age (weeks and days), review fetal developmental milestones based on clinical averages, or retrospectively estimate your <a href="/conception-calculator" className="text-primary hover:underline font-medium">conception window</a>.</>}
      schema={[
        generateSoftwareAppSchema(
          "Clinical Pregnancy Week Calculator",
          "Calculate your current gestational age and track fetal development.",
          "https://hernexa.com/pregnancy-week-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://hernexa.com" },
          { name: "Tools", item: "https://hernexa.com/tools" },
          { name: "Pregnancy Week Calculator", item: "https://hernexa.com/pregnancy-week-calculator" }
        ])
      ]}
      howItWorks={
        <div className="space-y-4">
          <p>This comprehensive clinical calculator integrates three essential obstetric tracking tools:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Gestational Progress:</strong> Calculates your exact gestational age (weeks and days) and current trimester based on your LMP or <a href="/due-date-calculator" className="text-primary hover:underline font-medium">Estimated Due Date (EDD)</a>, utilizing the standard 280-day obstetric model (Naegele's rule).</li>
            <li><strong>Fetal Development (Size):</strong> Provides estimates of fetal weight and length based on standardized fetal growth charts (e.g., Hadlock or WHO), alongside key embryological and fetal developmental milestones. Use our <a href="/baby-size-comparator" className="text-primary hover:underline font-medium">Baby Size Comparator</a> for visual references.</li>
            <li><strong>Conception Estimation:</strong> Retrospectively calculates the probable window of fertilization by subtracting 266 days (38 weeks of fetal age) from your Estimated Due Date.</li>
          </ul>
        </div>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Due Date Calculator", path: "/due-date-calculator" },
        { name: "Pregnancy Weight Gain Calculator", path: "/pregnancy-weight-gain-calculator" },
        { name: "Baby Size Comparator", path: "/baby-size-calculator" }
      ]}
      medicalReferences={[
        {
          title: "Methods for Estimating the Due Date",
          url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date",
          source: "ACOG"
        },
        {
          title: "Fetal Development Milestones",
          url: "https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-care/art-20045302",
          source: "Mayo Clinic"
        },
        {
          title: "Your Pregnancy Week by Week",
          url: "https://www.nhs.uk/start-for-life/pregnancy/week-by-week/",
          source: "NHS"
        },
        {
          title: "Fetal Growth Charts",
          url: "https://www.who.int/tools/child-growth-standards/standards",
          source: "WHO"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {results.type === 'progress' && (
            <>
              <div className="text-center space-y-6 bg-primary-light/10 p-10 rounded-[3rem] border border-primary/10">
                <p className="text-primary font-bold uppercase tracking-widest text-sm">You are currently</p>
                <h2 className="text-5xl md:text-6xl font-serif font-bold text-text-dark">{results.weeks} Weeks, {results.days} Days</h2>
                <div className="max-w-md mx-auto space-y-3">
                  <div className="h-4 bg-white rounded-full overflow-hidden border border-primary/10 p-1">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-1000" 
                      style={{ width: `${results.progress}%` }}
                    />
                  </div>
                  <p className="text-text-medium font-bold text-sm uppercase tracking-wider">{results.progress}% of your journey complete!</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-primary-light text-center shadow-sm">
                  <div className="w-12 h-12 bg-bg-light rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-text-medium uppercase font-bold tracking-wider mb-1">Estimated Due Date</p>
                  <p className="text-xl font-bold text-text-dark">{formatDate(results.edd)}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-primary-light text-center shadow-sm">
                  <div className="w-12 h-12 bg-bg-light rounded-2xl flex items-center justify-center mx-auto mb-4 text-accent">
                    <Activity className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-text-medium uppercase font-bold tracking-wider mb-1">Current Trimester</p>
                  <p className="text-xl font-bold text-text-dark">{results.trimester} Trimester</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-primary-light text-center shadow-sm">
                  <div className="w-12 h-12 bg-bg-light rounded-2xl flex items-center justify-center mx-auto mb-4 text-success">
                    <Baby className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-text-medium uppercase font-bold tracking-wider mb-1">Days Remaining</p>
                  <p className="text-xl font-bold text-text-dark">{results.daysRemaining} Days</p>
                </div>
              </div>
            </>
          )}

          {results.type === 'size' && (
            <>
              <div className="text-center space-y-6 bg-bg-light p-10 rounded-[3rem] border border-primary/10">
                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto text-primary shadow-sm">
                  <Baby className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-text-dark">Week {results.week}: Your baby is the size of a {results.data.fruit}!</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-2xl border border-primary-light flex items-center gap-6 shadow-sm">
                  <div className="p-4 bg-bg-light text-primary rounded-2xl shadow-inner"><Weight className="w-8 h-8" /></div>
                  <div>
                    <p className="text-xs text-text-medium uppercase font-bold tracking-wider">Average Weight</p>
                    <p className="text-2xl font-bold text-text-dark">~{results.data.weight}</p>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-primary-light flex items-center gap-6 shadow-sm">
                  <div className="p-4 bg-bg-light text-accent rounded-2xl shadow-inner"><Ruler className="w-8 h-8" /></div>
                  <div>
                    <p className="text-xs text-text-medium uppercase font-bold tracking-wider">Average Length</p>
                    <p className="text-2xl font-bold text-text-dark">~{results.data.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-primary-light shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Sparkles className="w-6 h-6" />
                  <h3 className="text-xl font-serif font-bold">Developmental Milestone</h3>
                </div>
                <p className="text-text-medium leading-relaxed text-lg">{results.data.desc}</p>
              </div>
            </>
          )}

          {results.type === 'conception' && (
            <>
              <div className="text-center space-y-6 bg-rose-50/30 p-10 rounded-[3rem] border border-rose-100">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto text-rose-500 shadow-sm">
                  <Heart className="w-10 h-10 fill-current" />
                </div>
                <p className="text-rose-600 font-bold uppercase tracking-widest text-sm">Estimated Conception Date</p>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-rose-950">{formatDate(results.conceptionDate)}</h2>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-rose-100 shadow-sm space-y-4 text-center">
                <p className="text-sm text-neutral-500 font-bold uppercase tracking-wider">Intercourse Window</p>
                <p className="text-text-medium leading-relaxed max-w-md mx-auto">
                  Based on your due date, the intercourse that led to this pregnancy likely occurred between:
                </p>
                <div className="flex items-center justify-center gap-6 text-2xl font-bold text-neutral-900 pt-2">
                  <span>{formatDate(results.windowStart)}</span>
                  <ArrowRight className="w-6 h-6 text-rose-400" />
                  <span>{formatDate(results.windowEnd)}</span>
                </div>
              </div>
            </>
          )}
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Due Date Calculator.</p>
            </div>
            <a href="/due-date-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Due Date Calculator &rarr;
            </a>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">The Clinical Importance of Gestational Dating</h2>
            <p className="text-text-medium leading-relaxed mb-4">
              Accurate gestational dating is a cornerstone of modern obstetric care. It is essential for timing prenatal screening tests (such as NIPT or maternal serum screening), assessing fetal growth trajectories, and making critical clinical decisions regarding the timing of delivery, especially in cases of preterm labor or post-term pregnancies.
            </p>
            <p className="text-text-medium leading-relaxed">
              While the Last Menstrual Period (LMP) remains the standard starting point for calculation, it assumes a regular 28-day cycle with ovulation occurring on day 14. Because many women have irregular cycles, early ultrasound (measuring the Crown-Rump Length between 8 and 13 6/7 weeks) is considered the most accurate method to establish or confirm gestational age.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">How Your Pregnancy Week is Calculated</h2>
            <p>
              Understanding exactly how many weeks pregnant you are can be confusing because the medical community does not start counting from the day you conceived. Instead, pregnancy dating is standardized to begin on the first day of your Last Menstrual Period (LMP). Here is a detailed look at how this calculation works:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">The LMP Standard</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Because it is very difficult to pinpoint the exact moment of ovulation and fertilization, doctors use the LMP as a reliable, observable starting point. This means that during "Week 1" and "Week 2" of your pregnancy, you are not actually pregnant yet—your body is preparing to ovulate.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">The 40-Week Timeline</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  A standard full-term pregnancy is calculated as lasting 280 days, or exactly 40 weeks. This timeline is crucial for scheduling medical care and monitoring fetal development against standardized growth charts.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Trimester Breakdown & Milestones</h2>
            <p>
              Pregnancy is divided into three trimesters, each characterized by specific developmental milestones and maternal symptoms:
            </p>
            <div className="space-y-6 mt-6">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">First Trimester (Weeks 1-13)</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  This is a period of rapid organogenesis (organ formation). By the end of this trimester, all major organs and systems are in place. This is also when many women experience the most intense pregnancy symptoms like morning sickness and fatigue.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Second Trimester (Weeks 14-27)</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Often called the "honeymoon phase," energy levels typically return. The baby grows significantly, and you will start to feel the first fetal movements (quickening) between weeks 18 and 22.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Third Trimester (Weeks 28-40+)</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  The final stretch is focused on weight gain and lung maturation. The baby is practicing breathing and opening their eyes. You may experience more physical discomfort as the baby moves into position for birth.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4 text-center">Expert Insight: The 40-Week Standard</h3>
            <p className="text-sm text-center max-w-2xl mx-auto leading-relaxed italic text-text-medium">
              "A full-term pregnancy is technically 40 weeks, but only about 4% of babies are born on their actual due date. Most healthy pregnancies last between 37 and 42 weeks. Tracking your progress by the week allows us to monitor fetal growth and ensure both mom and baby are hitting their health targets."
            </p>
          </section>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => { setActiveTool('progress'); setResults(null); }}
              className={`flex-1 py-4 px-6 rounded-2xl font-bold text-sm transition-all ${
                activeTool === 'progress' 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-neutral-50 text-text-medium hover:bg-neutral-100'
              }`}
            >
              Pregnancy Progress
            </button>
            <button
              onClick={() => { setActiveTool('size'); setResults(null); }}
              className={`flex-1 py-4 px-6 rounded-2xl font-bold text-sm transition-all ${
                activeTool === 'size' 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-neutral-50 text-text-medium hover:bg-neutral-100'
              }`}
            >
              Fetal Size
            </button>
            <button
              onClick={() => { setActiveTool('conception'); setResults(null); }}
              className={`flex-1 py-4 px-6 rounded-2xl font-bold text-sm transition-all ${
                activeTool === 'conception' 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-neutral-50 text-text-medium hover:bg-neutral-100'
              }`}
            >
              Conception Date
            </button>
          </div>

          <div className="space-y-8">
            {activeTool === 'progress' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Tooltip content="Choose whether to calculate your pregnancy week based on your last period or your estimated due date." showIcon>
                      <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Calculate Based On</label>
                    </Tooltip>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setMethod('LMP')}
                        className={`flex-1 py-4 rounded-2xl font-bold text-sm transition-all ${method === 'LMP' ? 'bg-primary/10 text-primary border-2 border-primary' : 'bg-white text-text-medium border border-primary/10 hover:border-primary/30'}`}
                      >
                        Last Period
                      </button>
                      <button 
                        onClick={() => setMethod('EDD')}
                        className={`flex-1 py-4 rounded-2xl font-bold text-sm transition-all ${method === 'EDD' ? 'bg-primary/10 text-primary border-2 border-primary' : 'bg-white text-text-medium border border-primary/10 hover:border-primary/30'}`}
                      >
                        Due Date
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Tooltip content={method === 'LMP' ? 'Enter the first day of your last menstrual period.' : 'Enter your estimated due date.'} showIcon>
                      <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">
                        {method === 'LMP' ? 'First Day of Last Period' : 'Estimated Due Date'}
                      </label>
                    </Tooltip>
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>
              </>
            )}

            {activeTool === 'size' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Tooltip content="Enter your current week of pregnancy to see your baby's size equivalent." showIcon>
                    <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Current Pregnancy Week</label>
                  </Tooltip>
                  <span className="text-primary font-bold">{weekInput} Weeks</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="40"
                  value={weekInput}
                  onChange={(e) => setWeekInput(parseInt(e.target.value))}
                  className="w-full accent-primary h-2 bg-primary-light rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}

            {activeTool === 'conception' && (
              <div className="space-y-3">
                <Tooltip content="Enter your estimated due date to calculate when you likely conceived." showIcon>
                  <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Estimated Due Date</label>
                </Tooltip>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="input-field"
                />
              </div>
            )}

            {error && (
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-medium">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </div>
            )}

            <button 
              onClick={calculate}
              className="btn-primary w-full text-lg"
            >
              Calculate {activeTool === 'progress' ? 'Progress' : activeTool === 'size' ? 'Fetal Size' : 'Conception Date'}
            </button>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
