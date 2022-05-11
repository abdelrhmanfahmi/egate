<template>
  <div class="cart-content mb-2">
    <div
      class="d-flex justify-content-center align-items-center"
      v-if="loading"
    >
      <img src="@/assets/images/Loader.gif" alt="cart-image" class="w-25" />
    </div>
    <div class="" v-else>
      <div class="cart-items-holder" v-if="cartItems">
        <div
          v-for="products in cartItems"
          :key="products.id"
          class="cart-items"
        >
          <CartItem :products="products"></CartItem>
        </div>
      </div>
      <div class="action-holder">
        <hr />
        <div
          class="total-price d-flex justify-content-between align-items-center"
          v-if="cart_sub_total"
        >
          <span> {{ $t("cart.total") }}</span>
          <span> {{ cart_sub_total | fixedCurrency }} {{ currency }} </span>
        </div>
        <div class="navigation my-4" v-if="cart_sub_total">
          <!-- <b-button class="login-button my-2">{{ $t("cart.shopping") }}</b-button> -->

          <router-link
            to="/cart"
            class="login-button dark my-2 text-center text-white"
          >
            {{ $t("cart.purchase") }}
          </router-link>
        </div>
      </div>
      <div
        class="d-flex justify-content-center align-items-center"
        v-if="!cartItems"
      >
        <p class="m-0">
          {{ $t("cart.noCartProducts") }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
// import Product from "@/apis/Product";
import CartItem from "./CartItem.vue";

export default {
  data() {
    return { count: 0, loading: false };
  },
  components: {
    CartItem,
  },
  methods: {
    getCartProducts() {
      this.loading = true;
      this.$store.dispatch("cart/getCartProducts");
      this.loading = false;
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
    cartItemsLength() {
      return this.cartItems.length;
    },
  },
};
</script>
<style lang="scss" scoped>
.cart-items-holder {
  height: 346px;
  overflow-y: scroll;
}
.cart-content {
  position: relative;
  .cartLength {
    position: absolute;
    top: -15px;
    left: -15px;
    background: red;
    color: #fff;
    width: 40px;
    height: 40px;
    line-height: 31px;
    text-align: center;
    border-radius: 50%;
    font-size: 20px;
    border: 5px solid #fdfdfd00;
    font-weight: bold;
  }
}
</style>
