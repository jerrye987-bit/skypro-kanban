<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { initialTasks } from '@/mocks/tasks.js'

import BaseHeader from '@/components/BaseHeader.vue'
import TaskColumn from '@/components/TaskColumn.vue'
// import TaskModal from '@/components/TaskModal.vue'
// import NewCardModal from '@/components/NewCardModal.vue'
import ExitModal from '@/components/ExitModal.vue'
import Task from '@/components/Task.vue'

const tasks = ref(initialTasks)
const route = useRoute()
const router = useRouter()
const isProfileOpen = ref(false)

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 3000)
})

watch(
  () => route.hash,
  (newHash) => {
    if (newHash === '#popExit') {
      isProfileOpen.value = true
    } else {
      isProfileOpen.value = false
    }
  },
  { immediate: true }
)

const closeAllModals = () => {
  router.push('/')
}

const getThemeClass = (topic) => {
  if (topic === 'Web Design') return '_orange'
  if (topic === 'Research') return '_green'
  if (topic === 'Copywriting') return '_purple'
  return '_orange'
}
</script>

<template>
  <div class="task-desk">
    <BaseHeader />

    <div v-if="isLoading" class="task-desk__loader">
      <div class="loader-content">
        <div class="loader-spinner"></div> <!-- Простой анимированный крутилка -->
        <p>Данные загружаются...</p>
      </div>
    </div>

    <!-- Сетка колонок проекта -->
    <main v-else class="task-desk__grid">

      <!-- 1. КОЛОНКА: БЕЗ СТАТУСА -->
      <TaskColumn>
        <template #title>БЕЗ СТАТУСА</template>
        <template #content>
          <Task
            v-for="task in tasks.filter(t => t.status === 'Без статуса')"
            :key="task.id"
          >
            <template #theme>
              <div class="card__theme" :class="getThemeClass(task.topic)">
                <p :class="getThemeClass(task.topic)">{{ task.topic }}</p>
              </div>
            </template>
            <template #title>
              <h3 class="card__title">{{ task.title }}</h3>
            </template>
            <template #date>{{ task.date }}</template>
          </Task>
        </template>
      </TaskColumn>

      <!-- 2. КОЛОНКА: НУЖНО СДЕЛАТЬ -->
      <TaskColumn>
        <template #title>НУЖНО СДЕЛАТЬ</template>
        <template #content>
          <Task
            v-for="task in tasks.filter(t => t.status === 'Нужно сделать')"
            :key="task.id"
          >
            <template #theme>
              <div class="card__theme" :class="getThemeClass(task.topic)">
                <p :class="getThemeClass(task.topic)">{{ task.topic }}</p>
              </div>
            </template>
            <template #title>
              <h3 class="card__title">{{ task.title }}</h3>
            </template>
            <template #date>{{ task.date }}</template>
          </Task>
        </template>
      </TaskColumn>

      <!-- 3. КОЛОНКА: В РАБОТЕ -->
      <TaskColumn>
        <template #title>В РАБОТЕ</template>
        <template #content>
          <Task
            v-for="task in tasks.filter(t => t.status === 'В работе')"
            :key="task.id"
          >
            <template #theme>
              <div class="card__theme" :class="getThemeClass(task.topic)">
                <p :class="getThemeClass(task.topic)">{{ task.topic }}</p>
              </div>
            </template>
            <template #title>
              <h3 class="card__title">{{ task.title }}</h3>
            </template>
            <template #date>{{ task.date }}</template>
          </Task>
        </template>
      </TaskColumn>

      <!-- 4. КОЛОНКА: ТЕСТИРОВАНИЕ -->
      <TaskColumn>
        <template #title>ТЕСТИРОВАНИЕ</template>
        <template #content>
          <Task
            v-for="task in tasks.filter(t => t.status === 'Тестирование')"
            :key="task.id"
          >
            <template #theme>
              <div class="card__theme" :class="getThemeClass(task.topic)">
                <p :class="getThemeClass(task.topic)">{{ task.topic }}</p>
              </div>
            </template>
            <template #title>
              <h3 class="card__title">{{ task.title }}</h3>
            </template>
            <template #date>{{ task.date }}</template>
          </Task>
        </template>
      </TaskColumn>

      <!-- 5. КОЛОНКА: ГОТОВО -->
      <TaskColumn>
        <template #title>ГОТОВО</template>
        <template #content>
          <Task
            v-for="task in tasks.filter(t => t.status === 'Готово')"
            :key="task.id"
          >
            <template #theme>
              <div class="card__theme" :class="getThemeClass(task.topic)">
                <p :class="getThemeClass(task.topic)">{{ task.topic }}</p>
              </div>
            </template>
            <template #title>
              <h3 class="card__title_completed">{{ task.title }}</h3>
            </template>
            <template #date>{{ task.date }}</template>
          </Task>
        </template>
      </TaskColumn>

    </main>

    <!-- Подключаемые модальные окна -->
    <ExitModal v-if="isProfileOpen" @close="closeAllModals" />
  </div>
</template>
