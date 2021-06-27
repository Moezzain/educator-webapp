import axios from 'axios';
import url from '../config/apiConfig';
import store from '../redux/index';

// const userId = store.getState().auth?.userId;
export const api = axios.create({
    timeout: 30000,
    baseURL: url,
  });
  
  // Add a request interceptor (before any request)
  api.interceptors.request.use((req) => {
    // const token = store.getState()?.auth?.token;
    // if (token) {
    //   req.headers.Authorization = `Bearer ${token}`;
    // }
    // if (userId && !req.params?.patientId) {
    //   req.params = {...req.params, patientId: userId};
    // }
    // if (!req.headers['Content-Type']) {
    //   req.headers['Content-Type'] = 'application/json';
    // }
    // req.headers.Accept = 'application/json';
  
    return req;
  });