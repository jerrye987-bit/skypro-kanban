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
      <ExitModal v-if="$route.path === '/exit'" :user="user" @close="closeModal" />
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
  router.push('/')
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
  white-space: nowrap;
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
  white-space: nowrap;
}

.header {
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 135px 20px 130px;
  background-color: #ffffff;
  border-bottom: 1px solid #eaeaea;
}
.header__block {
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 10px;
}
.header__logo img {
  width: 85px;
}
.header__nav {
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.header__btn-main-new {
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: #565eef;
  color: #ffffff;
  border: none;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  margin-right: 20px;
}
.header__btn-main-new a {
  color: #ffffff;
}

.header__user {
  height: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: #565eef;
}
.header__user::after {
  content: '';
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 1px;
  border-left: 1.9px solid #565eef;
  border-bottom: 1.9px solid #565eef;
  transform: rotate(-45deg);
  margin: -6px 0 0 5px;
  padding: 0;
}
.header__pop-user-set {
  display: none;
  position: absolute;
  top: 61px;
  right: 0;
  width: 213px;
  height: 205px;
  border-radius: 10px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  background: #fff;
  box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);
  padding: 34px;
  text-align: center;
  z-index: 2;
}
</style>
