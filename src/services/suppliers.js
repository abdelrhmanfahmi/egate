import globalAxios from "./global-axios";
import {createdFormData} from "./helpers"

export default {
  getSuppliers(page) {
    return globalAxios.get(`suppliers?page=${page}`);
  },
  getSuppliersWithNoPaginate(page) {
    return globalAxios.get(`suppliers/suppliers/all` , {
      params:{
        paginate:false,
        page:page
      }
    });
  },
  getSupplier(id) {
    return globalAxios.get(`suppliers/${id}`);
  },
  getSupplierProducts(id , productId) {
    return globalAxios.get(`products` , {
      params:{
        client_id : id, 
        without_id:productId ? productId : null
      }
    });
  },
  getSupplierRelatedProducts(id , productId) {
    return globalAxios.get(`products` , {
      params:{
        not_client_id : id, 
        without_id:productId ? productId : null
      }
    });
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
      accept_terms: payload.accept_terms == true ? "1" : "0",
      company_name : payload.company_name,
      coupon:payload.coupons[0],
      file:payload.file
    };
    // let formData = new FormData();
    
    // for(let key in data){
    //   if(key && data[key] && key != 'suppliers'){
    //     formData.append(key , data[key])
    //   }
    // }
    // formData.append('suppliers' , JSON.stringify(data.suppliers))
    // createdFormData(data)

    return globalAxios.post(`/order`, createdFormData(data));
  },
  guestPayment(payload) {
    return globalAxios.post(`/order`, payload);
  },
  checPaymentAvailableTypes(paymentMethod){
    return globalAxios.get(`payment-sittings/${paymentMethod.payment_type}`)
  },
  checkCoupon(checkData) {
    return globalAxios.post(`members/products/coupon/check`, checkData);
  },
  checkNewCoupon(checkData) {
    return globalAxios.post(`members/products/coupon/check`, checkData);
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
  getFirstShippingFees(data , country) {
    return globalAxios.get(`shipping/cart-shipping-fee`, {
      params:{
        address_uuid: data,
        country_id:country
      }
    });
  },
  getGuestFirstShippingFees(data) {
    return globalAxios.get(`shipping/cart-shipping-fee`, {
      params: {
        country: data.country,
        governorate: data.governorate,
        city: data.city,
        // address_line_one:data.address_line_one
        address_line_1:data.address_line_1
      },
    });
  },
  checkSupplierFees(payload) {
    return globalAxios.get(`shipping/supplier-shipping-fee`, {
      params: {
        address_uuid: payload.address_uuid,
        supplier_id: payload.supplier_id,
      },
    });
  },
  bankCheckout(data) {
    return globalAxios.post(`order/bank-transfer`,data);
  },
  supplierMicroSite(id) {
    return globalAxios.get(`suppliers/micro-site/${id}`);
  },
  getProductReview(id){
    return globalAxios.get(`members/review/product-reviews/${id}`)
  },
  getFilters(id, sorting, country, weight, unit){
    return globalAxios.get(`products/get-filter/attributes`,{
      params: {
        category_id: id ? id : null,
        sort_price: sorting ? sorting : null,
        country_id: country ? country : null,
        weight: weight ? weight : null,
        unit_id: unit ? unit : null
      }
    })
  },
  getClients(page) {
    return globalAxios.get(`suppliers-name?page=${page}`);
  },
  getNewCoverPromotion(payload){
    return globalAxios.get('banners' , {
      params:{
        type:payload ? payload.type : null,
        model_type: payload ? payload.model_type : null
      }
    })
  },
  getRelatedOffers(id){
    return globalAxios.get(`products/${id}/related/offers`)
  }
  
};
