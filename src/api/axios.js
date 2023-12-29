import axios from "axios";

const instance = axios.create({baseURL: 'http://localhost:3001'})

// Add a request interceptor to include the token in the headers of all requests
instance.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem('token'); // Retrieve the token from your preferred storage

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default instance