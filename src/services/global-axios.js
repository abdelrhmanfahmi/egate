import axios from "axios";
// import mixin from "../mixins"
// import auth from "@/services/auth";
// for token
import router from "../router/index";
import store from "../store";
let lang = null;

lang = localStorage.getItem("lang") || "en";

// let userExist = localStorage.getItem("currency");
let userExist = localStorage.getItem("buyerUserData");

const country = localStorage.getItem("country");

let country_parsed = JSON.parse(country);



// let currency_code = localStorage.getItem("currency");
// let currency_id = localStorage.getItem("country");


function getDefaultCountryId() {

  axios
    .get(`${process.env.VUE_APP_AXIOS_LINK}site-settings/default/country`)
    .then((res) => {
      window.localStorage.setItem(
        "country",
        JSON.stringify(res.data.items)
      );
      window.localStorage.setItem('country', JSON.stringify(res.data.items))
      return res.data.items.id
    })
}
function getDefaultCountryCurrencyId() {

  axios
    .get(`${process.env.VUE_APP_AXIOS_LINK}site-settings/default/country`)
    .then((res) => {
      window.localStorage.setItem(
        "country",
        JSON.stringify(res.data.items)
      );
      window.localStorage.setItem('country', JSON.stringify(res.data.items))
      return res.data.items.currencies[0].id
    })
}

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

const getCurrency = function () {
  if (country) {
    const currencyId = localStorage.getItem("currencyId");
    if (currencyId) {
      return currencyId;
    } else {
      return country_parsed ? country_parsed.currencies[0].id  : 3;
    }
  }else {
    getDefaultCountryCurrencyId()
    
  }
};

const getCountry = function () {
  if (country) {
    const countryId = country_parsed.id;
    if (countryId) {
      return countryId;
    } else {
      return country_parsed ? country_parsed.id  : 1;
    }
  } else {
    getDefaultCountryId()
  }
};

export { getToken };
// let guestUser = null;
let guestUser = localStorage.getItem("guest-id");

let checkGuest = function () {
  if (localStorage.getItem("buyerUserData")) {
    localStorage.removeItem("guest-id");
  } else {
    return guestUser ? guestUser : "";
  }
  if (
    (!userExist && !guestUser) ||
    (!userExist && guestUser == undefined) ||
    (!userExist && guestUser == "undefined")
  ) {
    store.dispatch("getUserGuestId");
    location.reload();
  }
};

export { checkGuest };
const globalAxios = axios.create({
  baseURL: process.env.VUE_APP_AXIOS_LINK,
  headers: {
    Authorization: getToken(),
    "Accept-Language": lang,
    "guest-id": checkGuest(),
    // "currency-id": country_parsed ? country_parsed.currencies[0].id || 1 : '',
    "currency-id": getCurrency(),
    "country-id": getCountry(),
    // currency_code: currency_code,
    // currency_id: currency_id,
  },
});

globalAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log("error", error);
    if (
      (error.response.status == 403 && userExist) ||
      (error.response.status == 401 && userExist)
    ) {
      // localStorage.clear()

      // router.push("/");
      // this.$router.push("/b2b-login");
      // location.reload();
      // this.$store.dispatch('loginAgain')
      userExist.type === "buyer"
        ? router.push(`/b2b-login`) //routing changed  from b2b-login to /b2b-login
        : router.push({ path: "/", query: { force_login: "true" } });
    }

    if (
      (error.response.status == 401 && !localStorage.getItem("guest-id")) ||
      (error.response.status == 403 && !localStorage.getItem("guest-id"))
    ) {
      location.reload();
    }

    return Promise.reject(error);
  }
);

export default globalAxios;
