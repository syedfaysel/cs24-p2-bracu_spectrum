// axiosInterceptorInstance.js

import axios from 'axios';

const axiosInterceptorInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API, // Replace with your API base URL
});

// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
    // const accessToken = JSON.parse(localStorage.getItem("token")) || null;

    // // If token is present, add it to request's Authorization Header
    // if (accessToken) {
    //   console.log('accessToken', accessToken)
    //   config.headers.authorization = `Bearer ${accessToken}`;
    // }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response;
  },
  (error) => {
    // Handle response errors here
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;