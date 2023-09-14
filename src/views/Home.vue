<template>
  <div class="wrapper">
    <!-- HomeMainSlider  -->
    <HomeMainSlider :banners="bannersImages" v-if="bannersImages"/>
    <!-- Promotions  -->
    <Promotions />
    <!-- todays offers  -->
    <OffersComponent :sectionTitle="'Todays Offer'" :products="products" />

    <!-- LargeCover  -->
    <LargeCover :imageSrc="require('@/assets/images/home/largCover.png')" />
    <!-- top reviews  -->
    <OffersComponent :sectionTitle="'Top Review'" />

    <!-- tabs products slider  -->
    <LargeTabsComponent />

    <!-- LargeCover  -->
    <SharedCover :imageSrc="require('@/assets/images/home/Braun-Desktop-EN.png')" />
    <ProductsLooking />
  </div>
</template>
<script>
import HomeMainSlider from "@/components/home/HomeMainSlider.vue";
import Promotions from "@/components/home/Promotions.vue";
import OffersComponent from "@/components/home/OffersComponent.vue";

import LargeCover from "@/components/home/LargeCover.vue";
import SharedCover from "@/components/shared/SharedCover.vue";
import LargeTabsComponent from "@/components/home/LargeTabsComponent.vue";
import ProductsLooking from "@/components/home/ProductsLooking.vue";

import home from "@/services/home";

export default {
  components: {
    HomeMainSlider,
    Promotions,
    OffersComponent,
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
      await this.$store.dispatch('getProducts')
    },
    
  },
  mounted() {
    this.getBanners()
    this.getHomeProducts()
  },
  data() {
    return {
      bannersImages: null,
      test:{
        key:'en'
      }
    }
  },
  computed:{
    products(){
      return this.$store.getters.products
      // return this.$store.state.Products.products
    }
  }
};
</script>
