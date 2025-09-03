import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuRadioGroup,
   DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import { useLocale } from '@/i18n/locale-provider';
import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
   const { locale, setLocale } = useLocale(); // 'en' | 'ar'
   const { t } = useTranslation();

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               variant="outline"
               size="sm"
               aria-label={t('lang.change_language')}
               className="gap-2"
            >
               <Languages className="h-4 w-4" />
               <span className="hidden sm:inline">
                  {locale === 'ar' ? t('lang.arabic') : t('lang.english')}
               </span>
            </Button>
         </DropdownMenuTrigger>

         <DropdownMenuContent align="end" sideOffset={8}>
            <DropdownMenuLabel>{t('lang.language')}</DropdownMenuLabel>
            <DropdownMenuRadioGroup
               value={locale}
               onValueChange={(v) => setLocale(v as 'en' | 'ar')}
            >
               <DropdownMenuRadioItem value="en">
                  {t('lang.english')}
               </DropdownMenuRadioItem>
               <DropdownMenuRadioItem value="ar">
                  {t('lang.arabic')}
               </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
