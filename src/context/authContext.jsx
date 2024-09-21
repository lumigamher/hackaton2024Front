import { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()
    const [token, setToken] = useState(null)
    const [isAuthenticated, setisAuthenticated] = useState(false)


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setisAuthenticated(true);
        } else {
            setisAuthenticated(false);
        }
    }, [])
    
    const login = async (credentials) => {
        const response = await authService.login(credentials)

        if (response.data.token) {
            setToken(response.data.token)
            localStorage.setItem('token', response.data.token)
            setisAuthenticated(true)
            navigate('/dashboard')
        }
    }
    const register = async (credentials) => {
        const response = await authService.register(credentials)
        return response;
    }
    const logout = () => {
        setToken(null)
        localStorage.removeItem('token')
        setisAuthenticated(false)
    }
    return (
        <AuthContext.Provider value={{isAuthenticated, token, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext }