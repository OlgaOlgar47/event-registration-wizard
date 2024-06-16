import React, { useState } from 'react';
import styles from './EventPreferences.module.scss';
import { useForm } from 'react-hook-form';
import { updateForm } from '@/store/formSlice';
import { useAppDispatch } from '@/hook';
import { z } from 'zod';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormWrapper } from '../FormWrapper/FormWrapper';
import { NavLink, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

const EventPreferencesSchema = z.object({
  ticketType: z.enum(['Standart', 'Economy', 'VIP']),
  dietaryRestrictions: z.string().optional(),
  eventDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
});

type EventPreferencesData = z.infer<typeof EventPreferencesSchema>;

const initialState: EventPreferencesData = {
  ticketType: 'VIP',
  dietaryRestrictions: '',
  eventDate: '',
};

export const EventPreferences: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EventPreferencesData>({
    mode: 'onBlur',
    resolver: zodResolver(EventPreferencesSchema),
    defaultValues: initialState,
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    const formattedDate = date ? date.toISOString().split('T')[0] : '';
    setValue('eventDate', formattedDate);
    setSelectedDate(date);
  };

  const onSubmit = (data: EventPreferencesData) => {
    dispatch(updateForm(data));
    console.log('data: ', data);
    navigate('/step3', { replace: true });
  };

  console.log('errors: ', errors);

  return (
    <FormWrapper title="step 2/3: Event Preferences">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={styles.content}
      >
        <div>
          <FormControl fullWidth>
            <InputLabel id="ticket-type-label">Ticket Type</InputLabel>
            <Select
              {...register('ticketType')}
              labelId="ticket-type-label"
              label="Ticket Type"
              error={!!errors.ticketType}
              // onChange={e =>
              //   onChange({ ticketType: e.target.value as TicketType })
              // }
              fullWidth
            >
              <MenuItem value="VIP">VIP</MenuItem>
              <MenuItem value="Standart">Standard</MenuItem>
              <MenuItem value="Economy">Economy</MenuItem>
            </Select>
            <FormHelperText>{errors.ticketType?.message}</FormHelperText>
          </FormControl>
        </div>
        <div>
          <TextField
            {...register('dietaryRestrictions')}
            label="Dietary Restrictions"
            multiline
            variant="outlined"
            error={!!errors.dietaryRestrictions}
            helperText={errors.dietaryRestrictions?.message}
            // onChange={e => onChange({ dietaryRestrictions: e.target.value })}
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
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Next &#8594;
        </Button>
        <NavLink to="/step1">
          <Button type="button" variant="outlined" color="primary" fullWidth>
            &#8592; Back
          </Button>
        </NavLink>
      </form>
    </FormWrapper>
  );
};
