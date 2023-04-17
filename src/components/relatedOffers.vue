<template>
  <div>test</div>
</template>
<script>
import suppliers from "@/services/suppliers";
export default {
  data() {
    return {
      offers: null,
      basket_promotions: null,
      buy_get_promotions: null,
      gift_promotions: null,
    };
  },
  methods: {
    getRelatedOffers() {
      suppliers
        .getRelatedOffers(this.$route.query.id)
        .then((res) => {
          console.log("res offers", res);
          // let Offers = null ;
          this.basket_promotions = res.data.items.basket_promotions
          this.buy_get_promotions = res.data.items.buy_get_promotions
          this.gift_promotions = res.data.items.gift_promotions
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted(){
    this.getRelatedOffers()
  }
};
</script>
