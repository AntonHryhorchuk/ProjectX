<template>
  <div class="holder">
    <div
      class="ui-card ui-card--shadow-always"
      v-for="(card, index) in paginatedData"
      :key="index"
      @click="onClick(card)"
    >
    <div class="image-wrapper">
      <img :src="card.pics[0]" alt="" srcset="" />
      </div>
      <p class="ui-title-1 center">{{ card.title }}</p>
      <p class="ui-title-3">{{ Math.floor(card.price * 1.18) }}<span class="currency"> {{card.currency}}</span></p>
      <p>{{ card.Производитель }}</p>
      <!-- modal -->
      <a-modal v-model="visible" :title="prodTitle" on-ok="handleOk">
        <template slot="footer">
          <a-button key="back" @click="handleCancel">
            Return
          </a-button>
          <a-button key="submit" type="primary" @click="handleOk1">
            Добавить в корзину
          </a-button>
        </template>
        <!-- carousel -->
        <div class="carousel-wrapper">
          <a-carousel autoplay arrows>
            <div
              slot="prevArrow"
              class="custom-slick-arrow"
              style="left: 10px;zIndex: 1"
            >
              <div
                slot="nextArrow"
                class="custom-slick-arrow"
                style="right: 10px"
              >
                <a-icon type="right-circle" />
              </div>
              <a-icon type="left-circle" />
            </div>
            <div
              class="image-holder"
              v-for="(pic, index) in picsArr"
              :key="index"
            >
              <img class="prodimg" :src="pic" />
            </div>
          </a-carousel>
        </div>
        <!-- end carousel -->
        <p>{{ prodTitle }}</p>
        <p>{{ prodPrice }}</p>
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
</template>

<script>
export default {
  data() {
    return {
      pageNumber: 0,
      timeOut: 0,
      visible: false,
      prodTitle: " ",
      prodPrice: " ",
      prodImg: " ",
      picsArr: [],
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
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk1() {
      this.loading = true;
      setTimeout(() => {
        this.visible = false;
        this.loading = false;
      }, 3000);
     
    },
    handleCancel() {
      this.visible = false;
    },
    handleOk(e) {
      console.log(e);
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
      console.log(item.title);
      this.prodTitle = item.title;
      this.prodPrice = item.price * 1.18;
      this.prodImg = item.pics[0];
      this.picsArr = item.pics;
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

<style lang="scss" scope>
.holder {
  width: 100%;
  display: flex;
  width: 100%;
  padding: 20px;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.ui-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 5px 0px 5px 5px;
  width: 100%;
  max-width: 230px;
  min-height: 440px;
}
@media screen and (max-width: 768px) {
  .ui-card {
    width: 400px;
    height: auto;
  }
}
.ui-card:hover {
  transform: scale(1.02);
  cursor: pointer;
  transition: all 0.3s ease;
}
.ui-card:last-child {
  margin-right: 0;
}

.ui-title-1 {
  font-size: 12px !important;
}
.button-primary {
  margin-right: 10px;
}
.nav-content {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.image-holder {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  object-fit: contain;
}
.prodimg {
  width: 300px;
  /* height: 300px; */
}
.prodimg > img {
  object-fit: cover;
}
.custom-slick-arrow .slick-arrow slick-prev {
  color: black !important;
}
.ant-carousel .slick-dots li {
  background-color: black;
}
.carousel-wrapper {
  width: 300px;
  margin-left: auto;
  margin-right: auto;
}
.image-wrapper{
  width: 100%;
  height: 290px;
  display: flex;
  align-items: center;
  justify-content: center;
  

}
img{
 max-height: 290px;
}
</style>
