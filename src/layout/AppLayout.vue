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

const tasks = ref([])
const isLoading = ref(false)
const isSaving = ref(false)
const errorMessage = ref('')

const refreshTasks = async () => {
  if (!user.value?.token) return
  try {
    isLoading.value = true
    errorMessage.value = ''
    const data = await fetchTask({ token: user.value.token })
    if (data) tasks.value = data
  } catch (err) {
    errorMessage.value = err.message || 'Не удалось загрузить задачи с сервера.'
  } finally {
    isLoading.value = false
  }
}

const addNewTask = async (taskObj) => {
  if (!user.value?.token) return
  try {
    isSaving.value = true
    errorMessage.value = ''
    const updated = await postTask({ token: user.value.token, task: taskObj })
    if (updated) tasks.value = updated
  } catch (err) {
    errorMessage.value = err.message || 'Не удалось создать задачу.'
  } finally {
    isSaving.value = false
  }
}

const updateTaskData = async (id, taskObj) => {
  if (!user.value?.token) return
  try {
    isSaving.value = true
    errorMessage.value = ''
    const updated = await editTask({ token: user.value.token, id, task: taskObj })
    if (updated) tasks.value = updated
  } catch (err) {
    errorMessage.value = err.message || 'Не удалось обновить задачу.'
  } finally {
    isSaving.value = false
  }
}

const removeTaskById = async (id) => {
  if (!user.value?.token) return
  try {
    isSaving.value = true
    errorMessage.value = ''
    const updated = await deleteTask({ token: user.value.token, id })
    if (updated) tasks.value = updated
  } catch (err) {
    errorMessage.value = err.message || 'Не удалось удалить задачу.'
  } finally {
    isSaving.value = false
  }
}

provide('tasksStore', {
  tasks,
  isLoading,
  isSaving,
  errorMessage,
  refreshTasks,
  addNewTask,
  updateTaskData,
  removeTaskById,
})
</script>
