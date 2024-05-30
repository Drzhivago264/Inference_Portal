import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import introJsonEN from './public/locales/en/introduction.json'
import introJsonVI from './public/locales/vi/introduction.json'
import navbarEN from './public/locales/en/navbar.json'
import navbarVI from './public/locales/vi/navbar.json'
import keymanagementEN from './public/locales/en/key_management.json'
import keymanagementVI from './public/locales/vi/key_management.json'
const resources = {
  en: {
    translation: {
      'introduction': introJsonEN,
      'navbar': navbarEN,
      'key_management': keymanagementEN
    }
  },
  vi: {
    translation:  {
      'introduction': introJsonVI,
      'navbar': navbarVI,
      'key_management': keymanagementVI
    }
  }
};
console.log(resources)
i18n
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: ['en', 'vi'],
    nonExplicitSupportedLngs: true, 
    debug: true,
    resources,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;