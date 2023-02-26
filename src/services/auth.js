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
  logout() {
    return globalAxios.get(`members/logout`);
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
  },
  termsAndCondations() {
    return globalAxios.get("statics/user-terms-and-conditions");
  },
  completeProfile(payload) {
    return globalAxios.patch("checkpoint/complete", payload);
  },
  checkoutComplete(payload) {
    // return globalAxios.get(`order/order-status?order_uuid=${payload.order_uuid}&payment_charge_id=${payload.payment_charge_id}`);
    return globalAxios.get(`order/order-status`, {
      params: {
        order_uuid: payload.order_uuid,
        payment_charge_id: payload.payment_charge_id,
      },
    });
  },
  getHomeDeadline() {
    return globalAxios.get("products/featured/offers");
  },
  getAdsModal(payload) {
    return globalAxios.get(`members/popups`, {
      params: {
        type: payload ? payload.type : null,
        model_type: payload ? payload.model_type : null
      },
    });
  },
  getGuestAdsModal(payload) {
    return globalAxios.get(`popups`, {
      params: {
        type: payload ? payload.type : null,
        model_type: payload ? payload.model_type : null
      },
    });
  },
  getSupplierAds() {
    return globalAxios.get('supplier/popup')
  },
  postSupplierShowenAd(payload) {
    return globalAxios.get(`supplier/popup/view/${payload}`)
  },
  checkCartValidity(){
    return globalAxios.get('guest-sittings')
  },
  getSiteImages(){
    return globalAxios.get('guest-sittings/global_setting')
  },
  checkUserValidity(payload){
    return globalAxios.get('auth/check-reset-password',{
      params:{
        email: payload.email,
        token: payload.token,
      }
    })
  },
  changeAuthUserPass(payload){
    return globalAxios.post('auth/reset-password',payload)
  }
};
