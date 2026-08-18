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

const tasks = ref(initialTasks)

const route = useRoute()
const router = useRouter()
const isNewCardOpen = ref(false)

watch(
  () => route.hash,
  (newHash) => {
    isNewCardOpen.value = newHash === '#popNewCard'
  },
  { immediate: true }
)

const closeModals = () => {
  router.push('/')
}

const handleAddTask = (newTaskData) => {
  const newTask = {
    id: tasks.value.length ? Math.max(...tasks.value.map(t => t.id)) + 1 : 1,
    topic: newTaskData.topic || 'Web Design',
    title: newTaskData.title || 'Новая задача',
    date: newTaskData.date || new Date().toLocaleDateString('ru-RU'),
    status: 'Без статуса'
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

const getThemeClass = (topic) => {
  if (topic === 'Web Design') return '_orange'
  if (topic === 'Research') return '_green'
  if (topic === 'Copywriting') return '_purple'
  return '_orange'
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
            <!-- Исправлено: добавили v-if для скелетонов и v-else для карточек -->
            <template v-if="isLoading">
              <TaskSkeleton v-for="n in 3" :key="'sk1-' + n" />
            </template>
            <template v-else>
              <Task v-for="task in tasks.filter((t) => t.status === 'Без статуса')" :key="task.id">
                <template #theme>
                  <div class="card__theme" :class="getThemeClass(task.topic)">
                    <p :class="getThemeClass(task.topic)">{{ task.topic }}</p>
                  </div>
                </template>
                <template #title
                  ><h3 class="card__title">{{ task.title }}</h3></template
                >
                <template #date>{{ task.date }}</template>
              </Task>
            </template>
          </template>
        </TaskColumn>

        <!-- 2. КОЛОНКА: НУЖНО СДЕЛАТЬ -->
        <TaskColumn>
          <template #title>НУЖНО СДЕЛАТЬ</template>
          <template #content>
            <template v-if="isLoading">
              <TaskSkeleton v-for="n in 1" :key="'sk2-' + n" />
            </template>
            <template v-else>
              <Task
                v-for="task in tasks.filter((t) => t.status === 'Нужно сделать')"
                :key="task.id"
              >
                <template #theme>
                  <div class="card__theme" :class="getThemeClass(task.topic)">
                    <p :class="getThemeClass(task.topic)">{{ task.topic }}</p>
                  </div>
                </template>
                <template #title
                  ><h3 class="card__title">{{ task.title }}</h3></template
                >
                <template #date>{{ task.date }}</template>
              </Task>
            </template>
          </template>
        </TaskColumn>

        <!-- 3. КОЛОНКА: В РАБОТЕ -->
        <TaskColumn>
          <template #title>В РАБОТЕ</template>
          <template #content>
            <template v-if="isLoading">
              <TaskSkeleton v-for="n in 3" :key="'sk3-' + n" />
            </template>
            <template v-else>
              <Task v-for="task in tasks.filter((t) => t.status === 'В работе')" :key="task.id">
                <template #theme>
                  <div class="card__theme" :class="getThemeClass(task.topic)">
                    <p :class="getThemeClass(task.topic)">{{ task.topic }}</p>
                  </div>
                </template>
                <template #title
                  ><h3 class="card__title">{{ task.title }}</h3></template
                >
                <template #date>{{ task.date }}</template>
              </Task>
            </template>
          </template>
        </TaskColumn>

        <!-- 4. КОЛОНКА: ТЕСТИРОВАНИЕ -->
        <TaskColumn>
          <template #title>ТЕСТИРОВАНИЕ</template>
          <template #content>
            <template v-if="isLoading">
              <TaskSkeleton v-for="n in 2" :key="'sk4-' + n" />
            </template>
            <template v-else>
              <Task v-for="task in tasks.filter((t) => t.status === 'Тестирование')" :key="task.id">
                <template #theme>
                  <div class="card__theme" :class="getThemeClass(task.topic)">
                    <p :class="getThemeClass(task.topic)">{{ task.topic }}</p>
                  </div>
                </template>
                <template #title
                  ><h3 class="card__title">{{ task.title }}</h3></template
                >
                <template #date>{{ task.date }}</template>
              </Task>
            </template>
          </template>
        </TaskColumn>

        <!-- 5. КОЛОНКА: ГОТОВО -->
        <TaskColumn>
          <template #title>ГОТОВО</template>
          <template #content>
            <template v-if="isLoading">
              <TaskSkeleton v-for="n in 4" :key="'sk5-' + n" />
            </template>
            <template v-else>
              <Task v-for="task in tasks.filter((t) => t.status === 'Готово')" :key="task.id">
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
          </template>
        </TaskColumn>
      </template>
    </main>

    <NewCardModal
      v-if="isNewCardOpen"
      @close="closeModals"
      @add-task="handleAddTask"
    />

    <ExitModal
      v-if="$route.hash === '#popExit'" :user="currentUser"
      @close="closeModals"
    />
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
