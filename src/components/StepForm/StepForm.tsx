import React, { useState } from 'react';
import { PersonalInformation } from '../PersonalInformation';
import { EventPreferences } from '../EventPreferences';
import { useForm } from 'react-hook-form';
import type { FormState } from '@/store/formSlice';
import { initialState } from '@/store/formSlice';
import { updateForm } from '@/store/formSlice';
import { PaymentInformation } from '../PaymentInformation';
import { SuccessPage } from '../SuccessPage';
import { Button } from '@mui/material';
import styles from './StepForm.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useAppDispatch } from '@/hook';
// import TrainingForm from '../TrainingForm/TrainingForm';

interface FormProps {
  handleClose: () => void;
}

export const StepForm: React.FC<FormProps> = ({ handleClose }) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormState>(initialState);

  const dispatch = useAppDispatch();
  const { handleSubmit } = useForm<FormState>();

  const nextStep = () => setStep(prevStep => prevStep + 1);
  const prevStep = () => setStep(prevStep => prevStep - 1);

  const handleNext = () => {
    if (step === 3) {
      dispatch(updateForm(formData));
    }
    nextStep();
  };

  const handleFormChange = (data: Partial<FormState>) => {
    setFormData(prevData => ({ ...prevData, ...data }));
  };

  const stepTitles = [
    '',
    'step 1/3: Personal Information',
    'step 2/3: Event Preferences',
    'step 3/3: Payment Information',
    'Success!',
  ];

  const title = stepTitles[step] || '';

  return (
    <div className={styles.formOverlay}>
      <div className={styles.container}>
        <div className={styles.closeButton}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <h2 className={styles.title}>{title}</h2>
        <form onSubmit={handleSubmit(handleNext)} className={styles.form}>
          {step === 1 && (
            <PersonalInformation onChange={handleFormChange} data={formData} />
          )}
          {step === 2 && (
            <EventPreferences onChange={handleFormChange} data={formData} />
          )}
          {step === 3 && (
            <PaymentInformation onChange={handleFormChange} data={formData} />
          )}
          {step === 4 && <SuccessPage />}
          <div className={styles.buttonContainer}>
            {step > 1 && step < 4 && (
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
        </form>
      </div>
    </div>
  );
};
