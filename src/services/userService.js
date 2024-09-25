import { default as axios } from '../api/axiosInstace'
export const userService = {
  getAllProjects: async () => {
    try {
      const userReponse = await axios.get(`/usuarios/username/${localStorage.getItem('username')}`)
      const proyectosResponse = await axios.get(`/usuarioProyecto/proyectos-usuario/${userReponse.data.id}`)
      return proyectosResponse
    } catch (error) {
      console.warn("Error getting proyects: " + error);
    }
  },

  getAllTareasByUsernameUser: async () => {
    try {
      const userReponse = await axios.get(`/usuarios/username/${localStorage.getItem('username')}`)
      const tareasResponse = await axios.get(`/usuario-tarea/usuario/${userReponse.data.username}`)
      return tareasResponse
    } catch (error) {
      console.warn("Error getting tareas: " + error);
    }
  }


}