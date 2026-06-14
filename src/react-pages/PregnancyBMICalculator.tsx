import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { calculateBMI, getBMICategory, validateNumber, generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Scale, Info, TrendingUp, AlertCircle, Activity } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';

export default function PregnancyBMICalculator() {
  const [weight, setWeight] = useState<number>(65);
  const [height, setHeight] = useState<number>(165);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const faqs = [
    { q: "What if I don't know my pre-pregnancy weight?", a: "Use your weight from your first prenatal appointment (usually around weeks 8-12). This is often close enough to your starting weight for calculation purposes." },
    { q: "Is BMI accurate during pregnancy?", a: "BMI is only used as a starting point. Once you are pregnant, your doctor will track your weight gain trend rather than your BMI." },
    { q: "What if I am already overweight?", a: "Pregnancy is not a time for weight loss. Focus on healthy, nutrient-dense foods to support your baby while staying within the recommended gain range." }
  ];

  const calculate = () => {
    setError(null);

    const weightError = validateNumber(weight, 30, 300, 'Weight');
    if (weightError) {
      setError(weightError);
      return;
    }

    const heightError = validateNumber(height, 100, 250, 'Height');
    if (heightError) {
      setError(heightError);
      return;
    }

    const bmi = parseFloat(calculateBMI(weight, height));
    const { category, weightGain } = getBMICategory(bmi);
    
    setResults({
      bmi,
      category,
      weightGain
    });
  };

  return (
    <CalculatorLayout
      title="Pregnancy BMI Calculator"
      description="Calculate your pre-pregnancy BMI and understand your recommended weight gain range. Get expert guidance on healthy pregnancy weight management. Essential pregnancy health tracking."
      intro={<>Your pre-pregnancy Body Mass Index (BMI) is a key factor in determining how much weight you should ideally gain during pregnancy. Our specialized calculator helps you find your BMI category and provides the medically recommended weight gain range to support a healthy pregnancy.</>}
      schema={[
        generateSoftwareAppSchema(
          "Pregnancy BMI Calculator",
          "Calculate pre-pregnancy BMI and weight gain range.",
          "https://hernexa.com/pregnancy-bmi-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://hernexa.com" },
          { name: "Tools", item: "https://hernexa.com/tools" },
          { name: "Pregnancy BMI Calculator", item: "https://hernexa.com/pregnancy-bmi-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>BMI is a measure of body fat based on height and weight. For pregnancy, we use your pre-pregnancy BMI:</p>
          <ul>
            <li><strong>BMI Formula:</strong> Weight (kg) / [Height (m)]².</li>
            <li><strong>IOM Guidelines:</strong> The Institute of Medicine (IOM) provides specific weight gain ranges based on your starting BMI category.</li>
            <li><strong>Health Impact:</strong> Gaining within the recommended range reduces the risk of complications like gestational diabetes and preeclampsia.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Pregnancy Weight Gain", path: "/pregnancy-weight-gain-calculator" },
        { name: "Pregnancy Calorie Calculator", path: "/pregnancy-calorie-calculator" },
        { name: "Fetal Size Calculator", path: "/fetal-size-calculator" }
      ]}
      medicalReferences={[
        {
          title: "BMI and Pregnancy",
          url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4155554/",
          source: "PubMed"
        },
        {
          title: "Overweight and pregnant",
          url: "https://www.nhs.uk/pregnancy/finding-out/overweight-and-pregnant/",
          source: "NHS"
        },
        {
          title: "Body Mass Index - BMI",
          url: "https://www.who.int/data/gho/data/themes/topics/topic-details/GHO/body-mass-index",
          source: "WHO"
        },
        {
          title: "Body Mass Index",
          url: "https://en.wikipedia.org/wiki/Body_mass_index",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <p className="text-primary font-bold uppercase tracking-widest text-sm">Your Pre-Pregnancy BMI</p>
            <h2 className="text-5xl md:text-6xl font-bold text-text-dark">{results.bmi}</h2>
            <p className="text-text-medium font-medium">Category: {results.category}</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-primary-light space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-success" />
              <h3 className="font-bold text-text-dark">Recommended Weight Gain</h3>
            </div>
            <p className="text-text-medium leading-relaxed">
              Based on your BMI, the recommended total weight gain for your pregnancy is <strong>{results.weightGain}</strong>.
            </p>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed italic">
              Note: These ranges are for singleton pregnancies. If you are expecting twins or multiples, your weight gain requirements will be higher.
            </p>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Pregnancy Weight Gain.</p>
            </div>
            <a href="/pregnancy-weight-gain-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Pregnancy Weight Gain &rarr;
            </a>
          </div>
        </div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">How We Calculate Your Pre-Pregnancy BMI</h2>
            <p>
              Your Body Mass Index (BMI) is a standard clinical tool used to estimate body fat based on your height and weight. For pregnancy, the calculation strictly relies on your <em>pre-pregnancy</em> metrics. Here is how the calculator processes your data:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-text-medium">
              <li><strong>The Standard Formula:</strong> The calculator uses the universal BMI equation: Weight in kilograms divided by Height in meters squared (kg/m²). If you enter your weight in pounds or height in inches, the system automatically converts them to metric units before performing the calculation.</li>
              <li><strong>Why Pre-Pregnancy Weight?</strong> Once you are pregnant, your weight includes the baby, placenta, amniotic fluid, increased blood volume, and breast tissue. Calculating BMI using your current pregnant weight will result in an artificially inflated number that does not accurately reflect your baseline health status.</li>
              <li><strong>Categorization:</strong> After calculating the raw BMI number, the algorithm categorizes it according to the World Health Organization (WHO) standards: Underweight (&lt;18.5), Normal Weight (18.5-24.9), Overweight (25.0-29.9), and Obese (&ge;30.0).</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">What Your Results Actually Mean</h2>
            <p>
              Your pre-pregnancy BMI category directly dictates the Institute of Medicine (IOM) recommended weight gain range for your pregnancy. Here is a detailed breakdown of what your specific category means for your prenatal care:
            </p>
            <div className="space-y-6 mt-6">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Underweight (BMI &lt; 18.5)</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  <strong>Recommended Gain: 28–40 lbs (12.5–18 kg).</strong> If you start pregnancy underweight, you need to gain more weight to ensure your baby receives adequate nutrition and to build the necessary fat reserves for breastfeeding. Inadequate weight gain in this category increases the risk of preterm birth and having a low-birth-weight baby.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Normal Weight (BMI 18.5–24.9)</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  <strong>Recommended Gain: 25–35 lbs (11.5–16 kg).</strong> This is the standard baseline. Gaining within this range provides the optimal environment for fetal growth while minimizing maternal risks. Most of this weight gain should occur in the second and third trimesters (roughly 1 pound per week).
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Overweight (BMI 25.0–29.9) or Obese (BMI &ge; 30.0)</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  <strong>Recommended Gain: 15–25 lbs (Overweight) or 11–20 lbs (Obese).</strong> If you start pregnancy with a higher BMI, your body already has sufficient energy reserves to support fetal growth. Therefore, the recommended weight gain is lower. Excessive weight gain in these categories significantly increases the risk of gestational diabetes, preeclampsia, macrosomia (a very large baby), and the need for a Cesarean section.
                </p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-text-dark">Where Does the Weight Go?</h3>
              <p className="text-sm leading-relaxed text-text-medium">
                It is crucial to understand that pregnancy weight gain is not just "fat." For a woman gaining 30 pounds, the breakdown looks roughly like this: Baby (7-8 lbs), Placenta (1.5 lbs), Amniotic fluid (2 lbs), Uterine enlargement (2 lbs), Maternal breast tissue (2 lbs), Maternal blood volume (4 lbs), Fluids in maternal tissue (4 lbs), and Maternal fat stores (7 lbs).
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-text-dark">The Danger of Dieting</h3>
              <p className="text-sm leading-relaxed text-text-medium">
                Regardless of your starting BMI, pregnancy is <em>never</em> the time to actively try to lose weight or restrict calories. Severe caloric restriction can deprive your baby of essential nutrients and lead to the production of ketones, which can be harmful to fetal brain development.
              </p>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4 text-center">Expert Insight: BMI is a Starting Point, Not a Sentence</h3>
            <p className="text-sm text-center max-w-2xl mx-auto leading-relaxed italic text-text-medium">
              "We use pre-pregnancy BMI to set a target, but we treat the patient, not the number. If a patient with a high BMI is eating a highly nutritious diet, exercising moderately, and her blood pressure and blood sugar are perfect, we don't panic if she gains a few extra pounds. Conversely, if a patient with a 'normal' BMI is gaining weight rapidly due to a diet of pure sugar, that is a clinical concern. Focus on the quality of your habits, and the scale will usually take care of itself."
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Tooltip content="Enter your weight before pregnancy in kilograms to calculate your starting BMI." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Pre-Pregnancy Weight (kg)</label>
            </Tooltip>
            <input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              className="input-field"
            />
          </div>
          <div className="space-y-3">
            <Tooltip content="Enter your height in centimeters for an accurate BMI calculation." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Height (cm)</label>
            </Tooltip>
            <input 
              type="number" 
              value={height}
              onChange={(e) => setHeight(parseFloat(e.target.value))}
              className="input-field"
            />
          </div>
        </div>

        <Tooltip content="Calculate your pre-pregnancy BMI and see your medically recommended weight gain range.">
          <button 
            onClick={calculate}
            className="btn-primary w-full text-lg"
          >
            Calculate Pregnancy BMI
          </button>
        </Tooltip>
      </div>
    </CalculatorLayout>
  );
}
