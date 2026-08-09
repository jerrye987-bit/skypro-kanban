import { createRouter, createWebHistory } from 'vue-router'
import TaskDesk from '@/components/TaskDesk.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TaskDesk
    }
  ],
})

export default router
