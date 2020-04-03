import axios from 'axios';
import .env from './env';


const api = axios.create({
	//baseURL: 'https://acompanhamento-projeto.herokuapp.com'
	baseURL: process.env.REACT_URL_API_ADDRESS
});

export default api;
