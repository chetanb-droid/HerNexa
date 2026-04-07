import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Map, ChevronRight } from 'lucide-react';

export default function Sitemap() {
  const categories = [
    {
      title: "Pregnancy",
      links: [
        { name: "Due Date Calculator", path: "/due-date-calculator" },
        { name: "Due Date by Conception", path: "/due-date-by-conception" },
        { name: "Conception Calculator", path: "/conception-calculator" },
        { name: "Baby Size Comparator", path: "/baby-size-comparator" },
        { name: "Miscarriage Risk Calculator", path: "/miscarriage-risk-calculator" },
        { name: "Pregnancy Weight Gain", path: "/pregnancy-weight-gain-calculator" }
      ]
    },
    {
      title: "Fertility & Ovulation",
      links: [
        { name: "Ovulation Calculator", path: "/ovulation-calculator" },
        { name: "Ovulation Calendar", path: "/ovulation-calendar" },
        { name: "Fertility Window Calculator", path: "/fertility-window-calculator" },
        { name: "Time to Conceive", path: "/time-to-conceive-calculator" },
        { name: "IVF Success Rate Calculator", path: "/ivf-success-rate-calculator" },
        { name: "Embryo Transfer Date Calculator", path: "/embryo-transfer-date-calculator" },
        { name: "Egg Freezing Success", path: "/egg-freezing-calculator" }
      ]
    },
    {
      title: "Menstrual Health",
      links: [
        { name: "Period Calculator", path: "/period-calculator" },
        { name: "Period Symptom Tracker", path: "/period-symptom-tracker" },
        { name: "Menstrual Cycle Length Calculator", path: "/menstrual-cycle-length-calculator" },
        { name: "Ovulation Pain Calculator", path: "/ovulation-pain-calculator" },
        { name: "PCOS Symptom Checker", path: "/pcos-calculator" },
        { name: "Menopause Symptom Checker", path: "/menopause-checker" }
      ]
    },
    {
      title: "Nutrition & Wellness",
      links: [
        { name: "Women's BMI Calculator", path: "/womens-bmi-calculator" },
        { name: "Women's TDEE Calculator", path: "/womens-tdee-calculator" },
        { name: "Macro Calculator", path: "/macros-calculator" },
        { name: "Ideal Body Weight Calculator", path: "/ideal-body-weight-calculator" },
        { name: "Water Intake Calculator", path: "/water-intake-calculator" },
        { name: "Pregnancy Nutrition Calculator", path: "/pregnancy-calorie-calculator" }
      ]
    },
    {
      title: "Clinical Risk Assessments",
      links: [
        { name: "Breast Cancer Risk Calculator", path: "/breast-cancer-risk-calculator" },
        { name: "Heart Disease Risk Calculator", path: "/heart-disease-risk-calculator" },
        { name: "Osteoporosis Risk Calculator", path: "/osteoporosis-risk-calculator" },
        { name: "Thyroid Risk Calculator", path: "/thyroid-risk-calculator" },
        { name: "Endometriosis Risk Calculator", path: "/endometriosis-risk-calculator" }
      ]
    },
    {
      title: "Postpartum & Baby Care",
      links: [
        { name: "Postpartum Depression Screener", path: "/epds-screener" },
        { name: "Baby Growth Percentile Calculator", path: "/baby-growth-percentile" }
      ]
    },
    {
      title: "Company & Info",
      links: [
        { name: "Home", path: "/" },
        { name: "All Health Tools", path: "/tools" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Editorial Policy", path: "/editorial-policy" }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <SEO 
        title="Sitemap" 
        description="A complete directory of all health tools, calculators, and content on HerNexa."
      />
      
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl">
          <Map className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-rose-950">Sitemap</h1>
          <p className="text-neutral-600">Explore all our health resources and tools.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {categories.map((cat, i) => (
          <div key={i} className="space-y-6">
            <h2 className="text-xl font-bold text-rose-950 border-b border-rose-100 pb-2">{cat.title}</h2>
            <ul className="space-y-3">
              {cat.links.map((link, j) => (
                <li key={j}>
                  <Link 
                    to={link.path} 
                    className="flex items-center gap-2 text-neutral-600 hover:text-rose-600 transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 text-rose-300 group-hover:text-rose-500 transition-colors" />
                    <span className="text-sm font-medium">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
