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
        <b-tab title="Specs" active>
          <Specs></Specs>
        </b-tab>
        <b-tab title="Rating">
          <Rating></Rating>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import Slider from "@/components/single-product/Slider.vue";
import ProductInfo from "@/components/single-product/ProductInfo.vue";
import Specs from "@/components/single-product/Specs.vue";
import Rating from "@/components/single-product/Rating.vue";
export default {
  components: {
    Slider,
    ProductInfo,
    Specs,
    Rating,
  },
  data() {
    return { count: 0 };
  },
};
</script>
<style lang="scss">
.humhum-tabs {
  padding: 4rem;
  margin: 3rem 0;
}
</style>
