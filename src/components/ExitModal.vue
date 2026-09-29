<template>
  <div class="pop-exit" @click="$emit('close')">
    <div class="pop-exit__container">
      <div class="pop-exit__block pop-user-set" @click.stop>
        <button class="pop-exit__close-btn" @click="$emit('close')">&times;</button>

        <p class="pop-user-set__name">{{ user.name }}</p>
        <p class="pop-user-set__mail">{{ user.login }}</p>

        <div class="pop-user-set__theme">
          <p>Темная тема</p>
          <input
            :checked="isDark"
            @change="toggleTheme()"
            type="checkbox"
            class="checkbox"
            name="checkbox"
          />
        </div>

        <div class="pop-exit__form-group">
          <router-link to="/exit#confirm" custom v-slot="{ navigate }">
            <button @click="navigate" class="pop-user-set__btn _hover03">Выйти</button>
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
.pop-exit {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}

.pop-exit__container {
  width: 100%;
  height: 100%;
  display: block;
  background: transparent;
}

.pop-exit__block {
  position: absolute;
  top: 61px;
  right: 130px;
  margin: 0;
  background-color: #ffffff;
  max-width: 213px;
  width: 100%;
  padding: 34px;
  border-radius: 10px;
  border: 1px solid #eaeaea;
  box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);
  text-align: center;
}

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
  background-color: #565eef;
}
.pop-user-set__btn {
  width: 100%;
  max-width: 72px;
  height: 30px;
  background: #565eef;
  color: #ffffff;
  border-radius: 4px;
  border: 1px solid #565eef;
}
.pop-user-set__btn:hover {
  background: #565eef;
  color: #ffffff;
}
.pop-user-set button a {
  color: #565eef;
}

.pop-exit__close-btn {
  position: absolute;
  top: 5px;
  right: 15px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #94a6be;
}

@media screen and (max-width: 768px) {
  .pop-exit__block {
    right: 16px;
  }
}
</style>
