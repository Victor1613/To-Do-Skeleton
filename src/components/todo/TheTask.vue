<template>
  <TheModalEdit v-if="visibleModal" @close-modal="closeModal" @edit-task="editTaskModal"/>
  <div
      v-if="task"
      class="task-item"
      draggable="true"
      @dragstart="startDrag"
      @dragend="endDrag"
  >
    <p class="task-item__title">{{ task.name }}</p>
    <p class="task-item__description">{{ task.description }}</p>
    <div class="task-item__info">
      <div class="task-item__complexity complexity">
        <span
            v-for="dot in getComplexityDot(task.dueDate)"
            :class="dot.tag"
            :key="dot.id"
            class="complexity__dot"
        ></span>
      </div>

    </div>
    <div class="task-item__client">{{ task.createdAt }}</div>
    <div style="text-align: right;margin-top: 5px">
      <div class="buttons">
        <div class="board-button">
          <div class="board-button__edit">
            <button @click="editTask" class="editBoard">Изменить</button>
          </div>
        </div>
        <div class="board-button">
          <div class="board-button__delete">
            <button @click="deleteTask" class="deleteBoard">Удалить</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import TheModalEdit from "@/components/todo/TheModalEdit.vue";

export default {
  props: {
    task: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      visibleModal: false,
    }
  },
  components: {
    TheModalEdit,
  },
  methods: {
    deleteTask(){
      this.$store.dispatch('deleteTask', this.task);

    },
    editTask(){
      this.visibleModal = true;

    },
    async editTaskModal(DataEditTask){
      try {
        DataEditTask.task = this.task;

        await this.$store.dispatch('editTask', DataEditTask);
        this.closeModal();
      } catch(error) {
        console.error('Ошибка при редактировании доски:', error);

      }
    },
    closeModal(){
      this.visibleModal = false;
    },
    getComplexityDot(taskDate) {
      const currentDate = new Date();
      const inputTime = new Date(taskDate);
      const timeDiff = inputTime.getTime() - currentDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (daysDiff <= 7) {
        return [
          { tag: 'complexity__dot--high' },
          { tag: 'complexity__dot--high' },
          { tag: 'complexity__dot--high' },
        ];
      } else if (daysDiff <= 14) {
        return [
          { tag: 'complexity__dot--medium' },
          { tag: 'complexity__dot--medium' },
        ];
      } else {
        return [{ tag: 'complexity__dot--low' }];
      }
    },
    startDrag(event) {
      event.dataTransfer.setData('text/plain', this.task.id);
    },
  },
};
</script>

<style scoped>
.task-item {
  background-color: #f4f2ff;
  border-radius: 10px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.task-item__info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

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
  background-color: #FDE047;
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

.task-item__title {
  color: #715d86;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  word-wrap: break-word; /* разрешает перенос слов */
}

.task-item__description {
  color: #8b839f;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  word-wrap: break-word; /* разрешает перенос слов */
}

.task-item__client {
  font-size: 14px;
  color: #4F46E5;
  text-align: center;
}

.board-button{
  display:inline-block;
  margin-right:15px;
  padding-bottom: 23px;
}

.editBoard{
  width: 97px;
  height: 31px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 0.626px solid #847CEC;

  color: #91869D;
  font-size: 12.52px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.editBoard:hover{
  border: 0.624px solid #504b96;
  background: #504b96;
  color: #FFF;
}
.deleteBoard{
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
.deleteBoard:hover{
  background: #fd3f3f;
  border: 0.624px solid #fd3f3f;

}

.board-button__delete{
  padding-left: 49px;
}


</style>
