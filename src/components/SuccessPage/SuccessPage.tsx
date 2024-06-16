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
      // formDataToSend.append('formData', formData);

      if (formData.profilePicture) {
        formDataToSend.append('profilePicture', formData.profilePicture);
      }

      console.log('formDataToSend: ', formDataToSend);

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
