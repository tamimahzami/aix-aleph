import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Passe die URL an dein Backend an

// Benutzer registrieren
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Benutzer einloggen
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

