export const addSupplierToCart = ({ commit }, { suppliers }) => {
  commit("ADD_SUPPLIER_TO_CART", { suppliers });
//   localStorage.setItem('mySuppliers' , JSON.stringify(suppliers))
};

export const updateSupplierFromCart = ({ commit }, suppliers) => {
  commit("SET_SUPPLIERS_CART", suppliers);
};
