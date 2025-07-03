import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const analyzePaper = (formData: FormData) =>
  api.post('/analyze-paper', formData);

export const generateScript = (data: any) =>
  api.post('/generate-script', data);

export const generateComic = (data: any) =>
  api.post('/generate-comic', data);

export const getTermExplain = (term: string) =>
  api.get('/term-explain', { params: { term } }); 