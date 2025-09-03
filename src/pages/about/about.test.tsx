import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from './about';
import { vi } from 'vitest';

// Mock react-i18next so t(key) returns the key (no real translations)
vi.mock('react-i18next', () => ({
   useTranslation: () => ({
      t: (key: string) => key,
   }),
}));

describe('AboutPage', () => {
   it('renders the main heading (i18n key)', () => {
      render(<AboutPage />);
      const heading = screen.getByRole('heading', {
         level: 2,
         name: 'about.title',
      });
      expect(heading).toBeInTheDocument();
   });

   it('renders exactly one h2', () => {
      render(<AboutPage />);
      expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(1);
   });

   it('matches snapshot (keys, not translations)', () => {
      const { asFragment } = render(<AboutPage />);
      expect(asFragment()).toMatchSnapshot();
   });
});
