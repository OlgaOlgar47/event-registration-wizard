import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSelector.module.scss';
import {
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value as string);
  };

  return (
    <div className={styles.languageSelector}>
      <FormControl
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            fontWeight: 'bold',
          },
        }}
      >
        <Select
          labelId="language-select-label"
          id="language-select"
          value={i18n.language}
          onChange={e => changeLanguage(e)}
          label="Language"
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ru">Russian</MenuItem>
          <MenuItem value="fr">French</MenuItem>
          <MenuItem value="de">German</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};