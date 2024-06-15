import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from '@mui/material';
import React, { useState } from 'react';
import type { FormState, PaymentMethod } from '@/store/formSlice';
import { useForm } from 'react-hook-form';
import { PhotoCamera } from '@mui/icons-material';
import styles from './PaymentInformation.module.scss';

type PaymentInformationData = {
  paymentMethod: PaymentMethod;
  numberOfTickets: number;
  profilePicture: File | null;
};

interface PaymentInformationProps {
  onChange: (data: Partial<FormState>) => void;
  data: PaymentInformationData;
}

export const PaymentInformation: React.FC<PaymentInformationProps> = ({
  onChange,
  data,
}) => {
  const { register } = useForm<PaymentInformationData>({
    defaultValues: data,
  });

  const [fileUploaded, setFileUploaded] = useState<boolean>(false);

  const handleSliderChange = (_event: Event, value: number | number[]) => {
    const numberOfTickets = Array.isArray(value) ? value[0] : value;
    onChange({ numberOfTickets: numberOfTickets });
  };

  console.log('data', data);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    onChange({ profilePicture: file });
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

  return (
    <form>
      <div>
        <FormControl fullWidth>
          <InputLabel id="ticket-type-label">Ticket Type</InputLabel>
          <Select
            {...register('paymentMethod')}
            labelId="ticket-type-label"
            label="Ticket Type"
            value={data.paymentMethod}
            onChange={e =>
              onChange({ paymentMethod: e.target.value as PaymentMethod })
            }
            fullWidth
          >
            <MenuItem value="Credit Card">Credit Card</MenuItem>
            <MenuItem value="PayPal">PayPal</MenuItem>
            <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <InputLabel id="number-Of-Tickets">Number Of Tickets</InputLabel>
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
  );
};
