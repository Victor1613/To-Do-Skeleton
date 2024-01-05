<template>
  <div class="registration container">
    <h1 class="reg__title">Регистрация</h1>    <nav>
    <div class="but">
      <RouterLink to="/auth" style="color: black;">Авторизация</RouterLink>
    </div>
  </nav>
    <form @submit.prevent="sabmit" class="registration-form">
      <div class="reg-form__field">
        <label class="registration-form__label" for="password">Имя</label>
        <input type="text" placeholder="Имя" class="registration-form__input" v-model="formData.name">
      </div>
      <div class="reg-form__field">
        <label class="registration-form__label" for="password">Почта</label>
        <input type="text" placeholder="email@inbox.com" class="registration-form__input" v-model="formData.email">
      </div>
      <div class="reg-form__field">
        <label class="registration-form__label" for="password">Пароль</label>
        <input type="password" placeholder="Пароль" class="registration-form__input" v-model="formData.password">
      </div>
      <div class="reg-form__field">
        <label class="registration-form__label" for="password">Повторить пароль</label>
        <input type="password" placeholder="Повторить пароль" class="registration-form__input" v-model="formData.confermPassword">
      </div>

      <button class="reg-form__submit" type="submit">Зарегистрароваться</button>
    </form>
  </div>

</template>

<script>


import {mapActions} from "vuex";
import router from "@/router/index.js";

export default {
  data() {
    return {
      formData:{
        name: '',
        email: '',
        password: '',
        confermPassword: ''
      }
    }
  },

  methods: {
    ...mapActions([
      'signUp'
    ]),

    async sabmit(){
      // if(formData.name !== '' && formData.email !== '' && formData.password !== '' && formData.confermPassword !== ''){
      //
      // }
      const formData = {
        formData:{
          ...this.formData
        }
      }
      await this.signUp(formData)

      console.log(formData)

      await this.resetForm()

      await router.push('/auth')
    },
    resetForm(){
      this.formData = {name: '', email: '', password: '', confermPassword: ''}
    }
  },
}
</script>

<style scoped>
.reg__title {
  color: #f4f2ff;

  text-align: center;
  font-size: 50px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.registration {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 100vh;
}
.reg-form__field {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
  margin: 15px 0;
}
.registration-form__input {
  padding: 10px;
  margin-left: 5px;
  border: none;
  border-radius: 5px;

}
.reg-form__submit {
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 10px;
  background: #5D5FEF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.30);
  color: #f4f2ff;
}
.but{
  height: 5vh;
  background-color: #2ce49d;
  border-radius: 4px;
}
</style>