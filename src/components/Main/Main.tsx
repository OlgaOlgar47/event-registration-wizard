import React from 'react';
import styles from './Main.module.scss';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Main: React.FC = () => {
  const navigate = useNavigate();
  const openStepForm = () => {
    navigate('/step1', { replace: true });
  };
  const { t } = useTranslation();

  return (
    <main className={styles.main}>
      <div className={styles.background}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>{t('eventHeadline')}</h1>
        <h3 className={styles.subtitle}>{t('eventDescription')}</h3>
        <Button variant="contained" color="secondary" onClick={openStepForm}>
          {t('registerButton')}
        </Button>
      </div>
    </main>
  );
};
