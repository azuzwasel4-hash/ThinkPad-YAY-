
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeType = 'carbon' | 'midnight' | 'crimson' | 'orange' | 'yellow';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('carbon');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('theme-carbon', 'theme-midnight', 'theme-crimson', 'theme-orange', 'theme-yellow');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
