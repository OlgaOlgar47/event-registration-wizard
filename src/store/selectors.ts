import { RootState } from '@/store';

export const selectFormData = (state: RootState) => ({
  firstName: state.form.firstName,
  lastName: state.form.lastName,
  email: state.form.email,
});
