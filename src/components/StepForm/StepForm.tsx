import React, { useState } from 'react';
import { PersonalInformation } from '../PersonalInformation';
import { EventPreferences } from '../EventPreferences';
import { PaymentInformation } from '../PaymentInformation';
import { SuccessPage } from '../SuccessPage';
import { Button } from '@mui/material';
import styles from './StepForm.module.scss';

export const StepForm: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(prevStep => prevStep + 1);
  const prevStep = () => setStep(prevStep => prevStep - 1);

  const title =
    step === 1
      ? 'step 1/3: Personal Information'
      : step === 2
        ? 'step 2/3: Event Preferences'
        : step === 3
          ? 'step 3/3: Payment Information'
          : step === 4
            ? 'Success!'
            : '';

  return (
    <div className={styles.formOverlay}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        {step === 1 && <PersonalInformation />}
        {step === 2 && <EventPreferences />}
        {step === 3 && <PaymentInformation />}
        {step === 4 && <SuccessPage />}
        <div className={styles.buttonContainer}>
          {step > 1 && (
            <Button variant="contained" color="primary" onClick={prevStep}>
              Back
            </Button>
          )}
          {step < 4 && (
            <Button variant="contained" color="primary" onClick={nextStep}>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
