import React from 'react';
import styles from './Promo.module.scss';

export const Promo: React.FC = () => {
  return (
    <main className={styles.promo}>
      <div className={styles.background}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Event Headline</h1>
        <h3 className={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do&nbsp;eiusmod tempor incididunt ut&nbsp;labore et&nbsp;dolore magna
          aliqua.
        </h3>
        <button className={styles.button}>Call to Action</button>
      </div>
    </main>
  );
};
