<script setup>
import { ref,defineEmits } from 'vue';

const username = ref('');
const password = ref('');
const emit = defineEmits(['login']);

function login() {
  if (username.value === 'user' && password.value === 'password') {
    emit('login')
  } else {
    alert('Неправильные имя пользователя или пароль.');
  }
}
</script>

<template>
 

   <div class="auth container">
      <h1 class="auth__title">Авторизация</h1>
      <div class="auth-form">
        <div class="auth-form__field">
          <label class="auth-form__label" for="login">Логин</label>
          <input  v-model="username" value="123122s" class="auth-form__input" type="text" id="login">
        </div>
        <div class="auth-form__field">
          <label class="auth-form__label" for="password">Пароль</label>
          <input  v-model="password" class="auth-form__input" type="password" id="password">
        </div>
        <div class="auth-form__field auth-form__field--remember-me">
          <input class="auth-form__checkbox" type="checkbox" id="remember-me">
          <label class="auth-form__label" for="remember-me">Запомнить меня.</label>
        </div>
        <button @click="login" class="auth-form__submit">Войти</button>
      </div>
    </div>
    <img class="wave" src="src/assets/img/auth/wave.svg" alt="">
</template>

<style>
.auth__title {
  color: #f4f2ff;

  text-align: center;
  font-size: 50px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.auth-form__field {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
  margin: 15px 0;
}

.auth-form__field--remember-me {
  flex-direction: row;
  gap: 0px;
  align-items: center;
}

.auth-form__label {
  color: #f4f2ff;
  margin-left: 15px;
  text-align: start;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
}

.auth-form__input {
  border-radius: 10px;
  background: #D5CCFF;
  border: none;
  padding: 10px 25px;
  width: 100%;
  height: 45px;
  flex-shrink: 0;
}

.auth-form__checkbox {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #5D5FEF;
  width: 15px;
  height: 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
}

.auth-form__checkbox:checked {
  background-color: #5D5FEF;
}

.auth-form__checkbox:checked::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 3px;
  height: 6px;
  border: solid #f4f2ff;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

.auth-form__submit {
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 10px;
  background: #5D5FEF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.30);
  color: #f4f2ff;
}

.wave {
  position: absolute;
  bottom: 0px;
  width: 100%;
}
</style>
