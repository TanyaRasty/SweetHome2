<template>
  <div>
    <div class="badge">
      <i class="fa-regular fa-tags"></i> Организация задач
    </div>

    <div class="page-header">
      <h1 class="page-title">Категории</h1>
      <button class="btn-primary" @click="openCreateModal">
        <i class="fa-regular fa-plus"></i> Создать категорию
      </button>
    </div>

    <div class="categories-grid">
      <div v-for="cat in categoriesStore.categories" :key="cat.id" class="category-card">
        <div class="category-info">
          <span class="category-name">{{ cat.name }}</span>
          <span class="task-count">{{ tasksCountByCategory(cat.id) }} задач</span>
        </div>
        <div class="category-actions">
          <button class="btn-icon" @click="openEditModal(cat)"><i class="fa-regular fa-pen-to-square"></i></button>
          <button class="btn-icon delete" @click="deleteCategory(cat.id)"><i class="fa-regular fa-trash-can"></i></button>
        </div>
      </div>
      <div v-if="categoriesStore.loading" class="loading-state">Загрузка...</div>
      <div v-if="!categoriesStore.loading && categoriesStore.categories.length === 0" class="empty-state">
        <i class="fa-regular fa-folder-open"></i> Нет категорий. Создайте первую!
      </div>
    </div>

    <!-- Модальное окно -->
    <div v-if="modalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ isEditing ? 'Редактировать категорию' : 'Новая категория' }}</h2>
          <button class="modal-close" @click="closeModal"><i class="fa-regular fa-xmark"></i></button>
        </div>
        <form @submit.prevent="submitCategory">
          <div class="form-group">
            <label>Название категории *</label>
            <input v-model="categoryName" required autofocus />
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="closeModal">Отмена</button>
            <button type="submit" class="btn-primary">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCategoriesStore } from '../stores/categories'
import { useTasksStore } from '../stores/tasks'

const categoriesStore = useCategoriesStore()
const tasksStore = useTasksStore()

const modalOpen = ref(false)
const isEditing = ref(false)
const categoryName = ref('')
const editingId = ref<number | null>(null)

onMounted(async () => {
  await Promise.all([categoriesStore.fetchCategories(), tasksStore.fetchTasks()])
})

const tasksCountByCategory = (categoryId: number) => {
  return tasksStore.tasks.filter(task => task.category_id === categoryId).length
}

const openCreateModal = () => {
  isEditing.value = false
  categoryName.value = ''
  editingId.value = null
  modalOpen.value = true
}

const openEditModal = (cat: any) => {
  isEditing.value = true
  categoryName.value = cat.name
  editingId.value = cat.id
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
}

const submitCategory = async () => {
  if (!categoryName.value.trim()) return
  if (isEditing.value && editingId.value) {
    await categoriesStore.editCategory(editingId.value, { name: categoryName.value.trim() })
  } else {
    await categoriesStore.addCategory({ name: categoryName.value.trim() })
  }
  closeModal()
}

const deleteCategory = async (id: number) => {
  const cat = categoriesStore.categories.find(c => c.id === id)
  if (cat && confirm(`Удалить категорию "${cat.name}"? Задачи этой категории останутся без категории.`)) {
    await categoriesStore.removeCategory(id)
  }
}
</script>

<style scoped>
/* Внутренние стили – убраны html/body, .categories-page, .container */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(80, 117, 121, 0.12);
  backdrop-filter: blur(4px);
  padding: 0.4rem 1.2rem;
  border-radius: 60px;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  font-weight: 500;
  color: #1B3033;
  border: 1px solid rgba(80,117,121,0.25);
  width: fit-content;
  margin-bottom: 1.8rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.page-title {
  font-size: clamp(1.6rem, 6vw, 2.8rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #1B3033, #507579);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin: 0;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: #1B3033;
  color: white;
  border: none;
  padding: 0.7rem 1.4rem;
  border-radius: 60px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
}

.btn-primary:hover {
  background: #2A484C;
  transform: translateY(-2px);
  box-shadow: 0 10px 18px -8px rgba(27,48,51,0.3);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: clamp(1rem, 2vw, 2rem);
  margin-top: 0.5rem;
}

@media (min-width: 1600px) {
  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 2rem;
  }
}

.category-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(6px);
  border-radius: 28px;
  padding: 1.2rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.25s;
  border: 1px solid rgba(164,180,148,0.5);
  box-shadow: 0 6px 14px rgba(0,0,0,0.02);
}

.category-card:hover {
  transform: translateY(-4px);
  background: white;
  border-color: #A4B494;
  box-shadow: 0 18px 28px -12px rgba(27,48,51,0.12);
}

.category-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.category-name {
  font-weight: 700;
  font-size: 1.15rem;
  color: #1B3033;
}

.task-count {
  font-size: 0.75rem;
  color: #507579;
  letter-spacing: 0.3px;
  background: rgba(80,117,121,0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 30px;
  width: fit-content;
}

.category-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #507579;
  padding: 0.3rem;
  border-radius: 40px;
  width: 32px;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: #E9EFE4;
  color: #1B3033;
}

.btn-icon.delete:hover {
  background: #FFEDED;
  color: #C26B6B;
}

.empty-state, .loading-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  background: rgba(255,255,240,0.5);
  border-radius: 48px;
  color: #507579;
  font-weight: 500;
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(27, 48, 51, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 40px;
  max-width: 500px;
  width: 90%;
  padding: clamp(1rem, 5vw, 2rem);
  box-shadow: 0 28px 40px -20px rgba(0,0,0,0.3);
  animation: fadeUp 0.2s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h2 {
  font-size: clamp(1.3rem, 5vw, 1.8rem);
  font-weight: 600;
  color: #1B3033;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.6rem;
  cursor: pointer;
  color: #507579;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: #1B3033;
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 60px;
  border: 1px solid #D4DDCE;
  font-family: inherit;
  transition: 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #A4B494;
  box-shadow: 0 0 0 3px rgba(164,180,148,0.2);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-secondary {
  background: #E9EFE4;
  border: none;
  padding: 0.7rem 1.4rem;
  border-radius: 60px;
  font-weight: 500;
  cursor: pointer;
  color: #1B3033;
}

.btn-secondary:hover {
  background: #D4DDCE;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Адаптация */
@media (max-width: 768px) {
  .page-title {
    font-size: 1.8rem;
  }
  .category-card {
    padding: 1rem;
  }
  .modal {
    width: 95%;
    padding: 1.2rem;
  }
}

@media (max-width: 480px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }
  .btn-primary {
    justify-content: center;
  }
}
</style>