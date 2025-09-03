import {
   createRootRoute,
   createRoute,
   createRouter,
   Outlet,
   Link,
} from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import HomePage from '@/pages/home/home';
import AboutPage from '@/pages/about/about';
import { ThemeToggle } from '@/components/theme-toggle/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher/language-switcher';

function Layout() {
   const { t } = useTranslation();

   return (
      <div className="min-h-screen">
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
         <main className="mx-auto max-w-7xl px-4 py-8">
            <Outlet />
         </main>
      </div>
   );
}

const rootRoute = createRootRoute({ component: Layout });
const indexRoute = createRoute({
   getParentRoute: () => rootRoute,
   path: '/',
   component: HomePage,
});
const aboutRoute = createRoute({
   getParentRoute: () => rootRoute,
   path: '/about',
   component: AboutPage,
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
   interface Register {
      router: typeof router;
   }
}
