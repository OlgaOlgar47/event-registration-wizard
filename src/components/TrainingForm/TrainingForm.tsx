import React from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  firstName: string;
}

const TrainingForm: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data));
    console.log('data: ', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        First name:
        <input
          {...register('firstName', {
            required: true,
            minLength: 2,
          })}
        />
      </label>
      <div style={{ height: 40 }}>
        {errors?.firstName && <span>Error</span>}
      </div>
      <input type="submit" />
    </form>
  );
};

export default TrainingForm;
