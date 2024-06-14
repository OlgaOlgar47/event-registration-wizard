import React, { useState } from 'react';
import styles from './EventPreferences.module.scss';
import { useForm } from 'react-hook-form';
import type { FormState } from '@/store/formSlice';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type TicketType = 'VIP' | 'Standard' | 'Economy';

type EventPreferencesData = {
  ticketType: TicketType;
  dietaryRestrictions: string;
  eventDate: string;
};

interface EventPreferencesProps {
  onChange: (data: Partial<FormState>) => void;
  data: EventPreferencesData;
}

export const EventPreferences: React.FC<EventPreferencesProps> = ({
  onChange,
  data,
}) => {
  const {
    register,
    // formState: { errors },
  } = useForm<EventPreferencesData>({
    defaultValues: data,
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleTicketTypeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    onChange({ ticketType: e.target.value as TicketType });
  };

  const handleDietaryRestrictionsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({ dietaryRestrictions: e.target.value });
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    const formattedDate = date ? date.toISOString() : '';
    onChange({ eventDate: formattedDate });
  };

  return (
    <>
      <div className={styles.nameWrapper}>
        <FormControl required sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="ticket-type-label">Ticket Type</InputLabel>
          <Select
            {...register('ticketType')}
            labelId="ticket-type-label"
            label="Ticket Type"
            value={data.ticketType}
            onChange={() => handleTicketTypeChange}
          >
            <MenuItem value="VIP">VIP</MenuItem>
            <MenuItem value="Standard">Standard</MenuItem>
            <MenuItem value="Economy">Economy</MenuItem>
          </Select>
        </FormControl>
        <div>
          <TextField
            {...register('dietaryRestrictions')}
            label="Dietary Restrictions"
            variant="outlined"
            value={data.dietaryRestrictions}
            onChange={handleDietaryRestrictionsChange}
          />
        </div>
      </div>
      <div>
        <div className={styles.datePickerWrapper}>
          <DatePicker
            selected={selectedDate}
            onChange={selectedDate => handleDateChange(selectedDate)}
            inline
          />
        </div>
      </div>
    </>
  );
};
