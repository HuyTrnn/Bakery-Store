import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './language/en.json';
import viTranslation from './language/vi.json';
import jaTranslation from './language/ja.json';



i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    vi: { translation: viTranslation },
    ja: { translation: jaTranslation },
  },
  lng: 'en', 
  fallbackLng: 'en', 
  interpolation: {
    escapeValue: false 
  }
});

export default i18n;