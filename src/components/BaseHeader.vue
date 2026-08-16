<template>
  <header class="header">
    <div class="header__logo">
      <img src="/assets/images/logo.png" alt="Логотип" class="header__logo-img" />
    </div>
    <nav class="header__nav">
      <button class="btn-primary">Создать новую задачу</button>
      <button class="btn-secondary">
        <a href="#popExit">{{ user.name }}</a>
      </button>
      <ExitModal v-if="$route.hash === '#popExit'" :user="user" @close="closeModal" />
    </nav>
  </header>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import ExitModal from '@/components/ExitModal.vue'

  defineProps({
  user: {
    type: Object,
    required: true
  }
})

  const router = useRouter()

  const closeModal = () => {
    router.push('/') // Очищаем хэш при закрытии
  }

  defineEmits(['open-profile'])
</script>

<style lang="scss" scoped></style>
