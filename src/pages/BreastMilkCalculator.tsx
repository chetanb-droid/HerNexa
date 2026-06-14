import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { validateNumber, generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Baby, Info, Droplets, Scale, Activity, AlertCircle, Milk, Stethoscope } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

export default function BreastMilkCalculator() {
  const [activeTab, setActiveTab] = useState<'breastmilk' | 'formula'>('breastmilk');
  const [weight, setWeight] = useState<number>(5);
  const [age, setAge] = useState<number>(8);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const faqs = [
    { q: "How do I clinically assess if my infant is receiving adequate nutrition?", a: "Clinical indicators of adequate intake include: 6-8 heavy wet diapers per 24 hours, regular bowel movements (frequency varies by age and feeding type), and consistent weight gain following their established growth curve percentiles." },
    { q: "Does the volume requirement differ between breast milk and formula?", a: "Yes. Breast milk composition changes to meet the infant's needs, so the volume often plateaus around 1-6 months (approx. 25-30 oz/day). Formula composition is static, so volume requirements typically increase linearly with the infant's weight until solid foods are introduced." },
    { q: "What is 'cluster feeding' and is it normal?", a: "Cluster feeding is a normal physiological behavior where an infant feeds very frequently (often in the evenings) for a period of time. This is common during growth spurts and helps stimulate maternal prolactin production to increase milk supply." },
    { q: "How should I adjust these calculations once complementary foods (solids) are introduced?", a: "Before 12 months, breast milk or formula remains the primary source of nutrition. As solid food intake increases (typically between 6-12 months), milk volume will gradually decrease. Always offer milk before solids until around 9-10 months." }
  ];

  const calculate = () => {
    setError(null);
    
    const weightError = validateNumber(weight, 1, 20, "Infant's weight");
    if (weightError) { setError(weightError); return; }
    
    const ageError = validateNumber(age, 0, 104, "Infant's age");
    if (ageError) { setError(ageError); return; }

    let dailyMl = 0;
    let dailyOz = 0;
    let clinicalNote = "";

    if (activeTab === 'breastmilk') {
      // Clinical standard: 150ml per kg of body weight for breastfed infants (up to ~6 months)
      // After 1-6 months, breastmilk intake often plateaus at ~750-900ml (25-30oz) per day regardless of weight
      if (age > 4 && age <= 26) { // 1 to 6 months
         dailyMl = Math.min(weight * 150, 900); // Cap at 900ml
         clinicalNote = "Breast milk intake typically plateaus between 1 and 6 months at approximately 25-30 oz (750-900 ml) per day. The composition of the milk changes to meet caloric needs, rather than the volume increasing.";
      } else if (age > 26) {
         dailyMl = Math.min(weight * 120, 800); // Decreases as solids increase
         clinicalNote = "As complementary foods are introduced and established, breast milk volume naturally begins to decrease. Continue to feed on demand.";
      } else {
         dailyMl = weight * 150;
         clinicalNote = "For neonates, frequent feeding (8-12 times per 24 hours) is essential for establishing maternal milk supply and preventing neonatal jaundice.";
      }
      dailyOz = dailyMl / 29.574;
    } else {
      // Formula: ~150-200ml per kg (approx 2.5 oz per lb)
      dailyOz = weight * 2.20462 * 2.5;
      dailyMl = dailyOz * 29.574;
      
      // Cap formula intake to prevent overfeeding (typically max 32oz/day before solids)
      if (dailyOz > 32) {
          dailyOz = 32;
          dailyMl = 32 * 29.574;
          clinicalNote = "Maximum recommended formula intake is generally 32 oz per day to prevent overfeeding and excessive weight gain. If your infant seems consistently hungry after 32 oz, consult your pediatrician.";
      } else {
          clinicalNote = "Formula-fed infants typically increase their volume intake as they grow. Ensure you are mixing the formula exactly according to the manufacturer's instructions to maintain proper osmolality.";
      }
    }
    
    // Typical feedings per day based on age (clinical averages)
    let feedings = 8; // 0-4 weeks
    let feedingRange = "8-12";
    if (age > 4 && age <= 12) { feedings = 7; feedingRange = "6-8"; } // 1-3 months
    if (age > 12 && age <= 26) { feedings = 6; feedingRange = "5-7"; } // 3-6 months
    if (age > 26) { feedings = 5; feedingRange = "4-5"; } // 6+ months

    setResults({
      dailyMl: Math.round(dailyMl),
      dailyOz: dailyOz.toFixed(1),
      perFeedingMl: Math.round(dailyMl / feedings),
      perFeedingOz: (dailyOz / feedings).toFixed(1),
      feedings,
      feedingRange,
      clinicalNote
    });
  };

  return (
    <CalculatorLayout
      title="Clinical Infant Enteral Feeding Calculator | Feeding Calculator"
      description="Calculate estimated daily breast milk or formula volume requirements using our baby feeding calculator based on infant weight and age."
      intro="Determining adequate enteral intake is a primary concern in pediatric nutrition. This clinical tool acts as a <strong>feeding calculator</strong>, estimating the daily volume requirements for both human milk and infant formula, utilizing standard weight-based pediatric formulas to support optimal growth trajectories."
      schema={[
        generateSoftwareAppSchema(
          "Clinical Infant Feeding Calculator",
          "Calculate daily breast milk and formula requirements for infants based on pediatric guidelines.",
          "https://hernexa.com/breast-milk-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://hernexa.com" },
          { name: "Tools", item: "https://hernexa.com/tools" },
          { name: "Infant Feeding Calculator", item: "https://hernexa.com/breast-milk-calculator" }
        ])
      ]}
      howItWorks={
        <div className="space-y-4">
          <p>This calculator utilizes established pediatric nutritional guidelines to estimate fluid and caloric needs:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Human Milk (Breast Milk):</strong> Calculations are based on the standard requirement of approximately 150 ml/kg/day. The algorithm accounts for the physiological plateau in breast milk volume that typically occurs between 1 and 6 months.</li>
            <li><strong>Infant Formula:</strong> Calculations utilize the standard metric of ~150-200 ml/kg/day (approximately 2.5 oz per pound). A clinical maximum cap of 32 oz/day is applied to mitigate the risk of overfeeding.</li>
            <li><strong>Feeding Frequency:</strong> Estimated feeding frequencies are based on average gastric emptying times and developmental norms for the specified age.</li>
          </ul>
        </div>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Breastfeeding Calorie Calculator", path: "/breastfeeding-calorie-calculator" },
        { name: "Baby Growth Percentile", path: "/baby-growth-percentile" },
        { name: "Solid Food Timeline", path: "/solid-food-timeline" }
      ]}
      medicalReferences={[
        {
          title: "Infant and Young Child Feeding",
          url: "https://www.who.int/news-room/fact-sheets/detail/infant-and-young-child-feeding",
          source: "WHO"
        },
        {
          title: "Breastfeeding Your Baby",
          url: "https://www.acog.org/womens-health/faqs/breastfeeding-your-baby",
          source: "ACOG"
        },
        {
          title: "Amount and Schedule of Formula Feedings",
          url: "https://www.healthychildren.org/English/ages-stages/baby/formula-feeding/Pages/Amount-and-Schedule-of-Formula-Feedings.aspx",
          source: "AAP"
        },
        {
          title: "Breast milk",
          url: "https://en.wikipedia.org/wiki/Breast_milk",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          
          <div className="bg-primary text-white p-10 rounded-[3rem] text-center shadow-lg shadow-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
            
            <div className="flex justify-center mb-6 text-white">
              {activeTab === 'breastmilk' ? <Droplets className="w-16 h-16" /> : <Milk className="w-16 h-16" />}
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary-light mb-2 relative z-10">Estimated Daily Requirement</p>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white relative z-10 mb-4">
              {results.dailyMl} <span className="text-3xl md:text-4xl text-white/80">ml</span>
            </h2>
            <p className="text-xl text-white/90 font-medium relative z-10">
              {results.dailyOz} oz per 24 hours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm flex items-center gap-6">
              <div className="p-4 bg-primary/10 text-primary rounded-2xl shadow-inner shrink-0">
                <Activity className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xs text-text-medium uppercase font-bold tracking-wider mb-1">Per Feeding (Avg)</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-text-dark">{results.perFeedingMl} ml</span>
                  <span className="text-text-medium font-medium">({results.perFeedingOz} oz)</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm flex items-center gap-6">
              <div className="p-4 bg-accent/10 text-accent rounded-2xl shadow-inner shrink-0">
                <Baby className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xs text-text-medium uppercase font-bold tracking-wider mb-1">Feeding Frequency</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-text-dark">{results.feedingRange}</span>
                  <span className="text-text-medium font-medium">times / day</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 flex items-start gap-6 shadow-sm">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl shadow-sm shrink-0">
              <Stethoscope className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-900">Clinical Insight</h3>
              <p className="text-sm text-blue-800 mt-2 leading-relaxed">
                {results.clinicalNote}
              </p>
            </div>
          </div>

        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Breastfeeding Calorie Calculator.</p>
            </div>
            <Link to="/breastfeeding-calorie-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Breastfeeding Calorie Calculator &rarr;
            </Link>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Understanding Infant Nutritional Needs</h2>
            <p>
              The calculations provided are based on standardized pediatric guidelines, but it is crucial to understand that infant feeding is dynamic. Requirements fluctuate based on growth velocity, metabolic rate, and developmental milestones.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="font-bold text-text-dark mb-2 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-primary" />
                  Human Milk Dynamics
                </h4>
                <p className="text-sm text-text-medium leading-relaxed">Unlike formula, the macronutrient composition of human milk adapts over time. As the infant grows, the milk becomes more calorically dense, explaining why the total daily volume often plateaus around 1 month of age, even as the infant's weight increases.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="font-bold text-text-dark mb-2 flex items-center gap-2">
                  <Milk className="w-5 h-5 text-accent" />
                  Formula Considerations
                </h4>
                <p className="text-sm text-text-medium leading-relaxed">Standard infant formulas are designed to mimic the nutritional profile of mature human milk (typically 20 kcal/oz). Because the composition is static, the volume must increase linearly with the infant's weight to meet growing caloric demands.</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Signs of Adequate Hydration and Nutrition</h2>
            <p>
              While volume calculations provide a baseline, clinical observation of the infant is the most reliable indicator of adequate intake. Monitor for the following signs:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-text-medium">
              <li><strong>Urine Output:</strong> A well-hydrated infant should produce at least 6 heavy, pale-yellow wet diapers per 24-hour period.</li>
              <li><strong>Stool Frequency:</strong> Bowel movement patterns vary widely (especially between breastfed and formula-fed infants), but consistent output is a positive indicator.</li>
              <li><strong>Weight Gain:</strong> Consistent tracking along the infant's established WHO growth curve percentile during pediatric visits.</li>
              <li><strong>Satiety Cues:</strong> The infant appears relaxed and satisfied after a feeding, spontaneously releasing the breast or bottle.</li>
            </ul>
          </section>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Tool Selection Tabs */}
        <div className="flex flex-wrap gap-2 p-1 bg-white border border-border rounded-2xl">
          {[
            { id: 'breastmilk', label: 'Breast Milk' },
            { id: 'formula', label: 'Formula' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setError(null);
                setResults(null);
              }}
              className={`flex-1 min-w-[100px] py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'text-text-medium hover:bg-bg-light hover:text-text-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="p-4 bg-error/10 text-error rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-medium uppercase tracking-wider flex items-center gap-2">
              Baby's Weight (kg)
              <Tooltip content="Enter your baby's most recent weight in kilograms." />
            </label>
            <div className="relative">
              <Scale className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="input-field pl-12"
                placeholder="e.g., 5.2"
                step="0.1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-medium uppercase tracking-wider flex items-center gap-2">
              Baby's Age (weeks)
              <Tooltip content="Used to estimate the typical number of feedings per day." />
            </label>
            <div className="relative">
              <Baby className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="input-field pl-12"
                placeholder="e.g., 8"
              />
            </div>
          </div>

          <button onClick={calculate} className="btn-primary w-full py-4 text-lg">
            Calculate Needs
          </button>
        </div>
      </div>
    </CalculatorLayout>
  );
}
