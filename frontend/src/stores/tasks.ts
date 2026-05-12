import { defineStore } from 'pinia'
import { getTasks, getTasksByCategory, createTask, updateTask, deleteTask } from '../api/tasks'

interface Task {
  id: number
  name: string
  description: string | null
  from_time: string
  to_time: string
  priority: number
  status: boolean
  category_id: number | null
}

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchTasks() {
      this.loading = true
      try {
        const res = await getTasks()
        this.tasks = res.data
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async fetchTasksByCategory(categoryId: number) {
      this.loading = true
      try {
        const res = await getTasksByCategory(categoryId)
        this.tasks = res.data
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async addTask(taskData: Omit<Task, 'id'>) {
      const res = await createTask(taskData)
      const newId = res.data.task_id
      this.tasks.push({ id: newId, ...taskData })
    },
    async editTask(id: number, taskData: Omit<Task, 'id'>) {
      const res = await updateTask(id, { id, ...taskData })
      const index = this.tasks.findIndex(t => t.id === id)
      if (index !== -1) this.tasks[index] = res.data
    },
    async removeTask(id: number) {
      await deleteTask(id)
      this.tasks = this.tasks.filter(t => t.id !== id)
    },
  },
})