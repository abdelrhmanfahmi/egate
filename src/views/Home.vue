<template>
  <div class="wrapper">
    <!-- SliderCategories  -->
    <SliderCategories :banners="bannersImages" v-if="bannersImages" />

    <!-- todays offers  -->
    <!-- <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition"> -->
    <offersComponentHome :sectionTitle="'Discount Products'" v-if="products" :products="products" />
    <!-- </v-lazy> -->

    <!-- Promotions  -->
    <!-- <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition"> -->
    <Promotions v-if="promotions" :promotions="promotions" />
    <!-- </v-lazy> -->

    <!-- LargeCover  -->
    <!-- <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition"> -->
    <LargeCover v-if="largeCoversOne" :largeCoversOne="largeCoversOne" />
    <!-- </v-lazy> -->

    <!-- top reviews  -->
    <!-- <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition"> -->
    <OffersComponentTopReviewed v-if="productsTopReviewed" :sectionTitle="'Top Review'" :productsTopReviewed="productsTopReviewed" />
    <!-- </v-lazy> -->

    <!-- tabs products slider  -->
    <!-- <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition"> -->
    <LargeTabsComponent v-if="specialOffer" :specialOffer="specialOffer" />
    <!-- </v-lazy> -->



    <!-- LargeCover  -->
    <!-- <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition"> -->
    <SharedCover v-if="largeCoversTwo" :largeCoversTwo="largeCoversTwo" />
    <!-- </v-lazy> -->


    <!-- <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition"> -->
    <ProductsLooking :categoryFeatured="categoryFeatured" />
    <!-- </v-lazy> -->

  </div>
</template>
<script>
import { defineAsyncComponent } from 'vue'
import SliderCategories from "@/components/home/SliderCategories.vue";

const Promotions = defineAsyncComponent(() =>
  import('@/components/home/Promotions.vue')
);

const offersComponentHome = defineAsyncComponent(() =>
  import('@/components/home/offersComponentHome.vue')
);

const OffersComponentTopReviewed = defineAsyncComponent(() =>
  import('@/components/home/OffersComponentTopReviewed.vue')
);

const LargeCover = defineAsyncComponent(() =>
  import('@/components/home/LargeCover.vue')
);

const SharedCover = defineAsyncComponent(() =>
  import('@/components/shared/SharedCover.vue')
);

const LargeTabsComponent = defineAsyncComponent(() =>
  import('@/components/home/LargeTabsComponent.vue')
);

const ProductsLooking = defineAsyncComponent(() =>
  import('@/components/home/ProductsLooking.vue')
);

import home from "@/services/home";

export default {
  data() {
    return {
      bannersImages: [],
      products: [],
      productsTopReviewed: [],
      promotions: [],
      largeCoversOne: [],
      largeCoversTwo: [],
      categoryFeatured: [],
      specialOffer: [],
      test: {
        key: 'en'
      }
    }
  },

  mounted() {
    setTimeout(() => {
      this.getBanners();
    }, 500);
    setTimeout(() => {
      this.getHomeProducts();
    }, 1000);
    setTimeout(() => {
      this.getHomeProductsTopReviewed();
    }, 2000);
    setTimeout(() => {
      this.getCategoriesFeatured();
    }, 3000);
    setTimeout(() => {
      this.getSpecialOffer();
    }, 4000);
  },

  methods: {
    async getBanners() {
      try {
        const response = await home.getBanners();
        let arrayFilterBannersOnly = response.data.items.data.filter((el) => {
          if (el.display_in != null) {
            return el.display_in == 'slider';
          }
        });

        let arrayFilterPromotionsOnly = response.data.items.data.filter((el) => {
          if (el.display_in != null) {
            return el.display_in.includes("promiotion_banner");
          }
        });

        let arrayFilterLargeCoversOne = response.data.items.data.filter((el) => {
          if (el.display_in != null) {
            return el.display_in.includes("large_banner_1");
          }
        });

        let arrayFilterLargeCoversTwo = response.data.items.data.filter((el) => {
          if (el.display_in != null) {
            return el.display_in.includes("large_banner_2");
          }
        });

        this.bannersImages = arrayFilterBannersOnly;
        this.promotions = arrayFilterPromotionsOnly;
        this.largeCoversOne = arrayFilterLargeCoversOne;
        this.largeCoversTwo = arrayFilterLargeCoversTwo;
      } catch (e) {
        console.log(e);
      }
    },

    async getHomeProducts() {
      await home.homeProducts().then(res => {
        this.products = res.data.items.data;
      }).catch(err => {
        console.log(err)
      })
    },

    async getHomeProductsTopReviewed() {
      try {
        const response = await home.homeProductsTopReviewed();
        this.productsTopReviewed = response.data.items.data;
      } catch (e) {
        console.log(e);
      }
    },

    async getCategoriesFeatured() {
      try {
        const response = await home.getFeaturedCategories();
        this.categoryFeatured = response.data.items.data.slice(0, 4);
      } catch (e) {
        console.log(e);
      }
    },

    async getSpecialOffer() {
      try {
        const response = await home.getProductsSpecial();
        this.specialOffer = response.data.items.data[0];
      } catch (e) {
        console.log(e);
      }
    }
  },

  components: {
    SliderCategories,
    Promotions,
    offersComponentHome,
    OffersComponentTopReviewed,
    LargeCover,
    SharedCover,
    LargeTabsComponent,
    ProductsLooking
  },

};
</script>
