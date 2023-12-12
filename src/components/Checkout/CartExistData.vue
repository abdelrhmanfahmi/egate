<template>
  <div class="existCartDatawrapper">
    <div class="existData">
      <div class="cart-data-holder" v-if="cartItems">
        <div class="cart-product" v-for="(product, idx) in cartItems" :key="idx">
          <v-row class="aligned-row justify-space-between">
            <v-col cols="6" lg="6" md="6" sm="6" class="aligned-row justify-space-between">
              <div class="image-holder">
                <v-img v-if="product.product.image" :src="product.product.image" :lazy-src="product.product.image"
                  width="80"></v-img>
                  <v-img v-else :src="require('@/assets/images/logo.png')" width="80"></v-img>
              </div>
              &nbsp;&nbsp;&nbsp;
              <div class="counter-holder">
                <div class="counter">
                  <p class="product-name mb-3">{{ product.product.name }}</p>
                  <Counter @changValue="updateValue(product, $event)" :quantity="product.quantity" />
                </div>
              </div>
            </v-col>
            <v-col cols="6" lg="6" md="6" sm="6" class="text-right">
              <div class="price-holder">
                <p class="product-price">{{ product.product.product_price }} EGP</p>
              </div>
            </v-col>
          </v-row>
        </div>
        <v-divider :thickness="2" class="border-opacity-100 text-gray mt-15 mb-5"></v-divider>
        <div class="total-prices">
          <v-row>
            <v-col cols="6">
              <p class="text-gray">SUBTOTAL</p>
            </v-col>
            <v-col cols="6" v-if="is_coupon_success">
              <p class="product-price">{{ totalPriceAfterCoupon }} EGP</p>
            </v-col>
            <v-col cols="6" v-else>
              <p class="product-price">{{ cartTotalPrice }} EGP</p>
            </v-col>
          </v-row>
        </div>
        <div class="product-shippinf">
          <v-row>
            <v-col cols="6">
              <p class="text-gray">Shipping</p>
            </v-col>
            <v-col cols="6">
              <small class="text-gray">Calculated at next step</small>
            </v-col>
          </v-row>
        </div>
        <v-divider :thickness="2" class="border-opacity-100 text-gray mt-15 mb-5"></v-divider>
        <div class="final-price">
          <v-row>
            <v-col cols="6">
              <h4><b>Total</b></h4>
            </v-col>
            <v-col cols="6" v-if="is_coupon_success">
              <h4 class="product-price">{{ totalPriceAfterCoupon }} EGP</h4>
            </v-col>
            <v-col cols="6" v-else>
              <h4 class="product-price">{{ cartTotalPrice }} EGP</h4>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Counter from "@/components/Cart/Counter.vue";
import { cartItems } from "@/store/modules/cart/getters";
export default {
  props: ['cartItems', 'cartTotalPrice','totalPriceAfterCoupon' , 'is_coupon_success'],
  methods: {
    updateValue(product, value) {
      let dataUpdated = {
        quantity: value,
        product_id: product.id
      };

      this.$store.dispatch('cart/updateProductFromCart', dataUpdated).then(() => {
        setTimeout(() => {
          this.$store.dispatch('cart/getCartProducts');
        }, 500);
      });
    }
  },
  components: {
    Counter,
  },
};
</script>

<style lang="scss" scoped>
.product-name {
  color: #33322D !important;
}

.existCartDatawrapper {
  min-height: 60vh;

  padding: 0 10px;

  .cart-data-holder {
    .cart-product {

      //border-bottom: 1px solid $gray;
      &:last-of-type {
        border: none !important;
      }
    }
  }
}
</style>
