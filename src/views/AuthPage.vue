<template>
  <div class="auth container">
    <h1 class="auth__title">Авторизация</h1>
    <nav>
      <div class="but">
        <RouterLink to="/reg" style="color: black;">Регистрация</RouterLink>
      </div>
    </nav>
    <form class="auth-form" @submit.prevent="sabmit">
      <div class="auth-form__field">
        <label class="auth-form__label" for="login">Почта</label>
        <input v-model="formData.email" class="auth-form__input" type="text">
      </div>
      <div class="auth-form__field">
        <label class="auth-form__label" for="password">Пароль</label>
        <input v-model="formData.password" class="auth-form__input" type="password">
      </div>
      <div class="auth-form__field auth-form__field--remember-me">
        <input class="auth-form__checkbox" type="checkbox" id="remember-me">
        <label class="auth-form__label" for="remember-me">Запомнить меня.</label>
      </div>
      <button class="auth-form__submit" type="submit">Войти</button>
      <the-modal-err-auth
          v-if="isModalOpen"
          @close-modal="closeModal"
      />
    </form>
  </div>
  <div>
    <img class="wave" src="../assets/img/auth/wave.svg">
  </div>

</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import router from "@/router/index.js";
import TheModalErrAuth from "@/components/auth/TheModalErrAuth.vue";
import ThModalErrEmail from "@/components/reg/ThуModalErrEmail.vue";


export default {
  components:{
    ThModalErrEmail,
    TheModalErrAuth,
  },
  data() {
    return {
      formData:{
        email: '',
        password: '',
      },
      isModalOpen: false,
    }
  },
  computed: {
    ...mapGetters([
      'accountExists'
    ])
  },
  methods: {
    ...mapMutations([
      'setAccountExists'
    ]),
    ...mapActions([ // иницилизировали для дальнейшего использования
      "signIn"
    ]),



    async sabmit() { //async выполняет функцию по шагово (чтобы код который находится под async выполнялся по пордку

      const formData = {
        formData: {
          ...this.formData

        }
      };

      await this.signIn(formData) //await - задержка на функци пока не получит ответ

      console.log(formData)

      // await router.push('/board')
      // await this.resetForm()

      if(!this.accountExists){
        await router.push('/board')
        await this.resetForm()
        console.log('dddddddd')
      }else{
        this.openModal()
      }

    },

    openModal() {
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false;
    },

    resetForm() {
      this.formData = { email: '', password: ''}
    }
  },
}
</script>

<style scoped>
.auth {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 50vw;
  height: 100vh;

  background: #2B1887;

}
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

.but{
  border-radius: 4px;
  height: 5vh;
  background-color: #2ce49d;

}
</style>