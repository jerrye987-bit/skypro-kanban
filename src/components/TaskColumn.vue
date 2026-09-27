<template>
  <section class="task-column">
    <h2 class="task-column__title">
      <slot name="title">По умолчанию</slot>
    </h2>
    <div
      class="cards"
      :class="{ 'cards--drag-over': isDragOver }"
      @dragover.prevent="onDragOver"
      @dragleave="onDragLeave"
      @drop.prevent="onDrop"
    >
      <slot name="content"></slot>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['drop-task'])

const isDragOver = ref(false)

const onDragOver = (e) => {
  e.dataTransfer.dropEffect = 'move'
  isDragOver.value = true
}

const onDragLeave = (e) => {
  if (!e.currentTarget.contains(e.relatedTarget)) {
    isDragOver.value = false
  }
}

const onDrop = () => {
  isDragOver.value = false
  emit('drop-task', props.status)
}
</script>

<style lang="scss" scoped>
.task-column__title {
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  text-transform: uppercase;
  color: #94a6be;
  padding-bottom: 20px;
}

.cards {
  min-height: 60px;
  border-radius: 10px;
  padding: 4px;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.cards--drag-over {
  background-color: rgba(86, 94, 239, 0.06);
  border: 2px dashed #565eef;
}
</style>

<style lang="scss">
[data-theme='dark'] .cards--drag-over {
  background-color: rgba(86, 94, 239, 0.12);
  border-color: #565eef;
}
</style>
