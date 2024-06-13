import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  ticketType: 'VIP' | 'Standard' | 'Economy';
  dietaryRestrictions: string;
  eventDate: string;
  paymentMethod: 'Credit Card' | 'PayPal' | 'Bank Transfer';
  numberOfTickets: number;
  profilePicture: File | null;
}

const initialState: FormState = {
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
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setAge: (state, action: PayloadAction<number>) => {
      state.age = action.payload;
    },
    setTicketType: (
      state,
      action: PayloadAction<'VIP' | 'Standard' | 'Economy'>
    ) => {
      state.ticketType = action.payload;
    },
    setDietaryRestrictions: (state, action: PayloadAction<string>) => {
      state.dietaryRestrictions = action.payload;
    },
    setEventDate: (state, action: PayloadAction<string>) => {
      state.eventDate = action.payload;
    },
    setPaymentMethod: (
      state,
      action: PayloadAction<'Credit Card' | 'PayPal' | 'Bank Transfer'>
    ) => {
      state.paymentMethod = action.payload;
    },
    setNumberOfTickets: (state, action: PayloadAction<number>) => {
      state.numberOfTickets = action.payload;
    },
    setProfilePicture: (state, action: PayloadAction<File | null>) => {
      state.profilePicture = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const {
  setFirstName,
  setLastName,
  setEmail,
  setAge,
  setTicketType,
  setDietaryRestrictions,
  setEventDate,
  setPaymentMethod,
  setNumberOfTickets,
  setProfilePicture,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
