<template>
  <div class="task-list">
    <h2>Мои дела</h2>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <ul v-else>
      <li v-for="task in tasks" :key="task.id">
        <input type="checkbox" v-model="task.completed" @change="updateTask(task)" />
        <span :class="{ done: task.completed }">{{ task.title }}</span>
        <button @click="removeTask(task.id)">🗑️</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../services/api.js';

const tasks = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchTasks = async () => {
  loading.value = true;
  try {
    const data = await api.getTasks();
    tasks.value = data;
    error.value = null;
  } catch (err) {
    error.value = 'Не удалось загрузить задачи';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const updateTask = async (task) => {
  try {
    await api.updateTask(task.id, { completed: task.completed });
  } catch (err) {
    console.error('Ошибка обновления', err);
  }
};

const removeTask = async (id) => {
  try {
    await api.deleteTask(id);
    tasks.value = tasks.value.filter(t => t.id !== id);
  } catch (err) {
    console.error('Ошибка удаления', err);
  }
};

onMounted(fetchTasks);
</script>

<style scoped>
.task-list { max-width: 500px; margin: 0 auto; }
.done { text-decoration: line-through; opacity: 0.6; }
li { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
button { background: none; border: none; cursor: pointer; font-size: 1.2rem; }
.error { color: red; }
</style>