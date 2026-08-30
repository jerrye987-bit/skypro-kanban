<template>
  <div class="wrapper">
    <div class="container-signup">
      <div class="modal">
        <div class="modal__block">
          <div class="modal__ttl">
            <h2>{{ isSignUp ? 'Регистрация' : 'Вход' }}</h2>
          </div>

          <form class="modal__form-login" id="formLogUp" @submit="handleSubmit">
            <input
              v-show="isSignUp"
              :class="['modal__input', { 'modal__input--error': errors.name }]"
              type="text"
              name="name"
              id="first-name"
              placeholder="Имя"
              v-model="formData.name"
              @focus="clearError('name')"
            />

            <input
              :class="['modal__input', { 'modal__input--error': errors.login }]"
              type="text"
              name="login"
              id="loginReg"
              placeholder="Эл. почта"
              v-model="formData.login"
              autocomplete="username"
            />

            <input
              :class="['modal__input', { 'modal__input--error': errors.password }]"
              type="password"
              name="password"
              id="passwordFirst"
              placeholder="Пароль"
              v-model="formData.password"
              @focus="clearError('password')"
              :autocomplete="isSignUp ? 'new-password' : 'current-password'"
            />

            <p v-show="error" class="modal__error">
              {{ error }}
            </p>

            <button type="submit" class="modal__btn-signup-ent _hover01">
              {{ isSignUp ? 'Зарегистрироваться' : 'Войти' }}
            </button>

            <!-- Блок переключения экранов Вход / Регистрация -->
            <div class="modal__form-group">
              <div v-if="!isSignUp">
                <p>Нужно зарегистрироваться?</p>
                <RouterLink to="/register">Регистрируйтесь здесь</RouterLink>
              </div>
              <div v-else>
                <p>
                  Уже есть аккаунт?
                  <RouterLink to="/login" class="link-inline">Войдите здесь</RouterLink>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { signIn, signUp } from '@/services/auth.js'

const { setUser } = inject('auth')

const router = useRouter()

const props = defineProps({
  isSignUp: Boolean,
})

const formData = ref({
  name: '',
  login: '',
  password: '',
})

const errors = ref({
  name: false,
  login: false,
  password: false,
})

const error = ref('')

function clearError(field) {
  errors.value[field] = false
  if (!errors.value.name && !errors.value.login && !errors.value.password) {
    error.value = ''
  }
}

function validateForm() {
  let isValid = true
  error.value = ''

  errors.value.name = false
  errors.value.login = false
  errors.value.password = false

  if (props.isSignUp && !formData.value.name.trim()) {
    errors.value.name = true
    isValid = false
  }
  if (!formData.value.login.trim()) {
    errors.value.login = true
    isValid = false
  }
  if (!formData.value.password.trim()) {
    errors.value.password = true
    isValid = false
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (formData.value.login.trim() && !emailPattern.test(formData.value.login.trim())) {
    errors.value.login = true
    error.value = 'Введите корректный адрес электронной почты (например, user@mail.ru)'
    return false
  }
  if (formData.value.password.trim() && formData.value.password.length < 6) {
    errors.value.password = true
    error.value = 'Пароль должен быть не менее 6 символов'
    return false
  }

  if (!isValid) {
    error.value = 'Пожалуйста, заполните все обязательные поля'
  }
  return isValid
}

async function handleSubmit(event) {
  event.preventDefault()

  if (!validateForm()) {
    return
  }

  try {
    const data = props.isSignUp
      ? await signUp(formData.value)
      : await signIn({ login: formData.value.login, password: formData.value.password })

    if (data) {
      setUser(data)

      router.push('/')
    }
  } catch (err) {
    error.value = err.message || 'Произошла ошибка при авторизации.'
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #eaeef6;
}

.container-signup {
  display: block;
  width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
}

._hover01:hover {
  background-color: #33399b;
}

.modal {
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal__block {
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 368px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
}

.modal__ttl h2 {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.6px;
  margin-bottom: 20px;
  color: #000000;
}

.modal__form-login {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal__form-login input:not(:last-child) {
  margin-bottom: 7px;
}

.modal__input {
  width: 100%;
  min-width: 100%;
  border-radius: 8px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  outline: none;
  padding: 10px 8px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.modal__input--error {
  border-color: #f84242 !important;
  background-color: rgba(248, 66, 66, 0.03);
}

.modal__input::placeholder,
.modal__input::-moz-placeholder {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.28px;
  color: #94a6be;
}

.modal__error {
  color: #f84242;
  font-size: 12px;
  margin-top: 10px;
  font-family: 'Roboto', sans-serif;
  text-align: center;
}

.modal__btn-signup-ent {
  width: 100%;
  height: 30px;
  background-color: #565eef;
  border-radius: 4px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
  transition: all 0.2s ease;
  cursor: pointer;
}

.modal__btn-signup-ent--disabled {
  background-color: #94a6be !important;
  color: #ffffff !important;
  cursor: not-allowed !important;
  pointer-events: none;
}

.modal__form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 10px;
  text-align: center;
}

.modal__form-group p {
  color: #94a6be !important;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.14px;
  font-family: 'Roboto', sans-serif;
  margin: 0;
  text-decoration: none !important;
}

.modal__form-group a {
  color: #94a6be !important;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.14px;
  font-family: 'Roboto', sans-serif;
  text-decoration: underline !important;
}

.modal__form-group .link-inline {
  color: #94a6be !important;
  text-decoration: underline !important;
  display: inline !important;
  margin-left: 4px !important;
}

@media screen and (max-width: 375px) {
  .modal {
    background-color: #ffffff;
  }
  .modal__block {
    max-width: 368px;
    width: 100%;
    padding: 0 16px;
    border-radius: 0;
    border: none;
    box-shadow: none;
  }
  .modal__btn-signup-ent {
    height: 40px;
  }
}
</style>
