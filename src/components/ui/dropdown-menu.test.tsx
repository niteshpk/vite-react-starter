// src/components/ui/dropdown-menu.extra.test.tsx
import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuCheckboxItem,
   DropdownMenuRadioItem,
   DropdownMenuLabel,
   DropdownMenuSub,
   DropdownMenuSubTrigger,
   DropdownMenuSubContent,
   DropdownMenuRadioGroup,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
} from './dropdown-menu';

function ControlledMenu({
   children,
   initiallyOpen = true,
   contentClassName,
   sideOffset,
}: {
   children: React.ReactNode;
   initiallyOpen?: boolean;
   contentClassName?: string;
   sideOffset?: number;
}) {
   const [open, setOpen] = useState(initiallyOpen);
   return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
         <DropdownMenuTrigger asChild>
            <button aria-label="Open menu">Open</button>
         </DropdownMenuTrigger>
         <DropdownMenuContent
            className={contentClassName}
            sideOffset={sideOffset}
         >
            {children}
         </DropdownMenuContent>
      </DropdownMenu>
   );
}

describe('dropdown-menu UI wrappers (extra coverage)', () => {
   it('adds inset padding for Label and Item when inset is true', () => {
      render(
         <ControlledMenu>
            <DropdownMenuLabel inset>Section</DropdownMenuLabel>
            <DropdownMenuItem inset>Indented Item</DropdownMenuItem>
         </ControlledMenu>
      );

      expect(screen.getByText('Section')).toHaveClass('pl-8');
      expect(
         screen.getByRole('menuitem', { name: 'Indented Item' })
      ).toHaveClass('pl-8');
   });

   it('merges className on Content and SubContent', async () => {
      const user = userEvent.setup();

      render(
         <ControlledMenu contentClassName="content-extra">
            <DropdownMenuLabel>Label</DropdownMenuLabel>
            <DropdownMenuSub>
               <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
               <DropdownMenuSubContent className="sub-extra">
                  <DropdownMenuItem>Child</DropdownMenuItem>
               </DropdownMenuSubContent>
            </DropdownMenuSub>
         </ControlledMenu>
      );

      // Root Content has the extra class
      expect(screen.getByRole('menu')).toHaveClass('content-extra');

      // Open the submenu (Radix mounts SubContent on open)
      const subTrigger = screen.getByRole('menuitem', { name: 'More' });
      subTrigger.focus();
      await user.keyboard('{ArrowRight}');

      // Now SubContent is mounted; find the child item and walk up to its menu
      const childItem = await screen.findByRole('menuitem', { name: 'Child' });
      const subMenu = childItem.closest('[role="menu"]') as HTMLElement;

      expect(subMenu).toBeTruthy();
      expect(subMenu).toHaveClass('sub-extra');
   });

   it('CheckboxItem renders check icon when checked', () => {
      render(
         <ControlledMenu>
            <DropdownMenuCheckboxItem checked>Done</DropdownMenuCheckboxItem>
         </ControlledMenu>
      );

      const checked = screen.getByRole('menuitemcheckbox', { name: 'Done' });
      expect(checked).toHaveAttribute('aria-checked', 'true');
      // Icon from lucide (class h-4 w-4) is placed inside ItemIndicator
      const icon = checked.querySelector('.h-4.w-4');
      expect(icon).toBeTruthy();
   });

   it('RadioItem shows inner dot when selected', async () => {
      const user = userEvent.setup();
      function RadioDemo() {
         const [value, setValue] = useState('one');
         return (
            <ControlledMenu>
               <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
                  <DropdownMenuRadioItem value="one">One</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="two">Two</DropdownMenuRadioItem>
               </DropdownMenuRadioGroup>
            </ControlledMenu>
         );
      }
      render(<RadioDemo />);

      const one = screen.getByRole('menuitemradio', { name: 'One' });
      const two = screen.getByRole('menuitemradio', { name: 'Two' });

      // Selected item contains the dot element (h-2 w-2 rounded-full bg-current)
      expect(
         one.querySelector('.h-2.w-2.rounded-full.bg-current')
      ).toBeTruthy();
      expect(two.querySelector('.h-2.w-2.rounded-full.bg-current')).toBeFalsy();

      await user.click(two);
      expect(one).toHaveAttribute('aria-checked', 'false');
      expect(two).toHaveAttribute('aria-checked', 'true');
      expect(
         two.querySelector('.h-2.w-2.rounded-full.bg-current')
      ).toBeTruthy();
   });

   it('DropdownMenuShortcut renders with base classes and merges extras', () => {
      render(
         <ControlledMenu>
            <DropdownMenuItem>
               Copy
               <DropdownMenuShortcut className="extra">⌘C</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
         </ControlledMenu>
      );

      const shortcut = screen.getByText('⌘C');
      expect(shortcut).toHaveClass(
         'ml-auto',
         'text-xs',
         'tracking-widest',
         'opacity-60',
         'extra'
      );
   });

   it('SubTrigger renders chevron icon and supports non-inset (no pl-8)', () => {
      render(
         <ControlledMenu>
            <DropdownMenuSub>
               <DropdownMenuSubTrigger>Navigate</DropdownMenuSubTrigger>
               <DropdownMenuSubContent>
                  <DropdownMenuItem>Child</DropdownMenuItem>
               </DropdownMenuSubContent>
            </DropdownMenuSub>
         </ControlledMenu>
      );

      const subTrigger = screen.getByRole('menuitem', { name: 'Navigate' });
      // Has base classes but not the inset class
      expect(subTrigger).toHaveClass('flex', 'px-2', 'py-1.5');
      expect(subTrigger).not.toHaveClass('pl-8');

      // Chevron icon present (class h-4 w-4)
      const chevron = subTrigger.querySelector('.h-4.w-4');
      expect(chevron).toBeTruthy();
   });
});
