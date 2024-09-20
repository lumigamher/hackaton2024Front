import { createContext, useState } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(null)
    const [isAutenticated, setIsAutenticated] = useState(false)

    const login = async (credentials) => {
        const response = await authService.login(credentials)
        if (response.token) {
            setToken(response.token)
            localStorage.setItem('token', response.token)
            setIsAutenticated(true)
        }
    }
    const logout = () => {
        setToken(null)
        localStorage.removeItem('token')
        setIsAutenticated(false)
    }
    return (
        <AuthContext.Provider value={{isAutenticated, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext }