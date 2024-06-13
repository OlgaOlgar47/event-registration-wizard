// src/features/form/PersonalInformation.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setFirstName, setLastName, setEmail, setAge } from '@/store/formSlice';
import { TextField } from '@mui/material';

export const PersonalInformation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { firstName, lastName, email, age } = useSelector(
    (state: RootState) => state.form
  );

  return (
    <form>
      <div>
        <TextField
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={e => dispatch(setFirstName(e.target.value))}
        />
      </div>
      <div>
        <TextField
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={e => dispatch(setLastName(e.target.value))}
        />
      </div>
      <div>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={e => dispatch(setEmail(e.target.value))}
        />
      </div>
      <div>
        <TextField
          label="Age"
          variant="outlined"
          type="number"
          value={age}
          onChange={e => dispatch(setAge(Number(e.target.value)))}
        />
      </div>
    </form>
  );
};
