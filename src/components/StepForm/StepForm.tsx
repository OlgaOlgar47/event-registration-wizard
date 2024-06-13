import React, { useState } from 'react';
import { PersonalInformation } from '../PersonalInformation';
// import { EventPreferences } from '../EventPreferences';
import { PaymentInformation } from '../PaymentInformation';
import { SuccessPage } from '../SuccessPage';
import TrainingForm from '../TrainingForm/TrainingForm';
import { Button } from '@mui/material';
import styles from './StepForm.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

interface FormProps {
  handleClose: () => void;
}

export const StepForm: React.FC<FormProps> = ({ handleClose }) => {
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
        <div className={styles.closeButton}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <h2 className={styles.title}>{title}</h2>
        {step === 1 && <PersonalInformation />}
        {step === 2 && <TrainingForm />}
        {step === 3 && <PaymentInformation />}
        {step === 4 && <SuccessPage />}
        <div className={styles.buttonContainer}>
          {step > 1 && (
            <Button variant="contained" color="primary" onClick={prevStep}>
              &#8592; Back
            </Button>
          )}
          {step < 4 && (
            <Button variant="contained" color="primary" onClick={nextStep}>
              Next &#8594;
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
