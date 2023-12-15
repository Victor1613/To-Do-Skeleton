<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  dueDate: String
});

function getComplexityClass(taskDate) {
  const currentDate = new Date();
  const dueDate = new Date(taskDate);
  const timeDiff = dueDate.getTime() - currentDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (daysDiff <= 7) {
    return {
      tag: 'complexity__dot--high',
      length: 3,
    };
  } 
   if (daysDiff <= 14) {
    return {
      tag: 'complexity__dot--medium',
      length: 2,
    };
  } 
    return {
      tag: 'complexity__dot--low',
      length: 1,

  }
}
</script>

<template>
  <div class="task-item__complexity complexity">
    <span v-for="dot in getComplexityClass(props.dueDate).length" :key="dot" class="complexity__dot" :class="getComplexityClass(props.dueDate).tag"></span>
  </div>
</template>

<style scoped>

.task-item__complexity {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.complexity__dot {
  width: 24px;
  height: 12px;
  flex-shrink: 0;
  background-color: #d9d9d9;
  border-radius: 0px 10px 10px 24px;
  display: inline-block;
  margin-right: 5px;
}

.complexity__dot--medium {
  background-color: #fde047;
}

.complexity__dot--high {
  background-color: #e42c5f;
}

.complexity__dot--low {
  background-color: #2ce49d;
}

.complexity__dot--done {
  background-color: #2d41a7;
}
</style>
