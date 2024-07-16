import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://sua-api-url.com', // Substitua pela URL da sua API
  timeout: 1000,
});