import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
})

export const getCategories = () => api.get('/category/')
export const createCategory = (data: { name: string }) => api.post('/category/', data)
export const updateCategory = (id: number, data: { id: number; name: string }) => api.put(`/category/${id}`, data)
export const deleteCategory = (id: number) => api.delete(`/category/${id}`)