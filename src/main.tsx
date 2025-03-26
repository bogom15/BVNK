import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import AcceptQuote from './pages/AcceptQuote.tsx';
import PayQuote from './pages/PayQuote.tsx';
import Expired from './pages/Expired.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/payin/:uuid" element={<AcceptQuote />} />
        <Route path="/payin/:uuid/pay" element={<PayQuote />} />
        <Route path="/payin/:uuid/expired" element={<Expired />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
