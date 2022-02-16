import axios from "axios";

let hasToken = null;

hasToken = localStorage.getItem("token");

const globalAxios = axios.create({
  baseURL: process.env.VUE_APP_AXSIOS_LINK,
  headers: {
    "Content-Type": "application/json",
    Authorization: hasToken ? `Bearer ${hasToken}` : "",
    "Accept-Language": "en",
  },
});

export default globalAxios;
