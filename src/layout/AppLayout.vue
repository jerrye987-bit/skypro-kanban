<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<script setup>
import { provide, ref } from 'vue'
import { RouterView } from 'vue-router'
import { fetchTask, postTask, editTask, deleteTask } from '@/services/api.js'

// Блок авторизации
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
  tasks.value = []
  try {
    localStorage.removeItem('user')
  } catch (e) {
    console.error('ошибка удаления из localStorage:', e)
  }
}

// Блок работы с задачами
const tasks = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

// 1. Сетевое скачивание задач
const refreshTasks = async () => {
  if (!userInfo.value?.token) return
  try {
    isLoading.value = true
    errorMessage.value = ''
    const data = await fetchTask({ token: userInfo.value.token })
    if (data) tasks.value = data
  } catch (err) {
    errorMessage.value = err.message || 'Не удалось загрузить задачи с сервера.'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

// 2. Сетевое добавление задачи
const addNewTask = async (taskObj) => {
  if (!userInfo.value?.token) return
  try {
    isLoading.value = true
    const updated = await postTask({ token: userInfo.value.token, task: taskObj })
    if (updated) tasks.value = updated
  } catch (err) {
    console.error('Ошибка создания задачи через provide:', err)
    throw err
  } finally {
    isLoading.value = false
  }
}

// 3. Сетевое редактирование задачи
const updateTaskData = async (id, taskObj) => {
  if (!userInfo.value?.token) return
  try {
    isLoading.value = true
    const updated = await editTask({ token: userInfo.value.token, id, task: taskObj })
    if (updated) tasks.value = updated
  } catch (err) {
    console.error('Ошибка обновления задачи через provide:', err)
    throw err
  } finally {
    isLoading.value = false
  }
}

// 4. Сетевое удаление задачи
const removeTaskById = async (id) => {
  if (!userInfo.value?.token) return
  try {
    isLoading.value = true
    const updated = await deleteTask({ token: userInfo.value.token, id })
    if (updated) tasks.value = updated
  } catch (err) {
    console.error('Ошибка удаления задачи через provide:', err)
    throw err
  } finally {
    isLoading.value = false
  }
}

// Передаем наши данные и сценарии работы во всё приложение

provide('auth', {
  user: userInfo,
  setUser: setUserInfo,
  removeUser: removeUserInfo,
})

provide('tasksStore', {
  tasks,
  isLoading,
  errorMessage,
  refreshTasks,
  addNewTask,
  updateTaskData,
  removeTaskById
})
</script>
