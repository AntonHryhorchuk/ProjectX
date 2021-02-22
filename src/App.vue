<template>
  <div class="wrapper" id="app">
    <header>
      <div class="navbar navbar-fixed">
        <div class="container">
          <div class="navbar-content">
            <div class="logo-wrapper">
              <the-logo />
              <p class="header-logo .heartbeat">Dishes Mag</p>
            </div>
            <exchange-carousel />
            <div name="city" class="city">
              <p class="city__text">{{ currentLocation }}</p>
            </div>
            <div class="weather">
              <span class="weather__text">
                {{ Math.round(weatherTemp.temp) }}
              </span>
              <icon-celsium class="weather__celsium" />
              <img :src="imagehref" class="weather__icon" alt="" />
            </div>
            <div class="button-burger" @click="showDrawer">
              <span class="line line-1"></span><span class="line line-2"></span
              ><span class="line line-3"></span>
            </div>
            <div class="navbar-list__wrapper">
              <ul class="navbar-list">
                <li class="navbar-item" v-on:click="isVisible">
                  <router-link
                    to="/catalogue"
                    class="navbar-link"
                    active-class="active-link"
                    >Catalog</router-link
                  >
                </li>
                <li class="navbar-item" v-on:click="isVisible">
                  <router-link
                    to="/delivery"
                    class="navbar-link"
                    active-class="active-link"
                    >Delivery</router-link
                  >
                </li>
                <li class="navbar-item" v-on:click="isVisible">
                  <router-link
                    to="/about"
                    class="navbar-link"
                    active-class="active-link"
                    >About Us</router-link
                  >
                </li>
                <li class="navbar-item">
                  <a-badge :count="this.$store.state.basketCount">
                    <basket-modal />
                  </a-badge>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="sidebar-open-button"></div>
    <div class="sidebar" v-if="isSideVisible">
      <div class="container">
        <div class="sidebar-content">
          <p class="ui-text-small">Categories:</p>
          <side-bar :SideBarData="categoryes" />
        </div>
      </div>
    </div>
    <div
      class="container content-wrapper content-wrapper--sidebar content-wrapper--fix-header"
    >
      <router-view />
    </div>
    <login-button />
    <contacts-button />
    <is-login />
    <a-drawer
      title="Catalogue"
      placement="left"
      :closable="true"
      :visible="visible"
      @close="onClose"
    >
      <side-bar :SideBarData="categoryes" />
    </a-drawer>
  </div>
</template>

<script>
import "./styles/AppStyles.scss";

import SideBar from "./components/SideBar";
import categ from "./db/data2.json";
import TheLogo from "./assets/icons/TheLogo.vue";
import IconCelsium from "./assets/icons/IconCelsium.vue";
import ExchangeCarousel from "./components/ExchangeCarousel.vue";
import LoginButton from "./components/LoginButton.vue";
import ContactsButton from "./components/ContactsButton.vue";
import BasketModal from "./components/BasketModal.vue";
import IsLogin from "./components/IsLogin.vue";
export default {
  data() {
    return {
      categoryes: categ.list,
      infoBank: "",
      currentLocation: "",
      ipUser: "",
      weatherTemp: "",
      imagehref: "",
      visible: false,
      placement: "right",
      BuyArr: [],
      isSideVisible: false,
    };
  },
  created() {
    let axios = require("axios");
    axios.get("https://api.ipify.org?format=json").then((response) => {
      this.ipUser = response.data.ip;
      axios
        .get(`https://api.2ip.ua/geo.json?ip=${this.ipUser}`)
        .then((response) => {
          this.currentLocation = response.data.city;
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?q=${this.currentLocation}&appid=${process.env.VUE_APP_TOKEN}&units=metric`
            )
            .then((response) => {
              this.weatherTemp = response.data.main;
              this.imagehref = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
            });
        });
    });
  },

  components: {
    SideBar,
    TheLogo,
    IconCelsium,
    ExchangeCarousel,
    LoginButton,
    ContactsButton,
    BasketModal,
    IsLogin,
  },
  methods: {
    isVisible() {
      this.$route.name === "Catalogue"
        ? (this.isSideVisible = true)
        : (this.isSideVisible = false);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
  },
  computed: {
    GetBasketCount() {
      return this.$store.state.basketCount;
    },
  },
};
</script>
<style lang="scss" scoped>
.ant-badge {
  width: 70px;
  height: 25px;
}
</style>
