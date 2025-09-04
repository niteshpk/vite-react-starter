import {
   createRootRoute,
   createRoute,
   createRouter,
   redirect,
} from '@tanstack/react-router';
import HomePage from '@/pages/home/home';
import AboutPage from '@/pages/about/about';
import TestPage from '@/pages/test/TestPage';
import GuestLayout from '@/layouts/guest.layout';
import TestLayout from '@/layouts/TestLayout';
import BaseLayout from '@/layouts/base.layout';
import MainContent from '@/layouts/MainContent';
import AppLayout from '@/layouts/app.layout';

// for index route bind the base layout
const rootRoute = createRootRoute({
   component: BaseLayout,
});

const indexRoute = createRoute({
   getParentRoute: () => rootRoute,
   path: '/',
   loader: () => {
      throw redirect({ to: '/home' });
   },
});

const homeRoute = createRoute({
   getParentRoute: () => rootRoute,
   path: '/home',
   component: AppLayout,
});

const aboutRoute = createRoute({
   getParentRoute: () => rootRoute,
   path: '/about',
   component: AboutPage,
});

const testRoute = createRoute({
   getParentRoute: () => rootRoute,
   path: '/test1',
   component: () => <TestLayout></TestLayout>,
});

const routeTree = rootRoute.addChildren([
   indexRoute,
   homeRoute,
   aboutRoute,
   testRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
   interface Register {
      router: typeof router;
   }
}
