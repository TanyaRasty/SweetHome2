<template>
  <div class="task-form">
    <input v-model="newTaskTitle" @keyup.enter="addTask" placeholder="Что нужно сделать?" />
    <button @click="addTask">➕ Добавить</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { api } from '../services/api.js';

const emit = defineEmits(['task-added']);
const newTaskTitle = ref('');

const addTask = async () => {
  if (!newTaskTitle.value.trim()) return;
  try {
    const created = await api.createTask({ title: newTaskTitle.value, completed: false });
    emit('task-added', created);
    newTaskTitle.value = '';
  } catch (err) {
    console.error('Ошибка создания', err);
  }
};
</script>

<style scoped>
.task-form { display: flex; gap: 8px; margin-bottom: 20px; }
input { flex: 1; padding: 8px; }
</style>