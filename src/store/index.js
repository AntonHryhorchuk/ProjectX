import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
        basketCount: 0,
         groupName: "",
         groupID: "" ,
         user: null,
         error: null,
         userMail: null,  
  },
  mutations: {
    SetGroup (state, value) {
      state.groupID=value;
    },
    SetGroupName (state, value){
      state.groupName=value;
    },
    AddItem (state, payload){
      state.basketItems.push({payload});
    },
    setError(state, payload) {
      state.error = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    Count(state,payload) {
      state.basketCount = payload
    },
    setUserMail(state,payload){
      state.userMail = payload;
    },
  },
  actions: {
    
  },
  modules: {},
  getters:{
    getUser(state) {
      return state.user;
    },
    isUserAuth(state) {
      return !!state.user;
    },
    getError(state) {
      return state.error;
    }
  }
  
});
