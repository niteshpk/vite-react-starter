import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, beforeEach, describe, expect, it } from 'vitest';

// Mock the i18n singleton used by the provider
vi.mock('@/i18n/i18n', () => ({
   default: { changeLanguage: vi.fn() },
}));

// Import after the mock so the component picks up the mocked module
import i18n from '@/i18n/i18n';
import { LocaleProvider, useLocale } from './locale-provider';

// Small probe to interact with the context
function Probe() {
   const { locale, setLocale, toggle } = useLocale();
   return (
      <div>
         <span data-testid="locale">{locale}</span>
         <button onClick={() => setLocale('en')}>set-en</button>
         <button onClick={() => setLocale('ar')}>set-ar</button>
         <button onClick={toggle}>toggle</button>
      </div>
   );
}

function renderWithProvider(ui: React.ReactElement = <Probe />) {
   return render(<LocaleProvider>{ui}</LocaleProvider>);
}

beforeEach(() => {
   // reset DOM + storage + mock before each test
   localStorage.clear();
   document.documentElement.removeAttribute('lang');
   document.documentElement.removeAttribute('dir');
   (i18n as any).changeLanguage.mockClear();
});

describe('LocaleProvider / useLocale', () => {
   it('defaults to "en", sets html attrs, persists, and calls i18n.changeLanguage', async () => {
      renderWithProvider();

      expect(screen.getByTestId('locale')).toHaveTextContent('en');
      expect(document.documentElement.getAttribute('lang')).toBe('en');
      expect(document.documentElement.getAttribute('dir')).toBe('ltr');
      expect(localStorage.getItem('locale')).toBe('en');

      expect((i18n as any).changeLanguage).toHaveBeenCalledTimes(1);
      expect((i18n as any).changeLanguage).toHaveBeenLastCalledWith('en');
   });

   it('respects stored "ar" on load', async () => {
      localStorage.setItem('locale', 'ar');
      renderWithProvider();

      expect(screen.getByTestId('locale')).toHaveTextContent('ar');
      expect(document.documentElement.getAttribute('lang')).toBe('ar');
      expect(document.documentElement.getAttribute('dir')).toBe('rtl');
      expect(localStorage.getItem('locale')).toBe('ar');

      expect((i18n as any).changeLanguage).toHaveBeenCalledTimes(1);
      expect((i18n as any).changeLanguage).toHaveBeenLastCalledWith('ar');
   });

   it('setLocale("ar") updates context, html attrs, storage, and i18n', async () => {
      const user = userEvent.setup();
      renderWithProvider();

      await user.click(screen.getByRole('button', { name: /set-ar/i }));

      expect(screen.getByTestId('locale')).toHaveTextContent('ar');
      expect(document.documentElement.getAttribute('lang')).toBe('ar');
      expect(document.documentElement.getAttribute('dir')).toBe('rtl');
      expect(localStorage.getItem('locale')).toBe('ar');

      // first call with "en" (mount), second with "ar"
      expect((i18n as any).changeLanguage).toHaveBeenCalledTimes(2);
      expect((i18n as any).changeLanguage).toHaveBeenLastCalledWith('ar');
   });

   it('toggle flips en ↔ ar and updates everything accordingly', async () => {
      const user = userEvent.setup();
      renderWithProvider();

      // light -> ar
      await user.click(screen.getByRole('button', { name: /toggle/i }));
      expect(screen.getByTestId('locale')).toHaveTextContent('ar');
      expect(document.documentElement.getAttribute('lang')).toBe('ar');
      expect(document.documentElement.getAttribute('dir')).toBe('rtl');
      expect(localStorage.getItem('locale')).toBe('ar');

      // ar -> en
      await user.click(screen.getByRole('button', { name: /toggle/i }));
      expect(screen.getByTestId('locale')).toHaveTextContent('en');
      expect(document.documentElement.getAttribute('lang')).toBe('en');
      expect(document.documentElement.getAttribute('dir')).toBe('ltr');
      expect(localStorage.getItem('locale')).toBe('en');

      // i18n should have been called on mount and twice for toggles
      expect((i18n as any).changeLanguage).toHaveBeenCalledTimes(3);
      expect((i18n as any).changeLanguage).toHaveBeenLastCalledWith('en');
   });

   it('useLocale throws when used outside provider', () => {
      const Orphan = () => {
         useLocale();
         return null;
      };

      // silence expected error logs
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => render(<Orphan />)).toThrow(
         /useLocale must be used within LocaleProvider/i
      );

      spy.mockRestore();
   });
});
