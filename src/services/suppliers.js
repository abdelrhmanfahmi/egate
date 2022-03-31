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
  requestQuotation(payload) {
    return globalAxios.post(`/members/product/rfq` , payload);
  },
};
