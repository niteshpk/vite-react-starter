import React, {
   createContext,
   useContext,
   useEffect,
   useMemo,
   useState,
} from 'react';
import i18n, { type AppLocale } from '@/i18n/i18n';

type LocaleCtx = {
   locale: AppLocale;
   setLocale: (l: AppLocale) => void;
   toggle: () => void; // quick toggle en <-> ar
};

const LOCALE_KEY = 'locale';
const LocaleContext = createContext<LocaleCtx | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
   const [locale, setLocaleState] = useState<AppLocale>(() => {
      const saved = localStorage.getItem(LOCALE_KEY);
      return saved === 'ar' ? 'ar' : 'en';
   });

   useEffect(() => {
      // tell i18next
      i18n.changeLanguage(locale);
      // update html attributes for screen readers and CSS
      const root = document.documentElement;
      root.setAttribute('lang', locale);
      root.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
      localStorage.setItem(LOCALE_KEY, locale);
   }, [locale]);

   const setLocale = (l: AppLocale) => setLocaleState(l);
   const toggle = () => setLocaleState((prev) => (prev === 'en' ? 'ar' : 'en'));

   const value = useMemo(() => ({ locale, setLocale, toggle }), [locale]);
   return (
      <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
   );
}

export function useLocale() {
   const ctx = useContext(LocaleContext);
   if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
   return ctx;
}
