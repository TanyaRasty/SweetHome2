<template>
  <div>
    <div class="badge">
      <i class="fa-solid fa-circle-info"></i> О проекте
    </div>

    <div class="page-header">
      <h1 class="page-title">О TaskFlow</h1>
    </div>

    <div class="about-content">
      <div class="about-card">
        <i class="fa-solid fa-lightbulb about-icon"></i>
        <h2>Идея проекта</h2>
        <p>Милый дом создан для того, чтобы помочь людям организовать свои дела, повысить продуктивность и не забывать о важных задачах. Простой, интуитивный интерфейс и мощные возможности группировки позволяют быстро влиться в рабочий процесс.</p>
      </div>

      <div class="about-card">
        <i class="fa-solid fa-code about-icon"></i>
        <h2>Технологии</h2>
        <ul class="tech-list">
          <li><i class="fa-brands fa-vuejs"></i> Vue 3 (Composition API)</li>
          <li><i class="fa-solid fa-database"></i> Pinia для управления состоянием</li>
          <li><i class="fa-solid fa-road"></i> Vue Router</li>
          <li><i class="fa-brands fa-css3-alt"></i> Адаптивный CSS (Flexbox, Grid, clamp)</li>
          <li><i class="fa-solid fa-floppy-disk"></i> LocalStorage для хранения данных</li>
        </ul>
      </div>

      <div class="about-card">
        <i class="fa-solid fa-users about-icon"></i>
        <h2>Цели</h2>
        <p>Мы стремимся сделать управление задачами максимально приятным и эффективным. В будущем планируются напоминания, синхронизация с облаком и совместная работа над проектами.</p>
      </div>

      <div class="about-card">
        <i class="fa-solid fa-envelope about-icon"></i>
        <h2>Контакты</h2>
        <p>Вы можете связаться с разработчиком по электронной почте: <a href="mailto:support@taskflow.example">support@taskflow.example</a></p>
        <p>Репозиторий проекта: <a href="#" target="_blank">github.com/taskflow</a></p>
      </div>
    </div>
  </div>
</template>

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

.about-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.8rem;
  margin-top: 1rem;
}

.about-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(6px);
  border-radius: 32px;
  padding: 1.8rem;
  transition: all 0.25s;
  border: 1px solid rgba(164,180,148,0.4);
}

.about-card:hover {
  transform: translateY(-4px);
  background: white;
  border-color: #A4B494;
  box-shadow: 0 18px 28px -12px rgba(27,48,51,0.12);
}

.about-icon {
  font-size: 2.5rem;
  color: #507579;
  margin-bottom: 1rem;
}

.about-card h2 {
  font-size: 1.4rem;
  color: #1B3033;
  margin-bottom: 1rem;
}

.about-card p, .about-card li {
  font-size: 0.95rem;
  color: #3A5558;
  line-height: 1.5;
}

.tech-list {
  list-style: none;
  padding-left: 0;
}

.tech-list li {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tech-list i {
  width: 1.5rem;
  color: #507579;
}

.about-card a {
  color: #1B3033;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.about-card a:hover {
  color: #2A484C;
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
  }
}
</style>