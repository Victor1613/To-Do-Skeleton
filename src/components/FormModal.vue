<script setup>
import { ref, defineEmits } from "vue";

const props = defineProps({
  isVisible: Boolean,
  taskData: Object,
  columnId: String,
  isEditing: Boolean,
  isNewColumn: Boolean
});

const emit = defineEmits(["submit", "cancel"]);

const taskData = ref({
  title: "",
  description: "",
  dueDate: "",
});

const submitTask = () => {
  emit("submit", { ...taskData.value, columnId: props.columnId });

  taskData.value = { title: "", description: "", dueDate: "" };
};

const cancel = () => {
  emit("cancel");
};

console.log(props);
</script>

<template>
  <div class="modal" v-if="isVisible">
    <div class="modal__container">
      <a @click="cancel" href="#" class="close-modal">✖</a>
      <form>
        <input
          v-model="taskData.title"
          type="text"
          id="title-task"
          name="title"
          :placeholder="isEditing? 'Название задачи':'Название Доски'"
        />
        <textarea
          v-if="!isNewColumn"
          v-model="taskData.description"
          id="description-task"
          name="description"
          placeholder="Описание задачи"
        ></textarea>
        <input
          v-if="!isNewColumn"
          v-model="taskData.dueDate"
          type="date"
          name="date"
          placeholder="Дата выполнения"
        />
        <button class="submit-button" v-if="!isEditing" @click="submitTask">Создать</button>
        <button class="submit-button"  v-else @click="submitTask">Изменить</button>
        <button @click="cancel" type="button" class="cancel-button">
          Отмена
        </button>
      </form>
    </div>
  </div>
</template>

<style>
.modal {
display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(255 255 255 / 33%);
  backdrop-filter: blur(15px);
}

.modal__container {
  display: flex;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 430px;
}

form {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
}

input[type="text"],
input[type="date"],
textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

textarea {
  resize: vertical;
}

.submit-button {
  padding: 10px 20px;
  background-color: #2d41a7;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: darkblue;
}

.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  text-decoration: none;
  color: black;
  font-size: 24px;
}

.cancel-button {
  padding: 10px 20px;
  background-color: rgb(255, 0, 64);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: darkred;
}

.button--new-board {
  font-size: 40px;
  background: none;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
