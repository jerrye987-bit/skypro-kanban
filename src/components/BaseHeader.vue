<template>
  <header class="header">
    <div class="header__logo">
      <img src="/assets/images/logo.png" alt="Логотип" class="header__logo-img" />
    </div>
    <nav class="header__nav">
      <button class="btn-primary">Создать новую задачу</button>
      <button class="btn-secondary">
        <a href="#popExit">Ivan Ivanov</a>
      </button>
    </nav>
  </header>
</template>

<script setup>
  defineEmits(['open-profile'])
</script>

<style lang="scss" scoped></style>
