<template>
    <div class="wrapper">
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
      <ProductSliderHome :products="productsTopReviewed" />
    </div>
  </template>
  
  <script>
  import ProductSliderHome from "@/components/shared/Products/ProductSliderHome.vue";
  export default {
    props:['productsTopReviewed' , 'sectionTitle' , 'seeMore'],
    
    components: {
        ProductSliderHome,
    },
  };
  </script>
  
  <style></style>
  