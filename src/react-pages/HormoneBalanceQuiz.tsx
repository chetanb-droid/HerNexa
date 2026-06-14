import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Activity, AlertCircle, Info, ShieldCheck, Heart, Sparkles, ArrowRight, ClipboardList, Search, Thermometer, Wind, Moon, Zap, Brain, Droplets } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function HormoneBalanceQuiz() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [stressLevel, setStressLevel] = useState<number>(5);
  const [sleepQuality, setSleepQuality] = useState<number>(5);
  const [results, setResults] = useState<any>(null);

  const faqs = [
    { q: "What are the signs of hormonal imbalance?", a: "Common signs include irregular periods, unexplained weight gain, chronic fatigue, adult acne, thinning hair, and significant mood swings." },
    { q: "What causes hormonal imbalance?", a: "Causes include chronic stress (high cortisol), poor diet, lack of restorative sleep, and underlying conditions like PCOS, thyroid issues, or perimenopause." },
    { q: "How can I balance my hormones naturally?", a: "Focus on a nutrient-dense diet, consistent sleep hygiene, regular movement, and stress management techniques like meditation or breathwork." },
    { q: "When should I see a doctor?", a: "If your symptoms are interfering with your daily life, it's time to see a healthcare provider for a comprehensive hormone panel (blood, saliva, or urine testing)." }
  ];

  const symptomOptions = [
    { id: 'irregular_periods', label: 'Irregular or heavy periods', icon: <Droplets className="w-4 h-4" /> },
    { id: 'weight_gain', label: 'Unexplained weight gain', icon: <Activity className="w-4 h-4" /> },
    { id: 'fatigue', label: 'Chronic fatigue or low energy', icon: <Zap className="w-4 h-4" /> },
    { id: 'acne', label: 'Adult acne or skin issues', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'mood_swings', label: 'Mood swings or irritability', icon: <Brain className="w-4 h-4" /> },
    { id: 'hair_loss', label: 'Thinning hair or hair loss', icon: <Wind className="w-4 h-4" /> },
    { id: 'insomnia', label: 'Difficulty sleeping or insomnia', icon: <Moon className="w-4 h-4" /> },
    { id: 'libido', label: 'Low libido or sexual dysfunction', icon: <Heart className="w-4 h-4" /> },
    { id: 'brain_fog', label: 'Brain fog or poor concentration', icon: <Search className="w-4 h-4" /> },
    { id: 'cravings', label: 'Intense sugar or salt cravings', icon: <Activity className="w-4 h-4" /> }
  ];

  const toggleSymptom = (id: string) => {
    setSymptoms(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const calculate = () => {
    const symptomScore = symptoms.length;
    const totalScore = symptomScore + (stressLevel / 2) + ((10 - sleepQuality) / 2);
    
    let balance = 'Balanced';
    let message = "Your symptoms do not strongly suggest a hormonal imbalance. However, if you feel something is off, please consult a professional.";
    let color = 'text-success';
    let bgColor = 'bg-success/5';
    let borderColor = 'border-success/10';

    if (totalScore >= 10) {
      balance = 'Significant Imbalance';
      message = "Your results suggest a significant pattern of hormonal imbalance. This may involve multiple systems (e.g., cortisol, estrogen, and thyroid). A comprehensive medical evaluation is highly recommended.";
      color = 'text-rose-600';
      bgColor = 'bg-rose-50';
      borderColor = 'border-rose-100';
    } else if (totalScore >= 5) {
      balance = 'Potential Imbalance';
      message = "Your symptoms suggest a potential hormonal imbalance. This could be related to stress, diet, or early shifts in your cycle. Monitoring these symptoms and discussing them with a provider is a good next step.";
      color = 'text-amber-600';
      bgColor = 'bg-amber-50';
      borderColor = 'border-amber-100';
    }

    setResults({ balance, message, color, bgColor, borderColor, totalScore: totalScore.toFixed(1) });
  };

  return (
    <CalculatorLayout
      title="Hormone Balance Assessment Quiz"
      description="Identify potential signs of hormonal imbalance based on common physical and emotional symptoms. Expert guidance on hormonal health for women."
      intro="Hormones are your body's chemical messengers, regulating everything from your metabolism and sleep to your mood and reproductive health. When they are out of sync, it can feel like your whole body is working against you. This quiz helps you identify patterns that may suggest an underlying hormonal imbalance."
      schema={[
        generateSoftwareAppSchema(
          "Hormone Balance Quiz",
          "Identify potential signs of hormonal imbalance.",
          "https://hernexa.com/hormone-balance-quiz"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://hernexa.com" },
          { name: "Tools", item: "https://hernexa.com/tools" },
          { name: "Hormone Balance Quiz", item: "https://hernexa.com/hormone-balance-quiz" }
        ])
      ]}
      howItWorks={
        <>
          <p>The Hormone Balance Quiz evaluates three primary pillars of hormonal health:</p>
          <ul>
            <li><strong>Symptom Patterns:</strong> We analyze physical and emotional indicators like cycle regularity, skin health, and energy levels.</li>
            <li><strong>Stress Load:</strong> Cortisol (the stress hormone) can "steal" resources from other hormones like progesterone, leading to imbalances.</li>
            <li><strong>Sleep Quality:</strong> Most hormonal regulation happens during deep sleep. Poor sleep is both a cause and a symptom of imbalance.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "PMDD Screener", path: "/pmdd-screener" },
        { name: "Endometriosis Risk", path: "/endometriosis-risk-calculator" },
        { name: "PCOS Screener", path: "/pcos-calculator" }
      ]}
      medicalReferences={[
        {
          title: "Hormonal Imbalance",
          url: "https://my.clevelandclinic.org/health/diseases/22673-hormonal-imbalance",
          source: "Cleveland Clinic"
        },
        {
          title: "Women's Health: Hormones",
          url: "https://www.endocrine.org/patient-engagement/endocrine-library/hormones-and-womens-health",
          source: "Endocrine Society"
        },
        {
          title: "Hormone Replacement Therapy",
          url: "https://www.nhs.uk/conditions/hormone-replacement-therapy-hrt/",
          source: "NHS"
        },
        {
          title: "Hormonal imbalance",
          url: "https://en.wikipedia.org/wiki/Hormonal_imbalance",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className={`${results.bgColor} ${results.borderColor} p-10 rounded-[2.5rem] border text-center shadow-sm`}>
            <div className={`flex justify-center mb-4 ${results.color}`}>
              <Activity className="w-12 h-12" />
            </div>
            <p className={`${results.color} font-bold uppercase tracking-widest text-xs mb-2`}>Hormonal Status Assessment</p>
            <h2 className={`text-4xl md:text-5xl font-serif font-bold ${results.color}`}>
              {results.balance}
            </h2>
            <p className="text-text-medium mt-4 max-w-lg mx-auto leading-relaxed text-lg">{results.message}</p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-primary-light flex items-start gap-6 shadow-sm">
            <div className="p-3 bg-primary-light/20 text-primary rounded-xl shadow-sm">
              <ClipboardList className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-text-dark">Analysis Details</h3>
              <p className="text-text-medium mt-2 leading-relaxed">
                Your calculated imbalance score is <strong>{results.totalScore}</strong>. This score accounts for your reported symptoms, stress levels, and sleep quality.
              </p>
            </div>
          </div>

          <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-4">
            <Info className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
            <p className="text-sm text-amber-800 leading-relaxed italic">
              <strong>Note:</strong> This quiz is a screening tool, not a diagnostic test. Hormonal health is complex and requires clinical testing (blood, saliva, or urine) for a definitive diagnosis.
            </p>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our PMDD Screener.</p>
            </div>
            <a href="/pmdd-screener" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              PMDD Screener &rarr;
            </a>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">The Pillars of Hormonal Health</h2>
            <p>
              Hormonal balance isn't a static state; it's a dynamic equilibrium influenced by your environment, lifestyle, and life stage.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">The Gut-Hormone Axis</h4>
                <p className="text-sm text-text-medium leading-relaxed">Your gut microbiome (the "estrobolome") helps metabolize and clear excess estrogen from your body.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">Blood Sugar Stability</h4>
                <p className="text-sm text-text-medium leading-relaxed">Insulin spikes can trigger the ovaries to produce excess testosterone, leading to issues like PCOS and acne.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">The Cortisol Connection</h4>
                <p className="text-sm text-text-medium leading-relaxed">Chronic stress can lead to "progesterone steal," where your body uses progesterone to make more cortisol.</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">How to Support Your Hormones</h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-text-dark">Eat for Your Cycle</h4>
                  <p className="text-sm text-text-medium">Focus on cruciferous vegetables (broccoli, kale) to support estrogen detox and healthy fats (avocado, seeds) for hormone production.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-text-dark">Prioritize Circadian Rhythm</h4>
                  <p className="text-sm text-text-medium">Get sunlight in your eyes within 30 minutes of waking to set your cortisol and melatonin timers for the day.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-bold text-text-dark">Reduce Endocrine Disruptors</h4>
                  <p className="text-sm text-text-medium">Minimize exposure to BPA, phthalates, and parabens found in plastics and some personal care products, as these can mimic estrogen.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10 text-center">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4">Expert Insight: Listen to Your Body</h3>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed text-text-medium italic">
              "Symptoms like heavy periods or chronic fatigue are your body's way of communicating that something is out of balance. They aren't just 'part of being a woman.' When we address the root cause—whether it's stress, nutrition, or gut health—the symptoms often resolve themselves."
            </p>
          </section>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="space-y-6">
          <p className="text-xs font-bold text-text-medium uppercase tracking-[0.15em] mb-4">Select symptoms you experience regularly:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {symptomOptions.map((item) => (
              <button 
                key={item.id} 
                onClick={() => toggleSymptom(item.id)} 
                className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 shadow-sm ${symptoms.includes(item.id) ? 'bg-primary border-primary text-white shadow-primary/20' : 'bg-white border-neutral-200 text-text-medium hover:border-primary'}`}
              >
                <div className={`p-2 rounded-lg ${symptoms.includes(item.id) ? 'bg-white/20' : 'bg-primary-light/20 text-primary'}`}>
                  {item.icon}
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-neutral-100">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Tooltip content="How much stress have you been under in the last 3 months?" showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Daily Stress Level</label>
              </Tooltip>
              <span className="text-primary font-bold">{stressLevel}/10</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={stressLevel} 
              onChange={(e) => setStressLevel(Number(e.target.value))} 
              className="w-full accent-primary h-2 bg-primary-light rounded-lg appearance-none cursor-pointer" 
            />
            <div className="flex justify-between text-[10px] text-text-medium uppercase tracking-wider font-bold">
              <span>Zen</span>
              <span>Burnout</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Tooltip content="How well do you sleep on average? (1 = Poor, 10 = Excellent)" showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Average Sleep Quality</label>
              </Tooltip>
              <span className="text-primary font-bold">{sleepQuality}/10</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={sleepQuality} 
              onChange={(e) => setSleepQuality(Number(e.target.value))} 
              className="w-full accent-primary h-2 bg-primary-light rounded-lg appearance-none cursor-pointer" 
            />
            <div className="flex justify-between text-[10px] text-text-medium uppercase tracking-wider font-bold">
              <span>Restless</span>
              <span>Restorative</span>
            </div>
          </div>
        </div>

        <button 
          onClick={calculate} 
          className="btn-primary w-full py-5 text-lg shadow-xl shadow-primary/20"
        >
          Analyze My Hormone Balance
        </button>
      </div>
    </CalculatorLayout>
  );
}
