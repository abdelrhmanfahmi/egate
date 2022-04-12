import globalAxios from "./global-axios";

export default {
  getSuppliers() {
    return globalAxios.get("suppliers");
  },
  getSupplier(id) {
    return globalAxios.get(`suppliers/${id}`);
  },
  getSupplierProducts(id) {
    return globalAxios.get(`products?client_id=${id}`);
  },
  SupplierProducts() {
    return globalAxios.get(`products`);
  },
  requestQuotation(payload) {
    return globalAxios.post(`/members/product/rfq`, payload);
  },
  payment(payload) {
    return globalAxios.post(`members/products/order`, payload);
  },
  checkCoupon(checkData) {
    return globalAxios.post(`cart`, checkData);
  },
};
