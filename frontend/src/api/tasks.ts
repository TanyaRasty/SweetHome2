import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
})

export const getTasks = () => api.get('/tasks/')
export const getTask = (id: number) => api.get(`/tasks/${id}`)
export const getTasksByCategory = (categoryId: number) => api.get(`/tasks/by-category/${categoryId}`)
export const createTask = (data: any) => api.post('/tasks/', data)
export const updateTask = (id: number, data: any) => api.put(`/tasks/${id}`, data)
export const deleteTask = (id: number) => api.delete(`/tasks/${id}`)