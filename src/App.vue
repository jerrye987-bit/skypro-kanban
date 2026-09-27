<script setup>
import { provide, ref } from 'vue'
import { RouterView } from 'vue-router'

const userInfo = ref(JSON.parse(localStorage.getItem('user') || 'null'))

function setUser(value) {
  userInfo.value = value
  localStorage.setItem('user', JSON.stringify(value))
}

function removeUser() {
  userInfo.value = null
  localStorage.removeItem('user')
}

provide('auth', {
  user: userInfo,
  setUser: setUser,
  removeUser: removeUser,
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
