import {default as axios} from '../api/axiosInstace'
export const  proyectService = {
    createProyect: async (payload) => {
        try {
            const response = await axios.post('/proyectos/guardar', payload)
            return response
        } catch (error) {
            console.warn("Error saving new proyect: " + error);
        }
    },
    getProyectById: async (id) => {
        try {
            const response = await axios.get(`/proyectos/${id}`)
            return response.data
        } catch (error) {
            console.warn("Error getting proyect with id: " + id + " " + error);
        }
    },
    getAllProjects: async (id) => {
        try {
            const response = await axios.get(`/proyectos/todos`)
            return response
        } catch (error) {
            console.warn("Error getting proyects: " + error);
        }
    }


}