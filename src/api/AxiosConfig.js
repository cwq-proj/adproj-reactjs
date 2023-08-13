import axios from 'axios';

const AxiosConfig = axios.create({
  baseURL: 'http://localhost:8000', // Set the correct base URL for your Spring Boot API
  headers: {
    'Content-Type': 'application/json',
  },
});


export default AxiosConfig;
