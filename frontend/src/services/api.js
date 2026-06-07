import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_BASE}/auth/refresh`, { refreshToken });
          localStorage.setItem('accessToken', data.data.accessToken);
          localStorage.setItem('refreshToken', data.data.refreshToken);
          original.headers.Authorization = `Bearer ${data.data.accessToken}`;
          return api(original);
        } catch {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(err);
  }
);

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  refresh: (data) => api.post('/auth/refresh', data),
};

export const trainerAPI = {
  getAll: () => api.get('/trainers'),
  getById: (id) => api.get(`/trainers/${id}`),
  create: (data) => api.post('/trainers', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, data) => api.put(`/trainers/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/trainers/${id}`),
};

export const planAPI = {
  getAll: (active) => api.get('/plans', { params: { active } }),
  create: (data) => api.post('/plans', data),
  update: (id, data) => api.put(`/plans/${id}`, data),
  delete: (id) => api.delete(`/plans/${id}`),
};

export const galleryAPI = {
  getAll: (category) => api.get('/gallery', { params: { category } }),
  create: (data) => api.post('/gallery', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/gallery/${id}`),
};

export const testimonialAPI = {
  getAll: () => api.get('/testimonials'),
  create: (data) => api.post('/testimonials', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, data) => api.put(`/testimonials/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/testimonials/${id}`),
};

export const transformationAPI = {
  getAll: () => api.get('/transformations'),
  create: (data) => api.post('/transformations', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, data) => api.put(`/transformations/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/transformations/${id}`),
};

export const enquiryAPI = {
  create: (data) => api.post('/enquiry', data),
  getAll: (status) => api.get('/enquiry', { params: { status } }),
  updateStatus: (id, status) => api.put(`/enquiry/${id}/status`, { status }),
};

export const bookingAPI = {
  create: (data) => api.post('/trial-booking', data),
  getAll: (status) => api.get('/trial-booking', { params: { status } }),
  updateStatus: (id, status) => api.put(`/trial-booking/${id}/status`, { status }),
};

export const gymInfoAPI = {
  get: () => api.get('/gym-info'),
  update: (data) => api.put('/gym-info', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

export default api;
