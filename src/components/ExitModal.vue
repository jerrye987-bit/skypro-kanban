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

<style lang="scss" scoped></style>
