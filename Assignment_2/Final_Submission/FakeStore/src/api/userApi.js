// src/api/userApi.js
const API_URL = 'http://localhost:3000';

export const signUp = async (name, email, password) => {
  const response = await fetch(`${API_URL}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  return response.json();
};

export const signIn = async (email, password) => {
  const response = await fetch(`${API_URL}/users/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const updateUser = async (name, password, token) => {
  const response = await fetch(`${API_URL}/users/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ name, password }),
  });
  return response.json();
};
