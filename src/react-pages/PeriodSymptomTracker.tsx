import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Activity, AlertCircle, HeartPulse, Info } from 'lucide-react';

export default function PeriodSymptomTracker() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState<number>(3);
  const [impact, setImpact] = useState<number>(3);
  const [results, setResults] = useState<any>(null);

  const faqs = [
    { q: "What is the difference between PMS and PMDD?", a: "PMS (Premenstrual Syndrome) involves mild to moderate physical and emotional symptoms before a period. PMDD (Premenstrual Dysphoric Disorder) is a severe, sometimes disabling extension of PMS that causes extreme mood shifts that can disrupt daily life and relationships." },
    { q: "Are severe period cramps normal?", a: "While mild cramping (dysmenorrhea) is common, severe cramps that cause you to miss work or school, or that aren't relieved by over-the-counter pain medication, are not normal and could indicate conditions like endometriosis or fibroids." },
    { q: "How can I better manage my period symptoms?", a: "Tracking your symptoms over 2-3 cycles is the first step. Lifestyle changes like regular exercise, a balanced diet, adequate sleep, and stress management can help. For severe symptoms, consult a healthcare provider for medical options." }
  ];

  const symptomOptions = [
    { id: 'cramps', label: 'Abdominal Cramping' },
    { id: 'bloating', label: 'Bloating / Water Retention' },
    { id: 'breast_tenderness', label: 'Breast Tenderness' },
    { id: 'fatigue', label: 'Fatigue / Low Energy' },
    { id: 'headaches', label: 'Headaches / Migraines' },
    { id: 'mood_swings', label: 'Mood Swings / Irritability' },
    { id: 'acne', label: 'Acne Breakouts' },
    { id: 'heavy_bleeding', label: 'Heavy Bleeding' },
    { id: 'nausea', label: 'Nausea / Digestive Issues' },
    { id: 'lower_back_pain', label: 'Lower Back Pain' }
  ];

  const toggleSymptom = (id: string) => {
    if (symptoms.includes(id)) {
      setSymptoms(symptoms.filter(s => s !== id));
    } else {
      setSymptoms([...symptoms, id]);
    }
  };

  const calculate = () => {
    let score = 0;
    
    // Base score on number of symptoms
    score += symptoms.length;
    
    // Multiply by severity and impact
    score = score * (severity / 2) * (impact / 2);

    let status = "Mild";
    let message = "Your symptoms appear to be mild and typical of normal premenstrual or menstrual changes. Continue tracking to identify patterns.";
    let isWarning = false;

    if (score > 40 || impact >= 4) {
      status = "Severe";
      message = "Your symptoms are significantly impacting your daily life. This level of severity warrants a discussion with a healthcare provider to explore management options and rule out underlying conditions like endometriosis or PMDD.";
      isWarning = true;
    } else if (score > 20) {
      status = "Moderate";
      message = "You are experiencing moderate symptoms. While common, there are lifestyle changes and over-the-counter options that can help improve your comfort during this time.";
    }

    // Specific symptom flags
    let specificAdvice = [];
    if (symptoms.includes('heavy_bleeding') && severity >= 4) {
      specificAdvice.push("Heavy bleeding that requires changing pads/tampons every hour is a medical concern (menorrhagia) and should be evaluated.");
    }
    if (symptoms.includes('mood_swings') && impact >= 4) {
      specificAdvice.push("Severe mood swings that disrupt your relationships or work could be a sign of PMDD. Consider taking our PMDD Screener.");
    }

    setResults({
      status,
      message,
      isWarning,
      specificAdvice
    });
  };

  return (
    <CalculatorLayout
      title="Period Symptom Tracker & Analyzer"
      description="Track and analyze your menstrual and premenstrual symptoms to understand their severity and impact on your daily life."
      intro="Understanding your period symptoms is crucial for managing your health. Use this tool to log your current symptoms, assess their severity, and get insights into whether your experience is typical or warrants a conversation with a doctor."
      schema={[
        generateSoftwareAppSchema(
          "Period Symptom Tracker",
          "Analyze menstrual symptom severity and impact.",
          "https://hernexa.com/period-symptom-tracker"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://hernexa.com" },
          { name: "Tools", item: "https://hernexa.com/tools" },
          { name: "Period Symptom Tracker", item: "https://hernexa.com/period-symptom-tracker" }
        ])
      ]}
      howItWorks={
        <>
          <p>This analyzer evaluates three key dimensions of your menstrual experience:</p>
          <ul>
            <li><strong>Symptom Breadth:</strong> The number and types of symptoms you are experiencing simultaneously.</li>
            <li><strong>Severity:</strong> How intense the physical or emotional discomfort is on a scale of 1 to 5.</li>
            <li><strong>Daily Impact:</strong> How much these symptoms interfere with your ability to work, socialize, or perform daily tasks.</li>
          </ul>
          <p className="text-sm text-neutral-500 mt-4 italic">Disclaimer: This tool is for educational tracking purposes and does not provide a medical diagnosis.</p>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Period Calculator", path: "/period-calculator" },
        { name: "PMDD Screener", path: "/pmdd-screener" },
        { name: "Endometriosis Risk Calculator", path: "/endometriosis-risk-calculator" }
      ]}
      medicalReferences={[
        {
          title: "Premenstrual Syndrome (PMS)",
          url: "https://www.mayoclinic.org/diseases-conditions/premenstrual-syndrome/symptoms-causes/syc-20376780",
          source: "Mayo Clinic"
        },
        {
          title: "Dysmenorrhea: Painful Periods",
          url: "https://www.acog.org/womens-health/faqs/dysmenorrhea-painful-periods",
          source: "ACOG"
        },
        {
          title: "Period Pain",
          url: "https://www.nhs.uk/conditions/period-pain/",
          source: "NHS"
        },
        {
          title: "Premenstrual syndrome",
          url: "https://en.wikipedia.org/wiki/Premenstrual_syndrome",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className={`p-8 rounded-2xl border text-center ${results.status === 'Mild' ? 'bg-emerald-50 border-emerald-100' : results.status === 'Moderate' ? 'bg-amber-50 border-amber-100' : 'bg-rose-50 border-rose-100'}`}>
            <div className={`flex justify-center mb-4 ${results.status === 'Mild' ? 'text-emerald-500' : results.status === 'Moderate' ? 'text-amber-500' : 'text-rose-500'}`}>
              <Activity className="w-12 h-12" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest mb-2 opacity-80">Symptom Burden</p>
            <h2 className="text-4xl font-bold mb-2">{results.status}</h2>
          </div>

          <div className={`bg-white p-6 rounded-xl border flex items-start gap-4 shadow-sm ${results.isWarning ? 'border-rose-200' : 'border-neutral-200'}`}>
            {results.isWarning ? (
              <AlertCircle className="w-6 h-6 text-rose-500 shrink-0 mt-1" />
            ) : (
              <Info className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
            )}
            <div>
              <p className="font-bold text-neutral-900">Analysis</p>
              <p className="text-neutral-600 mt-1 leading-relaxed">{results.message}</p>
              
              {results.specificAdvice.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="font-bold text-sm text-neutral-900">Specific Notes:</p>
                  <ul className="list-disc pl-5 text-sm text-neutral-600 space-y-1">
                    {results.specificAdvice.map((advice: string, i: number) => (
                      <li key={i}>{advice}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Period Calculator.</p>
            </div>
            <a href="/period-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Period Calculator &rarr;
            </a>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider">Select Your Current Symptoms</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {symptomOptions.map(option => (
              <button
                key={option.id}
                onClick={() => toggleSymptom(option.id)}
                className={`p-3 text-left rounded-xl border text-sm font-medium transition-all ${
                  symptoms.includes(option.id) 
                    ? 'bg-rose-50 border-rose-500 text-rose-700' 
                    : 'bg-white border-neutral-200 text-neutral-600 hover:border-rose-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider">Overall Severity</label>
            <span className="text-rose-600 font-bold">{severity} / 5</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="5" 
            value={severity} 
            onChange={(e) => setSeverity(Number(e.target.value))} 
            className="w-full h-2 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-600" 
          />
          <div className="flex justify-between text-xs text-neutral-400 font-medium">
            <span>Mild (1)</span>
            <span>Moderate (3)</span>
            <span>Severe (5)</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider">Impact on Daily Life</label>
            <span className="text-rose-600 font-bold">{impact} / 5</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="5" 
            value={impact} 
            onChange={(e) => setImpact(Number(e.target.value))} 
            className="w-full h-2 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-600" 
          />
          <div className="flex justify-between text-xs text-neutral-400 font-medium">
            <span>No Impact (1)</span>
            <span>Some Disruption (3)</span>
            <span>Cannot Function (5)</span>
          </div>
        </div>

        <button 
          onClick={calculate} 
          disabled={symptoms.length === 0}
          className="w-full py-4 bg-rose-600 hover:bg-rose-700 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors text-lg shadow-md"
        >
          Analyze Symptoms
        </button>
      </div>
    </CalculatorLayout>
  );
}
