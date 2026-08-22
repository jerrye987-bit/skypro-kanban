<script setup>
  defineEmits(['close', 'confirm'])
</script>

<template>
  <div class="pop-exit" id="popExit" @click="$emit('close')">
    <div class="pop-exit__container">
      <div class="pop-exit__block" @click.stop>
        <div class="pop-exit__ttl">
          <h2>Выйти из аккаунта?</h2>
        </div>
        <form class="pop-exit__form" id="formExit" @submit.prevent>
          <div class="pop-exit__form-group">
            <button
              type="button"
              class="pop-exit__exit-yes _hover01"
              id="exitYes"
              @click="$emit('confirm')"
            >
              Да, выйти
            </button>

            <button
              type="button"
              class="pop-exit__exit-no _hover03"
              id="exitNo"
              @click="$emit('close')"
            >
              Нет, остаться
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pop-exit {
  display: flex !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: auto !important;

  width: 100vw !important;
  height: 100vh !important;
  background: rgba(0, 0, 0, 0.4) !important;
  align-items: center !important;
  justify-content: center !important;

  z-index: 9999 !important;
}
.pop-exit__block {
  background-color: #ffffff !important;
  max-width: 370px !important;
  width: 100% !important;
  padding: 50px 40px !important;
  border-radius: 10px !important;
  border: 1px solid #d4dbe5 !important;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.15) !important;
  margin: 0 auto !important;
}
.pop-exit__exit-no {
  width: 153px;
  height: 30px;
  background-color: transparent;
  border-radius: 4px;
  border: 0.7px solid var(--palette-navy-60, #565eef) !important;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: #565eef;
}
.pop-exit__exit-no a {
  width: 100%;
  height: 100%;
  color: #565eef;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
