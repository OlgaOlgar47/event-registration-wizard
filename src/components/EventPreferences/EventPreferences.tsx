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

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    const formattedDate = date ? date.toISOString() : '';
    onChange({ eventDate: formattedDate });
  };

  console.log('data', data);

  return (
    <div className={styles.content}>
      <div>
        <FormControl fullWidth>
          <InputLabel id="ticket-type-label">Ticket Type</InputLabel>
          <Select
            {...register('ticketType')}
            labelId="ticket-type-label"
            label="Ticket Type"
            value={data.ticketType}
            onChange={e =>
              onChange({ ticketType: e.target.value as TicketType })
            }
            fullWidth
          >
            <MenuItem value="VIP">VIP</MenuItem>
            <MenuItem value="Standard">Standard</MenuItem>
            <MenuItem value="Economy">Economy</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          {...register('dietaryRestrictions')}
          label="Dietary Restrictions"
          multiline
          variant="outlined"
          value={data.dietaryRestrictions}
          onChange={e => onChange({ dietaryRestrictions: e.target.value })}
          fullWidth
        />
      </div>
      <div className={styles.datePickerWrapper}>
        <InputLabel>Event Date</InputLabel>
        <DatePicker
          showIcon
          toggleCalendarOnIconClick
          selected={selectedDate}
          onChange={selectedDate => handleDateChange(selectedDate)}
        />
      </div>
    </div>
  );
};
