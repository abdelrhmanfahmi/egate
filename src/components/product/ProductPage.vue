<template>
  <div>
    <v-app >
      <v-container fluid v-if="product">
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <ProductSlider :product="product" />
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <ProductActions :product="product" />
          </v-col>
        </v-row>
        <ProductShippingInfo :product="product" />
        <ProductInfo  :product="product" />
        <RelatedProducts :product="product" />
      </v-container>
    </v-app>
  </div>
</template>

<script>
import ProductSlider from "./ProductSlider.vue";
import ProductActions from "./ProductActions.vue";
import ProductShippingInfo from "./ProductShippingInfo.vue";
import ProductInfo from "./ProductInfo.vue";
import RelatedProducts from "./RelatedProducts.vue";
export default {
  props:['product'],
  components: {
    ProductSlider,
    ProductActions,
    ProductShippingInfo,
    ProductInfo,
    RelatedProducts
  },
};
</script>

<style></style>
