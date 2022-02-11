import axios from "axios";

let hasToken = null;

if (process.client) {
  hasToken = JSON.parse(localStorage.getItem("userData"));
}
const globalAxios = axios.create({
  baseURL: process.env.VUE_APP_AXSIOS_LINK,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: hasToken ? `Bearer ${hasToken.api_token}` : "",
    "Accept-Language": "en",
  },
});

export default globalAxios;
