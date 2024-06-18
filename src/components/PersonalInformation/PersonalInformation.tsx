import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '@/hook';
import { updateForm } from '@/store/formSlice';
import { selectPersonalInfoData } from '@/store/selectors';
import { FormWrapper } from '../../features/FormWrapper/FormWrapper';
import styles from './PersonalInformation.module.scss';

export const PersonalInfoSchema = z.object({
  firstName: z.string().min(2, { message: 'First Name is required' }),
  lastName: z.string().min(2, { message: 'Last Name is required' }),
  email: z.string().email('Invalid email address'),
  age: z.number().int().min(16, 'Minimum age is 16'),
});

type PersonalInfoData = z.infer<typeof PersonalInfoSchema>;

export const PersonalInformation: React.FC = () => {
  const initialState = useAppSelector(state => selectPersonalInfoData(state));
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
    navigate('/step2');
  };

  return (
    <FormWrapper title={t('step1title')}>
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
              label={t('firstName')}
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
              label={t('lastName')}
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
            label={t('email')}
            variant="outlined"
            fullWidth
          />
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{t('age')}</InputLabel>
            <Select
              {...register('age')}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={t('age')}
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
          {t('next')}
        </Button>
      </form>
    </FormWrapper>
  );
};
