<template>
  <div class="pop-exit" @click="$emit('close')">
    <div class="pop-exit__container">
      <div class="pop-exit__block pop-user-set" @click.stop>
        <button
          class="pop-exit__close-btn"
          @click="$emit('close')"
          style="
            position: absolute;
            top: 5px;
            right: -15px;
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #94a6be;
          "
        >
          &times;
        </button>

        <p class="pop-user-set__name">{{ user.name }}</p>
        <p class="pop-user-set__mail">{{ user.email }}</p>

        <div class="pop-user-set__theme">
          <p>Темная тема</p>
          <input
            :checked="isDark"
            @change="toggleTheme"
            type="checkbox"
            class="checkbox"
            name="checkbox"
          />
        </div>

        <div class="pop-exit__form-group">
          <router-link to="/exit#confirm" custom v-slot="{ navigate }">
            <button @click="navigate" class="pop-user-set__btn _hover03">
              Выйти
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme.js'

defineProps({
  user: {
    type: Object,
    required: true,
  },
})

defineEmits(['close'])

const { isDark, toggleTheme } = useTheme()
</script>

<style lang="scss" scoped>
.pop-user-set__name {
  color: #000;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 4px;
  padding-top: 10px;
  text-align: center;
}
.pop-user-set__mail {
  color: #94a6be;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 10px;
  text-align: center;
}
.pop-user-set__theme {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-right: 12px;
  margin-left: 12px;
}
.pop-user-set__theme p {
  color: #000;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
}
.pop-user-set__theme input[type='checkbox'] {
  position: relative;
  width: 24px;
  height: 13px;
  border-radius: 100px;
  background: #eaeef6;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.pop-user-set__theme input[type='checkbox']::before {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: #94a6be;
  transition: 0.5s;
}
.pop-user-set__theme input:checked[type='checkbox']::before {
  left: 12px;
}
.pop-user-set button {
  width: 100%;
  max-width: 72px;
  height: 30px;
  background: transparent;
  color: #565eef;
  border-radius: 4px;
  border: 1px solid #565eef;
}
.pop-user-set button a {
  color: #565eef;
}
</style>
