<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { initialTasks } from '@/mocks/tasks.js'
import { useTheme } from '@/composables/useTheme.js'

import BaseHeader from '@/components/BaseHeader.vue'
import TaskColumn from '@/components/TaskColumn.vue'
import Task from '@/components/Task.vue'
import TaskSkeleton from '@/components/TaskSkeleton.vue'
import NewCardModal from '@/components/NewCardModal.vue'
import TaskModal from '@/components/TaskModal.vue'
import ExitModal from '@/components/ExitModal.vue'
import ExitExitModal from '@/components/ExitExitModal.vue'

const tasks = ref(initialTasks)

const route = useRoute()
const router = useRouter()

const isNewCardOpen = ref(false)
const isBrowseOpen = ref(false)
const selectedTask = ref(null)
const isExitOpen = ref(false)
const isConfirmExitOpen = ref(false)

const handleLogout = () => {
  localStorage.removeItem('user')

  if (typeof closeModals === 'function') {
    closeModals()
  } else {
    router.push('/')
  }

  router.push('/login')
}

watch(
  () => [route.path, route.hash],
  ([newPath, newHash]) => {
    isNewCardOpen.value = newPath === '/new-card'
    isExitOpen.value = newPath === '/exit'
    isConfirmExitOpen.value = newPath === '/exit' && newHash === '#confirm'

    if (newPath.startsWith('/card/')) {
      const taskId = parseInt(route.params.id, 10)
      selectedTask.value = tasks.value.find((t) => t.id === taskId)
      isBrowseOpen.value = !!selectedTask.value
    } else {
      isBrowseOpen.value = false
      selectedTask.value = null
    }
  },
  { immediate: true },
)

const closeModals = () => {
  router.push('/')
}

const handleAddTask = (newTaskData) => {
  const newTask = {
    id: tasks.value.length ? Math.max(...tasks.value.map((t) => t.id)) + 1 : 1,
    topic: newTaskData.topic || 'Web Design',
    title: newTaskData.title || 'Новая задача',
    description: newTaskData.description || '',
    date: newTaskData.date || new Date().toLocaleDateString('ru-RU'),
    status: 'Без статуса',
  }

  tasks.value.push(newTask)
  closeModals()
}

const currentUser = ref({
  name: 'Ivan Ivanov',
  email: 'ivan.ivanov@gmail.com',
})

const isLoading = ref(true)
const { initTheme } = useTheme()

onMounted(() => {
  initTheme()

  setTimeout(() => {
    isLoading.value = false
  }, 3000)
})

const openTaskModal = (id) => {
  router.push(`/card/${id}`)
}

const handleUpdateTask = (updatedTask) => {
  const index = tasks.value.findIndex((t) => t.id === updatedTask.id)
  if (index !== -1) {
    tasks.value[index] = updatedTask
  }
  closeModals()
}

const handleBasketTask = (taskId) => {
  tasks.value = tasks.value.filter((t) => t.id !== taskId)
  closeModals()
}
</script>

<template>
  <div class="task-desk">
    <BaseHeader :user="currentUser" />

    <!-- Сетка колонок проекта -->
    <main class="task-desk__grid">
      <!-- СЦЕНАРИЙ 1: Загрузка завершена, но в массиве абсолютно пусто -->
      <template v-if="!isLoading && tasks.length === 0">
        <div class="task-desk__empty">
          <div class="empty-content">
            <span class="empty-icon">📂</span>
            <p>Задач нет</p>
          </div>
        </div>
      </template>

      <!-- СЦЕНАРИЙ 2: Стандартный рабочий режим (идет загрузка или выводятся карточки) -->
      <template v-else>
        <!-- 1. КОЛОНКА: БЕЗ СТАТУСА -->
        <TaskColumn>
          <template #title>БЕЗ СТАТУСА</template>
          <template #content>
            <template v-if="isLoading">
              <TaskSkeleton v-for="n in 3" :key="'sk1-' + n" />
            </template>
            <template v-else>
              <!-- Передаем объект задачи целиком в проп :task и слушаем событие @open-task -->
              <Task
                v-for="task in tasks.filter((t) => t.status === 'Без статуса')"
                :key="task.id"
                :task="task"
                @open-task="openTaskModal"
              />
            </template>
          </template>
        </TaskColumn>

        <!-- 2. КОЛОНКА: НУЖНО СДЕЛАТЬ -->
        <TaskColumn>
          <template #title>НУЖНО СДЕЛАТЬ</template>
          <template #content>
            <template v-if="isLoading">
              <TaskSkeleton v-for="n in 3" :key="'sk1-' + n" />
            </template>
            <template v-else>
              <Task
                v-for="task in tasks.filter((t) => t.status === 'Нужно сделать')"
                :key="task.id"
                :task="task"
                @open-task="openTaskModal"
              />
            </template>
          </template>
        </TaskColumn>

        <!-- 3. КОЛОНКА: В РАБОТЕ -->
        <TaskColumn>
          <template #title>В РАБОТЕ</template>
          <template #content>
            <template v-if="isLoading">
              <TaskSkeleton v-for="n in 3" :key="'sk1-' + n" />
            </template>
            <template v-else>
              <Task
                v-for="task in tasks.filter((t) => t.status === 'В работе')"
                :key="task.id"
                :task="task"
                @open-task="openTaskModal"
              />
            </template>
          </template>
        </TaskColumn>

        <!-- 4. КОЛОНКА: ТЕСТИРОВАНИЕ -->
        <TaskColumn>
          <template #title>ТЕСТИРОВАНИЕ</template>
          <template #content>
            <template v-if="isLoading">
              <TaskSkeleton v-for="n in 3" :key="'sk1-' + n" />
            </template>
            <template v-else>
              <Task
                v-for="task in tasks.filter((t) => t.status === 'Тестирование')"
                :key="task.id"
                :task="task"
                @open-task="openTaskModal"
              />
            </template>
          </template>
        </TaskColumn>

        <!-- 5. КОЛОНКА: ГОТОВО -->
        <TaskColumn>
          <template #title>ГОТОВО</template>
          <template #content>
            <template v-if="isLoading">
              <TaskSkeleton v-for="n in 3" :key="'sk1-' + n" />
            </template>
            <template v-else>
              <Task
                v-for="task in tasks.filter((t) => t.status === 'Готово')"
                :key="task.id"
                :task="task"
                @open-task="openTaskModal"
              />
            </template>
          </template>
        </TaskColumn>
      </template>
    </main>

    <NewCardModal v-if="isNewCardOpen" @close="closeModals" @add-task="handleAddTask" />

    <TaskModal
      v-if="isBrowseOpen && selectedTask"
      :task="selectedTask"
      @close="closeModals"
      @update-task="handleUpdateTask"
      @delete-task="handleBasketTask"
    />

    <ExitModal v-if="isExitOpen" :user="currentUser" @close="closeModals" />

    <ExitExitModal v-if="isConfirmExitOpen" @close="closeModals" @confirm="handleLogout" />
  </div>
</template>

<style lang="scss" scoped>
.task-desk__grid {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding: 40px 135px 40px 129px;
  overflow-x: auto;
  background: #eaeef6;
}

.task-desk__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 50vh;
  flex-grow: 1;

  .empty-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .empty-icon {
    font-size: 40px;
    opacity: 0.7;
  }

  p {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 500;
    color: #94a6be;
    margin: 0;
    letter-spacing: 0.5px;
  }
}
</style>
