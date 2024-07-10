import { create } from 'zustand';
import enTranslations from '@/messages/en.json';
import frTranslations from '@/messages/fr.json';
import spTranslations from '@/messages/sp.json';
import arTranslations from '@/messages/ar.json';

type Language = 'ar' |'en' | 'fr' | 'es';

interface I18nState {
  language: Language;
  translations: any;
  setLanguage: any;
}

const translationsMap = {
  ar: arTranslations,
  fr: frTranslations,
  en: enTranslations,
  es: spTranslations,
};

const loadLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const savedLanguage = window.localStorage.getItem('language') as Language;
    return savedLanguage || 'fr';
  }
  return 'fr';
};

export const useI18nStore = create<I18nState>((set) => ({
  language: loadLanguage(),
  translations: frTranslations,
  setLanguage: (language: Language) => {
    localStorage.setItem('language', language);
    set({
      language,
      translations: translationsMap[language],
    });
  },
}));
