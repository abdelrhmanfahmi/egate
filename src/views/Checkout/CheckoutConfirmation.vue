<template>
  <div>
    <v-app  class="page-wrapper">
      <v-main>
        <v-container>
          <v-row>
            <v-col cols="12" lg="5" md="5" sm="12" class="text-center">
              <section class="relative-section">
                <div class="happyIcon1">
                  <v-img src="@/assets/images/checkout/happiness.svg" width="50"></v-img>
                </div>
                <div class="happyIcon2">
                  <v-img src="@/assets/images/checkout/happiness.svg" width="50"></v-img>
                </div>
                <div class="congrats-words">
                  <h2 class="text-gray-thin">
                    Thank you for shopping on E-Gate!
                  </h2>
                  <p class="text-gray">
                    Your Order Has Been Placed Successfully
                  </p>
                </div>
              </section>
              <section>
                <div class="buttons">
                  <v-row class="aligned-row">
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <v-btn to="/" class="conf-btn">TRACK ORDER</v-btn>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <v-btn to="/" class="conf-btn">CONTINUE EXPLORING</v-btn>
                    </v-col>
                  </v-row>
                </div>
              </section>
            </v-col>
            <v-col cols="1"></v-col>
            <v-col cols="12" lg="6" md="6" sm="12">
              <div class="confirmation-data">
                <h2>
                  <span
                    ><v-icon
                      icon="mdi-check-circle-outline"
                      color="success"
                    ></v-icon
                  ></span>
                  <span>Confirmation #KY2MF10R8</span>
                </h2>
              </div>
              <div class="order-data">
                <div class="order-confirmation">
                  <h4>Your Order Is Confirmed</h4>
                  <p class="text-gray-thin">
                    You’ll Receive A Confirmation Email With Your Order Number
                    Shortly.
                  </p>
                </div>
              </div>
              <div class="order-data">
                <div class="order-updates">
                  <h4>Order Updates</h4>
                  <p class="text-gray-thin">
                    You’ll Get Shipping And Delivery Updates By Email.
                  </p>
                </div>
              </div>
              <div class="order-data">
                <div class="order-customer-information">
                  <div>
                    <h4>Customer Information</h4>
                    <p class="text-gray-thin">
                      You’ll Get Shipping And Delivery Updates By Email.
                    </p>
                  </div>
                  <div>
                    <h4>Contact Information</h4>
                    <p class="text-gray-thin">Ahmedsalam2028@Gmail.Com</p>
                  </div>
                  <div>
                    <h4>Shipping Address</h4>
                    <p class="text-gray-thin">
                      Al-Khafawy, Shoubra Masr, Cairo, Egypt, ‎0112 903 0928
                    </p>
                  </div>
                  <div>
                    <h4>Shipping Method</h4>
                    <p class="text-gray-thin">Delivery To My Address</p>
                  </div>
                  <div>
                    <h4>Payment Method</h4>
                    <p class="text-gray-thin">
                      Cash On Delivery (COD) - Le 50.00
                    </p>
                  </div>
                  <div>
                    <h4>Total Payments</h4>
                    <p class="text-gray-thin">1150</p>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.page-wrapper {
  background: #faf9f5;
}
section {
  padding: 100px 0;
}
.conf-btn {
  border: 2px solid $main-color;
  padding: 20px 50px;
  min-width: 40%;
  color: $main-color;
  background: transparent;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  display: flex;

}
.confirmation-data {
  padding: 40px 10px;
}
.order-data {
  background: #fff;
  padding: 15px 25px;
  border-radius: 10px;
  border: 1px solid #a3a3a1;
  margin: 20px 0;
}
.relative-section{
  position: relative;
  .happyIcon1{
    position: absolute;
    top: 35px;
    right: 0;
    z-index: -1;
  }
  .happyIcon2{
    position: absolute;
    bottom: 35px;
    left: 0;
    transform: rotate(-45deg);
    z-index: -1;
  }
}
</style>
