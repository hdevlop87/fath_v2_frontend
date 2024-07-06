import { create } from 'zustand';
import enTranslations from '@/messages/en.json';
import frTranslations from '@/messages/fr.json';

type Language = 'en' | 'fr';

interface I18nState {
  language: Language;
  translations: any;
  setLanguage: any;
}

const translationsMap = {
  fr: frTranslations,
  en: enTranslations,
};

export const useI18nStore = create<I18nState>((set) => ({
  language: 'fr',
  translations: frTranslations,
  setLanguage: (language) => {
    set({
      language,
      translations: translationsMap[language],
    });
  },
}));
