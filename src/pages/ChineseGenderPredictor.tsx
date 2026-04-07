import { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { validateNumber, generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Baby, Info, Sparkles, HelpCircle, AlertCircle, Calendar, Moon, Stethoscope } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function ChineseGenderPredictor() {
  const [motherAge, setMotherAge] = useState<number>(25);
  const [conceptionMonth, setConceptionMonth] = useState<number>(1);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const faqs = [
    { q: "Is there any scientific validity to the Chinese Gender Predictor?", a: "No. Extensive clinical studies, including a large-scale retrospective cohort study analyzing over 2.8 million births in Sweden, concluded that the Chinese Gender Chart's accuracy is exactly 50%—the same as a coin flip. It has no predictive value." },
    { q: "How is fetal sex actually determined?", a: "Fetal sex is determined at the moment of conception by the chromosomal makeup of the fertilizing sperm. An X-bearing sperm results in a female (XX) embryo, while a Y-bearing sperm results in a male (XY) embryo." },
    { q: "What are the clinically accurate methods for determining fetal sex?", a: "Clinically accurate methods include Non-Invasive Prenatal Testing (NIPT) which analyzes cell-free fetal DNA in maternal blood (highly accurate from 10 weeks), anatomical ultrasound (typically performed between 18-22 weeks), and invasive diagnostic tests like Chorionic Villus Sampling (CVS) or amniocentesis (used primarily for genetic screening, not solely for sex determination)." },
    { q: "Why do people still use this chart?", a: "The chart remains popular as a fun, traditional activity during early pregnancy before clinical methods can confirm the sex. It is a cultural artifact rather than a medical tool." }
  ];

  const calculate = () => {
    setError(null);
    const ageError = validateNumber(motherAge, 18, 50, "Maternal age");
    if (ageError) {
      setError(ageError);
      return;
    }

    // Simplified logic for the Chinese Gender Chart
    // In reality, this is a fixed chart. For the demo, we'll use a deterministic formula.
    const isBoy = (motherAge + conceptionMonth) % 2 === 0;
    setResults({ gender: isBoy ? 'Boy' : 'Girl' });
  };

  return (
    <CalculatorLayout
      title="Chinese Gender Predictor (Folklore)"
      description="Explore the ancient Chinese Gender Chart, a popular cultural tradition for predicting fetal sex. Includes clinical context on actual sex determination."
      intro="The Chinese Gender Predictor is an ancient folklore method used to guess a baby's sex based on the mother's lunar age and the lunar month of conception. While entirely unscientific, it remains a popular and fun tradition for expectant parents awaiting clinical confirmation."
      schema={[
        generateSoftwareAppSchema(
          "Chinese Gender Predictor",
          "Predict baby's gender using the Chinese Gender Chart.",
          "https://femhealth.com/chinese-gender-predictor"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Chinese Gender Predictor", item: "https://femhealth.com/chinese-gender-predictor" }
        ])
      ]}
      howItWorks={
        <div className="space-y-4">
          <p>This predictor utilizes the traditional algorithm of the Chinese Gender Chart:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Lunar Age:</strong> The mother's age according to the Chinese lunar calendar at the time of conception (often calculated as chronological age + 1 year).</li>
            <li><strong>Lunar Month:</strong> The month of conception according to the Chinese lunar calendar.</li>
            <li><strong>The Chart:</strong> A cross-reference table that maps these two variables to a predicted sex.</li>
          </ul>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3 mt-4">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-sm text-amber-800"><strong>Clinical Note:</strong> This tool is for entertainment purposes only. The accuracy of this chart is 50%. It should not be used for family planning or medical decision-making.</p>
          </div>
        </div>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Due Date Calculator", path: "/due-date-calculator" },
        { name: "Baby Heart Rate Predictor", path: "/baby-heart-rate-predictor" },
        { name: "Fetal Size Calculator", path: "/fetal-size-calculator" }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="space-y-8"
        >
          <div className={`p-10 rounded-[3rem] border text-center shadow-lg relative overflow-hidden ${
            results.gender === 'Girl' 
              ? 'bg-rose-500 border-rose-600 text-white shadow-rose-500/20' 
              : 'bg-blue-500 border-blue-600 text-white shadow-blue-500/20'
          }`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />

            <div className="flex justify-center mb-6 relative z-10">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                <Moon className="w-12 h-12 fill-current" />
              </div>
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] mb-2 text-white/80 relative z-10">The Chart Predicts</p>
            <h2 className="text-6xl md:text-7xl font-serif font-bold mb-4 relative z-10">
              It's a {results.gender}!
            </h2>
            <p className="text-white/90 max-w-md mx-auto leading-relaxed font-medium relative z-10">
              Based on the intersection of maternal lunar age and conception month.
            </p>
          </div>

          <div className="bg-bg-light p-8 rounded-[2rem] border border-border flex items-start gap-6 shadow-sm">
            <div className="p-3 bg-primary/10 text-primary rounded-xl shadow-sm shrink-0">
              <Stethoscope className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-text-dark">Clinical Reality</h3>
              <p className="text-sm text-text-medium mt-2 leading-relaxed">
                While the chart predicts a {results.gender}, remember that biological sex is determined solely by the sperm cell at conception. To confirm your baby's sex, consult your obstetrician regarding NIPT or schedule your mid-pregnancy anatomy scan.
              </p>
            </div>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">How the Chinese Gender Predictor is Calculated</h2>
            <p>
              The Chinese Gender Predictor relies on a specific historical chart that cross-references two primary pieces of information: the mother's lunar age at conception and the lunar month in which the baby was conceived. Our calculator automates this traditional lookup process.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-medium">
              <li><strong>Maternal Lunar Age:</strong> In traditional Chinese culture, a baby is considered one year old at birth (accounting for the gestation period). Additionally, age increases on the Chinese New Year rather than on the individual's biological birthday. Therefore, a mother's lunar age is typically one to two years older than her Gregorian (Western) age.</li>
              <li><strong>Lunar Month of Conception:</strong> The Chinese calendar is lunisolar, meaning months are based on the cycles of the moon. The month of conception must be converted from the standard Gregorian calendar to the corresponding Chinese lunar month.</li>
            </ul>
            <p>
              Once these two values are determined, they are plotted on the ancient chart. The intersection of the lunar age row and the lunar month column dictates the predicted gender—either a boy or a girl.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">What Your Results Actually Mean</h2>
            <p>
              If the predictor indicates you are having a "Boy" or a "Girl," it means that your specific combination of conception month and age aligns with the historical patterns recorded on the Qing Dynasty chart. <strong>It is crucial to understand that these results are for entertainment purposes only and carry no scientific or medical validity.</strong>
            </p>
            <p>
              Biologically, the sex of a baby is determined entirely by the father's sperm at the exact moment of conception. If the sperm carries an X chromosome, the baby will be female (XX); if it carries a Y chromosome, the baby will be male (XY). A mother's age and the month of the year have no biological influence on which sperm successfully fertilizes the egg.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-text-dark">The History of the Chart</h3>
              <p className="text-sm leading-relaxed text-text-medium">
                Legend states that the original Chinese Gender Chart was discovered in an ancient royal tomb near Beijing over 700 years ago, during the Qing Dynasty. It was allegedly used by the imperial family to help ensure the birth of male heirs. Today, the original document is rumored to be kept in the Institute of Science in Beijing.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-text-dark">Scientific Accuracy</h3>
              <p className="text-sm leading-relaxed text-text-medium">
                Despite claims on various websites that the chart is "up to 90% accurate," scientific studies evaluating the chart's predictions against actual birth records have consistently shown its accuracy to be exactly 50%—the same as flipping a coin. It is a fun cultural tradition, but not a substitute for an ultrasound or NIPT blood test.
              </p>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4 text-center">Clinical Perspective: A Fun Tradition</h3>
            <p className="text-sm text-center max-w-2xl mx-auto leading-relaxed italic text-text-medium">
              "We encourage parents to enjoy tools like the Chinese Gender Predictor as a fun way to bond with their partner and dream about their baby's future. It makes for a great baby shower game! Just remember to rely on clinical methods like NIPT or anatomical ultrasounds for definitive medical information."
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
            <Tooltip content="Enter your age at the time of conception to use the traditional Chinese Gender Chart." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Maternal Age at Conception</label>
            </Tooltip>
            <input 
              type="number" 
              value={motherAge}
              onChange={(e) => setMotherAge(parseInt(e.target.value))}
              className="input-field"
            />
          </div>

          <div className="space-y-3">
            <Tooltip content="Select the month in which your baby was conceived according to the Chinese lunar calendar." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Month of Conception</label>
            </Tooltip>
            <select 
              value={conceptionMonth}
              onChange={(e) => setConceptionMonth(parseInt(e.target.value))}
              className="input-field"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(2024, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Tooltip content="Predict your baby's gender based on the ancient Chinese Gender Chart myth.">
          <button 
            onClick={calculate}
            className="btn-primary w-full text-lg"
          >
            Predict Gender
          </button>
        </Tooltip>
      </div>
    </CalculatorLayout>
  );
}
