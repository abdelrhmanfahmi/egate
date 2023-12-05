import globalAxios from "./global-axios";

export default {
    getBanners() {
        return globalAxios.get('client/banners')
    },
    getCategories() {
        return globalAxios.get('client/categories?isParent=true')
    },
    homeProducts() {
        return globalAxios.get(`client/products?hasOffer=true`)
    },
    homeProductsFeatured() {
        return globalAxios.get(`client/products?featured=true`)
    },
    homeProductsTopRated() {
        return globalAxios.get(`client/products?top_rated=true`)
    },
    homeProductsTopReviewed() {
        return globalAxios.get(`client/products?top_reviewed=true`)
    },
    getFeaturedCategories() {
        return globalAxios.get(`client/categories/featured`)
    },
    getProductsSpecial() {
        return globalAxios.get(`client/special-offers`)
    },
    getSettings() {
        return globalAxios.get(`settings`);
    },
    getFaqs() {
        return globalAxios.get(`settings/faqs`);
    },
    storeContactUsForm(payload) {
        return globalAxios.post(`contact`, payload);
    }
}