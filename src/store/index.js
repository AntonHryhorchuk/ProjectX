import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    
         groupID: 15051 ,
         basketItems: []  
  },
  mutations: {
    SetGroup (state, value) {
      state.groupID=value;
    },
    AddItem (state,id,img,text,price){
      state.basketItems.push({id,img,text,price});
    }
  },
  actions: {},
  modules: {}
});
