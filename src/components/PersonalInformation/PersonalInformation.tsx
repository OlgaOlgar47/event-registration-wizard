// src/features/form/PersonalInformation.tsx
import React from 'react';
import styles from './PersonalInformation.module.scss';

import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setFirstName, setLastName, setEmail, setAge } from '@/store/formSlice';
import { TextField } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface PersonalInfoData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Email is required'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .required('Age is required')
    .positive('Age must be positive')
    .integer('Age must be an integer'),
});

export const PersonalInformation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { firstName, lastName, email, age } = useSelector(
    (state: RootState) => state.form
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { firstName, lastName, email, age },
  });

  console.log('errors: ', errors);

  const onSubmit = (data: PersonalInfoData) => {
    console.log('Form data:', data);
    dispatch(setFirstName(data.firstName));
    dispatch(setLastName(data.lastName));
    dispatch(setEmail(data.email));
    dispatch(setAge(data.age));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.wrapper}>
        <div>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="First Name"
                variant="outlined"
                error={!!errors.firstName}
                helperText={errors.firstName ? errors.firstName.message : ''}
                onChange={e => {
                  console.log('dsds');
                  field.onChange(e);
                  dispatch(setFirstName(e.target.value));
                }}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Last Name"
                variant="outlined"
                error={!!errors.lastName}
                helperText={errors.lastName ? errors.lastName.message : ''}
                onChange={e => {
                  field.onChange(e);
                  dispatch(setLastName(e.target.value));
                }}
              />
            )}
          />
        </div>
      </div>
      <div>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              onChange={e => {
                field.onChange(e);
                dispatch(setEmail(e.target.value));
              }}
            />
          )}
        />
      </div>
      <div>
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              fullWidth
              label="Age"
              variant="outlined"
              type="number"
              error={!!errors.age}
              helperText={errors.age ? errors.age.message : ''}
              onChange={e => {
                field.onChange(e);
                dispatch(setAge(Number(e.target.value)));
              }}
            />
          )}
        />
      </div>
    </form>
  );
};
