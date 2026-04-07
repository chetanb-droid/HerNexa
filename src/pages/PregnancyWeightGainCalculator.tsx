import { useState, useMemo } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { calculateBMI, getBMICategory, validateNumber, generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Scale, Info, TrendingUp, AlertCircle, Activity } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'motion/react';

export default function PregnancyWeightGainCalculator() {
  const [weight, setWeight] = useState<number>(65);
  const [height, setHeight] = useState<number>(165);
  const [week, setWeek] = useState<number>(20);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const chartData = useMemo(() => {
    if (!results) return [];
    const data = [];
    const bmi = results.bmi;
    
    // Weekly gain rates based on BMI
    let rate = 1.0; // lbs/week
    if (bmi < 18.5) rate = 1.1;
    else if (bmi < 25) rate = 1.0;
    else if (bmi < 30) rate = 0.6;
    else rate = 0.5;

    for (let w = 0; w <= 40; w++) {
      let min, max;
      if (w <= 13) {
        min = (w / 13) * 1;
        max = (w / 13) * 4.5;
      } else {
        min = 1 + (w - 13) * (rate * 0.8);
        max = 4.5 + (w - 13) * (rate * 1.2);
      }
      data.push({
        week: w,
        min: parseFloat(min.toFixed(1)),
        max: parseFloat(max.toFixed(1)),
        current: w === week ? parseFloat(((min + max) / 2).toFixed(1)) : null
      });
    }
    return data;
  }, [results, week]);

  const faqs = [
    { q: "How much weight should I gain in the first trimester?", a: "According to ACOG guidelines, most women should gain between 1 and 4.5 pounds total in the first 13 weeks. If you experience hyperemesis gravidarum (severe morning sickness), you might lose a small amount of weight initially, which is usually not a concern if monitored closely by your obstetrician." },
    { q: "What if my weight gain exceeds the recommended trajectory?", a: "The IOM guidelines represent population averages associated with optimal outcomes. Individual factors like edema (water retention), multiple gestations, and metabolic variations play a significant role. Rapid, sudden weight gain (e.g., >2 lbs in a week) should be reported to your provider as it can be an early sign of preeclampsia." },
    { q: "Is it safe to restrict calories to control weight gain during pregnancy?", a: "No. Caloric restriction during pregnancy is contraindicated as it can lead to fetal growth restriction and maternal nutritional deficiencies. Focus on the quality of your diet (nutrient density) rather than strict caloric limits." }
  ];

  const calculate = () => {
    setError(null);
    
    const weightError = validateNumber(weight, 30, 250, 'Pre-pregnancy weight');
    if (weightError) { setError(weightError); return; }
    
    const heightError = validateNumber(height, 100, 250, 'Height');
    if (heightError) { setError(heightError); return; }

    const bmi = parseFloat(calculateBMI(weight, height));
    const { category, weightGain } = getBMICategory(bmi);
    
    // Simplified gain logic based on IOM
    let rate = 1.0;
    if (bmi < 18.5) rate = 1.1;
    else if (bmi < 25) rate = 1.0;
    else if (bmi < 30) rate = 0.6;
    else rate = 0.5;

    const expectedMin = week <= 13 ? (week / 13) * 1 : 1 + (week - 13) * (rate * 0.8);
    const expectedMax = week <= 13 ? (week / 13) * 4.5 : 4.5 + (week - 13) * (rate * 1.2);

    setResults({
      bmi,
      category,
      totalRange: weightGain,
      expectedNow: `${expectedMin.toFixed(1)} - ${expectedMax.toFixed(1)} lbs`,
      progress: Math.min(Math.round((week / 40) * 100), 100),
      rate: rate.toFixed(1)
    });
  };

  return (
    <CalculatorLayout
      title="Clinical Pregnancy Weight Gain Tracker"
      description="Track your healthy pregnancy weight gain based on your pre-pregnancy BMI. Get personalized recommendations for every week of your pregnancy. Expert guidance for a healthy baby."
      intro="Healthy weight gain is a vital part of a successful pregnancy, supporting fetal growth, placental development, and maternal fat stores for breastfeeding. Our clinical calculator uses the Institute of Medicine (IOM) guidelines to provide a personalized weight gain trajectory based on your pre-pregnancy Body Mass Index (BMI) and current gestational age."
      schema={[
        generateSoftwareAppSchema(
          "Clinical Pregnancy Weight Gain Tracker",
          "Personalized pregnancy weight gain tracker based on IOM guidelines.",
          "https://femhealth.com/pregnancy-weight-gain-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Pregnancy Weight Gain Calculator", item: "https://femhealth.com/pregnancy-weight-gain-calculator" }
        ])
      ]}
      howItWorks={
        <div className="space-y-4">
          <p>This calculator determines your recommended weight gain range using the clinical methodology established by the Institute of Medicine (IOM) and endorsed by ACOG:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Pre-Pregnancy BMI Calculation:</strong> Your starting weight and height are used to calculate your baseline BMI, which dictates your overall target range. Women with a lower BMI require more weight gain to support fetal growth, while those with a higher BMI require less.</li>
            <li><strong>First Trimester (Weeks 1-13):</strong> Weight gain is typically minimal (1 to 4.5 lbs total) as the fetus is very small. Some women may even lose weight due to hyperemesis gravidarum (severe morning sickness).</li>
            <li><strong>Second & Third Trimesters:</strong> Weight gain accelerates and becomes more steady. The recommended weekly gain depends on your starting BMI category (e.g., ~1 lb/week for normal BMI, ~0.5 lb/week for obese BMI).</li>
            <li><strong>Where the Weight Goes:</strong> The total weight gained is distributed among the baby (7-8 lbs), placenta (1.5 lbs), amniotic fluid (2 lbs), uterine enlargement (2 lbs), maternal breast tissue (2 lbs), increased blood volume (4 lbs), increased fluid volume (4 lbs), and maternal fat stores (7 lbs).</li>
          </ul>
        </div>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Due Date Calculator", path: "/due-date-calculator" },
        { name: "Baby Size Comparator", path: "/baby-size-comparator" },
        { name: "Miscarriage Risk Calculator", path: "/miscarriage-risk-calculator" }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-primary text-white p-10 rounded-[3rem] text-center shadow-lg shadow-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
            
            <div className="flex justify-center mb-6 text-white">
              <Scale className="w-16 h-16" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary-light mb-2 relative z-10">Total Recommended Gain</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white relative z-10">{results.totalRange}</h2>
            <p className="text-white/90 mt-4 font-medium flex items-center justify-center gap-2 relative z-10">
              Based on pre-pregnancy BMI: {results.bmi} ({results.category})
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4">
              <div className="p-3 bg-accent/10 text-accent rounded-xl shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-text-medium font-bold uppercase tracking-wider mb-1">Expected at Week {week}</p>
                <p className="text-2xl font-bold text-text-dark">{results.expectedNow}</p>
                <p className="text-xs text-text-medium mt-1">Cumulative gain target</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4">
              <div className="p-3 bg-secondary/10 text-secondary rounded-xl shrink-0">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-text-medium font-bold uppercase tracking-wider mb-1">Current Target Rate</p>
                <p className="text-lg font-bold text-text-dark leading-tight">~{results.rate} lbs / week</p>
                <p className="text-xs text-text-medium mt-1">For 2nd & 3rd trimesters</p>
              </div>
            </div>
          </div>

          <div className="results-section !mt-0 space-y-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-success" />
              <h3 className="font-bold text-text-dark text-lg">Weight Gain Curve (Week 0-40)</h3>
            </div>
            
            <div className="h-[300px] w-full bg-neutral-50/50 rounded-2xl p-4 border border-neutral-100">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorGain" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E11D48" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#E11D48" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                  <XAxis 
                    dataKey="week" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 12, fill: '#737373'}}
                    label={{ value: 'Week', position: 'insideBottom', offset: -5, fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 12, fill: '#737373'}}
                    label={{ value: 'Lbs', angle: -90, position: 'insideLeft', fontSize: 12 }}
                  />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="max" 
                    stroke="#E11D48" 
                    fillOpacity={1} 
                    fill="url(#colorGain)" 
                    strokeWidth={2}
                    name="Upper Limit"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="min" 
                    stroke="#FDA4AF" 
                    fill="#fff" 
                    fillOpacity={1}
                    strokeWidth={2}
                    name="Lower Limit"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed italic">
              Note: These ranges are for singleton pregnancies. If you are expecting twins or multiples, your weight gain requirements will be higher.
            </p>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">How Pregnancy Weight Gain is Calculated</h2>
            <p>
              Our calculator uses the official 2009 guidelines established by the Institute of Medicine (IOM), which are the standard used by obstetricians worldwide. The calculation is a two-step process that relies heavily on your starting body composition:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-text-medium">
              <li><strong>Step 1: Establishing Pre-Pregnancy BMI:</strong> The algorithm first calculates your Body Mass Index (BMI) using your pre-pregnancy weight and height. BMI is calculated by dividing your weight in kilograms by your height in meters squared. This categorizes your starting point into one of four groups: Underweight (&lt;18.5), Normal Weight (18.5-24.9), Overweight (25.0-29.9), or Obese (≥30.0).</li>
              <li><strong>Step 2: Applying IOM Total Gain Ranges:</strong> Based on your BMI category, the IOM prescribes a total target weight gain for the entire 40 weeks. Women who start underweight need to gain more (28-40 lbs) to support fetal growth, while women who start in the obese category are advised to gain less (11-20 lbs) because their bodies already have sufficient fat stores to support the pregnancy.</li>
              <li><strong>Step 3: Calculating the Weekly Curve:</strong> Weight gain is not linear. The calculator assumes a standard curve: minimal gain in the first trimester (1-4.5 lbs total for most women), followed by a steady, faster rate of gain (about 0.5 to 1 lb per week, depending on BMI) throughout the second and third trimesters. The "Expected Gain at Week X" result is derived by plotting your current week along this specific curve.</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">What Your Results Actually Mean</h2>
            <p>
              The numbers provided by the calculator are clinical targets designed to optimize the health of both mother and baby. Here is a detailed breakdown of how to interpret your specific results:
            </p>
            <div className="space-y-6 mt-6">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Recommended Total Gain</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  This is your "finish line" target for 40 weeks. Hitting this target range significantly reduces the risk of complications. Gaining below this range increases the risk of having a baby that is Small for Gestational Age (SGA) or born prematurely. Gaining above this range increases the risk of gestational diabetes, hypertension, a Large for Gestational Age (LGA) baby, and difficulties losing the weight postpartum.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Expected Gain at Current Week</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  This is the most actionable number. It tells you where your weight should be <em>right now</em>. If your actual weight gain is currently below this range, your doctor may suggest increasing your caloric intake with nutrient-dense foods. If your actual gain is above this range, your doctor may suggest evaluating your diet to reduce empty calories, though you should <strong>never</strong> actively try to lose weight during pregnancy.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">The "Water Weight" Factor</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  It is important to understand that sudden spikes in weight, especially in the third trimester, are often due to fluid retention (edema) rather than fat gain. However, a sudden, rapid weight gain (e.g., more than 2-3 lbs in a single week) combined with swelling in the face or hands can be a sign of preeclampsia and should be reported to your doctor immediately.
                </p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-text-dark">Where Does the Weight Go?</h3>
              <p className="text-sm leading-relaxed text-text-medium">
                It's a common misconception that all pregnancy weight is "fat." In reality, a 30-pound weight gain is distributed across several vital areas:
              </p>
              <ul className="text-sm space-y-2 list-disc pl-5 text-text-medium">
                <li><strong>Baby:</strong> 7-8 pounds</li>
                <li><strong>Placenta:</strong> 1-2 pounds</li>
                <li><strong>Amniotic Fluid:</strong> 2 pounds</li>
                <li><strong>Uterus & Breast Tissue:</strong> 4-5 pounds</li>
                <li><strong>Increased Blood & Fluid:</strong> 7-9 pounds</li>
                <li><strong>Maternal Fat Stores:</strong> 6-8 pounds (necessary for breastfeeding)</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-text-dark">Multiples (Twins/Triplets)</h3>
              <p className="text-sm leading-relaxed text-text-medium">
                The targets provided by this calculator are strictly for singleton pregnancies (one baby). If you are carrying twins, the IOM guidelines are significantly higher: 37-54 lbs for normal weight, 31-50 lbs for overweight, and 25-42 lbs for obese women.
              </p>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4 text-center">Expert Insight: Quality Over Quantity</h3>
            <p className="text-sm text-center max-w-2xl mx-auto leading-relaxed italic text-text-medium">
              "Pregnancy is not about 'eating for two' in terms of calories, but it is about 'eating for two' in terms of nutrients. Focus on lean proteins, healthy fats, and complex carbohydrates. A steady weight gain is usually a sign that your baby is getting exactly what they need to thrive. Do not obsess over the scale daily; look at the overall trend."
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <Tooltip content="Your weight before you became pregnant, in kilograms." showIcon>
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
            <Tooltip content="Your current height in centimeters." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Height (cm)</label>
            </Tooltip>
            <input 
              type="number" 
              value={height}
              onChange={(e) => setHeight(parseFloat(e.target.value))}
              className="input-field"
            />
          </div>
          <div className="space-y-3">
            <Tooltip content="The current week of your pregnancy (1-40)." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Current Week</label>
            </Tooltip>
            <select 
              value={week}
              onChange={(e) => setWeek(parseInt(e.target.value))}
              className="input-field"
            >
              {Array.from({ length: 37 }, (_, i) => i + 4).map(w => (
                <option key={w} value={w}>Week {w}</option>
              ))}
            </select>
          </div>
        </div>

        <Tooltip content="Calculate your expected weight gain range for your current week of pregnancy based on medical guidelines.">
          <button 
            onClick={calculate}
            className="btn-primary w-full text-lg"
          >
            Calculate Weight Gain
          </button>
        </Tooltip>
      </div>
    </CalculatorLayout>
  );
}
