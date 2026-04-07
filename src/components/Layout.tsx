import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, Search, Heart, Globe, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SearchModal from './SearchModal';
import BackToTop from './BackToTop';
import { logoBase64 } from '../assets/logoBase64';

export default function Layout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Pregnancy', path: '/category/pregnancy' },
    { name: 'Fertility', path: '/category/ovulation' },
    { name: 'Menstrual Health', path: '/category/period' },
    { name: 'Nutrition', path: '/category/nutrition' },
    { name: 'Health Risk', path: '/category/health-risk' },
    { name: 'Postpartum & Baby Care', path: '/category/postpartum' },
    { name: 'All Tools', path: '/tools' },
  ];

  return (
    <div className="min-h-screen bg-bg-light font-sans text-text-dark overflow-x-hidden">
      {/* Top Bar - Global Reach */}
      <div className="bg-primary text-white py-2 px-4 text-center text-[10px] uppercase font-bold tracking-[0.2em]">
        <span className="flex items-center justify-center gap-3">
          <Globe className="w-3 h-3" />
          Empowering Women Globally with Expert Health Insights
        </span>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-primary/10">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-3 group">
              <img src={logoBase64} alt="HerNexa Logo" className="w-10 h-10 object-contain group-hover:rotate-6 transition-all" referrerPolicy="no-referrer" />
              <span className="text-2xl font-serif font-bold tracking-tight text-text-dark">HerNexa</span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-text-medium uppercase tracking-wider">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className="hover:text-primary transition-colors">{link.name}</Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-3 hover:bg-primary-light rounded-2xl transition-all text-text-dark group"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 hover:bg-primary-light rounded-2xl transition-all text-text-dark"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden bg-white border-b border-primary/10 overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-8 space-y-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-xl font-serif font-bold text-text-dark hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer - SEO Rich */}
      <footer className="bg-white text-text-medium pt-24 pb-12 border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 text-text-dark group">
              <img src={logoBase64} alt="HerNexa Logo" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
              <span className="text-2xl font-serif font-bold tracking-tight">HerNexa</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              The world's leading resource for evergreen women's health content. 
              Scientifically backed, expert-reviewed, and accessible globally.
            </p>
          </div>

          <div>
            <h4 className="text-text-dark font-serif font-bold text-lg mb-8">Health Topics</h4>
            <ul className="space-y-4 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-primary transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-primary/5 space-y-6">
          <div className="text-[10px] text-text-medium/60 leading-relaxed text-center max-w-4xl mx-auto">
            <p><strong>Medical Disclaimer:</strong> The information provided by HerNexa is for educational and informational purposes only and does not constitute medical advice. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
            <p className="mt-2"><strong>Affiliate Disclosure:</strong> Some of the links on this website are affiliate links. This means that, at zero cost to you, we will earn an affiliate commission if you click through the link and finalize a purchase. This helps support our work in providing free health tools.</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] uppercase font-bold tracking-widest text-text-medium/60">
            <p>&copy; {new Date().getFullYear()} HerNexa. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-8">
              <Link to="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
            </div>
          </div>
          <div className="text-center text-[11px] font-medium text-text-medium/60 mt-4">
            At HerNexa, we prioritize your privacy. We do not store any of your personal health data.
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}
