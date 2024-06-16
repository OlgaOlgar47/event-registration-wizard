import { InsertDriveFile, PhotoCamera } from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import React from 'react';
import Dropzone from 'react-dropzone';
import { Controller, Control, Path, FieldValues } from 'react-hook-form';

export type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>;

interface FormData {
  someField: string;
  file: File[];
}

interface FileInputProps {
  control: Control<FormData>;
  name: keyof FormData;
}

export const FileInput: React.FC<FileInputProps> = ({ control, name }) => {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        defaultValue={[]}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Dropzone onDrop={acceptedFiles => onChange(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <Paper variant="outlined" {...getRootProps()}>
                  <PhotoCamera />
                  <input {...getInputProps()} name={name} onBlur={onBlur} />
                  <p>Перетащите файл сюда или нажмите, чтобы выбрать файл</p>
                </Paper>
              )}
            </Dropzone>
            {Array.isArray(value) && (
              <List>
                {value.map((file, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <InsertDriveFile />
                    </ListItemIcon>
                    <ListItemText
                      primary={file.name}
                      secondary={`${file.size} bytes`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </>
        )}
      />
    </div>
  );
};
