<template>
  <div class="product-silder">
    <!-- if no data  -->
    <div class="bestDeals" v-if="slidersLength > 0">
      <span class="product-info">
        <h4 class="top-header">{{ $t("home.monthlyOffers") }}</h4>
      </span>
      <div class="" v-if="deadline">
        <Countdown :deadline="deadline"></Countdown>
      </div>

      <div class="container mb-1">
        <div class="d-flex justify-content-end">
          <router-link to="/monthly-offers" class="showAllLink">
            {{ $t('home.showAll') }}
          </router-link>
        </div>
      </div>
      <VueSlickCarousel v-bind="settings" class="my-5">
        <div v-for="(slider, index) in sliders" :key="index">
          <ProductCard :slider="slider" />
        </div>
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import Countdown from "vuejs-countdown";
import ProductCard from "@/components/global/ProductCard";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import globalAxios from "@/services/global-axios";
import auth from "@/services/auth";
export default {
  components: {
    ProductCard,
    VueSlickCarousel,
    Countdown,
  },
  data() {
    return {
      settings: {
        dots: true,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,

        responsive: [
          {
            breakpoint: 1191,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              arrows: true,
            },
          },
          {
            breakpoint: 820,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              arrows: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: true,
              dots: true,
            },
          },
        ],
      },
      suppliers: null,
      loading: false,
      sliders: null,
      deadline: null,
    };
  },
  methods: {
    /**
     * @vuese
     *  get Suppliers
     */
    getSuppliers() {
      this.loading = true;
      return globalAxios
        .get(`suppliers`)
        .then((resp) => {
          this.suppliers = resp.data.items.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * @vuese
     *  get home deadline counter
     */
    getHomeDeadline() {
      auth
        .getHomeDeadline()
        .then((res) => {
          // console.log("slide data", res);
          this.sliders = res.data.items.deals.data;
          this.deadline = res.data.items.timer_date;

          // this.deadline = new Date(res.data.items.timer_date)

          // console.log("timer" , res.data.items.timer_date);
          // console.log("this.deadline" , moment(new Date(res.data.items.timer_date)).format(
          //   "YYYY-MM-DD HH:mm:ss"
          // ));
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getSuppliers();
  },
  mounted() {
    this.getHomeDeadline();
  },
  computed: {
    /**
     *  check if slider has data
     */
    slidersLength() {
      return this.sliders ? this.sliders.length : 0;
    },
  },
};
</script>

<style lang="scss" scoped>
/**
      *  component style
    */
.product-silder {
  background-color: #f9f8f5;
  text-align: center;
  padding: 20px 5px;

  .product-info {
    padding-bottom: 20px;

    small {
      color: $main-color;
      font-size: 12px;
      text-transform: uppercase;
    }
  }

  .img-suplier {
    opacity: 1;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    display: block;
    text-align: center;

    &:hover {
      opacity: 0.75;
    }
  }
}

.slick-current {
  img {
    opacity: 1;
  }
}

.supplier-image {
  width: 100px;
  // height: 150px;
  // border-radius: 50%;
  transition: all 0.3s ease-in-out;
  opacity: 1;

  &:hover {
    opacity: 0.5;
  }
}
</style>
