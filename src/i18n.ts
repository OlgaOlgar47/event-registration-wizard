import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      step1: 'Step 1/3: Personal Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      age: 'Age',
      next: 'Next →',
      // Add more translations here
    },
  },
  ru: {
    translation: {
      step1: 'Шаг 1/3: Личная информация',
      firstName: 'Имя',
      lastName: 'Фамилия',
      email: 'Эл. адрес',
      age: 'Возраст',
      next: 'Далее →',
      // Add more translations here
    },
  },
  fr: {
    translation: {
      step1: 'Étape 1/3 : Informations personnelles',
      firstName: 'Prénom',
      lastName: 'Nom de famille',
      email: 'Email',
      age: 'Âge',
      next: 'Suivant →',
      // Add more translations here
    },
  },
  de: {
    translation: {
      step1: 'Schritt 1/3: Persönliche Informationen',
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail',
      age: 'Alter',
      next: 'Weiter →',
      // Add more translations here
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
