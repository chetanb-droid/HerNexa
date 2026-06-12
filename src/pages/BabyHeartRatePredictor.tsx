import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { validateNumber, generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { motion } from 'motion/react';
import { Heart, Info, Baby, Sparkles, Activity, AlertCircle, CheckCircle2, Scale, Stethoscope } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';

export default function BabyHeartRatePredictor() {
  const [heartRate, setHeartRate] = useState<number>(140);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    const hrError = validateNumber(heartRate, 100, 200, "Fetal heart rate");
    if (hrError) {
      setError(hrError);
      return;
    }

    // The myth: > 140 = Girl, < 140 = Boy
    const prediction = heartRate >= 140 ? 'Girl' : 'Boy';
    setResults({ 
      prediction,
      probability: "50%", // It's a coin flip
      description: heartRate >= 140 
        ? "According to the old wives' tale, a faster heart rate (140+ BPM) suggests you're carrying a girl." 
        : "According to the old wives' tale, a slower heart rate (under 140 BPM) suggests you're carrying a boy."
    });
  };

  const faqs = [
    { q: "Is there any clinical validity to the fetal heart rate gender prediction?", a: "No. Extensive clinical studies, including large-scale retrospective analyses of sonographic data, have conclusively demonstrated no statistically significant correlation between baseline fetal heart rate and fetal sex at any gestational age." },
    { q: "What is the normal physiological range for a fetal heart rate?", a: "The baseline fetal heart rate (FHR) typically ranges from 110 to 160 beats per minute (BPM) in a healthy, term fetus. The rate is generally higher in the first trimester (peaking around 170 BPM at 9-10 weeks) and gradually decreases as the parasympathetic nervous system matures." },
    { q: "What factors actually influence fetal heart rate?", a: "Fetal heart rate is highly dynamic and responds to fetal movement (accelerations), sleep cycles, maternal activity, maternal fever, and gestational age. It is a key indicator of fetal autonomic nervous system function and oxygenation, not sex." },
    { q: "How is fetal sex accurately determined clinically?", a: "Fetal sex is determined genetically at conception. Clinically, it can be identified via Non-Invasive Prenatal Testing (NIPT) analyzing cell-free fetal DNA in maternal blood (as early as 10 weeks), or via anatomical ultrasound (typically between 18-22 weeks)." }
  ];

  return (
    <CalculatorLayout
      title="Fetal Heart Rate Gender Myth Predictor | Is it a Boy or Girl Test"
      description="Explore the popular folklore connecting fetal heart rate to gender. Try our is it a boy or girl test based on the heart rate myth and learn clinical facts."
      intro="One of the most enduring pregnancy myths suggests that a fetal heart rate above 140 BPM indicates a female, while a rate below 140 BPM indicates a male. While this tool acts as a fun <strong>is it a boy or girl test</strong> based on the folklore, we also provide the clinical context regarding what fetal heart rate actually signifies."
      schema={[
        generateSoftwareAppSchema("Fetal Heart Rate Predictor", "Predict baby gender based on heart rate myth", "https://femhealth.com/baby-heart-rate-predictor"),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Heart Rate Predictor", item: "https://femhealth.com/baby-heart-rate-predictor" }
        ])
      ]}
      faqs={faqs}
      howItWorks={
        <div className="space-y-4">
          <p>This predictor applies the traditional folklore logic, which has no basis in modern obstetrics:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>The Folklore Premise:</strong> The myth posits that female fetuses have a higher metabolic rate, resulting in a faster baseline heart rate.</li>
            <li><strong>The Arbitrary Threshold:</strong> The traditional cutoff used in this myth is 140 beats per minute (BPM).</li>
            <li><strong>The Calculation:</strong> ≥ 140 BPM = Predicted Girl; &lt; 140 BPM = Predicted Boy.</li>
          </ul>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3 mt-4">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-sm text-amber-800"><strong>Clinical Note:</strong> This tool is for entertainment purposes only. Fetal heart rate is an indicator of fetal well-being, not sex. The accuracy of this prediction is exactly 50%.</p>
          </div>
        </div>
      }
      relatedTools={[
        { name: "Chinese Gender Predictor", path: "/chinese-gender-predictor" },
        { name: "Baby Size Comparator", path: "/baby-size-comparator" },
        { name: "Due Date Calculator", path: "/due-date-calculator" }
      ]}
      medicalReferences={[
        {
          title: "Fetal Heart Rate and Gender",
          url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4919244/",
          source: "PubMed"
        },
        {
          title: "Fetal Heart Rate Monitoring",
          url: "https://www.acog.org/womens-health/faqs/fetal-heart-rate-monitoring-during-labor",
          source: "ACOG"
        },
        {
          title: "Prenatal Care: Second Trimester",
          url: "https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-care/art-20044581",
          source: "Mayo Clinic"
        },
        {
          title: "Fetal heart rate",
          url: "https://en.wikipedia.org/wiki/Cardiotocography",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="space-y-8"
        >
          <div className={`p-10 rounded-[3rem] border text-center shadow-lg relative overflow-hidden ${
            results.prediction === 'Girl' 
              ? 'bg-rose-500 border-rose-600 text-white shadow-rose-500/20' 
              : 'bg-blue-500 border-blue-600 text-white shadow-blue-500/20'
          }`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />

            <div className="flex justify-center mb-6 relative z-10">
              {results.prediction === 'Girl' ? (
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Heart className="w-10 h-10 fill-current" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Baby className="w-10 h-10" />
                </div>
              )}
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] mb-2 text-white/80 relative z-10">Folklore Prediction</p>
            <h2 className="text-6xl md:text-7xl font-serif font-bold mb-4 relative z-10">
              {results.prediction}
            </h2>
            <p className="text-white/90 max-w-md mx-auto leading-relaxed font-medium relative z-10">
              {results.description}
            </p>
          </div>

          <div className="bg-bg-light p-8 rounded-[2rem] border border-border flex items-start gap-6 shadow-sm">
            <div className="p-3 bg-primary/10 text-primary rounded-xl shadow-sm shrink-0">
              <Stethoscope className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-text-dark">Clinical Reality</h3>
              <p className="text-sm text-text-medium mt-2 leading-relaxed">
                While it's fun to guess, a fetal heart rate of {heartRate} BPM is simply a reflection of your baby's current activity level and neurological development, not their sex. Both male and female fetuses exhibit heart rates across the entire normal spectrum (110-160 BPM).
              </p>
            </div>
          </div>


          <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-amber-900">Clinical Reality Check</p>
              <p className="text-xs text-amber-800 leading-relaxed">
                While this is a fun tradition, remember that fetal heart rate changes constantly based on the baby's movement and gestational age. The only reliable ways to determine gender are via NIPT blood tests (analyzing cell-free DNA), anatomy ultrasounds, or invasive testing like CVS or amniocentesis.
              </p>
            </div>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Chinese Gender Predictor.</p>
            </div>
            <Link to="/chinese-gender-predictor" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Chinese Gender Predictor &rarr;
            </Link>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-16">
          <section className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-4xl font-serif font-bold text-text-dark">Myth vs. Clinical Science</h2>
              <p className="text-text-medium">Why does this myth persist, and what does the obstetric research actually demonstrate?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-border shadow-sm space-y-4">
                <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-text-dark">The Origin of the Folklore</h3>
                <p className="text-sm text-text-medium leading-relaxed">
                  The idea likely stems from the observation that adult females generally have slightly higher resting heart rates than adult males. This physiological difference was incorrectly extrapolated to fetal development.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-border shadow-sm space-y-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-text-dark">The Evidence-Based Reality</h3>
                <p className="text-sm text-text-medium leading-relaxed">
                  Multiple large-scale retrospective cohort studies have analyzed thousands of sonograms. The consensus is clear: there is no statistically significant difference in the baseline fetal heart rate between male and female fetuses at any point during gestation.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-serif font-bold text-text-dark text-center">Physiological Determinants of Fetal Heart Rate</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  title: "Gestational Age", 
                  desc: "The FHR begins around 90-110 BPM at 6 weeks, peaks at 170-180 BPM around 9-10 weeks, and gradually decreases as the parasympathetic nervous system matures, settling between 110-160 BPM at term.",
                  icon: <Activity className="w-5 h-5" />
                },
                { 
                  title: "Fetal State", 
                  desc: "FHR is highly responsive to fetal movement (accelerations) and sleep-wake cycles. A healthy fetus will show variability in their heart rate, indicating an intact autonomic nervous system.",
                  icon: <Baby className="w-5 h-5" />
                },
                { 
                  title: "Maternal Physiology", 
                  desc: "Maternal factors such as fever, dehydration, anxiety, or the ingestion of certain medications or caffeine can temporarily elevate the fetal heart rate.",
                  icon: <Heart className="w-5 h-5" />
                }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-bg-light rounded-2xl border border-border space-y-3 shadow-sm">
                  <div className="text-primary">{item.icon}</div>
                  <h4 className="font-bold text-text-dark">{item.title}</h4>
                  <p className="text-xs text-text-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-border space-y-8 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Tooltip content="Enter the fetal heart rate in beats per minute (BPM) as measured by a clinical Doppler or ultrasound." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Fetal Heart Rate (BPM)</label>
              </Tooltip>
              <span className="text-sm font-bold text-primary">{heartRate} BPM</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="200" 
              step="1"
              value={heartRate} 
              onChange={(e) => setHeartRate(parseInt(e.target.value))} 
              className="w-full accent-primary h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-text-medium font-bold uppercase tracking-wider">
              <span>100 BPM</span>
              <span>150 BPM</span>
              <span>200 BPM</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-medium">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        <button 
          onClick={calculate} 
          className="btn-primary w-full py-5 text-xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
        >
          <Activity className="w-6 h-6" />
          Predict Gender
        </button>
      </div>
    </CalculatorLayout>
  );
}
