import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/authContext';


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='' element={<DashboardPage />} />
        </Route>
        <Route path='/' element={<LandingPage />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
