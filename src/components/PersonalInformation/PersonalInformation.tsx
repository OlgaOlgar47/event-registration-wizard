// src/features/form/PersonalInformation.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setFirstName, setLastName, setEmail, setAge } from '@/store/formSlice';

export const PersonalInformation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { firstName, lastName, email, age } = useSelector(
    (state: RootState) => state.form
  );

  return (
    <form>
      <div>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={e => dispatch(setFirstName(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={e => dispatch(setLastName(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => dispatch(setEmail(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={e => dispatch(setAge(Number(e.target.value)))}
          />
        </label>
      </div>
    </form>
  );
};
