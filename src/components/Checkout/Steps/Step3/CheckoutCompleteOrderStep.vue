<template>
  <div>
    <div class="checkoutStep">
      <v-row>
        <v-col cols="12" md="7" lg="7" sm="12" class="myCol">
          <div class="all-data-holder">
            <div class="addresses">
              <div class="address">
                <v-row>
                  <v-col cols="2" md="2" sm="2">
                    <div class="name">Contact</div>
                  </v-col>
                  <v-col cols="8" md="8" sm="8">
                    <div class="shipp-to">
                      <p>Ahmedsalam2028@Gmail.Com</p>
                    </div>
                  </v-col>
                  <v-col cols="2" md="2" sm="2">
                    <div class="change">
                      <p role="button" class="stepDone">Change</p>
                    </div>
                  </v-col>
                </v-row>
              </div>
              <v-divider class="border-opacity-75 text-gray w-75 m-auto" inset></v-divider>
              <div class="address">
                <v-row>
                  <v-col cols="2" md="2" sm="2">
                    <div class="name">Ship To</div>
                  </v-col>
                  <v-col cols="8" md="8" sm="8">
                    <div class="shipp-to">
                      <p>Al-Khafawy, Shoubra Masr, C, Cairo, 1152, Egypt</p>
                    </div>
                  </v-col>
                  <v-col cols="2" md="2" sm="2">
                    <div class="change">
                      <p role="button" class="stepDone">Change</p>
                    </div>
                  </v-col>
                </v-row>
              </div>
              <v-divider class="border-opacity-75 text-gray w-75 m-auto" inset></v-divider>
              <div class="address">
                <v-row>
                  <v-col cols="2" md="2" sm="2">
                    <div class="name">Method</div>
                  </v-col>
                  <v-col cols="10" md="10" sm="10">
                    <div class="shipp-to">
                      <p>Delivery To My Address</p>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>

            <section class="shipping my-11">
              <h3 class="mb-5">Payment</h3>
              <div class="shipping-methods">
                <div class="shipping-method">
                  <v-row class="aligned-row">
                    <v-col cols="12" sm="12" lg="10" md="10">
                      <v-radio-group hide-details="true" v-model="paymentMethod">
                        <v-radio label="Pay Via (Debit/Credit Cards/Wallets/Installments)" color="orange"
                          value="Pay Via (Debit/Credit Cards/Wallets/Installments)"></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12" sm="12" lg="2" md="2" class="aligned-row">
                      <v-img src="@/assets/images/checkout/payment1.png" width="35"></v-img>
                      <v-img src="@/assets/images/checkout/payment2.png" width="35"></v-img>
                    </v-col>
                  </v-row>
                </div>
              </div>
              <div class="shipping-methods">
                <div class="shipping-method">
                  <v-row class="aligned-row">
                    <v-col cols="12">
                      <v-radio-group hide-details="true" v-model="paymentMethod">
                        <v-radio label="Cash On Delivery (COD)" color="orange" value="Cash On Delivery (COD)"></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </div>
              </div>
              <div class="coupon">
                <form>
                  <div class="form-holder" :class="$i18n.locale">
                    <input type="text" placeholder="Have A Promocode?">
                    <button class="submit-btn">Apply</button>
                  </div>
                </form>
              </div>
            </section>

            <div class="controls">
              <v-row class="mt-11">
                <v-col cols="12" md="6" sm="12">
                  <v-btn class="return-btn" @click="changeActiveStep(2)">
                    <v-icon icon="mdi-chevron-left"></v-icon>Return To Shipping
                  </v-btn>
                </v-col>
                <v-col cols="12" md="6" sm="12" class="text-black">
                  <v-btn class="bg-main text-black" @click="checkout">Complete Order <v-icon
                      icon="mdi-chevron-right"></v-icon></v-btn>
                </v-col>
              </v-row>

            </div>
          </div>
        </v-col>
        <v-col cols="12" md="5" lg="5" sm="12" class="myCol bordered-left">
          <CartExistData />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import CartExistData from "./CartExistData.vue";
export default {
  components: {
    CartExistData,
  },
  methods: {
    changeActiveStep(index) {
      this.$emit("changeSteper", index);
    },
    checkout() {
      // alert("checkout completed");
      this.$router.push('/checkoutConfirmation')
    },
  },
  data() {
    return {
      paymentMethod: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.addresses {
  border: 1px solid $gray;
  border-radius: 5px;

  .address {
    padding: 20px;
  }
}

.shipping-methods {
  border: 1px solid $gray;
  border-radius: 5px;
  margin: 10px 0;

  .shipping-method {
    padding: 10px;
  }
}

.coupon {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 30px 0;
  input{
    background: #fff;
    color: $gray;
    border: 1px solid $gray;
    padding: 14px;
    margin: 0;
    min-width: 300px;
  }
  button{
    background: #143152;
    color: #fff;
    height: 100%;
    padding: 15px;
    margin: 0;
  }
  
}
.en{
  input{
    border-radius: 5px 0 0 5px;
  }
  button{
    border-radius: 0 5px 5px 0;
  }
}
.ar{
  input{
    border-radius: 0 5px 5px 0 ;
  }
  button{
    border-radius: 5px 0 0  5px ;
  }
}
</style>
