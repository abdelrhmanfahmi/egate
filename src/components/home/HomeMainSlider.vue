<template>
  <section class="homeMainSlider">
    <v-container fluid>
      <v-row>
        <v-col cols="auto" md="3">
          <SliderCategoryComponent :categories="categories"/>
        </v-col>
        <v-col cols="auto" md="9">
          <swiper v-bind="options" :modules="modules" class="mySwiper">
            <swiper-slide v-for="(banner , index) in banners" :key="index">
              <img
                :src="banner.image"
                :lazy-src="banner.image"
              />
            </swiper-slide>
          </swiper>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// import required modules
import { Pagination , Autoplay } from "swiper";
import SliderCategoryComponent from './SliderCategoryComponent.vue';
import home from "@/services/home";

export default {
  mounted(){
    this.getCategories();
  },

  data() {
    return {
      options: {
        slidesPerView: 1,
        spaceBetween: 30,
        activeIndex:1,
        loop: true,
        pagination: {
          clickable: true,
        },
        centeredSlides: true,
        speed:300,
        direction: 'horizontal',
        zoom:true,
        autoplay: {
          delay: 5000,
        },
        fadeEffect: {
          crossFade: true,
        },
      },

      categories:[]
    };
  },

  props:['banners'],

  methods:{
    async getCategories(){
      const response = await home.getCategories().then(res => {
        this.categories = res.data.items.data;
      }).catch(err => {
        console.log(err)
      })
    }
  },

  components: {
    Swiper,
    SwiperSlide, 
    SliderCategoryComponent
  },

  setup() {
    return {
      modules: [Pagination , Autoplay],
    };
  }

};
</script>

<style scoped lang="scss">
  p{
    color: #000;
  }
</style>
