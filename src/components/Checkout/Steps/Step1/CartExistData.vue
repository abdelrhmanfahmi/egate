<template>
  <div class="existCartDatawrapper">
    <div class="existData">
      <div class="cart-data-holder">
        <div class="cart-product" v-for="i in 2" :key="i">
          <v-row class="aligned-row justify-space-between">
            <v-col
              cols="6"
              lg="6"
              md="6"
              sm="6"
              class="aligned-row justify-space-between"
            >
              <div class="image-holder">
                <v-img
                  src="@/assets/images/product/Image15.png"
                  lazy-src="@/assets/images/product/Image15.png"
                  width="100"
                ></v-img>
              </div>
              <div class="counter-holder">
                <div class="counter">
                  <p class="product-name mb-3">Jbl Speaker</p>
                  <Counter @changValue="changValue" />
                </div>
              </div>
            </v-col>
            <v-col cols="6" lg="6" md="6" sm="6" class="text-right">
              <div class="price-holder">
                <p class="product-price">550 Le</p>
              </div>
            </v-col>
          </v-row>
        </div>
        <v-divider
          :thickness="2"
          class="border-opacity-100 text-gray mt-15 mb-5"
        ></v-divider>
        <div class="total-prices">
          <v-row>
            <v-col cols="6">
              <p class="text-gray">SUBTOTAL</p>
            </v-col>
            <v-col cols="6">
              <p class="product-price">1100 Le</p>
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
        <v-divider
          :thickness="2"
          class="border-opacity-100 text-gray mt-15 mb-5"
        ></v-divider>
        <div class="final-price">
            <v-row>
            <v-col cols="6">
                <h4><b>Total</b></h4>
            </v-col>
            <v-col cols="6">
                <h4 class="product-price">1100 LE</h4>
            </v-col>
            </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Counter from "@/components/Cart/Counter.vue";
export default {
  components: {
    Counter,
  },
};
</script>

<style lang="scss" scoped>
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
