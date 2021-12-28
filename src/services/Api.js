import axios from 'axios';

const api = axios.create({
    baseURL: 'https://sistema-de-apoio-avaliativo.herokuapp.com/'
});

export default api;