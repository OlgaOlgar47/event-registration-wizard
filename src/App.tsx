import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from '@/components';
import {
  EventPreferences,
  PaymentInformation,
  PersonalInformation,
} from '@/components';
import { Result } from '@/components';
import { LanguageSelector } from '@/features';

export const App: React.FC = () => {
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
