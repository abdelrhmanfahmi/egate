<template>
  <div class="product-silder text-center my-2 mt-5 text-center">
    <!-- home page top slider for offers -->
    <b-container v-if="parent_categoryVariantsLength > 0">
      <VueSlickCarousel
        v-bind="settings"
        v-if="parent_categoryVariants && parent_categoryVariantsLength"
        class="my-2"
      >
        <div
          v-for="(slider, index) in parent_categoryVariants"
          :key="index"
          class="text-center"
        >
          <a @click="goVariant(slider)" v-if="slider" :class="{'current-slide slick-current' : slider.id == id}">
            <div>
              <div class="" v-if="slider.image_path !== null">
                <b-img :src="slider.image_path" class="offer-image"> </b-img>
              </div>
            </div>
            <h6 class="text-dark font-weight-bold my-2" v-if="slider.title">
              <span>
                {{ slider.title }}
              </span>
            </h6>
          </a>
        </div>
      </VueSlickCarousel>
    </b-container>
  </div>
</template>

<script>
// progress slider component
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

// import categories from "@/services/categories";
export default {
  props: ["parent_categoryVariants"],
  components: {
    VueSlickCarousel,
  },
  data() {
    return {
      settings: {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: false,
        centerMode: true,
        arrows: true,
        focusOnSelect: true,

        responsive: [
          {
            breakpoint: 1191,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 820,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
        ],
      },
      progress: 90,
      options: {
        color: "$main-color",
        "empty-color": "transparent",
        size: 120,
        thickness: 3,
        "empty-thickness": 3,
        "line-mode": "out 2",
        animation: "rs 700 1000",
        "font-size": "1.5rem",
        "font-color": "white",
      },
      loading: false,
      determinate: false,
      noData: false,
      id: this.$route.params.slug,
    };
  },
  methods: {
    goVariant(slider) {
      this.$router.push(
        {
          path: `/categories/${slider.id}/variants`,
        },
        () => {
          this.$router.go(0);
        }
      );
    },
    currentSlid() {
      if (this.parent_categoryVariants) {
        for (
          let index = 0;
          index < this.parent_categoryVariants.length;
          index++
        ) {
          const element = this.parent_categoryVariants[index];
          console.log(element.id);
        }
      }
    },
  },
  mounted() {
    this.currentSlid();
    /**
     *  setting slider
     */
    if (this.progress === 0) this.nodata = true;
  },
  computed: {
    parent_categoryVariantsLength() {
      return this.parent_categoryVariants
        ? this.parent_categoryVariants.length
        : 0;
    },
  },
};
</script>

<style lang="scss" scoped>
/**
    *  component style
  */
.product-silder {
  padding: 0 75px;
  @media (max-width: 991.98px) {
    padding: 0;
  }
  .info {
    display: flex;
    justify-content: space-between;
    a {
      text-transform: capitalize;
    }
  }
  img {
    border-radius: 50%;
    display: inline-block;
  }
}

html:lang(ar) {
  .product-silder {
    text-align: right;
  }
}
.offer-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  @media (max-width: 767px) {
    width: 70px;
    height: 70px;
  }
}
.current-slide{
  img{
    border: 3px solid $main-color;
  }
}
</style>
