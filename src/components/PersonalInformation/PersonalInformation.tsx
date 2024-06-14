import React from 'react';
import styles from './PersonalInformation.module.scss';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';

type PersonalInfoData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

interface PersonalInformationProps {
  onChange: (data: Partial<PersonalInfoData>) => void;
  data: PersonalInfoData;
}

export const PersonalInformation: React.FC<PersonalInformationProps> = ({
  onChange,
  data,
}) => {
  const {
    register,
    formState: { errors },
  } = useForm<PersonalInfoData>({
    defaultValues: data,
  });

  return (
    <>
      <div className={styles.nameWrapper}>
        <div>
          <TextField
            required
            {...register('firstName')}
            label="First Name"
            variant="outlined"
            error={!!errors.firstName}
            onChange={e => onChange({ firstName: e.target.value })}
          />
        </div>
        <div>
          <TextField
            {...register('lastName')}
            label="Last Name"
            variant="outlined"
            onChange={e => onChange({ lastName: e.target.value })}
          />
        </div>
      </div>
      <div>
        <TextField
          {...register('email')}
          label="Email"
          variant="outlined"
          fullWidth
          onChange={e => onChange({ email: e.target.value })}
        />
      </div>
      <div>
        <TextField
          {...register('age')}
          label="Age"
          type="number"
          variant="outlined"
          fullWidth
          onChange={e => onChange({ age: Number(e.target.value) })}
        />
      </div>
    </>
  );
};
