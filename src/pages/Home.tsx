import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Baby, 
  Sparkles, 
  Calendar, 
  Activity, 
  Heart, 
  ArrowRight, 
  CheckCircle2,
  Calculator,
  ChevronRight,
  Utensils
} from 'lucide-react';
import SEO from '../components/SEO';

const mainCategories = [
  {
    id: 'pregnancy',
    title: 'Pregnancy',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=200',
    color: 'bg-primary',
    tools: ['Due Date Calculator', 'Due Date by Conception', 'Baby Size Comparator'],
    zoom: false
  },
  {
    id: 'ovulation',
    title: 'Fertility',
    image: 'https://images.pexels.com/photos/7467100/pexels-photo-7467100.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: 'bg-accent',
    tools: ['Ovulation Calculator', 'Fertility Window', 'Time to Conceive'],
    zoom: false
  },
  {
    id: 'period',
    title: 'Menstrual',
    image: 'https://images.pexels.com/photos/7281705/pexels-photo-7281705.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: 'bg-secondary',
    tools: ['Period Calculator', 'Cycle Length', 'PCOS Symptom Checker'],
    zoom: false
  },
  {
    id: 'nutrition',
    title: 'Nutrition',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=200',
    color: 'bg-success',
    tools: ['Women\'s BMI', 'Women\'s TDEE', 'Pregnancy Calories'],
    zoom: false
  },
  {
    id: 'health-risk',
    title: 'Clinical Risk Assessments',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=200',
    color: 'bg-warning',
    tools: ['Breast Cancer Risk', 'Heart Disease Risk', 'Osteoporosis Risk'],
    zoom: false
  },
  {
    id: 'postpartum',
    title: 'Postpartum & Baby Care',
    image: 'https://images.pexels.com/photos/7282403/pexels-photo-7282403.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: 'bg-info',
    tools: ['EPDS Screener', 'Baby Growth Percentile', 'Recovery Guide'],
    zoom: false
  }
];

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      <SEO 
        title="Women's Health & Pregnancy Calculator Hub | Free Medical Tools"
        description="Access 30+ free women's health calculators. Due date predictor, ovulation tracker, pregnancy week by week, and fertility tools. No signup required."
      />

      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-bg-light border border-primary-light rounded-full text-primary font-bold text-sm"
          >
            30+ Absolutely Free Tools • No Signup or Credit Card Needed
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-text-dark leading-[1.1]"
          >
            Your Journey, <span className="text-primary italic">Calculated.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-medium max-w-2xl mx-auto leading-relaxed"
          >
            The most comprehensive suite of women's health calculators. From fertility tracking to pregnancy milestones, get accurate insights powered by medical data.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center pt-4"
          >
            <Link 
              to="/tools" 
              className="px-10 py-5 bg-primary text-white rounded-2xl font-bold text-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center gap-3 group"
            >
              Explore Health Tools 
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Categories Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainCategories.map((cat, i) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-white border border-primary/5 rounded-[2.5rem] p-10 hover:shadow-2xl hover:shadow-primary/10 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[5rem] -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative z-10">
                <div className={`${cat.zoom ? 'w-[calc(100%+5rem)] h-48 -mx-10 -mt-10 mb-8 rounded-t-[2.5rem]' : 'w-32 h-32 rounded-3xl mb-8 border-2 border-white bg-white'} overflow-hidden group-hover:rotate-1 transition-all shadow-lg shadow-primary/20`}>
                  {cat.image ? (
                    <img 
                      key={cat.image}
                      src={cat.image} 
                      alt={cat.title} 
                      className={`w-full h-full object-cover transition-transform duration-700 ${cat.zoom ? 'scale-[1.5]' : ''}`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/5 flex items-center justify-center text-primary/40">
                      <Baby className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-serif font-bold mb-4 text-text-dark">{cat.title}</h2>
                <ul className="space-y-4 mb-10">
                  {cat.tools.map((tool, j) => (
                    <li key={j} className="flex items-center gap-3 text-text-medium text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                      {tool}
                    </li>
                  ))}
                </ul>
                <Link 
                  to={`/category/${cat.id}`}
                  className="flex items-center justify-between w-full p-4 bg-primary-light rounded-2xl text-primary font-bold hover:bg-primary hover:text-white transition-all group/btn"
                >
                  View All Tools
                  <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">Most Popular Tools</h2>
            <p className="text-text-medium max-w-2xl">Discover our most frequently used calculators, trusted by millions of women worldwide.</p>
          </div>
          <Link to="/tools" className="text-primary font-bold hover:text-primary/80 flex items-center gap-2">
            See All 30+ Tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Due Date Calculator",
              desc: "Calculate your exact due date and track your pregnancy milestones.",
              path: "/due-date-calculator",
              icon: <Calendar className="w-6 h-6" />,
              color: "bg-primary text-white"
            },
            {
              title: "Ovulation Calculator",
              desc: "Pinpoint your most fertile days to maximize your chances of conception.",
              path: "/ovulation-calculator",
              icon: <Activity className="w-6 h-6" />,
              color: "bg-accent text-white"
            },
            {
              title: "Clinical Risk Assessments",
              desc: "Assess your health risks with our evidence-based clinical calculators.",
              path: "/category/health-risk",
              icon: <Heart className="w-6 h-6" />,
              color: "bg-[#E91E63] text-white"
            }
          ].map((tool, i) => (
            <Link key={i} to={tool.path} className="group bg-white border border-neutral-100 rounded-[2rem] p-8 hover:shadow-xl hover:border-primary/20 transition-all">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${tool.color}`}>
                {tool.icon}
              </div>
              <h3 className="text-xl font-bold text-text-dark mb-3 group-hover:text-primary transition-colors">{tool.title}</h3>
              <p className="text-sm text-text-medium leading-relaxed">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Indicators */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-text-dark py-20 text-white overflow-hidden relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="grid grid-cols-6 gap-4 rotate-12 scale-150">
            {Array.from({ length: 24 }).map((_, i) => (
              <Calculator key={i} className="w-12 h-12" />
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Medical Accuracy <br/>
                <span className="text-secondary">You Can Trust.</span>
              </h2>
              <p className="text-lg text-neutral-400 leading-relaxed">
                Our calculators are built using standardized medical formulas including Naegele's Rule for pregnancy and the Grobman nomogram for VBAC success rates. Every tool is designed to provide clarity, not confusion.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-3xl font-bold text-primary-light">150+</p>
                  <p className="text-sm text-neutral-500 uppercase font-bold tracking-wider">Countries Reached</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-secondary">30+</p>
                  <p className="text-sm text-neutral-500 uppercase font-bold tracking-wider">Expert Tools</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8 space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-success/20 text-success rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="font-bold">Evidence-Based Formulas</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-success/20 text-success rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="font-bold">Zero Data Collection</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-success/20 text-success rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="font-bold">Mobile-First Design</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
        <div className="space-y-4">
          {[
            { q: "Are these calculators medically accurate?", a: "Yes, our tools use the same formulas used by OB-GYNs and medical professionals globally. However, they are for informational purposes and should not replace professional medical advice." },
            { q: "Do I need to create an account to use the tools?", a: "No. We believe health information should be accessible. All 30+ calculators are free to use with zero login or data tracking required." },
            { q: "How do I know which calculator to use?", a: "Start with our Pregnancy section if you are already expecting, or the Fertility section if you are trying to conceive. Each tool includes a detailed guide on when and how to use it." }
          ].map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-white border border-border rounded-2xl"
            >
              <h3 className="font-bold text-text-dark mb-2">{faq.q}</h3>
              <p className="text-text-medium text-sm leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
