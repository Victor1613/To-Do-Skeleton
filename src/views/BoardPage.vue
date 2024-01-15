<template>
  <div>
    <div style="text-align: center">
      <button @click.prevent="deleteLocalStorage" class="but">
        <RouterLink to="/reg">Выход</RouterLink>
      </button>
    </div>

    <div class="board">
      <the-board-box
          v-for="board in boards"
          :key="board.id"
          :board="board"
      />
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import router from "@/router/index.js";
import TheBoardBox from "@/components/board/TheBoardBox.vue";



export default {

  components: {
    TheBoardBox,

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
  //width: 300px;
  //height: 300px;
  background-color: burlywood;
}
</style>