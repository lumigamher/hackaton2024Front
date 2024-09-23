import axios from "axios";

const testURL = 'http://54.235.40.226:8080'

const instance = axios.create({
    baseURL: testURL,
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