// src/features/form/StepForm.tsx
import React, { useState } from 'react';
import { PersonalInformation } from '../PersonalInformation';
import { EventPreferences } from '../EventPreferences';
import { PaymentInformation } from '../PaymentInformation';
import { SuccessPage } from '../SuccessPage';
import styles from './StepForm.module.scss';

export const StepForm: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(prevStep => prevStep + 1);
  const prevStep = () => setStep(prevStep => prevStep - 1);

  return (
    <div className={styles.formContainer}>
      {step === 1 && <PersonalInformation />}
      {step === 2 && <EventPreferences />}
      {step === 3 && <PaymentInformation />}
      {step === 4 && <SuccessPage />}
      <div>
        {step > 1 && <button onClick={prevStep}>Back</button>}
        {step < 4 && <button onClick={nextStep}>Next</button>}
      </div>
    </div>
  );
};
