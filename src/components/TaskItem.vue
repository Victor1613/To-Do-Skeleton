<script setup>
import ComplexityDots from "./ComplexityDots.vue";
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  task: Object
});

const emit = defineEmits(['dragstart', 'dragend', 'edittask']);

function handleDragStart(event) {
  event.dataTransfer.setData('task-id', props.task.id);
  emit('dragstart', props.task);
}

function handleDragEnd(event) {
  emit('dragend');
}

function editTask() {
  emit('edittask', props.task.id);
}
</script>

<template>
  <div
    class="task-item"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <h3 class="task-item__title">{{ task.title }}</h3>
    <p class="task-item__description">{{ task.description }}</p>
    <div class="task-item__info">
      <ComplexityDots :dueDate="task.dueDate" />
      <div class="task-item__client">{{ task.dueDate }}</div>
    </div>
    <button class="task-item__edit-button" @click="editTask">изменить</button>
  </div>
</template>

<style scoped>
.task-item {
  background-color: #f4f2ff;
  border-radius: 10px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: relative;
}

.task-item__info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.task-item__title {
  flex-grow: 1;
  font-weight: 600;
  color: #333;
}

.task-item__description {
  color: gray;
  font-size: 12px;
  margin: 10px 0;
}

.task-item__client {
  font-size: 14px;
  color: #4f46e5;
  text-align: center;
}

.task-item__edit-button {
  cursor: pointer;
  background: none;
  border: none;
  position: absolute;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  right: 15px;
  top: 15px;
}
</style>
