import React from 'react';
import styles from './PersonalInformation.module.scss';
import { useForm } from 'react-hook-form';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { ZodFormattedError } from 'zod';

type PersonalInfoData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

interface PersonalInformationProps {
  onChange: (data: Partial<PersonalInfoData>) => void;
  data: PersonalInfoData;
  formErrors: ZodFormattedError<
    {
      firstName: string;
      lastName: string;
      email: string;
      age: number;
      ticketType: 'standard' | 'premium' | 'vip';
      eventDate: string;
      paymentMethod: 'Credit Card' | 'PayPal' | 'Bank Transfer';
      numberOfTickets: number;
      dietaryRestrictions?: string | undefined;
      profilePicture?: File | undefined;
    },
    string
  >;
}

export const PersonalInformation: React.FC<PersonalInformationProps> = ({
  onChange,
  data,
  formErrors,
}) => {
  const { register } = useForm<PersonalInfoData>({
    defaultValues: data,
  });

  return (
    <div className={styles.content}>
      <div className={styles.nameWrapper}>
        <div>
          <TextField
            required
            {...register('firstName')}
            label="First Name"
            variant="outlined"
            error={!!formErrors.firstName}
            helperText={formErrors.firstName?._errors.join(',')}
            onChange={e => onChange({ firstName: e.target.value })}
          />
        </div>
        <div>
          <TextField
            required
            {...register('lastName')}
            error={!!formErrors.lastName}
            helperText={formErrors.lastName?._errors.join(',')}
            label="Last Name"
            variant="outlined"
            onChange={e => onChange({ lastName: e.target.value })}
          />
        </div>
      </div>
      <div>
        <TextField
          required
          {...register('email')}
          error={!!formErrors.email}
          helperText={formErrors.email?._errors.join(',')}
          label="Email"
          variant="outlined"
          fullWidth
          onChange={e => onChange({ email: e.target.value })}
        />
      </div>
      <div>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            {...register('age')}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            value={data.age || 10}
            onChange={e => onChange({ age: Number(e.target.value) })}
          >
            <MenuItem value={10}>16-25</MenuItem>
            <MenuItem value={20}>26-35</MenuItem>
            <MenuItem value={30}>36-99</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
