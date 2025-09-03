import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
   RouterProvider,
   createRouter,
   createMemoryHistory,
} from '@tanstack/react-router';
import { router as appRouter } from './router';
import { vi } from 'vitest';

/**
 * Make t(key) return the key so we can assert on i18n constants
 * without loading any translation files.
 */
vi.mock('react-i18next', () => ({
   useTranslation: () => ({
      t: (key: string) => key,
   }),
}));

/** Stub UI bits not under test */
vi.mock('@/components/theme-toggle/theme-toggle', () => ({
   ThemeToggle: () => <button aria-label="Toggle theme" />,
}));
vi.mock('@/components/language-switcher/language-switcher', () => ({
   LanguageSwitcher: () => <div data-testid="language-switcher" />,
}));

/** Helper: fresh router with memory history */
function renderWithRoute(initial = '/') {
   const testRouter = createRouter({
      routeTree: appRouter.options.routeTree,
      history: createMemoryHistory({ initialEntries: [initial] }),
   });
   const ui = render(<RouterProvider router={testRouter} />);
   return { ...ui, router: testRouter };
}

describe('App Router (keys only)', () => {
   it('renders brand and nav labels as i18n keys', async () => {
      renderWithRoute('/');

      // Brand link shows the key `brand`
      expect(
         await screen.findByRole('link', { name: 'brand' })
      ).toBeInTheDocument();

      // Nav links show their keys
      expect(
         await screen.findByRole('link', { name: 'nav.home' })
      ).toBeInTheDocument();
      expect(
         await screen.findByRole('link', { name: 'nav.about' })
      ).toBeInTheDocument();

      // Language switcher stub present
      expect(screen.getByTestId('language-switcher')).toBeInTheDocument();

      // Theme toggle stub present
      expect(
         screen.getByRole('button', { name: /toggle theme/i })
      ).toBeInTheDocument();
   });

   it('renders Home route and marks Home active', async () => {
      renderWithRoute('/');

      // Heading from HomePage should be the key
      expect(
         await screen.findByRole('heading', { level: 2, name: 'home.title' })
      ).toBeInTheDocument();

      const homeLink = await screen.findByRole('link', { name: 'nav.home' });
      await waitFor(() =>
         expect(homeLink).toHaveAttribute('aria-current', 'page')
      );
   });

   it('navigates to About and marks About active', async () => {
      renderWithRoute('/');

      const aboutLink = await screen.findByRole('link', { name: 'nav.about' });
      await userEvent.click(aboutLink);

      expect(
         await screen.findByRole('heading', { level: 2, name: 'about.title' })
      ).toBeInTheDocument();

      await waitFor(() =>
         expect(aboutLink).toHaveAttribute('aria-current', 'page')
      );
      const homeLink = await screen.findByRole('link', { name: 'nav.home' });
      expect(homeLink).not.toHaveAttribute('aria-current', 'page');
   });

   it('directs to About when starting at /about', async () => {
      renderWithRoute('/about');
      expect(
         await screen.findByRole('heading', { level: 2, name: 'about.title' })
      ).toBeInTheDocument();
   });
});
