<template>
  <div>
    <div
      class="most-sold text-center related-products"
      v-if="basket_promotions || buy_get_promotions || gift_promotions "
    >
      <div class="">
        <div class="my-5 py-5">
          <!-- other products slider  -->
          <VueSlickCarousel v-bind="settings" v-if="5 > 2">
            <div
              v-for="item in basket_promotions"
              :key="item.id"
            >
              <Product :data="item"></Product>
            </div>
            <div
              v-for="item in buy_get_promotions"
              :key="item.id"
            >
              <Product :data="item"></Product>
            </div>
            <div
              v-for="item in gift_promotions"
              :key="item.id"
            >
              <Product :data="item"></Product>
            </div>
          </VueSlickCarousel>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import suppliers from "@/services/suppliers";
import Product from "@/components/pages/supplier/products/Product.vue";
import VueSlickCarousel from "vue-slick-carousel";
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  data() {
    return {
      offers: null,
      basket_promotions: null,
      buy_get_promotions: null,
      gift_promotions: null,
      settings: {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,

        responsive: [
          {
            breakpoint: 1191,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              arrows: true,
              dots: false,
            },
          },
          {
            breakpoint: 820,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              arrows: true,
              dots: false,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: true,
              dots: false,
            },
          },
        ],
      },
      
    };
  },
  methods: {
    getRelatedOffers() {
      suppliers
        .getRelatedOffers(this.$route.query.id)
        .then((res) => {
          console.log("res offers", res);
          // let Offers = null ;
          this.basket_promotions = res.data.items.basket_promotions;
          this.buy_get_promotions = res.data.items.buy_get_promotions;
          this.gift_promotions = res.data.items.gift_promotions;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getRelatedOffers();
  },
  components:{
    Product,
    VueSlickCarousel
  }
};
</script>
