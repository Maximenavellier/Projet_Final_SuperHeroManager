import API from './axiosConfig'; // ou '../api/axiosConfig' selon où tu l'as mis
import { IHero } from '../types/Hero';

export const fetchHeroes = () => API.get<IHero[]>('/heroes');
export const fetchHeroById = (id: string) => API.get<IHero>(`/heroes/${id}`);
export const createHero = (data: FormData) => API.post('/heroes', data);
export const updateHero = (id: string, data: FormData) => API.put(`/heroes/${id}`, data);
export const deleteHero = (id: string) => API.delete(`/heroes/${id}`);