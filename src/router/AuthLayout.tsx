// AuthLayout.tsx
import React from 'react';
import { Outlet, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '@/components/theme-toggle/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher/language-switcher';

interface AuthLayoutProps {
   FormComponent: React.FC;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ FormComponent }) => {
   const { t } = useTranslation();

   return (
      <div className="flex h-screen">
         <div className="flex flex-1 items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
               <FormComponent />
            </div>
         </div>
         <div className="flex w-1/3 flex-col items-center justify-center bg-gray-800 text-white">
            <div className="mb-4 text-4xl font-bold">{t('brand')}</div>
            <p className="mb-8 text-lg">{t('auth.description')}</p>
            <div className="flex items-center space-x-4">
               <LanguageSwitcher />
               <ThemeToggle />
            </div>
         </div>
      </div>
   );
};

export default AuthLayout;
