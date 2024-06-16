import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './pages/Main';
import {
  EventPreferences,
  PaymentInformation,
  PersonalInformation,
  SuccessPage,
} from './components';
import { Result } from './components/Result/Result';

export const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/step1" element={<PersonalInformation />} />
          <Route path="/step2" element={<EventPreferences />} />
          <Route path="/step3" element={<PaymentInformation />} />
          <Route path="/result" element={<Result />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router>
    </>
  );
};
