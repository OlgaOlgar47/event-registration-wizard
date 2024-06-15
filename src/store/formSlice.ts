import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TicketType = 'VIP' | 'Standard' | 'Economy';
export type PaymentMethod = 'Credit Card' | 'PayPal' | 'Bank Transfer';

export interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  ticketType: TicketType;
  dietaryRestrictions: string;
  eventDate: string;
  paymentMethod: PaymentMethod;
  numberOfTickets: number;
  profilePicture: File | null;
}

export const initialState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  age: 0,
  ticketType: 'Standard',
  dietaryRestrictions: '',
  eventDate: '',
  paymentMethod: 'Credit Card',
  numberOfTickets: 1,
  profilePicture: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState,
  },
});

export const { updateForm, resetForm } = formSlice.actions;
export default formSlice.reducer;
