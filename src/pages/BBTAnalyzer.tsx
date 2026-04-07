import { useState, useMemo } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Thermometer, Info, Activity, Calendar, CheckCircle2, AlertCircle, TrendingUp, Sparkles } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';

export default function BBTAnalyzer() {
  const [temps, setTemps] = useState<string>("97.2, 97.3, 97.1, 97.4, 97.2, 97.5, 97.8, 98.1, 98.2, 98.0");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const tempArray = temps.split(',').map(t => parseFloat(t.trim())).filter(t => !isNaN(t));
    if (tempArray.length < 5) return;
    
    const chartData = tempArray.map((t, i) => ({ day: i + 1, temp: t }));
    
    // Find biphasic shift
    let shiftDay = -1;
    let coverline = 0;
    
    // Simple 3-over-6 rule
    for (let i = 6; i < tempArray.length - 2; i++) {
      const previous6 = tempArray.slice(i - 6, i);
      const next3 = tempArray.slice(i, i + 3);
      
      const maxPrevious6 = Math.max(...previous6);
      const minNext3 = Math.min(...next3);
      
      if (minNext3 > maxPrevious6 + 0.1) {
        shiftDay = i + 1;
        coverline = maxPrevious6 + 0.1;
        break;
      }
    }
    
    setResults({ chartData, shiftDay, coverline });
  };

  const faqs = [
    { q: "What is BBT?", a: "Basal Body Temperature (BBT) is your lowest body temperature in a 24-hour period, usually measured immediately after waking up, before any physical activity." },
    { q: "How does BBT confirm ovulation?", a: "After ovulation, the corpus luteum produces progesterone, which causes your BBT to rise by about 0.5 to 1.0 degree Fahrenheit and stay elevated until your next period." },
    { q: "When should I take my BBT?", a: "Take your temperature at the same time every morning, before getting out of bed, after at least 3-5 hours of uninterrupted sleep. Use a basal thermometer that measures to two decimal places." },
    { q: "What is a coverline?", a: "A coverline is a horizontal line drawn on your chart to separate pre-ovulatory temperatures from post-ovulatory temperatures. It helps visually confirm the thermal shift." }
  ];

  return (
    <CalculatorLayout
      title="BBT Analyzer & Charting Tool"
      description="Analyze your Basal Body Temperature patterns to confirm ovulation. Track your thermal shift and luteal phase with our advanced charting tool."
      intro="Tracking your Basal Body Temperature (BBT) is one of the most reliable ways to confirm that ovulation has actually occurred. Unlike ovulation tests which predict when ovulation *might* happen, BBT confirms it *after* the fact. This tool helps you visualize your temperature shift and identify your fertile patterns."
      schema={[
        generateSoftwareAppSchema("BBT Analyzer", "Analyze BBT patterns and confirm ovulation", "https://femhealth.com/bbt-analyzer"),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "BBT Analyzer", item: "https://femhealth.com/bbt-analyzer" }
        ])
      ]}
      faqs={faqs}
      howItWorks={
        <div className="space-y-4">
          <p>The BBT Analyzer uses the '3-over-6' rule to identify a biphasic pattern in your temperature chart:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>The Baseline:</strong> We look for 6 consecutive days of lower temperatures.</li>
            <li><strong>The Shift:</strong> A rise of at least 0.2-0.5°F over the highest of the previous 6 days.</li>
            <li><strong>The Confirmation:</strong> The temperature must stay above the 'coverline' for at least 3 consecutive days to confirm ovulation.</li>
          </ul>
        </div>
      }
      relatedTools={[
        { name: "Cervical Mucus Tracker", path: "/cervical-mucus-tracker" },
        { name: "Ovulation Calculator", path: "/ovulation-calculator" },
        { name: "Fertility Window", path: "/fertility-window-calculator" }
      ]}
      results={results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="space-y-8"
        >
          <div className="bg-white p-8 rounded-[2.5rem] border border-primary-light shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text-dark flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Your BBT Chart
              </h3>
              {results.shiftDay !== -1 && (
                <span className="px-4 py-1 bg-success/10 text-success text-xs font-bold rounded-full uppercase tracking-wider">
                  Ovulation Confirmed
                </span>
              )}
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={results.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff8da1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ff8da1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                    label={{ value: 'Cycle Day', position: 'insideBottom', offset: -5, fontSize: 12, fill: '#94a3b8' }} 
                  />
                  <YAxis 
                    domain={['dataMin - 0.2', 'dataMax + 0.2']} 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                  />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  {results.coverline > 0 && (
                    <ReferenceLine y={results.coverline} stroke="#94a3b8" strokeDasharray="3 3" label={{ position: 'right', value: 'Coverline', fill: '#94a3b8', fontSize: 10 }} />
                  )}
                  <Area 
                    type="monotone" 
                    dataKey="temp" 
                    stroke="#ff8da1" 
                    fill="url(#colorTemp)" 
                    strokeWidth={4} 
                    dot={{ r: 4, fill: '#ff8da1', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={`p-8 rounded-[2rem] border text-center ${results.shiftDay !== -1 ? 'bg-success/5 border-success/20' : 'bg-amber-50 border-amber-100'}`}>
            <div className="flex justify-center mb-4">
              {results.shiftDay !== -1 ? (
                <CheckCircle2 className="w-12 h-12 text-success" />
              ) : (
                <AlertCircle className="w-12 h-12 text-amber-500" />
              )}
            </div>
            <h4 className="text-2xl font-serif font-bold text-text-dark mb-2">
              {results.shiftDay !== -1 ? "Thermal Shift Detected!" : "No Clear Shift Detected"}
            </h4>
            <p className="text-text-medium leading-relaxed max-w-lg mx-auto">
              {results.shiftDay !== -1 
                ? `A clear thermal shift was identified starting on Day ${results.shiftDay}. This indicates that ovulation likely occurred on Day ${results.shiftDay - 1}.` 
                : "Your temperatures don't yet show a sustained rise. This could be because ovulation hasn't happened yet, or your data is 'noisy' due to inconsistent measurement times."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-primary-light flex items-start gap-4">
              <div className="p-3 bg-primary-light/20 text-primary rounded-xl shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold text-text-dark">Luteal Phase Length</h5>
                <p className="text-sm text-text-medium mt-1 leading-relaxed">
                  The days after your shift until your next period represent your luteal phase. A healthy luteal phase is typically 10-16 days long.
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-primary-light flex items-start gap-4">
              <div className="p-3 bg-primary-light/20 text-primary rounded-xl shrink-0">
                <Thermometer className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold text-text-dark">Coverline Value</h5>
                <p className="text-sm text-text-medium mt-1 leading-relaxed">
                  Your calculated coverline is <strong>{results.coverline.toFixed(2)}°F</strong>. Temperatures above this line confirm progesterone activity.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">The Science of BBT Tracking</h2>
            <p>
              Basal Body Temperature (BBT) tracking is a method of fertility awareness that relies on the thermogenic effect of progesterone. Before ovulation, your temperature is lower (typically 97.0–97.7°F). After ovulation, the corpus luteum releases progesterone, which acts on the hypothalamus to raise your body's set-point temperature by 0.5–1.0°F.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">Pre-Ovulatory Phase</h4>
                <p className="text-sm text-text-medium leading-relaxed">Estrogen is dominant. Temperatures are lower and may fluctuate slightly but stay below the eventual coverline.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">The Thermal Shift</h4>
                <p className="text-sm text-text-medium leading-relaxed">A sudden or gradual rise in temperature that stays elevated for at least 3 days confirms ovulation has occurred.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">Post-Ovulatory Phase</h4>
                <p className="text-sm text-text-medium leading-relaxed">Progesterone is dominant. Temperatures stay high until the corpus luteum breaks down, triggering your period.</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Tips for Accurate BBT Charting</h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-text-dark">Consistency is Key</h4>
                  <p className="text-sm text-text-medium">Take your temperature at the exact same time every morning. Even a 30-minute difference can cause a 0.1-0.2 degree variance.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-text-dark">Before You Move</h4>
                  <p className="text-sm text-text-medium">Do not get out of bed, drink water, or even talk before taking your temp. Any physical activity raises your body temperature.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-bold text-text-dark">Note Disturbed Sleep</h4>
                  <p className="text-sm text-text-medium">Alcohol, travel, illness, or less than 3 hours of sleep can all cause "outlier" temperatures that should be marked on your chart.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10 text-center">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4">Expert Insight: BBT vs. OPKs</h3>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed text-text-medium italic">
              "Ovulation Predictor Kits (OPKs) detect the LH surge that *precedes* ovulation, but they don't guarantee the egg was actually released. BBT is the only at-home method that confirms ovulation has successfully taken place by tracking the metabolic shift caused by progesterone."
            </p>
          </section>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Tooltip content="Enter your daily temperatures in order, separated by commas. Example: 97.2, 97.4, 97.1..." showIcon>
              <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Daily Temperatures (°F)</label>
            </Tooltip>
            <div className="flex items-center gap-2 text-primary">
              <Thermometer className="w-4 h-4" />
              <span className="text-xs font-bold">Fahrenheit</span>
            </div>
          </div>
          <textarea 
            value={temps} 
            onChange={(e) => setTemps(e.target.value)} 
            className="input-field h-40 font-mono text-sm leading-relaxed resize-none p-6" 
            placeholder="97.2, 97.3, 97.1, 97.4, 97.2, 97.5, 97.8, 98.1, 98.2, 98.0" 
          />
          <div className="flex items-start gap-3 p-4 bg-bg-light rounded-xl">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-[11px] text-text-medium leading-relaxed">
              Enter at least 6-10 days of data for the most accurate analysis. The tool will automatically look for the biphasic shift.
            </p>
          </div>
        </div>
        <button 
          onClick={calculate} 
          className="btn-primary w-full py-5 text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
        >
          <Activity className="w-5 h-5" />
          Analyze My BBT Chart
        </button>
      </div>
    </CalculatorLayout>
  );
}
