<script setup>
import { defineProps,defineEmits } from 'vue';

const props = defineProps({
  column: Object
});

const emit = defineEmits(['addtask']);

function handleAddTask(event) {
  emit('addtask', { columnId: props.column.id });
}
</script>

<template>
  <div class="kanban__header">
    <div class="kanban__header-content">
      <img :src="column.icon" :alt="`Колонка ${column.title}`" class="kanban__icon kanban__icon--column" />
      <h2 class="kanban__title">{{ column.title }}</h2>
    </div>
    <img  @click="handleAddTask" v-if="column.id !== 'done'" src="../assets/img/kanban/plus.svg" alt="Добавить задачу" class="kanban__icon kanban__icon--add" :data-column-id="column.id" />
  </div>
</template>

<style scoped>
.kanban__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.kanban__header-content {
    display: flex;
    align-items: center;
    gap: 10px;

}

.kanban__title {
    color: #2B1887;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.kanban__icon--add:hover {
    cursor: pointer;
    opacity: .5;
}
</style>