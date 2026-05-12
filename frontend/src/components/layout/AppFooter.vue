<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <span>© {{ new Date().getFullYear() }} TaskFlow — управляйте задачами с удовольствием</span>
        <div class="footer-links">
          <span class="badge-mini">✨ Сделано с любовью</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: rgba(255, 255, 245, 0.7);
  backdrop-filter: blur(8px);
  border-top: 1px solid rgba(164, 180, 148, 0.3);
  margin-top: auto;
  width: 100%;
}

.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 1rem clamp(1rem, 4vw, 3rem);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  font-size: 0.8rem;
  color: #507579;
}

.badge-mini {
  background: rgba(80, 117, 121, 0.1);
  padding: 0.2rem 0.8rem;
  border-radius: 40px;
  font-weight: 500;
}

@media (max-width: 600px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>