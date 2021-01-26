<template>
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
</template>

<script>
export default {
  data() {
    return {
       infoBank: "",
    };
  },
  mounted() {
    const axios = require("axios");
    axios
      .get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
      .then((response) => (this.infoBank = response));
  },
};
</script>

