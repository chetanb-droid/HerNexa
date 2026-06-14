import { motion } from 'motion/react';
import { ChevronRight, Filter, SortAsc, Calculator, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const categoryData: Record<string, any> = {
  'pregnancy': {
    title: "Pregnancy Calculators",
    description: "From due date predictors to fetal growth trackers, explore our comprehensive suite of pregnancy tools.",
    calculators: [
      { name: "Due Date Calculator", path: "/due-date-calculator", desc: "Estimate your baby's arrival date based on your last period or conception date." },
      { name: "Due Date by Conception", path: "/due-date-by-conception", desc: "Calculate your exact pregnancy due date based on your known date of conception." },
      { name: "Conception Calculator", path: "/conception-calculator", desc: "Find out exactly when you conceived based on your due date." },
      { name: "Baby Size Comparator", path: "/baby-size-comparator", desc: "Compare your baby's size to fruits and vegetables week by week." },
      { name: "Miscarriage Risk Calculator", path: "/miscarriage-risk-calculator", desc: "Estimate your statistical risk of miscarriage based on clinical factors." },
      { name: "Pregnancy Weight Gain", path: "/pregnancy-weight-gain-calculator", desc: "Monitor your weight gain against medically recommended ranges for your BMI." }
    ]
  },
  'ovulation': {
    title: "Ovulation & Fertility",
    description: "Identify your most fertile days and plan your pregnancy with our expert fertility tools.",
    calculators: [
      { name: "Ovulation Calculator", path: "/ovulation-calculator", desc: "Identify your peak fertile days and increase your chances of conception." },
      { name: "Ovulation Calendar", path: "/ovulation-calendar", desc: "Generate a personalized 3-month ovulation and period calendar." },
      { name: "Fertility Window Calculator", path: "/fertility-window-calculator", desc: "Calculate your 6-day fertile window to maximize conception chances." },
      { name: "Time to Conceive", path: "/time-to-conceive-calculator", desc: "Understand the statistical probability of conception based on age and health." },
      { name: "IVF Success Rate Calculator", path: "/ivf-success-rate-calculator", desc: "Estimate your chances of a successful IVF cycle based on clinical data." },
      { name: "Embryo Transfer Date", path: "/embryo-transfer-date-calculator", desc: "Calculate your due date based on your IVF embryo transfer date." },
      { name: "Egg Freezing Success", path: "/egg-freezing-calculator", desc: "Estimate the probability of at least one live birth based on age and number of eggs frozen." }
    ]
  },
  'period': {
    title: "Period & Menstrual Health",
    description: "Track your cycle, predict your next period, and understand your hormonal health.",
    calculators: [
      { name: "Period Calculator", path: "/period-calculator", desc: "Predict your next six periods and stay prepared for your cycle." },
      { name: "Menstrual Cycle Length", path: "/menstrual-cycle-length-calculator", desc: "Calculate your average menstrual cycle length and check for irregularities." },
      { name: "Ovulation Pain Calculator", path: "/ovulation-pain-calculator", desc: "Analyze your mid-cycle abdominal pain to determine if it aligns with Mittelschmerz." },
      { name: "Period Symptom Tracker", path: "/period-symptom-tracker", desc: "Track and analyze your menstrual and premenstrual symptoms." },
      { name: "PCOS Symptom Checker", path: "/pcos-calculator", desc: "Track symptoms and cycle irregularities often associated with PCOS." },
      { name: "Menopause Symptom Checker", path: "/menopause-checker", desc: "Assess common signs of perimenopause and the transition to menopause." }
    ]
  },
  'nutrition': {
    title: "Nutrition & Wellness",
    description: "Expert guidance on pregnancy nutrition, infant feeding, and healthy weight management.",
    calculators: [
      { name: "Women's BMI Calculator", path: "/womens-bmi-calculator", desc: "Calculate your Body Mass Index (BMI) specifically designed for women." },
      { name: "Women's TDEE Calculator", path: "/womens-tdee-calculator", desc: "Calculate your Total Daily Energy Expenditure using female-specific formulas." },
      { name: "Macro Calculator", path: "/macros-calculator", desc: "Calculate your optimal daily macronutrients based on your fitness goals." },
      { name: "Ideal Body Weight", path: "/ideal-body-weight-calculator", desc: "Calculate your Ideal Body Weight using established medical formulas." },
      { name: "Water Intake Calculator", path: "/water-intake-calculator", desc: "Calculate exactly how much water you should drink daily." },
      { name: "Pregnancy Nutrition Calculator", path: "/pregnancy-calorie-calculator", desc: "Determine your daily energy, iron, folic acid, and hydration needs." }
    ]
  },
  'postpartum': {
    title: "Postpartum & Baby Care",
    description: "Support for your recovery and your baby's growth during the critical postpartum period.",
    calculators: [
      { name: "Postpartum Depression", path: "/epds-screener", desc: "A clinical tool (EPDS) to help identify signs of postpartum depression." },
      { name: "Baby Growth Percentile", path: "/baby-growth-percentile", desc: "Compare your baby's weight and length to WHO/CDC growth standards." }
    ]
  },
  'health-risk': {
    title: "Clinical Risk Assessments",
    description: "Assess your health risks with our evidence-based clinical calculators.",
    calculators: [
      { name: "Breast Cancer Risk", path: "/breast-cancer-risk-calculator", desc: "Estimate your risk of developing breast cancer using the Gail Model." },
      { name: "Heart Disease Risk", path: "/heart-disease-risk-calculator", desc: "Estimate your 10-year risk of cardiovascular disease." },
      { name: "Osteoporosis Risk", path: "/osteoporosis-risk-calculator", desc: "Assess your risk of osteoporosis and bone fractures." },
      { name: "Thyroid Risk", path: "/thyroid-risk-calculator", desc: "Assess your risk for hypo/hyperthyroidism based on symptoms." },
      { name: "Endometriosis Risk", path: "/endometriosis-risk-calculator", desc: "Assess your risk factors and symptom patterns related to endometriosis." }
    ]
  }
};

export default function Category({ slug }: { slug?: string }) {
  const currentSlug = slug || (typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : 'pregnancy');
  const data = categoryData[currentSlug || 'pregnancy'] || categoryData['pregnancy'];

  return (
    <div className="space-y-12">
      <SEO 
        title={`${data.title} - Free Health Tools`}
        description={data.description}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-text-medium">
        <a href="/" className="hover:text-primary transition-colors">Home</a>
        <ChevronRight className="w-4 h-4" />
        <span className="text-primary font-medium">{data.title}</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl space-y-4 border-b border-border pb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">{data.title}</h1>
        <p className="text-lg text-text-medium leading-relaxed">
          {data.description}
        </p>
      </div>

      {/* Calculators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.calculators.map((calc: any, i: number) => (
          <motion.div 
            key={i}
            whileHover={{ y: -4 }}
            className="group p-6 bg-white border border-border rounded-2xl hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col"
          >
            <div className="w-12 h-12 bg-bg-light rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-text-dark mb-2 group-hover:text-primary transition-colors">{calc.name}</h3>
            <p className="text-text-medium text-sm leading-relaxed mb-6 flex-1">
              {calc.desc}
            </p>
            <a href={calc.path} 
              className="inline-flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all"
            >
              Open Calculator
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        ))}
      </div>

      {/* SEO Content Section */}
      <section className="prose-health bg-bg-light p-8 rounded-3xl border border-primary-light">
        <h2>Understanding {data.title}</h2>
        <p>
          Managing your health requires the right data at the right time. Our {data.title.toLowerCase()} tools are designed by medical experts to provide you with accurate, evidence-based insights into your body's natural rhythms.
        </p>
        <p>
          Whether you are tracking for wellness, planning a pregnancy, or managing a health condition, these calculators offer a free and accessible way to stay informed. All our formulas are based on standard medical guidelines including Naegele's Rule and IOM weight gain recommendations.
        </p>
      </section>
    </div>
  );
}
