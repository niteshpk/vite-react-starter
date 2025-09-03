import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from './theme-provider';
import { vi } from 'vitest';

function Probe() {
   const { theme, setTheme, toggle } = useTheme();
   return (
      <div>
         <span data-testid="theme">{theme}</span>
         <button onClick={() => setTheme('light')}>set-light</button>
         <button onClick={() => setTheme('dark')}>set-dark</button>
         <button onClick={toggle}>toggle</button>
      </div>
   );
}

function renderWithProvider() {
   return render(
      <ThemeProvider>
         <Probe />
      </ThemeProvider>
   );
}

beforeEach(() => {
   localStorage.clear();
   document.documentElement.classList.remove('dark');
});

describe('ThemeProvider / useTheme (light|dark)', () => {
   it('defaults to light and does not set html.dark', async () => {
      renderWithProvider();

      expect(screen.getByTestId('theme')).toHaveTextContent('light');
      await waitFor(() =>
         expect(document.documentElement.classList.contains('dark')).toBe(false)
      );
      // persisted
      expect(localStorage.getItem('theme')).toBe('light');
   });

   it('respects stored theme "dark" on initial load', async () => {
      localStorage.setItem('theme', 'dark');
      renderWithProvider();

      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      await waitFor(() =>
         expect(document.documentElement.classList.contains('dark')).toBe(true)
      );
      expect(localStorage.getItem('theme')).toBe('dark');
   });

   it('setTheme("dark") applies html.dark and persists', async () => {
      const user = userEvent.setup();
      renderWithProvider();

      await user.click(screen.getByRole('button', { name: /set-dark/i }));
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');

      await waitFor(() =>
         expect(document.documentElement.classList.contains('dark')).toBe(true)
      );
      expect(localStorage.getItem('theme')).toBe('dark');
   });

   it('setTheme("light") removes html.dark and persists', async () => {
      const user = userEvent.setup();
      localStorage.setItem('theme', 'dark');
      renderWithProvider();

      await user.click(screen.getByRole('button', { name: /set-light/i }));
      expect(screen.getByTestId('theme')).toHaveTextContent('light');

      await waitFor(() =>
         expect(document.documentElement.classList.contains('dark')).toBe(false)
      );
      expect(localStorage.getItem('theme')).toBe('light');
   });

   it('toggle flips light ↔ dark and updates DOM/storage', async () => {
      const user = userEvent.setup();
      renderWithProvider();

      // light -> dark
      await user.click(screen.getByRole('button', { name: /toggle/i }));
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      await waitFor(() =>
         expect(document.documentElement.classList.contains('dark')).toBe(true)
      );
      expect(localStorage.getItem('theme')).toBe('dark');

      // dark -> light
      await user.click(screen.getByRole('button', { name: /toggle/i }));
      expect(screen.getByTestId('theme')).toHaveTextContent('light');
      await waitFor(() =>
         expect(document.documentElement.classList.contains('dark')).toBe(false)
      );
      expect(localStorage.getItem('theme')).toBe('light');
   });

   it('useTheme throws outside ThemeProvider', () => {
      const Orphan = () => {
         // calling the hook without provider should throw
         useTheme();
         return null;
      };

      // Silence React error boundary noise for this test
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => render(<Orphan />)).toThrow(
         /useTheme must be used within ThemeProvider/i
      );

      spy.mockRestore();
   });
});
