import axios from 'axios';

const api = axios.create({
    baseURL: 'https://booksearch-backend.herokuapp.com/',
})

export default api;