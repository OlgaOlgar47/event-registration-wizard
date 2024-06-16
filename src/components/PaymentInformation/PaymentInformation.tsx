import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from '@mui/material';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './PaymentInformation.module.scss';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormWrapper } from '../FormWrapper/FormWrapper';
import { useAppDispatch } from '@/hook';
import { updateForm } from '@/store/formSlice';
// import { FileInput } from '../FileInput/FileInput';

export const PaymentMethodSchema = z.object({
  paymentMethod: z.enum(['Credit Card', 'PayPal', 'Bank Transfer']),
  numberOfTickets: z
    .number()
    .int()
    .min(1, 'Minimum number of tickets is 1')
    .max(10, 'Maximum number of tickets is 10'),
});

// const FileSchema = z.object({
//   profilePicture: z.instanceof(File).optional(),
// });
// type FileData = z.infer<typeof FileSchema>;

type PaymentInformationData = z.infer<typeof PaymentMethodSchema>;

export const PaymentInformation: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PaymentInformationData>({
    resolver: zodResolver(PaymentMethodSchema),
  });

  // const { control } = useForm<FileData>();

  const handleSliderChange = (_event: Event, value: number | number[]) => {
    const numberOfTickets = Array.isArray(value) ? value[0] : value;
    setValue('numberOfTickets', numberOfTickets);
  };

  const onSubmit = (data: PaymentInformationData) => {
    dispatch(updateForm(data));
    console.log('data: ', data);
    navigate('/success');
  };

  return (
    <FormWrapper title="step 3/3: Payment Information">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.content}>
        <div>
          <FormControl fullWidth>
            <InputLabel id="ticket-type-label">Ticket Type</InputLabel>
            <Select
              {...register('paymentMethod')}
              labelId="ticket-type-label"
              label="Ticket Type"
              error={!!errors.paymentMethod}
              fullWidth
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
            Number Of Tickets
          </InputLabel>
          <Controller
            name="numberOfTickets"
            control={control}
            render={({ field }) => (
              <Slider
                {...field}
                aria-label="number Of Tickets"
                defaultValue={1}
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
        {/* <FileInput control={control} name="profilePicture" /> */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit!
        </Button>
      </form>
    </FormWrapper>
  );
};
