import Wishlist from "@/apis/Wishlist";

export const addProductToWishlist = ({ commit },  product ) => {

  Wishlist.store(product)
  
  commit("ADD_TO_WISHLIST",  product );
};
export const moveProductToWishlist = ({commit} , payload ) => {

  Wishlist.moveToCart(payload)
  
  // commit("ADD_TO_WISHLIST",  product );
};

export const getWishlistItems = ({ commit }) => {
  Wishlist.all().then((response) => {
    commit("SET_WISHLIST", response.data.items.data);
  });
};

export const removeProductFromWishlist = ({ commit }, product) => {
  Wishlist.delete(product);
  commit("REMOVE_PRODUCT_FROM_SET_WISHLIST", product);
};

export const clearWishlistItems = ({ commit }) => {
  commit("CLEAR_WISHLIST_ITEMS");

  Wishlist.deleteAll();
};
