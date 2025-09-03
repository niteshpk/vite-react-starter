import React, {
   createContext,
   useContext,
   useEffect,
   useMemo,
   useState,
} from 'react';

type Theme = 'light' | 'dark';
type ThemeContextValue = {
   theme: Theme;
   setTheme: (t: Theme) => void;
   toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = 'theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
   const [theme, setThemeState] = useState<Theme>(() => {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'dark' ? 'dark' : 'light'; // default light
   });

   // apply <html class="dark"> and persist
   useEffect(() => {
      const root = document.documentElement;
      root.classList.toggle('dark', theme === 'dark');
      localStorage.setItem(STORAGE_KEY, theme);
   }, [theme]);

   const setTheme = (t: Theme) => setThemeState(t);
   const toggle = () =>
      setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));

   const value = useMemo(() => ({ theme, setTheme, toggle }), [theme]);

   return (
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
   );
}

export function useTheme() {
   const ctx = useContext(ThemeContext);
   if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
   return ctx;
}
