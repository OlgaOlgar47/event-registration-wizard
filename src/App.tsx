import React, { useState } from 'react';
import { StepForm } from '@components/StepForm';
import styles from './App.module.scss';

export const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const startRegistration = () => setShowForm(true);

  return (
    <main className={styles.promo}>
      {!showForm ? (
        <>
          <div className={styles.background}></div>
          <div className={styles.content}>
            <h1 className={styles.title}>Event Headline</h1>
            <h3 className={styles.subtitle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do&nbsp;eiusmod tempor incididunt ut&nbsp;labore et&nbsp;dolore
              magna aliqua.
            </h3>
            <button className={styles.button} onClick={startRegistration}>
              Register for Event
            </button>
          </div>
        </>
      ) : (
        <StepForm />
      )}
    </main>
  );
};
