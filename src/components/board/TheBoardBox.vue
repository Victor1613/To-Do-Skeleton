<template>
  <section class="bord-item">
    <div
        id="the-bord"
        style=" width: 500px; background-color: teal; "
    >
      <div @click.prevent="saveIdBoard(board.id)">
        <h2>{{board.id}}</h2>
        <h2>{{board.name}}</h2>
        <h2>{{board.description}}</h2>
<!--        <h2>{{board.createdAt}}</h2>-->
<!--        <h2>{{board.updatedAt}}</h2>-->

      </div>
      <button @click="editBoard">Изменить</button>
        <br>
        <button @click="deleteBoard">Удалить</button>
        <br>
    </div>
    <div>
      <h2></h2>
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
      'openBoard',
      'getTasks'
    ]),
    deleteBoard(){
      this.$emit('deleteBoard');
    },
    editBoard(){
      this.$emit('editBoard');
    },
    
        saveIdBoard(boardId) {
      // Сохраняем id доски в локальном хранилище
      localStorage.setItem('id', boardId)
      this.getTasks()
      router.push('/')

    },

  },
}
</script>

<style>
*{

}
.bord-item{
  margin-bottom: 5px;
}


</style>