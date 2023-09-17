<template>
  <div class="wrapper">
    <!-- HomeMainSlider  -->
    <HomeMainSlider :banners="bannersImages" v-if="bannersImages"/>

    <!-- todays offers  -->
    <offersComponentHome :sectionTitle="'Todays Offer'" :products="products" />

    <!-- Promotions  -->
    <Promotions />

    <!-- LargeCover  -->
    <LargeCover :imageSrc="require('@/assets/images/home/largCover.png')" />

    <!-- top reviews  -->
    <!-- <OffersComponent :sectionTitle="'Top Review'" /> -->

    <!-- tabs products slider  -->
    <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition">
      <LargeTabsComponent />
    </v-lazy>
    


    <!-- LargeCover  -->
    <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition">
      <SharedCover
      :imageSrc="require('@/assets/images/home/Braun-Desktop-EN.png')"
    />
    </v-lazy>
    

    <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition">
      <ProductsLooking />
    </v-lazy>
    
  </div>
</template>
<script>
import SliderCategories from "@/components/home/SliderCategories.vue";
import Promotions from "@/components/home/Promotions.vue";
import offersComponentHome from "@/components/home/offersComponentHome.vue";

import LargeCover from "@/components/home/LargeCover.vue";
import SharedCover from "@/components/shared/SharedCover.vue";
import LargeTabsComponent from "@/components/home/LargeTabsComponent.vue";
import ProductsLooking from "@/components/home/ProductsLooking.vue";

import home from "@/services/home";
import { useMeta } from "vue-meta";

export default {
  components: {
    SliderCategories,
    Promotions,
    offersComponentHome,
    LargeCover,
    SharedCover,
    LargeTabsComponent,
    ProductsLooking,
  },
  methods: {
    async getBanners() {
      await home.getBanners().then(res => {
        this.bannersImages = res.data.items.data;
      }).catch(err => {
        console.log(err)
      })
    },

    async getHomeProducts() {
      await home.homeProducts().then(res => {
        this.products = res.data.items.data;
      }).catch(err => {
        console.log(err)
      })
    },
  },
  
  mounted() {
    this.getBanners();
    this.getHomeProducts();
  },

  data() {
    return {
      bannersImages: null,
      products:[],
      test:{
        key:'en'
      }
    }
  }
};
</script>
