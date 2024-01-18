<template>
  <section class="board">
    <div class="board-item">
      <div class="board-id"
          @click.prevent="saveIdBoard(board.id)">
        <div class="board-name">
          {{board.name}}
        </div>
        <div class="board-description">
          {{board.description}}
        </div>
<!--        <h2>{{board.createdAt}}</h2>-->
<!--        <h2>{{board.updatedAt}}</h2>-->
      </div>
      <div class="buttons">
        <div class="board-button">
          <div class="board-button__edit">
            <button @click="editBoard" class="editBoard">Изменить</button>
          </div>
        </div>
        <div class="board-button">
          <div class="board-button__delete">
            <button @click="deleteBoard" class="deleteBoard">Удалить</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions} from "vuex";
import router from "@/router/index.js";
export default {
  props: {
    board: {
      type: Object,
      default: {},
    },
  },

  data() {
    return {
      localTask: this.boards,
    }
  },

  methods:{
    ...mapActions([
      'getTasks',
    ]),
    deleteBoard(){
      this.$emit('deleteBoard');
    },
    editBoard(){
      this.$emit('editBoard');
    },
    
    saveIdBoard(boardId) {
      // Сохраняем id доски в локальном хранилище
      localStorage.setItem('boardId', boardId)
      this.getTasks();
      router.push('/')

    },

  },
}
</script>

<style>

.board-item{

  display: inline-block;
  vertical-align: top;

  width: 362px;
  min-height: 202px;;
  border-radius: 25px;
  padding-left: 50px;
  background: #FFF;
  border: 1px solid #847CEC;
  word-wrap: break-word; /* разрешает перенос слов */
}
.board-id{
  margin-top: 20px;
  margin-bottom: 50px;
}
.board-name{
  color: #91869D;
  font-size: 40px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 282px;
  word-wrap: break-word; /* разрешает перенос слов */

}

.board-description{
  width: 242px;
  color: #91869D;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  word-wrap: break-word; /* разрешает перенос слов */

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