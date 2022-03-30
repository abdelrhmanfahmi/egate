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
};
