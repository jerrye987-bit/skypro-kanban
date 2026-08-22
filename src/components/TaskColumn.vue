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

<style lang="scss" scoped>
.task-column__title {
  font-weight: 600;
  font-style: SemiBold;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  vertical-align: middle;
  text-transform: uppercase;
  color: #94a6be;
  padding-bottom: 20px;
}
</style>
