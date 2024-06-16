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
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

export const Result: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const form = useAppSelector(state => state.form);
  const { width, height } = useWindowSize();
  console.log('form: ', form);
  const entries = Object.entries(form).filter(entry => entry[0] !== 'files');
  const { profilePicture } = form;

  const onSubmit = (data: FormData) => {
    console.log('data: ', data);
    Swal.fire('Thank you for registration!', "You're all set", 'success');
    setSuccess(true);
  };

  if (success) {
    return <Confetti width={width} height={height} />;
  }

  return (
    <>
      <FormWrapper title="Result">
        <TableContainer component={Paper}>
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
        <Button
          type="button"
          onClick={onSubmit}
          variant="contained"
          color="primary"
          fullWidth
        >
          Submit!
        </Button>
        <NavLink className={styles.link} to="/">
          &#8592; Start Over
        </NavLink>
      </FormWrapper>
      {success && <Confetti />}
    </>
  );
};
