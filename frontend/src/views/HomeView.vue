<template>
  <div>
    <div class="badge">
      <i class="fa-regular fa-star"></i> Добро пожаловать
    </div>

    <div class="hero">
      <h1 class="hero-title">Милый дом</h1>
      <p class="hero-subtitle">Уютный помощник для домашних дел</p>
      <div class="hero-buttons">
        <router-link to="/tasks" class="btn-primary">Перейти к задачам</router-link>
        <router-link to="/categories" class="btn-secondary">Управлять категориями</router-link>
      </div>
    </div>

    <div class="features">
      <div class="feature-card">
        <i class="fa-solid fa-list-check"></i>
        <h3>Удобный список задач</h3>
        <p>Создавайте, редактируйте и отслеживайте выполнение задач</p>
      </div>
      <div class="feature-card">
        <i class="fa-solid fa-tags"></i>
        <h3>Категории</h3>
        <p>Группируйте задачи по категориям для лучшей организации</p>
      </div>
      <div class="feature-card">
        <i class="fa-solid fa-calendar"></i>
        <h3>Планирование времени</h3>
        <p>Указывайте даты начала и окончания, чтобы ничего не упустить</p>
      </div>
      <div class="feature-card">
        <i class="fa-solid fa-chart-line"></i>
        <h3>Приоритеты</h3>
        <p>Расставляйте приоритеты от 1 до 5, чтобы фокусироваться на важном</p>
      </div>
    </div>

    <div class="info-block">
      <div class="info-text">
        <h2>Начните прямо сейчас</h2>
        <p>Добавьте свою первую задачу и почувствуйте, как легко управлять делами с TaskFlow.</p>
      </div>
      <div class="info-stats">
        <div class="stat">
          <span class="stat-number">{{ totalTasks }}</span>
          <span class="stat-label">всего задач</span>
        </div>
        <div class="stat">
          <span class="stat-number">{{ completedTasks }}</span>
          <span class="stat-label">выполнено</span>
        </div>
        <div class="stat">
          <span class="stat-number">{{ categoriesCount }}</span>
          <span class="stat-label">категорий</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useTasksStore } from '../stores/tasks'
import { useCategoriesStore } from '../stores/categories'

const tasksStore = useTasksStore()
const categoriesStore = useCategoriesStore()

onMounted(async () => {
  await Promise.all([tasksStore.fetchTasks(), categoriesStore.fetchCategories()])
})

const totalTasks = computed(() => tasksStore.tasks.length)
const completedTasks = computed(() => tasksStore.tasks.filter(t => t.status).length)
const categoriesCount = computed(() => categoriesStore.categories.length)
</script>

<style scoped>
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
  margin-bottom: 2rem;
}

.hero {
  text-align: center;
  margin-bottom: 4rem;
  padding: 2rem 0;
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 800;
  background: linear-gradient(135deg, #1B3033, #507579);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.5rem;
}

.hero-subtitle {
  font-size: clamp(1rem, 4vw, 1.3rem);
  color: #3A5558;
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 1.4rem;
  border-radius: 60px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-primary {
  background: #1B3033;
  color: white;
  border: none;
}

.btn-primary:hover {
  background: #2A484C;
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.8);
  color: #1B3033;
  border: 1px solid #A4B494;
}

.btn-secondary:hover {
  background: white;
  transform: translateY(-2px);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.8rem;
  margin: 3rem 0;
}

.feature-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(4px);
  border-radius: 32px;
  padding: 1.8rem;
  text-align: center;
  transition: all 0.25s;
  border: 1px solid rgba(164, 180, 148, 0.4);
}

.feature-card:hover {
  transform: translateY(-5px);
  background: white;
  border-color: #A4B494;
  box-shadow: 0 20px 30px -12px rgba(27,48,51,0.15);
}

.feature-icon {
  font-size: 2.2rem;
  color: #507579;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  color: #1B3033;
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-size: 0.9rem;
  color: #3A5558;
}

.info-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  background: rgba(255, 255, 245, 0.6);
  backdrop-filter: blur(4px);
  border-radius: 48px;
  padding: 2rem;
  margin-top: 2rem;
  border: 1px solid rgba(164,180,148,0.5);
}

.info-text h2 {
  font-size: 1.6rem;
  color: #1B3033;
  margin-bottom: 0.5rem;
}

.info-text p {
  color: #3A5558;
}

.info-stats {
  display: flex;
  gap: 2rem;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #1B3033;
}

.stat-label {
  font-size: 0.8rem;
  color: #507579;
}

@media (max-width: 768px) {
  .info-block {
    flex-direction: column;
    text-align: center;
  }
  .info-stats {
    justify-content: center;
  }
}
</style>