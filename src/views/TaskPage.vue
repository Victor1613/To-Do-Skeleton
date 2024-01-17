<template>

  <Header/>


  <div style="text-align: center;">
    <div class="task-button">
      <div class="task__back">
        <button @click="statusBoard" class="task-button__back">
          <p class="task-button__text">
            Создать статус
          </p>
        </button>
      </div>
    </div>

    <div class="task-button">
      <div class="task__back">
        <button @click.prevent="deleteLocalStorage" class="task-button__back">
          <RouterLink to="/board" class="task-button__text">К списку досок</RouterLink>
        </button>
      </div>
    </div>

    <div class="task-button">
      <div class="task__back" >
        <button @click.prevent="deleteLocalStorageAll" class="task-button__back">
          <RouterLink to="/reg" class="task-button__text">Выход</RouterLink>
        </button>
      </div>
    </div>

  </div>

  <div class="kanban">
    <kanban-column
        v-for="column in tasks"
        :key="column.id"
        :column="column.status"
        :tasks="column.tasks"
        @add-task="openModal(column.status.id)"
    />
  </div>

  <the-modal
      v-if="isModalOpen"
      @add-task="addTask"
      @close-modal="closeModal"
  />

  <TheModalBoardStatus
      v-if="visibleModalBoardStatus"
      @add-statuses="addBoardStatus"
      @close-modal="closeModal"
  />



</template>

<script>

import KanbanColumn from '@/components/todo/TheColumn.vue';
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import AuthPage from "@/views/AuthPage.vue";
import RegPage from "@/views/RegPage.vue";
import {mapActions, mapGetters} from "vuex";
import router from "@/router/index.js";
import TheModal from "@/components/todo/TheModal.vue";
import TheModalBoardStatus from "@/components/board/TheModalBoarStatus.vue";


export default {
  computed:{
    ...mapGetters([
      'tasks',
      'statuses'
    ])
  },

  components: {
    KanbanColumn,
    Header,
    Footer,
    TheModal,
    AuthPage,
    RegPage,
    TheModalBoardStatus,


  },
  data() {
    return {
      isModalOpen: false,
      currentColumnId: null,
      visibleModalBoardStatus: false,

      statuses: [],

    };
  },


  methods: {
    ...mapActions([
      'getTasks',
      'getBoardStatus'
    ]),

    deleteLocalStorageAll(){
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('boardId');
    },

    deleteLocalStorage(){
      localStorage.removeItem('boardId');
    },
    statusBoard(){
      this.visibleModalBoardStatus = true;
    },
    openModal(columnId) {
      this.currentColumnId = columnId;
      this.isModalOpen = true;

    },
    addTask(newTask) {
      let boardId = localStorage.getItem("boardId");
      newTask.boardId = boardId;
      newTask.status = this.currentColumnId;
      console.log(newTask);
      this.$store
          .dispatch('addTask', { ...newTask })
          .then(() => {
            this.resetForm();
            this.closeModal();
          })
          .catch((error) => {
            console.error('Ошибка при создании доски:', error);
          });

      this.closeModal();
    },

    closeModal() {
      this.visibleModalBoard = false;
      this.visibleModalBoardEdit = false;
      this.visibleModalBoardStatus = false;
      this.isModalOpen = false;
    },

  },

  mounted() { //происходит после загрузки страници
    if(!localStorage.getItem('token')){
      router.push('/auth')
    }
    else{
      this.getBoardStatus()
      this.getTasks()
    }
  }
};
</script>

<style>
* {
  font-family: 'Montserrat', sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body{
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  color: white;
  min-height: 100vh;
  min-width: 380px;
}
.kanban {
  display: flex;
  padding: 40px;
  align-items: flex-start;
  gap: 40px;
  margin: 10px 0;
}
html {
  min-width: 380px;
}

.task-button{
  margin: 10px;
  display:inline-block;
}
.task__back{
  display:inline-block;
}
.task-button__back{
  width: 127px;
  height: 31px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 0.624px solid #847CEC;
  background: #867CF2;
}
.task-button__back:hover{
  background: #504b96;
  border: 0.624px solid #504b96;

}
.task-button__text{
  color: #FFF;
  font-size: 12.476px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-decoration: none;
}

</style>