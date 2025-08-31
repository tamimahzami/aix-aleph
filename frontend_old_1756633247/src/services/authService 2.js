import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

export const register = (email, password) => {
  return axios.post(`${API_URL}register`, { email, password });
};

export const login = (email, password) => {
  return axios.post(`${API_URL}login`, { email, password })
    .then(response => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem('user');
};

