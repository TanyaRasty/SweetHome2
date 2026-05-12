<template>
  <header class="app-header">
    <div class="container">
      <div class="logo">
        <i class="fa-solid fa-list-check"></i>
        <span>TaskFlow</span>
      </div>
      <nav class="nav-links">
        <router-link to="/" class="nav-link" active-class="active">
          <i class="fa-solid fa-house"></i> Главная
        </router-link>
        <router-link to="/tasks" class="nav-link" active-class="active">
          <i class="fa-solid fa-tasks"></i> Задачи
        </router-link>
        <router-link to="/categories" class="nav-link" active-class="active">
          <i class="fa-solid fa-tags"></i> Категории
        </router-link>
        <router-link to="/news" class="nav-link" active-class="active">
          <i class="fa-solid fa-newspaper"></i> Новости
        </router-link>
        <router-link to="/about" class="nav-link" active-class="active">
          <i class="fa-solid fa-circle-info"></i> О проекте
        </router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: rgba(255, 255, 245, 0.75);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(164, 180, 148, 0.4);
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0.8rem clamp(1rem, 4vw, 3rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: #1B3033;
  letter-spacing: -0.3px;
}

.logo i {
  font-size: 1.5rem;
  color: #507579;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 60px;
  font-weight: 500;
  color: #2A484C;
  text-decoration: none;
  transition: all 0.2s;
  background: transparent;
}

.nav-link i {
  font-size: 1rem;
}

.nav-link:hover {
  background: rgba(80, 117, 121, 0.1);
  color: #1B3033;
}

.nav-link.active {
  background: #1B3033;
  color: white;
  box-shadow: 0 4px 10px rgba(27, 48, 51, 0.2);
}

@media (max-width: 700px) {
  .container {
    flex-direction: column;
    text-align: center;
  }
  .nav-links {
    justify-content: center;
  }
}
</style>