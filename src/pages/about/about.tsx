import { useTranslation } from 'react-i18next';

export default function AboutPage() {
   const { t } = useTranslation();
   return (
      <section className="prose dark:prose-invert max-w-none">
         <h2 className="text-3xl font-bold tracking-tight">
            {t('about.title')}
         </h2>
      </section>
   );
}
