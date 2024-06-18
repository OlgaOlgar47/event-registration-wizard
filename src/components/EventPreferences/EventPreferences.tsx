import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '@/hook';
import { updateForm } from '@/store/formSlice';
import { selectEventData } from '@/store/selectors';
import { FormWrapper } from '../../features/FormWrapper/FormWrapper';
import styles from './EventPreferences.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

const EventPreferencesSchema = z.object({
  ticketType: z.enum(['Standard', 'Economy', 'VIP']),
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
  const { t } = useTranslation();
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

  useEffect(() => {
    handleDateChange(new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDateChange = (date: Date | null) => {
    const formattedDate = date ? date.toISOString().split('T')[0] : '';
    setValue('eventDate', formattedDate);
    setSelectedDate(date);
  };

  const onSubmit = (data: EventPreferencesData) => {
    dispatch(updateForm(data));
    navigate('/step3', { replace: true });
  };

  return (
    <FormWrapper title={t('step2title')}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={styles.content}
      >
        <div>
          <FormControl fullWidth>
            <InputLabel id="ticket-type-label">
              {t('ticketTypeLabel')}
            </InputLabel>
            <Select
              {...register('ticketType')}
              labelId="ticket-type-label"
              label="Ticket Type"
              defaultValue={initialState.ticketType}
              error={!!errors.ticketType}
              fullWidth
            >
              <MenuItem value="VIP">{t('vip')}</MenuItem>
              <MenuItem value="Standard">{t('standard')}</MenuItem>
              <MenuItem value="Economy">{t('economy')}</MenuItem>
            </Select>
            <FormHelperText>{errors.ticketType?.message}</FormHelperText>
          </FormControl>
        </div>
        <div>
          <TextField
            {...register('dietaryRestrictions')}
            label={t('dietaryRestrictionsLabel')}
            multiline
            variant="outlined"
            error={!!errors.dietaryRestrictions}
            helperText={errors.dietaryRestrictions?.message}
            fullWidth
          />
        </div>
        <div className={styles.datePickerWrapper}>
          <InputLabel>{t('eventDateLabel')}</InputLabel>
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
          {t('next')}
        </Button>
        <NavLink to="/step1">
          <Button type="button" variant="outlined" color="primary" fullWidth>
            {t('back')}
          </Button>
        </NavLink>
      </form>
    </FormWrapper>
  );
};
