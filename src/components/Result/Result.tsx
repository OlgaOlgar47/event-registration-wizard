import React, { useState } from 'react';
import { FormWrapper } from '../../features/FormWrapper/FormWrapper';
import styles from './Result.module.scss';
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useAppSelector } from '@/hook';
import { NavLink } from 'react-router-dom';
import { InsertDriveFile } from '@mui/icons-material';
import Swal from 'sweetalert2';
import Confetti from 'react-confetti';
import { submitFormData } from '@/utils/api';
import { useTranslation } from 'react-i18next';

export const Result: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const form = useAppSelector(state => state.form);
  const entries = Object.entries(form).filter(entry => entry[0] !== 'files');
  const { profilePicture } = form;
  const { t } = useTranslation();

  const onSubmit = async () => {
    try {
      const isSuccess = await submitFormData(form);

      if (isSuccess) {
        Swal.fire('Thank you for registration!', "You're all set", 'success');
        setSuccess(true);
      } else {
        throw new Error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      Swal.fire('Error', 'Failed to submit data', 'error');
    }
  };

  if (success) {
    return <Confetti />;
  }

  return (
    <>
      <FormWrapper title={t('resultTitle')}>
        <div className={styles.tableContainer}>
          <TableContainer
            component={Paper}
            style={{ maxHeight: '60vh', overflow: 'auto' }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('fieldLabel')}</TableCell>
                  <TableCell align="right">{t('valueLabel')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entries.map(entry => (
                  <TableRow key={entry[0]}>
                    <TableCell>{entry[0]}</TableCell>
                    <TableCell align="right">{entry[1]?.toString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {profilePicture && (
            <>
              <p>{t('profilePicLabel')}</p>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <InsertDriveFile />
                  </ListItemIcon>
                  <ListItemText
                    primary={profilePicture.name}
                    secondary={profilePicture.size.toString()}
                  />
                </ListItem>
              </List>
            </>
          )}
          <div className={styles.buttonsContainer}>
            <Button
              onClick={onSubmit}
              variant="contained"
              color="primary"
              fullWidth
            >
              {t('submitButton')}
            </Button>
            <NavLink className={styles.link} to="/">
              {t('startOverLink')}
            </NavLink>
          </div>
        </div>
      </FormWrapper>
    </>
  );
};
