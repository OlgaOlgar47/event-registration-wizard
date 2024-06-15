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
import { FormStateSchema } from '@/utils/formValidation';
import { ZodFormattedError } from 'zod';
// import TrainingForm from '../TrainingForm/TrainingForm';

interface FormProps {
  handleClose: () => void;
}

export const StepForm: React.FC<FormProps> = ({ handleClose }) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormState>(initialState);
  const [formErrors, setFormErrors] = useState<
    ZodFormattedError<
      {
        firstName: string;
        lastName: string;
        email: string;
        age: number;
        ticketType: 'standard' | 'premium' | 'vip';
        eventDate: string;
        paymentMethod: 'Credit Card' | 'PayPal' | 'Bank Transfer';
        numberOfTickets: number;
        dietaryRestrictions?: string | undefined;
        profilePicture?: File | undefined;
      },
      string
    >
  >({ _errors: [] });

  const dispatch = useAppDispatch();
  const { handleSubmit } = useForm<FormState>();

  const nextStep = () => setStep(prevStep => prevStep + 1);
  const prevStep = () => setStep(prevStep => prevStep - 1);

  const handleNext = () => {
    const validationResult = FormStateSchema.safeParse(formData);
    console.log('validationResult:jsdfjjjjjjjjjjjjjjj ', validationResult);

    if (validationResult.success) {
      if (step === 3) {
        dispatch(updateForm(formData));
      }
      nextStep();
    } else {
      const errors = validationResult.error.format();
      console.log('errors: ', errors);
      setFormErrors(errors);
    }
  };

  const handleFormChange = (data: Partial<FormState>) => {
    setFormData(prevData => ({ ...prevData, ...data }));

    // убираем ошибку из той формы, в которой произошло onChange
    const updatedErrors: ZodFormattedError<FormState> = {
      ...formErrors,
      _errors: [],
    };
    Object.keys(data).forEach(field => {
      if (field in formErrors) {
        delete updatedErrors[field as keyof FormState];
      }
    });
    setFormErrors(updatedErrors);
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
            <PersonalInformation
              onChange={handleFormChange}
              data={formData}
              formErrors={formErrors}
            />
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
              <Button variant="contained" color="primary" onClick={handleNext}>
                {step < 3 ? 'Next' : 'Submit'} &#8594;
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
