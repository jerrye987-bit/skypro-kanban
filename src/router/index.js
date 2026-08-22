import { createRouter, createWebHistory } from 'vue-router'
import TaskDesk from '@/components/TaskDesk.vue'
import SignInView from '@/views/SignIn.vue'
import SignUpView from '@/views/SignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TaskDesk,
    },
    {
      path: '/login',
      name: 'login',
      component: SignInView,
    },

    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
    },
  ],
})

export default router
