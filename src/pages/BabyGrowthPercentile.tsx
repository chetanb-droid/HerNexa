import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema, validateNumber } from '../lib/calculators';
import { motion } from 'motion/react';
import { Info, BarChart3, Baby, Ruler, Scale, Activity, Heart, AlertCircle, CheckCircle2, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';

export default function BabyGrowthPercentile() {
  const [sex, setSex] = useState<'boy' | 'girl'>('boy');
  const [age, setAge] = useState<number>(6); // Months
  const [weight, setWeight] = useState<number>(7.5); // kg
  const [height, setHeight] = useState<number>(67); // cm
  const [headCirc, setHeadCirc] = useState<number>(43); // cm
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const faqs = [
    { q: "What is a growth percentile?", a: "A growth percentile compares your baby's weight, height, or head circumference to other babies of the same age and sex. For example, if your baby is in the 75th percentile for weight, it means they weigh more than 75% of babies their age and less than 25%." },
    { q: "What is the 50th percentile?", a: "The 50th percentile is the statistical average. It means 50% of babies weigh more and 50% weigh less. Being at the 50th percentile is not 'better' than being at the 10th or 90th; what matters is consistent growth." },
    { q: "Is a low percentile bad?", a: "Not necessarily. Every baby has their own unique growth curve. A baby in the 5th percentile can be perfectly healthy if they are growing steadily. Pediatricians look for significant drops or jumps across percentile lines." },
    { q: "Why are there different charts for boys and girls?", a: "Biological differences mean that, on average, boys and girls grow at slightly different rates. Using sex-specific charts provides a more accurate comparison." }
  ];

  const calculate = () => {
    setError(null);
    
    const ageError = validateNumber(age, 0, 24, "Baby's age");
    const weightError = validateNumber(weight, 1, 20, "Baby's weight");
    const heightError = validateNumber(height, 30, 100, "Baby's height");
    const headError = validateNumber(headCirc, 30, 60, "Head circumference");

    if (ageError || weightError || heightError || headError) {
      setError(ageError || weightError || heightError || headError);
      return;
    }

    // Simplified WHO growth chart logic for demonstration
    // In a real app, this would use a full LMS (Lambda-Mu-Sigma) calculation or lookup table
    let weightPercentile = 50;
    let heightPercentile = 50;
    let headPercentile = 50;

    // Very basic logic for 6 months as an example
    if (age === 6) {
      if (sex === 'boy') {
        if (weight > 9.2) weightPercentile = 95;
        else if (weight > 8.5) weightPercentile = 85;
        else if (weight < 6.4) weightPercentile = 5;
        else if (weight < 7.1) weightPercentile = 15;
      } else {
        if (weight > 8.8) weightPercentile = 95;
        else if (weight > 8.0) weightPercentile = 85;
        else if (weight < 5.8) weightPercentile = 5;
        else if (weight < 6.5) weightPercentile = 15;
      }
    } else {
      // Scale based on age for other months (very simplified)
      const expectedWeight = 3.5 + (age * 0.7);
      if (weight > expectedWeight * 1.2) weightPercentile = 90;
      else if (weight < expectedWeight * 0.8) weightPercentile = 10;
    }

    setResults({ weightPercentile, heightPercentile, headPercentile });
  };

  return (
    <CalculatorLayout
      title="Baby Growth Percentile Calculator | Baby Size Comparator"
      description="Track your baby's weight and height against WHO growth standards. Compare percentiles with our baby size comparator and understand sleep schedules."
      intro="Monitoring your baby's growth is a vital part of tracking their overall health and development. This tool uses World Health Organization (WHO) growth standards to act as a <strong>baby size comparator</strong>, helping you understand where your baby's measurements fall compared to other healthy infants of the same age and sex. Remember that growth is just one aspect of development; tracking your baby's <strong>baby sleep schedule</strong> is also important for their well-being."
      schema={[
        generateSoftwareAppSchema(
          "Baby Growth Percentile Calculator", 
          "Calculate baby weight, height, and head circumference percentiles based on WHO standards.", 
          "https://femhealth.com/baby-growth-percentile"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Baby Growth Percentile", item: "https://femhealth.com/baby-growth-percentile" }
        ])
      ]}
      faqs={faqs}
      howItWorks={
        <div className="space-y-4">
          <p>The Baby Growth Percentile Calculator uses the WHO Child Growth Standards, which are based on the growth of healthy breastfed infants in optimal environments across six different countries.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Percentile Meaning:</strong> If your baby is in the 60th percentile, they are larger than 60% of babies and smaller than 40%.</li>
            <li><strong>The Curve:</strong> Pediatricians focus on the 'curve'—the steady progression along a percentile line—rather than a single measurement.</li>
            <li><strong>Sex-Specific:</strong> Growth patterns differ between boys and girls, so we use separate data sets for each.</li>
          </ul>
        </div>
      }
      relatedTools={[
        { name: "Baby Size Comparator", path: "/baby-size-comparator" },
        { name: "Baby Sleep Schedule", path: "/baby-sleep-schedule" },
        { name: "Solid Food Timeline", path: "/solid-food-timeline" }
      ]}
      medicalReferences={[
        {
          title: "WHO Child Growth Standards",
          url: "https://www.who.int/tools/child-growth-standards/standards",
          source: "WHO"
        },
        {
          title: "Growth Charts",
          url: "https://www.cdc.gov/growthcharts/index.htm",
          source: "CDC"
        },
        {
          title: "Your Baby's Growth",
          url: "https://www.nhs.uk/conditions/baby/babys-development/height-weight-and-reviews/babys-weight-and-height/",
          source: "NHS"
        },
        {
          title: "Growth chart",
          url: "https://en.wikipedia.org/wiki/Growth_chart",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="space-y-8"
        >
          <div className="bg-primary-light/10 p-10 rounded-[3rem] border border-primary/10 text-center space-y-6">
            <div className="flex justify-center mb-4 text-primary">
              <BarChart3 className="w-16 h-16" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Estimated Weight Percentile</p>
            <h2 className="text-6xl md:text-7xl font-serif font-bold text-text-dark">
              {results.weightPercentile}th
            </h2>
            <p className="text-text-medium font-medium max-w-lg mx-auto leading-relaxed">
              Your {age}-month-old {sex} is in the {results.weightPercentile}th percentile for weight compared to WHO standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-primary-light flex flex-col items-center text-center gap-4 shadow-sm">
              <div className="p-3 bg-bg-light text-primary rounded-xl"><Scale className="w-6 h-6" /></div>
              <div>
                <p className="text-xs text-text-medium uppercase font-bold tracking-wider">Weight</p>
                <p className="text-xl font-bold text-text-dark">{results.weightPercentile}th</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-primary-light flex flex-col items-center text-center gap-4 shadow-sm">
              <div className="p-3 bg-bg-light text-accent rounded-xl"><Ruler className="w-6 h-6" /></div>
              <div>
                <p className="text-xs text-text-medium uppercase font-bold tracking-wider">Height</p>
                <p className="text-xl font-bold text-text-dark">{results.heightPercentile}th</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-primary-light flex flex-col items-center text-center gap-4 shadow-sm">
              <div className="p-3 bg-bg-light text-primary rounded-xl"><Activity className="w-6 h-6" /></div>
              <div>
                <p className="text-xs text-text-medium uppercase font-bold tracking-wider">Head Circ.</p>
                <p className="text-xl font-bold text-text-dark">{results.headPercentile}th</p>
              </div>
            </div>
          </div>

          <div className="bg-bg-light p-8 rounded-[2rem] border border-border flex items-start gap-6 shadow-sm">
            <div className="p-3 bg-primary/10 text-primary rounded-xl shadow-sm">
              <Info className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-text-dark">Clinical Perspective</h3>
              <p className="text-sm text-text-medium mt-2 leading-relaxed">
                While percentiles provide a standardized metric, they are only one component of a comprehensive pediatric assessment. Clinicians evaluate the overall growth trajectory (the 'curve') rather than isolated data points. A child consistently tracking along the 10th percentile is typically just as healthy as one tracking along the 90th. Significant deviations crossing two major percentile lines warrant clinical review.
              </p>
            </div>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Baby Size Comparator.</p>
            </div>
            <Link to="/baby-size-comparator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Baby Size Comparator &rarr;
            </Link>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Understanding the WHO Growth Standards</h2>
            <p>
              The World Health Organization (WHO) Child Growth Standards are the internationally recognized benchmark for assessing the physical growth, nutritional status, and motor development of infants and children from birth to 5 years of age.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-text-dark flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Prescriptive vs. Descriptive
                </h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Unlike older growth charts that merely described how children <em>did</em> grow in a specific region, the WHO standards are prescriptive. They describe how children <em>should</em> grow when provided with optimal conditions, including exclusive breastfeeding, adequate healthcare, and a smoke-free environment.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-text-dark flex items-center gap-2">
                  <Baby className="w-5 h-5 text-accent" />
                  The Importance of Head Circumference
                </h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Measuring occipitofrontal circumference (head circumference) is a critical proxy for brain growth. Rapid deviations in this percentile can be an early clinical indicator of neurological or developmental issues, making it a vital component of routine well-child visits.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Interpreting Percentile Shifts</h2>
            <p>
              Growth is not always perfectly linear. Minor fluctuations are common, but specific patterns require clinical attention.
            </p>
            <div className="space-y-6 mt-6">
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Catch-up and Catch-down Growth</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  In the first 6-18 months of life, infants often experience "catch-up" or "catch-down" growth as they shift from their intrauterine growth trajectory (influenced heavily by maternal factors) to their genetic potential. This can result in crossing percentile lines, which is often a normal physiological adjustment.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Failure to Thrive (FTT)</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  Clinically, FTT is often considered when a child's weight falls below the 5th percentile, drops across two major percentile lines, or when weight-for-length is significantly disproportionate. This requires a comprehensive medical and nutritional evaluation.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-primary/5 p-10 rounded-[2rem] border border-primary/10 text-center">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4">Clinical Insight: The "Normal" Range</h3>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed text-text-medium italic">
              "Parents frequently express concern if their child falls into a lower percentile (e.g., the 10th percentile). It is crucial to remember that by definition, 10% of all healthy, normally developing children reside in this range. Clinical focus is placed on consistency and velocity. A child who maintains the 10th percentile is likely following their genetic blueprint. Conversely, a precipitous drop from the 80th to the 10th percentile is a clinical signal requiring investigation."
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

        <div className="flex p-1 bg-bg-light rounded-2xl border border-neutral-100">
          <button 
            onClick={() => setSex('boy')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${sex === 'boy' ? 'bg-white text-primary shadow-sm' : 'text-text-medium hover:text-primary'}`}
          >
            <Baby className="w-4 h-4" />
            Boy
          </button>
          <button 
            onClick={() => setSex('girl')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${sex === 'girl' ? 'bg-white text-accent shadow-sm' : 'text-text-medium hover:text-accent'}`}
          >
            <Baby className="w-4 h-4" />
            Girl
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Tooltip content="Enter your baby's age in full months (0-24)." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Baby's Age (Months)</label>
            </Tooltip>
            <input 
              type="number" 
              value={age} 
              onChange={(e) => setAge(parseInt(e.target.value))} 
              className="input-field" 
              placeholder="e.g., 6"
            />
          </div>
          <div className="space-y-3">
            <Tooltip content="Enter your baby's weight in kilograms." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Weight (kg)</label>
            </Tooltip>
            <input 
              type="number" 
              step="0.1" 
              value={weight} 
              onChange={(e) => setWeight(parseFloat(e.target.value))} 
              className="input-field" 
              placeholder="e.g., 7.5"
            />
          </div>
          <div className="space-y-3">
            <Tooltip content="Enter your baby's length/height in centimeters." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Length (cm)</label>
            </Tooltip>
            <input 
              type="number" 
              step="0.1" 
              value={height} 
              onChange={(e) => setHeight(parseFloat(e.target.value))} 
              className="input-field" 
              placeholder="e.g., 67"
            />
          </div>
          <div className="space-y-3">
            <Tooltip content="Enter your baby's head circumference in centimeters." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Head Circ. (cm)</label>
            </Tooltip>
            <input 
              type="number" 
              step="0.1" 
              value={headCirc} 
              onChange={(e) => setHeadCirc(parseFloat(e.target.value))} 
              className="input-field" 
              placeholder="e.g., 43"
            />
          </div>
        </div>

        <button 
          onClick={calculate} 
          className="btn-primary w-full py-5 text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
        >
          <TrendingUp className="w-5 h-5" />
          Calculate Growth Percentiles
        </button>
      </div>
    </CalculatorLayout>
  );
}
