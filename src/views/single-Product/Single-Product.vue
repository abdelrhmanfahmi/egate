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
  </div>
</template>
<script>
import Slider from "@/components/single-product/Slider.vue";
import ProductInfo from "@/components/single-product/ProductInfo.vue";
export default {
  components: {
    Slider,
    ProductInfo,
  },
  data() {
    return { count: 0 };
  },
};
</script>
<style lang="scss" scoped>
.class-name {
  padding: 2rem;
}
</style>
