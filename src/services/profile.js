import globalAxios from "./global-axios";

export default {
  // profile Category
  getCategories() {
    return globalAxios.get("members/profile/categories");
  },
  getAllAdresses() {
    return globalAxios.get("members/profile/shipping-info");
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
  }
};

