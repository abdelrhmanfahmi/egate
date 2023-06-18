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
        category_id:data.catId ? data.catId : null
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
  getCategoryProducts(page , id, sorting, country, weight, unit) {
    // add page for pagination 
  // getCategoryProducts(id, sorting, cat, country, weight, unit) {
    // return globalAxios.get(`products?${cat}`, {
    return globalAxios.get(`products`, {
      params: {
        page:page ? page : null,
        category_id: id ? id : null,
        sort_price: sorting ? sorting : null,
        country_id: country ? country : null,
        weight: weight ? weight : null,
        unit_id: unit ? unit : null,
        count:10,
      }
    });
  },
  searchVaiantsTableProducts(id, sorting, country, weight, unit , keyword , page) {
  // getCategoryProducts(id, sorting, cat, country, weight, unit) {
    // return globalAxios.get(`products?${cat}`, {
    return globalAxios.get(`products`, {
      params: {
        category_id: id ? id : null,
        sort_price: sorting ? sorting : null,
        country_id: country ? country : null,
        weight: weight ? weight : null,
        unit_id: unit ? unit : null,
        keyword:keyword ? keyword : null,
        page:page ? page : null
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
