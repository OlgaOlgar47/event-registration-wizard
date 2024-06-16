import React from 'react';
import styles from './PersonalInformation.module.scss';
import { useForm } from 'react-hook-form';
import { updateForm } from '@/store/formSlice';
import { useAppDispatch, useAppSelector } from '@/hook';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { FormWrapper } from '../FormWrapper/FormWrapper';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { selectFormData } from '@/store/selectors';

export const PersonalInfoSchema = z.object({
  firstName: z.string().min(2, { message: 'First Name is required' }),
  lastName: z.string().min(2, { message: 'Last Name is required' }),
  email: z.string().email('Invalid email address'),
  age: z.number().int().min(16, 'Minimum age is 16'),
});

type PersonalInfoData = z.infer<typeof PersonalInfoSchema>;

// const initialState: PersonalInfoData = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   age: 16,
// };

export const PersonalInformation: React.FC = () => {
  const initialState = useAppSelector(state => selectFormData(state));
  console.log('initialState: ', initialState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoData>({
    mode: 'onBlur',
    defaultValues: initialState,
    resolver: zodResolver(PersonalInfoSchema),
  });

  const onSubmit = (data: PersonalInfoData) => {
    dispatch(updateForm(data));
    console.log(data);
    navigate('/step2', { replace: true });
  };

  return (
    <FormWrapper title="step 1/3: Personal Information">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={styles.content}
      >
        <div className={styles.nameWrapper}>
          <div>
            <TextField
              required
              {...register('firstName')}
              label="First Name"
              variant="outlined"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </div>
          <div>
            <TextField
              required
              {...register('lastName')}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              label="Last Name"
              variant="outlined"
            />
          </div>
        </div>
        <div>
          <TextField
            required
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            label="Email"
            variant="outlined"
            fullWidth
          />
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              {...register('age')}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              error={!!errors.age?.message}
            >
              <MenuItem value={16}>16-25</MenuItem>
              <MenuItem value={26}>26-35</MenuItem>
              <MenuItem value={36}>36-99</MenuItem>
            </Select>
            <FormHelperText>{errors.age?.message}</FormHelperText>
          </FormControl>
        </div>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Next &#8594;
        </Button>
      </form>
    </FormWrapper>
  );
};
