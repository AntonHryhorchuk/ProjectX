<template>
  <div class="content">
    <div class="content__name ">
      <p class="tracking-in-expand">{{ this.$store.state.groupName }}</p>
    </div>
    <div class="holder tracking-in-contract-bck-bottom">
      <div
        class="ui-card ui-card--shadow-always"
        v-for="(card, index) in paginatedData"
        :key="index"
        @click="onClick(card)"
      >
        <div class="image-wrapper ">
          <img :src="card.pics[0]" alt="" srcset="" />
        </div>
        <p class=".ui-text-small center">{{ card.title }}</p>
        <p class="ui-title-3">
          {{ Math.round(card.price * 1.18) }}
          <span class="currency">{{ card.currency }}</span>
        </p>
        <p>{{ card.Производитель }}</p>
        <!-- modal -->
        <a-modal v-model="visible" :title="ProdObject.title" on-ok="handleOk">
          <template slot="footer">
            <a-button key="back" @click="handleCancel">
              Return
            </a-button>
            <a-button key="submit" type="primary" @click="handleOk1">
              Add Item
            </a-button>
          </template>
          <!-- carousel -->
          <div class="carousel-wrapper">
            <a-carousel autoplay arrows>
              <div
                class="image-holder"
                v-for="(pic, index) in ProdObject.imageArr"
                :key="index"
              >
                <img class="prodimg" :src="pic" />
              </div>
            </a-carousel>
          </div>
          <!-- end carousel -->
          <div class="modal__description" v-html="ProdObject.description"></div>
          <p class="modal__price">
            {{ `${Math.round(ProdObject.price)} UAH` }}
          </p>
          <a-input-number size="large" :min="1" :max="100000" v-model="qty" />
          <p>Quantity</p>
        </a-modal>
        <!-- end modal -->
      </div>

      <div class="nav-content">
        <div
          class="button button--plain button-primary"
          v-show="pageNumber > 0"
          @click="prevPage"
        >
          PREV
        </div>
        <div
          class="button button--plain button-success"
          v-show="pageNumber < pageCount - 1"
          @click="nextPage"
        >
          NEXT
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../styles/CradStyles.scss";
export default {
  data() {
    return {
      qty: 1,
      categoryName: "",
      pageNumber: 0,
      timeOut: 0,
      visible: false,
      ProdObject: {
        image: "",
        imageArr: "",
        article: "",
        title: "",
        price: 0,
        description: "",
        qty: 0,
      },
    };
  },
  components: {},
  props: {
    CardData: {
      type: Array,
      required: true,
    },
    size: {
      type: Number,
      required: false,
      default: 20,
    },
  },
  mounted() {
    if (localStorage.length) {
      this.$store.commit("Count", localStorage.length);
    }
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk1() {
      this.loading = true;
      setTimeout(() => {
        this.visible = false;
        this.loading = false;
      }, 1000);
      this.ProdObject.qty = this.qty;
      localStorage.setItem(
        this.ProdObject.article,
        JSON.stringify(this.ProdObject)
      );

      this.$store.commit("Count", localStorage.length);
    },
    handleCancel() {
      this.visible = false;
      localStorage.clear();
    },
    handleOk() {
      this.visible = false;
    },
    nextPage() {
      this.pageNumber++;
      this.goUp();
    },
    prevPage() {
      this.pageNumber--;
      this.goUp();
    },
    onClick(item) {
      (this.ProdObject = {
        image: item.pics[0],
        imageArr: item.pics,
        article: item.id,
        title: item.title,
        price: item.price * 1.18,
        description: item.description,
      }),
        this.showModal();
    },
    goUp() {
      let top = Math.max(
        document.body.scrollTop,
        document.documentElement.scrollTop
      );
      if (top > 0) {
        window.scrollBy(0, -2000);
        this.timeOut = setTimeout("goUp()", 20);
      } else clearTimeout(this.timeOut);
    },
  },

  computed: {
    pageCount() {
      let l = this.CardData.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      let start = this.pageNumber * this.size,
        end = start + this.size;
      let arr = this.CardData.slice(start, end);
      for (let i = 0; i < arr.length; i++) {
        var arrayOfStrings = arr[i].Ссылка_изображения.split(",");
        arr[i].pics = arrayOfStrings;
      }
      return arr;
    },
  },
};
</script>
