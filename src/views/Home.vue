<template>
  <div class="wrapper">
    <!-- categories slider component  -->
    <SliderCategories />

    <!-- todays offers  -->
    <OffersComponent :sectionTitle="'Discount Products'" />

    <!-- Promotions  -->
    <Promotions />
    <!-- todays offers  -->
    <!-- <OffersComponent :sectionTitle="'Todays Offer'" :products="products" /> -->

    <!-- LargeCover  -->
    <LargeCover :imageSrc="require('@/assets/images/home/largCover.png')" />
    <!-- top reviews  -->
    <OffersComponent :sectionTitle="'Top Review'" />

    <!-- tabs products slider  -->
    <LargeTabsComponent />

    <!-- LargeCover  -->
    <SharedCover
      :imageSrc="require('@/assets/images/home/Braun-Desktop-EN.png')"
    />
    <ProductsLooking />
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
  },
  setup() {
    useMeta({
      title: "Home",
      htmlAttrs: { lang: "en", amp: true },
    });
  },
};
</script>
