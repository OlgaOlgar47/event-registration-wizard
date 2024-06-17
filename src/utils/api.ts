import axios from 'axios';
import { FormData } from './formValidation';

export const submitFormData = async (data: FormData) => {
  try {
    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 201) {
      return true;
    } else {
      throw new Error('Failed to submit data');
    }
  } catch (error) {
    console.error('Error submitting data:', error);
    throw error;
  }
};
