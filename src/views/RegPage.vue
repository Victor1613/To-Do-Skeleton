<template>
  <div class="registration container">
    <h1 class="reg__title">Регистрация</h1>
    <nav>
    <div class="but">
      <RouterLink to="/auth" style="color: black;">Авторизация</RouterLink>
    </div>
    </nav>
    <form @submit.prevent="sabmit" class="registration-form">
      <div class="reg-form__field">
        <label class="registration-form__label" for="password">Имя</label>
        <input
            type="text"
            placeholder="Имя"
            class="registration-form__input"
            @input="validateName"
            v-model="formData.name"
        >
        <span v-if="errors.name">
          {{errors.name }}
        </span>
      </div>
      <div class="reg-form__field">
        <label class="registration-form__label" for="password">Почта</label>
        <input
            type="text"
            placeholder="email@inbox.com"
            class="registration-form__input"
            @blur="validateEmail"
            v-model="formData.email"
        >
        <span v-if="errors.email">
          {{errors.email }}
        </span>
      </div>
      <div class="reg-form__field">
        <label class="registration-form__label" for="password">Пароль</label>
        <input
            type="password"
            placeholder="Пароль"
            class="registration-form__input"
            v-model="formData.password"
            @input="validatePassword"
        >
        <span v-if="errors.password">
          {{errors.password }}
        </span>
      </div>
      <div class="reg-form__field">
        <label class="registration-form__label" for="password">Повторить пароль</label>
        <input
            type="password"
            placeholder="Повторить пароль"
            class="registration-form__input"
            v-model="formData.confermPassword"
            @input="validateConfirmPassword"
        >
        <span v-if="errors.confermPassword">
          {{errors.confermPassword }}
        </span>
      </div>

      <div>
        <button
            class="reg-form__submit"
            type="submit"
        >
          Зарегистрароваться
        </button>
      </div>


      <th-modal-err-email
          v-if="isModalOpen"
          @close-modal="closeModal"
      />

    </form>
  </div>

</template>
<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import router from "@/router/index.js";
import TheModal from "@/components/todo/TheModal.vue";
import ThModalErrEmail from "@/components/reg/ThуModalErrEmail.vue";

export default {
  components: {
    TheModal,
    ThModalErrEmail,
  },
  data() {
    return {
      formData:{
        name: '',
        email: '',
        password: '',
        confermPassword: '',
      },
      errors: {
        name: '',
        email: '',
        password: '',
        confermPassword: '',
      },
      showError: false,

      isModalOpen: false,
      currentColumnId: null,
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
        'signUp'
    ]),

    async sabmit(){
      this.validateName()
      this.validateEmail()
      this.validatePassword()
      this.validateConfirmPassword()

      await this.validateForm()
      if (!this.showError) {
        const formData = {
          formData:{
            ...this.formData
          }
        }
        await this.signUp(formData)

        console.log(formData)

        if(!this.accountExists) {
          await router.push('/auth')
          await this.resetForm()

        }else{
          this.openModal()
        }

        console.log('FFFFFFFFFFFFFFFFF')
        console.log(this.accountExists)

      }
    },


    validateName() {
      const nameRegex = /^\w+$/;
      if (this.formData.name.length < 5 ) {
        this.errors.name = 'Минимальное кол-во символов: 5';
      } else if (!nameRegex.test(this.formData.name)) {
        this.errors.name = 'Имя введено некорректно. Попробуйте другое имя';
      } else {
        this.errors.name = '';
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
        this.errors.password = 'Пароль должен содержать не менее 5 символов, включая одну букву и одну цифру.';
      } else {
        this.errors.password = '';
      }
    },
    validateConfirmPassword() {
      if (this.formData.confermPassword !== this.formData.password) {
        this.errors.confermPassword = 'Пароли не совпадают';
      } else {
        this.errors.confermPassword = '';
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

    resetForm(){
      this.formData = {name: '', email: '', password: '', confermPassword: ''}
    },
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
span{
  color: red;
}
</style>