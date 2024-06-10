// orderApi.js
export const createOrder = async (items, token) => {
    const response = await fetch('http://192.168.1.205:3000/orders/neworder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ items }),
    });
    return response;
  };
  