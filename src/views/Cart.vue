<template>
  <div class="cart-page">
    <div class="container">
      <Cart></Cart>
    </div>
  </div>
</template>
<script>
import Cart from "../components/pages/cart/Cart.vue";
export default {
  components: {
    Cart,
  },
  data() {
    return { count: 0 };
  },
};
</script>
<style lang="scss" scoped>
.cart-page {
  padding: 2rem;
}
</style>
