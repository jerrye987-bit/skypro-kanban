<template>
   <div class="wrapper">
      <RouterView />
   </div>
</template>

<script setup>
import { provide, ref } from 'vue'
import { RouterView } from 'vue-router'

// При старте приложения сразу проверяем localStorage,чтобы пользователь не разлогинивался при обновлении страницы (F5)
const getInitialUser = () => {
  try {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  } catch (e) {
    console.error('Ошибка чтения пользователя при старте:', e)
    return null
  }
}

const userInfo = ref(getInitialUser()) // Состояние с данными о пользователе

// Функция, которая сохраняет данные о пользователе в состояние и ЛС
function setUserInfo(value) {
   userInfo.value = value
   try {
      localStorage.setItem('user', JSON.stringify(value))
   } catch (e) {
      console.error('ошибка записи в localStorage:', e)
      return null
   }
}

// Функция, которая удаляет данные о пользователе из состояния и ЛС
function removeUserInfo() {
   userInfo.value = null
   try {
      localStorage.removeItem('user')
   } catch (e) {
      console.error('ошибка удаления из localStorage:', e)
   }
}

// Передаем наши данные во всё приложение:
// на главную страницу, на страницы входа и регистрации
provide('auth', {
   user: userInfo,
   setUser: setUserInfo,
   removeUser: removeUserInfo
})
</script>
