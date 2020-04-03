import axios from 'axios';

const api = axios.create({
	baseURL: 'https://acompanhamento-projeto.herokuapp.com'
});

export default api;
