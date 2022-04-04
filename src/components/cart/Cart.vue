<template>
  <div class="cart-content">
    <div v-for="products in cartItems" :key="products.id">
      <CartItem :products="products"></CartItem>
    </div>
    <hr />
    <div class="total-price d-flex justify-content-between align-items-center">
      <span> {{ $t("cart.total") }}</span>
      <span>
      {{cart_sub_total}}
      </span>
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
import Product from "@/apis/Product";
import CartItem from "./CartItem.vue";

export default {
  data() {
    return { count: 0, cartItems: null , cart_sub_total:null };
  },
  components: {
    CartItem,
  },
  methods: {
    getCartProducts() {
      Product.all().then((res) => {
        console.log("cart resp", res);
        this.cartItems = res.data.items.cart_items;
        this.cart_sub_total = res.data.items.cart_sub_total;
      });
    },
  },
  mounted() {
    this.getCartProducts();
  },
};
</script>
<style lang="scss" scoped>
// .cart-content {
// }
</style>
