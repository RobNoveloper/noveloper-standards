import { en } from './en';
import { nl } from './nl';
import { Language } from '@/contexts/language-context';

// Define a type for our translations
type TranslationSet = typeof en;
type NestedObject = { [key: string]: NestedObject | string };

export const translations: Record<Language, TranslationSet> = {
  en,
  nl,
};

export function useTranslation(language: Language) {
  return {
    t: (key: string) => {
      // Handle nested keys like "hero.title"
      const keys = key.split('.');
      let translation: any = translations[language];
      
      for (const k of keys) {
        if (translation && k in translation) {
          translation = translation[k];
        } else {
          // Fallback to English if key is missing in current language
          let fallback: any = translations['en'];
          for (const fallbackKey of keys) {
            if (fallback && fallbackKey in fallback) {
              fallback = fallback[fallbackKey];
            } else {
              console.warn(`Translation key not found: ${key}`);
              return key;
            }
          }
          return fallback;
        }
      }
      
      return translation;
    }
  };
}