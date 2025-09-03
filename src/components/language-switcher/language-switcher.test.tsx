// src/components/language-switcher/language-switcher.test.tsx
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { LanguageSwitcher } from './language-switcher';

// i18n mock: return key
vi.mock('react-i18next', () => ({
   useTranslation: () => ({
      t: (key: string) => key,
   }),
}));

// locale mock: default 'en' + spy setter
const mockSetLocale = vi.fn();
vi.mock('@/i18n/locale-provider', () => ({
   useLocale: () => ({ locale: 'en' as const, setLocale: mockSetLocale }),
}));

// shadcn dropdown mock: inline rendering (no portals)
vi.mock('@/components/ui/dropdown-menu', () => {
   const React = require('react');
   const DropdownMenu = ({ children }: any) => (
      <div data-testid="dropdown">{children}</div>
   );
   const DropdownMenuTrigger = ({ children }: any) => <div>{children}</div>;
   const DropdownMenuContent = ({ children }: any) => (
      <div role="menu">{children}</div>
   );
   const DropdownMenuLabel = ({ children }: any) => <div>{children}</div>;

   function RadioGroup({ value, onValueChange, children }: any) {
      return (
         <div>
            {React.Children.map(children, (child: any) =>
               React.cloneElement(child, {
                  __groupValue: value,
                  __onGroupChange: onValueChange,
               })
            )}
         </div>
      );
   }

   function RadioItem({ value, children, __groupValue, __onGroupChange }: any) {
      const checked = __groupValue === value;
      return (
         <button
            role="menuitemradio"
            aria-checked={checked}
            onClick={() => __onGroupChange?.(value)}
         >
            {children}
         </button>
      );
   }

   return {
      DropdownMenu,
      DropdownMenuTrigger,
      DropdownMenuContent,
      DropdownMenuLabel,
      DropdownMenuRadioGroup: RadioGroup,
      DropdownMenuRadioItem: RadioItem,
   };
});

describe('LanguageSwitcher (keys only)', () => {
   beforeEach(() => {
      mockSetLocale.mockClear();
   });

   it('renders trigger with i18n key aria-label and shows current label key', () => {
      render(<LanguageSwitcher />);

      const trigger = screen.getByRole('button', {
         name: 'lang.change_language',
      });
      expect(trigger).toBeInTheDocument();

      // Scope to the trigger so we don’t collide with the menu item text
      expect(within(trigger).getByText('lang.english')).toBeInTheDocument();
   });

   it('renders radio items (keys) and reflects checked state', () => {
      render(<LanguageSwitcher />);

      const enItem = screen.getByRole('menuitemradio', {
         name: 'lang.english',
      });
      const arItem = screen.getByRole('menuitemradio', { name: 'lang.arabic' });

      expect(enItem).toBeInTheDocument();
      expect(arItem).toBeInTheDocument();
      expect(enItem).toHaveAttribute('aria-checked', 'true');
      expect(arItem).toHaveAttribute('aria-checked', 'false');
   });

   it('clicking Arabic/English calls setLocale with correct value', async () => {
      const user = userEvent.setup();
      render(<LanguageSwitcher />);

      await user.click(
         screen.getByRole('menuitemradio', { name: 'lang.arabic' })
      );
      expect(mockSetLocale).toHaveBeenCalledWith('ar');

      await user.click(
         screen.getByRole('menuitemradio', { name: 'lang.english' })
      );
      expect(mockSetLocale).toHaveBeenCalledWith('en');
   });
});
