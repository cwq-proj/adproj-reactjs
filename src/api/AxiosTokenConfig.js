import axios from 'axios';

const AxiosTokenConfig = axios.create({
  // baseURL: 'http://localhost:8000', // Set the correct base URL for your Spring Boot API
  baseURL: 'http://20.239.74.208:8000', // Set the correct base URL for your Spring Boot API
  headers: {
    'Content-Type': 'application/json',
  },
});


const jwtToken = localStorage.getItem('jwtToken');

if (jwtToken) {
  AxiosTokenConfig.defaults.headers['Authorization'] = `Bearer ${jwtToken}`;
}

export default AxiosTokenConfig;
