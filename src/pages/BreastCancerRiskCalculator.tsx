import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Activity, AlertCircle, HeartPulse, Info, ShieldCheck, Heart, Sparkles, ArrowRight, ClipboardList, Search } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function BreastCancerRiskCalculator() {
  const [age, setAge] = useState<number>(50);
  const [ageAtMenarche, setAgeAtMenarche] = useState<string>('12-13');
  const [ageAtFirstBirth, setAgeAtFirstBirth] = useState<string>('20-24');
  const [relatives, setRelatives] = useState<string>('0');
  const [biopsies, setBiopsies] = useState<string>('0');
  const [hyperplasia, setHyperplasia] = useState<string>('unknown');
  const [breastDensity, setBreastDensity] = useState<string>('average');
  const [results, setResults] = useState<any>(null);

  const faqs = [
    { q: "What is the Gail Model?", a: "The Gail Model is a statistical risk assessment tool developed by scientists at the National Cancer Institute (NCI). It estimates a woman's risk of developing invasive breast cancer over the next 5 years and up to age 90 (lifetime risk)." },
    { q: "Who should use this calculator?", a: "This tool is designed for women who have not had a previous diagnosis of breast cancer, DCIS, or LCIS, and who do not have a known genetic mutation like BRCA1 or BRCA2." },
    { q: "What if my risk is high?", a: "A 'high risk' result does not mean you will definitely get breast cancer, just as a 'low risk' result does not guarantee you won't. If your 5-year risk is above 1.67%, you should discuss enhanced screening options (like MRIs) or preventive medications with your doctor." },
    { q: "Why is breast density important?", a: "Dense breast tissue can make it harder for mammograms to detect small tumors and is itself a risk factor for developing breast cancer." }
  ];

  const calculate = () => {
    // Simplified Gail Model Approximation for educational purposes
    let baseRisk5Year = 0.5; // Baseline for a 30yo
    let baseRiskLifetime = 8.0;

    // Age factor
    if (age >= 40 && age < 50) { baseRisk5Year = 1.0; baseRiskLifetime = 10.0; }
    else if (age >= 50 && age < 60) { baseRisk5Year = 1.5; baseRiskLifetime = 11.0; }
    else if (age >= 60 && age < 70) { baseRisk5Year = 2.0; baseRiskLifetime = 12.0; }
    else if (age >= 70) { baseRisk5Year = 2.5; baseRiskLifetime = 13.0; }

    let multiplier = 1.0;

    // Menarche
    if (ageAtMenarche === '<12') multiplier *= 1.1;
    else if (ageAtMenarche === '>=14') multiplier *= 0.9;

    // First birth
    if (ageAtFirstBirth === '25-29') multiplier *= 1.1;
    else if (ageAtFirstBirth === '>=30') multiplier *= 1.2;
    else if (ageAtFirstBirth === 'nulliparous') multiplier *= 1.3;

    // Relatives
    if (relatives === '1') multiplier *= 1.8;
    else if (relatives === '2+') multiplier *= 2.5;

    // Biopsies
    if (biopsies === '1') multiplier *= 1.3;
    else if (biopsies === '2+') multiplier *= 1.5;

    // Hyperplasia
    if (hyperplasia === 'yes') multiplier *= 1.8;

    // Breast Density Adjustment (Simplified)
    if (breastDensity === 'dense') multiplier *= 1.2;
    else if (breastDensity === 'extremely_dense') multiplier *= 1.5;

    const risk5Year = Math.min(baseRisk5Year * multiplier, 100);
    const riskLifetime = Math.min(baseRiskLifetime * multiplier, 100);

    let status = "Average Risk";
    let message = "Your estimated risk is considered average. Continue with standard screening guidelines (like annual mammograms starting at age 40).";
    let color = 'text-success';
    let bgColor = 'bg-success/5';
    let borderColor = 'border-success/10';
    
    if (risk5Year >= 1.67) {
      status = "Elevated Risk";
      message = "Your 5-year risk is estimated to be above 1.67%, which is the clinical threshold for 'elevated risk.' You should discuss this result with your doctor, as you may qualify for enhanced screening or preventive measures.";
      color = 'text-amber-600';
      bgColor = 'bg-amber-50';
      borderColor = 'border-amber-100';
    }

    setResults({
      risk5Year: risk5Year.toFixed(1),
      riskLifetime: riskLifetime.toFixed(1),
      status,
      message,
      color,
      bgColor,
      borderColor
    });
  };

  return (
    <CalculatorLayout
      title="Breast Cancer Risk Assessment (Gail Model)"
      description="Estimate your 5-year and lifetime risk of developing invasive breast cancer using factors from the Gail Model. Expert guidance on breast health."
      intro="The Gail Model is the most widely used statistical tool for assessing breast cancer risk. By analyzing factors like your reproductive history, family background, and previous biopsies, we can provide a personalized risk profile to help you and your doctor make informed decisions about screening and prevention."
      schema={[
        generateSoftwareAppSchema(
          "Breast Cancer Risk Calculator",
          "Estimate 5-year and lifetime breast cancer risk.",
          "https://femhealth.com/breast-cancer-risk-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Breast Cancer Risk Calculator", item: "https://femhealth.com/breast-cancer-risk-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>This calculator approximates the Gail Model by evaluating six key risk factors:</p>
          <ul>
            <li><strong>Current Age:</strong> The single most significant risk factor for most women.</li>
            <li><strong>Reproductive History:</strong> Age at your first period and age at your first live birth affect lifetime estrogen exposure.</li>
            <li><strong>Family History:</strong> Specifically first-degree relatives (mother, sister, daughter).</li>
            <li><strong>Breast Health History:</strong> Number of previous biopsies and whether they showed atypical hyperplasia.</li>
            <li><strong>Breast Density:</strong> A more modern factor that accounts for tissue composition.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Heart Disease Risk Calculator", path: "/heart-disease-risk-calculator" },
        { name: "Osteoporosis Risk Calculator", path: "/osteoporosis-risk-calculator" },
        { name: "Thyroid Risk Calculator", path: "/thyroid-risk-calculator" }
      ]}
      medicalReferences={[
        {
          title: "Breast Cancer Risk Assessment Tool",
          url: "https://bcrisktool.cancer.gov/",
          source: "National Cancer Institute"
        },
        {
          title: "Breast Cancer Screening Guidelines",
          url: "https://www.cancer.org/cancer/breast-cancer/screening-tests-and-early-detection/american-cancer-society-recommendations-for-the-early-detection-of-breast-cancer.html",
          source: "ACS"
        },
        {
          title: "Breast Cancer Risk Factors",
          url: "https://www.cdc.gov/cancer/breast/basic_info/risk_factors.htm",
          source: "CDC"
        },
        {
          title: "Breast Cancer",
          url: "https://en.wikipedia.org/wiki/Breast_cancer",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-rose-50 p-10 rounded-[2.5rem] border border-rose-100 text-center shadow-sm">
              <p className="text-rose-800 font-bold uppercase tracking-widest text-xs mb-2">5-Year Risk</p>
              <h2 className="text-6xl font-serif font-bold text-rose-950">{results.risk5Year}%</h2>
              <p className="text-rose-700 mt-2 font-medium text-sm">Probability over next 5 years</p>
            </div>
            <div className="bg-rose-50 p-10 rounded-[2.5rem] border border-rose-100 text-center shadow-sm">
              <p className="text-rose-800 font-bold uppercase tracking-widest text-xs mb-2">Lifetime Risk</p>
              <h2 className="text-6xl font-serif font-bold text-rose-950">{results.riskLifetime}%</h2>
              <p className="text-rose-700 mt-2 font-medium text-sm">Probability up to age 90</p>
            </div>
          </div>

          <div className={`${results.bgColor} ${results.borderColor} p-8 rounded-[2rem] border flex items-start gap-6 shadow-sm`}>
            <div className={`p-3 rounded-xl bg-white shadow-sm ${results.color}`}>
              <AlertCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${results.color}`}>Assessment: {results.status}</h3>
              <p className="text-text-medium mt-2 leading-relaxed text-lg">{results.message}</p>
            </div>
          </div>

          <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-4">
            <Info className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
            <p className="text-sm text-amber-800 leading-relaxed italic">
              <strong>Important:</strong> This tool provides a statistical estimate for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or genetic testing.
            </p>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Heart Disease Risk Calculator.</p>
            </div>
            <Link to="/heart-disease-risk-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Heart Disease Risk Calculator &rarr;
            </Link>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Understanding the Risk Factors</h2>
            <p>
              Breast cancer risk is multifactorial, meaning it is influenced by a combination of genetics, lifestyle, and reproductive history.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Estrogen Exposure</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Factors like starting your period early (before age 12) or having your first child later in life (after age 30) increase the total number of menstrual cycles you have, thereby increasing your lifetime exposure to estrogen.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Atypical Hyperplasia</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  If a previous biopsy showed atypical hyperplasia (cells that look unusual but are not yet cancer), your risk is significantly higher because these cells are more likely to become malignant over time.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">What to Do if Your Risk is Elevated</h2>
            <p>
              An "Elevated Risk" result (above 1.67% for 5-year risk) is a signal to have a deeper conversation with your healthcare provider. It does not mean you will get cancer, but it may change your screening plan.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-text-dark">Enhanced Screening</h4>
                  <p className="text-sm text-text-medium">Your doctor may recommend adding an annual breast MRI or ultrasound to your routine mammogram for better detection.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-text-dark">Genetic Counseling</h4>
                  <p className="text-sm text-text-medium">If you have a strong family history, you may be referred to a genetic counselor to test for BRCA1, BRCA2, or other mutations.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-bold text-text-dark">Chemoprevention</h4>
                  <p className="text-sm text-text-medium">In some cases, medications like tamoxifen or raloxifene can be used to significantly lower the risk of developing invasive breast cancer.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10 text-center">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4">The Importance of Self-Awareness</h3>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed text-text-medium italic">
              "While calculators are helpful, they can't replace your own intuition and awareness. Know what is normal for your breasts. If you notice a new lump, skin changes, or nipple discharge, see a doctor immediately, regardless of what any risk calculator says."
            </p>
          </section>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-primary-light space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Current Age</label>
              <input 
                type="number" 
                value={age} 
                onChange={(e) => setAge(Number(e.target.value))} 
                className="input-field" 
              />
            </div>

            <div className="space-y-3">
              <Tooltip content="The age you were when you had your very first menstrual period." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Age at First Menarche</label>
              </Tooltip>
              <select value={ageAtMenarche} onChange={(e) => setAgeAtMenarche(e.target.value)} className="input-field bg-white">
                <option value="<12">Younger than 12</option>
                <option value="12-13">12 to 13</option>
                <option value=">=14">14 or older</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Tooltip content="The age you were when you gave birth to your first living child." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Age at First Live Birth</label>
              </Tooltip>
              <select value={ageAtFirstBirth} onChange={(e) => setAgeAtFirstBirth(e.target.value)} className="input-field bg-white">
                <option value="<20">Younger than 20</option>
                <option value="20-24">20 to 24</option>
                <option value="25-29">25 to 29</option>
                <option value=">=30">30 or older</option>
                <option value="nulliparous">No live births</option>
              </select>
            </div>

            <div className="space-y-3">
              <Tooltip content="Number of first-degree female relatives (mother, sister, daughter) who have had breast cancer." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">First-Degree Relatives</label>
              </Tooltip>
              <select value={relatives} onChange={(e) => setRelatives(e.target.value)} className="input-field bg-white">
                <option value="0">None</option>
                <option value="1">1 Relative</option>
                <option value="2+">2 or More Relatives</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Tooltip content="The number of times you have had a breast biopsy performed." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Previous Biopsies</label>
              </Tooltip>
              <select value={biopsies} onChange={(e) => setBiopsies(e.target.value)} className="input-field bg-white">
                <option value="0">None</option>
                <option value="1">1 Biopsy</option>
                <option value="2+">2 or More</option>
              </select>
            </div>

            <div className="space-y-3">
              <Tooltip content="Breast density is usually reported on your mammogram results. Dense tissue can increase risk." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Breast Density</label>
              </Tooltip>
              <select value={breastDensity} onChange={(e) => setBreastDensity(e.target.value)} className="input-field bg-white">
                <option value="fatty">Mostly Fatty (Low Density)</option>
                <option value="average">Scattered Density (Average)</option>
                <option value="dense">Heterogeneously Dense</option>
                <option value="extremely_dense">Extremely Dense</option>
              </select>
            </div>
          </div>

          {biopsies !== '0' && (
            <div className="pt-4 border-t border-neutral-100">
              <div className="space-y-3">
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Did any biopsy show atypical hyperplasia?</label>
                <select value={hyperplasia} onChange={(e) => setHyperplasia(e.target.value)} className="input-field bg-white">
                  <option value="unknown">Unknown</option>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={calculate} 
          className="btn-primary w-full py-5 text-lg shadow-xl shadow-primary/20"
        >
          Calculate My Risk Profile
        </button>
      </div>
    </CalculatorLayout>
  );
}
