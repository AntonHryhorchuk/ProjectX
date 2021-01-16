<template>
  <div class="wrapper" id="app">
    <header>
      <div class="navbar navbar-fixed">
        <div class="container">
          <div class="navbar-content">
            <div class="logo-wrapper">
              <the-logo />
              <p class="header-logo">Dishes Mag</p>
            </div>
            <div class="swiper__card">
              <a-carousel :dots="false" :autoplay="true">
                <div class="card" v-for="card in info.data" :key="card.index">
                  <div class="card__currency">{{ card.ccy }}</div>
                  <div class="card__value">
                    <div class="card__value--buy">buy-{{ card.buy }} uah</div>
                    <div class="card__value--sale">
                      sale-{{ card.sale }} uah
                    </div>
                  </div>
                </div>
              </a-carousel>
            </div>
            <div name="city" class="city">{{ ipinfo }}</div>
            <div name="city" class="weather">{{ weather.data.main.temp}}
              <icon-celsium />
              <img :src="imagehref" class='weather__icon' alt="">
               

            </div>
            <div class="button-burger">
              <span class="line line-1"></span><span class="line line-2"></span
              ><span class="line line-3"></span>
            </div>
            <div class="navbar-list__wrapper">
              <ul class="navbar-list">
                <li class="navbar-item">
                  <a class="navbar-link" href="get-started.html">Home</a>
                </li>
                <li class="navbar-item">
                  <router-link to="/catalogue" class="navbar-link"
                    >Catalog</router-link
                  >
                </li>
                <li class="navbar-item">
                  <router-link to="/delivery" class="navbar-link"
                    >Delivery</router-link
                  >
                </li>
                <li class="navbar-item">
                  <router-link to="/about" class="navbar-link"
                    >About Us</router-link
                  >
                </li>
                <li class="navbar-item">
                  <router-link to="/about" class="navbar-link"
                    >basket</router-link
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="sidebar-open-button">
      <div class="button-burger">
        <span class="line line-1"></span><span class="line line-2"></span
        ><span class="line line-3"></span>
      </div>
    </div>
    <div class="sidebar">
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
import SideBar from "./components/SideBar";
import categ from "./db/data2.json";
import TheLogo from "./assets/icons/TheLogo.vue";
import IconCelsium from './assets/icons/IconCelsium.vue';
// start

// end
export default {
  data() {
    return {
      categoryes: categ.list,
      select_id: "15051",
      info: '',
      ipinfo: '',
      ipuser: '',
      weather: '',
      wicon:'',
      token: '41ae0f1ab65beed63397c4a225017ba2',
      imagehref: `http://openweathermap.org/img/wn/@2x.png`
    };
  },
  created() {
    const axios = require("axios");
    let axios1 = require("axios");
    let axios2 = require("axios");
    axios
      .get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
      .then((response) => (this.info = response));
    axios1.get("https://api.ipify.org?format=json").then((response) => {
      this.ipuser = response.data.ip;
      axios2
        .get(`https://api.2ip.ua/geo.json?ip=${this.ipuser}`)
        .then((response) => {
                   this.ipinfo = response.data.city;
                    axios1
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${this.ipinfo}&appid=${this.token}&units=metric`).then((response) =>{this.weather=response;
        this.imagehref= `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`});
        });
    });
    
  },
  components: {
    SideBar,
    TheLogo,
    IconCelsium,
  },
};
</script>

<style lan="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Potta+One&display=swap");
.header-logo {
  font-family: "Potta One", cursive;
  font-size: 18px;
  margin: 0 0 0 5px;
}
.swiper__card {
  width: 300px;
  height: 80px;
}
.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}
@import url("https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz&display=swap");

.card {
  padding: 20px;
  display: flex !important;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 250px;
  height: 100%;
}
.card__currency {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Yanone Kaffeesatz", sans-serif;
  font-size: 22px;
  color: green;
}
.card__value {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: "Yanone Kaffeesatz", sans-serif;
  font-size: 16px;
  color: red;
}
.ant-carousel .slick-slider .slick-initialized {
  height: 100%;
}
.weather__icon{
  width: 75px;
}
</style>
