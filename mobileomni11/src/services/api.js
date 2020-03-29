import axios from 'axios';

const api = axios.create({
    baseURL:'http://192.168.0.29:2222'
})

export default api;