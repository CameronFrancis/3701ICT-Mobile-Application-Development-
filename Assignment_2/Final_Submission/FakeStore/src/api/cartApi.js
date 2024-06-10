// src/api/cartApi.js
const API_URL = 'http://localhost:3000';

export const fetchCartItems = async (token) => {
  const response = await fetch(`${API_URL}/cart`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};

export const updateCart = async (items, token) => {
  const response = await fetch(`${API_URL}/cart`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ items }),
  });
  return response.json();
};
