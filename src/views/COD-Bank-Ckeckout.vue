<template>
    <!-- complete checkout page  -->
    <div>
      <div class="container">
        <!-- fi order completed successfully  -->
        <div class="card success">
          <div
            style="
              border-radius: 200px;
              height: 200px;
              width: 200px;
              background: #f8faf5;
              margin: 0 auto;
            "
          >
            <i class="checkmark">✓</i>
          </div>
          <h1>
            {{ $t("payment.congrats") }}
          </h1>
          <p>
            {{ $t("payment.waitPurchace1") }}
            <br />
            {{ $t("payment.waitPurchace2") }}
          </p>
          <router-link
            :to="{ path: '/viewOrderDetails', query: { id: orderId } }"
          >
            <b-button variant="outline-success mt-4">
              {{ $t("payment.orderTrack") }}
            </b-button>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    data(){
      return {
        orderId:this.$route.query.orderId
      }
    }
  }
  </script>   
  <style lang="scss" scoped>
  .container {
    text-align: center;
    padding: 40px 0;
    min-height: 500px;
  }
  h1 {
    color: #88b04b;
    font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
    font-weight: 900;
    font-size: 40px;
    margin-bottom: 10px;
  }
  p {
    color: #404f5e;
    font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
    font-size: 20px;
    margin: 0;
  }
  i {
    color: #9abc66;
    font-size: 100px;
    line-height: 200px;
    margin-left: -15px;
  }
  .card {
    background: white;
    padding: 60px;
    border-radius: 4px;
    box-shadow: 0 2px 3px #c8d0d8;
    display: inline-block;
    margin: 0 auto;
  }
  .success {
    h1 {
      color: #88b04b;
      font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
    }
    i {
      color: #9abc66;
    }
  }
  .fail {
    h1 {
      color: $main-color;
      font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
    }
    i {
      color: $main-color;
    }
  }
  </style>
  