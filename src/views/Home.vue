<template>
  <div class="wrapper">
    <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition">
      <SliderCategories :categories="categories" />
    </v-lazy>
    <!-- categories slider component  -->

    <!-- todays offers  -->

    <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition">
      <OffersComponent :sectionTitle="'Discount Products'" />
    </v-lazy>
    

    <!-- Promotions  -->
    <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition">
      <Promotions />
    </v-lazy>
    
    <!-- todays offers  -->
    <!-- <OffersComponent :sectionTitle="'Todays Offer'" :products="products" /> -->


    <!-- LargeCover  -->
    <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition">
      <LargeCover :imageSrc="require('@/assets/images/home/largCover.png')" />
    </v-lazy>
    


    <!-- top reviews  -->
    <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition">
      <OffersComponent :sectionTitle="'Top Review'" />
    </v-lazy>
    


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
import OffersComponent from "@/components/home/OffersComponent.vue";

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
    OffersComponent,
    LargeCover,
    SharedCover,
    LargeTabsComponent,
    ProductsLooking,
  },
  methods: {
    async getHomeMainSlider() {
      await home
        .homeMainSlider()
        .then((res) => {
          this.sliders = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getGallary() {
      await home
        .getGallary()
        .then((res) => {
          this.galleryImages = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getHomeProducts() {
      await this.$store.dispatch("getProducts");
    },
  },
  mounted() {
    // this.getHomeMainSlider();
    // this.getGallary();
    // this.getHomeProducts();
    this.$nextTick(() => {
      document.dispatchEvent(new Event("render-complete"));
    });
    this.$store.dispatch("Auth/resetErrors");
  },
  data() {
    return {
      sliders: null,
      galleryImages: null,
      test: {
        key: "en",
      },
    };
  },
  computed: {
    products() {
      return this.$store.getters.products;
      // return this.$store.state.Products.products
    },
    categories() {
      return this.$store.getters["Categories/categories"];
    },
  },
  setup() {
    useMeta({
      title: "Home",
      htmlAttrs: { lang: "en", amp: true },
    });
  },
};
</script>
