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
    <FormWrapper title="step 3/3: Payment Information">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.content}>
        <div>
          <FormControl fullWidth>
            <InputLabel id="ticket-type-label">Ticket Type*</InputLabel>
            <Select
              {...register('paymentMethod')}
              labelId="ticket-type-label"
              label="Ticket Type"
              error={!!errors.paymentMethod}
              fullWidth
              defaultValue={initialState.paymentMethod}
            >
              <MenuItem value="Credit Card">Credit Card</MenuItem>
              <MenuItem value="PayPal">PayPal</MenuItem>
              <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
            </Select>
            <FormHelperText>{errors.paymentMethod?.message}</FormHelperText>
          </FormControl>
        </div>
        <div>
          <InputLabel className={styles.label} id="number-Of-Tickets">
            Number Of Tickets*
          </InputLabel>
          <Controller
            name="numberOfTickets"
            control={control}
            render={({ field }) => (
              <Slider
                {...field}
                aria-label="number Of Tickets"
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
            {file ? 'file is added' : 'drag file'}
          </Typography>
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit!
        </Button>
        <NavLink to="/step2">
          <Button type="button" variant="outlined" color="primary" fullWidth>
            &#8592; Back
          </Button>
        </NavLink>
      </form>
    </FormWrapper>
  );
};
