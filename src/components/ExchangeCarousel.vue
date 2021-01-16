<template>
  <swiper :slides-per-view="1" :space-between="50">
    <swiper-slide v-for="card in info.data" :key="card.index"
      ><div class="card">
        <div class="card__currency">{{ card.ccy }}</div>
        <div class="card__value">
          <div class="card__value--buy"></div>
          <div class="card__value--sell"></div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "../../node_modules/swiper/swiper.scss"
export default {
  data() {
    return {
      info: null,
    };
  },
  created() {
    const axios = require("axios");
    axios
      .get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
      .then((response) => (this.info = response));
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz&display=swap");

.card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 250px;
  height: 50px;
  background-color: grey;
  &__currency {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Yanone Kaffeesatz", sans-serif;
    font-size: 22px;
    color: green;
  }
  &__value {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: "Yanone Kaffeesatz", sans-serif;
    font-size: 14px;
    color: red;
  }
}
</style>
