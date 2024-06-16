import React, { useEffect, useState } from 'react';
import styles from './EventPreferences.module.scss';
import { useForm } from 'react-hook-form';
import { updateForm } from '@/store/formSlice';
import { useAppDispatch, useAppSelector } from '@/hook';
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
import { selectEventData } from '@/store/selectors';

const EventPreferencesSchema = z.object({
  ticketType: z.enum(['Standart', 'Economy', 'VIP']),
  dietaryRestrictions: z.string().optional(),
  eventDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
});

type EventPreferencesData = z.infer<typeof EventPreferencesSchema>;

export const EventPreferences: React.FC = () => {
  const initialState = useAppSelector(state => selectEventData(state));
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
  console.log('selectedDate: ', selectedDate);

  useEffect(() => {
    handleDateChange(new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDateChange = (date: Date | null) => {
    const formattedDate = date ? date.toISOString().split('T')[0] : '';
    console.log('formattedDate: ', formattedDate);
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
            <InputLabel id="ticket-type-label">Ticket Type*</InputLabel>
            <Select
              {...register('ticketType')}
              labelId="ticket-type-label"
              label="Ticket Type"
              defaultValue={initialState.ticketType}
              error={!!errors.ticketType}
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
            label="Dietary Restrictions (optional)"
            multiline
            variant="outlined"
            error={!!errors.dietaryRestrictions}
            helperText={errors.dietaryRestrictions?.message}
            fullWidth
          />
        </div>
        <div className={styles.datePickerWrapper}>
          <InputLabel>Event Date*</InputLabel>
          <DatePicker
            showIcon
            toggleCalendarOnIconClick
            selected={selectedDate}
            onChange={selectedDate => handleDateChange(selectedDate)}
            className={errors.eventDate ? styles.datePickerError : undefined}
            aria-invalid={!!errors.eventDate}
          />
          <FormHelperText>
            {errors.eventDate && errors.eventDate.message}
          </FormHelperText>
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
