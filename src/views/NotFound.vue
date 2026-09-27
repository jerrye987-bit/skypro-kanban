<template>
  <div class="not-found">
    <div class="not-found__card">
      <h1 class="not-found__code">404</h1>
      <p class="not-found__title">Страница не найдена</p>
      <p class="not-found__text">
        Возможно, страница была удалена или вы перешли по неверной ссылке.
      </p>
      <RouterLink to="/" class="not-found__btn _hover01">На главную</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped>
.not-found {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eaeef6;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  padding: 20px;
}

[data-theme='dark'] .not-found {
  background-color: #151419;
}

.not-found__card {
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #d4dbe5;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  max-width: 368px;
  width: 100%;
  padding: 50px 40px;
  text-align: center;
}

[data-theme='dark'] .not-found__card {
  background-color: #20202c;
  border-color: #4e5566;
}

.not-found__code {
  font-size: 72px;
  font-weight: 700;
  line-height: 1;
  color: #565eef;
  margin-bottom: 16px;
}

.not-found__title {
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.6px;
  color: #000000;
  margin-bottom: 12px;
}

[data-theme='dark'] .not-found__title {
  color: #ffffff;
}

.not-found__text {
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
  color: #94a6be;
  margin-bottom: 30px;
}

.not-found__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  background-color: #565eef;
  border-radius: 4px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.14px;
  text-decoration: none;
  transition: background-color 0.2s;
}

.not-found__btn:hover {
  background-color: #33399b;
  color: #ffffff;
}

@media screen and (max-width: 375px) {
  .not-found__card {
    max-width: 100%;
    padding: 40px 20px;
    border-radius: 0;
    border: none;
    box-shadow: none;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
