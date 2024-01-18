<template>
  <Header/>
  <TheModalBoard v-if="visibleModalBoard" @close-modal="closeModal"/>
  <TheModalBoardEdit v-if="visibleModalBoardEdit" @close-modal="closeModal" :boardId="selectedBoardId"/>
  <div>
    <div class="board-header">
      <div class="board-buttons">
        <div class="board-button">
          <div class="button__back" >
            <button @click.prevent="deleteLocalStorage" class="board-button__back">
              <RouterLink to="/reg" class="board-button__text">Выход</RouterLink>
            </button>
          </div>
        </div>
        <div class="board-button">
          <div class="button__back">
            <button
                @click="visibleModalBoard = true"
                class="board-button__back"
            >
              <p class="board-button__text">Создать доску</p>
<!--              <img src=".././assets/img/header/plus.svg" alt="header__icon&#45;&#45;add" class="header__icon header__icon&#45;&#45;add">-->
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="board">
      <the-board-box
          class="component-board"
          v-for="board in boards"
          :key="board.id"
          :board="board"
          @deleteBoard="deleteBoard(board.id)"
          @editBoard="editBoard(board.id)"

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
import Header from "@/components/Header.vue";



export default {

  components: {
    Header,
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

<style >

.board{
  margin: 20px;

  text-align: center;

}
.component-board{
  display: inline-block;
  text-align: left;

}
.board-header{
  width: 100%;
  margin-top: 30px;
  text-align: center;

}
.board-button{

}
.button__back{

}
.board-button__back{
  width: 127px;
  height: 31px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 0.624px solid #847CEC;
  background: #867CF2;
}
.board-button__back:hover{
  background: #504b96;
  border: 0.624px solid #504b96;

}
.board-button__text{
  color: #FFF;
  font-size: 12.476px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-decoration: none;
}
</style>