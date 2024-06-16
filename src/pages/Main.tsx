import React from 'react';
import styles from './Main.module.scss';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Main: React.FC = () => {
  const navigate = useNavigate();
  const openStepForm = () => {
    navigate('/step1', { replace: true });
  };

  return (
    <main className={styles.main}>
      <div className={styles.background}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Event Headline</h1>
        <h3 className={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do&nbsp;eiusmod tempor incididunt ut&nbsp;labore et&nbsp;dolore magna
          aliqua.
        </h3>
        <Button variant="contained" color="secondary" onClick={openStepForm}>
          Register for Event
        </Button>
      </div>
    </main>
  );
};
