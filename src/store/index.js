import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from 'vuex-persistedstate';
import cart from "./modules/cart";
import wishlist from "./modules/wishlist";
import auth from "@/services/auth";
import { baseURL } from "@/apis/Api";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo:
      localStorage.getItem("userInfo") &&
      localStorage.getItem("userInfo") != "undefined"
        ? JSON.parse(localStorage.getItem("userInfo"))
        : "",

    userData:
      localStorage.getItem("userData") &&
      localStorage.getItem("userData") != "undefined"
        ? JSON.parse(localStorage.getItem("userData"))
        : "",

    coupons: [],
    guestId: "",
  },
  getters: {
    userInfo(state) {
      return state.userInfo;
    },
    userData(state) {
      return state.userData;
    },
    userGuestId(state) {
      return state.guestId;
    },
  },
  mutations: {
    SET_USER_DATA_INFO(state, userInfo) {
      state.userData = userInfo;
    },
    SET_USER_COUPONS(state, coupons) {
      state.coupons = coupons;
    },
    SET_USER_GUEST_ID(state, guestId) {
      state.guestId = guestId;
    },
  },
  actions: {
    getUserInfo({ commit }) {
      auth.getUserInfo().then((res) => {
        commit("SET_USER_DATA_INFO", res.data.items);
        localStorage.setItem("userData", JSON.stringify(res.data.items));
      });
    },
    getUserGuestId({ commit }) {
      let userExist = localStorage.getItem("userData");
      let guestUser = localStorage.getItem("guest-id");
      if (userExist === null && guestUser === null) {
        axios
          .post(`${baseURL}guest/generate-token`)
          .then((res) => {
            console.log("SET_USER_DATA_INFO", res);
            commit("SET_USER_GUEST_ID", res.data.items.uuid);
            localStorage.setItem("guest-id", res.data.items.uuid);
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (userExist === null && guestUser) {
        commit("SET_USER_GUEST_ID", guestUser);
      }
      if (guestUser) {
        commit("SET_USER_GUEST_ID", guestUser);
      }
    },
  },
  modules: {
    cart,
    wishlist,
  },
  // plugins: [createPersistedState()]
});
