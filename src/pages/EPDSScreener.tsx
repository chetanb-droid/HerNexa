import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { motion } from 'motion/react';
import { Info, AlertCircle } from 'lucide-react';

export default function EPDSScreener() {
  const [scores, setScores] = useState<number[]>(new Array(10).fill(0));
  const [results, setResults] = useState<any>(null);

  const updateScore = (index: number, value: number) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  const calculate = () => {
    const total = scores.reduce((a, b) => a + b, 0);
    setResults({ total });
  };

  const faqs = [
    { q: "What is the EPDS?", a: "The Edinburgh Postnatal Depression Scale (EPDS) is a 10-item questionnaire used to screen for postnatal depression." },
    { q: "What does my score mean?", a: "A score of 10 or more suggests you may be experiencing symptoms of depression. A score of 13 or more is strongly suggestive of depression." },
    { q: "Is this a diagnosis?", a: "No, this is a screening tool. A formal diagnosis must be made by a healthcare professional." }
  ];

  const questions = [
    "I have been able to laugh and see the funny side of things",
    "I have looked forward with enjoyment to things",
    "I have blamed myself unnecessarily when things went wrong",
    "I have been anxious or worried for no good reason",
    "I have felt scared or panicky for no very good reason",
    "Things have been getting on top of me",
    "I have been so unhappy that I have had difficulty sleeping",
    "I have felt sad or miserable",
    "I have been so unhappy that I have been crying",
    "The thought of harming myself has occurred to me"
  ];

  return (
    <CalculatorLayout
      title="Postpartum Depression (EPDS) Screener"
      description="A clinical tool (EPDS) to help identify signs of postpartum depression."
      intro={<><Link to="/epds-screener" className="text-primary hover:underline font-medium">Postpartum depression</Link> is common and treatable. This tool uses the Edinburgh Postnatal Depression Scale to help you screen for symptoms.</>}
      schema={[
        generateSoftwareAppSchema("EPDS Screener", "Screener for postpartum depression", "https://femhealth.com/epds-screener"),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "EPDS Screener", item: "https://femhealth.com/epds-screener" }
        ])
      ]}
      faqs={faqs}
      howItWorks={
        <div className="space-y-4">
          <p>The EPDS Screener uses the Edinburgh Postnatal Depression Scale, a 10-item questionnaire that assesses how you have felt over the past 7 days. Each question is scored from 0 to 3.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Total Score:</strong> Sum of all 10 items.</li>
            <li><strong>Interpretation:</strong> A score of 10 or more suggests potential depression.</li>
          </ul>
        </div>
      }
      relatedTools={[
        { name: "Baby Growth Percentile", path: "/baby-growth-percentile" },
        { name: "Baby Sleep Schedule", path: "/baby-sleep-schedule" },
        { name: "Pelvic Floor Tracker", path: "/pelvic-floor-tracker" }
      ]}
      medicalReferences={[
        {
          title: "Postpartum Depression",
          url: "https://www.acog.org/womens-health/faqs/postpartum-depression",
          source: "ACOG"
        },
        {
          title: "Edinburgh Postnatal Depression Scale (EPDS)",
          url: "https://www.fresno.ucsf.edu/pediatrics/downloads/edinburghscale.pdf",
          source: "UCSF"
        },
        {
          title: "Post-natal Depression",
          url: "https://www.nhs.uk/mental-health/conditions/post-natal-depression/",
          source: "NHS"
        },
        {
          title: "Edinburgh Postnatal Depression Scale",
          url: "https://en.wikipedia.org/wiki/Edinburgh_Postnatal_Depression_Scale",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className={`p-8 rounded-3xl border text-center ${results.total >= 10 ? 'bg-rose-50 border-rose-100' : 'bg-success/5 border-success/10'}`}>
            <p className="text-sm font-bold uppercase tracking-widest mb-2">Total Score</p>
            <h2 className={`text-6xl font-bold ${results.total >= 10 ? 'text-rose-600' : 'text-success'}`}>{results.total}</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-primary/10 flex gap-4">
            <AlertCircle className={`w-6 h-6 shrink-0 ${results.total >= 10 ? 'text-rose-500' : 'text-success'}`} />
            <p className="text-sm text-text-medium leading-relaxed">
              {results.total >= 10 ? "Your score suggests you may be experiencing symptoms of depression. We strongly recommend sharing these results with your healthcare provider or a mental health professional." : "Your score does not strongly suggest postpartum depression. However, if you are feeling overwhelmed, please reach out for support."}
            </p>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Baby Growth Percentile.</p>
            </div>
            <Link to="/baby-growth-percentile" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Baby Growth Percentile &rarr;
            </Link>
          </div>
        </motion.div>
      )}
    >
      <div className="space-y-8">
        <p className="text-xs font-bold text-text-medium uppercase tracking-wider">In the past 7 days:</p>
        <div className="space-y-8">
          {questions.map((q, i) => (
            <div key={i} className="space-y-3">
              <p className="text-sm font-bold text-text-dark">{i + 1}. {q}</p>
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((v) => (
                  <button key={v} onClick={() => updateScore(i, v)} className={`p-3 rounded-xl border text-xs font-bold transition-all ${scores[i] === v ? 'bg-primary text-white border-primary' : 'bg-white border-border hover:border-primary'}`}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={calculate} className="btn-primary w-full py-4 text-lg">Analyze Score</button>
      </div>
    </CalculatorLayout>
  );
}
