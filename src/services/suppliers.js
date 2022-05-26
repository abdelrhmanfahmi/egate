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
    let data = {
      comment: payload.comment,
      phone: payload.phone,
      payment_type: payload.payment_type,
      first_name: payload.first_name,
      last_name: payload.last_name,
      // sameAddress: payload.sameAddress,
      country: payload.country,
      governorate: payload.governorate,
      city: payload.city,
      // postal_code: null,
      email: payload.email,
      // coupons: [],
      address_uuid: payload.address_uuid,
      suppliers: payload.suppliers,
      redirect_url: payload.redirect_url,
      country_code: payload.country_code,
      accept_terms: payload.accept_terms == true ? '1' : '0',
    };

    return globalAxios.post(`/order`, data);
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
  getFirstShippingFees(data) {
    return globalAxios.get(`shipping/cart-shipping-fee?address_uuid=${data}`);
  },
  getGuestFirstShippingFees(data) {
    return globalAxios.get(`shipping/cart-shipping-fee`, {
      params: {
        country: data.country,
        governorate: data.governorate,
        city: data.city,
      },
    });
  },
};
