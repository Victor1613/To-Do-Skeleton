<template>
  <div class="reg">

    <div class="registration container-Reg">
      <div class="reg__title">
        <div class="content">
          Регистрация
        </div>
      </div>
      <div class="to-page">
        <p>
          <RouterLink
              to="/auth"
              class="to-page__reg"
          >
            Авторизуйтесь,
          </RouterLink>
          если есть аккаунт
        </p>
      </div>

      <form @submit.prevent="sabmit" class="registration-form">
        <div class="reg-form__field">
          <label class="registration-form__label" for="password">Имя</label>
          <div class="registration-form__input">
            <input
                type="text"
                placeholder="Имя"
                class="registration-form__input--text"
                @input="validateName"
                v-model="formData.name"
            >
          </div>
          <span v-if="errors.name">
          {{errors.name }}
        </span>
        </div>
        <div class="reg-form__field">
          <label class="registration-form__label" for="password">Почта</label>
          <div class="registration-form__input">
            <input
                type="text"
                placeholder="email@inbox.com"
                class="registration-form__input--text"
                @blur="validateEmail"
                v-model="formData.email"
            >
          </div>
          <span v-if="errors.email">
            {{errors.email }}
          </span>
        </div>
        <div class="reg-form__field">
          <label class="registration-form__label" for="password">Пароль</label>
          <div class="registration-form__input">
            <input
                type="password"
                placeholder="Пароль"
                class="registration-form__input--text"
                v-model="formData.password"
                @input="validatePassword"
            >
          </div>
          <span v-if="errors.password">
            {{errors.password }}
          </span>
        </div>
        <div class="reg-form__field">
          <label class="registration-form__label" for="password">Повторить пароль</label>
          <div class="registration-form__input">
            <input
                type="password"
                placeholder="Повторить пароль"
                class="registration-form__input--text"
                v-model="formData.confermPassword"
                @input="validateConfirmPassword"
            >
          </div>
          <div class="registration-form__input--err">
          <span v-if="errors.confermPassword">
            {{errors.confermPassword }}
          </span>
          </div>
        </div>

        <div class="reg-button">
          <button
              class="reg-button__submit"
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
<!--      <img class="wave" src="../assets/img/reg/img1.svg">-->
<!--      <img class="wave" style="bottom: 0px" src="../assets/img/reg/img2.svg">-->
    </div>
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
        this.errors.password = 'Минимальное кол-во символов: 5';
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

.registration {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 470px;
  height: 666px;
  background: #FFF;
  border-radius: 20px;
 }

.container-Reg{
  margin: 3vw auto;
}

.reg__title {
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
  padding-bottom: 15px;
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

.reg-form__field {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
  height: 110px;
}

.registration-form__label{
  color: #7415D9;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-left: 58px;
}

.registration-form__input {
  color: #D9D3E0;

  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-left: 58px;

}
.registration-form__input--text{
  width: 357px;
  height: 43px;
  flex-shrink: 0;
  border: 1px solid #988F8F;
  padding-left: 15px;
  font-size: 17px;
}
.reg-button{
  padding-left: 58px;
}
.reg-button__submit{
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