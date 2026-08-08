<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import TaskColumn from '@/components/TaskColumn.vue'
// import TaskModal from '@/components/TaskModal.vue'
// import NewCardModal from '@/components/NewCardModal.vue'
// import ExitModal from '@/components/ExitModal.vue'
import Task from '@/components/Task.vue'
</script>

<template>
  <div class="task-desk">
    <BaseHeader />

    <!-- Сетка колонок проекта -->
    <main class="task-desk__grid">
      <TaskColumn>
        <template #title>БЕЗ СТАТУСА</template>
        <template #content>
          <Task>
            <template #date>30.10.23</template>
          </Task>
          <Task>
            <template #theme>
              <div class="card__theme _green"><p class="_green">Research</p></div>
            </template>
            <template #title>Название задачи</template>
            <template #date>30.10.23</template>
          </Task>
          <Task />
          <Task>
            <template #theme>
              <div class="card__theme _purple"><p class="_purple">Copywriting</p></div>
            </template>
          </Task>
          <Task>
            <template #theme>
              <div class="card__theme _green"><p class="_green">Research</p></div>
            </template>
            <template #title>Название задачи</template>
            <template #date>30.10.23</template>
          </Task>
        </template>
      </TaskColumn>
      <TaskColumn>
        <template #title>НУЖНО СДЕЛАТЬ</template>
        <template #content>
          <Task>
            <template #theme>
              <div class="card__theme _green"><p class="_green">Research</p></div>
            </template>
            <template #title>Название задачи</template>
            <template #date>30.10.23</template>
          </Task>
        </template>
      </TaskColumn>
      <TaskColumn>
        <template #title>В РАБОТЕ</template>
        <template #content>
          <Task>
            <template #theme>
              <div class="card__theme _green"><p class="_green">Research</p></div>
            </template>
            <template #title>Название задачи</template>
            <template #date>30.10.23</template>
          </Task>
          <Task>
            <template #theme>
              <div class="card__theme _purple"><p class="_purple">Copywriting</p></div>
            </template>
          </Task>
          <Task />
        </template>
      </TaskColumn>
      <TaskColumn>
        <template #title>ТЕСТИРОВАНИЕ</template>
        <template #content>
          <Task>
            <template #theme>
              <div class="card__theme _green"><p class="_green">Research</p></div>
            </template>
            <template #title>Название задачи</template>
            <template #date>30.10.23</template>
          </Task>
        </template>
      </TaskColumn>
      <TaskColumn>
        <template #title>ГОТОВО</template>
        <template #content>
          <Task>
            <template #theme>
              <div class="card__theme _green"><p class="_green">Research</p></div>
            </template>
            <template #title>Название задачи</template>
            <template #date>30.10.23</template>
          </Task>
        </template>
      </TaskColumn>
    </main>

    <!-- Подключаемые модальные окна
    <TaskModal />
    <NewCardModal />
    <ExitModal /> -->
  </div>
</template>
