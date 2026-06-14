import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema, validateNumber } from '../lib/calculators';
import { motion } from 'motion/react';
import { Info, Moon, Sun, Clock, Zap, Activity, Heart, AlertCircle, CheckCircle2, Sparkles, ArrowRight, Brain, Coffee, Baby } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';

export default function BabySleepSchedule() {
  const [age, setAge] = useState<number>(6); // Months
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const faqs = [
    { q: "What is the physiological basis for infant sleep requirements?", a: "Infant sleep is characterized by a higher proportion of REM (Rapid Eye Movement) sleep compared to adults, which is critical for neurogenesis and synaptic pruning. Newborns require 14-17 hours per 24-hour period, gradually decreasing as the central nervous system matures." },
    { q: "What is a 'wake window' from a clinical perspective?", a: "A wake window represents the duration an infant can sustain wakefulness before homeostatic sleep pressure (the accumulation of adenosine in the brain) exceeds their tolerance. Exceeding this window leads to an overactive sympathetic nervous system (a 'cortisol spike'), making sleep onset more difficult." },
    { q: "When does circadian rhythm consolidation occur?", a: "Neonates lack a mature circadian rhythm, resulting in fragmented, around-the-clock sleep. Endogenous melatonin production and cortisol regulation typically begin to consolidate between 8 and 12 weeks of age, leading to longer nocturnal sleep periods." },
    { q: "How can I establish healthy sleep hygiene for my infant?", a: "Consistent pre-sleep routines (e.g., dim lighting, white noise, feeding) act as environmental cues (zeitgebers) that signal the brain to initiate sleep. Establishing these routines early supports the development of healthy, independent sleep associations." }
  ];

  const calculate = () => {
    setError(null);
    const ageError = validateNumber(age, 0, 24, "Baby's age");
    if (ageError) {
      setError(ageError);
      return;
    }

    let totalSleep = "14-17";
    let naps = "3-5";
    let wakeWindow = "45-90 mins";
    let schedule = "Neonatal sleep is polyphasic and driven by feeding needs rather than circadian rhythms. Sleep occurs in short, frequent bursts.";

    if (age >= 18) {
      totalSleep = "11-14";
      naps = "1";
      wakeWindow = "5-6 hours";
      schedule = "Consolidated nocturnal sleep with a single, restorative afternoon nap. Bedtime is typically between 7:00 PM and 8:00 PM.";
    } else if (age >= 12) {
      totalSleep = "11-14";
      naps = "1-2";
      wakeWindow = "3-4 hours";
      schedule = "Transitioning from a biphasic to a monophasic daytime sleep pattern. The morning nap is typically dropped around 14-15 months.";
    } else if (age >= 9) {
      totalSleep = "12-14";
      naps = "2";
      wakeWindow = "2.5-3.5 hours";
      schedule = "Established biphasic daytime sleep (e.g., mid-morning and early afternoon naps) with consolidated nocturnal sleep.";
    } else if (age >= 6) {
      totalSleep = "12-15";
      naps = "2-3";
      wakeWindow = "2-3 hours";
      schedule = "Transitioning from three to two naps. Circadian rhythms are well-established, allowing for longer nocturnal sleep stretches.";
    } else if (age >= 4) {
      totalSleep = "12-15";
      naps = "3-4";
      wakeWindow = "1.5-2.5 hours";
      schedule = "Sleep architecture matures, and the '4-month sleep regression' may occur as sleep cycles become more adult-like.";
    } else if (age >= 2) {
      totalSleep = "14-16";
      naps = "4-5";
      wakeWindow = "1-2 hours";
      schedule = "Maternal melatonin clears, and endogenous circadian rhythms begin to emerge. Day/night confusion typically resolves.";
    }

    setResults({ totalSleep, naps, wakeWindow, schedule });
  };

  return (
    <CalculatorLayout
      title="Clinical Infant Sleep & Wake Window Guide | Baby Sleep Schedule"
      description="Understand your baby sleep schedule needs, wake windows, and sample schedules. Expert guidance on infant sleep hygiene and baby growth percentiles."
      intro="Sleep is a critical physiological process essential for infant neurodevelopment, physical growth, and emotional regulation. However, infant sleep architecture changes rapidly in the first two years. This clinical tool provides evidence-based recommendations to build your <strong>baby sleep schedule</strong>, outlining sleep duration and 'wake windows' based on your infant's developmental stage. This can be used alongside a <strong>baby growth percentile</strong> chart to track overall well-being."
      schema={[
        generateSoftwareAppSchema(
          "Clinical Baby Sleep Schedule Guide", 
          "Calculate baby sleep needs and wake windows by age based on pediatric guidelines.", 
          "https://hernexa.com/baby-sleep-schedule"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://hernexa.com" },
          { name: "Tools", item: "https://hernexa.com/tools" },
          { name: "Baby Sleep Schedule", item: "https://hernexa.com/baby-sleep-schedule" }
        ])
      ]}
      faqs={faqs}
      howItWorks={
        <div className="space-y-4">
          <p>This guide provides age-appropriate sleep recommendations based on pediatric sleep research and neurodevelopmental milestones:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Total Sleep Requirement:</strong> The cumulative hours of sleep (naps + nocturnal sleep) required in a 24-hour period for optimal physiological function.</li>
            <li><strong>Homeostatic Wake Windows:</strong> The critical period of sustained wakefulness before sleep pressure exceeds tolerance. Managing these windows prevents sympathetic nervous system overactivation (over-tiredness).</li>
            <li><strong>Daytime Sleep Architecture (Naps):</strong> The typical frequency of daytime sleep sessions as the central nervous system matures and sleep consolidates.</li>
          </ul>
        </div>
      }
      relatedTools={[
        { name: "Baby Growth Percentile", path: "/baby-growth-percentile" },
        { name: "Baby Size Comparator", path: "/baby-size-comparator" },
        { name: "Solid Food Timeline", path: "/solid-food-timeline" }
      ]}
      medicalReferences={[
        {
          title: "Infant Sleep",
          url: "https://www.aap.org/en/patient-care/safe-sleep/",
          source: "AAP"
        },
        {
          title: "Helping Your Baby Sleep",
          url: "https://www.nhs.uk/conditions/baby/caring-for-a-newborn/helping-your-baby-to-sleep/",
          source: "NHS"
        },
        {
          title: "Baby Sleep Basics",
          url: "https://www.mayoclinic.org/healthy-lifestyle/infant-and-toddler-health/in-depth/baby-sleep/art-20045014",
          source: "Mayo Clinic"
        },
        {
          title: "Infant sleep training",
          url: "https://en.wikipedia.org/wiki/Infant_sleep_training",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="space-y-8"
        >
          <div className="bg-indigo-50 border border-indigo-100 p-10 rounded-[3rem] text-center space-y-6 shadow-sm">
            <div className="flex justify-center mb-4 text-indigo-500">
              <Moon className="w-16 h-16" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-2">Recommended Daily Sleep</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-indigo-900">
              {results.totalSleep} Hours
            </h2>
            <p className="text-indigo-700 font-medium max-w-lg mx-auto leading-relaxed">
              For a {age}-month-old, this typically includes <strong>{results.naps}</strong> daytime naps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-indigo-100 flex items-center gap-6 shadow-sm">
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl shadow-inner"><Clock className="w-8 h-8" /></div>
              <div>
                <p className="text-xs text-indigo-600 uppercase font-bold tracking-wider">Wake Window</p>
                <p className="text-2xl font-bold text-indigo-900">{results.wakeWindow}</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-indigo-100 flex items-center gap-6 shadow-sm">
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl shadow-inner"><Sun className="w-8 h-8" /></div>
              <div>
                <p className="text-xs text-indigo-600 uppercase font-bold tracking-wider">Typical Naps</p>
                <p className="text-2xl font-bold text-indigo-900">{results.naps} Per Day</p>
              </div>
            </div>
          </div>

          <div className="bg-bg-light p-8 rounded-[2rem] border border-border flex items-start gap-6 shadow-sm">
            <div className="p-3 bg-primary/10 text-primary rounded-xl shadow-sm">
              <Activity className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-text-dark">Clinical Schedule Insight</h3>
              <p className="text-sm text-text-medium mt-2 leading-relaxed">
                {results.schedule}
              </p>
            </div>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Baby Growth Percentile.</p>
            </div>
            <a href="/baby-growth-percentile" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Baby Growth Percentile &rarr;
            </a>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">The Clinical Science of Infant Sleep</h2>
            <p>
              Infant sleep architecture is fundamentally different from adult sleep. Babies have shorter sleep cycles (approximately 45-50 minutes) and spend a significantly higher proportion of time in REM (Rapid Eye Movement) sleep, which is critical for synaptogenesis, neurodevelopment, and memory consolidation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">Sleep Regressions</h4>
                <p className="text-sm text-text-medium leading-relaxed">Commonly observed at 4, 8, and 12 months. Clinically, these are often "progressions" linked to major developmental leaps, such as motor skill acquisition (crawling, walking) or cognitive bursts.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">Circadian Rhythm</h4>
                <p className="text-sm text-text-medium leading-relaxed">Infants are not born with an established 24-hour circadian clock. It begins to develop around 6-8 weeks and is typically established by 4 months, driven by light exposure and feeding cues.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">Melatonin Production</h4>
                <p className="text-sm text-text-medium leading-relaxed">Endogenous melatonin production begins around 3-4 months of age. This hormonal shift is a key factor in the consolidation of nighttime sleep and the establishment of a predictable bedtime.</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Establishing a Healthy Sleep Routine</h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-text-dark">Monitor Sleep Cues</h4>
                  <p className="text-sm text-text-medium">Rubbing eyes, pulling ears, yawning, or a glazed expression are physiological indicators that the homeostatic sleep drive is peaking and the wake window is closing.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-text-dark">Optimize the Environment</h4>
                  <p className="text-sm text-text-medium">A cool (68-72°F), dark, and quiet room is ideal. Continuous white noise can mask environmental sounds and mimic the acoustic environment of the womb.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-bold text-text-dark">Consistency Over Perfection</h4>
                  <p className="text-sm text-text-medium">Adhere to a consistent sequence of events before sleep. This predictability reduces anxiety, lowers cortisol levels, and conditions the brain for sleep onset.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10 text-center">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4">Expert Insight: The "Drowsy But Awake" Goal</h3>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed text-text-medium italic">
              "The goal of putting a baby down 'drowsy but awake' is to help them learn the skill of falling asleep independently. If they fall asleep in your arms and wake up in a crib, it's like you falling asleep in your bed and waking up on the front lawn—it's startling and leads to more frequent night wakings."
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

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Tooltip content="Select your baby's age in months to see their specific sleep needs." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Baby's Age (Months)</label>
              </Tooltip>
              <div className="flex items-center gap-2">
                <Baby className="w-5 h-5 text-primary" />
                <span className="text-primary font-bold text-xl">{age} Months</span>
              </div>
            </div>
            <input 
              type="range" 
              min="0" 
              max="24" 
              value={age} 
              onChange={(e) => setAge(Number(e.target.value))} 
              className="w-full h-3 bg-primary-light rounded-full appearance-none cursor-pointer accent-primary" 
            />
            <div className="flex justify-between text-[10px] text-text-medium font-bold uppercase tracking-widest">
              <span>Newborn</span>
              <span>1 Year</span>
              <span>2 Years</span>
            </div>
          </div>
        </div>

        <button 
          onClick={calculate} 
          className="btn-primary w-full py-5 text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
        >
          <Moon className="w-5 h-5" />
          See Sleep Recommendations
        </button>
      </div>
    </CalculatorLayout>
  );
}
