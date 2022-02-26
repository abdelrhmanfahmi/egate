import globalAxios from "./global-axios";

export default {
  // register
  register(type, payload) {
    return globalAxios.post(`auth/${type}/register`, payload);
  },
  getAllCountires() {
    return globalAxios.get("lists/countries");
  },
  verificationMobile(payload) {
    return globalAxios.patch("checkpoint/active-mobile", payload);
  },
  resendCodeMobile() {
    return globalAxios.get("checkpoint/resend-active-mobile");
  },
  getSocialLink(type, provider, redirect) {
    return globalAxios.get(
      `auth/${type}/${provider}/redirect?redirect=${redirect}`
    );
  },
  makeLoginSocail(type, provider, payload) {
    return globalAxios.post(`auth/${type}/${provider}/login`, payload);
  },
  login(type, payload) {
    return globalAxios.post(`auth/${type}/login`, payload);
  },
  emailVerify(payload) {
    return globalAxios.patch("checkpoint/active-email-guest", payload);
  },
};
