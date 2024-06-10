// src/api/apiUtils.js
export const fetchWithToken = async (url, token, options = {}) => {
    const headers = {
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    };
  
    const response = await fetch(url, { ...options, headers });
    return response;
  };
  