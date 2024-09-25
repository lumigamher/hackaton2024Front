/* eslint-disable no-unused-vars */
import axios from "axios";
import https from 'https'

const testURL = 'https://athlex.pro'
const testURL2 = 'https://athlex.pro'
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