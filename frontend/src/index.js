import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PatientsContextProvider } from './context/PatientsContext';
import { AuthContextProvider } from './context/AuthContext'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PatientsContextProvider>
        <App />
      </PatientsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)