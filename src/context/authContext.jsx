/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const AuthContext = createContext();

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role')
        if (token && role) {
            setisAuthenticated(true);
            if (role === 'ADMIN') {
                navigate('/dashboard-admin');
            } else {
                navigate('/dashboard-user');
            }
        } else {
            setisAuthenticated(false);
        }
    }, [navigate]);

    const login = async (credentials) => {
        const response = await authService.login(credentials);
        localStorage.setItem("username", credentials.username);
        console.log(response);
        
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('role', response.data.rols[0])            
            setisAuthenticated(true);
            setRoles(response.data.rols.map(role => role.rol));
            if (response.data.rols.some(role => role.rol === 'ADMIN')) {
                localStorage.setItem('role', 'ADMIN')
                navigate('/dashboard-admin');
            } else {
                localStorage.setItem('role', 'USER')
                navigate('/dashboard-user');
            }
        }
    };

    const register = async (credentials) => {
        console.log(credentials);

        const response = await authService.register(credentials);
        console.log(response);

        if (response.status === 200) {
            Toast.fire({
                icon: 'success',
                title: 'User successfully registered'
            });
            navigate('/login');
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Registration failed'
            });
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        setisAuthenticated(false);
        setRoles([]);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, register, roles }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };