import i18n from 'i18next';
import 'url-search-params-polyfill';
import { initReactI18next } from 'react-i18next';
import EN_US from '../locales/en-US.json';
import EN_CA from '../locales/en-CA.json';
import FR_CA from '../locales/fr-CA.json';

const urlParams = new URLSearchParams(window.location.search);
const locale = urlParams.get('locale');
export const supportedLocales = {
  'en-US': {
    translation: EN_US
  },
  'en-CA': {
    translation: EN_CA
  },
  'fr-CA': {
    translation: FR_CA
  }
};

i18n.use(initReactI18next).init({
  lng: locale as string,
  resources: supportedLocales,
  interpolation: {
    escapeValue: false
  },
  fallbackLng: 'en-US'
}).catch((err) => {
  throw new Error(err);
});

export default i18n;
