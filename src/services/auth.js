import globalAxios from "./global-axios";
import { getToken } from "./global-axios"

export default {
  // register
  register(type, payload) {
    return globalAxios.post(`auth/${type}/register`, payload);
  },
  getAllCountires() {
    return globalAxios.get("lists/countries");
  },
  verificationMobile(payload) {
    getToken()
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
    return globalAxios.put("checkpoint/active-email-guest", payload);
  },
  getUserInfo() {
    return globalAxios.get("members/profile/info");
  },
  storeInfo(payload) {
    return globalAxios.post("members/profile/info", payload);
  },
  changePassword(payload) {
    return globalAxios.post("members/profile/info/change_password", payload);
  },
  sendEmail(payload) {
    return globalAxios.post("auth/forgot-password/generate-token", payload);
  },
  checkEmailForgetPassWord(payload) {
    return globalAxios.get("auth/forgot-password/check-reset-token", payload);
  },
  forgetPassWord(payload) {
    return globalAxios.post("auth/forgot-password/reset", payload);
  }
};
