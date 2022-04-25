export const ADD_SUPPLIER_TO_CART = (state, { supplier }) => {
  let suppliersInCart = state.suppliers.find((item) => {
    return item.supplier.id === supplier.id;
  });

  if (suppliersInCart) {
    suppliersInCart
    return;
  }

  state.suppliers.push({
    supplier,
  });
};

export const SET_SUPPLIERS_CART = (state, supplier) => {
  state.supplier = supplier;
};
