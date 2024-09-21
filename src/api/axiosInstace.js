import axios from "axios";

const productionURL = ''
const testURL = ' http://localhost:3000/'

const instance = axios.create({
    baseURL: testURL,
    headers: {
        'Content-Type' : 'application/json'
    }
})


instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
});

export default instance;