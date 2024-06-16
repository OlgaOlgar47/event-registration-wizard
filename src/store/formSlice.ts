import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '@/utils/formValidation';

export const initialState: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  age: 16,
  ticketType: 'Standart',
  dietaryRestrictions: '',
  eventDate: '',
  paymentMethod: 'Credit Card',
  numberOfTickets: 1,
  profilePicture: undefined,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Partial<FormData>>) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState,
  },
});

export const { updateForm, resetForm } = formSlice.actions;
export default formSlice.reducer;
