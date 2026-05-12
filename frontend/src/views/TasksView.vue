<template>
  <div>
    <div class="badge">
      <i class="fa-regular fa-list-check"></i> Управление задачами
    </div>

    <div class="page-header">
      <h1 class="page-title">Мои задачи</h1>
      <button class="btn-primary" @click="openCreateModal">
        <i class="fa-regular fa-plus"></i> Новая задача
      </button>
    </div>

    <div class="filter-card">
      <label>Фильтр по категории:</label>
      <select v-model="filterCategoryId" class="filter-select">
        <option :value="null">Все категории</option>
        <option v-for="cat in categoriesStore.categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <div class="tasks-grid">
      <div v-for="task in filteredTasks" :key="task.id" class="task-card">
        <div class="task-card-inner">
          <div class="task-header">
            <h3>{{ task.name }}</h3>
            <div class="priority-badge" :class="priorityClass(task.priority)">
              Приоритет {{ task.priority }}
            </div>
          </div>
          <p v-if="task.description" class="task-desc">{{ task.description }}</p>
          <div class="task-datetime">
            <i class="fa-regular fa-calendar"></i> {{ formatDateTime(task.from_time) }} — {{ formatDateTime(task.to_time) }}
          </div>
          <div class="task-category">
            <i class="fa-regular fa-folder"></i> {{ getCategoryName(task.category_id) }}
          </div>
          <div class="task-status">
            <span :class="task.status ? 'status-done' : 'status-pending'">
              <i :class="task.status ? 'fa-regular fa-circle-check' : 'fa-regular fa-clock'"></i>
              {{ task.status ? 'Выполнена' : 'В процессе' }}
            </span>
          </div>
          <div class="task-actions">
            <button class="btn-icon" @click="openEditModal(task)"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="btn-icon delete" @click="deleteTask(task.id)"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </div>
      </div>
      <div v-if="tasksStore.loading" class="loading-state">Загрузка...</div>
      <div v-if="!tasksStore.loading && filteredTasks.length === 0" class="empty-state">
        <i class="fa-regular fa-face-smile"></i> Нет задач. Создайте первую!
      </div>
    </div>

    <!-- Модальное окно -->
    <div v-if="modalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ isEditing ? 'Редактировать задачу' : 'Новая задача' }}</h2>
          <button class="modal-close" @click="closeModal"><i class="fa-regular fa-xmark"></i></button>
        </div>
        <form @submit.prevent="submitTask">
          <div class="form-group">
            <label>Название *</label>
            <input v-model="form.name" required />
          </div>
          <div class="form-group">
            <label>Описание</label>
            <textarea v-model="form.description" rows="2"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Начало</label>
              <input type="datetime-local" v-model="form.from_time" required />
            </div>
            <div class="form-group">
              <label>Конец</label>
              <input type="datetime-local" v-model="form.to_time" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Приоритет (1..5)</label>
              <input type="number" v-model.number="form.priority" min="1" max="5" required />
            </div>
            <div class="form-group">
              <label>Категория</label>
              <select v-model="form.category_id">
                <option :value="null">Без категории</option>
                <option v-for="cat in categoriesStore.categories" :value="cat.id">{{ cat.name }}</option>
              </select>
            </div>
          </div>
          <div class="form-group checkbox">
            <label>
              <input type="checkbox" v-model="form.status" />
              Задача выполнена
            </label>
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
import { ref, computed, onMounted } from 'vue'
import { useTasksStore } from '../stores/tasks'
import { useCategoriesStore } from '../stores/categories'

const tasksStore = useTasksStore()
const categoriesStore = useCategoriesStore()

const filterCategoryId = ref<number | null>(null)

const modalOpen = ref(false)
const isEditing = ref(false)
const form = ref({
  id: null as number | null,
  name: '',
  description: '',
  from_time: '',
  to_time: '',
  priority: 3,
  status: false,
  category_id: null as number | null,
})

onMounted(async () => {
  await Promise.all([categoriesStore.fetchCategories(), tasksStore.fetchTasks()])
})

const filteredTasks = computed(() => {
  if (filterCategoryId.value === null) return tasksStore.tasks
  return tasksStore.tasks.filter(t => t.category_id === filterCategoryId.value)
})

const formatDateTime = (iso: string) => {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}

const getCategoryName = (id: number | null) => {
  if (id === null) return 'Без категории'
  const cat = categoriesStore.categories.find(c => c.id === id)
  return cat ? cat.name : 'Неизвестно'
}

const priorityClass = (p: number) => {
  if (p <= 2) return 'priority-low'
  if (p >= 4) return 'priority-high'
  return ''
}

const deleteTask = async (id: number) => {
  const task = tasksStore.tasks.find(t => t.id === id)
  if (task && confirm(`Удалить задачу "${task.name}"?`)) {
    await tasksStore.removeTask(id)
  }
}

const openCreateModal = () => {
  isEditing.value = false
  form.value = {
    id: null,
    name: '',
    description: '',
    from_time: new Date().toISOString().slice(0, 16),
    to_time: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
    priority: 3,
    status: false,
    category_id: null,
  }
  modalOpen.value = true
}

