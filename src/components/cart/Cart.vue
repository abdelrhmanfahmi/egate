<template>
  <!-- cart component  -->
  <div class="cart-content mb-2">
    <!-- if cart data  -->
    <div
      class="d-flex justify-content-center align-items-center"
      v-if="loading"
    >
      <img
        src="@/assets/images/BeanLoading2.gif"
        alt="cart-image"
        class="w-25"
      />
    </div>
    <!-- else  -->
    <div class="" v-else>
      <div v-if="cartItems" :class="classObject">
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
        <div class="navigation my-4" v-if="cart_sub_total || cart_sub_total >=0">
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
// This is a description of the cart component
import CartItem from "./CartItem.vue";

export default {
  data() {
    return { count: 0, loading: false };
  },
  components: {
    CartItem,
  },
  methods: {
    /**
     * @vuese
     * get cart products from store.
     */
    getCartProducts() {
      // Fire when page load
      this.loading = true;
      this.$store.dispatch("cart/getCartProducts");
      this.loading = false;
    },
  },
  mounted() {
    this.getCartProducts();
  },
  computed: {
    /**
     * @vuese
     * this function used to get cartItems
     */
    cartItems() {
      return this.$store.state.cart.cartItems;
    },
    /**
     * @vuese
     * this function used to get cart_sub_total
     */
    cart_sub_total() {
      return this.$store.state.cart.cart_sub_total;
    },
    /**
     * @vuese
     * this function used to get cart Items Length
     */
    cartItemsLength() {
      return this.cartItems.length;
    },
    /**
     * @vuese
     * this function used to switch class according to length
     */
    classObject() {
      return {
        "small-cart": this.cartItemsLength && this.cartItemsLength <= 2,
        "cart-items-holder": this.cartItemsLength && this.cartItemsLength > 2,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
/**
   * cart component style.
   */

.cart-items-holder {
  height: 346px !important;
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
.small-cart {
  height: 140px !important;
  overflow-y: scroll;
  scrollbar-color: transparent transparent;
  scrollbar-width: thin;
}
</style>
