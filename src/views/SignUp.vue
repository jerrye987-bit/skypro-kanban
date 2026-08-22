<template>
  <div class="wrapper">
    <div class="container-signup">
      <div class="modal">
        <div class="modal__block">
          <div class="modal__ttl">
            <h2>Регистрация</h2>
          </div>

          <form class="modal__form-login" id="formSignUp" @submit.prevent="handleSignUp">
            <input
              v-model="name"
              @input="clearFieldError"
              type="text"
              name="first-name"
              id="first-name"
              placeholder="Имя"
              autocomplete="name"
              :class="['modal__input', { 'modal__input--error': isNameInvalid }]"
            />

            <input
              v-model="email"
              @input="clearFieldError"
              type="email"
              name="login"
              id="loginReg"
              placeholder="Эл. почта"
              autocomplete="username"
              :class="['modal__input', { 'modal__input--error': isEmailInvalid }]"
            />

            <input
              v-model="password"
              @input="clearFieldError"
              type="password"
              name="password"
              id="passwordReg"
              placeholder="Пароль"
              autocomplete="new-password"
              :class="['modal__input', { 'modal__input--error': isPasswordInvalid }]"
            />

            <p v-if="errorMessage" class="modal__error">{{ errorMessage }}</p>

            <button
              type="submit"
              :disabled="isButtonDisabled"
              :class="['modal__btn-signup-ent', { '_hover01': !isButtonDisabled, 'modal__btn-signup-ent--disabled': isButtonDisabled }]"
            >
              Зарегистрироваться
            </button>

            <div class="modal__form-group modal__form-group--signup">
              <p>Уже есть аккаунт? </p>
              <router-link
                to="/login"
                style="color: rgba(148, 166, 190, 0.4) !important; text-decoration: underline !important;"
              >
                Войдите здесь
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

  const router = useRouter()

  const name = ref('')
  const email = ref('')
  const password = ref('')
  const errorMessage = ref('')

  const isValidationFailed = ref(false)

  const isNameInvalid = computed(() => {
    return isValidationFailed.value && !name.value.trim()
  })

  const isEmailInvalid = computed(() => {
    return isValidationFailed.value && !email.value.trim()
  })

  const isPasswordInvalid = computed(() => {
    return isValidationFailed.value && (!password.value.trim() || password.value.length < 6)
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

  const handleSignUp = () => {
    if (!name.value.trim() || !email.value.trim() || !password.value.trim()) {
      isValidationFailed.value = true
      errorMessage.value = 'Заполните все поля'
      return
    }

    if (password.value.length < 6) {
      isValidationFailed.value = true
      errorMessage.value = 'Пароль должен быть не менее 6 символов'
      return
    }

    localStorage.setItem('user', JSON.stringify({
      name: name.value,
      email: email.value
    }))

    router.push('/')
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
  background-color: #FFFFFF;
  max-width: 368px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 0.7px solid #D4DBE5;
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
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.modal__input--error {
  border-color: #f84242 !important;
  background-color: rgba(248, 66, 66, 0.03);
}

.modal__input::placeholder,
.modal__input::-moz-placeholder {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.28px;
  color: #94A6BE;
}

.modal__error {
  color: #f84242;
  font-size: 12px;
  margin-top: 5px;
  font-family: "Roboto", sans-serif;
  text-align: center;
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
  font-family: "Roboto", sans-serif;
  transition: all 0.2s ease;
  cursor: pointer;
}

.modal__btn-signup-ent--disabled {
  background-color: #94A6BE !important;
  color: #FFFFFF !important;
  cursor: not-allowed !important;
  pointer-events: none;
}

.modal__form-group modal__form-group--signup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
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
  font-family: "Roboto", sans-serif;
  margin: 0;
}

@media screen and (max-width: 375px) {
  .modal {
    background-color: #FFFFFF;
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
