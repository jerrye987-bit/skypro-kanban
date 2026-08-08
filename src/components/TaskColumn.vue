<template>
  <section class="task-column">
    <h2 class="task-column__title">
      <slot name="title">По умолчанию</slot>
    </h2>
    <div class="cards">
      <slot name="content"></slot>
      <!-- Здесь будут дублироваться другие компоненты Task -->
    </div>
  </section>
</template>

<script setup>
// import Task from '@/components/Task.vue'
</script>

<style lang="scss" scoped></style>
