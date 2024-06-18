import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Main,
  EventPreferences,
  PaymentInformation,
  PersonalInformation,
  Result,
} from '@/components';
import { LanguageSelector } from '@/features';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <LanguageSelector />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/step1" element={<PersonalInformation />} />
          <Route path="/step2" element={<EventPreferences />} />
          <Route path="/step3" element={<PaymentInformation />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </>
  );
};
