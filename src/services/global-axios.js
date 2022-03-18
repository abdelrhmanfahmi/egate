import axios from "axios";

// for token

let lang = null;

lang = localStorage.getItem("lang") || "en";

const getToken = function () {
  if (localStorage.getItem("userInfo") && localStorage.getItem("userInfo") != 'undefined' 
    && localStorage.getItem("userInfo") != undefined) {
    let hasToken = JSON.parse(localStorage.getItem("userInfo"));
    return hasToken ? `Bearer ${hasToken.access_token}` : ""
  }
  return "";
}

export { getToken }

const globalAxios = axios.create({
  baseURL: process.env.VUE_APP_AXSIOS_LINK,
  headers: {
    Authorization: getToken(),
    "Accept-Language": lang
  },
});

export default globalAxios;
