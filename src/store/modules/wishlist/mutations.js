export const ADD_TO_WISHLIST = (state, { product }) => {
  let productInWishlist = state.wishlist.find((item) => {
    return item.product.id === product.id;
  });

  if (productInWishlist) {
    productInWishlist;
    return;
  }

  state.wishlist.push({
    product,
  });
};

export const SET_WISHLIST = (state, wishlistItems) => {
  state.wishlist = wishlistItems;
};

export const REMOVE_PRODUCT_FROM_SET_WISHLIST = (state, product) => {
  state.wishlist = state.wishlist.filter((item) => {
    return item.product.id !== product.id;
  });
};

export const CLEAR_WISHLIST_ITEMS = (state) => {
  state.wishlist = [];
};
