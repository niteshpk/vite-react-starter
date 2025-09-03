import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/theme/theme-provider';

export function ThemeToggle() {
   const { theme, toggle } = useTheme();

   return (
      <div className="flex items-center gap-2">
         <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggle}
            title={`Theme: ${theme}`}
         >
            {theme === 'dark' ? (
               <Moon className="h-4 w-4" />
            ) : (
               <Sun className="h-4 w-4" />
            )}
         </Button>
      </div>
   );
}
