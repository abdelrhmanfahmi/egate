import axios from "axios";

import router from "../router/index";
import store from "../store"
let lang = null;
lang = localStorage.getItem("lang") || "en";

let userExist = localStorage.getItem("buyerUserData");

const getToken = function () {
  if (
    localStorage.getItem("userInfo") &&
    localStorage.getItem("userInfo") != "undefined" &&
    localStorage.getItem("userInfo") != undefined
  ) {
    let hasToken = JSON.parse(localStorage.getItem("userInfo"));
    return hasToken ? `Bearer ${hasToken.token}` : "";
  }
  return "";
};

export { getToken };

const globalAxios = axios.create({
  baseURL: process.env.VUE_APP_AXSIOS_LINK,
  headers: {
    Authorization: getToken(),
    "Accept-Language": lang,
    'Accept': 'application/json',
    'Content-Type' : 'application/json'
  },
});

globalAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (
    //   (error.response.status == 403) ||
    //   (error.response.status == 401)
    // ) {

    //   store.dispatch('auth/LogOut')
    //   router.push(`/auth/login`)
    // }

    if (
        (error.request.status == 403) ||
        (error.request.status == 401)
      ) {
  
        store.dispatch('auth/LogOut')
        router.push(`/auth/login`)
      }

    return Promise.reject(error);
  }
);

export default globalAxios;