const openEditModal = (task: any) => {
  isEditing.value = true
  form.value = {
    id: task.id,
    name: task.name,
    description: task.description || '',
    from_time: task.from_time?.slice(0, 16) || '',
    to_time: task.to_time?.slice(0, 16) || '',
    priority: task.priority,
    status: task.status,
    category_id: task.category_id,
  }
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
}

const submitTask = async () => {
  const payload = {
    name: form.value.name,
    description: form.value.description,
    from_time: new Date(form.value.from_time).toISOString(),
    to_time: new Date(form.value.to_time).toISOString(),
    priority: form.value.priority,
    status: form.value.status,
    category_id: form.value.category_id,
  }
  if (isEditing.value && form.value.id) {
    await tasksStore.editTask(form.value.id, payload)
  } else {
    await tasksStore.addTask(payload)
  }
  closeModal()
}
</script>

<style scoped>
/* Внутренние стили компонента – убраны html/body, .tasks-page, .container */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(80, 117, 121, 0.1);
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
  background: linear-gradient(125deg, #1B3033, #507579);
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
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #2A484C;
  transform: translateY(-2px);
}

.filter-card {
  background: rgba(255, 255, 245, 0.7);
  backdrop-filter: blur(5px);
  border-radius: 60px;
  padding: 0.7rem 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  border: 1px solid rgba(164,180,148,0.5);
}

.filter-card label {
  font-weight: 500;
  color: #1B3033;
}

.filter-select {
  background: white;
  border: 1px solid #C5D4BB;
  border-radius: 60px;
  padding: 0.5rem 1.2rem;
  font-family: inherit;
  font-size: 0.9rem;
  color: #1B3033;
  outline: none;
  cursor: pointer;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: clamp(1rem, 2vw, 2rem);
  margin-top: 0.5rem;
}

@media (min-width: 1600px) {
  .tasks-grid {
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 2rem;
  }
}

.task-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  border-radius: 32px;
  transition: all 0.25s ease;
  border: 1px solid rgba(164,180,148,0.4);
  overflow: hidden;
}

.task-card:hover {
  transform: translateY(-5px);
  background: white;
  border-color: #A4B494;
  box-shadow: 0 20px 30px -12px rgba(27,48,51,0.15);
}

.task-card-inner {
  padding: 1.4rem 1.4rem 1.2rem;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
}

.task-header h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1B3033;
  margin: 0;
}

.priority-badge {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.7rem;
  border-radius: 40px;
  background: #E9EFE4;
  color: #1B3033;
}

.priority-badge.priority-high {
  background: #FFE8DF;
  color: #BC6D4A;
}

.priority-badge.priority-low {
  background: #DFEADF;
  color: #507579;
}

.task-desc {
  font-size: 0.9rem;
  color: #3A5558;
  margin: 0.6rem 0 1rem;
  line-height: 1.4;
}

.task-datetime, .task-category {
  font-size: 0.8rem;
  color: #507579;
  margin: 0.4rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.task-status {
  margin: 0.8rem 0 1rem;
}

.status-done {
  color: #507579;
  background: #E0EDE0;
  padding: 0.2rem 0.8rem;
  border-radius: 60px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-pending {
  color: #A4835C;
  background: #FFF0E4;
  padding: 0.2rem 0.8rem;
  border-radius: 60px;
  font-size: 0.75rem;
  font-weight: 500;
}

.task-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin-top: 0.8rem;
  border-top: 1px solid rgba(164,180,148,0.3);
  padding-top: 0.8rem;
}

.btn-icon {
  background: transparent;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: #507579;
  transition: 0.2s;
  padding: 0.2rem;
}

.btn-icon:hover {
  color: #1B3033;
  transform: scale(1.08);
}

.btn-icon.delete:hover {
  color: #C26B6B;
}

.empty-state, .loading-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  background: rgba(255,255,250,0.6);
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
  max-width: 540px;
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
  margin-bottom: 1rem;
}

.form-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.form-row .form-group {
  flex: 1;
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: #1B3033;
  font-size: 0.9rem;
}

.form-group input, .form-group select, .form-group textarea {
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 60px;
  border: 1px solid #D4DDCE;
  font-family: inherit;
  transition: 0.2s;
  background: white;
}

.form-group textarea {
  border-radius: 24px;
  resize: vertical;
}

.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
  outline: none;
  border-color: #A4B494;
  box-shadow: 0 0 0 3px rgba(164,180,148,0.2);
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.checkbox label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
  cursor: pointer;
}

.checkbox input {
  width: auto;
  transform: scale(1.1);
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

/* Адаптация для планшетов и телефонов (только внутренняя) */
@media (max-width: 768px) {
  .tasks-grid {
    grid-template-columns: 1fr;
  }
  .filter-card {
    width: 100%;
    justify-content: space-between;
  }
  .page-title {
    font-size: 1.8rem;
  }
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}

@media (max-width: 500px) {
  .task-header {
    flex-direction: column;
  }
  .modal {
    width: 95%;
    padding: 1rem;
  }
  .btn-primary, .btn-secondary {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
}
</style>