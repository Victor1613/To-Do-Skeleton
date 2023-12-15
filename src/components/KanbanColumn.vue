<script setup>
import { defineProps, defineEmits } from 'vue';
import KanbanHeader from './KanbanHeader.vue';
import KanbanList from './KanbanList.vue';

const props = defineProps({
  column: Object,
  tasks: Array
});

const emit = defineEmits(['taskdropped','addtask','edittask']);

function handleDrop(event) {
  const taskId = event.dataTransfer.getData('task-id');
  emit('taskdropped', { taskId, newColumnId: props.column.id });
}

function handleAddTask(id){
  emit('addtask', { columnId: props.column.id });
}

function handleEditTask(taskId) {
  emit('edittask', taskId);
}
</script>

<template>
  <section
    v-if="column"
    class="kanban__column"
    :class="column.id"
    @dragover.prevent
    @drop="handleDrop"
    
  >
    <KanbanHeader @addtask="handleAddTask"  :column="column" />
    <KanbanList :columnId="column.id" :tasks="tasks" @edittask="handleEditTask"  />
  </section>
</template>
