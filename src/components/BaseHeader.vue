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
          {{ user?.name || 'Гость' }}
        </button>
      </router-link>
    </nav>
  </header>
</template>

<script setup>
defineProps({
  user: {
    type: [Object, null],
    required: false,
    default: null,
  },
})
</script>

<style lang="scss" scoped>
.btn-primary {
  font-weight: 500;
  font-size: 14px;
  line-height: 10px;
  text-align: center;
  background: #565eef;
  padding: 10px 14px;
  border-radius: 4px;
  color: #ffffff;
  white-space: nowrap;
  border: none;
  cursor: pointer;
}

.btn-secondary {
  font-weight: 500;
  font-size: 14px;
  line-height: 10px;
  text-align: center;
  background: #ffffff;
  padding: 10px 20px;
  border-radius: 4px;
  color: #565eef;
  white-space: nowrap;
  border: none;
  cursor: pointer;
}

.header {
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 135px 20px 130px;
  border-bottom: 1px solid #eaeaea;
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
  gap: 20px;
  position: relative;
}

@media screen and (max-width: 768px) {
  .header {
    padding: 20px 16px;
  }
  .header__nav {
    gap: 10px;
  }
  .btn-primary {
    padding: 8px 10px;
    font-size: 12px;
  }
  .btn-secondary {
    padding: 8px 12px;
    font-size: 12px;
  }
}
</style>
