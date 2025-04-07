import { en } from './en';
import { nl } from './nl';
import { Language } from '@/contexts/language-context';

// Define a type for our translations
// We manually define this to avoid type issues with dynamically modified translation objects
type TranslationSet = {
  nav: {
    home: string;
    about: string;
    products: string;
    philosophy: string;
    benefits: string;
    contact: string;
  };
  hero: typeof en.hero;
  about: typeof en.about;
  products: typeof en.products;
  philosophy: typeof en.philosophy;
  workflow: typeof en.workflow;
  benefits: typeof en.benefits;
  contact: {
    title: string;
    subtitle: string;
    getStarted: string;
    readyTransform: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      success: string;
      error: string;
      sending: string;
      validationError: {
        required: {
          name: string;
          email: string;
          message: string;
        };
        invalid: {
          email: string;
          message: string;
        };
        general: string;
      };
    };
    connect: {
      title: string;
      email: string;
      location: string;
      social: string;
      rotterdam: string;
    };
    newsletter: {
      title: string;
      description: string;
      placeholder: string;
      button: string;
      success: string;
      error: string;
      validationError: {
        required: string;
        invalid: string;
        general: string;
      };
    };
  };
  footer: typeof en.footer;
  languageToggle: typeof en.languageToggle;
  notFound: typeof en.notFound;
  legal: typeof en.legal;
  interactiveDemo: typeof en.interactiveDemo;
};
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
    },
    workflow: translations[language].workflow,
    hero: translations[language].hero,
    nav: translations[language].nav,
    about: translations[language].about,
    products: translations[language].products,
    philosophy: translations[language].philosophy,
    benefits: translations[language].benefits,
    contact: translations[language].contact,
    footer: translations[language].footer,
    languageToggle: translations[language].languageToggle,
    notFound: translations[language].notFound,
    legal: translations[language].legal,
    interactiveDemo: translations[language].interactiveDemo,
  };
}