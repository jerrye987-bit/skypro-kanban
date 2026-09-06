<script setup>
import { provide, ref } from 'vue'
import { RouterView } from 'vue-router'

const getInitialUser = () => {
  try {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  } catch (e) {
    console.error('Ошибка чтения пользователя при старте:', e)
    return null
  }
}

const userInfo = ref(getInitialUser())

function setUserInfo(value) {
  userInfo.value = value
  try {
    localStorage.setItem('user', JSON.stringify(value))
  } catch (e) {
    console.error('Ошибка записи в localStorage:', e)
  }
}

function removeUserInfo() {
  userInfo.value = null
  try {
    localStorage.removeItem('user')
  } catch (e) {
    console.error('Ошибка удаления из localStorage:', e)
  }
}

provide('auth', {
  user: userInfo,
  setUser: setUserInfo,
  removeUser: removeUserInfo,
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
