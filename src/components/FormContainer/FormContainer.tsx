// src/features/form/FormContainer.tsx
import React from 'react';
import styles from './FormContainer.module.scss';

interface FormContainerProps {
  title: string;
  children: React.ReactNode;
  onNext: () => void;
  showNextButton: boolean;
  onBack?: () => void;
  showBackButton?: boolean;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  title,
  children,
  onNext,
  showNextButton,
  onBack,
  showBackButton = true,
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
      <div className={styles.buttonContainer}>
        {showBackButton && (
          <button className={styles.button} onClick={onBack}>
            Back
          </button>
        )}
        {showNextButton && (
          <button className={styles.button} onClick={onNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};
