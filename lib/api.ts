import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://articles.zeabur.app';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  status: string; // "publish" | "draft" | "trash"
  created_at?: string;
  updated_at?: string;
}

const client = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY,
  },
});

export const api = {
  async getAll(limit = 10, offset = 0): Promise<Article[]> {
    const { data } = await client.get<Article[]>('/article', { params: { limit, offset } });
    return data;
  },
  async getById(id: number): Promise<Article> {
    const { data } = await client.get<Article>(`/article/${id}`);
    return data;
  },

  async create(payload: Omit<Article, 'id'>): Promise<Article> {
    const { data } = await client.post<Article>('/article', payload);
    return data;
  },

  async update(id: number, payload: Partial<Article>): Promise<void> {
    await client.put(`/article/${id}`, { ...payload, id });
  },

  async delete(id: number): Promise<void> {
    await client.delete(`/article/${id}`);
  },
};
