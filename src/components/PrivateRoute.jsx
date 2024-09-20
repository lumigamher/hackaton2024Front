import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function PrivateRoute() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Outlet />;
    } else {
        return <Navigate to={"/login"} />
    }
}

export default PrivateRoute;
