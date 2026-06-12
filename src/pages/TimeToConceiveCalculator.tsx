import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { Activity, Info, TrendingUp, Heart, Sparkles, AlertCircle, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { validateNumber, generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function TimeToConceiveCalculator() {
  const [age, setAge] = useState<number>(25);
  const [monthsTrying, setMonthsTrying] = useState<number>(0);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const faqs = [
    { q: "When should I see a fertility specialist?", a: "Most doctors recommend seeking help after 12 months of trying if you are under 35, or after 6 months if you are 35 or older. If you have known issues like PCOS or endometriosis, you should seek help sooner." },
    { q: "What factors can affect my chances?", a: "Age, weight, stress, smoking, and underlying conditions like PCOS or endometriosis can all impact fertility. Male factor infertility also accounts for about 40% of cases." },
    { q: "How can I increase my monthly chances?", a: "Track your ovulation using OPKs or BBT, maintain a healthy weight, avoid smoking/alcohol, and have regular intercourse during your 6-day fertile window." },
    { q: "Does the probability reset every month?", a: "While each month is a new chance, statistically, if you haven't conceived after many months of trying, the probability of natural conception in the next month may be lower than the population average, suggesting an underlying issue." }
  ];

  const calculate = () => {
    setError(null);
    const ageError = validateNumber(age, 18, 50, 'Age');
    if (ageError) { setError(ageError); return; }

    const monthsError = validateNumber(monthsTrying, 0, 60, 'Months trying');
    if (monthsError) { setError(monthsError); return; }

    // Statistical probabilities based on age (approximate monthly fecundability)
    let probPerMonth = 0.25;
    if (age >= 45) probPerMonth = 0.01;
    else if (age >= 40) probPerMonth = 0.05;
    else if (age >= 35) probPerMonth = 0.15;
    else if (age >= 30) probPerMonth = 0.20;

    // Adjust probability based on how long they've already been trying
    // If trying for > 12 months, the monthly prob for natural conception is lower
    let adjustedProb = probPerMonth;
    if (monthsTrying >= 12) adjustedProb *= 0.5;
    else if (monthsTrying >= 6) adjustedProb *= 0.8;

    const prob6Months = 1 - Math.pow(1 - adjustedProb, 6);
    const prob12Months = 1 - Math.pow(1 - adjustedProb, 12);

    setResults({
      probPerMonth: Math.round(adjustedProb * 100),
      prob6Months: Math.round(prob6Months * 100),
      prob12Months: Math.round(prob12Months * 100),
      age,
      monthsTrying
    });
  };

  return (
    <CalculatorLayout
      title="Chances of Getting Pregnant Calculator | Probability of Pregnancy"
      description="Estimate your probability of pregnancy based on your age, health, and how long you've been trying. Accurate chances of getting pregnant calculator."
      intro="How long does it take to get pregnant? Our time to conceive calculator uses statistical data to estimate your chances of conception over the next 6 to 12 months. This serves as a reliable <strong>chance of getting pregnant by age calculator</strong>. While every couple is unique, understanding the averages can help you set realistic expectations and know when it's time to seek professional guidance. Use this <strong>what are my chances of getting pregnant calculator</strong> to see your <strong>probability of pregnancy calculator</strong> results instantly."
      schema={[
        generateSoftwareAppSchema(
          "Time to Conceive Calculator",
          "Estimate probability of conception over time.",
          "https://femhealth.com/time-to-conceive-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Time to Conceive Calculator", item: "https://femhealth.com/time-to-conceive-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>This calculator uses data from fertility studies to estimate conception probabilities:</p>
          <ul>
            <li><strong>Age Factor:</strong> Fertility naturally declines with age, particularly after 35, as egg quality and quantity decrease.</li>
            <li><strong>Monthly Probability (Fecundability):</strong> For a healthy couple in their 20s, the chance of conception is about 20-25% per cycle.</li>
            <li><strong>Duration Factor:</strong> The longer a couple has been trying without success, the higher the statistical likelihood of an underlying fertility issue.</li>
            <li><strong>Cumulative Probability:</strong> Most healthy couples (about 85%) will conceive within one year of regular, unprotected intercourse.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Ovulation Calculator", path: "/ovulation-calculator" },
        { name: "Fertile Window Calculator", path: "/fertile-window-calculator" },
        { name: "IVF Success Rate Calculator", path: "/ivf-success-rate-calculator" }
      ]}
      medicalReferences={[
        {
          title: "Optimizing Natural Fertility",
          url: "https://www.asrm.org/practice-guidance/practice-committee-documents/optimizing-natural-fertility-a-committee-opinion-2021/",
          source: "ASRM"
        },
        {
          title: "How long does it take to get pregnant?",
          url: "https://www.nhs.uk/pregnancy/trying-for-a-baby/how-long-it-takes-to-get-pregnant/",
          source: "NHS"
        },
        {
          title: "Infertility FAQs",
          url: "https://www.cdc.gov/reproductivehealth/infertility/index.htm",
          source: "CDC"
        },
        {
          title: "Fertility",
          url: "https://en.wikipedia.org/wiki/Fertility",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-rose-50 p-10 rounded-[3rem] border border-rose-100 text-center shadow-sm">
            <div className="flex justify-center mb-6 text-rose-500">
              <TrendingUp className="w-16 h-16" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-rose-800 mb-2">Monthly Chance of Conception</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-rose-950">{results.probPerMonth}%</h2>
            <p className="text-rose-700 mt-4 font-medium flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Probability per cycle for Age {results.age}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-primary-light flex items-center gap-6 shadow-sm">
              <div className="p-4 bg-bg-light text-primary rounded-2xl shadow-inner"><Calendar className="w-8 h-8" /></div>
              <div>
                <p className="text-xs text-text-medium uppercase font-bold tracking-wider">Within 6 Months</p>
                <p className="text-2xl font-bold text-text-dark">{results.prob6Months}% Chance</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-primary-light flex items-center gap-6 shadow-sm">
              <div className="p-4 bg-bg-light text-accent rounded-2xl shadow-inner"><Sparkles className="w-8 h-8" /></div>
              <div>
                <p className="text-xs text-text-medium uppercase font-bold tracking-wider">Within 12 Months</p>
                <p className="text-2xl font-bold text-text-dark">{results.prob12Months}% Chance</p>
              </div>
            </div>
          </div>

          {(results.age >= 35 && results.monthsTrying >= 6) || (results.age < 35 && results.monthsTrying >= 12) ? (
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
              <div>
                <p className="font-bold text-amber-900">Medical Consultation Recommended</p>
                <p className="text-sm text-amber-800 mt-1">
                  Based on your age and the time you've been trying, clinical guidelines suggest it may be time to consult a fertility specialist for a baseline evaluation.
                </p>
              </div>
            </div>
          ) : null}
        
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
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">How Time to Conceive is Calculated</h2>
            <p>
              Our calculator uses established epidemiological data and statistical probability models to estimate your chances of conception over time. The primary variable in this calculation is maternal age, which is the strongest predictor of natural fertility. Here is how the math works:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-text-medium">
              <li><strong>Fecundability (Monthly Probability):</strong> This is the statistical probability of achieving a pregnancy within a single menstrual cycle. Clinical data shows that for a healthy couple in their 20s having regular unprotected intercourse, fecundability is about 20% to 25%. This baseline number drops as maternal age increases.</li>
              <li><strong>Cumulative Probability Formula:</strong> To determine the chances of conceiving over multiple months, we use a cumulative probability formula: <code>1 - (1 - p)^n</code>, where 'p' is the monthly probability and 'n' is the number of months.</li>
              <li><strong>The Duration Effect:</strong> Statistics show that if a couple has been trying for more than 6-12 months without success, the monthly probability of natural conception decreases, as it becomes more likely that an underlying fertility issue is present.</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">What Your Results Actually Mean</h2>
            <p>
              The percentages provided by the calculator are statistical averages for a large population of healthy couples. You can effectively use this as your personal <strong>pregnancy chance calendar</strong> over the coming months. Here is a detailed breakdown of how to interpret your specific results:
            </p>
            <div className="space-y-6 mt-6">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Monthly Chance of Conception (Per Cycle)</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Even under perfect conditions—perfect timing, healthy sperm, healthy egg—human reproduction is relatively inefficient. A 20% monthly chance means that if 100 couples with your exact profile try to conceive this month, about 20 will be successful. This highlights why patience is crucial.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Within 6 Months</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  This is a critical milestone, especially for women over 35. If you have not conceived after 6 months of actively trying and you are 35 or older, it is the clinical recommendation to consult a reproductive endocrinologist.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Within 12 Months</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  For women under 35, the 12-month mark is the standard threshold for an infertility diagnosis. If you have been having regular, unprotected intercourse for a full year without success, you should seek medical evaluation.
                </p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-text-dark">The "Hidden" Factors</h3>
              <p className="text-sm leading-relaxed text-text-medium">
                This calculator assumes both partners are healthy. It does not account for male factor infertility (which accounts for up to 40% of infertility cases), conditions like PCOS or endometriosis, or lifestyle factors such as smoking, extreme stress, or being significantly over or underweight.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-text-dark">Improving Your Odds</h3>
              <p className="text-sm leading-relaxed text-text-medium">
                You can maximize your monthly probability by pinpointing your fertile window using OPKs or basal body temperature tracking. Having intercourse every other day during the 6 days leading up to ovulation ensures sperm are waiting when the egg is released.
              </p>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4 text-center">Expert Insight: When to Seek Help</h3>
            <p className="text-sm text-center max-w-2xl mx-auto leading-relaxed italic text-text-medium">
              "The general rule of thumb is to seek a fertility evaluation if you are under 35 and have been trying for a year, or if you are 35 or older and have been trying for six months. Do not let high statistical probabilities delay you from seeking help if you have crossed these timelines. Early intervention can often address underlying issues and help you achieve your goal of parenthood more quickly."
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
            <Tooltip content="Enter your current age to estimate your probability of conception based on statistical data." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Your Current Age</label>
            </Tooltip>
            <input 
              type="number" 
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              className="input-field"
            />
          </div>

          <div className="space-y-3">
            <Tooltip content="How many months have you been actively trying to conceive?" showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Months Trying</label>
            </Tooltip>
            <input 
              type="number" 
              value={monthsTrying}
              onChange={(e) => setMonthsTrying(parseInt(e.target.value))}
              className="input-field"
            />
          </div>
        </div>

        <button 
          onClick={calculate}
          className="btn-primary w-full text-lg"
        >
          Calculate My Chances
        </button>
      </div>
    </CalculatorLayout>
  );
}
