<template>
  <!-- cart page  -->
  <div class="cart-page">
    <div class="container">
      <!-- include cart comppnent  -->
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
};
</script>
<style lang="scss" scoped>
.cart-page {
  padding: 2rem;
}
</style>
