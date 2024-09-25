// src/components/OAuth2Callback.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const OAuth2Callback = () => {
  const location = useLocation();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('https://athlex.pro/oauth2/callback', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();

        if (response.ok) {
          const token = data.token;
          localStorage.setItem('token', token);

          window.location.href = '/dashboard';
        } else {
          console.error('Error en la autenticación:', data);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchToken();
  }, [location]);

  return null;
};

export default OAuth2Callback;
