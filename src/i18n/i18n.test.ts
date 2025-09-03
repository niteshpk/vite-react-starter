import { describe, it, expect, beforeAll } from 'vitest';
import i18n, { SUPPORTED_LOCALES } from './i18n';

// If your test runner loads this module before i18n finishes init,
// ensure we're in a known state (and that resources are ready)
beforeAll(async () => {
   // force a concrete language to avoid env-dependent detection
   await i18n.changeLanguage('en');
});

describe('i18n initialization', () => {
   it('is initialized with expected options', () => {
      expect(i18n.isInitialized).toBe(true);

      // default namespace & namespaces
      expect(i18n.options.defaultNS).toBe('common');
      expect(i18n.options.ns).toEqual(expect.arrayContaining(['common']));

      // fallback language
      // (can be string, array or object; we only check it includes/enforces "en")
      if (Array.isArray(i18n.options.fallbackLng)) {
         expect(i18n.options.fallbackLng).toEqual(
            expect.arrayContaining(['en'])
         );
      } else if (typeof i18n.options.fallbackLng === 'string') {
         expect(i18n.options.fallbackLng).toBe('en');
      } else {
         // object syntax: { default: ['en'] } etc.
         const def = (i18n.options.fallbackLng as any)?.default;
         if (Array.isArray(def)) {
            expect(def).toEqual(expect.arrayContaining(['en']));
         }
      }

      // supported locales contain exactly the ones you export
      // (i18next may add 'dev' internally; we assert at least your set)
      expect(i18n.options.supportedLngs).toEqual(
         expect.arrayContaining([...SUPPORTED_LOCALES])
      );
   });

   it('has resource bundles for each supported locale (namespace: common)', () => {
      for (const lng of SUPPORTED_LOCALES) {
         expect(i18n.hasResourceBundle(lng, 'common')).toBe(true);
      }
   });

   it('registers a language detector plugin', () => {
      // Provided by i18next-browser-languagedetector
      expect(i18n.services?.languageDetector).toBeDefined();
   });
});

describe('i18n keys (no translation text assertions)', () => {
   it('exposes expected common keys in English', () => {
      // Verify key presence only (not the actual translated strings)
      const keysToExist = [
         'brand',
         'nav.home',
         'nav.about',
         'lang.english',
         'lang.arabic',
         // add any other keys your app renders, e.g.:
         // 'home.title',
         // 'about.title',
      ];

      for (const key of keysToExist) {
         expect(i18n.exists(key, { lng: 'en', ns: 'common' })).toBe(true);
      }
   });

   it('returns the key itself for unknown keys (sanity)', () => {
      const missing = '__missing.key__';
      // i18next returns the key when a translation is missing
      expect(i18n.t(missing, { ns: 'common', lng: 'en' })).toBe(missing);
   });
});
