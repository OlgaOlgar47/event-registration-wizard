import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PhotoCamera } from '@mui/icons-material';
import styles from './PaymentInformation.module.scss';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormWrapper } from '../FormWrapper/FormWrapper';

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

const initialState: PaymentInformationData = {
  paymentMethod: 'Credit Card',
  numberOfTickets: 1,
  profilePicture: undefined,
};

export const PaymentInformation: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentInformationData>({
    mode: 'onBlur',
    resolver: zodResolver(PaymentMethodSchema),
    defaultValues: initialState,
  });

  const [fileUploaded, setFileUploaded] = useState<boolean>(false);

  const handleSliderChange = (_event: Event, value: number | number[]) => {
    const numberOfTickets = Array.isArray(value) ? value[0] : value;
    console.log('numberOfTickets: ', numberOfTickets);
    // onChange({ numberOfTickets: numberOfTickets });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined;
    // onChange({ profilePicture: file });
    setFileUploaded(true);
    console.log('Uploaded file:', file);
  };

  const handleHiddenFileInputClick = () => {
    // При клике на скрытый input type="file" вызывается файловый диалог
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const onSubmit = (data: PaymentInformationData) => {
    console.log('data: ', data);
    navigate('/step4');
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
              // onChange={e =>
              //   onChange({ paymentMethod: e.target.value as PaymentMethod })
              // }
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
          <Slider
            aria-label="number Of Tickets"
            defaultValue={1}
            valueLabelDisplay="on"
            shiftStep={2}
            step={1}
            marks
            min={1}
            max={10}
            onChange={(event, value) => handleSliderChange(event, value)}
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<PhotoCamera />}
            onClick={handleHiddenFileInputClick}
          >
            Upload Profile Picture
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileInputChange}
          />
          {fileUploaded && (
            <p className={styles.message}>File uploaded successfully!</p>
          )}
        </div>
      </form>
    </FormWrapper>
  );
};
