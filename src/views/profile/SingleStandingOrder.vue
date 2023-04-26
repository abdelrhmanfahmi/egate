<template>
  <!-- standing order page  -->
  <div>
    <div class="order profile">
      <StandingOrder
        :orders="orders"
        :ordersLength="ordersLength"
        @removeItem="removeStandingOrder"
      />
    </div>
  </div>
</template>

<script>
// standing order page
import profile from "@/services/profile";

import StandingOrder from "@/components/global/singleStandingOrder.vue";
export default {
  data() {
    return {
      id: this.$route.query.id,
      orders: null,
      ordersLength: null,
    };
  },
  methods: {
    /**
     * @vuese
     * this function used to get Single Standing Order
     */
    getSingleStandingOrder() {
      profile
        .getSingleStandingOrder(this.id)
        .then((res) => {
          console.log(res);
          this.orders = res.data.items.items;
          this.ordersLength = res.data.items.items.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * @vuese
     * this function used to get remove Standing Order
     */
    removeStandingOrder() {
      this.getSingleStandingOrder();
    },
  },
  mounted() {
    this.getSingleStandingOrder();
  },
  components: {
    StandingOrder,
  },
};
</script>

<style></style>
