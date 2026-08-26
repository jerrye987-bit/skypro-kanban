import { createRouter, createWebHistory } from 'vue-router'
import TaskDesk from '@/components/TaskDesk.vue'
import SignInView from '@/views/SignIn.vue'
import SignUpView from '@/views/SignUp.vue'
import NotFoundView from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TaskDesk,
      meta: { requiresAuth: true },
      children: [
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
    {
      path: '/login',
      name: 'login',
      component: SignInView,
      meta: { requiresGuest: true },
    },

    {
      path: '/register',
      name: 'register',
      component: SignUpView,
      meta: { requiresGuest: true },
    },

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
