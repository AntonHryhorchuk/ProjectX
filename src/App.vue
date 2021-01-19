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

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Potta+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Teko:wght@500&display=swap");
@-webkit-keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
@keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
.tracking-in-expand {
  -webkit-animation: tracking-in-expand 6s cubic-bezier(0.215, 0.61, 0.355, 1)
    infinite both;
  animation: tracking-in-expand 6s cubic-bezier(0.215, 0.61, 0.355, 1) infinite
    both;
}
.header-logo {
  display: block;
  font-family: "Potta One", cursive;
  font-size: 18px;
  margin: 0 0 0 5px;
  width: 100%;
  max-width: 120px;
}
.swiper__card {
  width: 100%;
  max-width: 250px;
  height: 80px;
}
.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  max-width: 200px;
}

.card {
  padding: 20px;
  display: flex !important;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  max-width: 250px;
  height: 100%;
  margin-right: 0;
  &__currency {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Yanone Kaffeesatz", sans-serif;
    font-size: 22px;
    color: rgb(131, 133, 131);
  }
  &__value {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: "Teko", sans-serif;
    font-size: 16px;
    color: rgb(212, 109, 109);
    &-text {
      color: darkgrey;
    }
  }
}

.ant-carousel .slick-slider .slick-initialized {
  height: 100%;
}
.weather {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &__icon {
    width: 75px;
  }
  &__text {
    font-family: "Teko", sans-serif;
    font-size: 22px;
    color: rgb(61, 218, 132);
  }
}
.weather__celsium{
  position: absolute;
  top: 50%;
  transform: translateY(-59%);
  left: 28px;
}
@media screen and (max-width: 768px) {
  .city {
    display: none;
  }
  .weather {
    display: none;
  }
  .currency {
    display: none;
  }
}
@media screen and (max-width: 991px) {
  .weather {
    display: none;
  }
}
.active {
  color: yellowgreen;
}
.city__text {
  font-family: "Teko", sans-serif;
  font-size: 22px;
  color: rgb(61, 218, 132);
  margin-bottom: 0px;
}
</style>
