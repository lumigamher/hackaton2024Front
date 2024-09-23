import axios from "axios";

const testURL = 'https://54.235.40.226'
const local = 'http://localhost:8080'

const instance = axios.create({
    baseURL: testURL
})


instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    // console.log(token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    // console.log('Request made with ', config);
    return config;
}, (error) => {
    return Promise.reject(error)
});

export default instance;