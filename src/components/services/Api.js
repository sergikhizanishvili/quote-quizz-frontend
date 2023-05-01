import axios from 'axios';

const Api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
    }
});

Api.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        window.location.href="/admin/login"
    }
    return Promise.reject(error);
 });

export default Api;