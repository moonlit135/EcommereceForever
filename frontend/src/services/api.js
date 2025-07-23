import axios from 'axios';

// Backend URL - you'll need to set this in your .env file
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

// Create axios instance with default config
const api = axios.create({
    baseURL: backendUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.token = token;
    }
    return config;
});

// API functions
export const apiService = {
    // User authentication
    register: (userData) => api.post('/api/user/register', userData),
    login: (userData) => api.post('/api/user/login', userData),
    
    // Products
    getProducts: () => api.get('/api/product/list'),
    
    // Cart operations
    addToCart: (cartData) => api.post('/api/cart/add', cartData),
    updateCart: (cartData) => api.post('/api/cart/update', cartData),
    getCart: (userData) => api.post('/api/cart/get', userData),
    
    // Orders
    placeOrder: (orderData) => api.post('/api/order/place', orderData),
    getUserOrders: (userData) => api.post('/api/order/userorders', userData),
    
    // Test connection
    testConnection: () => api.get('/test'),
};

export default api;
