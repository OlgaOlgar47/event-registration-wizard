import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Slider,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './PaymentInformation.module.scss';
import { z } from 'zod';
import { NavLink, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormWrapper } from '../../features/FormWrapper/FormWrapper';
import { useAppDispatch, useAppSelector } from '@/hook';
import { updateForm } from '@/store/formSlice';
import { useDropzone } from 'react-dropzone';
import { selectPaymentData } from '@/store/selectors';
import { useTranslation } from 'react-i18next';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import avatar from '@/assets/icon/avatar.svg';

export const PaymentMethodSchema = z.object({
  paymentMethod: z.enum(['Credit Card', 'PayPal', 'Bank Transfer']),
  numberOfTickets: z
    .number()
    .int()
    .min(1, 'Minimum number of tickets is 1')
    .max(10, 'Maximum number of tickets is 10'),
  profilePicture: z.instanceof(File).optional(),
});

type PaymentInformationData = z.infer<typeof PaymentMethodSchema>;

export const PaymentInformation: React.FC = () => {
  const initialState = useAppSelector(state => selectPaymentData(state));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const { t } = useTranslation();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PaymentInformationData>({
    mode: 'onBlur',
    defaultValues: initialState,
    resolver: zodResolver(PaymentMethodSchema),
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFile(acceptedFiles[0]);
      setValue('profilePicture', acceptedFiles[0]);
    },
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleUpload = () => {
    const total = 100;
    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= total) {
        clearInterval(interval);
        setUploadComplete(true);
      }
    }, 500);
  };
  useEffect(() => {
    if (file) handleUpload();
  }, [file]);

  const handleSliderChange = (_event: Event, value: number | number[]) => {
    const numberOfTickets = Array.isArray(value) ? value[0] : value;
    setValue('numberOfTickets', numberOfTickets);
  };

  const onSubmit = (data: PaymentInformationData) => {
    dispatch(updateForm(data));
    navigate('/result');
  };

  return (
    <FormWrapper title={t('step3title')}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.content}>
        <div>
          <FormControl fullWidth>
            <InputLabel id="paymentMethod-label">
              {t('paymentMethod')}
            </InputLabel>
            <Select
              {...register('paymentMethod')}
              labelId="payment-method-label"
              label="payment-method"
              error={!!errors.paymentMethod}
              fullWidth
              defaultValue={initialState.paymentMethod}
            >
              <MenuItem value="Credit Card">{t('creditCard')}</MenuItem>
              <MenuItem value="PayPal">{t('PayPal')}</MenuItem>
              <MenuItem value="Bank Transfer">{t('bankTransfer')}</MenuItem>
            </Select>
            <FormHelperText>{errors.paymentMethod?.message}</FormHelperText>
          </FormControl>
        </div>
        <div>
          <InputLabel className={styles.label} id="number-Of-Tickets">
            {t('numberOfTicketsLabel')}
          </InputLabel>
          <Controller
            name="numberOfTickets"
            control={control}
            render={({ field }) => (
              <Slider
                {...field}
                aria-label={t('numberOfTicketsLabel')}
                defaultValue={initialState.numberOfTickets}
                valueLabelDisplay="on"
                step={1}
                marks
                min={1}
                max={10}
                onChange={(event, value) => handleSliderChange(event, value)}
              />
            )}
          />
          <FormHelperText>{t('numberOfTicketsHelperText')}</FormHelperText>
        </div>
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed #cccccc',
            borderRadius: '4px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          <input {...getInputProps()} />
          {!file ? (
            <>
              <InsertDriveFileIcon
                sx={{ fontSize: 40, color: '#1A202C', mb: 1 }}
              />
              <Typography variant="body1">
                Drag n Drop here Or Browse
              </Typography>
            </>
          ) : !uploadComplete ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ImageIcon sx={{ mr: 1 }} />
                <Typography variant="body2" noWrap>
                  {file.name}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={uploadProgress}
                sx={{ mt: 1, height: 25, borderRadius: 1 }}
              />
              <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                {`${Math.round(uploadProgress)} %`}
              </Typography>
            </>
          ) : (
            <Box
              sx={{ display: 'flex', alignItems: 'center', marginLeft: '90px' }}
            >
              <img src={avatar} alt="avatar pic" />
              <Typography variant="body2" noWrap sx={{ marginLeft: '10px' }}>
                {file.name}
              </Typography>
            </Box>
          )}
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {t('next')}
        </Button>
        <NavLink to="/step2">
          <Button type="button" variant="outlined" color="primary" fullWidth>
            {t('back')}
          </Button>
        </NavLink>
      </form>
    </FormWrapper>
  );
};
