import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/kanban'

// Получение задач с сервера
export async function fetchTask({ token }) {
  try {
    const data = await axios.get(API_URL, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    return data.data.tasks
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message
    throw new Error(errorMessage, { cause: error })
  }
}

// Получение задачи по ID с сервера
export async function fetchTaskById({ id, token }) {
  try {
    const data = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    return data.data.task || data.data.tasks[0]
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message
    throw new Error(errorMessage, { cause: error })
  }
}

// Добавление задачи
export async function postTask({ token, task }) {
   try {

      const data = await axios.post(API_URL, task, {
         headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': '',
         },
      })

      return data.data.tasks

   } catch (error) {
      const errorMessage = error.response?.data?.error || error.message
      throw new Error(errorMessage, { cause: error})
   }
}

// Изменение задачи
export async function editTask({ token, id, task }) {
   try {
      const data = await axios.put(`${API_URL}/${id}`, task, {
         headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': '',
         },
      })

      return data.data.tasks

   } catch (error) {
      const errorMessage = error.response?.data?.error || error.message
      throw new Error(errorMessage, { cause: error })
   }
}

// Удаление задачи
export async function deleteTask({ token, id }) {
   try {
      const data = await axios.delete(`${API_URL}/${id}`, {
         headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': '',
         },
      })

      return data.data.tasks

   } catch (error) {
      const errorMessage = error.response?.data?.error || error.message
      throw new Error(errorMessage, { cause: error })
   }
}
