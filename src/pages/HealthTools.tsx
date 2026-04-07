import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Search, ChevronRight, Baby, Calendar, Activity, Heart, Utensils, Scale } from 'lucide-react';
import { motion } from 'motion/react';

const tools = [
  {
    category: "Pregnancy & Birth",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=200",
    color: "bg-primary",
    items: [
      { name: "Due Date Calculator", path: "/due-date-calculator", desc: "Estimate your baby's arrival date based on your last period or conception date." },
      { name: "Due Date by Conception", path: "/due-date-by-conception", desc: "Calculate your exact pregnancy due date based on your known date of conception." },
      { name: "Conception Calculator", path: "/conception-calculator", desc: "Find out exactly when you conceived based on your due date." },
      { name: "Baby Size Comparator", path: "/baby-size-comparator", desc: "Compare your baby's size to fruits and vegetables week by week." },
      { name: "Miscarriage Risk Calculator", path: "/miscarriage-risk-calculator", desc: "Estimate your statistical risk of miscarriage based on clinical factors." },
      { name: "Pregnancy Weight Gain", path: "/pregnancy-weight-gain-calculator", desc: "Monitor your weight gain against medically recommended ranges for your BMI." }
    ]
  },
  {
    category: "Fertility & Ovulation",
    image: "https://images.pexels.com/photos/7467100/pexels-photo-7467100.jpeg?auto=compress&cs=tinysrgb&w=800",
    color: "bg-accent",
    items: [
      { name: "Ovulation Calculator", path: "/ovulation-calculator", desc: "Identify your peak fertile days and increase your chances of conception." },
      { name: "Ovulation Calendar", path: "/ovulation-calendar", desc: "Generate a personalized 3-month ovulation and period calendar." },
      { name: "Fertility Window Calculator", path: "/fertility-window-calculator", desc: "Calculate your 6-day fertile window to maximize conception chances." },
      { name: "Time to Conceive", path: "/time-to-conceive-calculator", desc: "Understand the statistical probability of conception based on age and health." },
      { name: "IVF Success Rate Calculator", path: "/ivf-success-rate-calculator", desc: "Estimate your chances of a successful IVF cycle based on clinical data." },
      { name: "Embryo Transfer Date", path: "/embryo-transfer-date-calculator", desc: "Calculate your due date based on your IVF embryo transfer date." },
      { name: "Egg Freezing Success", path: "/egg-freezing-calculator", desc: "Estimate the probability of at least one live birth based on age and number of eggs frozen." }
    ]
  },
  {
    category: "Menstrual & Hormonal Health",
    image: "https://images.pexels.com/photos/7281705/pexels-photo-7281705.jpeg?auto=compress&cs=tinysrgb&w=800",
    color: "bg-success",
    items: [
      { name: "Period Calculator", path: "/period-calculator", desc: "Predict your next six periods and stay prepared for your cycle." },
      { name: "Menstrual Cycle Length", path: "/menstrual-cycle-length-calculator", desc: "Calculate your average menstrual cycle length and check for irregularities." },
      { name: "Ovulation Pain Calculator", path: "/ovulation-pain-calculator", desc: "Analyze your mid-cycle abdominal pain to determine if it aligns with Mittelschmerz." },
      { name: "Period Symptom Tracker", path: "/period-symptom-tracker", desc: "Track and analyze your menstrual and premenstrual symptoms." },
      { name: "PCOS Symptom Checker", path: "/pcos-calculator", desc: "Track symptoms and cycle irregularities often associated with PCOS." },
      { name: "Menopause Symptom Checker", path: "/menopause-checker", desc: "Assess common signs of perimenopause and the transition to menopause." }
    ]
  },
  {
    category: "Nutrition & Wellness",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=200",
    color: "bg-success",
    items: [
      { name: "Women's BMI Calculator", path: "/womens-bmi-calculator", desc: "Calculate your Body Mass Index (BMI) specifically designed for women." },
      { name: "Women's TDEE Calculator", path: "/womens-tdee-calculator", desc: "Calculate your Total Daily Energy Expenditure using female-specific formulas." },
      { name: "Macro Calculator", path: "/macros-calculator", desc: "Calculate your optimal daily macronutrients based on your fitness goals." },
      { name: "Ideal Body Weight", path: "/ideal-body-weight-calculator", desc: "Calculate your Ideal Body Weight using established medical formulas." },
      { name: "Water Intake Calculator", path: "/water-intake-calculator", desc: "Calculate exactly how much water you should drink daily." },
      { name: "Pregnancy Nutrition Calculator", path: "/pregnancy-calorie-calculator", desc: "Determine your daily energy, iron, folic acid, and hydration needs." }
    ]
  },
  {
    category: "Clinical Risk Assessments",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=200",
    color: "bg-primary",
    items: [
      { name: "Breast Cancer Risk Calculator", path: "/breast-cancer-risk-calculator", desc: "Estimate your risk of developing breast cancer using the Gail Model." },
      { name: "Heart Disease Risk Calculator", path: "/heart-disease-risk-calculator", desc: "Estimate your 10-year risk of cardiovascular disease." },
      { name: "Osteoporosis Risk Calculator", path: "/osteoporosis-risk-calculator", desc: "Assess your risk of osteoporosis and bone fractures." },
      { name: "Thyroid Risk Calculator", path: "/thyroid-risk-calculator", desc: "Assess your risk for hypo/hyperthyroidism based on symptoms." },
      { name: "Endometriosis Risk Calculator", path: "/endometriosis-risk-calculator", desc: "Assess your risk factors and symptom patterns related to endometriosis." }
    ]
  },
  {
    category: "Postpartum & Baby Care",
    image: "https://images.pexels.com/photos/7282403/pexels-photo-7282403.jpeg?auto=compress&cs=tinysrgb&w=800",
    color: "bg-primary",
    items: [
      { name: "Postpartum Depression", path: "/epds-screener", desc: "A clinical tool (EPDS) to help identify signs of postpartum depression." },
      { name: "Baby Growth Percentile", path: "/baby-growth-percentile", desc: "Compare your baby's weight and length to WHO/CDC growth standards." }
    ]
  }
];

