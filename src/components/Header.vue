<template>
  <header class="header">
    <div class="header__container container ">
      <h1 class="header__title">Kanban Board</h1>
      <div class="header__option">
        <img
          src="src/assets/img/header/plus.svg"
          alt="header__icon--add"
          class="header__icon header__icon--add"
        />
        <div class="header__user-icon">К.П</div>
      </div>
    </div>
    <div></div>
  </header>
</template>

<style scoped>
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
</style>
