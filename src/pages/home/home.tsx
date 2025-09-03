import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
   const { t } = useTranslation();
   return (
      <section className="space-y-6">
         <div>
            <h2 className="text-3xl font-bold tracking-tight">
               {t('home.title')}
            </h2>
            <p className="mt-2 text-muted-foreground">{t('home.lead')}</p>
         </div>

         <div className="flex gap-3">
            <Button>{t('home.buttons.primary')}</Button>
         </div>
      </section>
   );
}
