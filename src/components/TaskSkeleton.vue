<template>
  <!-- Используем те же классы-оболочки, что и у настоящей карточки Task.vue -->
  <div class="cards__item">
    <div class="cards__card card skeleton-pulse">
      <div class="card__group">
        <div class="skeleton-block badge"></div>
        <div class="skeleton-block dots"></div>
      </div>

      <div class="card__content">
        <div class="skeleton-block title-line main"></div>
        <div class="skeleton-block title-line short"></div>

        <div class="card__date">
          <div class="skeleton-block date-box"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.skeleton-pulse {
  animation: skeleton-blink 1.3s infinite ease-in-out;
  cursor: wait;
}

.skeleton-block {
  background-color: #eaeef6;
  border-radius: 4px;
  display: inline-block;

  &.badge {
    width: 80px;
    height: 22px;
    border-radius: 24px;
  }

  &.dots {
    width: 20px;
    height: 6px;
    border-radius: 4px;
  }

  &.title-line {
    height: 14px;
    margin-top: 4px;
    margin-bottom: 4px;
    display: block;

    &.main {
      width: 100%;
    }
    &.short {
      width: 60%;
    }
  }

  &.date-box {
    width: 90px;
    height: 14px;
    margin-top: 8px;
  }
}

@keyframes skeleton-blink {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
}
</style>
