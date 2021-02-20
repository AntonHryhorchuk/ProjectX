<template>
       <a-modal v-model="visible" :title="prodTitle" on-ok="handleOk">
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
              v-for="(pic, index) in picsArr"
              :key="index"
            >
              <img class="prodimg" :src="pic" />
            </div>
          </a-carousel>
        </div>
        <!-- end carousel -->
        <div class="modal__description" v-html="itemDescription"></div>
        <p class="modal__price">{{ ` ${Math.floor(prodPrice)} UAH` }}</p>
        
      </a-modal>
</template>
