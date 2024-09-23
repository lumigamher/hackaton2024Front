import { default as axios } from "../api/axiosInstace"

export const staffService = {
    getAllAvailStaff: async () => {
        try {
            const response = await axios.get('/usuarios/sin-proyectos');
            return response.data; 
        } catch (error) {
            console.warn("Error al obtener personal disponible: ", error);
            throw error; 
        }
    },
    getStaffByProject: async (id) => { 
        try {
            const response = await axios.get(`proyectos/${id}`);
            return response.data; 
        } catch (error) {
            console.warn("Error al obtener personal por proyecto: ", error);
            throw error; 
        }
    }
};
