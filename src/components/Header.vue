<template>
  <header class="header">
    <div class="container header__container">
      <h1 class="header__title">{{ title }}</h1>
      <div class="header__option">
<!--        <img src="../assets/img/header/plus.svg" alt="header__icon&#45;&#45;add" class="header__icon header__icon&#45;&#45;add">-->
        <div class="header__user-icon">{{ userIcon }}</div>
      </div>
    </div>
    <div class="table">


    </div>
  </header>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

let names= localStorage.getItem('userId');
export default {
  data() {
    return {
      title: 'Kanban Board',
      userIcon: names,
    }
  },

}
</script>

<style>
header {
  margin-top: 10px;
}

.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
}

.header__title {
  font-weight: 300;

}

.header__option {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header__user-icon {
  width: 40px;
  height: 40px;
  background-color: #d9d9d9;
  border-radius: 50%;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.header__icon:hover {
  cursor: pointer;
  opacity: .5;
}
</style>