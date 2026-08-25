<template>
  <div class="wrapper">
    <div class="container-404">
      <div class="modal-404">
        <div class="modal__ttl">
          <h2>Ошибка 404</h2>
        </div>
        <p class="modal__text">
          Упс! Страница, которую вы ищете, не существует или была перемещена.
        </p>

        <router-link to="/" class="modal__btn-home"> На главную </router-link>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background-color: #eaeef6;
}

.container-404 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

.modal-404 {
  background-color: #ffffff;
  max-width: 400px;
  width: 100%;
  padding: 50px 40px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  text-align: center;
}

.modal__ttl h2 {
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.6px;
  margin-bottom: 14px;
  color: #565eef; /* Сделаем заголовок фирменным цветом */
}

.modal__text {
  font-size: 14px;
  line-height: 150%;
  color: #94a6be;
  margin-bottom: 24px;
  font-family: 'Roboto', sans-serif;
}

.modal__btn-home {
  width: 100%;
  height: 36px;
  background-color: #565eef;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff !important;
  font-family: 'Roboto', sans-serif;
  text-decoration: none !important;
  transition: background 0.2s ease;

  &:hover {
    background-color: #33399b;
  }
}
</style>
