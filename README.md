### Overview

Event Registration Wizard is a single-page React application developed with TypeScript. It provides a multi-step form for users to register for an event, collecting personal information, event preferences, and payment details. The form supports real-time validation, multi-language interface, and state persistence across steps.

### Project link

---

Project is configured for automatic deployment to GitHub Pages with every push to the main branch. 💪🏻 The process utilizes CI for code checking and building, after which the build gets uploaded and published to GitHub Pages. Now, site is always up to date and updates automatically! 🚀

Check website here 👉 [click](https://olgaolgar47.github.io/event-registration-wizard/)

### Features

---

## Multi-Step Form

The form is divided into four steps:

- Personal Information:
  First Name
  Last Name
  Email
  Age

- Event Preferences:
  Ticket Type (VIP, Standard, Economy)
  Dietary Restrictions
  Event Date (date picker)

- Payment Information:
  Payment Method (Credit Card, PayPal, Bank Transfer)
  Number of Tickets (range slider)
  Profile Picture (image upload)

- Result Page:
  Displays a table with all data user put and have buuton start over if something is wrong
  if all is good, submits the form data to the REST API at http://localhost:3001.

- Success:
  showing succes alert and confetti

## Real-Time Validation

Ensures required fields are not left empty.
Displays error messages dynamically.

## Language Selector

Supports English, Russian, French, and German.
Persists selected language between page reloads using a language selector.

## State Management

Utilizes Redux for managing form data across different steps.
Ensures data entered in each step is saved and accessible in subsequent steps.

### Technical Stack

---

**Frontend**: React, TypeScript
_State Management_: Redux Toolkit  
_Styling_: CSS Modules (module.scss), variables, mixins, styles-nesting, material-UI
_Form Handling_: React Hook Form, Zod  
_API_: Axios  
_Internationalization_: i18next, react-i18next
_Code Quality_: Husky, lint-staged, stylelint

In this project, a modular architecture was deemed unnecessary due to the project's scope and complexity. Instead, a simple and straightforward folder structure was chosen to keep the codebase clean and easy to navigate. This approach allows for rapid development and easy maintenance while providing enough organization to manage the key parts of the application efficiently.

### Installation

---

- git clone https://github.com/OlgaOlgar47/event-registration-wizard - clone the repository;

- cd event-registration-wizard - navigate to the project directory;

- npm install - install the dependencies;

- npm run dev - the project will start on port http://localhost:5173; 🔥
