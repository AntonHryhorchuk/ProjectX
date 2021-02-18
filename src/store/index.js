import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    
         groupID: 15051 ,
         basketItems: [],
         user: null,
         error: null  
  },
  mutations: {
    SetGroup (state, value) {
      state.groupID=value;
    },
    AddItem (state, payload){
      state.basketItems.push({payload});
    },
    setError(state, payload) {
      state.error = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    signUpAction({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          commit("setUser", response.user);
        })
        .catch(error => {
          commit("setError", error.message);
        });
    }
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
