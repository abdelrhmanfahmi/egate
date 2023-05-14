import globalAxios from "./global-axios";
import { createdFormData } from "./helpers";
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
  searchAddresses(payload) {
    return globalAxios.get("members/profile/shipping-info", {
      params: {
        portal: "buyer",
        keyword: payload.keyword,
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
    return globalAxios.post("members/profile/shipping-info", payload, {
      params: {
        form_control: `user-address`,
      },
    });
  },
  checkAddressesForm() {
    return globalAxios.get(`lists/formControls/user-address`);
  },
  deleteAdress(id) {
    return globalAxios.delete(`members/profile/shipping-info/${id}`);
  },
  makeDefaultAddress(id) {
    return globalAxios.put(`members/profile/shipping-info/set-default/${id}`);
  },

  checkDocumentsForm() {
    return globalAxios.get("lists/formControls/user-b2b-document");
  },

  // buisness info

  buissnessinfoUpload(payload) {
    return globalAxios.post(`members/profile/business-info`, payload,{
      params:{
        form_control :'user-b2b-document'
      }
    });
  },
  getBuissnessinfodata() {
    return globalAxios.get(`members/profile/business-info`);
  },

  // end  buisness info

  // documents info

  suppDocUpload(payload) {
    return globalAxios.post(`members/profile/documents`, payload,{
      params:{
        form_control :'user-b2b-document'
      }
    });
  },
  getSuppDocUploadData() {
    return globalAxios.get(`members/profile/documents`);
  },

  // end documents info

  // bank info

  ibanUpload(payload) {
    return globalAxios.post(`members/profile/bank-info`, payload,{
      params:{
        form_control :'user-b2b-document'
      }
    });
  },
  getibanUploadData() {
    return globalAxios.get(`members/profile/bank-info`);
  },

  getDynaimicInputsData() {
    return globalAxios.get(
      `members/profile/documents/dynamic-info?form=user-b2b-document`
    );
  },
  dynaimicInputsDataUpload(payload) {
    return globalAxios.post(
      `members/profile/documents/dynamic-info?form=user-b2b-document`,
      createdFormData(payload)
    );
  },

  //end  bank info

  // profile quotations
  getQuotations() {
    return globalAxios.get(`members/product/rfq`);
  },
  standingQuotation(payload) {
    return globalAxios.post(`members/product/rfq/add/standing-order`, payload);
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
    return globalAxios.post("members/message", data);
  },
  getOrders(data) {
    return globalAxios.get(`members/client-orders?page=${data}`);
  },
  getOrdersWithLimit(data , payload) {
    return globalAxios.get(`members/client-orders` , {
      params:{
        page:data,
        count:payload
      }
    });
  },
  getOrdersWithFilters(data, payload) {
    console.log('payload' , payload);
    return globalAxios.get(`members/client-orders?page=${data}`, {
      params: {
        price_max: payload.price_max ? payload.price_max : null,
        price_min: payload.price_min ? payload.price_min : null,
        date_from: payload.date_from ? payload.date_from : null,
        date_to: payload.date_to ? payload.date_to : null,
        suppliers:payload.suppliers ? payload.suppliers : null
      },
    });
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
  rePay(payLoad) {
    return globalAxios.post(`order/payment`, payLoad);
  },
  bankComment() {
    return globalAxios.get("statics/Bank-transfer-info");
  },
  footerLinks() {
    return globalAxios.get(`site-settings`);
  },
  footerTwitterLink() {
    return globalAxios.get(`site-settings/twitter`);
  },
  footerYoutubeLink() {
    return globalAxios.get(`site-settings/youtube`);
  },
  footerLinkedinLink() {
    return globalAxios.get(`site-settings/linkedin`);
  },
  footerInstagramLink() {
    return globalAxios.get(`site-settings/instagram`);
  },
  footerPinterestLink() {
    return globalAxios.get(`site-settings/pinterest`);
  },
  getAboutData() {
    return globalAxios.get("statics/About-us");
  },
  getAboutVisionData() {
    return globalAxios.get("statics/Vision");
  },
  getAboutMessageData() {
    return globalAxios.get("statics/Message");
  },
  getAboutPrincipleData() {
    return globalAxios.get("statics/Our-principles");
  },
  contactUs(payload) {
    return globalAxios.post("contact-us", payload);
  },

  contactUsMap() {
    return globalAxios.get("site-settings/map_iframe");
  },
  contactUsPhone() {
    return globalAxios.get("statics/Phone");
  },
  contactUsEmail() {
    return globalAxios.get("statics/Email");
  },
  contactUsAddress() {
    return globalAxios.get("statics/Address");
  },
  supplierAllCorrespondence() {
    return globalAxios.get("members/message");
  },
  getMessagesWithLimit(payload) {
    return globalAxios.get("members/message" , {
      params:{
        count:payload
      }
    });
  },
  supplierAllCorrespondenceSearch(payload) {
    return globalAxios.get("members/message" , {
      params:{
        keyword:payload
      }
    });
  },
  suppliersingleCorrespondence(id) {
    return globalAxios.get(`members/message/${id}`);
  },
  sendsupplierCorrespondenceMessage(data) {
    return globalAxios.post(`members/message`, data);
  },
  getProductRate() {
    return globalAxios.get("members/review/ordered-products");
  },
  postProductRate(data) {
    return globalAxios.post("members/review", data);
  },
  returnReasons() {
    return globalAxios.get("members/client-orders/return_reasons");
  },
  returnOrder(payLoad) {
    // return globalAxios.post(`members/orders/return-order-item`, payLoad);
    return globalAxios.post(`members/orders/bulk-return-order-item`, payLoad);
  },
  // storeGoogleLink(){
  //   return globalAxios.get('site-settings/google_play')
  // },
  // storeAppLink(){
  //   return globalAxios.get('site-settings/app_store')
  // },
  returneBuyerdOrders() {
    return globalAxios.get(`members/client_returns`);
  },
  returnedSingleBuyerOrders(UUID) {
    return globalAxios.get(`members/client_returns/${UUID}/show`);
  },
  returneSupplierOrders() {
    return globalAxios.get(`members/returns`);
  },
  returnedSingleSupplierOrders(UUID) {
    return globalAxios.get(`members/returns/${UUID}/show`);
  },
  getWallet() {
    return globalAxios.get("members/wallet");
  },
  getWalletPayments() {
    return globalAxios.get("members/wallet/payments");
  },
  getWalletRecivables() {
    return globalAxios.get("members/wallet/receivables");
  },
  getWalletCharges() {
    return globalAxios.get("members/wallet/charges");
  },

  privacyPage() {
    return globalAxios.get(`statics/privacy-policy`);
  },
  termsPage() {
    return globalAxios.get(`statics/terms-conditions`);
  },
  faqPage() {
    return globalAxios.get("lists/faqs");
  },
  getNotificatinos(data) {
    if (data == undefined || data == "undefined") {
      data = 1;
    }
    return globalAxios.get(`members/notifications?page=${data}`);
  },
  getNotificatinosWithLimit(data , payload) {
    if (data == undefined || data == "undefined") {
      data = 1;
    }
    return globalAxios.get(`members/notifications` , {
      params:{
        page:data,
        count:payload
      }
    });
  },
  readNotification(notification) {
    return globalAxios.get(`members/notifications/${notification.id}`);
  },
  removeNotification(notification) {
    return globalAxios.delete(
      `members/notifications/delete/${notification.id}`
    );
  },
  readAllNotifications() {
    return globalAxios.get(`members/notifications/read-all`);
  },
  getProfilePrefixes() {
    return globalAxios.get("lists/perfix");
  },
  chargeMyWallet(payLoad) {
    return globalAxios.post(`members/wallet/charge`, payLoad);
  },
  checkWalletCharge(payload) {
    return globalAxios.get(`members/wallet/charge-status`, {
      params: {
        tap_charge_id: payload.tap_charge_id,
        id: payload.id,
      },
    });
  },
  checkReturnedProductQuantity(UUID) {
    return globalAxios.get(`members/orders/supplier-order-item/${UUID}`);
  },
  companyIban() {
    return globalAxios.get("statics/i-ban");
  },
  getStandingOrders() {
    return globalAxios.get("members/profile/standings");
  },
  getSingleStandingOrder(id) {
    return globalAxios.get(`members/profile/standings/${id}`);
  },
  getStandingOrdersTimes() {
    return globalAxios.get("lists/standingTimes");
  },
  CreateStandingOrders(payload) {
    return globalAxios.post("members/profile/standings", payload);
  },
  addProductToStandingOrders(payload) {
    return globalAxios.put(`members/profile/standings/add/item`, payload);
  },
  deleteStandingOrder(id) {
    return globalAxios.delete(`members/profile/standings/${id}`);
  },
  removeProductFromStandingOrder(payload) {
    return globalAxios.delete("members/profile/standings/remove/item", {
      params: {
        product_supplier_id: payload.product_supplier_id,
        client_standing_id: payload.client_standing_id,
        basket_promotion_id: payload.basket_promotion_id
          ? payload.basket_promotion_id
          : null,
      },
    });
  },
  addAllToCart(payload) {
    return globalAxios.post(`members/profile/standings/add-list/cart`, payload);
  },
  changeProfileEmailMobile(payLoad, userType) {
    return globalAxios.post(
      `members/${userType}/change-client-email-mobile`,
      payLoad
    );
  },
  getProfileBudges() {
    return globalAxios.get("members/dashboard-index/client-side-bar");
  },
  changeStandingOrderQuantity(payload) {
    return globalAxios.put(
      "members/profile/standings/change-quantity/item",
      payload
    );
  },
  getDashboardData() {
    return globalAxios.get("members/dashboard-index/client-dashboard");
  },
  getDashboardDataFilter(payload) {
    return globalAxios.get("members/dashboard-index/client-dashboard", {
      params: {
        from: payload.from,
        to: payload.to,
      },
    });
  },
  getNotificationSettings() {
    return globalAxios.get("members/notification-settings");
    // return globalAxios.get('members/notification-settings/public-settings')
  },
  changeNotificationSettings(payload) {
    return globalAxios.post("members/notification-settings", payload);
  },
  addCheckedProductToCart(payload) {
    return globalAxios.post(`members/profile/standings/add-list/cart`, payload);
  },
  removeCheckedProductFromCart(payload) {
    console.log("payload", payload);
    return globalAxios.delete("members/profile/standings/remove/item", {
      params: {
        product_supplier_id: payload.product_supplier_id,
        client_standing_id: payload.client_standing_id,
      },
    });
  },
  exportSelectedOrders(payload) {
    return globalAxios.get("members/client-orders/export/excel", {
      params: {
        ids: payload.ids,
      },
    });
  },
  buyToGetAnother() {
    return globalAxios.get("products/buy-x-get-y/offers");
  },
  getBasketOffers() {
    return globalAxios.get("products/basket/offers");
  },
  getRelatedBasketOffers(id) {
    return globalAxios.get("products/basket/offers", {
      params: {
        without_id: id,
      },
    });
  },
  getGiftOffer() {
    return globalAxios.get("products/gift/offers");
  },
  getBasketSingleOffers(id) {
    return globalAxios.get(`products/basket/offers/${id}`);
  },
  walletPostWithdraw(payload) {
    return globalAxios.post(`members/wallet/withdraw`, payload);
  },
  walletGetWithdraw() {
    return globalAxios.get(`members/wallet/withdraw`);
  },
  notificationBulkRead(payload) {
    return globalAxios.post("members/notifications/bulk-read", payload);
  },
  notificationBulkDelete(payload) {
    return globalAxios.post("members/notifications/bulk-delete", payload);
  },
  
  searchOrder(data, payload) {
    return globalAxios.get(`members/client-orders?page=${data}`, {
      params: {
        id: payload.id ? payload.id : null,
      },
    });
  },
  // favoriteBulkAddToCart(payload) {
  //   return globalAxios.post("members/profile/favorite/delete/bulk", payload);
  // },
  // favoriteBulkStandingOrde(payload) {
  //   return globalAxios.post("members/notifications/bulk-delete", payload);
  // },
  favoriteBulkRemoveFav(payload) {
    return globalAxios.post("members/profile/favorite/delete/bulk", payload);
  },
  storeCheckedOrders(payload){
    return globalAxios.post('members/client-orders/products-with-ides' , payload)
  },
  // getCheckedOrders(){
  //   return globalAxios.get('client-orders/products-with-ides')
  // }
};
