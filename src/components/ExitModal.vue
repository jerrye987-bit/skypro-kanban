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
          <button type="button" class="pop-exit__exit-yes">
            <a href="#" @click.prevent="$emit('close')">Выйти</a>
          </button>
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
    display: block;
    width: 213px;
    height: 205px;
    position: absolute;
    top: 41px;
    right: 0;
    z-index: 20;
  }
  .pop-exit__container {
    width: 100%;
    height: 100%;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: transparent;
  }
  .pop-exit__block {
    display: block;
    background-color: #FFFFFF;
    width: 213px;
    height: 205px;
    padding: 20px;
    border-radius: 10px;
    border: 0.7px solid #D4DBE5;
    box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  }
  .pop-exit__ttl h2 {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: -0.4px;
    margin-bottom: 20px;
  }
  .pop-exit__exit-yes {
    width: 153px;
    height: 30px;
    background-color: #565EEF;
    border-radius: 4px;
    border: 1px solid #565EEF !important;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 21px;
    font-weight: 500;
    letter-spacing: -0.14px;
    color: #FFFFFF;
    margin-right: 10px;
  }
  .pop-exit__exit-yes a {
    width: 100%;
    height: 100%;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pop-exit__exit-no {
    width: 153px;
    height: 30px;
    background-color: transparent;
    border-radius: 4px;
    border: 0.7px solid var(--palette-navy-60, #565EEF);
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 21px;
    font-weight: 500;
    letter-spacing: -0.14px;
    color: #FFFFFF;
  }
  .pop-exit__exit-no a {
    width: 100%;
    height: 100%;
    color: #565EEF;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pop-exit__form-group {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
    color: #94A6BE;
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
  .pop-user-set__theme input[type=checkbox] {
    position: relative;
    width: 24px;
    height: 13px;
    border-radius: 100px;
    background: #EAEEF6;
    outline: none;
    -webkit-appearance: none;
      -moz-appearance: none;
            appearance: none;
  }
  .pop-user-set__theme input[type=checkbox]::before {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: #94A6BE;
    transition: 0.5s;
  }
  .pop-user-set__theme input:checked[type=checkbox]::before {
    left: 12px;
  }
  .pop-user-set button {
    width: 100%;
    max-width: 72px;
    height: 30px;
    background: transparent;
    color: #565EEF;
    border-radius: 4px;
    border: 1px solid #565EEF;
  }
  .pop-user-set button a {
    color: #565EEF;
  }
</style>
