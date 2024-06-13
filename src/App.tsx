import React, { useState } from 'react';
import { StepForm } from '@components/StepForm';
import styles from './App.module.scss';
import { Button, Modal, Fade } from '@mui/material';

export const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const startRegistration = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <main className={styles.promo}>
      <div className={styles.background}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Event Headline</h1>
        <h3 className={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do&nbsp;eiusmod tempor incididunt ut&nbsp;labore et&nbsp;dolore magna
          aliqua.
        </h3>
        <Button
          variant="contained"
          color="secondary"
          onClick={startRegistration}
        >
          Register for Event
        </Button>
      </div>
      <Modal open={modalOpen} closeAfterTransition>
        <Fade in={modalOpen}>
          <div className={styles.modal}>
            <StepForm handleClose={handleCloseModal} />
          </div>
        </Fade>
      </Modal>
    </main>
  );
};
