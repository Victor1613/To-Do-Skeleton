<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Kanban from "./components/Kanban.vue";
import Login from "./components/Login.vue";
import { ref } from "vue";

const isLogged = ref(false);

function handleLogin(){
  isLogged.value = true
}
</script>

<template>
  <Login @login="handleLogin" v-if="!isLogged" />
  <div v-else>
    <Header></Header>
    <main class="container">
      <Kanban></Kanban>
    </main>
    <Footer></Footer>
  </div>
</template>

<style scoped></style>
