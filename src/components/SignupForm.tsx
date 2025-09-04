import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

const SignupForm: React.FC = () => {
   const { t } = useTranslation();
   const navigate = useNavigate();
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
         // Perform signup logic here
         // If successful, navigate to the main app route
         await signup(name, email, password);
         navigate({ to: '/about' });
      } catch (err) {
         setError(t('auth.signupError'));
      }
   };

   const signup = async (name: string, email: string, password: string) => {
      // Implement your signup logic here
      // This is just a placeholder
      return new Promise((resolve, reject) => {
         if (name && email && password) {
            resolve(true);
         } else {
            reject(new Error('Missing required fields'));
         }
      });
   };

   return (
      <form onSubmit={handleSubmit} className="space-y-6">
         <div>
            <label
               htmlFor="name"
               className="block text-sm font-medium text-gray-700"
            >
               {t('auth.name')}
            </label>
            <input
               type="text"
               id="name"
               value={name}
               onChange={(e) => setName(e.target.value)}
               required
               className={cn(
                  'block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
               )}
            />
         </div>
         <div>
            <label
               htmlFor="email"
               className="block text-sm font-medium text-gray-700"
            >
               {t('auth.email')}
            </label>
            <input
               type="email"
               id="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
               className={cn(
                  'block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
               )}
            />
         </div>
         <div>
            <label
               htmlFor="password"
               className="block text-sm font-medium text-gray-700"
            >
               {t('auth.password')}
            </label>
            <input
               type="password"
               id="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
               className={cn(
                  'block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
               )}
            />
         </div>
         {error && (
            <div className="text-sm text-red-500">
               <p>{error}</p>
            </div>
         )}
         <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
         >
            {t('auth.signup')}
         </button>
         <Link
            to="/auth/login"
            className="text-sm text-indigo-600 hover:text-indigo-500"
         >
            {t('auth.alreadyHaveAccount')}
         </Link>
      </form>
   );
};

export default SignupForm;
