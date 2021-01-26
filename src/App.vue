<template>
  <div class="wrapper" id="app">
    <header>
      <div class="navbar navbar-fixed">
        <div class="container">
          <div class="navbar-content">
            <div class="logo-wrapper">
              <the-logo />
              <p class="header-logo tracking-in-expand">Dishes Mag</p>
            </div>
            <div class="swiper__card">
              <a-carousel class="currency" :dots="false" :autoplay="true">
                <div
                  class="card"
                  v-for="card in infoBank.data"
                  :key="card.index"
                >
                  <div class="card__currency">{{ card.ccy }}</div>
                  <div class="card__value">
                    <div class="card__value--buy">
                      <span class="card__value-text">BUY </span
                      >{{ Math.ceil(card.buy * 100) / 100
                      }}<span class="card__value-text"> UAH</span>
                    </div>
                    <div class="card__value--sale">
                      <span class="card__value-text">SALE </span
                      >{{ Math.ceil(card.sale * 100) / 100
                      }}<span class="card__value-text"> UAH</span>
                    </div>
                  </div>
                </div>
              </a-carousel>
            </div>
            <div name="city" class="city">
              <p class="city__text">{{ currentIpGeo }}</p>
            </div>
            <div class="weather">
              <span class="weather__text">
                {{ weatherTemp.temp }}
              </span>
              <icon-celsium class="weather__celsium" />
              <img :src="imagehref" class="weather__icon" alt="" />
            </div>
            <div class="button-burger" @click="showDrawer">
              <span class="line line-1"></span><span class="line line-2"></span
              ><span class="line line-3"></span>
            </div>
            <a-drawer
              title="Basic Drawer"
              :placement="placement"
              :closable="false"
              :visible="visible"
              @close="onClose"
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </a-drawer>
            <div class="navbar-list__wrapper">
              <ul class="navbar-list">
                <li class="navbar-item">
                  <router-link
                    to="/catalogue"
                    class="navbar-link"
                    active-class="active"
                    :click='isVisible'
                    >Catalog</router-link
                  >
                </li>
                <li class="navbar-item">
                  <router-link
                    to="/delivery"
                    class="navbar-link"
                    active-class="active"
                    >Delivery</router-link
                  >
                </li>
                <li class="navbar-item">
                  <router-link
                    to="/about"
                    class="navbar-link"
                    active-class="active"
                    >About Us</router-link
                  >
                </li>
                <li class="navbar-item">
                  <router-link to="/about" class="navbar-link"
                    ><the-basket
                  /></router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="sidebar-open-button">
    
    </div>
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
  </div>
</template>

<script>
import "./styles/AppStyles.scss"

import SideBar from "./components/SideBar";
import categ from "./db/data2.json";
import TheLogo from "./assets/icons/TheLogo.vue";
import IconCelsium from "./assets/icons/IconCelsium.vue";
import TheBasket from "./assets/icons/TheBasket.vue";

export default {
  data() {
    return {
      categoryes: categ.list,
      select_id: "15051",
      infoBank: "",
      currentIpGeo: "",
      ipUser: "",
      weatherTemp: "",
      token: "41ae0f1ab65beed63397c4a225017ba2",
      imagehref: "",
      visible: false,
      placement: "right",
      BuyArr: [],
      isSideVisible: true,
    };
  },
  created() {
    let axios = require("axios");
    axios
      .get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
      .then((response) => (this.infoBank = response));
    axios.get("https://api.ipify.org?format=json").then((response) => {
      this.ipUser = response.data.ip;
      axios
        .get(`https://api.2ip.ua/geo.json?ip=${this.ipUser}`)
        .then((response) => {
          this.currentIpGeo = response.data.city;
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?q=${this.currentIpGeo}&appid=${this.token}&units=metric`
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
    TheBasket,
  },
  methods: {
    isVisible(){
this.isSideVisible=true;
console.log(this.isSideVisible)
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onChange(e) {
      this.placement = e.target.value;
    },
  },
};
</script>
