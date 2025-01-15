import axios from 'axios';
import { API_BASE_URL } from '../../config';
import type { CreateSpaceSchema } from '../../../http/src/types';

export type UserType = 'user' | 'admin';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth interceptor
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  auth: {
    signup: async (data: { 
      username: string; 
      password: string; 
      type: UserType;
    }) => {
      const response = await client.post('/api/v1/signup', data);
      return response.data;
    },
    signin: async (data: { username: string; password: string }) => {
      const response = await client.post('/api/v1/signin', data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    },
    signout: () => {
      localStorage.removeItem('token');
    }
  },
  spaces: {
    getAll: async () => {
      const response = await client.get('/api/v1/space/all');
      return response.data.spaces;
    },
    create: async (data: typeof CreateSpaceSchema._type) => {
      const response = await client.post('/api/v1/space', data);
      return response.data;
    },
    getById: async (spaceId: string) => {
      const response = await client.get(`/api/v1/space/${spaceId}`);
      return response.data;
    },
    addElement: async (data: any) => {
      const response = await client.post('/api/v1/space/element', data);
      return response.data;
    },
    deleteElement: async (data: any) => {
      const response = await client.delete('/api/v1/space/element', { data });
      return response.data;
    }
  }
}; 