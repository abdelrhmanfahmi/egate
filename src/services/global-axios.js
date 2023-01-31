import axios from "axios";
// import mixin from "../mixins"
// import auth from "@/services/auth";
// for token
import router from "../router/index";

let lang = null;

lang = localStorage.getItem("lang") || "en";

// let userExist = localStorage.getItem("currency");
let userExist = localStorage.getItem("buyerUserData");

const country = localStorage.getItem("country");



let country_parsed = JSON.parse(country);


// let currency_code = localStorage.getItem("currency");
// let currency_id = localStorage.getItem("country");

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
    if(currencyId){
      return currencyId ? currencyId : country.currencies[0].id || 3
    }else{
      return country.default_currency ? country.default_currency.id : 3
    }
  }
  return "";
}

export { getToken };
// let guestUser = null;
let guestUser = localStorage.getItem("guest-id");

let checkGuest = function () {
  if (localStorage.getItem("buyerUserData")) {
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
    // "currency-id": country_parsed ? country_parsed.currencies[0].id || 1 : '',
    "currency-id": getCurrency(),
    "country-id": country_parsed ? (country_parsed.id ? country_parsed.id : null) : ''
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
        : router.push({ path: '/', query: { force_login: 'true' } });
    }

    return Promise.reject(error);
  }
);

export default globalAxios;
