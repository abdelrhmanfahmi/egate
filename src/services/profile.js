import globalAxios from "./global-axios";

export default {
  // profile Category
  getCategories() {
    return globalAxios.get("members/profile/categories");
  },
  getAllAdresses() {
    return globalAxios.get("members/profile/shipping-info", {
      params: {
        portal: "buyer",
      },
    });
  },
  getAllCities(countryId) {
    return globalAxios.get(`lists/cities/${countryId}`);
  },
  getAllRegions(cityId) {
    return globalAxios.get(`lists/regions/${cityId}`);
  },
  getSubscriptions() {
    return globalAxios.get("members/profile/subscriptions");
  },
  makeSubscribe(payload) {
    return globalAxios.post("members/profile/subscriptions", payload);
  },
  cancelSubscribe() {
    return globalAxios.put("members/profile/subscriptions/cancel");
  },
  createAdress(payload) {
    return globalAxios.post("members/profile/shipping-info", payload);
  },
  deleteAdress(id) {
    return globalAxios.delete(`members/profile/shipping-info/${id}`);
  },
  makeDefaultAddress(id) {
    return globalAxios.put(`members/profile/shipping-info/set-default/${id}`);
  },

  // buisness info

  buissnessinfoUpload(payload) {
    return globalAxios.post(`members/profile/business-info`, payload);
  },
  getBuissnessinfodata() {
    return globalAxios.get(`members/profile/business-info`);
  },

  // end  buisness info

  // documents info

  suppDocUpload(payload) {
    return globalAxios.post(`members/profile/documents`, payload);
  },
  getSuppDocUploadData() {
    return globalAxios.get(`members/profile/documents`);
  },

  // end documents info

  // bank info

  ibanUpload(payload) {
    return globalAxios.post(`members/profile/bank-info`, payload);
  },
  getibanUploadData() {
    return globalAxios.get(`members/profile/bank-info`);
  },

  //end  bank info

  // profile quotations
  getQuotations() {
    return globalAxios.get(`members/product/rfq`);
  },
  checkCoupon(coupon) {
    return globalAxios.get(`members/products/coupon/check-coupons`, {
      params: {
        coupon: coupon,
      },
    });
  },
  getQuotationDetail(id) {
    return globalAxios.get(`members/product/rfq/${id}`);
  },
  sendMessage(data) {
    return globalAxios.post("members/product/rfq/comment", data);
  },
  sendSupplierMessage(data) {
    return globalAxios.post("members/message/", data);
  },
  getOrders(data) {
    return globalAxios.get(`members/client-orders/?page=${data}`);
  },
  getSingleOrders(id) {
    return globalAxios.get(`members/client-orders/${id}`);
  },
  cancelOrder(data) {
    console.log(data);
    return globalAxios.post(
      `members/client-orders/${data.orderUUID}/change-status`,
      {
        status: "4",
        client_cancel_reason: data.payLoad,
      }
    );
  },
  rePay(payLoad){
    return globalAxios.post(`order/payment`,payLoad)
  },
  bankComment(){
    return globalAxios.get('statics/Bank-transfer-info')
  },
  footerFacebookLink(){
    return globalAxios.get(`site-settings/facebook`)
  },
  footerTwitterLink(){
    return globalAxios.get(`site-settings/twitter`)
  },
  footerYoutubeLink(){
    return globalAxios.get(`site-settings/youtube`)
  },
  footerLinkedinLink(){
    return globalAxios.get(`site-settings/linkedin`)
  },
  footerInstagramLink(){
    return globalAxios.get(`site-settings/instagram`)
  },
  footerPinterestLink(){
    return globalAxios.get(`site-settings/pinterest`)
  },
  getAboutData(){
    return globalAxios.get('statics/About-us')
  },
  getAboutVisionData(){
    return globalAxios.get('statics/Vision')
  },
  getAboutMessageData(){
    return globalAxios.get('statics/Message')
  },
  getAboutPrincipleData(){
    return globalAxios.get('statics/Our-principles')
  },
  contactUs(payload){
    return globalAxios.post('contact-us' , payload)
  },

  contactUsMap(){
    return globalAxios.get('site-settings/map_iframe')
  },
  contactUsPhone(){
    return globalAxios.get('statics/Phone')
  },
  contactUsEmail(){
    return globalAxios.get('statics/Email')
  },
  contactUsAddress(){
    return globalAxios.get('statics/Address')
  },
  supplierAllCorrespondence(){
    return globalAxios.get('members/message')
  },
  suppliersingleCorrespondence(id){
    return globalAxios.get(`members/message/${id}`)
  },
  sendsupplierCorrespondenceMessage(data){
    return globalAxios.post(`members/message/`,data)
  },
  getProductRate(){
    return globalAxios.get('members/review/ordered-products')
  },
  postProductRate(data){
    return globalAxios.post('members/review',data)
  },
  returnOrder(payLoad){
    return globalAxios.post(`members/orders/return-order-item` , payLoad)
  },
  storeGoogleLink(){
    return globalAxios.get('site-settings/google_play')
  },
  storeAppLink(){
    return globalAxios.get('site-settings/app_store')
  },
  returneBuyerdOrders(){
    return globalAxios.get(`members/client_returns`)
  },
  returnedSingleBuyerOrders(UUID){
    return globalAxios.get(`members/client_returns/${UUID}/show`)
  },
  returneSupplierOrders(){
    return globalAxios.get(`members/returns`)
  },
  returnedSingleSupplierOrders(UUID){
    return globalAxios.get(`members/returns/${UUID}/show`)
  },
  getWallet(){
    return globalAxios.get('members/wallet')
  },
  getWalletPayments(){
    return globalAxios.get('members/wallet/payments')
  },
  getWalletRecivables(){
    return globalAxios.get('members/wallet/receivables')
  },

};
