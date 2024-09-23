import axios from "axios";

const testURL = 'http://54.235.40.226'

const instance = axios.create({
    baseURL: testURL,
    headers: {
        'Content-Type': 'application/json'
    },
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