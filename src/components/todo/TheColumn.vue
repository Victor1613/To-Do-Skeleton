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
<!--      <button-->
<!--          @click="editStatuses"-->
<!--          style="background: green"-->
<!--          class="deleteBoardStatus"-->

<!--      >-->
<!--        изменить-->
<!--      </button>-->
      <div style="text-align: right;margin-top: 5px">
        <div class="buttons">
          <div class="column-button">
            <div class="column-button__delete">
              <img
                  src="../../assets/img/kanban/del.svg"
                  class="column-button__delete"
                  @click="deleteBoardStatus"
              />
            </div>
          </div>
          <div class="column-button">
            <div class="column-button__delete">
              <img
                  v-if="column.id !== 'done'"
                  src="../../assets/img/kanban/plus.svg"
                  alt="Добавить задачу"
                  class="kanban__icon kanban__icon--add"
                  :id="`${column.id}`"
                  @click="$emit('add-task')"
              />
            </div>
          </div>
        </div>
      </div>



    </div>
    <div class="kanban__list">
      <kanban-task
          v-for="task in tasks"
          :key="task.id"
          :task="task"

      />
    </div>
  </section>

  <the-modal-edit-statuse
      v-if="visible"
      @close-modal="closeModal"
      @edit-task="editStatusesModal"
  />


</template>

<script>
import KanbanTask from './TheTask.vue';
import {mapActions} from "vuex";
import TheModalEditStatuse from "@/components/todo/TheModalEditStatuse.vue";
import TheModalEdit from "@/components/todo/TheModalEdit.vue";

export default {
  components: {
    TheModalEdit,
    KanbanTask,
    TheModalEditStatuse,
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
      visible: false,
    }
  },


  methods: {
    deleteBoardStatus(){
      this.$store.dispatch('deleteBoardStatus', this.column);
    },
    editStatuses(){
      this.visible = true;
      console.log('editStatuses')
    },

    async editStatusesModal(DataEditStatuses){
      try {
        DataEditStatuses.statuses = this.statuses;

        await this.$store.dispatch('editStatuses', DataEditStatuses);
        console.log('d11111111111111')
        this.closeModal();
      } catch(error) {
        console.error('Ошибка при редактировании доски:', error);

      }
    },

    closeModal(){
      this.visible = false;
    },

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
  font-size: 20px;
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

.task-item__client {
  font-size: 14px;
  color: #4F46E5;
  text-align: right;
}

.column-button{
  display:inline-block;

}
.deletecolumn{
  width: 97px;
  height: 31px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 0.624px solid #847CEC;
  background: #867CF2;
  color: #FFF;
  font-size: 12.476px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
column-button__delete{
  background: red;
}

.icon:hover path {
  background: red;
}

.column-button__delete{
  padding-left: 20px;
}
</style>
