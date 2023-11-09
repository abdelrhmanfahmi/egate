<template>
  <div class="checkoutStep">
    <v-row>
      <v-col cols="12" md="7" lg="7" sm="12" class="myCol">
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <h4>Contact Information</h4>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <p>
              Already Have An Account?
              <span role="button" class="login-btn">Log In</span>
            </p>
          </v-col>
        </v-row>
        <div class="form-holder">
          <form action="">
            <v-text-field v-model="form.email" label="E-mail" required class="email-form"></v-text-field>
            <v-checkbox v-model="form.emailOffers" label="Email me with news and offers" required
              color="orange"></v-checkbox>
            <div class="shipping-address-data">
              <h4 class="my-5">Shipping Address</h4>
              <v-row>
                <v-col cols="12" lg="4" md="4" sm="12"><v-select label="Country" :items="[
                  'California',
                  'Colorado',
                  'Florida',
                  'Georgia',
                  'Texas',
                  'Wyoming',
                ]" v-model="form.country"></v-select></v-col>
                <v-col cols="12" lg="4" md="4" sm="12"><v-select label="City" :items="[
                  'California',
                  'Colorado',
                  'Florida',
                  'Georgia',
                  'Texas',
                  'Wyoming',
                ]" v-model="form.city"></v-select></v-col>
                <v-col cols="12" lg="4" md="4" sm="12"><v-select label="Area" :items="[
                  'California',
                  'Colorado',
                  'Florida',
                  'Georgia',
                  'Texas',
                  'Wyoming',
                ]" v-model="form.area" disabled></v-select></v-col>
                <v-col cols="12" lg="4" md="4" sm="12">
                  <v-text-field label="Street" hide-details="true" v-model="form.street"></v-text-field>
                </v-col>
                <v-col cols="12" lg="4" md="4" sm="12">
                  <v-text-field label="Building" hide-details="true" v-model="form.building"></v-text-field>
                </v-col>
                <v-col cols="12" lg="4" md="4" sm="12">
                  <v-text-field label="Apartment" hide-details="true" v-model="form.apartment"></v-text-field>
                </v-col>
                <v-col cols="12" lg="4" md="4" sm="12">
                  <v-text-field label="Landmark" hide-details="true" v-model="form.landmark"></v-text-field>
                </v-col>
                <v-col cols="12" lg="8" md="8" sm="12">
                  <v-text-field label="Notes" hide-details="true" v-model="form.notes"></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="6" sm="12">
                  <v-text-field label="Full Name" hide-details="true" v-model="form.fullName"></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="6" sm="12">
                  <v-text-field label="Phone Number" hide-details="true" v-model="form.phone"></v-text-field>
                </v-col>
              </v-row>
              <v-checkbox v-model="form.nextTime" label="Save this information for next time" required color="orange"
                hide-details="true"></v-checkbox>
              <v-checkbox v-model="form.textOffers" label="Text me with news and offers" required color="orange"
                hide-details="true"></v-checkbox>
            </div>
          </form>
          <v-row class="mt-11">
            <v-col cols="12" md="6" sm="12">
              <v-btn to="/cart" class="return-btn">
                <v-icon icon="mdi-chevron-left"></v-icon>Return To Cart
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" sm="12" class="text-black">
              <v-btn class="bg-main text-white" @click="changeActiveStep(2)">Continue To Checkout <v-icon
                  icon="mdi-chevron-right"></v-icon></v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" md="5" lg="5" sm="12" class="myCol bordered-left">
        <CartExistData :cartItems="cartItems" :cartTotalPrice="cartTotalPrice" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CartExistData from "./CartExistData.vue";
export default {
  components: {
    CartExistData,
  },
  data() {
    return {
      form: {
        email: null,
        emailOffers: false,
        country: null,
        city: null,
        area: null,
        street: null,
        building: null,
        apartment: null,
        landmark: null,
        notes: null,
        fullName: null,
        phone: null,
        nextTime: false,
        textOffers: false,
      },
      cartItems: [],
      cartTotalPrice: 0
    };
  },
  methods: {
    changeActiveStep(index) {
      this.$emit("changeSteper", index);
    },
  },
  computed: {
    count() {
      try {
        return this.$store.getters['cart/cartItemCount'];
      } catch (e) {
        console.log(e);
      }

    },
    cartItems() {
      try {
        return this.$store.getters['cart/cartItems'];
      } catch (e) {
        console.log(e);
      }
    },
    cartTotalPrice() {
      try {
        return this.$store.getters['cart/cartTotalPrice'];
      } catch (e) {
        console.log(e);
      }
    }
  },
  watch: {
    count(newCount, oldCount) {
      console.log(`We have ${newCount} fruits now, yay!`)
    },
    cartItems(newCartItems, oldCartItems) {
      console.log(newCartItems);
    },
    cartTotalPrice(newCartTotalPrice, oldCartTotalPrice) {
      console.log(newCartTotalPrice);
    }
  },
};
</script>

<style lang="scss" scoped>
.return-btn {
  background-color: inherit;
}

.mdi-chevron-left::before {
  color: #003399;
}

.mdi-chevron-right::before i {
  color: #fff;
}

p {
  color: #6E6C5A;
}

.login-btn {
  color: #3399FF;
}

.form-holder {
  margin: 20px 0;

  .email-form {
    width: 70%;
  }

  .v-col-lg-4 {
    padding-bottom: 0;
  }

  .v-text-field .v-input__details {
    display: none;
  }

  .v-checkbox {
    height: 40px;
  }
}
</style>
