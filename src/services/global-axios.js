import axios from "axios";

import router from "../router/index";
import store from "../store"
let lang = null;
lang = localStorage.getItem("lang") || "en";

let userExist = localStorage.getItem("EGate-userInfo");

const getToken = function () {
  if (
    localStorage.getItem("EGate-userInfo") &&
    localStorage.getItem("EGate-userInfo") != "undefined" &&
    localStorage.getItem("EGate-userInfo") != undefined
  ) {
    let hasToken = JSON.parse(localStorage.getItem("EGate-userInfo"));
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
    if (
      (error.response.status == 403) ||
      (error.response.status == 401)
    ) {

      // if(userExist){

      //   store.dispatch('Auth/LogOut')
      // }
      router.push(`/auth/login`)
    }

    return Promise.reject(error);
  }
);

export default globalAxios;
