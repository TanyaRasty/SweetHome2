<template>
  <div class="app-wrapper">
    <AppHeader />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
</script>

<style>
/* глобальные стили */
@import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300..700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background: radial-gradient(circle at 10% 20%, #F2F6EF, #E5EDDF);
  background-attachment: fixed;
}

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle at 10% 20%, #F2F6EF, #E5EDDF);
}

.main-content {
  flex: 1;
  width: 100%;
  padding: 2rem clamp(1rem, 4vw, 3rem);
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}
</style>