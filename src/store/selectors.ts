import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';

// The selectors are memoized; there will be no re-renders.
export const selectPersonalInfoData = createSelector(
  (state: RootState) => state.form,
  form => ({
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    age: form.age,
  })
);

export const selectEventData = createSelector(
  (state: RootState) => state.form,
  form => ({
    ticketType: form.ticketType,
    dietaryRestrictions: form.dietaryRestrictions,
    eventDate: form.eventDate,
  })
);

export const selectPaymentData = createSelector(
  (state: RootState) => state.form,
  form => ({
    paymentMethod: form.paymentMethod,
    numberOfTickets: form.numberOfTickets,
    profilePicture: form.profilePicture,
  })
);
