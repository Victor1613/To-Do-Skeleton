<script setup>
import { ref, reactive } from "vue";
import KanbanColumn from "./KanbanColumn.vue";
import FormModal from "./FormModal.vue";
import { columnsList, tasksList } from "@/utils/utils";

const tasks = ref(tasksList);
const columns = ref(columnsList);
const isFormVisible = ref(false);
const selectedColumnId = ref(null);
const isEditing = ref(false);
const isNewColumn = ref(false);
const editingTaskId = ref(null);
const newTaskData = reactive({
  title: "",
  description: "",
  dueDate: "",
  columnId: "",
});

function handleTaskDrop({ taskId, newColumnId }) {
  const taskIndex = tasks.value.findIndex((t) => t.id == taskId);
  if (taskIndex !== -1) {
    const updatedTask = { ...tasks.value[taskIndex], columnId: newColumnId };
    tasks.value.splice(taskIndex, 1, updatedTask);
  }
}

const handleFormSubmit = (taskData) => {
  if (isEditing.value) {
    const taskIndex = tasks.value.findIndex(
      (t) => t.id === editingTaskId.value
    );
    if (taskIndex !== -1) {
      tasks.value[taskIndex] = { ...tasks.value[taskIndex], ...taskData };
    }
    isEditing.value = false;
  } else if (isNewColumn.value) {
    let newColumn = {
      id: taskData.title,
      title: taskData.title,
      icon: "src/assets/img/kanban/kanban__column--to-do.svg",
      tasks: [],
    };

    columns.value.push(newColumn);
  } else {
    tasks.value.push({ ...taskData, id: Date.now() });
  }
  isFormVisible.value = false;
  isNewColumn.value = false;
};

const handleFormCancel = () => {
  isFormVisible.value = false;
  isNewColumn.value = false;
};
function handleAddTask({ columnId }) {
  selectedColumnId.value = columnId;
  isFormVisible.value = true;
}

function handleAddColumn(name) {
  isNewColumn.value = true;
  isFormVisible.value = true;
}

function startEditTask(taskId) {
  const task = tasks.value.find((t) => t.id === taskId);
  if (task) {
    selectedColumnId.value = task.columnId;
    editingTaskId.value = taskId;
    isEditing.value = true;
    isFormVisible.value = true;

    Object.assign(newTaskData, task);
  }
}
</script>

<template>
  <div class="kanban">
    <KanbanColumn
      v-for="column in columns"
      :key="column.id"
      :column="column"
      :tasks="tasks"
      @taskdropped="handleTaskDrop"
      @addtask="handleAddTask"
      @edittask="startEditTask"
    />

    <button class="add-column" @click="handleAddColumn">+</button>

    <FormModal
      :isVisible="isFormVisible"
      :columnId="selectedColumnId"
      :taskData="newTaskData"
      :isEditing="isEditing"
      :isNewColumn="isNewColumn"
      @submit="handleFormSubmit"
      @cancel="handleFormCancel"
    />
  </div>
</template>

<style scoped>
.kanban {
  display: flex;
  padding: 40px;
  align-items: flex-start;
  flex-wrap: wrap;
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
  max-width: 380px;
  border-radius: 12px;
  background-color: #d5ccff;
}

.add-column {
  font-size: 40px;
  background: none;
  color: white;
  border: none;
  cursor: pointer;
  margin:  0 auto;

}
</style>
