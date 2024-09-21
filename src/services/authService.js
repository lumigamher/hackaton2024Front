import { default as axios } from "../api/axiosInstace"


export const authService = {
    login: async (credentials) => {
        try {
            const response = await axios.post('/auth/login', credentials)
            return response
        } catch (error) {
            console.warn('Error: ' + error);

        }

    }
}