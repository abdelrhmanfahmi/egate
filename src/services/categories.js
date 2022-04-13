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
  getCategoryProducts(id) {
    return globalAxios.get(`products?category_id=${id}`);
  },
  getSingleProductDetails(id) {
    return globalAxios.get(`lists/categories/single/${id}`);
  },
  productDetails(id) {
    return globalAxios.get(`products/${id}`);
  },
};
