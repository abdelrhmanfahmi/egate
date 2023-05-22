<template>
  <div class="new-home-slider slider-wrapper mb-5">
    <!-- data comes from backend  -->
    <VueSlickCarousel v-bind="settings" v-if="modalData && modalData.length">
      <div v-for="(item, index) in modalData" :key="index" class="slider-holder">
        <!-- <router-link :to="`/`" class=""> -->
        <div class="" v-if="item.image_path">
          <b-img :src="item.image_path" class="slider-image" alt="slider image"> </b-img>
        </div>
        <div class="absolute-data">
          <!-- <h2 class="h1">text - {{index}}</h2> -->
          <div  v-if="item.model_type === 'product'">
            <router-link :to="{ path: '/details', query: { id: item.model_id } }" class="bg-main text-white">
              <b>{{$t('cart.shopNow')}}</b>
            </router-link>
          </div>
          <div  v-if="item.model_type === 'category'">
             <button :to="`/categories/${item.model_id}`" class="bg-main text-white">
              <b>{{$t('cart.shopNow')}}</b>
             </button>
          </div>
          <div  v-if="item.model_type === 'supplier'">
             <router-link :to="`/suppliers/${item.model_id}`" class="bg-main text-white">
              <b>{{$t('cart.shopNow')}}</b>
            </router-link>
          </div>
          <div  v-if="item.model_type === 'b2b'">
             <router-link to="/b2b-register" class="bg-main text-white">
              <b>{{$t('cart.shopNow')}}</b>
            </router-link>
          </div>
          <div  v-if="item.model_type === 'b2c'">
             <router-link to="/user-register" class="bg-main text-white">
              <b>{{$t('cart.shopNow')}}</b>
            </router-link>
          </div>
          <div  v-if="item.model_type === 'basket_promotion'">
             <router-link :to="{ path: '/basket_promotion', query: { id: item.model_id } }" class="bg-main text-white">
              <b>{{$t('cart.shopNow')}}</b>
            </router-link>
          </div>
          <div  v-if="item.model_type === 'buy_get_promotion'">
             <router-link :to="{ path: '/details', query: { type: `${$t('profile.buy')} 
             ${item.model.buy_x} 
             ${$t('profile.get')} ${item.model.get_y}` } }" class="bg-main text-white">
              <b>{{$t('cart.shopNow')}}</b>
            </router-link>
          </div>
          <div  v-if="item.model_type === 'gift_promotion'">
             <router-link :to="{ path: '/details', query: { id: item.model_id } }" class="bg-main text-white">
              <b>{{$t('cart.shopNow')}}</b>
            </router-link>
          </div>
        </div>
        <!-- </router-link> -->
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import suppliers from '@/services/suppliers'
export default {
  components: {
    VueSlickCarousel,
    // Countdown,
  },
  data() {
    return {
      settings: {
        dots: true,
        dotsClass: "slick-dots custom-dot-class",
        edgeFriction: 0.35,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
      },
      images: [
        "https://images.unsplash.com/photo-1590595978583-3967cf17d2ea?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
        "https://images.unsplash.com/photo-1588807308097-fb6e5047df8c?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
        "https://images.unsplash.com/photo-1589808710416-24cf7ac026f2?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
        "https://images.unsplash.com/photo-1588796388882-a4d533c47e5e?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
      ],
      modalData:null,
      modalDataLength:0
    };
  },
  methods:{
    getNewCoverPromotion(){
      let type = 'b2b'
      if(this.buyerUserData && this.buyerUserData.type === "buyer" || this.buyerUserData && this.buyerUserData.type === "supplier"){
        type = 'b2b'
      }else{
        type = 'b2c'
      }
      let payload = {
        type:type
      }
      suppliers.getNewCoverPromotion(payload).then(res =>{
        console.log('new-modal' , res);
        this.modalData = res.data.items
        this.modalDataLength = res.data.items.length
      }).catch(err =>{
        console.log(err);
      })
    }
  },
  mounted(){
    this.getNewCoverPromotion()
  }
};
</script>

<style lang="scss" scoped>
.slider-holder {
  min-height: 500px;
  width: 100%;
  margin-bottom: 10px;
  position: relative;
  .absolute-data {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translate(-10%, -50%);
    //font-size: 8rem;
    color: $main-color;
    a {
      padding: 10px 40px;
    }
  }

  img {
    height: 500px;
    width: 100%;
  }
}
</style>
