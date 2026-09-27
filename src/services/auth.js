import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/user'

function getErrorMessage(error) {
  if (error.response) {
    return error.response.data?.error || 'Ошибка сервера. Попробуйте позже.'
  }
  if (error.request) {
    return 'Сервер недоступен. Проверьте подключение к интернету и попробуйте снова.'
  }
  return error.message || 'Произошла неизвестная ошибка.'
}

// Функция авторизации пользователя
export async function signIn(userData) {
  try {
    const data = await axios.post(API_URL + '/login', userData, {
      headers: {
        'Content-Type': '',
      },
    })
    return data.data.user
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: error })
  }
}

// Функция регистрации пользователя
export async function signUp(userData) {
  try {
    const data = await axios.post(API_URL, userData, {
      headers: {
        'Content-Type': '',
      },
    })
    return data.data.user
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: error })
  }
}
