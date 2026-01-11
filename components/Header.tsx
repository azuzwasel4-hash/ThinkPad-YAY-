
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';
import { useTheme, ThemeType } from '../context/ThemeContext';
import { Language } from '../services/translations';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, setLanguage, language } = useTranslation();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { label: t('nav_new'), path: '/new' },
    { label: t('nav_used'), path: '/used' },
    { label: t('nav_parts'), path: '/parts' },
    { label: t('nav_forum'), path: '/forum' },
    { label: t('nav_dashboard'), path: '/dashboard' },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'AR' },
    { code: 'ru', label: 'RU' },
    { code: 'de', label: 'DE' },
    { code: 'hi', label: 'HI' },
    { code: 'es', label: 'ES' },
  ];

  const themeCycle: ThemeType[] = ['carbon', 'midnight', 'crimson', 'orange', 'yellow'];
  
  const cycleTheme = () => {
    const currentIndex = themeCycle.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeCycle.length;
    setTheme(themeCycle[nextIndex]);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'carbon': return 'fa-cube';
      case 'midnight': return 'fa-moon';
      case 'crimson': return 'fa-fire';
      case 'orange': return 'fa-bolt';
      case 'yellow': return 'fa-sun';
      default: return 'fa-adjust';
    }
  };

  const isLightTheme = theme === 'orange' || theme === 'yellow';

  return (
    <nav className={`sticky top-0 z-50 shadow-lg border-b-2 transition-colors duration-300 ${isLightTheme ? 'bg-white text-gray-900' : 'bg-black text-white'}`} style={{borderColor: 'var(--accent)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2" dir="ltr">
            <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center">
              ThinkPad <span className="thinkpad-red ml-1" style={{color: 'var(--accent)'}}>YAY!!</span>
              <div className="w-2 h-2 rounded-full ml-1 mb-4" style={{backgroundColor: 'var(--accent)'}}></div>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm font-medium transition-colors hover:opacity-100 ${
                  location.pathname === item.path ? 'opacity-100 underline decoration-2 underline-offset-4' : 'opacity-60'
                }`}
                style={location.pathname === item.path ? {textDecorationColor: 'var(--accent)'} : {}}
              >
                {item.label}
              </Link>
            ))}
            
            <div className={`h-4 w-px mx-2 ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}></div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={cycleTheme}
                className={`w-8 h-8 rounded border flex items-center justify-center transition-all group ${isLightTheme ? 'border-gray-300 bg-gray-50' : 'border-gray-700 bg-gray-900'}`}
                title="Cycle Theme"
              >
                <i className={`fas ${getThemeIcon()} text-xs transition-colors ${isLightTheme ? 'text-gray-500 group-hover:text-black' : 'text-gray-400 group-hover:text-white'}`}></i>
              </button>

              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className={`border text-[10px] font-bold uppercase rounded px-2 py-1.5 outline-none transition-all cursor-pointer appearance-none min-w-[50px] text-center ${isLightTheme ? 'bg-gray-50 border-gray-300 text-gray-900' : 'bg-gray-900 border-gray-700 text-white'}`}
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code} className={isLightTheme ? 'bg-white text-black' : 'bg-black text-white'}>
                    {lang.code.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/sell')}
              className="text-white px-4 py-1.5 rounded text-sm font-bold transition-colors shadow-sm"
              style={{backgroundColor: 'var(--accent)'}}
            >
              {t('sell_btn')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
