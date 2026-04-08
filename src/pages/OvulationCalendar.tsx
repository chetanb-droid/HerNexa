import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema } from '../lib/calculators';
import { Calendar as CalendarIcon, Droplets, Heart, Info } from 'lucide-react';
import { format, addDays, subDays, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, getDay } from 'date-fns';

export default function OvulationCalendar() {
  const [lmp, setLmp] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodLength, setPeriodLength] = useState<number>(5);
  const [results, setResults] = useState<any>(null);

  const faqs = [
    { q: "How accurate is an ovulation calendar?", a: "An ovulation calendar is highly accurate for women with regular menstrual cycles. However, if your cycles vary by more than a few days each month, the calendar serves as an estimate, and you should use ovulation predictor kits (OPKs) for exact timing." },
    { q: "What do the different colors on the calendar mean?", a: "Red indicates your expected period days. Green indicates your fertile window (the days you are most likely to conceive). The darkest green or a heart icon marks your estimated ovulation day." },
    { q: "Can I use this calendar to avoid pregnancy?", a: "While this calendar uses the rhythm method, it is NOT recommended as a sole method of birth control. Sperm can live up to 5 days, and ovulation can shift due to stress or illness, making the calendar method risky for pregnancy prevention." }
  ];

  const calculate = () => {
    if (!lmp) return;

    const startDate = parseISO(lmp);
    const months = [];

    // Generate 3 months of data
    for (let i = 0; i < 3; i++) {
      const currentMonthStart = startOfMonth(addMonths(startDate, i));
      const currentMonthEnd = endOfMonth(currentMonthStart);
      const daysInMonth = eachDayOfInterval({ start: currentMonthStart, end: currentMonthEnd });
      
      // Calculate cycle events for this specific month
      // We need to find all cycles that intersect with this month
      const cycleEvents: any[] = [];
      
      // Look back 1 cycle and forward 3 cycles to ensure we cover the month
      for (let j = -1; j < 4; j++) {
        const cycleStart = addDays(startDate, j * cycleLength);
        const cycleEnd = addDays(cycleStart, cycleLength - 1);
        
        const periodEnd = addDays(cycleStart, periodLength - 1);
        const ovulationDay = addDays(cycleStart, cycleLength - 14);
        const fertileStart = subDays(ovulationDay, 5);
        const fertileEnd = ovulationDay;

        cycleEvents.push({
          cycleStart,
          periodEnd,
          fertileStart,
          fertileEnd,
          ovulationDay
        });
      }

      months.push({
        date: currentMonthStart,
        days: daysInMonth,
        events: cycleEvents
      });
    }

    setResults(months);
  };

  const getDayClass = (day: Date, events: any[]) => {
    for (const event of events) {
      if (day >= event.cycleStart && day <= event.periodEnd) {
        return 'bg-rose-100 text-rose-700 font-bold border-rose-200'; // Period
      }
      if (isSameDay(day, event.ovulationDay)) {
        return 'bg-emerald-500 text-white font-bold shadow-md'; // Ovulation
      }
      if (day >= event.fertileStart && day <= event.fertileEnd) {
        return 'bg-emerald-100 text-emerald-700 font-medium border-emerald-200'; // Fertile Window
      }
    }
    return 'bg-white text-neutral-700 hover:bg-neutral-50'; // Normal day
  };

  const getDayIcon = (day: Date, events: any[]) => {
    for (const event of events) {
      if (isSameDay(day, event.ovulationDay)) {
        return <Heart className="w-3 h-3 absolute bottom-1 right-1 text-white" />;
      }
      if (day >= event.cycleStart && day <= event.periodEnd) {
        return <Droplets className="w-3 h-3 absolute bottom-1 right-1 text-rose-400" />;
      }
    }
    return null;
  };

  return (
    <CalculatorLayout
      title="Ovulation Calendar & Tracker"
      description="Generate a personalized 3-month ovulation calendar to track your period, fertile window, and exact ovulation day."
      intro={<>Planning a pregnancy? Our visual Ovulation Calendar maps out your next 3 menstrual cycles. See exactly when your period is due, when your <Link to="/fertility-window-calculator" className="text-primary hover:underline font-medium">fertile window</Link> opens, and your highest chance of conception.</>}
      schema={[
        generateSoftwareAppSchema(
          "Ovulation Calendar",
          "Generate a 3-month visual ovulation and period calendar.",
          "https://femhealth.com/ovulation-calendar"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://femhealth.com" },
          { name: "Tools", item: "https://femhealth.com/tools" },
          { name: "Ovulation Calendar", item: "https://femhealth.com/ovulation-calendar" }
        ])
      ]}
      howItWorks={
        <>
          <p>This calendar uses the standard rhythm method to project your cycles into the future:</p>
          <ul>
            <li><strong>Period Days (Red):</strong> Calculated based on your average cycle length and period duration.</li>
            <li><strong>Fertile Window (Light Green):</strong> The 5 days leading up to ovulation. Sperm can survive in the reproductive tract for up to 5 days, making these days crucial for conception.</li>
            <li><strong>Ovulation Day (Dark Green):</strong> Typically occurs 14 days before the start of your next period. This is the day the egg is released.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Fertility Window Calculator", path: "/fertility-window-calculator" },
        { name: "Time to Conceive", path: "/time-to-conceive-calculator" },
        { name: "Period Calculator", path: "/period-calculator" }
      ]}
      medicalReferences={[
        {
          title: "Ovulation and Fertility",
          url: "https://www.mayoclinic.org/healthy-lifestyle/getting-pregnant/in-depth/ovulation-signs/art-20044000",
          source: "Mayo Clinic"
        },
        {
          title: "Fertility Awareness-Based Methods",
          url: "https://www.acog.org/womens-health/faqs/fertility-awareness-based-methods-of-family-planning",
          source: "ACOG"
        },
        {
          title: "Natural Family Planning",
          url: "https://www.nhs.uk/conditions/contraception/natural-family-planning/",
          source: "NHS"
        },
        {
          title: "Ovulation",
          url: "https://en.wikipedia.org/wiki/Ovulation",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="flex flex-wrap gap-4 justify-center bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-rose-100 border border-rose-200 rounded"></div><span className="text-sm text-neutral-600">Period</span></div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-emerald-100 border border-emerald-200 rounded"></div><span className="text-sm text-neutral-600">Fertile Window</span></div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-emerald-500 rounded"></div><span className="text-sm text-neutral-600">Ovulation</span></div>
          </div>

          {results.map((month: any, index: number) => {
            // Calculate padding for the first day of the month
            const firstDayOfWeek = getDay(month.days[0]);
            const paddingDays = Array(firstDayOfWeek).fill(null);

            return (
              <div key={index} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                <h3 className="text-xl font-bold text-neutral-900 mb-4 text-center">{format(month.date, 'MMMM yyyy')}</h3>
                
                <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-center text-xs font-bold text-neutral-400 uppercase">{day}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1 md:gap-2">
                  {paddingDays.map((_, i) => (
                    <div key={`pad-${i}`} className="aspect-square bg-neutral-50 rounded-lg border border-transparent"></div>
                  ))}
                  
                  {month.days.map((day: Date, i: number) => {
                    const dayClass = getDayClass(day, month.events);
                    const icon = getDayIcon(day, month.events);
                    
                    return (
                      <div 
                        key={i} 
                        className={`relative aspect-square flex items-center justify-center rounded-lg border ${dayClass} transition-colors`}
                      >
                        <span className="text-sm md:text-base">{format(day, 'd')}</span>
                        {icon}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Fertility Window Calculator.</p>
            </div>
            <Link to="/fertility-window-calculator" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Fertility Window Calculator &rarr;
            </Link>
          </div>
        </div>
      )}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider">First Day of Last Period</label>
          <div className="relative">
            <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input 
              type="date" 
              value={lmp} 
              onChange={(e) => setLmp(e.target.value)} 
              className="w-full p-4 pl-12 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider">Cycle Length (Days)</label>
            <input 
              type="number" 
              value={cycleLength} 
              onChange={(e) => setCycleLength(Number(e.target.value))} 
              className="w-full p-4 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider">Period Length (Days)</label>
            <input 
              type="number" 
              value={periodLength} 
              onChange={(e) => setPeriodLength(Number(e.target.value))} 
              className="w-full p-4 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all" 
            />
          </div>
        </div>

        <button onClick={calculate} className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-colors text-lg shadow-md">
          Generate Calendar
        </button>
      </div>
    </CalculatorLayout>
  );
}
