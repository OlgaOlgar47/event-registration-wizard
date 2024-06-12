import './App.scss';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Promo } from './pages';

export const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Promo />} />
        </Routes>
      </div>
    </Router>
  );
};
