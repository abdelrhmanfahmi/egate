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
    <div class="test">
      <Specs></Specs>
    </div>
  </div>
</template>
<script>
import Slider from "@/components/single-product/Slider.vue";
import ProductInfo from "@/components/single-product/ProductInfo.vue";
import Specs from "@/components/single-product/Specs.vue";
export default {
  components: {
    Slider,
    ProductInfo,
    Specs,
  },
  data() {
    return { count: 0 };
  },
};
</script>
<style lang="scss" scoped>
.test {
  background: #f2f5f6;
  padding: 4rem;
  margin: 3rem 0;
}
</style>
