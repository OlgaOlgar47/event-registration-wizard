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
import { selectPersonalInfoData } from '@/store/selectors';
import { useTranslation } from 'react-i18next';

export const PersonalInfoSchema = z.object({
  firstName: z.string().min(2, { message: 'First Name is required' }),
  lastName: z.string().min(2, { message: 'Last Name is required' }),
  email: z.string().email('Invalid email address'),
  age: z.number().int().min(16, 'Minimum age is 16'),
});

type PersonalInfoData = z.infer<typeof PersonalInfoSchema>;

export const PersonalInformation: React.FC = () => {
  const initialState = useAppSelector(state => selectPersonalInfoData(state));
  console.log('initialState: ', initialState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
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
    <FormWrapper title={t('step 1/3: Personal Information')}>
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
              label={t('First Name')}
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
              label={t('Last Name')}
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
            label={t('Email')}
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
              label={t('Age')}
              defaultValue={initialState.age || 16}
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
          {t('Next →')}
        </Button>
      </form>
    </FormWrapper>
  );
};
