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
      <ProductsSliderBrand :productsBrand="productsBrand" />
    </div>
  </template>
  
  <script>
  import ProductsSliderBrand from "@/components/shared/Products/ProductsSliderBrand.vue";
  export default {
    props:['productsBrand' , 'sectionTitle' , 'seeMore'],
    // props: {
    //   sectionTitle:{
    //     type:String
    //   },
    //   seeMore:{
    //     type:String,
    //     default:'yes'
    //   },
    //   products:{
    //     type:Array,
    //     required:true
    //   }
    // },
    components: {
      ProductsSliderBrand,
    },
  };
  </script>
  
  <style></style>
  