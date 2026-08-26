<template>
  <header class="header">
    <div class="header__logo">
      <img src="/assets/images/logo.png" alt="Логотип" class="header__logo-img" />
    </div>
    <nav class="header__nav">
      <router-link to="/new-card" custom v-slot="{ navigate }">
        <button @click="navigate" class="btn-primary _hover01" id="btnMainNewCard">
          Создать новую задачу
        </button>
      </router-link>
      <router-link to="/exit" custom v-slot="{ navigate }">
        <button class="btn-secondary" @click="navigate">
          {{ user.name }}
        </button>
      </router-link>
      <ExitModal v-if="$route.hash === '#user-set-target'" :user="user" @close="closeModal" />
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
  router.push({ hash: '' })
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
  background: #565eef;
  padding: 10px 14px;
  border-radius: 4px;
  color: #ffffff;
}

.btn-secondary {
  font-weight: 500;
  font-style: Medium;
  font-size: 14px;
  line-height: 10px;
  letter-spacing: 0%;
  text-align: center;
  background: #ffffff;
  padding: 10px 20px;
  border-radius: 4px;
  color: #565eef;
}
</style>
