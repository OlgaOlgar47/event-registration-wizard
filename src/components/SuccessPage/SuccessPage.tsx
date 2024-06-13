// src/features/form/SuccessPage.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { resetForm } from '@/store/formSlice';

export const SuccessPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.form);

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('age', formData.age.toString());
      formDataToSend.append('ticketType', formData.ticketType);
      formDataToSend.append(
        'dietaryRestrictions',
        formData.dietaryRestrictions
      );
      formDataToSend.append('eventDate', formData.eventDate);
      formDataToSend.append('paymentMethod', formData.paymentMethod);
      formDataToSend.append(
        'numberOfTickets',
        formData.numberOfTickets.toString()
      );
      if (formData.profilePicture) {
        formDataToSend.append('profilePicture', formData.profilePicture);
      }

      const response = await fetch('http://localhost:3001', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      console.log('Form submitted successfully');
      dispatch(resetForm());
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <p>Your form has been successfully submitted!</p>
      <button onClick={handleSubmit}>Submit Data</button>
    </div>
  );
};
