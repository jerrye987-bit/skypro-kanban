<template>
  <div class="pop-browse" id="popBrowse" @click="$emit('close')">
    <div class="pop-browse__container">
      <div class="pop-browse__block" @click.stop>
        <div class="pop-browse__content">
          <!-- Заголовок и Категория карточки -->
          <div class="pop-browse__top-block">
            <input
              v-if="isEditing"
              v-model="editedTitle"
              type="text"
              class="form-browse__input-title"
            />

            <h3 v-else class="pop-browse__ttl">{{ task?.title }}</h3>

            <div
              :class="[
                'categories__theme',
                'theme-top',
                getCategoryColorClass(task?.topic),
                '_active-category',
              ]"
            >
              <p :class="getCategoryColorClass(task?.topic)">{{ task?.topic || 'Web Design' }}</p>
            </div>
          </div>

          <!-- Блок Статуса (Колонки доски) -->
          <div class="pop-browse__status status">
            <p class="status__p subttl">Статус</p>
            <div class="status__themes">
              <template v-if="isEditing">
                <div
                  v-for="statusItem in statuses"
                  :key="statusItem"
                  :class="['status__theme', { '_active-status': editedStatus === statusItem }]"
                  @click="editedStatus = statusItem"
                >
                  <p>{{ statusItem }}</p>
                </div>
              </template>
              <template v-else>
                <div class="status__theme _gray">
                  <p class="_gray">{{ task?.status || 'Без статуса' }}</p>
                </div>
              </template>
            </div>
          </div>

          <!-- Описание задачи -->
          <div class="pop-browse__wrap">
            <form class="pop-browse__form form-browse" id="formBrowseCard" @submit.prevent>
              <div class="form-browse__block">
                <label for="textArea01" class="subttl">Описание задачи</label>
                <textarea
                  v-model="editedDescription"
                  class="form-browse__area"
                  name="text"
                  id="textArea01"
                  :readonly="!isEditing"
                  placeholder="Введите описание задачи..."
                ></textarea>
              </div>
            </form>

            <!-- Блок статического календаря -->
            <div class="pop-new-card__calendar calendar">
              <p class="calendar__ttl subttl">Даты</p>
              <div class="calendar__block">
                <div class="calendar__nav">
                  <div class="calendar__month">{{ currentMonthName }}</div>
                  <div class="nav__actions">
                    <div class="nav__action" @click="prevMonth" style="cursor: pointer;">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="11"
                        viewBox="0 0 6 11"
                      >
                        <path
                          d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z"
                        />
                      </svg>
                    </div>
                    <div class="nav__action" @click="nextMonth" style="cursor: pointer;">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="11"
                        viewBox="0 0 6 11"
                      >
                        <path
                          d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="calendar__content">
                  <div class="calendar__days-names">
                    <div class="calendar__day-name">пн</div>
                    <div class="calendar__day-name">вт</div>
                    <div class="calendar__day-name">ср</div>
                    <div class="calendar__day-name">чт</div>
                    <div class="calendar__day-name">пт</div>
                    <div class="calendar__day-name -weekend-">сб</div>
                    <div class="calendar__day-name -weekend-">вс</div>
                  </div>

                  <div class="calendar__cells">
                    <div
                      v-for="(cell, index) in calendarCells"
                      :key="index"
                      :class="[
                        'calendar__cell',
                        { '_cell-day': cell.isCurrentMonth },
                        { '_other-month': !cell.isCurrentMonth },
                        { '_active-day': isSelectedDay(cell) },
                        { '_current': isToday(cell) },
                        { '_weekend': isWeekend(cell) },
                        { '_disabled-day': cell.isCurrentMonth && isDayInPast(cell) }
                      ]"
                      :style="{ cursor: (isEditing && cell.isCurrentMonth && !isDayInPast(cell)) ? 'pointer' : 'default' }"
                       @click="isEditing && cell.isCurrentMonth && !isDayInPast(cell) ? selectDate(cell) : null"
                    >
                      {{ cell.day }}
                    </div>
                  </div>
                </div>

                <input type="hidden" id="datepick_value" value="08.09.2023" />
                <div class="calendar__period">
                  <p class="calendar__p date-end">
                    Срок исполнения:
                    <span class="date-control" style="color: black; font-weight: 500; margin-left: 4px;">
                      {{ taskDate.toLocaleDateString() }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Нижняя категория -->
          <div class="theme-down__categories theme-down">
            <p class="categories__p subttl">Категория</p>
            <div
              :class="['categories__theme', getCategoryColorClass(task?.topic), '_active-category']"
            >
              <p :class="getCategoryColorClass(task?.topic)">{{ task?.topic || 'Web Design' }}</p>
            </div>
          </div>

          <!-- БЛОК КНОПОК РЕЖИМА ПРОСМОТРА -->
          <div v-if="!isEditing" class="pop-browse__btn-browse">
            <div class="btn-group">
              <button class="btn-browse__edit _btn-bor _hover03" @click="isEditing = true">
                Редактировать задачу
              </button>
              <button
                class="btn-browse__delete _btn-bor _hover03"
                @click="$emit('delete-task', task._id)"
              >
                Удалить задачу
              </button>
            </div>
            <button class="btn-browse__close _btn-bg _hover01" @click="$emit('close')">
              Закрыть
            </button>
          </div>

          <!-- 🔘 БЛОК КНОПОК РЕЖИМА РЕДАКТИРОВАНИЯ -->
          <div v-else class="pop-browse__btn-edit">
            <div class="btn-group">
              <button class="btn-edit__edit _btn-bg _hover01" @click="saveChanges">
                Сохранить
              </button>
              <button class="btn-edit__edit _btn-bor _hover03" @click="cancelEditing">
                Отменить
              </button>
              <button
                class="btn-edit__delete _btn-bor _hover03"
                @click="$emit('delete-task', task._id)"
              >
                Удалить задачу
              </button>
            </div>
            <button
              class="btn-edit__close _btn-bg _hover01"
              @click="cancelEditing">
              <a href="#">Закрыть</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close', 'update-task', 'delete-task'])

const isEditing = ref(false)

const editedTitle = ref('')
const editedDescription = ref('')
const editedStatus = ref('')

const taskDate = ref(props.task.date ? new Date(props.task.date) : new Date())
const today = new Date()
const isDateInPast = taskDate.value.getTime() < today.getTime()

const currentYear = ref(isDateInPast ? today.getFullYear() : taskDate.value.getFullYear())
const currentMonth = ref(isDateInPast ? today.getMonth() : taskDate.value.getMonth())

const monthNames = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]

