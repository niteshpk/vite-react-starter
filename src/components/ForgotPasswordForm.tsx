import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

const ForgotPasswordForm: React.FC = () => {
   const { t } = useTranslation();
   const navigate = useNavigate();
   const [email, setEmail] = useState('');
   const [error, setError] = useState('');
   const [success, setSuccess] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
         // Perform forgot password logic here
         // If successful, display a success message
         await forgotPassword(email);
         setSuccess(true);
      } catch (err) {
         setError(t('auth.forgotPasswordError'));
      }
   };

   const forgotPassword = async (email: string) => {
      // Implement your forgot password logic here
      // This is just a placeholder
      return new Promise((resolve, reject) => {
         if (email === 'user@example.com') {
            resolve(true);
         } else {
            reject(new Error('Email not found'));
         }
      });
   };

   return (
      <form onSubmit={handleSubmit} className="space-y-6">
         {success ? (
            <div className="text-sm text-green-500">
               <p>{t('auth.forgotPasswordSuccess')}</p>
            </div>
         ) : (
            <>
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
               {error && (
                  <div className="text-sm text-red-500">
                     <p>{error}</p>
                  </div>
               )}
               <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
               >
                  {t('auth.forgotPassword')}
               </button>
               <Link
                  to="/auth/login"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
               >
                  {t('auth.alreadyHaveAccount')}
               </Link>
            </>
         )}
      </form>
   );
};

export default ForgotPasswordForm;
