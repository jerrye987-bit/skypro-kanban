<template>
  <div class="wrapper">
    <div class="container-signin">
      <div class="modal">
        <div class="modal__block">
          <div class="modal__ttl">
            <h2>Вход</h2>
          </div>
          <form class="modal__form-login" id="formLogIn" @submit.prevent="handleLogin">
            <input
              v-model="email"
              @input="clearFieldError"
              type="text"
              name="login"
              id="formlogin"
              placeholder="Эл. почта"
              autocomplete="username"
              :class="['modal__input', { 'modal__input--error': isEmailInvalid }]"
            />

            <input
              v-model="password"
              @input="clearFieldError"
              type="password"
              name="password"
              id="formpassword"
              placeholder="Пароль"
              autocomplete="current-password"
              :class="['modal__input', { 'modal__input--error': isPasswordInvalid }]"
            />

            <p v-if="errorMessage" class="modal__error">{{ errorMessage }}</p>

            <button
              type="submit"
              :disabled="isButtonDisabled"
              :class="[
                'modal__btn-enter',
                'idIN',
                {
                  _hover01: !isButtonDisabled,
                  'modal__btn-enter--disabled': isButtonDisabled,
                },
              ]"
            >
              Войти
            </button>

            <div class="modal__form-group modal__form-group--signin">
              <p>Нужно зарегистрироваться?</p>
              <router-link
                to="/register"
                style="
                  color: rgba(148, 166, 190, 0.4) !important;
                  text-decoration: underline !important;
                "
              >
                Зарегистрируйтесь здесь
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { signIn } from '@/services/auth.js'

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const isValidationFailed = ref(false)

const isEmailInvalid = computed(() => {
  return isValidationFailed.value && !email.value.trim()
})

const isPasswordInvalid = computed(() => {
  return isValidationFailed.value && !password.value.trim()
})

const isButtonDisabled = computed(() => {
  return isValidationFailed.value
})

const clearFieldError = () => {
  if (isValidationFailed.value) {
    isValidationFailed.value = false
    errorMessage.value = ''
  }
}

const handleLogin = async () => {
  errorMessage.value = ''
  isValidationFailed.value = false

  if (!email.value.trim() || !password.value.trim()) {
    isValidationFailed.value = true
    errorMessage.value = 'Заполните все поля'
    return
  }

  try {
    const userFromServer = await signIn({
      login: email.value.trim(),
      password: password.value.trim(),
    })

    localStorage.setItem('user', JSON.stringify(userFromServer))

    router.push('/')
  } catch (error) {
    console.error('Ошибка входа через API:', error)
    isValidationFailed.value = true
    errorMessage.value = error.message || 'Неверный логин или пароль'
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

.container-signin {
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

.modal__form-login input:first-child {
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
  margin-top: 8px;
  font-family: 'Roboto', sans-serif;
}

.modal__btn-enter {
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
  transition: background 0.2s ease;
}

.modal__btn-enter--disabled {
  background-color: #94a6be !important;
  color: #ffffff !important;
  cursor: not-allowed !important;
  pointer-events: none !important;
}

.modal__form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 20px;
  text-align: center;
}

.modal__form-group p,
.modal__form-group a {
  color: rgba(148, 166, 190, 0.4) !important;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.14px;
  font-family: 'Roboto', sans-serif;
  margin: 0;
}
.modal__form-group a,
.modal__form-group router-link {
  text-decoration: underline;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.14px;
  font-family: 'Roboto', sans-serif;
  text-decoration: underline !important;

  &:hover {
    color: #33399b !important;
  }
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
  .modal__btn-enter {
    height: 40px;
  }
}
</style>
