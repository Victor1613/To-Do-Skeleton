<template>
  <div>

    <the-board-box

    />
  </div>
</template>

<script>

import {mapActions} from "vuex";
import TheBoardBox from "@/components/board/TheBoardBox.vue";



export default {

  components: {TheBoardBox},




  data(){
    return{
      boards:[],
    }
  },

  methods:{
    ...mapActions([
      'getBords'
    ])
  },

  created() {
    //this.boards = this.getBords(formData)
    //console.log(userID)
  }


}

</script>

<style lang="scss" scoped>

</style>