import React, { useState } from 'react';
import { FormWrapper } from '../FormWrapper/FormWrapper';
import styles from './Result.module.scss';
import { FormData } from '@/utils/formValidation';
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
import axios from 'axios';

export const Result: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const form = useAppSelector(state => state.form);
  const entries = Object.entries(form).filter(entry => entry[0] !== 'files');
  const { profilePicture } = form;

  const onSubmit = async (data: FormData) => {
    console.log('data: ', data);
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        data
      );

      if (response.status === 201) {
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
      <FormWrapper title="Result">
        <div className={styles.tableContainer}>
          <TableContainer
            component={Paper}
            style={{ maxHeight: '60vh', overflow: 'auto' }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Field</TableCell>
                  <TableCell align="right">Value</TableCell>
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
              <p>ProfilePic</p>
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
              onClick={() => onSubmit(form)}
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit!
            </Button>
            <NavLink className={styles.link} to="/">
              &#8592; Start Over
            </NavLink>
          </div>
        </div>
      </FormWrapper>
    </>
  );
};
