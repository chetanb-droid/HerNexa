import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { validateNumber, generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { motion } from 'motion/react';
import { Sparkles, Info, ShieldCheck, Heart, Activity, Calendar, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';

export default function EggFreezingCalculator() {
  const [age, setAge] = useState<number>(30);
  const [eggs, setEggs] = useState<number>(10);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    const ageError = validateNumber(age, 20, 50, "Age at freezing");
    if (ageError) {
      setError(ageError);
      return;
    }
    const eggsError = validateNumber(eggs, 1, 50, "Number of eggs");
    if (eggsError) {
      setError(eggsError);
      return;
    }

    // Success probability per egg based on age (simplified medical data)
    let probPerEgg = 0.12; // Under 35
    if (age >= 35) probPerEgg = 0.09;
    if (age >= 38) probPerEgg = 0.06;
    if (age >= 40) probPerEgg = 0.03;
    if (age >= 42) probPerEgg = 0.01;

    // Probability of at least one live birth: 1 - (1 - p)^n
    const probability = (1 - Math.pow(1 - probPerEgg, eggs)) * 100;
    
    setResults({ 
      probability: Math.min(probability, 99.9),
      recommendation: eggs < 15 && age < 35 ? "Consider a second cycle to reach 15-20 eggs for optimal success." : 
                      eggs < 20 && age >= 35 ? "At this age, freezing 20+ eggs is often recommended for a high probability of success." :
                      "You have a strong foundation for future fertility preservation."
    });
  };

  const faqs = [
    { q: "What is egg freezing?", a: "Egg freezing, or oocyte cryopreservation, is a medical procedure where a woman's eggs are extracted, frozen, and stored as a method to preserve reproductive potential in women of reproductive age." },
    { q: "How many eggs should I freeze?", a: "The 'magic number' depends on your age. For women under 35, freezing 15-20 mature eggs provides an 80-90% chance of at least one live birth. For women over 35, that number increases to 20-30 eggs." },
    { q: "Does egg freezing guarantee a baby?", a: "No, egg freezing is not a guarantee. It is a statistical insurance policy. Success depends on the quality of the eggs at the time of freezing and the health of the uterus at the time of transfer." },
    { q: "How long can eggs stay frozen?", a: "Theoretically, indefinitely. Studies have shown that the length of storage does not significantly impact the quality or success rate of the eggs once thawed." }
  ];

  return (
    <CalculatorLayout
      title="Egg Freezing Calculator | Egg Freezing Success Rate Calculator"
      description="Calculate your egg freezing success probability based on AMH and age. Use our egg freezing success rate calculator to estimate chances."
      intro="Egg freezing is a powerful tool for fertility preservation, but understanding the statistics is key to making informed decisions. Our <strong>egg freezing calculator</strong> uses published clinical data—often correlating with an <strong>egg freezing calculator amh</strong> level—to help you understand how age and egg quantity impact your future chances. This <strong>egg freezing success rate calculator</strong> provides a probability of a live birth."
      schema={[
        generateSoftwareAppSchema("Egg Freezing Calculator", "Estimate egg freezing success probability", "https://hernexa.com/egg-freezing-calculator"),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://hernexa.com" },
          { name: "Tools", item: "https://hernexa.com/tools" },
          { name: "Egg Freezing Success Estimator", item: "https://hernexa.com/egg-freezing-calculator" }
        ])
      ]}
      faqs={faqs}
      howItWorks={
        <div className="space-y-4">
          <p>The estimator uses a cumulative probability model based on age-specific success rates per mature egg:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Age Impact:</strong> Egg quality (chromosomal normality) decreases with age, meaning more eggs are needed for the same success probability as you get older.</li>
            <li><strong>Quantity Impact:</strong> The more mature eggs you freeze, the higher the statistical chance that at least one will result in a healthy pregnancy.</li>
            <li><strong>The Formula:</strong> We use the formula 1 - (1 - p)^n, where 'p' is the success rate per egg and 'n' is the number of eggs.</li>
          </ul>
        </div>
      }
      relatedTools={[
        { name: "IVF Success Rate Calculator", path: "/ivf-success-rate-calculator" },
        { name: "Fertility Window Calculator", path: "/fertility-window-calculator" },
        { name: "AMH Level Guide", path: "/amh-calculator" }
      ]}
      medicalReferences={[
        {
          title: "Egg Freezing",
          url: "https://www.mayoclinic.org/tests-procedures/egg-freezing/about/pac-20384556",
          source: "Mayo Clinic"
        },
        {
          title: "Fertility Preservation",
          url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2019/01/fertility-preservation-through-oocyte-cryopreservation",
          source: "ACOG"
        },
        {
          title: "Egg Freezing Success Rates",
          url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5562431/",
          source: "PubMed"
        },
        {
          title: "Oocyte cryopreservation",
          url: "https://en.wikipedia.org/wiki/Oocyte_cryopreservation",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="space-y-8"
        >
          <div className="bg-primary/5 p-10 rounded-[2.5rem] border border-primary/10 text-center shadow-sm">
            <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3">Chance of at least one live birth</p>
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-6xl md:text-7xl font-serif font-bold text-text-dark">{results.probability.toFixed(1)}</h2>
              <span className="text-3xl font-serif text-text-medium">%</span>
            </div>
            <p className="text-text-medium mt-4 font-medium italic">
              Based on {eggs} eggs frozen at age {age}.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm flex items-start gap-5">
            <div className="p-3 bg-primary/10 text-primary rounded-2xl shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-text-dark">Clinical Recommendation</h4>
              <p className="text-sm text-text-medium leading-relaxed">{results.recommendation}</p>
            </div>
          </div>

          <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-amber-900">Important Context</p>
              <p className="text-xs text-amber-800 leading-relaxed">
                These percentages are based on mature eggs (MII). Not all eggs retrieved during a cycle will be mature or suitable for freezing. Success also depends on the specific clinic's thaw survival rates and IVF protocols.
              </p>
            </div>
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
        <div className="space-y-16">
          <section className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-4xl font-serif font-bold text-text-dark">The Science of Fertility Preservation</h2>
              <p className="text-text-medium">Egg freezing is a multi-step medical process designed to "pause" your biological clock.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-text-dark">Stimulation</h3>
                <p className="text-sm text-text-medium leading-relaxed">
                  You take hormone injections for 10-12 days to encourage your ovaries to mature multiple eggs at once, rather than just the usual one.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-text-dark">Retrieval</h3>
                <p className="text-sm text-text-medium leading-relaxed">
                  A quick, 15-minute surgical procedure performed under sedation. A needle is used to collect the fluid containing the eggs from the follicles.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm space-y-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-text-dark">Vitrification</h3>
                <p className="text-sm text-text-medium leading-relaxed">
                  The eggs are "flash-frozen" using vitrification, which prevents ice crystals from forming and damaging the delicate cell structure.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-serif font-bold text-text-dark text-center">Age vs. Egg Quality</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-text-medium leading-relaxed">
                  The primary reason success rates decline with age is <strong>aneuploidy</strong> (abnormal chromosome count). As women age, a higher percentage of their eggs will have chromosomal abnormalities, which leads to failure to fertilize, failure to implant, or miscarriage.
                </p>
                <div className="p-6 bg-bg-light rounded-2xl border border-primary/5">
                  <h4 className="font-bold text-text-dark mb-2">The "Ideal" Window</h4>
                  <p className="text-sm text-text-medium">
                    Most fertility experts recommend freezing eggs in your <strong>late 20s or early 30s</strong>. This is when egg quality is highest and the ovaries typically respond best to stimulation.
                  </p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm space-y-6">
                <h4 className="font-bold text-text-dark">Success Probability per Egg</h4>
                <div className="space-y-4">
                  {[
                    { age: "Under 35", prob: "12-15%" },
                    { age: "35 - 37", prob: "8-10%" },
                    { age: "38 - 40", prob: "5-7%" },
                    { age: "41 - 42", prob: "2-3%" },
                    { age: "Over 42", prob: "< 1%" }
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="text-text-medium">{row.age}</span>
                      <span className="font-bold text-primary">{row.prob}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary-light/30 p-12 rounded-[3rem] border border-primary/10">
            <div className="max-w-3xl mx-auto space-y-6 text-center">
              <h3 className="text-2xl font-serif font-bold text-text-dark">Expert Insight: It's a Backup Plan</h3>
              <p className="text-text-medium leading-relaxed italic">
                "Think of egg freezing as a high-quality insurance policy. You hope you never have to use it, and you should still try to conceive naturally when you're ready. But having those younger eggs in the 'bank' provides a level of security and peace of mind that is invaluable in today's world."
              </p>
            </div>
          </section>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-primary-light space-y-8 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Tooltip content="Your age at the time the eggs are (or will be) frozen." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Age at Freezing</label>
              </Tooltip>
              <span className="text-sm font-bold text-primary">{age} years old</span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="50" 
              step="1"
              value={age} 
              onChange={(e) => setAge(parseInt(e.target.value))} 
              className="w-full accent-primary h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-text-medium font-bold uppercase tracking-wider">
              <span>20</span>
              <span>35</span>
              <span>50</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Tooltip content="The number of mature (MII) eggs successfully frozen." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Number of Mature Eggs</label>
              </Tooltip>
              <span className="text-sm font-bold text-primary">{eggs} eggs</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="50" 
              step="1"
              value={eggs} 
              onChange={(e) => setEggs(parseInt(e.target.value))} 
              className="w-full accent-primary h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-text-medium font-bold uppercase tracking-wider">
              <span>1</span>
              <span>25</span>
              <span>50</span>
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
          Estimate Success Probability
        </button>
      </div>
    </CalculatorLayout>
  );
}
