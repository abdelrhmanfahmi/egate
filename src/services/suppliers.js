import globalAxios from "./global-axios";

export default {
  getSuppliers(page) {
    return globalAxios.get(`"suppliers?page=${page}"`);
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
    return globalAxios.post(`/order`, payload);
  },
  checkCoupon(checkData) {
    return globalAxios.post(`cart`, checkData);
  },
  getBestDeals() {
    return globalAxios.get("products/best/offers");
  },
  getSupplierAddress(supplierId) {
    return globalAxios.get(`shipping-info/supplier-addresses/${supplierId}`);
  },
  getShippingFees(data) {
    return globalAxios.get(`shipping/supplier-shipping-fee`, {
      params: {
        country: data.country,
        governorate: data.governorate,
        city: data.city,
        address_uuid: data.address_uuid,
        supplier_id: data.supplier_id,
      },
    });
  },
};
