import Wishlist from "@/apis/Wishlist";

export const addProductToWishlist = ({ commit }, { product }) => {
  commit("ADD_TO_WISHLIST", { product });

  Wishlist.store(product.id)
};

export const getWishlistItems = ({ commit }) => {
  Wishlist.all().then((response) => {
    commit("SET_WISHLIST", response.data);
  });
};

export const removeProductFromWishlist = ({ commit }, product) => {
  commit("REMOVE_PRODUCT_FROM_SET_WISHLIST", product);
  Wishlist.delete(product.myItem.id);
};

export const clearWishlistItems = ({ commit }) => {
  commit("CLEAR_WISHLIST_ITEMS");

  Wishlist.deleteAll();
};
