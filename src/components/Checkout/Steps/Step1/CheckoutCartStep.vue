<template>
  <div class="checkoutStep">
    <v-row>

      <!-- address book  -->
      <v-col cols="12" md="7" lg="7" sm="12" class="myCol styleCardHere" v-if="isAuthenticated">
        <CardAddressBookComponent :addressBooks="addressBooks" :countries="countries" :sailPoints="sailPoints" />

        <v-row class="mt-11">
          <v-col cols="12" md="6" sm="12">
            <v-btn to="/cart" class="return-btn"><v-icon icon="mdi-chevron-left"></v-icon>Return To Cart</v-btn>
          </v-col>
          <v-col cols="12" md="6" sm="12" class="text-black">
            <v-btn class="bg-main text-white" id="checkoutBtn" style="pointer-events: none;"
              @click="changeActiveStep(2)">Continue To Checkout
              <v-icon icon="mdi-chevron-right"></v-icon></v-btn>
          </v-col>
        </v-row>

      </v-col>

      <v-col v-else>
        <CardAddressBookGuestComponent />
      </v-col>

      <!-- cart section -->
      <v-col cols="12" md="5" lg="5" sm="12" class="myCol bordered-left">
        <CartExistData :cartItems="cartItems" :cartTotalPrice="cartTotalPrice" v-if="cartItems" />
        <EmptyCart v-else />
      </v-col>

    </v-row>
  </div>
</template>

<script>
import globalAxios from "@/services/global-axios";
import globalApis from "@/services/globalApis";
import CartExistData from "../../CartExistData.vue";
import { Form, Field, ErrorMessage } from 'vee-validate';
import EmptyCart from "@/components/shared/Checkout/EmptyCart.vue";
import CardAddressBookComponent from './CardAddressBookComponent.vue';
import CardAddressBookGuestComponent from './CardAddressBookGuestComponent.vue';
export default {
  components: {
    CartExistData,
    Field,
    Form,
    ErrorMessage,
    EmptyCart,
    CardAddressBookComponent,
    CardAddressBookGuestComponent
  },
  mounted() {
    this.getCountriesData();
    if (this.isAuthenticated) {
      this.getAddressBooks();
      this.getSailPointsData();
    }
  },
  data() {
    return {
      countries: [],
      addressBooks: [],
      sailPoints: [],
      cartItems: [],
      cartTotalPrice: 0
    };
  },
  methods: {
    changeActiveStep(index) {
      this.$emit("changeSteper", index);
    },
    async getAddressBooks() {
      try {
        const response = await globalAxios.get('client/address-books', {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.Auth.user.token
          }
        });
        this.addressBooks = response.data.items.data;
      } catch (e) {
        console.log(e);
      }
    },

    async getCountriesData() {
      try {
        const response = await globalApis.getCountries();
        this.countries = response.data.items;
      } catch (e) {
        console.log(e);
      }
    },

    async getSailPointsData() {
      try {
        const response = await globalAxios.get('client/sail-points', {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.Auth.user.token
          }
        });
        this.sailPoints = response.data.items.data;
      } catch (e) {
        console.log(e);
      }
    }
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
    },
    isAuthenticated: function () {
      return this.$store.getters['Auth/isAuthenticated'];
    },
    orderCheckoutObject: function () {
      return this.$store.getters['Order/orderCheckoutObject'];
    }
  },
  watch: {
    count(newCount, oldCount) {
      console.log(`We have ${newCount} fruits now, yay!`)
    },
    cartItems(newCartItems, oldCartItems) {
      // console.log(newCartItems);
    },
    cartTotalPrice(newCartTotalPrice, oldCartTotalPrice) {
      // console.log(newCartTotalPrice);
    },
    orderCheckoutObject(newOrderCheckoutObject, oldOrderCheckoutObject) {
      // console.log(newOrderCheckoutObject);
    }
  },
};
</script>

<style lang="scss" scoped>
.styleCardHere {
  position: relative;
  bottom: 14px;
}

.styleCardAddress {
  background: inherit;
}

.styleCardAddress p {
  color: #000;
}

.styleContainer {
  padding: 3rem;
}

.styleSelects {
  padding: 1rem;
  border: 1px solid #999;
  background: inherit;
}

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
