import { ReactNode } from 'react';
import SEO from './SEO';
import { AlertCircle, ChevronLeft, BookOpen, HelpCircle, Layout as LayoutIcon, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CalculatorLayoutProps {
  title: string;
  description: string;
  intro: string;
  children: ReactNode;
  results?: ReactNode;
  howItWorks: ReactNode;
  faqs: { q: string; a: string }[];
  relatedTools: { name: string; path: string }[];
  schema: object | object[];
  richContent?: ReactNode;
}

export default function CalculatorLayout({
  title,
  description,
  intro,
  children,
  results,
  howItWorks,
  faqs,
  relatedTools,
  schema,
  richContent
}: CalculatorLayoutProps) {
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-24">
      <SEO 
        title={`${title} | HerNexa`}
        description={description}
        schema={schemas}
      />

      <Link 
        to="/tools" 
        className="inline-flex items-center gap-2 text-xs font-bold text-text-medium hover:text-primary transition-colors uppercase tracking-[0.2em] group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Tools
      </Link>

      <header className="space-y-6 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-dark leading-tight tracking-tight">{title}</h1>
        <p className="text-lg text-text-medium leading-relaxed font-light italic">
          {intro}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7">
          <div className="calculator-card">
            {children}
          </div>
        </div>

        <div className="lg:col-span-5">
          {results ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="results-section">
                {results}
              </div>
              
              {/* Professional Medical Disclaimer immediately after results */}
              <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/10 rounded-2xl text-text-dark text-xs leading-relaxed shadow-sm">
                <AlertCircle className="w-5 h-5 shrink-0 text-primary opacity-80" />
                <p>
                  <strong className="font-bold text-primary block mb-1">Clinical Disclaimer</strong> 
                  This calculator provides estimates based on standardized medical formulas and clinical data. It is intended for informational and educational purposes only and does not replace professional medical diagnosis, advice, or treatment. Always consult with your healthcare provider or OB-GYN regarding your specific health condition.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] p-12 border border-dashed border-primary/20 text-center space-y-6">
              <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto text-primary shadow-inner">
                <LayoutIcon className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-2xl text-text-dark">Ready to Calculate?</h3>
                <p className="text-sm text-text-medium leading-relaxed">
                  Enter your details to see your personalized health insights and recommendations.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rich Content Section - SEO Focused */}
      {richContent && (
        <section className="prose-health bg-white rounded-[3rem] p-12 md:p-20 shadow-sm border border-primary/5">
          {richContent}
        </section>
      )}

      {/* AD: Sidebar or Content Banner */}
      <div className="w-full h-64 bg-neutral-50 border border-dashed border-neutral-200 rounded-[2.5rem] flex items-center justify-center text-neutral-400 text-sm italic">
        Calculator Page Sidebar/Content Ad (300x250 or 300x600)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary/30 text-primary rounded-2xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-text-dark">How It Works</h2>
          </div>
          <div className="prose-health bg-white p-10 rounded-[2.5rem] border border-border/50 shadow-sm">
            {howItWorks}
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-light text-primary rounded-2xl">
              <LinkIcon className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-text-dark">Related Tools</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {relatedTools.map((tool, idx) => (
              <Link 
                key={idx} 
                to={tool.path}
                className="bg-white p-6 rounded-2xl border border-border/50 hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all group flex items-center justify-between"
              >
                <span className="font-bold text-text-dark group-hover:text-primary transition-colors">{tool.name}</span>
                <ChevronLeft className="w-4 h-4 rotate-180 text-text-medium group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {faqs && faqs.length > 0 && (
        <div className="space-y-12">
          <div className="flex items-center gap-4 justify-center">
            <div className="p-3 bg-accent/10 text-accent rounded-2xl">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-text-dark">Frequently Asked Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-border/50 space-y-4 shadow-sm">
                <h3 className="font-bold text-text-dark text-lg leading-tight">{faq.q}</h3>
                <p className="text-sm text-text-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
