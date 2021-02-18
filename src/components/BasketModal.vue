<template>
  <div class="container" @click="ShowModal">
    <the-basket />
    <a-modal v-model="visible" :footer="null" title="Products" @ok="handleOk">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="Product List">
          <ul class="products">
            <li
              class="products__item"
              v-for="(item, index) in basketArr"
              :key="index"
            >
              <div class="products__item-image">
                <img :src='item.image' alt="" />
              </div>
              <span class="products__item-title">{{ item.title }}</span>
              <a-input-number
                size="small"
                :min="1"
                :max="100000"
                :default-value="1"
                @change="onChange"
              />
              <span class="products__item-price">{{
                Math.round(item.price * 1.18)
              }}</span>
            </li>
          </ul>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Tab 2" force-render>
          Content of Tab Pane 2
        </a-tab-pane>
        <a-tab-pane key="3" tab="Tab 3">
          Content of Tab Pane 3
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>

<script>
import TheBasket from "../assets/icons/TheBasket.vue";

export default {
  data() {
    return {
      visible: false,
      basketArr: [{}],
    };
  },
  components: { TheBasket },
  methods: {
    ShowModal() {
      this.basketArr.length=0;
      for (let key in localStorage) {
          if (key == "loglevel:webpack-dev-server" || key == "length" || key == "clear" || key == "getItem" || key === "key" || key === "removeItem" || key ==="setItem")  {
    continue
  }
    else{
        let product = JSON.parse( localStorage.getItem(key));
    this.basketArr.push(product);
        // console.log(`${localStorage.getItem(key)}`);
        }
        console.log(this.basketArr[0])
      }
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    callback(key) {
      console.log(key);
    },
    onChange(value) {
      console.log('changed', value);
    },
    onCancel(){
this.basketArr.length=0;        
    }
  },
};
</script>
 <style lang="scss" scoped>
 .products__item{
     display: flex;
     align-items: center;
     justify-content: space-around;
     flex-direction: row;
 }
 .products__item-image{
     width: 50px;
     height: auto;
 }
 img{
     object-fit: contain;
 }
 </style>