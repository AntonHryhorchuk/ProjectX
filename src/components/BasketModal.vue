<template>
  <div class="container" @click="ShowModal">
    <the-basket />
    <a-modal v-model="visible" :footer="null" title="Products">
      <a-row v-for="(item, index) in basketArr" :key="index">
        <a-col :span="4">
          <div class="products__item-image">
            <img :src="item.image" alt="" />
          </div>
        </a-col>
        <a-col :span="10">
          <div class="item-title">
            <span class="products__item-title">{{ item.title }}</span>
          </div>
        </a-col>
        <a-col :span="5">
          <p class="height-50">
            <a-input-number
              :min="1"
              :max="100000"
              v-model="item.qty"
              @change="onChange"
            />
          </p>
        </a-col>
        <a-col :span="3">
          <div class="item-price">
            <span class="products__item-price">{{
              Math.round(item.price * 1.18 * item.qty)
            }}</span>
          </div>
        </a-col>
        <a-col :span="2">
          <a-button
            class="delete-button"
            type="danger"
            @click="deleteEvent(item)"
          >
            <a-icon type="delete" />
          </a-button>
        </a-col>
      </a-row>
      <div class="product-sum">
      <p>{{`Total sum ${sumvalue}  UAH`}}</p>
      </div>
      <a-button v-if="sumvalue>0 && this.$store.getters.getUser" type="primary">
      Send an order
    </a-button>
    </a-modal>
  </div>
</template>

<script>
import TheBasket from "../assets/icons/TheBasket.vue";

export default {
  data() {
    return {
      sumvalue: 0,
      visible: false,
      basketArr: [],
    };
  },
  components: { TheBasket },
  computed: {
    SummResult: function() {
      return this.basketArr.reduce((a, b) => a + b.summ, 0);
    },
  },
  methods: {
    deleteEvent: function(item) {
      this.basketArr.splice(this.basketArr.indexOf(item), 1);
      localStorage.removeItem(item.article);
      this.$store.commit("Count", localStorage.length);
      this.sumvalue=0;
      this.basketArr.forEach(element => {
       this.sumvalue+=Math.floor(element.qty*element.price*1.18);
       
     });
    },
    onChange() {
     localStorage.clear();
     this.sumvalue=0;
     this.basketArr.forEach(element => {
       this.sumvalue+=Math.floor(element.qty*element.price*1.18);
       localStorage.setItem(element.article,JSON.stringify(element));
     });
     
    },
    ShowModal() {
      console.log(localStorage.length)
      this.basketArr.length = 0;
      for (let key in localStorage) {
        if (
          key === "loglevel:webpack-dev-server" ||
          key === "length" ||
          key === "clear" ||
          key === "getItem" ||
          key === "key" ||
          key === "removeItem" ||
          key === "setItem"
        ) {
          continue;
        } else {
          let product = JSON.parse(localStorage.getItem(key));
          this.sumvalue=0;
          this.sumvalue+=Math.floor(product.qty*product.price*1.18);
          this.basketArr.push(product);
         
        }

      }
      this.visible = true;
      
    },
  },
};
</script>
<style lang="scss" scoped>
.products__item {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  &-title {
    font-size: 10px;
  }
}
.products__item-image {
  width: 50px;
  height: auto;
}
img {
  object-fit: contain;
}
.ant-col-6 {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ant-col-4 {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.item-title {
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-button {
  display: flex;
  align-items: center;
  justify-content: center;
}
.item-price {
  width: 40px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-sum{
  margin-top: 30px;
  font-size: 22px;
  font-weight: 600;
}
</style>
