<template>
  <div class="container-fluid mb-5">
    <div class="row">
      <div class="col-md-12" v-if="largeCoversOne.length > 0">
        <router-link :to="'/productPage/'+largeCoversOne[0].id">
          <img :src="largeCoversOne[0].image" alt="image" class="coverImage">
        </router-link>
      </div>
      <div v-else>
        <h5>No covers</h5>
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
  object-fit: fill !important;
  width: 100%;
  border-radius: 10px;
}

</style>