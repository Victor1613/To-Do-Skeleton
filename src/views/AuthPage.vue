<template>
  <div class="auth container--auth">
    <div class="auth__title">
      <div class="content">
        Авторизация
      </div>
    </div>
    <div class="to-page">
      <p>
        Пройдите
        <RouterLink
            to="/reg"
            class="to-page__reg">регистрацию,</RouterLink>
        если нет аккаунта
      </p>
    </div>
    <form class="auth-form" @submit.prevent="sabmit">
      <div class="auth-form__field">
        <label class="auth-form__label" for="login">Почта</label>
        <div class="auth-form__input">
          <input
              v-model="formData.email"
              class="auth-form__input--text"
              type="text"
              placeholder="email@inbox.com"
              @blur="validateEmail"
          >
        </div>
        <span v-if="errors.email">
            {{errors.email }}
        </span>
      </div>
      <div class="auth-form__field">
        <label class="auth-form__label" for="password">Пароль</label>
        <div class="auth-form__input">
          <input
              v-model="formData.password"
              class="auth-form__input--text"
              type="password"
              placeholder="Пароль"
          >
        </div>
        <span v-if="errors.password">
            {{errors.password }}
          </span>
      </div>
<!--      <div class="auth-form__field auth-form__field&#45;&#45;remember-me">-->
<!--        <input class="auth-form__checkbox"-->
<!--               type="checkbox"-->
<!--               id="remember-me"-->
<!--        >-->
<!--        <label class="auth-form__label" for="remember-me">Запомнить меня</label>-->
<!--      </div>-->
      <div class="auth-button">
        <button
            class="auth-button__submit"
            type="submit"
        >
          Войти
        </button>
      </div>
      <the-modal-err-auth
          v-if="isModalOpen"
          @close-modal="closeModal"
      />
    </form>
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
      errors: {
        email: '',
        password: '',
      },
      showError: false,

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
    ...mapActions([
      "signIn"
    ]),

    async sabmit() {
      this.validateEmail()
      this.validatePassword()

      await this.validateForm()
      if (!this.showError){
        const formData = {
          formData: {
            ...this.formData
          }
        };

        await this.signIn(formData)

        console.log(formData)

        if(!this.accountExists){
          await router.push('/board')
          await this.resetForm()
        }else{
          this.openModal()
        }
      }
    },

    validateEmail() {
      const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
      if (!emailRegex.test(this.formData.email)) {
        this.errors.email = 'Проверьте правильность введенных данных';
      } else {
        this.errors.emai = '';
      }
    },
    validatePassword() {
      if (this.formData.password.length < 5 ) {
        this.errors.password = 'Минимальное кол-во символов: 5';
      } else {
        this.errors.password = '';
      }
    },
    validateForm() {
      for (let field in this.errors) {
        if (this.errors[field]) {
          this.showError = true
          console.log("не всё заполнено")
          return
        }
      }
      this.showError = false
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
  align-items: center;
  width: 470px;
  height: 436px;
  background: #FFF;
  border-radius: 20px;
}
.container--auth{
  margin: 11vw auto
}
.auth__title {
  padding-top: 30px;
}
.content{
  color: #7415D9;
  font-size: 40px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border: #2ce49d;
}
.to-page{
  color: #988F8F;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-top: 5px;
  padding-bottom: 20px;
}
.to-page__reg{
  color: #7415D9;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-decoration: none;
}
.to-page__reg:hover{
  color: #5015d9;
  transform: scale(1.5);
}
.auth-form__field {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
  height: 110px;

}


.auth-form__label {
  color: #7415D9;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-left: 58px;
}

.auth-form__input {
  color: #D9D3E0;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-left: 58px;
}
.auth-form__input--text{
  width: 357px;
  height: 43px;
  flex-shrink: 0;
  border: 1px solid #988F8F;
  padding-left: 15px;
  font-size: 17px;
}

.auth-button{
  padding-left: 58px;
}
.auth-button__submit{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  background: #7311DD;
  height: 42px;
  width: 357px;
}

span{
  color: red;
  padding-left: 58px;
  font-size: 15px;
}
</style>