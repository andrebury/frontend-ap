import axios from 'axios';

const api = axios.create({
	//baseURL: 'https://acompanhamento-projeto.herokuapp.com'
	baseURL: process.env.REACT_APP_API_URL
});

export default api;
