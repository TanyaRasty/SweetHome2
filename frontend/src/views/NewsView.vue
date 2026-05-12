<template>
  <div>
    <div class="badge">
      <i class="fa-regular fa-newspaper"></i> Последние обновления
    </div>

    <div class="page-header">
      <h1 class="page-title">Новости проекта</h1>
    </div>

    <div class="news-grid">
      <article v-for="news in newsList" :key="news.id" class="news-card">
        <div class="news-date">
          <i class="fa-regular fa-calendar-alt"></i> {{ news.date }}
        </div>
        <h2 class="news-title">{{ news.title }}</h2>
        <p class="news-description">{{ news.description }}</p>
        <div class="news-tag" v-if="news.tag">
          <i class="fa-regular fa-tag"></i> {{ news.tag }}
        </div>
      </article>
    </div>

    <div v-if="loading" class="loading-state">Загрузка новостей...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface NewsItem {
  id: number
  date: string
  title: string
  description: string
  tag?: string
}

const newsList = ref<NewsItem[]>([])
const loading = ref(true)

onMounted(async () => {
  // Имитация загрузки – в реальном проекте здесь будет API запрос
  setTimeout(() => {
    newsList.value = [
      {
        id: 1,
        date: '15 мая 2025',
        title: 'Запуск версии 1.0',
        description: 'Мы рады представить TaskFlow — удобное приложение для управления задачами. Теперь вы можете создавать, редактировать и отслеживать задачи с группировкой по категориям.',
        tag: 'Релиз'
      },
      {
        id: 2,
        date: '20 мая 2025',
        title: 'Добавлена фильтрация по категориям',
        description: 'Теперь на странице задач можно фильтровать записи по выбранной категории. Это помогает быстрее находить нужные дела.',
        tag: 'Обновление'
      },
      {
        id: 3,
        date: '25 мая 2025',
        title: 'Адаптивный дизайн',
        description: 'Приложение полностью адаптировано для работы на любых устройствах: от смартфонов до широкоформатных мониторов. Наслаждайтесь единым стилем везде!',
        tag: 'Дизайн'
      },
      {
        id: 4,
        date: '1 июня 2025',
        title: 'Планы на будущее',
        description: 'В следующих версиях планируется добавить напоминания, экспорт данных и интеграцию с календарями. Следите за новостями!',
        tag: 'Анонс'
      }
    ]
    loading.value = false
  }, 500)
})
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

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.8rem;
  margin-top: 1rem;
}

.news-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(6px);
  border-radius: 28px;
  padding: 1.5rem;
  transition: all 0.25s;
  border: 1px solid rgba(164,180,148,0.4);
}

.news-card:hover {
  transform: translateY(-5px);
  background: white;
  border-color: #A4B494;
  box-shadow: 0 20px 30px -12px rgba(27,48,51,0.15);
}

.news-date {
  font-size: 0.8rem;
  color: #507579;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.news-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1B3033;
  margin-bottom: 0.8rem;
}

.news-description {
  font-size: 0.9rem;
  color: #3A5558;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.news-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(80, 117, 121, 0.1);
  padding: 0.2rem 0.8rem;
  border-radius: 40px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #507579;
  width: fit-content;
}

.loading-state {
  text-align: center;
  padding: 3rem;
  background: rgba(255,255,250,0.6);
  border-radius: 48px;
  color: #507579;
  font-weight: 500;
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>