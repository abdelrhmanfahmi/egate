import globalAxios from "./global-axios";

export default {
  // profile Category
  getCategories() {
    return globalAxios.get("members/profile/categories");
  },
};
