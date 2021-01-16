import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
         groupID: 15051   
  },
  mutations: {
    SetGroup (state, value) {
      state.groupID=value;
    }
  },
  actions: {},
  modules: {}
});

// const store = createStore({
//   state () {
//     return {
//       groupID: 15051
//     }
//   },
//   mutations: {
//     SetGroup (state, value) {
//       state.groupID=value;
//     }
//   }

// })
// export default store 
// const app = createApp({})
// app.use(store)