
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import { MOCK_PRODUCTS } from '../constants';
import { useTranslation } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const featured = MOCK_PRODUCTS.slice(0, 4);
  const isLightTheme = theme === 'orange' || theme === 'yellow';

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-40 grayscale hover:grayscale-0 transition-all duration-1000">
           <img src="https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&q=80&w=2000" alt="ThinkPad Iconic Laptop" className="w-full h-full object-cover scale-110" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80"></div>
        
        {/* Force LTR for Branding */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl" dir="ltr">
          <div 
            className="inline-block border-2 px-4 py-1.5 mb-8 rounded-sm uppercase text-xs font-bold tracking-[0.4em] animate-pulse bg-black/50 backdrop-blur-sm"
            style={{borderColor: 'var(--accent)'}}
          >
            THE ULTIMATE THINKPAD CENTER
          </div>
          <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-none">
            ThinkPad <span className="thinkpad-red relative">
              YAY!!
              <span className="absolute -top-4 -right-6 text-2xl font-mono text-gray-500">®</span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            {t('hero_desc')}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/used" className="text-white px-12 py-5 rounded-sm font-bold text-lg hover:brightness-110 hover:shadow-[0_0_30px_rgba(0,0,0,0.4)] transition-all" style={{backgroundColor: 'var(--accent)'}}>
              {t('marketplace')}
            </Link>
            <Link to="/dashboard" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-12 py-5 rounded-sm font-bold text-lg hover:bg-white hover:text-black transition-all">
              {t('nav_dashboard')}
            </Link>
          </div>
        </div>
      </section>

      {/* Industrial Trust Bar */}
      <div className={`border-y py-8 overflow-hidden ${isLightTheme ? 'bg-gray-50 border-gray-200' : 'bg-[#111] border-gray-800'}`}>
        <div className={`flex whitespace-nowrap animate-[marquee_30s_linear_infinite] gap-12 font-mono font-bold text-lg tracking-[0.2em] italic uppercase ${isLightTheme ? 'text-gray-400' : 'text-gray-500'}`}>
          {[...Array(5)].map((_, i) => (
            <React.Fragment key={i}>
              <span>MIL-SPEC TESTED</span>
              <span className="thinkpad-red" style={{color: 'var(--accent)'}}>●</span>
              <span>REPAIRABLE DESIGN</span>
              <span className="thinkpad-red" style={{color: 'var(--accent)'}}>●</span>
              <span>7-ROW KEYBOARD MODS</span>
              <span className="thinkpad-red" style={{color: 'var(--accent)'}}>●</span>
              <span>TRACKPOINT SUPREMACY</span>
              <span className="thinkpad-red" style={{color: 'var(--accent)'}}>●</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Featured Grid */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4 border-l-4 pl-6" style={{borderLeftColor: 'var(--accent)'}}>
          <div>
            <h2 className={`text-5xl font-bold mb-4 tracking-tight ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>{t('recent_listings')}</h2>
            <p className="text-gray-500 text-xl font-light">Hand-picked hardware from verified community enthusiasts.</p>
          </div>
          <Link to="/used" className="text-sm font-bold uppercase tracking-widest hover:underline" style={{color: 'var(--accent)'}}>View All Marketplace →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      <Newsletter />
    </div>
  );
};

export default Home;
