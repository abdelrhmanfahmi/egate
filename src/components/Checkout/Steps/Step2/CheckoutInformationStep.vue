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
                    <div class="shipp-to"><p>Ahmedsalam2028@Gmail.Com</p></div>
                  </v-col>
                  <v-col cols="2" md="2" sm="2">
                    <div class="change">
                      <p role="button" class="stepDone">Change</p>
                    </div>
                  </v-col>
                </v-row>
              </div>
              <v-divider
                class="border-opacity-75 text-gray w-75 m-auto"
                inset
              ></v-divider>
              <div class="address">
                <v-row>
                  <v-col cols="2" md="2" sm="2">
                    <div class="name">Ship To</div>
                  </v-col>
                  <v-col cols="8" md="8" sm="8">
                    <div class="shipp-to"><p>Al-Khafawy, Shoubra Masr, C, Cairo, 1152, Egypt</p></div>
                  </v-col>
                  <v-col cols="2" md="2" sm="2">
                    <div class="change">
                      <p role="button" class="stepDone">Change</p>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>

            <section class="shipping my-11">
              <h3 class="mb-5">Shipping Method</h3>
              <div class="shipping-methods">
                <div class="shipping-method">
                  <v-row class="aligned-row">
                    <v-col cols="12" sm="12" lg="9" md="9">
                      <v-radio-group hide-details="true" v-model="shippingType">
                        <v-radio
                          label="Delivery To My Address"
                          color="orange"
                          value="Delivery To My Address"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12" sm="12" lg="3" md="3">
                      <p>50 Egp</p>
                    </v-col>
                  </v-row>
                </div>
              </div>
              <div class="shipping-methods">
                <div class="shipping-method">
                  <v-row class="aligned-row">
                    <v-col cols="12">
                      <v-radio-group hide-details="true" v-model="shippingType">
                        <v-radio
                          label="Local Pick Up"
                          color="orange"
                          value="Local Pick Up"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </section>

            <div class="controls">
              <v-row class="mt-11">
                <v-col cols="12" md="6" sm="12">
                  <v-btn class="return-btn" @click="changeActiveStep(1)">
                    <v-icon icon="mdi-chevron-left"></v-icon>Return To
                    Information
                  </v-btn>
                </v-col>
                <v-col cols="12" md="6" sm="12" class="text-black">
                  <v-btn class="bg-main text-black" @click="changeActiveStep(3)"
                    >Continue To Payment
                    <v-icon icon="mdi-chevron-right"></v-icon
                  ></v-btn>
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
  },
  data() {
    return {
      shippingType: null,
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
.all-data-holder{
    width: 90%;
}
</style>
