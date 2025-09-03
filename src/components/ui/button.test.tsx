import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, buttonVariants } from './button'; // adjust path if needed
import { cn } from '@/lib/utils';

describe('Button component', () => {
   it('renders as a native <button> by default with default variant & size classes', () => {
      render(<Button>Click me</Button>);
      const btn = screen.getByRole('button', { name: /click me/i });

      // Base styles (+ default variant/size)
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveClass(
         // base
         'inline-flex',
         'items-center',
         'justify-center',
         'whitespace-nowrap',
         'rounded-md',
         'text-sm',
         'font-medium',
         'transition-colors',
         'focus-visible:outline-none',
         'focus-visible:ring-2',
         'focus-visible:ring-ring',
         'focus-visible:ring-offset-2',
         'disabled:pointer-events-none',
         'disabled:opacity-50',
         'ring-offset-background',
         // default variant
         'bg-primary',
         'text-primary-foreground',
         // default size
         'h-10',
         'px-4',
         'py-2'
      );
   });

   it('applies `secondary` variant and `sm` size classes', () => {
      render(
         <Button variant="secondary" size="sm">
            Small Secondary
         </Button>
      );
      const btn = screen.getByRole('button', { name: /small secondary/i });
      expect(btn).toHaveClass('bg-secondary', 'text-secondary-foreground');
      expect(btn).toHaveClass('h-9', 'rounded-md', 'px-3');
   });

   it('applies `outline` & `ghost` variants styles', () => {
      const { rerender } = render(<Button variant="outline">Outline</Button>);
      let btn = screen.getByRole('button', { name: /outline/i });
      expect(btn).toHaveClass(
         'border',
         'border-input',
         'bg-background',
         'hover:bg-accent',
         'hover:text-accent-foreground'
      );

      rerender(<Button variant="ghost">Ghost</Button>);
      btn = screen.getByRole('button', { name: /ghost/i });
      expect(btn).toHaveClass(
         'hover:bg-accent',
         'hover:text-accent-foreground'
      );
   });

   it('merges custom className and allows Tailwind override to win', () => {
      // default has px-4; pass px-2 to override via tailwind-merge
      render(<Button className="data-test px-2">Custom</Button>);
      const btn = screen.getByRole('button', { name: /custom/i });
      expect(btn).toHaveClass('data-test');
      // px-2 should override px-4
      expect(btn).toHaveClass('px-2');
      expect(btn).not.toHaveClass('px-4');
   });

   it('forwards ref to the underlying button element', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Button ref={ref}>With ref</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName.toLowerCase()).toBe('button');
   });

   it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
         <Button disabled onClick={onClick}>
            Disabled
         </Button>
      );
      await user.click(screen.getByRole('button', { name: /disabled/i }));
      expect(onClick).not.toHaveBeenCalled();
   });

   it('asChild renders into the provided element and preserves classes', () => {
      // When asChild is true, Button will render its props into the child (Radix Slot)
      render(
         <Button asChild>
            <a href="#go">Go Link</a>
         </Button>
      );
      // It's rendered as an anchor now, not a button
      const link = screen.getByRole('link', { name: /go link/i });
      expect(link).toBeInTheDocument();
      // Classes from buttonVariants should still be applied on the anchor
      expect(link).toHaveClass('inline-flex', 'rounded-md', 'text-sm');
   });
});

describe('buttonVariants utility', () => {
   it('returns default classes', () => {
      const cls = buttonVariants({});
      expect(cls).toContain('bg-primary');
      expect(cls).toContain('text-primary-foreground');
      expect(cls).toContain('h-10');
   });

   it('returns classes for { variant: "link", size: "lg" }', () => {
      const cls = buttonVariants({ variant: 'link', size: 'lg' });
      expect(cls).toContain('text-primary');
      expect(cls).toContain('hover:underline');
      expect(cls).toContain('h-11');
      expect(cls).toContain('px-8');
   });

   it('merges additional className when passed through cn (tailwind-merge)', () => {
      const cls = cn(buttonVariants({ className: 'px-2' }));
      expect(cls).toContain('px-2');
      expect(cls).not.toContain('px-4'); // px-2 overrides default px-4
   });
});
