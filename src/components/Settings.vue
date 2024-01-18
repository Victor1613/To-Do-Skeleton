<template>
  <img
      @click="isShow"
      src="../assets/img/header/settings.svg"
      alt="header__icon--settings"
      class="header__icon header__icon--settings"
  />

  <div class="modal" v-if="isVisible">
    <div class="modal__container">
      <a @click="cancel" href="#" class="close-modal">✖</a>
      <div class="users-list">
        <div class="users-list__title">Управление ролями</div>
        <div class="users-list__search">
          <input type="text" @input="handleSearch" placeholder="Имя пользователя">
        </div>
        <div class="users-list__list">

          <div v-if="users.length === 0" class="users-list__not-found">
            Ничего не найдено!!!
          </div>

          <div v-else v-for="user in users" :key="user.id" class="users-list__item">
            <div class="users-list__item-content">
              <div class="users-list__item-name">{{user.name}}</div>
              <div class="users-list__item-more" @click="handleMore($event, user.id)">
                <img src="../assets/img/kanban/vertical-dots.svg" alt="vertical-dots">
              </div>
            </div>

            <div class="users-list__settings" v-if="user.isVisibleSettings">

              <label class="users-list__settings-item">
                <span>Управление статусами</span>
                <input type="checkbox">
              </label>
              <label class="users-list__settings-item">
                <span>Управление досками</span>
                <input type="checkbox">
              </label>
              <label class="users-list__settings-item">
                <span>Управление юзерами</span>
                <input type="checkbox">
              </label>

            </div>

          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {ref} from "vue";

const userList = [
  {
    id: '1',
    name: 'Иванов Иван',
    isVisibleSettings: false
  },
  {
    id: '2',
    name: 'Петров Петр',
    isVisibleSettings: false
  },
  {
    id: '3',
    name: 'Юлия',
    isVisibleSettings: false
  },
  {
    id: '4',
    name: 'Валентина',
    isVisibleSettings: false
  },
  {
    id: '5',
    name: 'Евгений',
    isVisibleSettings: false
  },
]

const isVisible = ref(false);
const users = ref(userList);

const cancel = () => {
  isVisible.value = false;
};

const isShow = () => {
  isVisible.value = true;
}

const handleSearch = (e) => {
  const val = e.target.value;

  if (val.length > 0) {
    users.value = userList.filter(user => {
      return user.name.toLowerCase().includes(val.toLowerCase())
    });
  } else {
    users.value = userList;
  }
}

const handleMore = (e, userId) => {
  users.value = users.value.map(item => {
    if (item.id === userId) {
      item.isVisibleSettings = !item.isVisibleSettings;
    }

    return item;
  })
}

</script>

<style scoped>
.header__icon--settings {
  cursor: pointer;
}

.users-list__title {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 19px;
  color: #333;
}

.users-list {
  width: 100%;
}

.users-list__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 12px;
}

.users-list__item {
  display: flex;
  flex-direction: column;
  border: 1px solid #dedede;
  padding: 4px 8px;
  border-radius: 8px;
}

.users-list__item-name {
  color: #333333;
}

.users-list__item-more {
  cursor: pointer;
  width: 30px;
  min-width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 2px;
  transition: 0.3s;
}

.users-list__item-more:hover {
  background-color: #dedede;
}

.users-list__item-more img {
  width: 100%;
  height: 100%;
}

.users-list__search {
  margin-top: 12px;
}

.users-list__search input {
  width: 100%;
}
.users-list__settings {
  margin-top: 12px;
}
.users-list__settings-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.users-list__item-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.users-list__settings-item span, .users-list__not-found {
  color: #333333;
}

.users-list__settings-item span {
  font-size: 14px;
  line-height: 16px;
}

.users-list__settings-item input {
  margin-right: 8px;
}
</style>