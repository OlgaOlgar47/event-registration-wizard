import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './PaymentInformation.module.scss';
import { z } from 'zod';
import { NavLink, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormWrapper } from '../FormWrapper/FormWrapper';
import { useAppDispatch, useAppSelector } from '@/hook';
import { updateForm } from '@/store/formSlice';
import { useDropzone } from 'react-dropzone';
import { selectPaymentData } from '@/store/selectors';
import { useTranslation } from 'react-i18next';

export const PaymentMethodSchema = z.object({
  paymentMethod: z.enum(['Credit Card', 'PayPal', 'Bank Transfer']),
  numberOfTickets: z
    .number()
    .int()
    .min(1, 'Minimum number of tickets is 1')
    .max(10, 'Maximum number of tickets is 10'),
  profilePicture: z.instanceof(File).optional(),
});

type PaymentInformationData = z.infer<typeof PaymentMethodSchema>;

export const PaymentInformation: React.FC = () => {
  const initialState = useAppSelector(state => selectPaymentData(state));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const { t } = useTranslation();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PaymentInformationData>({
    mode: 'onBlur',
    defaultValues: initialState,
    resolver: zodResolver(PaymentMethodSchema),
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      console.log(acceptedFiles);
      setFile(acceptedFiles[0]);
      setValue('profilePicture', acceptedFiles[0]);
    },
  });

  const handleSliderChange = (_event: Event, value: number | number[]) => {
    const numberOfTickets = Array.isArray(value) ? value[0] : value;
    setValue('numberOfTickets', numberOfTickets);
  };

  const onSubmit = (data: PaymentInformationData) => {
    dispatch(updateForm(data));
    navigate('/result');
  };

  return (
    <FormWrapper title={t('step3title')}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.content}>
        <div>
          <FormControl fullWidth>
            <InputLabel id="paymentMethod-label">
              {t('paymentMethod')}
            </InputLabel>
            <Select
              {...register('paymentMethod')}
              labelId="payment-method-label"
              label="payment-method"
              error={!!errors.paymentMethod}
              fullWidth
              defaultValue={initialState.paymentMethod}
            >
              <MenuItem value="Credit Card">{t('creditCard')}</MenuItem>
              <MenuItem value="PayPal">{t('PayPal')}</MenuItem>
              <MenuItem value="Bank Transfer">{t('bankTransfer')}</MenuItem>
            </Select>
            <FormHelperText>{errors.paymentMethod?.message}</FormHelperText>
          </FormControl>
        </div>
        <div>
          <InputLabel className={styles.label} id="number-Of-Tickets">
            {t('numberOfTicketsLabel')}
          </InputLabel>
          <Controller
            name="numberOfTickets"
            control={control}
            render={({ field }) => (
              <Slider
                {...field}
                aria-label={t('numberOfTicketsLabel')}
                defaultValue={initialState.numberOfTickets}
                valueLabelDisplay="on"
                step={1}
                marks
                min={1}
                max={10}
                onChange={(event, value) => handleSliderChange(event, value)}
              />
            )}
          />
          <FormHelperText>{t('numberOfTicketsHelperText')}</FormHelperText>
        </div>
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed #cccccc',
            borderRadius: '4px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          <input {...getInputProps()} />
          <Typography variant="body1">
            {file ? t('fileAdded') : t('fileInputHelperText')}
          </Typography>
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {t('submitButton')}
        </Button>
        <NavLink to="/step2">
          <Button type="button" variant="outlined" color="primary" fullWidth>
            {t('back')}
          </Button>
        </NavLink>
      </form>
    </FormWrapper>
  );
};
