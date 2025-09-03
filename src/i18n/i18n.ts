import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Static JSON imports (bundled by Vite)
import en from '@/locales/en/common.json';
import ar from '@/locales/ar/common.json';

export const SUPPORTED_LOCALES = ['en', 'ar'] as const;

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

const resources = {
   en: { common: en },
   ar: { common: ar },
} as const;

i18n
   .use(LanguageDetector)
   .use(initReactI18next)
   .init({
      resources,
      fallbackLng: 'en',
      supportedLngs: SUPPORTED_LOCALES as unknown as string[],
      defaultNS: 'common',
      ns: ['common'],
      interpolation: { escapeValue: false },
   });

export default i18n;
