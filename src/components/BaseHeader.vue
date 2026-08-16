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
    required: true,
  },
})

const router = useRouter()

const closeModal = () => {
  router.push('/') // Очищаем хэш при закрытии
}

defineEmits(['open-profile'])
</script>

<style lang="scss" scoped>
  .btn-primary {
    font-weight: 500;
    font-style: Medium;
    font-size: 14px;
    line-height: 10px;
    letter-spacing: 0%;
    text-align: center;
    background: #565EEF;
    padding: 10px 14px;
    border-radius: 4px;
    color: #FFFFFF;
  }
  
  .btn-secondary {
      font-weight: 500;
      font-style: Medium;
      font-size: 14px;
      line-height: 10px;
      letter-spacing: 0%;
      text-align: center;
      background: #FFFFFF;
      padding: 10px 20px;
      border-radius: 4px;
      color: #565EEF;
  }
</style>
