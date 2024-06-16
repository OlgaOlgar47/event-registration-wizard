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
      eventHeadline: 'Event Headline',
      eventDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      registerButton: 'Register for Event',
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
      eventHeadline: 'Заголовок мероприятия',
      eventDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      registerButton: 'Зарегистрироваться на мероприятие',
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
      eventHeadline: "Titre de l'événement",
      eventDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      registerButton: "S'inscrire à l'événement",
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
      eventHeadline: 'Veranstaltungsüberschrift',
      eventDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      registerButton: 'Für Veranstaltung registrieren',
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
