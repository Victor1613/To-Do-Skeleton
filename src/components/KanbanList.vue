<script setup>
import { computed, defineProps,defineEmits } from 'vue';
import TaskItem from './TaskItem.vue';

const props = defineProps({
  tasks: Array,
  columnId: String
});

const emit = defineEmits(['edittask']);

const filteredTasks = computed(() => props.tasks.filter(task => task.columnId === props.columnId));

function handleEditTask(taskId) {
  emit('edittask', taskId);
}
</script>

<template>
  <div class="kanban__list">
    <TaskItem v-for="task in filteredTasks" :key="task.id" :task="task" @edittask="handleEditTask"/>
  </div>
</template>


<style>

.kanban__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
}
</style>
