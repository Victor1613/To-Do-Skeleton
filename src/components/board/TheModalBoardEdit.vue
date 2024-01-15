<template>
  <div class="modal">
    <div class="modal__container">
      <a href="#" class="close-modal" @click="closeModal">✖</a>
      <form @submit.prevent="submitBoard">
        <p v-if="!isFormValid" class="text-dark">В названии и описании должно быть не менее 5 символов!</p>
        <input type="text" v-model="newBoard.name" placeholder="Введите новый заголовок доски" />
        <textarea v-model="newBoard.description" placeholder="Введите новое описание доски"></textarea>
        <button type="submit" :disabled="!isFormValid">Отправить</button>
        <button type="button" class="cancel-button" @click="closeModal">Отмена</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newBoard: {
        name: '',
        description: '',
      },
      isFormValid: false,
    };
  },
  props: {
    boardId: Number,
  },
  watch: {
    newBoard: {
      handler() {
        this.validateForm();
      },
      deep: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
      this.resetForm();
    },
    async submitBoard() {
    try {
      if (this.isFormValid) {
        this.newBoard.id = this.boardId;
        const response = await this.$store.dispatch('editBoard', { ...this.newBoard });
        await this.$store.dispatch('getBoards');
        this.resetForm();
        this.closeModal();
      }
    } catch (error) {
      console.error('Ошибка при редактировании доски:', error);
    }
  },
    resetForm() {
      this.newBoard = { name: '', description: '' };
      this.isFormValid = false;
    },
    validateForm() {
      this.isFormValid =
        this.newBoard.name.length >= 5 && this.newBoard.description.length >= 5;
    },
  },
};
</script>
<style>
.text-dark{
  color:black
}
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

button[type="submit"] {
  padding: 10px 20px;
  background-color: #2d41a7;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"]:hover {
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
</style>
