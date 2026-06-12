import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { validateNumber, generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Activity, Info, TrendingUp, Heart, Sparkles, AlertCircle } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

export default function BloodVolumeCalculator() {
  const [weight, setWeight] = useState<number>(65);
  const [weeks, setWeeks] = useState<number>(20);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const chartData = useMemo(() => {
    const data = [];
    const baseVolume = weight * 67;
    for (let w = 0; w <= 40; w++) {
      let increasePercent = 0;
      if (w >= 34) increasePercent = 0.45;
      else if (w >= 6) increasePercent = (w - 6) / (34 - 6) * 0.45;
      
      const totalVolume = baseVolume * (1 + increasePercent);
      data.push({
        week: w,
        volume: parseFloat((totalVolume / 1000).toFixed(2)),
        base: parseFloat((baseVolume / 1000).toFixed(2))
      });
    }
    return data;
  }, [weight]);

  const faqs = [
    { q: "Why does blood volume increase so much?", a: "The extra blood is needed to fill the placenta, provide nutrients to the baby, and protect the mother from the blood loss that occurs during childbirth." },
    { q: "Can a low blood volume be dangerous?", a: "Yes, inadequate plasma expansion is sometimes linked to complications like preeclampsia or restricted fetal growth. Your doctor monitors your blood pressure and iron levels to ensure healthy adaptation." },
    { q: "Does blood volume return to normal after birth?", a: "Yes, most of the extra fluid is lost within the first few weeks after delivery through increased urination and sweating." }
  ];

  const calculate = () => {
    setError(null);
    
    const weightError = validateNumber(weight, 30, 250, 'Pre-pregnancy weight');
    if (weightError) { setError(weightError); return; }
    
    const weeksError = validateNumber(weeks, 0, 42, 'Pregnancy week');
    if (weeksError) { setError(weeksError); return; }

    // Standard blood volume: ~65-70 ml/kg
    const baseVolume = weight * 67;
    
    // Pregnancy increase: starts around 6 weeks, peaks at 34 weeks
    // Total increase is about 40-50%
    let increasePercent = 0;
    if (weeks >= 34) increasePercent = 0.45;
    else if (weeks >= 6) increasePercent = (weeks - 6) / (34 - 6) * 0.45;

    const totalVolume = baseVolume * (1 + increasePercent);
    const increaseMl = totalVolume - baseVolume;

    setResults({
      baseVolume: Math.round(baseVolume),
      totalVolume: Math.round(totalVolume),
      increaseMl: Math.round(increaseMl),
      increasePercent: Math.round(increasePercent * 100)
    });
  };

  return (
    <CalculatorLayout
      title="Pregnancy Blood Volume Calculator | Pregnancy Symptoms"
      description="Estimate your pregnancy blood volume increase. Understand how your body adapts to support your baby and what pregnancy symptoms to expect."
      intro="During pregnancy, your body undergoes remarkable changes to support your developing baby. One of the most significant adaptations is a massive increase in blood volume, which helps provide oxygen and nutrients to the placenta, and can contribute to various common <strong>pregnancy symptoms</strong>. Our calculator estimates this increase based on your weight and stage of pregnancy."
      schema={[
        generateSoftwareAppSchema(
          "Blood Volume Calculator",
          "Estimate pregnancy blood volume increase.",
          "https://femhealth.com/blood-volume-calculator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Blood Volume Calculator", item: "https://femhealth.com/blood-volume-calculator" }
        ])
      ]}
      howItWorks={
        <>
          <p>This calculator uses standard physiological models for pregnancy-related cardiovascular changes:</p>
          <ul>
            <li><strong>Base Volume:</strong> Calculated as approximately 67ml of blood per kilogram of pre-pregnancy body weight.</li>
            <li><strong>Plasma Expansion:</strong> Most of the increase is due to an expansion of blood plasma, which starts in the first trimester.</li>
            <li><strong>Peak Increase:</strong> Blood volume typically increases by 40-50% above pre-pregnancy levels by the 34th week.</li>
            <li><strong>Purpose:</strong> This extra blood protects the mother from blood loss during delivery and supports the baby's growth.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Pregnancy Weight Gain", path: "/pregnancy-weight-gain-calculator" },
        { name: "Pregnancy BMI Calculator", path: "/pregnancy-bmi-calculator" },
        { name: "Fetal Size Calculator", path: "/fetal-size-calculator" }
      ]}
      medicalReferences={[
        {
          title: "Maternal Cardiovascular Adaptation to Pregnancy",
          url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4167332/",
          source: "PubMed"
        },
        {
          title: "Physiological Changes in Pregnancy",
          url: "https://www.msdmanuals.com/professional/gynecology-and-obstetrics/approach-to-the-pregnant-woman-and-prenatal-care/physiology-of-pregnancy",
          source: "MSD Manuals"
        },
        {
          title: "Blood Volume Expansion in Pregnancy",
          url: "https://pubmed.ncbi.nlm.nih.gov/4075604/",
          source: "PubMed"
        },
        {
          title: "Maternal physiological changes in pregnancy",
          url: "https://en.wikipedia.org/wiki/Maternal_physiological_changes_in_pregnancy",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center space-y-2">
            <p className="text-primary font-bold uppercase tracking-widest text-xs">Estimated Total Blood Volume</p>
            <h2 className="text-5xl md:text-6xl font-bold text-text-dark">{(results.totalVolume / 1000).toFixed(1)} Liters</h2>
            <p className="text-text-medium font-medium">An increase of {results.increasePercent}% from pre-pregnancy</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-primary" />
              <h3 className="font-bold text-text-dark text-lg">Volume Expansion Curve</h3>
            </div>
            
            <div className="w-full overflow-x-auto pb-2">
              <div className="h-[220px] md:h-[250px] min-w-[450px] md:min-w-full w-full pr-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 20, right: 20, left: 30, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E11D48" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#E11D48" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="week" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 12, fill: '#a3a3a3'}}
                    minTickGap={20}
                    height={40}
                    label={{ value: 'Week', position: 'insideBottom', offset: -10, fontSize: 12, fill: '#a3a3a3' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fill: '#a3a3a3'}}
                    domain={['dataMin - 1', 'dataMax + 1']}
                  />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="volume" 
                    stroke="#E11D48" 
                    fillOpacity={1} 
                    fill="url(#colorVol)" 
                    strokeWidth={3}
                    name="Total Volume (L)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="base" 
                    stroke="#e5e5e5" 
                    fill="transparent" 
                    strokeDasharray="5 5"
                    name="Pre-Pregnancy (L)"
                  />
                </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl border border-primary-light flex items-center gap-4 shadow-sm">
              <div className="p-3 bg-bg-light text-primary rounded-xl"><Activity className="w-6 h-6" /></div>
              <div>
                <p className="text-xs text-text-medium uppercase font-bold tracking-wider">Base Volume</p>
                <p className="font-bold text-text-dark">{(results.baseVolume / 1000).toFixed(1)} L</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-primary-light flex items-center gap-4 shadow-sm">
              <div className="p-3 bg-bg-light text-accent rounded-xl"><TrendingUp className="w-6 h-6" /></div>
              <div>
                <p className="text-xs text-text-medium uppercase font-bold tracking-wider">Total Increase</p>
                <p className="font-bold text-text-dark">{(results.increaseMl / 1000).toFixed(1)} L</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800 leading-relaxed italic">
              Note: This is an estimate based on average physiological data. Individual blood volume expansion can vary significantly.
            </p>
          </div>
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Pregnancy Weight Gain.</p>
            </div>
            <Link to="/pregnancy-weight-gain-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Pregnancy Weight Gain &rarr;
            </Link>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">How Pregnancy Blood Volume is Calculated</h2>
            <p>
              Estimating the increase in maternal blood volume relies on established physiological models of how the cardiovascular system adapts to pregnancy. Here is the breakdown of the mathematical and biological principles behind our calculator:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-text-medium">
              <li><strong>Establishing the Baseline:</strong> Before pregnancy, a woman's total blood volume is directly correlated to her body mass. The standard medical constant used is approximately 65 to 70 milliliters of blood per kilogram of body weight. Our calculator uses a baseline of 67 ml/kg to establish your starting volume.</li>
              <li><strong>The Timeline of Expansion:</strong> Blood volume does not increase linearly. The expansion begins early in the first trimester (around 6 weeks), accelerates rapidly during the second trimester, and typically peaks and plateaus around 32 to 34 weeks of gestation.</li>
              <li><strong>The Peak Percentage:</strong> By the time the expansion peaks, a healthy singleton pregnancy will result in a 40% to 50% increase in total blood volume compared to pre-pregnancy levels. For women carrying twins or multiples, this increase can be even more dramatic, sometimes reaching 60% or higher.</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">What Your Results Actually Mean</h2>
            <p>
              The numbers provided by the calculator illustrate the massive internal workload your body is taking on. Here is how to interpret these specific metrics:
            </p>
            <div className="space-y-6 mt-6">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Estimated Total Blood Volume</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  This is the total amount of blood currently circulating in your body. To put this in perspective, an average non-pregnant woman has about 4.5 liters of blood. By the third trimester, you may have over 6.5 liters. Your heart has to work significantly harder—increasing its cardiac output by 30-50%—to pump this extra fluid, which is why your resting heart rate increases by 10 to 20 beats per minute during pregnancy.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Total Increase (Liters)</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  This number represents the absolute volume of <em>new</em> blood your body has manufactured. This extra volume serves three critical purposes: it fills the newly created vascular system of the placenta, it ensures a steady supply of oxygen and nutrients to the growing fetus, and it acts as a crucial safety reserve to protect you from the inevitable blood loss that occurs during childbirth.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="text-lg font-bold text-text-dark mb-2">Plasma vs. Red Blood Cells</h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  It is important to note that this new volume is not a perfect mix of blood components. The liquid portion of the blood (plasma) increases much more rapidly and in a greater amount than the red blood cells. This creates a state of "hemodilution," often referred to as physiological anemia of pregnancy. Because the blood is diluted, your hemoglobin concentration drops, which is why iron supplementation is so frequently recommended.
                </p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-text-dark">Symptoms of Volume Expansion</h3>
              <p className="text-sm leading-relaxed text-text-medium">
                This massive increase in fluid is responsible for many common pregnancy symptoms. It causes the "pregnancy glow" (increased blood flow to the skin), but it also causes nasal congestion, bleeding gums, varicose veins, and swelling (edema) in the lower extremities as the heavy uterus compresses veins returning blood from the legs.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-text-dark">Postpartum Recovery</h3>
              <p className="text-sm leading-relaxed text-text-medium">
                What happens to all this extra blood after the baby is born? Aside from the blood lost during delivery, your body rapidly begins to shed the excess plasma. In the days and weeks following birth, you will likely experience profound sweating (night sweats) and increased urination as your kidneys work overtime to return your blood volume to its pre-pregnancy baseline.
              </p>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4 text-center">Expert Insight: The "Natural Safety Net"</h3>
            <p className="text-sm text-center max-w-2xl mx-auto leading-relaxed italic text-text-medium">
              "The expansion of blood volume is one of nature's most effective safety mechanisms. By increasing the amount of fluid in your system, your body creates a reserve that protects both you and your baby during the transition of delivery. It's a testament to the incredible resilience of the female body. Staying hydrated is the best way you can support this process."
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
            <Tooltip content="Enter your weight before pregnancy to calculate your base blood volume." showIcon>
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
            <Tooltip content="Enter your current week of pregnancy to estimate the increase in blood volume." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Current Week of Pregnancy</label>
            </Tooltip>
            <input 
              type="number" 
              value={weeks}
              onChange={(e) => setWeeks(parseInt(e.target.value))}
              className="input-field"
            />
          </div>
        </div>

        <Tooltip content="Calculate your estimated total blood volume and the increase from pre-pregnancy levels.">
          <button 
            onClick={calculate}
            className="btn-primary w-full text-lg"
          >
            Calculate Blood Volume
          </button>
        </Tooltip>
      </div>
    </CalculatorLayout>
  );
}
