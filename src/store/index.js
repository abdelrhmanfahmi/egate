import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from 'vuex-persistedstate';
import cart from "./modules/cart";
import wishlist from "./modules/wishlist";
import auth from "@/services/auth";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: (localStorage.getItem("userInfo") && localStorage.getItem("userInfo") != 'undefined') ? JSON.parse(localStorage.getItem("userInfo")) : "",



        userData: (localStorage.getItem("userData") && localStorage.getItem("userData") != 'undefined') ? JSON.parse(localStorage.getItem("userData")) : "",
    },
    getters: {
        userInfo(state) {
            return state.userInfo
        },
        userData(state) {
            return state.userData
        }
    },
    mutations: {
        SET_USER_DATA_INFO(state, userInfo) {
            state.userData = userInfo
        }
    },
    actions: {
        getUserInfo({ commit }) {
            auth.getUserInfo().then((res) => {
                commit("SET_USER_DATA_INFO", res.data.items)
                localStorage.setItem("userData", JSON.stringify(res.data.items))
            });
        }
    },
    modules: {
        cart,
        wishlist
    },
    // plugins: [createPersistedState()]
});