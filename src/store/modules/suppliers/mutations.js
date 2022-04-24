export const ADD_SUPPLIER_TO_CART = (state, { suppliers }) => {
  let suppliersInCart = state.suppliers.find((item) => {
    return item.suppliers.id === suppliers.id;
  });

  if (suppliersInCart) {
    suppliersInCart
    return;
  }

  state.suppliers.push({
    suppliers,
  });
};

export const SET_SUPPLIERS_CART = (state, supplier) => {
  state.supplier = supplier;
};
