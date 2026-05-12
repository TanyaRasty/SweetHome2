import { defineStore } from 'pinia'
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api/categories'

interface Category {
  id: number
  name: string
}

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [] as Category[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchCategories() {
      this.loading = true
      try {
        const res = await getCategories()
        this.categories = res.data
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async addCategory(categoryData: { name: string }) {
      const res = await createCategory(categoryData)
      const newId = res.data.task_id // бэкенд возвращает task_id, но это id категории
      this.categories.push({ id: newId, name: categoryData.name })
    },
    async editCategory(id: number, categoryData: { name: string }) {
      const res = await updateCategory(id, { id, name: categoryData.name })
      const index = this.categories.findIndex(c => c.id === id)
      if (index !== -1) this.categories[index] = res.data
    },
    async removeCategory(id: number) {
      await deleteCategory(id)
      this.categories = this.categories.filter(c => c.id !== id)
    },
  },
})