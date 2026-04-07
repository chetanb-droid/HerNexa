import { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { motion } from 'motion/react';
import { Sparkles, Info, Droplets, Search, CheckCircle2, AlertCircle, Calendar, Activity } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';

export default function CervicalMucusTracker() {
  const [type, setType] = useState<string>('dry');
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    let fertility = 'Low';
    let description = 'Dry or sticky mucus is common after your period and is not considered fertile. Sperm cannot easily travel through this type of fluid.';
    let color = 'text-text-medium';
    let bgColor = 'bg-neutral-50';
    let borderColor = 'border-neutral-200';

    if (type === 'creamy') {
      fertility = 'Moderate';
      description = 'Creamy mucus is a sign that your estrogen levels are rising and your fertile window is approaching. It is possible to conceive, but not the peak time.';
      color = 'text-blue-600';
      bgColor = 'bg-blue-50';
      borderColor = 'border-blue-100';
    } else if (type === 'watery') {
      fertility = 'High';
      description = 'Watery mucus is highly fertile. It is clear, thin, and slippery, allowing sperm to swim easily toward the egg.';
      color = 'text-primary';
      bgColor = 'bg-primary/5';
      borderColor = 'border-primary/10';
    } else if (type === 'eggwhite') {
      fertility = 'Peak';
      description = 'Egg-white cervical mucus (EWCM) is the most fertile type. It is clear and stretchy (can stretch several inches between fingers), indicating ovulation is imminent or occurring.';
      color = 'text-primary';
      bgColor = 'bg-primary/10';
      borderColor = 'border-primary/20';
    }
    setResults({ fertility, description, color, bgColor, borderColor });
  };

  const faqs = [
    { q: "What is cervical mucus?", a: "Cervical mucus is a fluid produced by the cervix that changes in consistency throughout your menstrual cycle due to hormonal shifts, specifically estrogen." },
    { q: "How do I check my cervical mucus?", a: "You can check by wiping with clean white toilet paper before urinating, or by using clean fingers to observe the color and consistency of the fluid at the vaginal opening." },
    { q: "When is the best time to check?", a: "Check several times a day, as consistency can change. Avoid checking immediately after intercourse, as arousal fluid and semen can be mistaken for fertile mucus." },
    { q: "What is EWCM?", a: "EWCM stands for Egg-White Cervical Mucus. It is clear, slippery, and stretchy, resembling raw egg whites. It is the most fertile type of cervical fluid." }
  ];

  return (
    <CalculatorLayout
      title="Cervical Mucus Fertility Tracker"
      description="Track and interpret changes in your cervical fluid to identify your most fertile days and peak conception window."
      intro="Your cervical mucus is one of the most reliable physical indicators of your fertility status. By observing its changes in color and consistency, you can pinpoint your fertile window and optimize your chances of conception. This tracker helps you interpret your observations based on the Billings Ovulation Method."
      schema={[
        generateSoftwareAppSchema("Cervical Mucus Tracker", "Analyze cervical fluid for fertility tracking", "https://femhealth.com/cervical-mucus-tracker"),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Cervical Mucus Tracker", item: "https://femhealth.com/cervical-mucus-tracker" }
        ])
      ]}
      faqs={faqs}
      howItWorks={
        <div className="space-y-4">
          <p>Cervical mucus changes in response to rising estrogen levels as you approach ovulation. These changes are designed to help sperm survive and travel through the reproductive tract:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Estrogen Rise:</strong> As an egg matures, estrogen increases, causing the cervix to produce more fluid.</li>
            <li><strong>Consistency Shift:</strong> The fluid goes from thick and dry to thin, slippery, and stretchy.</li>
            <li><strong>Sperm Survival:</strong> Fertile mucus (watery or egg-white) provides a protective, nutrient-rich environment for sperm, allowing them to live for up to 5 days.</li>
          </ul>
        </div>
      }
      relatedTools={[
        { name: "BBT Analyzer", path: "/bbt-analyzer" },
        { name: "Ovulation Calculator", path: "/ovulation-calculator" },
        { name: "Fertility Window Calculator", path: "/fertility-window-calculator" }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="space-y-6"
        >
          <div className={`p-10 rounded-[2.5rem] border text-center shadow-sm ${results.bgColor} ${results.borderColor}`}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-text-medium">Current Fertility Status</p>
            <h2 className={`text-5xl md:text-6xl font-serif font-bold ${results.color}`}>
              {results.fertility}
            </h2>
            {results.fertility === 'Peak' && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-primary font-bold flex items-center justify-center gap-2 mt-4 text-lg"
              >
                <Sparkles className="w-6 h-6" />
                Peak Conception Window!
              </motion.p>
            )}
          </div>
          
          <div className="bg-white p-8 rounded-3xl border border-primary/10 flex items-start gap-5 shadow-sm">
            <div className={`p-3 rounded-2xl ${results.bgColor} ${results.color} shrink-0`}>
              <Info className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-text-dark">Interpretation</h4>
              <p className="text-sm text-text-medium leading-relaxed">{results.description}</p>
            </div>
          </div>

          {results.fertility !== 'Low' && (
            <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <p className="text-sm text-emerald-800 font-medium">
                This is a great time to try for a baby! Having intercourse during {results.fertility.toLowerCase()} fertility days significantly increases your chances.
              </p>
            </div>
          )}
        </motion.div>
      )}
      richContent={
        <div className="space-y-16">
          <section className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-4xl font-serif font-bold text-text-dark">The Science of Cervical Fluid</h2>
              <p className="text-text-medium">Understanding the biological purpose of cervical mucus can help you track your cycle more effectively.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-text-dark">Sperm Transport</h3>
                <p className="text-sm text-text-medium leading-relaxed">
                  Without fertile mucus, the vagina is naturally acidic and hostile to sperm. Fertile mucus (watery and egg-white) is alkaline, protecting sperm and providing "channels" that guide them through the cervix and into the fallopian tubes.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-text-dark">Hormonal Feedback</h3>
                <p className="text-sm text-text-medium leading-relaxed">
                  Cervical mucus is a direct reflection of your estrogen levels. As your body prepares to release an egg, estrogen peaks, leading to the "Peak" egg-white consistency. After ovulation, progesterone rises, causing the mucus to dry up almost immediately.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-serif font-bold text-text-dark text-center">How to Check Your Mucus</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Wash Hands",
                  desc: "Always start with clean, dry hands to prevent infection."
                },
                {
                  step: "2",
                  title: "Wipe or Reach",
                  desc: "Wipe the vaginal opening with white toilet paper or gently insert a clean finger to reach the cervix."
                },
                {
                  step: "3",
                  title: "Observe",
                  desc: "Look at the color and feel the texture. Try stretching it between your thumb and index finger."
                }
              ].map((item) => (
                <div key={item.step} className="bg-bg-light p-6 rounded-2xl border border-primary/5 text-center space-y-3">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto font-bold shadow-sm">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-text-dark">{item.title}</h4>
                  <p className="text-xs text-text-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[3rem] border border-primary/10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                <Search className="w-10 h-10" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-bold text-text-dark">What to Look For</h3>
                <p className="text-text-medium leading-relaxed">
                  When analyzing your results, focus on two main qualities: <strong>Sensation</strong> and <strong>Appearance</strong>. Fertile mucus feels "wet" or "slippery" even if you can't see much. Peak mucus looks like raw egg whites and is clear and stretchy. If you feel dry, you are likely in a non-fertile phase.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Common Factors That Affect Mucus</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Dehydration can make mucus thicker and less abundant.",
                "Certain medications (like antihistamines) can dry up cervical fluid.",
                "Breastfeeding often leads to drier cervical mucus due to lower estrogen.",
                "Vaginal infections can change the color and smell of discharge.",
                "Semen and arousal fluid can be mistaken for fertile mucus.",
                "PCOS can cause multiple patches of fertile-looking mucus."
              ].map((fact, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-100 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <p className="text-sm text-text-medium">{fact}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-text-dark text-white p-12 rounded-[3rem] text-center space-y-6">
            <h3 className="text-2xl font-serif font-bold">Expert Tip: The Billings Method</h3>
            <p className="max-w-2xl mx-auto text-white/80 leading-relaxed italic">
              "The Billings Ovulation Method teaches that the most fertile day is the last day of 'slippery' sensation. This is called the 'Peak Day.' Ovulation usually occurs within 24 hours of this peak. Tracking this sensation is often more accurate than just looking at the mucus."
            </p>
          </section>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-text-medium uppercase tracking-[0.2em]">Select Mucus Consistency</label>
            <Tooltip content="Choose the consistency that best matches what you are observing today." showIcon />
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              { id: 'dry', label: 'Dry / Sticky', desc: 'Crumbly, thick, or no visible mucus. Feels dry at the opening.' },
              { id: 'creamy', label: 'Creamy', desc: 'Like lotion or milk, white or yellow. Not stretchy.' },
              { id: 'watery', label: 'Watery', desc: 'Clear, thin, and slippery. Feels very wet.' },
              { id: 'eggwhite', label: 'Egg-white (EWCM)', desc: 'Clear, slippery, and very stretchy (like raw egg whites).' }
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => {
                  setType(item.id);
                  setResults(null);
                }} 
                className={`p-6 rounded-3xl border-2 text-left transition-all group ${
                  type === item.id 
                    ? 'bg-primary/5 border-primary shadow-md' 
                    : 'bg-white border-neutral-100 hover:border-primary/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className={`font-bold text-lg ${type === item.id ? 'text-primary' : 'text-text-dark'}`}>{item.label}</p>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    type === item.id ? 'border-primary bg-primary text-white' : 'border-neutral-200'
                  }`}>
                    {type === item.id && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </div>
                <p className="text-sm text-text-medium leading-relaxed">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={calculate} 
          className="btn-primary w-full py-5 text-xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
        >
          <Activity className="w-6 h-6" />
          Analyze Fertility Status
        </button>

        <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[10px] text-amber-800 leading-relaxed italic">
            Note: This tool is for educational purposes. If you notice unusual discharge, odor, or itching, please consult a healthcare provider to rule out infection.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
