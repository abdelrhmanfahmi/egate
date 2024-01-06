<template>
  <div class="products-slider-wrapper">
    <v-container>
      <section class="pb-5">
        <div class="">
          <swiper :spaceBetween="0" :modules="modules" :breakpoints="swiperOptions.breakpoints" class="mySwiper">
            <swiper-slide v-for="(product, index) in products" :key="index">
              <ProductCard :product="product"/>
            </swiper-slide>
          </swiper>
        </div>
      </section>
    </v-container>
  </div>
</template>

<script>
// import TabsProductCard from "./TabsProductCard.vue";
import ProductCard from '@/components/shared/Products/ProductCard.vue';
import { Swiper, SwiperSlide } from "swiper/vue";
export default {
  mounted(){
    if(this.isLoggedIn){
      this.putFavouritesIconData();
    }
  },
  setup() {
    return {
      modules: [],
    };
  },

  data() {
    return {
      swiperOptions: {
        slidesPerView: 3,
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          767: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          770: {
            slidesPerView: 2,
            spaceBetween: 14,
          },
          1200:{
            slidesPerView:3,
            spaceBetween:10
          },
          1500:{
            slidesPerView:3,
            spaceBetween:14
          }
        },
      },
    };
  },
  methods:{
    async putFavouritesIconData(){
      try{
        let user = JSON.parse(localStorage.getItem('EGate-userInfo'));
        let arr = await this.$store.getters["wishlist/wishlistData"];
        for(let i = 0 ; i < arr.length ; i++){
        if(document.getElementById('getHeart'+arr[i].id) != null){
          if(user){
            document.getElementById('getHeart'+arr[i].id).classList.remove("mdi-heart-outline");
            document.getElementById('getHeart'+arr[i].id).classList.add("mdi-heart");
            document.getElementById('styleHeart'+arr[i].id).style.color = 'red';
          }else{
            document.getElementById('getHeart'+arr[i].id).classList.remove("mdi-heart");
            document.getElementById('getHeart'+arr[i].id).classList.add("mdi-heart-outline");
            document.getElementById('styleHeart'+arr[i].id).style.color = 'black';
          }
        }else{
          console.log('sayed');
        }
      }
      }catch(e){
        console.log(e);
      }
    },
  },

  props:['products'],
  computed: {
    isLoggedIn: function () {
      return this.$store.getters['Auth/isAuthenticated'];
    },
  },

  components: {
    // TabsProductCard,
    ProductCard,
    Swiper,
    SwiperSlide,
  },
};
</script>

<style></style>
