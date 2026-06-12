import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { AlertCircle, CheckCircle2, Info, Activity, ClipboardList, Thermometer } from 'lucide-react';
import { validateNumber, generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import Tooltip from '../components/ui/Tooltip';

export default function MenopauseChecker() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [age, setAge] = useState<number>(45);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const symptomList = [
    { id: 'hot', label: 'Hot flashes or night sweats', desc: 'Sudden feelings of warmth, usually most intense over the face, neck and chest.' },
    { id: 'sleep', label: 'Sleep problems (Insomnia)', desc: 'Difficulty falling asleep or staying asleep.' },
    { id: 'mood', label: 'Mood changes', desc: 'Irritability, anxiety, or depressive symptoms.' },
    { id: 'irregular', label: 'Irregular periods', desc: 'Changes in the frequency or flow of your menstrual cycle.' },
    { id: 'dryness', label: 'Vaginal dryness', desc: 'Discomfort during intercourse or general dryness.' },
    { id: 'weight', label: 'Weight gain', desc: 'Particularly around the abdomen, even with no change in diet.' }
  ];

  const faqs = [
    { q: "At what age does menopause usually start?", a: "The average age for menopause is 51, but perimenopause symptoms can start in your early to mid-40s." },
    { q: "How long does perimenopause last?", a: "The average length of perimenopause is 4 years, but it can last anywhere from a few months to 10 years." },
    { q: "What treatments are available?", a: "Hormone replacement therapy (HRT), lifestyle changes, and non-hormonal medications can help manage symptoms effectively." }
  ];

  const toggleSymptom = (id: string) => {
    setSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const calculate = () => {
    setError(null);
    const ageError = validateNumber(age, 30, 80, 'Age');
    if (ageError) {
      setError(ageError);
      return;
    }

    if (symptoms.length === 0) {
      setError("Please select at least one symptom to assess your stage.");
      return;
    }

    const score = symptoms.length;
    let stage = 'Pre-menopause';
    let message = 'You are likely in the pre-menopause stage. However, if you are experiencing symptoms, it is always best to consult a doctor.';
    
    if (age >= 45 && score >= 3) {
      stage = 'Perimenopause';
      message = 'Your age and symptoms are highly suggestive of perimenopause. This is the transition period leading up to menopause.';
    } else if (age >= 52 && symptoms.includes('irregular')) {
      stage = 'Menopause Transition';
      message = 'You are likely in the menopause transition phase. If you have gone 12 consecutive months without a period, you have reached menopause.';
    }

    setResults({ stage, message, score });
  };

  return (
    <CalculatorLayout
      title="Menopause Test Online | Menopause Age Calculator UK"
      description="Take our free menopause test online to check your symptoms. Use our menopause age calculator and menopause checker to understand your transition."
      intro="Menopause is a natural biological process, but the transition can be challenging. Our <strong>menopause checker</strong> acts as a comprehensive <strong>menopause test online</strong> to help you identify where you are in your journey. Find out if you are experiencing perimenopause by using our <strong>menopause age calculator</strong>, which analyzes common symptoms like hot flashes, sleep issues, and cycle changes."
      schema={[
        generateSoftwareAppSchema(
          "Menopause Symptom Checker",
          "Assess menopause stage based on symptoms.",
          "https://femhealth.com/menopause-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Menopause Symptom Checker", item: "https://femhealth.com/menopause-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>The transition to menopause typically happens in three stages:</p>
          <ul>
            <li><strong>Perimenopause:</strong> The years leading up to menopause when hormones begin to fluctuate.</li>
            <li><strong>Menopause:</strong> Reached when you have gone 12 consecutive months without a menstrual period.</li>
            <li><strong>Postmenopause:</strong> The years following menopause.</li>
            <li><strong>Note:</strong> This tool is a screening aid. A formal diagnosis is based on your medical history and symptoms.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Period Calculator", path: "/period-calculator" },
        { name: "Cycle Length Calculator", path: "/cycle-length-calculator" },
        { name: "PCOS Symptom Checker", path: "/pcos-calculator" }
      ]}
      results={results && (
        <div className="space-y-8">
          <div className="bg-rose-500 p-10 rounded-[3rem] border border-rose-600 text-center shadow-lg shadow-rose-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
            
            <p className="text-rose-100 font-bold uppercase tracking-widest text-sm relative z-10 mb-2">Your Likely Stage</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white relative z-10">
              {results.stage}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl border border-primary-light space-y-4">
            <div className="flex items-center gap-3">
              <Thermometer className="w-6 h-6 text-accent" />
              <h3 className="font-bold text-text-dark">Assessment Summary</h3>
            </div>
            <p className="text-text-medium leading-relaxed">
              {results.message}
            </p>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800 leading-relaxed italic">
              Important: This tool is for informational purposes only. Only a qualified medical professional can diagnose menopause through physical exams and medical history.
            </p>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Period Calculator.</p>
            </div>
            <Link to="/period-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Period Calculator &rarr;
            </Link>
          </div>
        </div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">How We Assess Your Menopause Stage</h2>
            <p>
              Menopause is not a sudden event, but a gradual biological transition. Our checker uses a clinical algorithm based on the STRAW (Stages of Reproductive Aging Workshop) criteria, which is the gold standard used by gynecologists to evaluate reproductive aging. The assessment relies on two primary data points:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-text-medium">
              <li><strong>Age as a Baseline:</strong> While menopause can happen earlier, the average age of onset is 51. The algorithm uses your age to establish a baseline probability. For example, symptoms in a 35-year-old are more likely related to other endocrine issues, whereas the same symptoms in a 48-year-old strongly suggest perimenopause.</li>
              <li><strong>Symptom Clustering:</strong> We analyze the specific combination and number of symptoms you select. Vasomotor symptoms (hot flashes, night sweats) combined with cycle irregularity are the hallmark clinical signs of the menopausal transition. The algorithm calculates a "score" based on the presence of these key indicators.</li>
              <li><strong>The 12-Month Rule:</strong> The algorithm strictly adheres to the medical definition of menopause: it is only officially diagnosed retroactively, after you have gone 12 consecutive months without a menstrual period.</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">What Your Results Actually Mean</h2>
            <p>
              The result provided is a preliminary assessment of where you likely fall on the reproductive aging timeline. Here is a detailed breakdown of what each stage signifies:
            </p>
            <div className="space-y-6 mt-6">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Pre-menopause</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  <strong>What it means:</strong> You are in your reproductive years. Your hormone levels (estrogen and progesterone) are generally stable, and your menstrual cycles are likely regular.
                  <br /><br />
                  <strong>Next Steps:</strong> If you are experiencing symptoms like hot flashes or irregular periods but are under 40, it is crucial to consult a doctor. These could be signs of Premature Ovarian Insufficiency (POI), thyroid dysfunction, or other conditions that require medical attention.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Perimenopause</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  <strong>What it means:</strong> You have entered the transitional phase. Your ovaries are beginning to produce less estrogen, and the levels are fluctuating erratically. This fluctuation is what causes the classic symptoms: hot flashes, mood swings, and sleep disturbances. Your periods may become heavier, lighter, closer together, or further apart. This stage can last anywhere from 4 to 10 years.
                  <br /><br />
                  <strong>Next Steps:</strong> You can still get pregnant during perimenopause. If you are struggling with symptoms, this is the time to discuss management options with your doctor, including lifestyle changes, non-hormonal medications, or Menopausal Hormone Therapy (MHT/HRT).
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Menopause Transition / Postmenopause</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  <strong>What it means:</strong> If you have gone 12 full months without a period, you have officially reached menopause. You are now in the "postmenopause" stage for the rest of your life. Your ovaries have stopped releasing eggs and produce very little estrogen.
                  <br /><br />
                  <strong>Next Steps:</strong> While vasomotor symptoms (hot flashes) often subside in postmenopause, the lack of estrogen increases your risk for osteoporosis and cardiovascular disease. Your medical focus should shift toward bone health, heart health, and managing genitourinary symptoms (like vaginal dryness).
                </p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-text-dark">The Role of Blood Tests</h3>
              <p className="text-sm leading-relaxed text-text-medium">
                Many women ask for a blood test to "prove" they are in menopause. While doctors can test Follicle-Stimulating Hormone (FSH) and estradiol levels, these hormones fluctuate wildly during perimenopause. A single blood draw is often inconclusive. This is why clinical diagnosis relies heavily on your age and the specific symptoms you track in tools like this one.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-text-dark">When to See a Doctor</h3>
              <p className="text-sm leading-relaxed text-text-medium">
                You should never assume irregular bleeding is "just menopause." If you experience bleeding after sex, bleeding between periods, or any bleeding after you have been period-free for 12 months, you must see a gynecologist immediately to rule out endometrial hyperplasia or cancer.
              </p>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4 text-center">Expert Insight: You Don't Have to Suffer</h3>
            <p className="text-sm text-center max-w-2xl mx-auto leading-relaxed italic text-text-medium">
              "For generations, women were told to just 'tough it out' through the menopausal transition. Modern medicine strongly disagrees. If hot flashes are ruining your sleep, or vaginal dryness is causing pain, there are highly effective, safe treatments available. Use this symptom checker to validate what you are feeling, print the results, and take them to your doctor to start a proactive conversation about your quality of life."
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
        <div className="space-y-6">
          <div className="space-y-3">
            <Tooltip content="Enter your current age to help determine your likely stage of the menopause transition." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Your Current Age</label>
            </Tooltip>
            <input 
              type="number" 
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              className="input-field"
            />
          </div>

          <div className="space-y-4">
            <Tooltip content="Select all the symptoms you are currently experiencing to evaluate your menopause stage." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Select the symptoms you are experiencing:</label>
            </Tooltip>
            <div className="grid grid-cols-1 gap-4">
              {symptomList.map((s) => (
                <button 
                  key={s.id}
                  onClick={() => toggleSymptom(s.id)}
                  className={`p-6 rounded-[1.5rem] border text-left transition-all flex items-start gap-4 ${symptoms.includes(s.id) ? 'bg-primary/5 border-primary shadow-sm' : 'bg-white border-border hover:border-primary-light'}`}
                >
                  <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${symptoms.includes(s.id) ? 'bg-primary border-primary text-white' : 'border-border'}`}>
                    {symptoms.includes(s.id) && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-bold text-text-dark text-base">{s.label}</p>
                    <p className="text-sm text-text-medium mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <Tooltip content="Analyze your age and symptoms to identify your current stage in the menopause journey.">
          <button 
            onClick={calculate}
            className="btn-primary w-full text-lg"
          >
            Check My Stage
          </button>
        </Tooltip>
      </div>
    </CalculatorLayout>
  );
}
