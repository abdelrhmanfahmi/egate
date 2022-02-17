import axios from "axios";

let hasToken = null;
let lang = null;

hasToken = localStorage.getItem("token");
lang = localStorage.getItem("lang") || "en";

const globalAxios = axios.create({
  baseURL: process.env.VUE_APP_AXSIOS_LINK,
  headers: {
    "Content-Type": "application/json",
    Authorization: hasToken ? `Bearer ${hasToken}` : "",
    "Accept-Language": lang,
  },
});

export default globalAxios;
