import axios from "axios";

let hasToken = null;
let lang = null;
hasToken = localStorage.getItem("token");

// for Lang
lang = localStorage.getItem("lang") || "en";
document.documentElement.lang = lang;
if (lang === "ar") {
  document.documentElement.dir = "rtl";
}

const globalAxios = axios.create({
  baseURL: process.env.VUE_APP_AXSIOS_LINK,
  headers: {
    "Content-Type": "application/json",
    Authorization: hasToken ? `Bearer ${hasToken}` : "",
    "Accept-Language": lang,
  },
});

export default globalAxios;
