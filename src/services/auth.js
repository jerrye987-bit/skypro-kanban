import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/user'

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
    const errorMessage = error.response?.data?.error || error.message
    throw new Error(errorMessage, { cause: error })
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
    const errorMessage = error.response?.data?.error || error.message
    throw new Error(errorMessage, { cause: error })
  }
}
