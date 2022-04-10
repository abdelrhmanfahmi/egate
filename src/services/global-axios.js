import axios from "axios";

// for token

let lang = null;

lang = localStorage.getItem("lang") || "en";

const getToken = function () {
  if (
    localStorage.getItem("userInfo") &&
    localStorage.getItem("userInfo") != "undefined" &&
    localStorage.getItem("userInfo") != undefined
  ) {
    let hasToken = JSON.parse(localStorage.getItem("userInfo"));
    localStorage.removeItem("guest-id");
    return hasToken ? `Bearer ${hasToken.access_token}` : "";
  }
  return "";
};

export { getToken };
let guestUser = null;
guestUser = localStorage.getItem("guest-id");

let checkGuest = function () {
  if (localStorage.getItem("userData")) {
    localStorage.removeItem("guest-id");
  } else {
    return guestUser ? guestUser : "";
  }
};

export { checkGuest };
const globalAxios = axios.create({
  baseURL: process.env.VUE_APP_AXSIOS_LINK,
  headers: {
    Authorization: getToken(),
    "Accept-Language": lang,
    "guest-id": checkGuest(),
  },
});

export default globalAxios;
