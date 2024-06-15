import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from '@mui/material';
import React from 'react';
import type { FormState, PaymentMethod } from '@/store/formSlice';
import { useForm } from 'react-hook-form';

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
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     dispatch(setProfilePicture(e.target.files[0]));
  //   }
  // };

  const {
    register,
    // formState: { errors },
  } = useForm<PaymentInformationData>({
    defaultValues: data,
  });

  // const handleSliderChange = (event: Event, value: number) => {
  //   onChange({ numberOfTickets: value });
  // };

  const handleSliderChange = (_event: Event, value: number | number[]) => {
    const numberOfTickets = Array.isArray(value) ? value[0] : value;
    onChange({ numberOfTickets: numberOfTickets });
  };

  console.log('data', data);

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
      {/* <div>
        <label>
          Profile Picture:
          <input type="file" onChange={handleFileChange} />
        </label>
      </div> */}
    </form>
  );
};
