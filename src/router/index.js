import { createRouter, createWebHistory } from 'vue-router'
import TaskDesk from '@/components/TaskDesk.vue'
import NotFoundView from '@/views/NotFound.vue'
import AppLayout from '@/layout/AppLayout.vue'
import AuthLayout from '@/layout/AuthLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 1. Группа страниц задач. Требует авторизации. Использует AppLayout/
    {
      path: '/',
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'home',
          component: TaskDesk,
        },
        {
          path: 'exit',
          name: 'exit',
          component: TaskDesk,
        },
        {
          path: 'card/:id',
          name: 'card-detail',
          component: TaskDesk,
        },
        {
          path: 'new-card',
          name: 'new-card',
          component: TaskDesk,
        },
      ],
    },
    // 2. Группа страниц авторизации. Использует AuthLayout
    {
      path: '/',
      component: AuthLayout,
      meta: { requiresGuest: true },
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth.vue'),
          props: { isSignUp: false },
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/auth.vue'),
          props: { isSignUp: true },
        },
      ],
    },
    // 3. Служебные страницы.
    {
      path: '/404',
      name: 'not-found',
      component: NotFoundView,
    },

    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('user')

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest)

  if (requiresAuth && !isAuthenticated) {
    console.warn('Доступ запрещен! Перенаправление на страницу входа.')
    next('/login')
  } else if (requiresGuest && isAuthenticated) {
    console.info('Пользователь уже авторизован. Перенаправление на главную')
    next('/')
  } else {
    next()
  }
})

export default router
