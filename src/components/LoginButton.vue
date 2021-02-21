<template>
  <div class="login">
    <div class="button-wrapper" >
      <button class="button-wrapper__button">
        <icon-login class="button-wrapper__button-icon" />
      </button>
      <div class="button-wrapper__link-holder" v-if="!this.$store.state.userMail">
        <a
          class="button-wrapper__link-holder--registration"
          @click="LoginDrawer"
          >вход</a>
        <a class="button-wrapper__link-holder--enter"
        @click="RegDrawer"
        >регистрация</a>
      </div>
      <div class="ExitDrawer" v-else>
        <a class="button-wrapper__link-holder--enter"
        @click="ExitDrawer"
        >Выход</a>
      </div>
    </div>
    <a-drawer
      :title="drawerTitle"
      :width="420"
      placement="right"
      :closable="true"
      :visible="visible"
      @close="onClose"
    >
      <form-login v-if="islogin"></form-login>
      <form-registration v-if="isReg"></form-registration>
    </a-drawer>
  </div>
</template>

<script>
import IconLogin from "../assets/icons/IconLogin.vue";
import FormLogin from "../components/FormLogin.vue";
import FormRegistration from './FormRegistration.vue';

import "../styles/login/LoginButton.scss";

export default {
  data() {
    return {
      visible: false,
      drawerTitle: "",
      islogin: false,
      isReg: false,

    };
  },
  components: { IconLogin, FormLogin, FormRegistration },
  methods: {
    LoginDrawer() {
      this.isReg = false;
      this.islogin = true;
      this.drawerTitle = "Login";
      this.showDrawer();
    },
    RegDrawer() {
      this.islogin = false;
      this.isReg = true;
      this.drawerTitle = "Registration";
      this.showDrawer();
    },
   
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.islogin = false;
      this.visible = false;
    },
    ExitDrawer() {
      this.$store.commit('setUser',null);
      this.$store.commit('setUserMail',null);
    }
  },
};
</script>