const currentMonthName = computed(() => {
  return `${monthNames[currentMonth.value]} ${currentYear.value}`
})

const calendarCells = computed(() => {
  const cells = []

  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1)
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()

  let startDayOfWeek = firstDayOfMonth.getDay()
  startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1

  const daysInPrevMonth = new Date(currentYear.value, currentMonth.value, 0).getDate()
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    cells.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      date: null
    })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      day,
      isCurrentMonth: true,
      date: new Date(currentYear.value, currentMonth.value, day)
    })
  }

  return cells
})

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const selectDate = (cell) => {
  if (!isEditing.value || !cell.isCurrentMonth) return
  taskDate.value = cell.date
}

const isSelectedDay = (cell) => {
  if (!cell.isCurrentMonth || !cell.date) return false
  return cell.date.toDateString() === taskDate.value.toDateString()
}

const isToday = (cell) => {
  if (!cell.isCurrentMonth || !cell.date) return false
  return cell.date.toDateString() === new Date().toDateString()
}

const isWeekend = (cell) => {
  if (!cell.date) return false
  const dayOfWeek = cell.date.getDay()
  return dayOfWeek === 0 || dayOfWeek === 6
}

const isDayInPast = (cell) => {
  if (!cell.date) return false

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const cellDateStart = new Date(cell.date)
  cellDateStart.setHours(0, 0, 0, 0)

  return cellDateStart.getTime() < todayStart.getTime()
}

const statuses = ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово']

watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      editedTitle.value = newTask.title || ''
      editedDescription.value = newTask.description || ''
      editedStatus.value = newTask.status || 'Без статуса'
      isEditing.value = false
    }
  },
  { immediate: true },
)

const cancelEditing = () => {
  editedTitle.value = props.props?.task?.title || ''
  editedDescription.value = props.task?.description || ''
  editedStatus.value = props.task?.status || 'Без статуса'
  taskDate.value = props.task.date ? new Date(props.task.date) : new Date()
  currentYear.value = taskDate.value.getFullYear()
  currentMonth.value = taskDate.value.getMonth()

  isEditing.value = false

  emit('close')
}

const saveChanges = () => {
  if (!editedTitle.value.trim()) return

  const safeDate = new Date(taskDate.value)
  safeDate.setHours(12, 0, 0, 0)

  emit('update-task', {
    ...props.task,
    title: editedTitle.value,
    description: editedDescription.value,
    status: editedStatus.value,
    date: safeDate.toISOString()
  })
  isEditing.value = false
}

const getCategoryColorClass = (topicName) => {
  if (!topicName) return '_orange'

  const text = topicName.toLowerCase()

  if (text.includes('web') || text.includes('design') || text.includes('дизайн')) return '_orange'
  if (text.includes('copy') || text.includes('text') || text.includes('текст')) return '_purple'
  return '_green'
}
</script>

<style lang="scss" scoped>
.pop-browse {
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 375px;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 7;
}
.pop-browse__container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
}
.pop-browse__block {
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  position: relative;
}
.pop-browse__content {
  display: block;
  text-align: left;
}
.pop-browse__content .categories__theme {
  opacity: 1;
}
.pop-browse__content .theme-down {
  display: none;
  margin-bottom: 20px;
}
.pop-browse__content .theme-top {
  display: block;
}
.pop-browse__top-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.pop-browse__ttl {
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
}
.pop-browse__wrap {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.pop-browse__form {
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;
}
.pop-browse__btn-browse,
.pop-browse__btn-edit {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
}
.pop-browse__btn-browse button,
.pop-browse__btn-edit button {
  height: 30px;
  margin-bottom: 10px;
  padding: 0 14px;
}
.pop-browse__btn-browse .btn-group button,
.pop-browse__btn-edit .btn-group button {
  margin-right: 8px;
}

.status {
  margin-bottom: 11px;
}
.status__p {
  margin-bottom: 14px;
}
.status__themes {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
}
.status__theme {
  border-radius: 24px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  color: #94a6be;
  padding: 11px 14px 10px;
  cursor: pointer;
  margin-right: 7px;
  margin-bottom: 7px;
}
.status__theme p {
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
}
._active-status {
  background-color: #94a6be !important;
  color: #ffffff !important;
  p {
    color: #ffffff !important;
  }
}

.form-browse__block {
  display: flex;
  flex-direction: column;
}
.form-browse__area {
  max-width: 370px;
  width: 100%;
  outline: none;
  padding: 14px;
  background: #eaeef6;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin-top: 14px;
  height: 200px;
}
.form-browse__area::-moz-placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  color: #94a6be;
  letter-spacing: -0.14px;
  font-family: 'Roboto', Arial, Helvetica, sans-serif !important;
}
.form-browse__area::placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  color: #94a6be;
  letter-spacing: -0.14px;
  font-family: 'Roboto', Arial, Helvetica, sans-serif !important;
}
.form-browse__input-title {
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.6px;
  width: 100%;
  padding: 6px 10px;
  border: none;
  outline: none;
  margin-bottom: 10px;
}

._btn-bor {
  border-radius: 4px;
  border: 0.7px solid var(--palette-navy-60, #565eef) !important;
  outline: none;
  background: transparent;
  color: #565eef;
}
._btn-bor a {
  color: #565eef;
}
._btn-bg {
  border-radius: 4px;
  background: #565eef;
  border: none;
  outline: none;
  color: #ffffff;
}
._btn-bg a {
  color: #ffffff;
}

._hide {
  display: none;
}
</style>
