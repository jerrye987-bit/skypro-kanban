<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<script setup>
import { provide, ref, inject } from 'vue'
import { RouterView } from 'vue-router'
import { fetchTask, postTask, editTask, deleteTask } from '@/services/api.js'

const { user } = inject('auth')

// Блок работы с задачами
const tasks = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

// 1. Сетевое скачивание задач
const refreshTasks = async () => {
  if (!user.value?.token) return
  try {
    isLoading.value = true
    errorMessage.value = ''
    const data = await fetchTask({ token: user.value.token })
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
  if (!user.value?.token) return
  try {
    isLoading.value = true
    const updated = await postTask({ token: user.value.token, task: taskObj })
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
  if (!user.value?.token) return
  try {
    isLoading.value = true
    const updated = await editTask({ token: user.value.token, id, task: taskObj })
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
  if (!user.value?.token) return
  try {
    isLoading.value = true
    const updated = await deleteTask({ token: user.value.token, id })
    if (updated) tasks.value = updated
  } catch (err) {
    console.error('Ошибка удаления задачи через provide:', err)
    throw err
  } finally {
    isLoading.value = false
  }
}

// Передаем хранилище задач в дочерние компоненты

provide('tasksStore', {
  tasks,
  isLoading,
  errorMessage,
  refreshTasks,
  addNewTask,
  updateTaskData,
  removeTaskById,
})
</script>
