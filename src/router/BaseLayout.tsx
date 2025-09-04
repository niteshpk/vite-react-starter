import { LanguageSwitcher } from '@/components/language-switcher/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle/theme-toggle';
import { Link, Outlet } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

function BaseLayout() {
   const { t } = useTranslation();
   const isLoggedIn = false; // Replace with actual authentication logic

   return (
      <div className="min-h-screen">
         {isLoggedIn && (
            <header className="border-b">
               <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                  <Link to="/" className="text-lg font-semibold">
                     {t('brand')}
                  </Link>
                  <nav className="flex items-center justify-center gap-4 text-sm">
                     <Link to="/" className="[&.active]:font-semibold">
                        {t('nav.home')}
                     </Link>
                     <Link to="/about" className="[&.active]:font-semibold">
                        {t('nav.about')}
                     </Link>
                     <LanguageSwitcher />
                     <ThemeToggle />
                  </nav>
               </div>
            </header>
         )}
         <main className="mx-auto max-w-7xl px-4 py-8">
            <Outlet />
         </main>
      </div>
   );
}

export default BaseLayout;
