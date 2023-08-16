import axios from 'axios';

const AxiosConfig = axios.create({
  // baseURL: 'http://localhost:8000', // Set the correct base URL for your Spring Boot API
  baseURL: 'http://20.239.74.208:8000', // Set the correct base URL for your Spring Boot API
  headers: {
    'Content-Type': 'application/json',
    // Add Authorization header if JWT token is available
    ...(localStorage.getItem('jwtToken')
      ? { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
      : {}),
  },
});

export default AxiosConfig;
