<template>
  <div>
    <div
      class="most-sold text-center related-products"
      v-if="buy_get_promotionsLength  || basket_promotionsLength  || gift_promotionsLength "
    >
      <div class="">
        <div class="" >
          <!-- other products slider  -->
          <NewRelatedOffersTab
            :basket_promotions="basket_promotions"
            :buy_get_promotions="buy_get_promotions"
            :gift_promotions="gift_promotions"

            :basket_promotionsLength="basket_promotionsLength"
            :buy_get_promotionsLength="buy_get_promotionsLength"
            :gift_promotionsLength="gift_promotionsLength"
          ></NewRelatedOffersTab>
        </div>
      </div>
    </div>
    <div class="" v-else>
      <h3>{{ $t('home.noDataTill') }}</h3>
    </div>
  </div>
</template>
<script>
import suppliers from "@/services/suppliers";
import NewRelatedOffersTab from "@/components/pages/relatedOffers/NewRelatedOffersTab.vue";


export default {
  data() {
    return {
      AllOffers: [],
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
      basket_promotionsLength:null,
      buy_get_promotionsLength:null,
      gift_promotionsLength:null,
    };
  },
  methods: {
    getRelatedOffers() {
      suppliers
        .getRelatedOffers(this.$route.query.id)
        .then((res) => {
          // let Offers = null ;
          this.basket_promotions = res.data.items.basket_promotions;
          this.buy_get_promotions = res.data.items.buy_get_promotions;
          this.gift_promotions = res.data.items.gift_promotions;

          //lengths
          this.basket_promotionsLength = res.data.items.basket_promotions.length;
          this.buy_get_promotionsLength = res.data.items.buy_get_promotions.length;
          this.gift_promotionsLength = res.data.items.gift_promotions.length;
          if (res.data.items.basket_promotions.length) {
            this.AllOffers.push(res.data.items.basket_promotions);
          }
          if (res.data.items.buy_get_promotions.length) {
            this.AllOffers.push(res.data.items.buy_get_promotions);
          }
          if (res.data.items.gift_promotions.length) {
            this.AllOffers.push(res.data.items.gift_promotions);
          }
        })
        // .catch((err) => {
        //   console.log(err);
        // });
    },
  },
  mounted() {
    this.getRelatedOffers();
  },
  components: {
    NewRelatedOffersTab,
  },
};
</script>
