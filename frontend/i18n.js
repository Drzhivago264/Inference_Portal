import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import contactEN from './public/locales/en/contact.json'
import contactVI from './public/locales/vi/contact.json'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import introJsonEN from './public/locales/en/introduction.json'
import introJsonVI from './public/locales/vi/introduction.json'
import keymanagementEN from './public/locales/en/key_management.json'
import keymanagementVI from './public/locales/vi/key_management.json'
import manualEN from './public/locales/en/manual.json'
import manualVI from './public/locales/vi/manual.json'
import navbarEN from './public/locales/en/navbar.json'
import navbarVI from './public/locales/vi/navbar.json'
import parameterexplainEN from './public/locales/en/parameter_explain.json'
import parameterexplainVI from './public/locales/vi/parameter_explain.json'
import redirectEN from './public/locales/en/redirect.json'
import redirectVI from './public/locales/vi/redirect.json'
import tokenmanagementEN from './public/locales/en/token_management.json'
import tokenmanagementVI from './public/locales/vi/token_management.json'

const resources = {
  en: {
    translation: {
      'introduction': introJsonEN,
      'navbar': navbarEN,
      'key_management': keymanagementEN,
      'manual': manualEN,
      'contact': contactEN,
      'redirect': redirectEN,
      'parameter_explain': parameterexplainEN,
      'token_management': tokenmanagementEN
    }
  },
  vi: {
    translation:  {
      'introduction': introJsonVI,
      'navbar': navbarVI,
      'key_management': keymanagementVI,
      'manual': manualVI,
      'contact': contactVI,
      'redirect': redirectVI,
      'parameter_explain': parameterexplainVI,
      'token_management': tokenmanagementVI
    }
  }
};

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
    supportedLngs: ['en', 'vi'],
    nonExplicitSupportedLngs: false, 
    debug: false,
    resources,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;