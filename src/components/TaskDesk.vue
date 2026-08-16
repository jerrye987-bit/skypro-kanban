<script setup>
  import { ref, onMounted } from 'vue'
  import { initialTasks } from '@/mocks/tasks.js'
  import { useTheme } from '@/composables/useTheme.js'

  import BaseHeader from '@/components/BaseHeader.vue'
  import TaskColumn from '@/components/TaskColumn.vue'
  import Task from '@/components/Task.vue'

  const tasks = ref(initialTasks)

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

    <div v-if="isLoading" class="task-desk__loader">
      <div class="loader-content">
        <div class="loader-spinner"></div>
        <!-- Простой анимированный крутилка -->
        <p>Данные загружаются...</p>
      </div>
    </div>

    <!-- Сетка колонок проекта -->
    <main v-else class="task-desk__grid">
      <!-- 1. КОЛОНКА: БЕЗ СТАТУСА -->
      <TaskColumn>
        <template #title>БЕЗ СТАТУСА</template>
        <template #content>
          <Task v-for="task in tasks.filter((t) => t.status === 'Без статуса')" :key="task.id">
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
          <Task v-for="task in tasks.filter((t) => t.status === 'Нужно сделать')" :key="task.id">
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
          <Task v-for="task in tasks.filter((t) => t.status === 'В работе')" :key="task.id">
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
          <Task v-for="task in tasks.filter((t) => t.status === 'Тестирование')" :key="task.id">
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
      </TaskColumn>
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .task-desk__grid {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding: 40px 135px 40px 129px;
  overflow-x: auto;
  background: #EAEEF6;
}

.task-desk__loader {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  min-height: calc(100vh - 80px);
  background-color: var(--bg-desk, #EAEEF6);
}

.loader-content p {
  font-size: 18px;
  font-weight: 500;
  color: var(--text-secondary, #94A6BE);
  margin: 0;
  letter-spacing: 0.5px;
  animation: pulse 1.5s infinite ease-in-out;
}

.loader-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-color, #EAEAEA);
  border-top: 4px solid #565EEF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
</style>

