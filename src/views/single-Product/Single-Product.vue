<template>
  <div class="container">
    <b-row align-h="center">
      <b-col cols="12" lg="6" xl="4">
        <ProductInfo></ProductInfo>
      </b-col>
      <b-col cols="12" lg="6">
        <Slider></Slider>
      </b-col>
    </b-row>
    <div class="humhum-tabs">
      <b-tabs content-class="mt-3">
        <b-tab :title="$t('singleProduct.specsTitle')" active>
          <Specs></Specs>
        </b-tab>
        <b-tab :title="$t('singleProduct.ratingTitle')">
          <Rating></Rating>
        </b-tab>
      </b-tabs>
    </div>
    <div class="most-sold text-center">
      <div class="container">
        <h4 class="header font-weight-bold mt-5 mb-3">
          {{ $t("items.products") }}
        </h4>
        <hr />
        <b-row class="justify-content-center justify-content-sm-between">
          <b-col
            cols="10"
            sm="6"
            lg="4"
            xl="2"
            v-for="(item, index) in 4"
            :key="index"
          >
            <Product :data="product[index]"></Product
          ></b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>
<script>
import Slider from "@/components/single-product/Slider.vue";
import ProductInfo from "@/components/single-product/ProductInfo.vue";
import Specs from "@/components/single-product/Specs.vue";
import Rating from "@/components/single-product/Rating.vue";
import Product from "@/components/pages/supplier/products/Product.vue";

export default {
  components: {
    Slider,
    ProductInfo,
    Specs,
    Rating,
    Product,
  },
  data() {
    return {
      product: [
        {
          image: require("@/assets/images/sp.png"),
          name: this.$t("supplier.productName"),
          price: "4.620 KD",
          new: true,
        },
        {
          image: require("@/assets/images/sp.png"),
          name: this.$t("supplier.productName"),
          price: "4.620 KD",
          discount: 20,
        },
        {
          image: require("@/assets/images/sp.png"),
          name: this.$t("supplier.productName"),
          price: "4.620 KD",
        },
        {
          image: require("@/assets/images/sp.png"),
          name: this.$t("supplier.productName"),
          price: "4.620 KD",
          new: true,
          discount: 35,
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.humhum-tabs {
  padding: 4rem;
  margin: 3rem 0;
}
</style>
