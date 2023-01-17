import globalAxios from "./global-axios";

export default {
  // home Category
  getCategories() {
    return globalAxios.get("lists/categories");
  },
  getSubCategories(data) {
    return globalAxios.get(`lists/categories/allChild`, {
      params: {
        parent_id: data.parent_id,
        keyword: data.keyword,
      },
    });
  },
  getAllSubCategories(data) {
    return globalAxios.get(`lists/leafCategories/${data} `);
  },
  searchResult(data) {
    return globalAxios.get(`products/search/categories-products`, {
      params: {
        keyword: data.keyword,
      },
    });
  },
  searchAllProducts(data) {
    return globalAxios.get(`products`, {
      params: {
        keyword: data.keyword,
      },
    });
  },
  getCategoryProducts(id, sorting, country, weight, unit) {
  // getCategoryProducts(id, sorting, cat, country, weight, unit) {
    // return globalAxios.get(`products?${cat}`, {
    return globalAxios.get(`products`, {
      params: {
        category_id: id ? id : null,
        sort_price: sorting ? sorting : null,
        country_id: country ? country : null,
        weight: weight ? weight : null,
        unit_id: unit ? unit : null
      }
    });
  },
  getSingleProductDetails(id) {
    return globalAxios.get(`lists/categories/single/${id}`);
  },
  productDetails(id) {
    return globalAxios.get(`products/${id}`);
  },
  getBestDeals() {
    return globalAxios.get("products/best/offers");
  },
};
