<template>
  <footer class="app-footer">
    <div class="footer-container">
      <!-- Верхняя часть футера с колонками -->
      <div class="footer-top">
        <!-- Колонка 1: О проекте -->
        <div class="footer-col">
          <h4 class="footer-heading">
            <i class="fa-solid fa-house-heart"></i> Милый дом
          </h4>
          <p class="footer-text">
            Уютный трекер домашних дел. Планируйте, распределяйте и выполняйте задачи вместе с близкими.
          </p>
        </div>

        <!-- Колонка 2: Навигация -->
        <div class="footer-col">
          <h4 class="footer-heading">Навигация</h4>
          <ul class="footer-links">
            <li><router-link to="/" class="footer-link"><i class="fa-solid fa-angle-right"></i> Главная</router-link></li>
            <li><router-link to="/tasks" class="footer-link"><i class="fa-solid fa-angle-right"></i> Задачи</router-link></li>
            <li><router-link to="/categories" class="footer-link"><i class="fa-solid fa-angle-right"></i> Категории</router-link></li>
            <li><router-link to="/about" class="footer-link"><i class="fa-solid fa-angle-right"></i> О проекте</router-link></li>
          </ul>
        </div>

        <!-- Колонка 3: Контакты и соцсети -->
        <div class="footer-col">
          <h4 class="footer-heading">Связь</h4>
          <ul class="footer-contacts">
            <li>
              <a href="mailto:hello@milydom.ru" class="footer-link">
                <i class="fa-solid fa-envelope"></i> hello@milydom.ru
              </a>
            </li>
            <li>
              <span class="footer-link">
                <i class="fa-solid fa-map-pin"></i> Россия, ваш город
              </span>
            </li>
          </ul>
          <div class="footer-socials">
            <a href="#" class="social-icon" aria-label="Telegram"><i class="fa-brands fa-telegram"></i></a>
            <a href="#" class="social-icon" aria-label="VK"><i class="fa-brands fa-vk"></i></a>
            <a href="#" class="social-icon" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
          </div>
        </div>
      </div>

      <!-- Нижняя полоса копирайта -->
      <div class="footer-bottom">
        <span>© {{ new Date().getFullYear() }} Милый дом. Сделано с любовью ✨</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: rgba(255, 255, 245, 0.75);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(164, 180, 148, 0.4);
  margin-top: auto;
  width: 100%;
  color: #2A484C;
}

.footer-container {
  width: 100%;
  padding: 2rem clamp(1rem, 4vw, 3rem);
}

.footer-top {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.footer-col {
  flex: 1 1 250px;
  min-width: 200px;
}

.footer-heading {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1B3033;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #3A5558;
  margin: 0;
}

.footer-links,
.footer-contacts {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-link {
  font-size: 0.9rem;
  color: #3A5558;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #1B3033;
}

.footer-link i {
  font-size: 0.8rem;
  width: 1rem;
  text-align: center;
}

.footer-socials {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.social-icon {
  font-size: 1.3rem;
  color: #507579;
  transition: color 0.2s, transform 0.2s;
}

.social-icon:hover {
  color: #1B3033;
  transform: translateY(-2px);
}

.footer-bottom {
  border-top: 1px solid rgba(164, 180, 148, 0.3);
  padding-top: 1.2rem;
  text-align: center;
  font-size: 0.8rem;
  color: #507579;
}

@media (max-width: 700px) {
  .footer-top {
    flex-direction: column;
    gap: 1.5rem;
  }
  .footer-bottom {
    text-align: center;
  }
}
</style>