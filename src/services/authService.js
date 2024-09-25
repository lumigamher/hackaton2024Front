import { default as axios } from "../api/axiosInstace"
import { handleErrors } from "../utils/HandleErrors";


export const authService = {
    login: async (credentials) => {
        try {
            const response = await axios.post('/auth/login', credentials)
            return response
        } catch (error) {
            console.warn('Error during login: ' + error);
            handleErrors(error)

        }
    },
    register: async (credentials) => {
        try {
            const response = await axios.post('/auth/register', credentials, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response;
        } catch (error) {
            console.warn('Error during register: ' + error);
            handleErrors(error);
        }
    }
}