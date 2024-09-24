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
            return response
        } catch (error) {
            console.warn("Error getting proyect with id: " + id + " " + error);
        }
    },


}