<template>
  <div>
    <div class="wrapper">
      <div class="text-center my-5 py-5">
        <h1>{{$t('payment.orderPlaced')}}</h1>
      </div>
      <div class="container">
        <div class="data-holder p-5">
          <ul class="list-data">
            <!-- <li>
              {{ $t("payment.orderNumber") }} :
              <span class="bold-result"> {{order_serial}}</span>
            </li> -->
            <li>
              {{ $t("payment.orderDate") }} :
              <span class="bold-result">{{orderDate | formatDate}}</span>
            </li>
            <li>
              {{ $t("payment.total") }} :
              <span class="totalbuy">{{total_price | fixedCurrency}} {{currency}}</span>
            </li>
            <li>
              {{ $t("payment.paymentMethod") }} :
              <span class="bold-result">{{payment}}</span>
            </li>
          </ul>
          <h4 class="my-5">
            {{ $t("payment.loadingParagraph") }}
          </h4>
        </div>
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
      payment: this.$route.query.payment,
      redirectURL: this.$route.query.redirectURL,
    };
  },
  mounted(){
    setTimeout(() => {
      window.location.href = this.redirectURL
    }, 8000);
  }
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
