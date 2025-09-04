import React from 'react';
import { Outlet, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { LogOut, Settings, User } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher/language-switcher';

const Sidebar: React.FC = () => {
   const { t } = useTranslation();

   return (
      <div className="flex h-full w-60 flex-col bg-gray-800 text-white">
         <div className="border-b border-gray-700 px-6 py-4">
            <Link to="/app" className="text-xl font-bold">
               {t('brand')}
            </Link>
         </div>
         <nav className="flex-1 py-4">
            <ul className="space-y-2">
               <li>
                  <Link
                     to="/app"
                     className="flex items-center px-6 py-2 hover:bg-gray-700"
                  >
                     {t('nav.home')}
                  </Link>
               </li>
               <li>
                  <Link
                     to="/about"
                     className="flex items-center px-6 py-2 hover:bg-gray-700"
                  >
                     {t('nav.chat')}
                  </Link>
               </li>
               {/* Add more navigation links here */}
            </ul>
         </nav>
         <div className="mt-auto flex items-center justify-between border-t border-gray-700 p-4">
            <div className="flex items-center space-x-2">
               <User className="h-6 w-6" />
               <span>John Doe</span>
            </div>
            <div className="flex items-center space-x-2">
               <LanguageSwitcher />
               <ThemeToggle />
               <Link to="/about" className="text-red-500 hover:text-red-400">
                  <LogOut className="h-6 w-6" />
               </Link>
            </div>
         </div>
      </div>
   );
};

const ContentArea: React.FC = () => {
   return (
      <div className="flex h-full flex-col bg-gray-100">
         <header className="flex items-center justify-between border-b bg-white px-6 py-4">
            <h1 className="text-lg font-semibold">ChatGPT</h1>
            <div className="flex items-center space-x-4">
               <button className="text-gray-500 hover:text-gray-700">
                  <Settings className="h-6 w-6" />
               </button>
            </div>
         </header>
         <main className="flex-1 p-6">
            <Outlet />
         </main>
      </div>
   );
};

const AppLayout: React.FC = () => {
   return (
      <div className="flex h-screen">
         <Sidebar />
         <ContentArea />
      </div>
   );
};

export default AppLayout;
