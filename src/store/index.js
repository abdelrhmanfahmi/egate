import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from 'vuex-persistedstate';
import cart from "./modules/cart";
import wishlist from "./modules/wishlist";
import suppliers from "./modules/suppliers";
import auth from "@/services/auth";
// import { baseURL } from "@/apis/Api";
import globalAxios from "../services/global-axios";

// firebase
import { getToken } from "firebase/messaging";
import { messaging } from "@/plugins/firebase";

import profile from "@/services/profile";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo:
      localStorage.getItem("userInfo") &&
      localStorage.getItem("userInfo") != "undefined"
        ? JSON.parse(localStorage.getItem("userInfo"))
        : "",

    buyerUserData:
      localStorage.getItem("buyerUserData") &&
      localStorage.getItem("buyerUserData") != "undefined"
        ? JSON.parse(localStorage.getItem("buyerUserData"))
        : "",

    coupons: [],
    guestId: "",
    firebaseToken: null,
    notifications: null,
    notificationsLength: null,
    badges: null,
  },
  getters: {
    userInfo(state) {
      return state.userInfo;
    },
    buyerUserData(state) {
      return state.buyerUserData;
    },
    userGuestId(state) {
      return state.guestId;
    },
    userBadges(state) {
      return state.badges;
    },
  },
  mutations: {
    SET_USER_DATA_INFO(state, userInfo) {
      state.buyerUserData = userInfo;
    },
    SET_USER_COUPONS(state, coupons) {
      state.coupons = coupons;
    },
    SET_USER_GUEST_ID(state, guestId) {
      state.guestId = guestId;
    },
    SET_FIREBASE_TOKEN(state, firebaseToken) {
      state.firebaseToken = firebaseToken;
    },
    SET_NOTIFICATIONS(state, notifications) {
      state.notifications = notifications;
    },
    SET_NOTIFICATIONS_LENGTH(state, notificationsLength) {
      state.notificationsLength = notificationsLength;
    },
    SET_USER_BADGES(state, userBadges) {
      state.badges = userBadges;
    },
  },
  actions: {
    getUserInfo({ commit }) {
      auth.getUserInfo().then((res) => {
        if (localStorage.getItem("globalAddressUUID") === null) {
          localStorage.setItem(
            "globalAddressUUID",
            res.data.items.address_uuid
          );
        }
        // localStorage.setItem('globalAddressUUID' , res.data.items.address_uuid )
        commit("SET_USER_DATA_INFO", res.data.items);
        localStorage.setItem("buyerUserData", JSON.stringify(res.data.items));
      });
    },
    getUserGuestId({ commit }) {
      let userExist = localStorage.getItem("buyerUserData");
      let guestUser = localStorage.getItem("guest-id");
      if (userExist === null && guestUser === null) {
        globalAxios
          .post(`guest/generate-token`)
          .then((res) => {
            // console.log("SET_USER_DATA_INFO", res);
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
    async generateFirebaseToken({ commit }) {
      let serviceWorkerRegistration;
      if (process.env.NODE_ENV == "development") {
        serviceWorkerRegistration = await navigator.serviceWorker.register(
          `${process.env.VUE_APP_LOCAL}firebase-messaging-sw.js`
        );
      } else {
        serviceWorkerRegistration = await navigator.serviceWorker.register(
          `${process.env.VUE_APP_DOMAIN_NAME}firebase-messaging-sw.js`
        );
      }
      navigator.serviceWorker.onmessage = ({ data }) => {
        // console.log("sw event: ", data);
        const { type } = data;
        switch (type) {
          case "NEW-HUMHUM-NOTIFICATION": {
            // this.handelNotification(notification);
            break;
          }
        }
      };
      // const messaging = getMessaging();

      const token = await getToken(messaging, {
        vapidKey:
          "BCg19OadFV9lZNChEu1nhKI9zW2HRqiVls8U_4UVQyRLz5rVf3-2qzUSBWdTB7U0nqa-O7lho69FM8VdRsQW970",
        serviceWorkerRegistration: serviceWorkerRegistration,
      });

      // if (token) {

      // console.log("vuex token", token);
      // }

      commit("SET_FIREBASE_TOKEN", token);
    },
    getNotifications({ commit }) {
      try {
        profile.getNotificatinos().then((res) => {
          commit("SET_NOTIFICATIONS", res.data.items.notifications.data);
          commit("SET_NOTIFICATIONS_LENGTH", res.data.items.count);
        });
      } catch (error) {
        console.log(error);
      }
    },
    getUserBadges({commit}) {
      profile
        .getProfileBudges()
        .then((res) => {
          console.log("res" , res);
          commit('SET_USER_BADGES' , res.data.items)
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {
    cart,
    wishlist,
    suppliers,
  },
  // plugins: [createPersistedState()]
});
