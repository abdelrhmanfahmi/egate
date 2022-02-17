import axios from "axios";

// for token
let hasToken = null,
  lang = null;

hasToken = localStorage.getItem("token");
lang = localStorage.getItem("lang") || "en";

console.log(hasToken);

const globalAxios = axios.create({
  baseURL: process.env.VUE_APP_AXSIOS_LINK,
  headers: {
    Authorization: hasToken ? `Bearer ${hasToken}` : "",
    "Accept-Language": lang,
  },
});

export default globalAxios;
