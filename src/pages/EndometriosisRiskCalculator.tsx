import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { motion } from 'motion/react';
import { Info, AlertCircle, ShieldCheck, Activity, Heart, Sparkles, ArrowRight, ClipboardList } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';

export default function EndometriosisRiskCalculator() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<any>(null);

  const toggleSymptom = (id: string) => {
    setSymptoms(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const calculate = () => {
    const score = symptoms.length;
    let risk = 'Low';
    let color = 'text-success';
    let bgColor = 'bg-success/5';
    let borderColor = 'border-success/10';
    
    if (score >= 3) {
      risk = 'Moderate';
      color = 'text-amber-500';
      bgColor = 'bg-amber-50';
      borderColor = 'border-amber-100';
    }
    if (score >= 6) {
      risk = 'High';
      color = 'text-rose-600';
      bgColor = 'bg-rose-50';
      borderColor = 'border-rose-100';
    }
    setResults({ risk, score, color, bgColor, borderColor });
  };

  const faqs = [
    { q: "What is endometriosis?", a: "Endometriosis is a condition where tissue similar to the lining of the uterus grows outside the uterus, causing pain and potential fertility issues." },
    { q: "How common is it?", a: "It affects approximately 1 in 10 women of reproductive age worldwide." },
    { q: "What is the gold standard for diagnosis?", a: "Laparoscopic surgery is currently the only definitive way to diagnose endometriosis." },
    { q: "Can endometriosis be cured?", a: "While there is no permanent cure, symptoms can be managed effectively through medication, hormonal therapy, or surgery." }
  ];

  const symptomList = [
    { id: 'painful_periods', label: 'Painful periods (dysmenorrhea)', description: 'Cramping that is more severe than usual and interferes with daily life.' },
    { id: 'painful_intercourse', label: 'Pain during or after intercourse', description: 'Deep pelvic pain during or after sexual activity.' },
    { id: 'painful_bowel', label: 'Pain with bowel movements or urination', description: 'Discomfort during these activities, especially during your period.' },
    { id: 'excessive_bleeding', label: 'Excessive bleeding (heavy periods)', description: 'Soaking through pads/tampons quickly or bleeding between periods.' },
    { id: 'infertility', label: 'Difficulty conceiving', description: 'Trying for 12+ months without success.' },
    { id: 'fatigue', label: 'Fatigue, bloating, or nausea', description: 'General systemic symptoms that worsen during menstruation.' },
    { id: 'chronic_pelvic_pain', label: 'Chronic pelvic pain', description: 'Persistent pain in the lower abdomen or back throughout the cycle.' },
    { id: 'family_history', label: 'Family history of endometriosis', description: 'Mother or sister diagnosed with the condition.' }
  ];

  return (
    <CalculatorLayout
      title="Endometriosis Risk Assessment"
      description="Assess your risk factors and symptom patterns related to endometriosis. Identify if your symptoms warrant a specialist consultation."
      intro="Endometriosis is a chronic condition that is often underdiagnosed, with an average delay of 7-10 years from symptom onset to diagnosis. This assessment tool helps you identify if your symptoms align with common patterns of the condition, providing you with a structured way to discuss your health with a medical professional."
      schema={[
        generateSoftwareAppSchema("Endometriosis Risk", "Assess endometriosis risk", "https://femhealth.com/endometriosis-risk-calculator"),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Endometriosis Risk", item: "https://femhealth.com/endometriosis-risk-calculator" }
        ])
      ]}
      faqs={faqs}
      howItWorks={
        <div className="space-y-4">
          <p>The Endometriosis Risk Assessment evaluates common clinical markers and symptom patterns associated with the condition. While not a diagnosis, it helps identify if your symptoms warrant a specialist consultation.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Pain Patterns:</strong> Chronic pelvic pain, painful periods, and pain during intercourse are key indicators.</li>
            <li><strong>Associated Symptoms:</strong> Heavy bleeding, fatigue, and digestive issues can also be related.</li>
            <li><strong>Risk Scoring:</strong> The tool uses a cumulative scoring system based on the prevalence of these symptoms in diagnosed patients.</li>
          </ul>
        </div>
      }
      relatedTools={[
        { name: "PMDD Screener", path: "/pmdd-screener" },
        { name: "Hormone Balance Quiz", path: "/hormone-balance-quiz" },
        { name: "Period Tracker", path: "/period-calculator" }
      ]}
      medicalReferences={[
        {
          title: "Endometriosis",
          url: "https://www.acog.org/womens-health/faqs/endometriosis",
          source: "ACOG"
        },
        {
          title: "Endometriosis Symptoms and Causes",
          url: "https://www.womenshealth.gov/a-z-topics/endometriosis",
          source: "WomensHealth.gov"
        },
        {
          title: "Endometriosis: Diagnosis and Treatment",
          url: "https://www.nhs.uk/conditions/endometriosis/",
          source: "NHS"
        },
        {
          title: "Endometriosis",
          url: "https://en.wikipedia.org/wiki/Endometriosis",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className={`p-10 rounded-[2.5rem] border text-center ${results.bgColor} ${results.borderColor} shadow-sm`}>
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Assessment Result</p>
            <h2 className={`text-5xl md:text-6xl font-serif font-bold ${results.color}`}>
              {results.risk} Risk
            </h2>
            <p className="text-text-medium mt-4 font-medium">Based on {results.score} reported symptom patterns.</p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-primary-light shadow-sm space-y-6">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl bg-primary-light/20 ${results.color}`}>
                <Info className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-text-dark text-lg mb-2">Next Steps & Guidance</h3>
                <p className="text-text-medium leading-relaxed">
                  {results.risk === 'High' 
                    ? "Your symptoms strongly align with common patterns of endometriosis. We recommend scheduling a consultation with an OB-GYN who specializes in pelvic pain or endometriosis. Consider keeping a detailed pain diary for 2-3 months to bring to your appointment." 
                    : results.risk === 'Moderate'
                    ? "You have several symptoms that could be related to endometriosis or other pelvic health conditions. It is worth discussing these specific patterns with your healthcare provider during your next visit."
                    : "Your symptoms do not strongly suggest endometriosis at this time. However, if you experience chronic pain that interferes with your quality of life, please consult a professional regardless of this score."}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-bg-light p-8 rounded-2xl border border-primary-light space-y-6 shadow-sm">
            <h3 className="font-bold text-text-dark flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" />
              Important Medical Note
            </h3>
            <p className="text-sm text-text-medium leading-relaxed italic">
              "This tool is for educational purposes and is not a medical diagnosis. Endometriosis can only be definitively diagnosed through laparoscopic surgery. If you are in pain, your feelings are valid, and you deserve medical support."
            </p>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our PMDD Screener.</p>
            </div>
            <Link to="/pmdd-screener" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              PMDD Screener &rarr;
            </Link>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">What is Endometriosis?</h2>
            <p>
              Endometriosis is a systemic, inflammatory disease where tissue similar to the lining of the uterus (endometrium) grows in other parts of the body—most commonly on the ovaries, fallopian tubes, and the tissue lining the pelvis. In rare cases, it can even be found on the lungs or other organs.
            </p>
            <p>
              Unlike the normal uterine lining, this misplaced tissue has no way to exit the body during menstruation. It becomes trapped, causing inflammation, scar tissue (adhesions), and often intense pain.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Common Symptoms Explained</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-rose-500" />
                  Dysmenorrhea
                </h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Painful periods that go beyond typical cramping. This pain often starts several days before the period and may include lower back and abdominal pain.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  Dyspareunia
                </h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Pain during or after sex is a common symptom. The pain is often described as a \"deep\" ache rather than superficial discomfort.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-rose-500" />
                  Infertility
                </h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  About 30% to 50% of women with endometriosis experience difficulty conceiving. It is one of the leading causes of female infertility.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-rose-500" />
                  Heavy Bleeding
                </h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  You may experience heavy menstrual periods or bleeding between periods (intermenstrual bleeding).
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">The Path to Diagnosis</h2>
            <p>
              Because symptoms of endometriosis often overlap with other conditions like Pelvic Inflammatory Disease (PID) or Irritable Bowel Syndrome (IBS), diagnosis can be complex.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-text-dark">Pelvic Exam</h4>
                  <p className="text-sm text-text-medium">Your doctor manually feels areas in your pelvis for abnormalities, such as cysts or scars.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-text-dark">Imaging (Ultrasound/MRI)</h4>
                  <p className="text-sm text-text-medium">While these can't definitively diagnose endometriosis, they can identify endometriomas (cysts associated with the condition).</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-bold text-text-dark">Laparoscopy</h4>
                  <p className="text-sm text-text-medium">The only definitive way to diagnose endometriosis. A surgeon looks inside your abdomen with a small camera.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10 text-center">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4">Don't Suffer in Silence</h3>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed text-text-medium">
              If your periods are so painful that you are missing work, school, or social activities, that is not normal. Advocate for your health and seek a second opinion if you feel your concerns are being dismissed.
            </p>
          </section>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-primary-light space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <ClipboardList className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-text-dark">Symptom Checklist</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {symptomList.map((item) => (
              <button 
                key={item.id} 
                onClick={() => toggleSymptom(item.id)} 
                className={`p-4 rounded-2xl border text-left transition-all group relative ${
                  symptoms.includes(item.id) 
                    ? 'bg-primary/5 border-primary shadow-sm' 
                    : 'bg-white border-neutral-200 hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-text-dark block">{item.label}</span>
                    <span className="text-xs text-text-medium block">{item.description}</span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    symptoms.includes(item.id) ? 'bg-primary border-primary text-white' : 'border-neutral-200'
                  }`}>
                    {symptoms.includes(item.id) && <ShieldCheck className="w-4 h-4" />}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={calculate} 
          className="btn-primary w-full py-5 text-lg shadow-xl shadow-primary/20"
        >
          Assess My Risk Level
        </button>
      </div>
    </CalculatorLayout>
  );
}
