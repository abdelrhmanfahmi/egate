<template>
  <div class="wrapper">
    <!-- SliderCategories  -->
    <SliderCategories :banners="bannersImages" v-if="bannersImages"/>

    <!-- todays offers  -->
    <offersComponentHome :sectionTitle="'Discount Products'" :products="products" />

    <!-- Promotions  -->
    <Promotions :promotions="promotions"/>

    <!-- LargeCover  -->
    <LargeCover  :largeCoversOne="largeCoversOne"/>

    <!-- top reviews  -->
    <!-- <OffersComponent :sectionTitle="'Top Review'" /> -->

    <!-- tabs products slider  -->
    <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition">
      <LargeTabsComponent />
    </v-lazy>
    


    <!-- LargeCover  -->
    <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition">
      <SharedCover :largeCoversTwo="largeCoversTwo"/>
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

export default {
  data() {
    return {
      bannersImages: [],
      products:[],
      promotions:[],
      largeCoversOne:[],
      largeCoversTwo:[],
      test:{
        key:'en'
      }
    }
  },

  mounted() {
    this.getBanners();
    this.getHomeProducts();
  },
  
  methods: {
    async getBanners() {
      const response = await home.getBanners();
      let arrayFilterBannersOnly = response.data.items.data.filter((el) => {
        return el.display_in == 'slider';
      });

      let arrayFilterPromotionsOnly = response.data.items.data.filter((el) => {
        return el.display_in.includes("promiotion_banner");
      });

      let arrayFilterLargeCoversOne = response.data.items.data.filter((el) => {
        return el.display_in.includes("large_banner_1");
      });

      let arrayFilterLargeCoversTwo = response.data.items.data.filter((el) => {
        return el.display_in.includes("large_banner_2");
      });

      console.log(arrayFilterLargeCoversOne);

      this.bannersImages = arrayFilterBannersOnly;
      this.promotions = arrayFilterPromotionsOnly;
      this.largeCoversOne = arrayFilterLargeCoversOne;
      this.largeCoversTwo = arrayFilterLargeCoversTwo;
    },

    async getHomeProducts() {
        await home.homeProducts().then(res => {
          this.products = res.data.items.data;
        }).catch(err => {
          console.log(err)
        })
      },
    },

  components: {
    SliderCategories,
    Promotions,
    offersComponentHome,
    LargeCover,
    SharedCover,
    LargeTabsComponent,
    ProductsLooking
  },

};
</script>
