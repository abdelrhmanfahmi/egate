<template>
  <div class="class-name">
    <Slider></Slider>
  </div>
</template>
<script>
import Slider from "@/components/single-product/Slider.vue";
export default {
  components: {
    Slider,
  },
  data() {
    return { count: 0 };
  },
};
</script>
<style lang="scss" scoped>
.class-name {
  padding: 2rem;
  background: #f00;
}
</style>
