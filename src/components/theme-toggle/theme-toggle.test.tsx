import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/theme/theme-provider';
import { ThemeToggle } from './theme-toggle';

function renderWithProvider() {
   return render(
      <ThemeProvider>
         <ThemeToggle />
      </ThemeProvider>
   );
}

beforeEach(() => {
   localStorage.clear();
   document.documentElement.classList.remove('dark');
});

describe('ThemeToggle (light/dark)', () => {
   it('renders and toggles between light ↔ dark', async () => {
      const user = userEvent.setup();
      renderWithProvider();

      const btn = await screen.findByRole('button', { name: /toggle theme/i });
      // Default is light
      expect(btn).toHaveAttribute('title', 'Theme: light');
      await waitFor(() =>
         expect(document.documentElement.classList.contains('dark')).toBe(false)
      );

      // Click → dark
      await user.click(btn);
      await waitFor(() =>
         expect(document.documentElement.classList.contains('dark')).toBe(true)
      );
      expect(btn).toHaveAttribute('title', 'Theme: dark');

      // Click again → light
      await user.click(btn);
      await waitFor(() =>
         expect(document.documentElement.classList.contains('dark')).toBe(false)
      );
      expect(btn).toHaveAttribute('title', 'Theme: light');
   });

   it('respects stored theme "dark" on load', async () => {
      localStorage.setItem('theme', 'dark');
      renderWithProvider();

      const btn = await screen.findByRole('button', { name: /toggle theme/i });
      await waitFor(() =>
         expect(document.documentElement.classList.contains('dark')).toBe(true)
      );
      expect(btn).toHaveAttribute('title', 'Theme: dark');
   });
});
