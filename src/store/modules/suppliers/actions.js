export const addSupplierToCart = ({ commit }, { supplier }) => {
  commit("ADD_SUPPLIER_TO_CART", { supplier });
//   localStorage.setItem('mySuppliers' , JSON.stringify(suppliers))
};

export const updateSupplierFromCart = ({ commit }, supplier) => {
  commit("SET_SUPPLIERS_CART", supplier);
};
