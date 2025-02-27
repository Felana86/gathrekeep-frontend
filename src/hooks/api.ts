import axios  from 'axios';
import { AuthResponse, ErrorResponse } from '../types/api.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorResponse = error.response?.data as ErrorResponse;
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(errorResponse || error);
  }
);

export const authApi = {
  login: async (email: string, password: string) => {
    const { data } = await api.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    localStorage.setItem('token', data.accessToken);
    return data;
  },

  register: async (email: string, password: string) => {
    const { data } = await api.post<AuthResponse>('/auth/register', {
      email,
      password,
    });
    localStorage.setItem('token', data.accessToken);
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export const associationsApi = {
  getAll: () => api.get('/associations').then((res) => res.data),
  getById: (id: string) => api.get(`/associations/${id}`).then((res) => res.data),
  create: (data: { name: string; city: string; category: string }) =>
    api.post('/associations', data).then((res) => res.data),
  join: (associationId: string) =>
    api.post(`/associations/${associationId}/join`).then((res) => res.data),
};

export const postsApi = {
  getByAssociation: (associationId: string) =>
    api.get(`/associations/${associationId}/posts`).then((res) => res.data),
  create: (associationId: string, data: { content: string; images?: string[] }) =>
    api.post(`/associations/${associationId}/posts`, data).then((res) => res.data),
  comment: (postId: string, content: string) =>
    api.post(`/posts/${postId}/comments`, { content }).then((res) => res.data),
};

export const pollsApi = {
  getByAssociation: (associationId: string) =>
    api.get(`/associations/${associationId}/polls`).then((res) => res.data),
  create: (associationId: string, data: { question: string; options: string[]; expiresAt: string }) =>
    api.post(`/associations/${associationId}/polls`, data).then((res) => res.data),
  vote: (pollId: string, optionId: string) =>
    api.post(`/polls/${pollId}/vote`, { optionId }).then((res) => res.data),
};

export const eventsApi = {
  getByAssociation: (associationId: string) =>
    api.get(`/associations/${associationId}/events`).then((res) => res.data),
  create: (associationId: string, data: {
    title: string;
    description: string;
    date: string;
    location: string;
    maxParticipants: number;
  }) =>
    api.post(`/associations/${associationId}/events`, data).then((res) => res.data),
  participate: (eventId: string) =>
    api.post(`/events/${eventId}/participate`).then((res) => res.data),
};

export const messagesApi = {
  getConversations: () => api.get('/messages').then((res) => res.data),
  getWithUser: (userId: string) =>
    api.get(`/messages/${userId}`).then((res) => res.data),
  send: (userId: string, content: string) =>
    api.post(`/messages/${userId}`, { content }).then((res) => res.data),
};