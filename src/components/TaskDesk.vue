<script setup>
import { ref, onMounted, watch, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import BaseHeader from '@/components/BaseHeader.vue'
import TaskColumn from '@/components/TaskColumn.vue'
import Task from '@/components/Task.vue'
import TaskSkeleton from '@/components/TaskSkeleton.vue'
import NewCardModal from '@/components/NewCardModal.vue'
import TaskModal from '@/components/TaskModal.vue'
import ExitModal from '@/components/ExitModal.vue'
import ExitExitModal from '@/components/ExitExitModal.vue'

const route = useRoute()
const router = useRouter()

const { user, removeUser } = inject('auth')
const { tasks, isLoading, errorMessage, refreshTasks, addNewTask, updateTaskData, removeTaskById } =
  inject('tasksStore')

const isNewCardOpen = ref(false)
const isBrowseOpen = ref(false)
const selectedTask = ref(null)
const isExitOpen = ref(false)
const isConfirmExitOpen = ref(false)
const draggedTaskId = ref(null)

const handleLogout = () => {
  closeModals()
  removeUser()
  router.push('/login')
}

watch(
  () => [route.path, route.hash],
  ([newPath, newHash]) => {
    isNewCardOpen.value = newPath === '/new-card'
    isExitOpen.value = newPath === '/exit'
    isConfirmExitOpen.value = newPath === '/exit' && newHash === '#confirm'

    if (newPath.startsWith('/card/')) {
      const taskId = route.params.id
      selectedTask.value = tasks.value.find((t) => t._id === taskId)
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

// 1. Добавление задачи
const handleAddTask = async (newTaskData) => {
  closeModals()

  const taskObj = {
    title: newTaskData.title ? String(newTaskData.title).trim() : 'Новая задача',
    topic: newTaskData.topic ? String(newTaskData.topic).trim() : 'Research',
    status: 'Без статуса',
    description:
      newTaskData.description && String(newTaskData.description).trim() !== ''
        ? String(newTaskData.description).trim()
        : 'Описание отсутствует',
    date: newTaskData.date ? new Date(newTaskData.date).toISOString() : new Date().toISOString(),
  }

  await addNewTask(taskObj)
}

const currentUser = user

onMounted(() => {
  refreshTasks()
})

// 2. Drag & Drop
const handleDragStart = (taskId) => {
  draggedTaskId.value = taskId
}

const handleDragEnd = () => {
  draggedTaskId.value = null
}

const handleDropTask = async (newStatus) => {
  if (!draggedTaskId.value) return

  const task = tasks.value.find((t) => t._id === draggedTaskId.value)
  draggedTaskId.value = null

  if (!task) return
  if (task.status === newStatus) return

  // Оптимистичное обновление — мгновенно меняем статус в UI
  task.status = newStatus

  await updateTaskData(task._id, {
    title: task.title,
    topic: task.topic,
    status: newStatus,
    description: task.description,
    date: task.date ? new Date(task.date).toISOString() : new Date().toISOString(),
  })
}

// 3. Открытие карточки по ID
const openTaskModal = (id) => {
  router.push(`/card/${id}`)
}

// 4. Редактирование задачи
const handleUpdateTask = async (updatedTask) => {
  closeModals()

  const taskObj = {
    title: updatedTask.title,
    topic: updatedTask.topic,
    status: updatedTask.status,
    description: updatedTask.description,
    date: updatedTask.date ? new Date(updatedTask.date).toISOString() : new Date().toISOString(),
  }

  await updateTaskData(updatedTask._id, taskObj)
}

// 5. Удаление задачи
const handleBasketTask = async (taskId) => {
  closeModals()

  if (!taskId) {
    console.error('Ошибка: Попытка удалить задачу с пустым ID!')
    return
  }

  await removeTaskById(taskId)
}
</script>

<template>
  <div class="task-desk">
    <BaseHeader :user="currentUser" />

    <div
      v-if="errorMessage"
      class="task-desk__error-banner"
      style="
        background-color: rgba(248, 66, 66, 0.1);
        border: 1px solid #f84242;
        color: #f84242;
        border-radius: 8px;
        padding: 12px;
        margin: 20px auto 0 auto;
        max-width: 1200px;
        text-align: center;
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
      "
    >
      {{ errorMessage }}
    </div>

    <main class="task-desk__grid">
      <!-- Пусто -->
      <template v-if="!isLoading && tasks.length === 0">
        <div class="task-desk__empty">
          <div class="empty-content">
            <span class="empty-icon">📂</span>
            <p>Задач нет</p>
          </div>
        </div>
      </template>

      <!-- Колонки -->
      <template v-else>
        <TaskColumn status="Без статуса" @drop-task="handleDropTask">
          <template #title>БЕЗ СТАТУСА</template>
          <template #content>
            <template v-if="isLoading">
              <TaskSkeleton v-for="n in 3" :key="'sk1-' + n" />
            </template>
            <template v-else>
              <Task
                v-for="task in tasks.filter((t) => t.status === 'Без статуса')"
                :key="task._id"
                :task="task"
                @open-task="openTaskModal"
                @drag-start="handleDragStart"
                @drag-end="handleDragEnd"
              />
            </template>
          </template>
        </TaskColumn>

        <TaskColumn status="Нужно сделать" @drop-task="handleDropTask">
          <template #title>НУЖНО СДЕЛАТЬ</template>
          <template #content>
            <template v-if="isLoading">
              <TaskSkeleton v-for="n in 3" :key="'sk2-' + n" />
            </template>
            <template v-else>
              <Task
                v-for="task in tasks.filter((t) => t.status === 'Нужно сделать')"
                :key="task._id"
                :task="task"
                @open-task="openTaskModal"
                @drag-start="handleDragStart"
                @drag-end="handleDragEnd"
              />
            </template>
          </template>
        </TaskColumn>

        <TaskColumn status="В работе" @drop-task="handleDropTask">
          <template #title>В РАБОТЕ</template>
          <template #content>
            <template v-if="isLoading">
              <TaskSkeleton v-for="n in 3" :key="'sk3-' + n" />
            </template>
            <template v-else>
              <Task
                v-for="task in tasks.filter((t) => t.status === 'В работе')"
                :key="task._id"
                :task="task"
                @open-task="openTaskModal"
                @drag-start="handleDragStart"
                @drag-end="handleDragEnd"
              />
            </template>
          </template>
        </TaskColumn>

        <TaskColumn status="Тестирование" @drop-task="handleDropTask">
          <template #title>ТЕСТИРОВАНИЕ</template>
          <template #content>
            <template v-if="isLoading">
              <TaskSkeleton v-for="n in 3" :key="'sk4-' + n" />
            </template>
            <template v-else>
              <Task
                v-for="task in tasks.filter((t) => t.status === 'Тестирование')"
                :key="task._id"
                :task="task"
                @open-task="openTaskModal"
                @drag-start="handleDragStart"
                @drag-end="handleDragEnd"
              />
            </template>
          </template>
        </TaskColumn>

        <TaskColumn status="Готово" @drop-task="handleDropTask">
          <template #title>ГОТОВО</template>
          <template #content>
            <template v-if="isLoading">
              <TaskSkeleton v-for="n in 3" :key="'sk5-' + n" />
            </template>
            <template v-else>
              <Task
                v-for="task in tasks.filter((t) => t.status === 'Готово')"
                :key="task._id"
                :task="task"
                @open-task="openTaskModal"
                @drag-start="handleDragStart"
                @drag-end="handleDragEnd"
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

    <ExitModal
      v-if="$route.path === '/exit' && $route.hash !== '#confirm'"
      :user="currentUser"
      @close="closeModals"
    />

    <ExitExitModal
      v-if="$route.path === '/exit' && $route.hash === '#confirm'"
      @close="router.push('/exit')"
      @confirm="handleLogout"
    />
  </div>
</template>

<style lang="scss" scoped>
.task-desk__grid {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
  width: 100%;
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
