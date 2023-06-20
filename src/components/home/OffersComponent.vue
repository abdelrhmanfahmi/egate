<template>
  <div class="wrapper">
    <v-container>
      <div class="d-flex justify-space-between align-center">
        <div class="section-title">
          <h3>{{ sectionTitle }}</h3>
        </div>
        <div v-if="seeMore == 'yes'">
          <router-link to="/" class="text-decoration-underline"
            ><span class="see-more">See More</span></router-link
          >
        </div>
      </div>
    </v-container>
    <!-- products slider  -->
    <ProductsSlider />
    <!-- <ProductsSlider :products="products" /> -->
  </div>
</template>

<script>
import ProductsSlider from "@/components/shared/Products/ProductsSlider.vue";
export default {
  props: {
    sectionTitle:{
      type:String
    },
    seeMore:{
      type:String,
      default:'yes'
    },
    products:{
      type:Array,
      required:true
    }
  },
  components: {
    ProductsSlider,
  },
};
</script>

<style></style>
