// src/api/userApi.js
const API_URL = 'http://192.168.1.205:3000'; // Ensure this is the correct URL for your API

export const signUp = async (name, email, password) => {
  const response = await fetch(`${API_URL}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  if (!response.ok) {
    throw new Error('Failed to sign up');
  }
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
  if (!response.ok) {
    throw new Error('Failed to sign in');
  }
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
  if (!response.ok) {
    throw new Error('Failed to update user details');
  }
  return response.json();
};
