import axios from "axios";

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
//   if (localStorage.getItem("userData")) {
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
      config.headers['guest-id'] = guestId;
    }
    if (country) {
      let country_parsed = JSON.parse(localStorage.getItem("country"));
      config.headers['currency_id'] = country_parsed.currencies[0].id || 1;
    }
    // config.headers['currency_code'] = currency_code;
    return config;
  },
  (error) => Promise.reject(error),
);

export default globalAxios;
