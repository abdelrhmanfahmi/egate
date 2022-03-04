import axios from "axios";

// for token
let hasToken = null,
  lang = null;

hasToken =  JSON.parse(localStorage.getItem("userInfo"));
lang = localStorage.getItem("lang") || "en";


const globalAxios = axios.create({
  baseURL: process.env.VUE_APP_AXSIOS_LINK,
  headers: {
    Authorization: hasToken ? `Bearer ${hasToken.access_token}` : "",
    "Accept-Language": lang
  },
});

export default globalAxios;
