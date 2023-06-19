import { createStore } from "vuex";
import cart from "./modules/cart";
import wishlist from "./modules/wishlist";
//add products as module
import { Auth } from "./modules/Auth/auth";
import { Products } from "./modules/Products/products";
import { Categories } from "./modules/Categories/categories";
export default createStore({
  state: {
    userInfo:
      localStorage.getItem("userInfo") &&
        localStorage.getItem("userInfo") != "undefined"
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
    loadingScreen: false

  },
  getters: {
    userInfo(state) {
      return state.userInfo;
    },
    loadingScreen(state) {
      return state.loadingScreen;
    },
  },
  mutations: {
    SET_USER_DATA_INFO(state, userInfo) {
      state.buyerUserData = userInfo;
    },
    CHANGE_LOADING_SCREEN(state, data) {
      state.loadingScreen = data;
    },
  },
  actions: {
    getuserInfo({ commit }) {
      auth.getuserInfo().then((res) => {
        commit("SET_USER_DATA_INFO", res.data.items);
        localStorage.setItem("userInfo", JSON.stringify(res.data.items));
      });
    },
    changeLoadingScreen({ commit }, value) {
      commit("CHANGE_LOADING_SCREEN", value);
    },

  },
  modules: {
    cart,
    wishlist,
    Products,
    Categories,
    Auth
  },
});
