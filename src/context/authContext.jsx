import { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()
    const [isAuthenticated, setisAuthenticated] = useState(false)


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setisAuthenticated(true);
            navigate("/dashboard")
        } else {
            setisAuthenticated(false);
        }
    }, [])

    const login = async (credentials) => {
        const response = await authService.login(credentials)

        if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            setisAuthenticated(true)
            navigate('/dashboard')
        }
    }
    const register = async (credentials) => {
        const response = await authService.register(credentials)
        if (response.status == 200) {
            Toast.fire({
                icon: 'success',
                title: 'User successfully registered'
            });
            navigate('/login')
        }
    }
    const logout = () => {
        localStorage.removeItem('token')
        setisAuthenticated(false)
        navigate("/login")
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext }