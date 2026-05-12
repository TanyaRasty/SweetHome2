<template>
  <div>
    <TaskForm @task-added="refreshTasks" />
    <TaskList ref="taskListRef" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TaskForm from '../components/TaskForm.vue';
import TaskList from '../components/TaskList.vue';

const taskListRef = ref(null);

const refreshTasks = () => {
  // Перезагружаем список задач после добавления
  taskListRef.value?.fetchTasks();
};
</script>