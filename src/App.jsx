import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/authContext';
import OAuth2Callback from './components/OAuth2Callback';
import UserDashboardPage from './pages/UserDashBoardPage';


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/oauth2/callback' element={<OAuth2Callback />} />
        <Route path='/dashboard-admin' element={<PrivateRoute />}>
          <Route path='/dashboard-admin' element={<AdminDashboardPage />} />
        </Route>
        <Route path='/dashboard-user' element={<PrivateRoute />}>
          <Route path='/dashboard-user' element={<UserDashboardPage />} />
        </Route>

        <Route path='/' element={<LandingPage />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
