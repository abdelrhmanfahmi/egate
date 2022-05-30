<template>
  <div>
    <div class="wrapper">
      <div class="container">
        <div class="text-center my-5 py-5">
          <h1>{{ $t("payment.orderPlaced") }}</h1>
        </div>
        <div class="data-holder p-5">
          <ul class="list-data">
            <li v-if="order_serial">
              {{ $t("payment.orderNumber") }} :
              <span class="bold-result"> {{ order_serial }}</span>
            </li>
            <li v-if="orderDate">
              {{ $t("payment.orderDate") }} :
              <span class="bold-result">{{ orderDate | formatDate }}</span>
            </li>
            <li v-if="total_price">
              {{ $t("payment.total") }} :
              <span class="totalbuy"
                >{{ total_price | fixedCurrency }} {{ currency }}</span
              >
            </li>
            <li v-if="payment_type">
              {{ $t("payment.paymentMethod") }} :
              <span class="bold-result">{{ payment_type }}</span>
            </li>
          </ul>
        </div>
        <h4 class="my-5" v-if="payment_type === 'cach'">
          {{ $t("payment.checkCachResult") }}
        </h4>
        <h4 class="my-5" v-if="payment_type === 'bank'">
          {{ $t("payment.checkBankResult") }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order_serial: this.$route.query.order_serial,
      orderDate: this.$route.query.date,
      total_price: parseFloat(this.$route.query.total_price),
      payment_type: this.$route.query.payment_type,
      // redirectURL: this.$route.query.redirectURL,
      orderId: this.$route.query.orderId,
      test: "",
    };
  },
  mounted() {
    if (this.payment_type === "cach") {
      setTimeout(() => {
        this.$router.push(`/viewOrderDetails?id=${this.orderId}`);
      }, 12000);
    }
    if (this.payment_type === "bank") {
      setTimeout(() => {
        this.$router.push(`Checkout-bank-details?id=${this.orderId}`);
      }, 12000);
    }
  },
};
</script>

<style lang="scss" scoped>
.data-holder {
  .list-data {
    list-style-type: disc;
    font-size: 20px;
    color: #8f8f8f;
    line-height: 2.4;
  }
  .bold-result {
    color: #646464;
    font-weight: bold;
    font-size: 25px !important;
  }
  .totalbuy {
    color: #000;
    font-weight: bold;
    font-size: 25px;
  }
}
</style>
