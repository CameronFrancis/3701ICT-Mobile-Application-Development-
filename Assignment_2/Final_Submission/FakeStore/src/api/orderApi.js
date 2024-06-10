// src/api/orderApi.js
const API_URL = 'http://localhost:3000';

export const fetchOrders = async (token) => {
  const response = await fetch(`${API_URL}/orders/all`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};

export const createOrder = async (items, token) => {
  const response = await fetch(`${API_URL}/orders/neworder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ items }),
  });
  return response.json();
};

export const updateOrderStatus = async (orderID, isPaid, isDelivered, token) => {
  const response = await fetch(`${API_URL}/orders/updateorder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ orderID, isPaid, isDelivered }),
  });
  return response.json();
};
