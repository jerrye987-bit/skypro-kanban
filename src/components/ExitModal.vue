<template>
  <div class="pop-exit" @click="$emit('close')">
    <div class="pop-exit__container">
      <div class="pop-exit__block pop-user-set" @click.stop>
        <button class="pop-exit__close-btn" @click="$emit('close')" style="position: absolute; top: 15px; right: 20px; background: none; border: none; font-size: 20px; cursor: pointer; color: #94A6BE;">&times;</button>
        <p class="pop-user-set__name">Ivan Ivanov</p>
        <p class="pop-user-set__mail">ivan.ivanov@gmail.com</p>
        <div class="pop-user-set__theme">
          <p>Темная тема</p>
          <input type="checkbox" class="checkbox" name="checkbox">
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
  defineEmits(['close'])
</script>

<style lang="scss" scoped>
</style>
