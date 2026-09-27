<template>
  <div class="wrapper">
    <div class="container-signup">
      <div class="modal">
        <div class="modal__block">
          <div class="modal__ttl">
            <h2>{{ isSignUp ? 'Регистрация' : 'Вход' }}</h2>
          </div>

          <form class="modal__form-login" id="formLogUp" @submit.prevent="handleSubmit">
            <input
              v-show="isSignUp"
              :class="['modal__input', { 'modal__input--error': errors.name }]"
              type="text"
              name="name"
              id="first-name"
              placeholder="Имя"
              v-model.trim="formData.name"
              @focus="clearError('name')"
            />

            <input
              :class="['modal__input', { 'modal__input--error': errors.login }]"
              type="text"
              name="login"
              id="loginReg"
              placeholder="Эл. почта"
              v-model.trim="formData.login"
              autocomplete="username"
              @focus="clearError('login')"
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

            <div class="modal__form-group">
              <div v-if="!isSignUp">
                <p>Нужно зарегистрироваться?</p>
                <RouterLink to="/register" @click="clearAllErrors"
                  >Регистрируйтесь здесь</RouterLink
                >
              </div>
              <div v-else>
                <p>
                  Уже есть аккаунт?
                  <RouterLink to="/login" class="link-inline" @click="clearAllErrors"
                    >Войдите здесь</RouterLink
                  >
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

function clearAllErrors() {
  error.value = ''
  errors.value.name = false
  errors.value.login = false
  errors.value.password = false
}

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

  if (props.isSignUp && !formData.value.name) {
    errors.value.name = true
    isValid = false
  }

  if (!formData.value.login) {
    errors.value.login = true
    isValid = false
  }

  if (!formData.value.password.trim()) {
    errors.value.password = true
    isValid = false
  }

  if (!isValid) {
    error.value = 'Пожалуйста, заполните все обязательные поля'
    return false
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(formData.value.login)) {
    errors.value.login = true
    error.value = 'Введите корректный адрес электронной почты (например, user@mail.ru)'
    return false
  }

  if (formData.value.password.trim().length < 6) {
    errors.value.password = true
    error.value = 'Пароль должен быть не менее 6 символов'
    return false
  }

  return true
}

async function handleSubmit() {
  if (!validateForm()) {
    return
  }

  try {
    const payload = props.isSignUp
      ? {
          name: formData.value.name,
          login: formData.value.login,
          password: formData.value.password.trim(),
        }
      : { login: formData.value.login, password: formData.value.password.trim() }

    const data = props.isSignUp ? await signUp(payload) : await signIn(payload)

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
  background-color: #EAEEF6;
}

.container-signup {
  display: block;
  width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
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
  background-color: #FFFFFF;
  max-width: 368px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 1px solid #D4DBE5;
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
.modal__form-login input:first-child {
  margin-bottom: 7px;
}
.modal__input {
  width: 100%;
  min-width: 100%;
  border-radius: 8px;
  border: 1px solid rgba(148, 166, 190, 0.4);
  outline: none;
  padding: 10px 8px;
  background: transparent;
  color: #000000;
  margin-bottom: 7px;
}
.modal__input::placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.28px;
  color: #94A6BE;
}
.modal__input--error {
  border-color: #FF6D6D !important;
}
.modal__btn-signup-ent {
  width: 100%;
  height: 30px;
  background-color: #565EEF;
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
  color: #FFFFFF;
  cursor: pointer;
}
.modal__form-group {
  text-align: center;
}
.modal__form-group p,
.modal__form-group a {
  color: #94A6BE;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.14px;
}
.modal__form-group a {
  text-decoration: underline;
}
.link-inline {
  color: #565EEF;
}
.modal__error {
  color: #FF6D6D;
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 10px;
  text-align: center;
}

@media screen and (max-width: 375px) {
  .modal__block {
    max-width: 368px;
    width: 100%;
    padding: 0 16px;
    border: none;
    box-shadow: none;
  }
  .modal__btn-signup-ent {
    height: 40px;
  }
}
</style>

<style lang="scss">
[data-theme='dark'] .wrapper {
  background-color: #151419;
}
[data-theme='dark'] .modal__block {
  background-color: #20202C;
  border: 1px solid #4E5566;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.4);
}
[data-theme='dark'] .modal__ttl h2 {
  color: #FFFFFF;
}
[data-theme='dark'] .modal__input {
  background: #151419;
  color: #FFFFFF;
  border: 1px solid rgba(148, 166, 190, 0.4);
}
[data-theme='dark'] .modal__input::placeholder {
  color: #94A6BE;
}
[data-theme='dark'] .modal__form-group p {
  color: #94A6BE;
}
[data-theme='dark'] .modal__form-group a,
[data-theme='dark'] .link-inline {
  color: #565EEF;
}
[data-theme='dark'] .modal__error {
  color: #FF6D6D;
}
</style>
