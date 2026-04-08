import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { motion } from 'motion/react';
import { AlertCircle, Info, CheckCircle2, ClipboardList, Sparkles, ShieldCheck, ArrowRight, Brain, Heart, Activity } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';

export default function PMDDScreener() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const symptomList = [
    { id: 'mood', label: 'Marked mood swings, sudden sadness', category: 'core', desc: 'Feeling suddenly sad or tearful, or increased sensitivity to rejection.' },
    { id: 'irritability', label: 'Marked irritability or anger', category: 'core', desc: 'Increased interpersonal conflicts, feeling "on edge" or easily annoyed.' },
    { id: 'anxiety', label: 'Marked anxiety or tension', category: 'core', desc: 'Feeling keyed up, anxious, or intensely stressed.' },
    { id: 'depression', label: 'Marked depressed mood, hopelessness', category: 'core', desc: 'Feeling down, hopeless, or self-deprecating thoughts.' },
    { id: 'interest', label: 'Decreased interest in usual activities', category: 'other', desc: 'Loss of interest in work, school, friends, or hobbies.' },
    { id: 'concentration', label: 'Difficulty concentrating', category: 'other', desc: 'Subjective feeling of difficulty in focusing or thinking clearly.' },
    { id: 'energy', label: 'Lethargy, easy fatigue', category: 'other', desc: 'Marked lack of energy or feeling easily tired.' },
    { id: 'appetite', label: 'Change in appetite, overeating', category: 'other', desc: 'Marked change in appetite, overeating, or specific food cravings.' },
    { id: 'sleep', label: 'Hypersomnia or insomnia', category: 'other', desc: 'Sleeping too much or difficulty falling/staying asleep.' },
    { id: 'overwhelmed', label: 'Feeling overwhelmed or out of control', category: 'other', desc: 'Subjective feeling of being overwhelmed or unable to cope.' },
    { id: 'physical', label: 'Breast tenderness, bloating, joint pain', category: 'other', desc: 'Physical symptoms such as breast tenderness or swelling, joint or muscle pain, a sensation of "bloating," or weight gain.' }
  ];

  const toggleSymptom = (id: string) => {
    setSymptoms(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const calculate = () => {
    setError(null);
    if (symptoms.length === 0) {
      setError("Please select at least one symptom to begin the screening.");
      return;
    }

    const coreSymptoms = symptomList.filter(s => s.category === 'core').map(s => s.id);
    const selectedCore = symptoms.filter(s => coreSymptoms.includes(s));
    const hasCore = selectedCore.length >= 1;
    const total = symptoms.length;
    
    // DSM-5 Criteria: At least 5 symptoms total, with at least 1 being a core symptom
    const meetsCriteria = hasCore && total >= 5;

    setResults({ 
      isLikely: meetsCriteria,
      total,
      coreCount: selectedCore.length
    });
  };

  const faqs = [
    { q: "What is PMDD?", a: "Premenstrual Dysphoric Disorder (PMDD) is a severe, sometimes disabling extension of premenstrual syndrome (PMS). It affects about 3-8% of women of reproductive age and is characterized by severe emotional and physical symptoms that interfere with daily life." },
    { q: "How is PMDD different from PMS?", a: "While PMS involves mild to moderate symptoms like bloating and irritability, PMDD involves extreme mood shifts that can disrupt work, damage relationships, and significantly impact quality of life. PMDD is classified as a clinical depressive disorder." },
    { q: "What is the DSM-5 criteria for PMDD?", a: "The DSM-5 requires at least five symptoms to be present in the final week before menses, starting to improve within a few days after the onset of menses, and becoming minimal or absent in the week post-menses. At least one symptom must be a 'core' emotional symptom (mood swings, irritability, anxiety, or depression)." },
    { q: "Can PMDD be treated?", a: "Yes. Treatments include lifestyle changes (exercise, diet), stress management, SSRIs (antidepressants), and hormonal birth control. Many women find significant relief with a combination of these approaches." }
  ];

  return (
    <CalculatorLayout
      title="PMDD Clinical Symptom Screener"
      description="Evaluate your symptoms against the DSM-5 clinical criteria for Premenstrual Dysphoric Disorder (PMDD). Get a professional-grade screening and guidance on next steps."
      intro="Premenstrual Dysphoric Disorder (PMDD) is a serious medical condition that goes far beyond typical PMS. This screener uses the official DSM-5 diagnostic criteria to help you determine if your premenstrual symptoms warrant a clinical evaluation. Understanding the nature of your symptoms is the first step toward reclaiming your quality of life."
      schema={[
        generateSoftwareAppSchema(
          "PMDD Clinical Screener", 
          "Clinical screening tool for PMDD based on DSM-5 criteria.", 
          "https://femhealth.com/pmdd-screener"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "PMDD Clinical Screener", item: "https://femhealth.com/pmdd-screener" }
        ])
      ]}
      faqs={faqs}
      howItWorks={
        <div className="space-y-4">
          <p>This screener is based on the Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition (DSM-5) criteria for PMDD. For a diagnosis, the following must be true:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Symptom Count:</strong> At least five symptoms must be present in the week before your period.</li>
            <li><strong>Core Symptom:</strong> At least one of those five must be a "core" emotional symptom (Mood Swings, Irritability, Anxiety, or Depression).</li>
            <li><strong>Timing:</strong> Symptoms must improve significantly within a few days after your period starts and be virtually absent in the week following your period.</li>
            <li><strong>Impact:</strong> The symptoms must cause significant distress or interference with work, school, social activities, or relationships.</li>
          </ul>
        </div>
      }
      relatedTools={[
        { name: "Period Symptom Tracker", path: "/period-symptom-tracker" },
        { name: "Hormone Balance Quiz", path: "/hormone-balance-quiz" },
        { name: "Endometriosis Risk Calculator", path: "/endometriosis-risk-calculator" }
      ]}
      medicalReferences={[
        {
          title: "Premenstrual Dysphoric Disorder (PMDD)",
          url: "https://www.hopkinsmedicine.org/health/conditions-and-diseases/premenstrual-dysphoric-disorder-pmdd",
          source: "Johns Hopkins"
        },
        {
          title: "Premenstrual Syndrome (PMS)",
          url: "https://www.acog.org/womens-health/faqs/premenstrual-syndrome-pms",
          source: "ACOG"
        },
        {
          title: "PMDD Symptoms and Treatment",
          url: "https://www.nhs.uk/mental-health/conditions/pms/",
          source: "NHS"
        },
        {
          title: "Premenstrual dysphoric disorder",
          url: "https://en.wikipedia.org/wiki/Premenstrual_dysphoric_disorder",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="space-y-8"
        >
          <div className={`p-10 rounded-[3rem] border text-center shadow-sm ${results.isLikely ? 'bg-rose-50 border-rose-100' : 'bg-emerald-50 border-emerald-100'}`}>
            <div className="flex justify-center mb-6">
              {results.isLikely ? (
                <Brain className="w-16 h-16 text-rose-500" />
              ) : (
                <ShieldCheck className="w-16 h-16 text-emerald-500" />
              )}
            </div>
            <p className="text-sm font-bold uppercase tracking-widest mb-2 text-text-medium">Screening Result</p>
            <h2 className={`text-4xl md:text-5xl font-serif font-bold ${results.isLikely ? 'text-rose-600' : 'text-emerald-600'}`}>
              {results.isLikely ? 'Clinical Criteria Met' : 'Criteria Not Fully Met'}
            </h2>
            <p className={`mt-4 font-medium ${results.isLikely ? 'text-rose-700' : 'text-emerald-700'}`}>
              {results.total} symptoms reported ({results.coreCount} core emotional symptoms)
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-primary-light space-y-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-bg-light text-primary rounded-xl shadow-inner">
                <ClipboardList className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-text-dark">What This Means For You</h3>
            </div>
            <p className="text-text-medium leading-relaxed text-lg">
              {results.isLikely 
                ? "Your reported symptoms align with the DSM-5 clinical criteria for Premenstrual Dysphoric Disorder (PMDD). This suggests that your experience goes beyond typical PMS and warrants a professional medical evaluation. PMDD is a highly treatable condition, and you do not have to suffer through these cycles alone." 
                : "While you are experiencing premenstrual symptoms, they do not fully meet the strict DSM-5 criteria for a PMDD diagnosis at this time. However, if these symptoms are causing you distress or interfering with your life, they are still valid and worth discussing with a healthcare provider."}
            </p>
          </div>

          <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
            <div className="space-y-2">
              <p className="text-sm text-amber-900 font-bold">Next Steps for Diagnosis:</p>
              <p className="text-sm text-amber-800 leading-relaxed italic">
                A formal diagnosis requires tracking your symptoms daily for at least two full menstrual cycles. We recommend using a symptom tracking app or a paper diary to document the severity of your symptoms each day. Bring this data to your doctor or a mental health professional who specializes in reproductive health.
              </p>
            </div>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Period Symptom Tracker.</p>
            </div>
            <Link to="/period-symptom-tracker" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Period Symptom Tracker &rarr;
            </Link>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-16">
          <section className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-4xl font-serif font-bold text-text-dark">The Biology of PMDD</h2>
              <p className="text-text-medium">PMDD is not caused by a "hormone imbalance" in the traditional sense. Most women with PMDD have normal hormone levels. Instead, it is thought to be an abnormal brain response to the normal fluctuations of estrogen and progesterone.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm space-y-4">
                <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600"><Brain className="w-6 h-6" /></div>
                <h3 className="text-xl font-bold text-text-dark">Serotonin Sensitivity</h3>
                <p className="text-sm text-text-medium leading-relaxed">Fluctuating hormones can trigger a drop in serotonin, a brain chemical that regulates mood, sleep, and pain sensitivity.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600"><Activity className="w-6 h-6" /></div>
                <h3 className="text-xl font-bold text-text-dark">GABA Response</h3>
                <p className="text-sm text-text-medium leading-relaxed">Progesterone metabolites interact with GABA receptors in the brain. In PMDD, this interaction can cause anxiety instead of calmness.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm space-y-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600"><Heart className="w-6 h-6" /></div>
                <h3 className="text-xl font-bold text-text-dark">Genetic Factors</h3>
                <p className="text-sm text-text-medium leading-relaxed">Research suggests a genetic component that makes some women's cells more sensitive to reproductive hormones.</p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-serif font-bold text-text-dark text-center">Management & Treatment Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-text-medium leading-relaxed">Managing PMDD often requires a multi-faceted approach. Here are the most common evidence-based treatments:</p>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0 mt-1"><Sparkles className="w-4 h-4" /></div>
                    <div>
                      <h4 className="font-bold text-text-dark">SSRIs (Antidepressants)</h4>
                      <p className="text-sm text-text-medium">Fluoxetine, sertraline, and paroxetine are often effective, sometimes taken only during the luteal phase.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0 mt-1"><Sparkles className="w-4 h-4" /></div>
                    <div>
                      <h4 className="font-bold text-text-dark">Hormonal Birth Control</h4>
                      <p className="text-sm text-text-medium">Certain pills (like those containing drospirenone) can help stabilize hormone fluctuations.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0 mt-1"><Sparkles className="w-4 h-4" /></div>
                    <div>
                      <h4 className="font-bold text-text-dark">Lifestyle & Supplements</h4>
                      <p className="text-sm text-text-medium">Calcium, Vitamin B6, and Magnesium supplements, along with regular exercise and stress reduction, can provide relief.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-bg-light p-10 rounded-[2.5rem] border border-primary/5 space-y-6">
                <h4 className="text-xl font-serif font-bold text-text-dark">The Importance of Tracking</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Because PMDD symptoms can mimic other mood disorders (like bipolar disorder or clinical depression), the "gold standard" for diagnosis is prospective daily tracking.
                </p>
                <div className="p-6 bg-white rounded-2xl border border-primary/10">
                  <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">What to Track</p>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-bold">Severity:</span> Rate each symptom on a scale of 1-4 daily.</p>
                    <p><span className="font-bold">Cycle Day:</span> Note when your period starts and ends.</p>
                    <p><span className="font-bold">Functioning:</span> Note if you missed work or avoided social events.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary-light/30 p-12 rounded-[3rem] border border-primary/10 text-center space-y-6">
            <h3 className="text-2xl font-serif font-bold text-text-dark">Expert Insight: Validation is the First Step</h3>
            <p className="text-sm leading-relaxed max-w-2xl mx-auto italic text-text-medium">
              "For many women, the most powerful moment in their PMDD journey is simply realizing that their symptoms have a name and a biological basis. You aren't 'crazy' or 'weak'—you are experiencing a severe physiological response to hormonal shifts. Once we validate that, we can begin the work of finding the right treatment for your unique body."
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
          <Tooltip content="Select all symptoms that you consistently experience in the week before your period starts. These should significantly improve once your period begins." showIcon>
            <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Select symptoms experienced in the week before your period:</label>
          </Tooltip>
          
          <div className="grid grid-cols-1 gap-4">
            {symptomList.map((item) => (
              <button 
                key={item.id} 
                onClick={() => toggleSymptom(item.id)} 
                className={`p-6 rounded-[1.5rem] border text-left transition-all flex items-start gap-4 ${symptoms.includes(item.id) ? 'bg-primary/5 border-primary shadow-sm' : 'bg-white border-border hover:border-primary-light'}`}
              >
                <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${symptoms.includes(item.id) ? 'bg-primary border-primary text-white' : 'border-border'}`}>
                  {symptoms.includes(item.id) && <CheckCircle2 className="w-4 h-4" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-text-dark text-base">{item.label}</p>
                    {item.category === 'core' && (
                      <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Core</span>
                    )}
                  </div>
                  <p className="text-sm text-text-medium mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <Tooltip content="Analyze your symptoms against the DSM-5 clinical criteria for PMDD.">
          <button 
            onClick={calculate} 
            className="btn-primary w-full py-5 text-xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
          >
            <Brain className="w-6 h-6" />
            Analyze My Symptoms
          </button>
        </Tooltip>
      </div>
    </CalculatorLayout>
  );
}
