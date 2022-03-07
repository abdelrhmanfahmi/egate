<template>
  <div class="cart-content">
    <CartItem></CartItem>
    <CartItem></CartItem>
    <hr />
    <div class="total-price d-flex justify-content-between align-items-center">
      <span> {{ $t("cart.total") }}</span>
      <span>8.600kd</span>
    </div>
    <div class="navigation my-4">
      <b-button class="login-button my-2">{{ $t("cart.shopping") }}</b-button>
      <b-button class="login-button dark my-2">{{
        $t("cart.purchase")
      }}</b-button>
    </div>
  </div>
</template>
<script>
import CartItem from "./CartItem.vue";

export default {
  data() {
    return { count: 0 };
  },
  components: {
    CartItem,
  },
};
</script>
<style lang="scss" scoped>
.cart-content {
}
</style>
