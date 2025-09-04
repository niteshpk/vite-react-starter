import {
   createRootRoute,
   createRoute,
   createRouter,
} from '@tanstack/react-router';
import HomePage from '@/pages/home/home';
import AboutPage from '@/pages/about/about';
import AuthLayout from './AuthLayout';
import AppLayout from './AppLayout';
import BaseLayout from './BaseLayout';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import ResetPasswordForm from '@/components/ResetPasswordForm';

const rootRoute = createRootRoute({ component: BaseLayout });
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

const loginRoute = createRoute({
   getParentRoute: () => rootRoute,
   path: '/auth/login',
   component: () => <AuthLayout FormComponent={LoginForm} />,
});

const signupRoute = createRoute({
   getParentRoute: () => rootRoute,
   path: '/auth/signup',
   component: () => <AuthLayout FormComponent={SignupForm} />,
});

const forgotPasswordRoute = createRoute({
   getParentRoute: () => rootRoute,
   path: '/auth/forgot-password',
   component: () => <AuthLayout FormComponent={ForgotPasswordForm} />,
});

const resetPasswordRoute = createRoute({
   getParentRoute: () => rootRoute,
   path: '/auth/reset-password',
   component: () => <AuthLayout FormComponent={ResetPasswordForm} />,
});

const appRoute = createRoute({
   getParentRoute: () => rootRoute,
   path: '/app',
   component: AppLayout,
});

const routeTree = rootRoute.addChildren([
   indexRoute,
   aboutRoute,
   loginRoute,
   signupRoute,
   forgotPasswordRoute,
   resetPasswordRoute,
   appRoute,
]);

export const router = createRouter({ routeTree });

// declare module '@tanstack/react-router' {
//    interface Register {
//       router: typeof router;
//    }
// }
