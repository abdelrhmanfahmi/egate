<template>
  <div class="wrapper" v-if="productsCategory">
    <v-container fluid>
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
    <ProductsSlider :productsCategory="productsCategory" />
  </div>
</template>

<script>
import ProductsSlider from "@/components/shared/Products/ProductsSlider.vue";
export default {
  props:['productsCategory' , 'sectionTitle' , 'seeMore'],
  components: {
    ProductsSlider,
  },
};
</script>

<style></style>
