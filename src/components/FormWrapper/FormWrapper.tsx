import React from 'react';
import styles from './FormWrapper.module.scss';

interface FormWrapperProps {
  title: string;
  children: React.ReactNode;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  title,
  children,
}) => {
  return (
    <div className={styles.formOverlay}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </div>
    </div>
  );
};
