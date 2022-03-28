import Wishlist from "@/apis/Wishlist";

export const addProductToWishlist = ({ commit }, { product, quantity }) => {
  commit("ADD_TO_WISHLIST", { product, quantity });

  console.log("Product added to Wishlist.");

  this.$swal({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    icon: "success",
    title: "Product added to Wishlist.",
  });

 
  // Wishlist.store({
  //   product_id: product.id,
  //   quantity,
  // });
};

export const getWishlistItems = ({ commit }) => {
  Wishlist.all().then((response) => {
    commit("SET_WISHLIST", response.data);
  });
};

export const removeProductFromWishlist = ({ commit }, product) => {
  commit("REMOVE_PRODUCT_FROM_SET_WISHLIST", product);

  this.$swal({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    icon: "success",
    title: "Product removed successfully.",
  });

  Wishlist.delete(product.id);
};

export const clearWishlistItems = ({ commit }) => {
  commit("CLEAR_WISHLIST_ITEMS");

  this.$swal({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    icon: "success",
    title: "Wishlist cleared",
  });

  Wishlist.deleteAll();
};
