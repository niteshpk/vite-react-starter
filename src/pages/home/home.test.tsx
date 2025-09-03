import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import HomePage from './home';

// Mock react-i18next so t(key) returns the key
vi.mock('react-i18next', () => ({
   useTranslation: () => ({
      t: (key: string) => key,
   }),
}));

describe('HomePage', () => {
   it('renders the main heading (i18n key)', () => {
      render(<HomePage />);
      const heading = screen.getByRole('heading', {
         level: 2,
         name: 'home.title',
      });
      expect(heading).toBeInTheDocument();
   });

   it('renders the lead paragraph (i18n key)', () => {
      render(<HomePage />);
      expect(screen.getByText('home.lead')).toBeInTheDocument();
   });

   it('renders all five buttons with correct i18n keys', () => {
      render(<HomePage />);

      expect(
         screen.getByRole('button', { name: 'home.buttons.primary' })
      ).toBeInTheDocument();
   });

   it('matches snapshot (keys, not translations)', () => {
      const { asFragment } = render(<HomePage />);
      expect(asFragment()).toMatchSnapshot();
   });
});
