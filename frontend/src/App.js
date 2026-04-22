import React from 'react';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const AppContent = () => {
  const { token } = useAuth();
  const [showRegister, setShowRegister] = React.useState(false);

  if (token) return <Dashboard />;

  return showRegister
    ? <Register onSwitch={() => setShowRegister(false)} />
    : <Login onSwitch={() => setShowRegister(true)} />;
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;