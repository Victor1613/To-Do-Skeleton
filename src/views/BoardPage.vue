<template>
  <TheModalBoard v-if="visibleModalBoard" @close-modal="closeModal"/>
  <TheModalBoardEdit v-if="visibleModalBoardEdit" @close-modal="closeModal" :boardId="selectedBoardId"/>
  <div>
    <div style="text-align: center">
      <button @click.prevent="deleteLocalStorage" class="but">
        <RouterLink to="/reg">Выход</RouterLink>
      </button>
      <button @click="visibleModalBoard = true">Создать доску</button>
    </div>

    <div class="board">
      <the-board-box
          v-for="board in boards"
          :key="board.id"
          :board="board"
          @deleteBoard="deleteBoard(board.id)"
          @editBoard="editBoard(board.id)"
          @statusBoard="statusBoard(board.id)"
      />
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import router from "@/router/index.js";
import TheBoardBox from "@/components/board/TheBoardBox.vue";
import TheModalBoard from "@/components/board/TheModalBoard.vue";
import TheModalBoardEdit from "@/components/board/TheModalBoardEdit.vue";



export default {

  components: {
    TheBoardBox,
    TheModalBoard,
    TheModalBoardEdit,
},
  data() {
    return {
      visibleModalBoard: false,
      visibleModalBoardEdit: false,
      selectedBoardId: null,

    }
  },
  // data(){
  //   return{
  //     boards:[],
  //   }
  // },

  computed:{
    ...mapGetters([
      'boards'
    ]),
  },

  methods:{
    ...mapActions([
      'getBoards',
    ]),
    editBoard(boardId){
      this.selectedBoardId = boardId;
      this.visibleModalBoardEdit = true;
    },

    closeModal() {
      this.visibleModalBoard = false;
      this.visibleModalBoardEdit = false;
      this.visibleModalBoardStatus = false;
    },
    deleteBoard(boardId){
      this.$store.dispatch('deleteBoard', boardId);
    },
    deleteLocalStorage(){
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },
  },

  async mounted() { //происходит после загрузки страници
    if(!localStorage.getItem('token')){
      await router.push('/auth')
    }
    else{
      await this.getBoards();
    }
  },
}

</script>

<style>
.but{
  height: 5vh;
  background-color: #2ce49d;
  border-radius: 4px;
}
.board{
  /* //width: 300px;
  //height: 300px; */
  background-color: burlywood;
}
</style>