import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : "",
  },
  getters: {
    userInfo(state) {
      return state.userInfo
    }
  },
  mutations: {},
  actions: {},
  modules: {},
});
