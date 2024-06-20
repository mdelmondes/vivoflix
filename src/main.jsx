import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './contexts/Auth/AuthContext';

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>        
        <App />       
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
