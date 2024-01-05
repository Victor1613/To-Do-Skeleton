<template>
  <section
      :class="`kanban__column kanban__column--${column.id}`"
      @dragover.prevent="allowDrop"
      @drop="handleDrop"
  >
    <div class="kanban__header">
      <div class="kanban__header-content">
        <img
            :src="column.icon"
            class="kanban__icon kanban__icon--column"
        />
        <h2 class="kanban__title">{{ column.name }}</h2>
      </div>
      <img
          v-if="column.id !== 'done'"
          src="../../assets/img/kanban/plus.svg"
          alt="Добавить задачу"
          class="kanban__icon kanban__icon--add"
          :id="`${column.id}`"
          @click="$emit('add-task')"
      />
    </div>
    <div class="kanban__list">
      <kanban-task
          v-for="task in tasks"
          :key="task.id"
          :task="task"

      />
    </div>
  </section>
</template>

<script>
import KanbanTask from './TheTask.vue';

export default {
  components: {
    KanbanTask,
  },

  props: {
    column: {
      type: Object,
      default: {},
    },
    tasks: {
      type: Object,
      default: {},
    }
  },

  data() {
    return {
      localTask: this.tasks,
    }
  },

  methods: {

    allowDrop(event) {
      event.preventDefault();
    },
    handleDrop(event) {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('text/plain');
      this.$emit('task-droped', Number(taskId), this.column.id);
    },
  },

  watch: {
    tasks(newTasks) {
      this.localTask = newTasks;
    },
  },
}
</script>

<style scoped>
.kanban {
  display: flex;
  padding: 40px;
  align-items: flex-start;
  gap: 40px;
  margin: 10px 0;
}

.kanban__column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  flex: 1 0 0;

  padding: 14px;

  border-radius: 12px;
  background-color: #D5CCFF;
}

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

.kanban__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
</style>