export default function HealthTools() {
  return (
    <div className="min-h-screen bg-bg-light">
      <SEO 
        title="Health Tools & Calculators | Women's Health Hub"
        description="Explore our directory of 30+ free women's health calculators, from pregnancy due dates to ovulation trackers and nutrition guides."
      />

      {/* Hero */}
      <section className="bg-white border-b border-primary/10 py-24">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-bold text-text-dark tracking-tight"
          >
            Health Tools Directory
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-medium max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Evidence-based calculators and interactive tools designed to help you understand your body and track your health journey.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto relative group"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-medium w-5 h-5 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search for a tool (e.g., 'Due Date')..."
              className="input-field pl-14 h-16 text-lg shadow-xl shadow-primary/5"
            />
          </motion.div>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="space-y-32">
          {tools.map((group, idx) => (
            <div key={idx} className="space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 md:gap-10 border-b-2 border-primary/10 pb-8"
              >
                <div className={`w-24 h-24 md:w-44 md:h-44 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/20 border-4 border-white shrink-0 bg-white`}>
                  {group.image ? (
                    <img 
                      src={group.image} 
                      alt={group.category} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer" 
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/5 flex items-center justify-center text-primary/40">
                      <Baby className="w-10 h-10 md:w-16 md:h-16" />
                    </div>
                  )}
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-text-dark tracking-tighter leading-tight break-words">{group.category}</h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {group.items.map((tool, tIdx) => (
                  <motion.div
                    key={tIdx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (tIdx % 4) * 0.1 }}
                  >
                    <Link 
                      to={tool.path}
                      className="bg-white p-8 rounded-[2.5rem] border border-primary/5 hover:border-primary hover:shadow-2xl hover:shadow-primary/10 transition-all group flex flex-col h-full relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[5rem] -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500" />
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-serif font-bold text-xl text-text-dark group-hover:text-primary transition-colors leading-tight pr-4">{tool.name}</h3>
                          <ChevronRight className="w-5 h-5 text-text-medium group-hover:translate-x-2 transition-transform shrink-0" />
                        </div>
                        <p className="text-sm text-text-medium leading-relaxed font-medium">{tool.desc}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
