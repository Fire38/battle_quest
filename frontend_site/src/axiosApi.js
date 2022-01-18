import axios from 'axios';

import myConfig from './config';


const axiosInstance = axios.create({
    baseURL: myConfig.serverUrl,
    timeout: 5000,
    headers: {
        'Authorization': 'JWT' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

axiosInstance.interceptors.response.use(function(response) {
    return response;
}, function(error){
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refresh_token')
        return axiosInstance.post('auth/token/refresh/', {refresh: refreshToken})
        .then(({data}) => {
            localStorage.setItem('access_token', data.access)
            localStorage.setItem('refresh_token', data.refresh)
            axiosInstance.defaults.headers['Authorization'] = 'JWT ' + data.access
            originalRequest.headers['Authorization'] = 'JWT ' + data.access
            return (axiosInstance(originalRequest))
        })
    }
    return Promise.reject(error)
})

export default axiosInstance