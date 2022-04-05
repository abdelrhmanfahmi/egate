<template>
  <div class="cart-content">
    <div class="" v-if="cartItems">
      <div v-for="products in cartItems" :key="products.id">
        <CartItem :products="products"></CartItem>
      </div>
      <hr />
      <div
        class="total-price d-flex justify-content-between align-items-center"
        v-if="cart_sub_total"
      >
        <span> {{ $t("cart.total") }}</span>
        <span>
          {{ cart_sub_total }}
        </span>
      </div>
      <div class="navigation my-4" v-if="cart_sub_total">
        <b-button class="login-button my-2">{{ $t("cart.shopping") }}</b-button>
        <b-button class="login-button dark my-2">{{
          $t("cart.purchase")
        }}</b-button>
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center" v-else>
      <p class="m-0">
        {{ $t("cart.noCartProducts") }}
      </p>
    </div>
  </div>
</template>
<script>
// import Product from "@/apis/Product";
import CartItem from "./CartItem.vue";

export default {
  data() {
    return { count: 0 };
  },
  components: {
    CartItem,
  },
  methods: {
    getCartProducts() {
      this.$store.dispatch("cart/getCartProducts");
    },
  },
  mounted() {
    this.getCartProducts();
  },
  computed: {
    cartItems() {
      return this.$store.state.cart.cartItems;
    },
    cart_sub_total() {
      return this.$store.state.cart.cart_sub_total;
    },
  },
};
</script>
<style lang="scss" scoped>
// .cart-content {
// }
</style>
