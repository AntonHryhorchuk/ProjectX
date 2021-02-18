import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import uimini from "uimini";
import "./styles/uimini.css";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import Axios from 'axios';
import "@/plugins/firebase";


Vue.config.productionTip = false;


Vue.use(Antd);


new Vue({
  router,
  store,
  uimini, 
  Axios,
   render: h => h(App)
}).$mount("#app");
