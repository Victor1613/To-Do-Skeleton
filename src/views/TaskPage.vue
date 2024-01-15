<template>

  <header/>
  <header/>
  <TheModalBoardStatus v-if="visibleModalBoardStatus" @close-modal="closeModal" :boardId="selectedBoardId"/>

  <div style="text-align: center">
    <button @click.prevent="deleteLocalStorage" class="but">
      <RouterLink to="/board">К списку досок</RouterLink>
    </button>
    <button @click="statusBoard" class="but">Создать статус</button>

  </div>



  <kanban-column
      v-for="column in tasks"
      :key="column.id"
      :column="column.status"
      :tasks="column.tasks"
      @add-task="openModal(column.status.id)"
      @task-dropped="handleTaskDropped"
  />

  <footer/>

  <the-modal
      v-if="isModalOpen"
      @add-task="addTask"
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
      'tasks'
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
      'getTasks'
    ]),

    deleteLocalStorage(){
      localStorage.removeItem('id');
    },
    statusBoard(){
      this.visibleModalBoardStatus = true;
    },
    openModal(columnId) {
      this.currentColumnId = columnId;
      this.isModalOpen = true;
    },
    addTask(newTask) {
      let boardId = localStorage.getItem("id");
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
    handleTaskDropped(taskId, targetColumnId) {
      const currentTask = this.localTasks.find(task => task.id === taskId);
      if (!currentTask || currentTask.columnId === targetColumnId) {
        // Если задача уже в этой колонке или не найдена, ничего не делаем
        return;
      }

      // Обновляем localTasks
      const updatedTasks = this.localTasks.map(task => {
        if (task.id === taskId) {
          return { ...task, columnId: targetColumnId };
        }
        return task;
      });
      this.localTasks = updatedTasks;

      // Обновляем localColumns
      this.localColumns = this.localColumns.map(column => {
        if (column.id === targetColumnId) {
          // Добавляем задачу, если её там ещё нет
          if (!column.tasks.includes(taskId)) {
            return { ...column, tasks: [...column.tasks, taskId] };
          }
        } else {
          // Удаляем задачу из текущей колонки
          return { ...column, tasks: column.tasks.filter(id => id !== taskId) };
        }
        return column;
      });
    },
  },

  mounted() { //происходит после загрузки страници
    if(!localStorage.getItem('token')){
      router.push('/auth')
    }
    else{
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
  background-color: #2B1887;
  color: white;
  min-height: 100vh;
  min-width: 380px;
}

html {
  min-width: 380px;
}

.header__container,
footer {
  background-color: #1C0E5E;
  text-align: center;
  padding: 10px 0;
}

.header__title,
.footer__text {
  margin: 0;
  padding: 10px 0;
}

.container {
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
}

.but{
  height: 5vh;
  background-color: #2ce49d;
  border-radius: 4px;

}
</style>