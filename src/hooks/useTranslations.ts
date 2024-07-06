import { useI18nStore } from '@/store/i18nStore';
import { getNestedTranslation } from '@/lib/utils';

export const useTranslations = () => {
  const translations = useI18nStore((state) => state.translations);
  return (key: string) => getNestedTranslation(translations, key);
};