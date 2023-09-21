<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <img :src="largeCoversOne[0].image" alt="image" class="coverImage">
      </div>
    </div>
  </div>
</template>

<script>
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
export default {
  setup() {
      return {
          modules: [Navigation, Autoplay],
      };
  },

  data(){
    return {
      
    }
  },

  props:['largeCoversOne'],

  components:{
        Swiper,
        SwiperSlide
    },
}
</script>

<style lang="scss" scoped>

.coverImage{
  height: 60vh;
  object-fit: cover !important;
  width: 100%;
  border-radius: 10px;
}

</style>