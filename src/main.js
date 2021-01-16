import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import uimini from "uimini";
import "../node_modules/uimini/dist/css/uimini.min.css";
import Vuikit from 'vuikit';
import VuikitIcons from '@vuikit/icons';
import '@vuikit/theme';
import "../node_modules/vuikit/";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import Axios from 'axios';
Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(Vuikit);
Vue.use(VuikitIcons);
Vue.use(Axios);

new Vue({
  router,
  store,
  uimini, 
  Axios,
   render: h => h(App)
}).$mount("#app");
