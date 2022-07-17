import axios from "axios";
// import mixin from "../mixins"
// import auth from "@/services/auth";
// for token

let lang = null;

lang = localStorage.getItem("lang") || "en";

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

export { getToken };
// let guestUser = null;
let guestUser = localStorage.getItem("guest-id");

// let checkGuest = function () {
//   if (localStorage.getItem("buyerUserData")) {
//     localStorage.removeItem("guest-id");
//   } else {
//     return guestUser ? guestUser : "";
//   }
// };

// export { checkGuest };
const globalAxios = axios.create({
  baseURL: process.env.VUE_APP_AXSIOS_LINK,
  headers: {
    Authorization: getToken(),
    "Accept-Language": lang,
    "guest-id": guestUser ? guestUser : "",
    // currency_code: currency_code,
    // currency_id: currency_id,
  },
});

globalAxios.interceptors.request.use(
  (config) => {
    const guestId = localStorage.getItem("guest-id");
    // const country_id = localStorage.getItem("is_default");
    const country = localStorage.getItem("country");
    // const currency_code = localStorage.getItem("currency");
    // const default_id = localStorage.getItem("default_id");
    if (guestId) {
      config.headers["guest-id"] = guestId;
    }
    if (country) {
      let country_parsed = JSON.parse(localStorage.getItem("country"));
      config.headers["currency_id"] = country_parsed.currencies[0].id || 1;
    }
    // config.headers['currency_code'] = currency_code;
    return config;
  },
  (error) => Promise.reject(error)
);

// globalAxios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 403 || error.response.status === 401) {
//       auth.logout();
//       // localStorage.clear()
//       // location.replace("/");
//       // location.reload();
//     }

//     return Promise.reject(error);
//   }
// );

// globalAxios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       window.location.href = "/";
//     }
//   }
// );


// globalAxios.interceptors.response.use(undefined, function (err) {
//   // console.log('error' , err.response.data.code)
//   return new Promise(function () {
//     if (err.response.data.code === 401) {
//       // if you ever get an unauthorized, logout the user

//       // auth.logout();
//       // location.replace('/b2b-login')
//       localStorage.removeItem('userInfo')
//       localStorage.removeItem('buyerUserData')
//       // you can also redirect to /login if needed !
//     }
//     throw err;
//   });
// });



export default globalAxios;
