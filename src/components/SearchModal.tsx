import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface SearchResult {
  name: string;
  path: string;
  type: 'tool';
}

const allItems: SearchResult[] = [
  { name: "Due Date Calculator", path: "/due-date-calculator", type: 'tool' },
  { name: "Due Date by Conception", path: "/due-date-by-conception", type: 'tool' },
  { name: "Conception Calculator", path: "/conception-calculator", type: 'tool' },
  { name: "Baby Size Comparator", path: "/baby-size-comparator", type: 'tool' },
  { name: "Miscarriage Risk Calculator", path: "/miscarriage-risk-calculator", type: 'tool' },
  { name: "Pregnancy Weight Gain", path: "/pregnancy-weight-gain-calculator", type: 'tool' },
  { name: "Ovulation Calculator", path: "/ovulation-calculator", type: 'tool' },
  { name: "Ovulation Calendar", path: "/ovulation-calendar", type: 'tool' },
  { name: "Fertility Window Calculator", path: "/fertility-window-calculator", type: 'tool' },
  { name: "Time to Conceive", path: "/time-to-conceive-calculator", type: 'tool' },
  { name: "IVF Success Rate Calculator", path: "/ivf-success-rate-calculator", type: 'tool' },
  { name: "Embryo Transfer Date Calculator", path: "/embryo-transfer-date-calculator", type: 'tool' },
  { name: "Egg Freezing Success Calculator", path: "/egg-freezing-calculator", type: 'tool' },
  { name: "Period Calculator", path: "/period-calculator", type: 'tool' },
  { name: "Menstrual Cycle Length Calculator", path: "/menstrual-cycle-length-calculator", type: 'tool' },
  { name: "Ovulation Pain Calculator", path: "/ovulation-pain-calculator", type: 'tool' },
  { name: "Period Symptom Tracker", path: "/period-symptom-tracker", type: 'tool' },
  { name: "PCOS Symptom Checker", path: "/pcos-calculator", type: 'tool' },
  { name: "Menopause Symptom Checker", path: "/menopause-checker", type: 'tool' },
  { name: "Women's BMI Calculator", path: "/womens-bmi-calculator", type: 'tool' },
  { name: "Women's TDEE Calculator", path: "/womens-tdee-calculator", type: 'tool' },
  { name: "Macro Calculator", path: "/macros-calculator", type: 'tool' },
  { name: "Ideal Body Weight Calculator", path: "/ideal-body-weight-calculator", type: 'tool' },
  { name: "Water Intake Calculator", path: "/water-intake-calculator", type: 'tool' },
  { name: "Pregnancy Nutrition Calculator", path: "/pregnancy-calorie-calculator", type: 'tool' },
  { name: "Breast Cancer Risk Calculator", path: "/breast-cancer-risk-calculator", type: 'tool' },
  { name: "Heart Disease Risk Calculator", path: "/heart-disease-risk-calculator", type: 'tool' },
  { name: "Osteoporosis Risk Calculator", path: "/osteoporosis-risk-calculator", type: 'tool' },
  { name: "Thyroid Risk Calculator", path: "/thyroid-risk-calculator", type: 'tool' },
  { name: "Endometriosis Risk Calculator", path: "/endometriosis-risk-calculator", type: 'tool' },
  { name: "Postpartum Depression Screener", path: "/epds-screener", type: 'tool' },
  { name: "Baby Growth Percentile Calculator", path: "/baby-growth-percentile", type: 'tool' }
];

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = allItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10"
          >
            <div className="p-4 border-b border-neutral-100 flex items-center gap-4">
              <input 
                autoFocus
                type="text" 
                placeholder="Search for tools or topics..." 
                className="flex-1 h-12 text-lg outline-none bg-transparent pl-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search for health tools"
              />
              <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-sm font-bold text-neutral-600" aria-label="Close search modal">
                Close
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4">
              {results.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest px-2 mb-2">Search Results</p>
                  {results.map((item, i) => (
                    <button 
                      key={i}
                      onClick={() => handleSelect(item.path)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-rose-50 transition-colors group"
                      aria-label={`Go to ${item.name}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-rose-100 text-rose-600 font-bold text-xs">
                          {item.name[0]}
                        </div>
                        <span className="font-medium text-neutral-700 group-hover:text-rose-700">{item.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : query.length > 1 ? (
                <div className="py-12 text-center space-y-2">
                  <p className="text-neutral-500">No results found for "{query}"</p>
                  <p className="text-xs text-neutral-400">Try searching for "due date", "period", or "pcos"</p>
                </div>
              ) : (
                <div className="space-y-6 py-4">
                  <div>
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest px-2 mb-4">Popular Tools</p>
                    <div className="grid grid-cols-2 gap-2">
                      {allItems.slice(0, 4).map((item, i) => (
                        <button 
                          key={i}
                          onClick={() => handleSelect(item.path)}
                          className="flex items-center gap-3 p-3 rounded-xl border border-neutral-100 hover:border-rose-200 hover:bg-rose-50 transition-all text-left"
                          aria-label={`Go to ${item.name}`}
                        >
                          <span className="text-sm font-medium text-neutral-600">{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex justify-center items-center text-xs font-bold text-neutral-500 uppercase tracking-wider">
              <span>Press ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
