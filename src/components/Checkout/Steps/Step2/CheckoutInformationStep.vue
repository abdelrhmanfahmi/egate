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
                      <p>E-mail: {{ user.user.email }}</p>
                      <p>Phone: {{ user.user.mobile }}</p>
                    </div>
                  </v-col>
                  <v-col cols="2" md="2" sm="2">
                    <div class="change">
                      <p role="button" class="stepDone" @click="updateUserContact">Change</p>
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
                      <p v-if="orderCheckoutObject.sail_point_id != null">Sail Point {{
                        orderCheckoutObject.sail_point_id }}</p>
                      <p v-else>Address {{ orderCheckoutObject.address_book_id }}</p>
                    </div>
                  </v-col>
                  <v-col cols="2" md="2" sm="2">
                    <div class="change">
                      <div v-if="orderCheckoutObject.sail_point_id != null">
                        <p role="button" class="stepDone" @click="changeSailPointAddress">Change</p>
                      </div>
                      <div v-else>
                        <p role="button" class="stepDone" @click="changeAddressBookAddress">Change</p>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>

            </div>

            <div class="controls">
              <v-row class="mt-11">
                <v-col cols="12" md="6" sm="12">
                  <v-btn class="return-btn" @click="changeActiveStep(1)">
                    <v-icon icon="mdi-chevron-left"></v-icon>Return To
                    Information
                  </v-btn>
                </v-col>
                <v-col cols="12" md="6" sm="12" class="text-black">
                  <v-btn class="bg-main text-white" @click="changeActiveStep(3)">Continue To Payment
                    <v-icon icon="mdi-chevron-right"></v-icon></v-btn>
                </v-col>
              </v-row>
            </div>
          </div>

          <v-dialog v-model="dialogAddressBook" width="1000" persistent>
            <v-card class="styleContainer">
              <v-card-item>
                <v-card-title>
                  <p class="text-blue">Update Address Book</p>
                </v-card-title>
              </v-card-item>
              <v-card-text>
                <div class="d-flex mb-3" v-for="(addressBook, idx) in addressBooks" :key="idx">
                  <div>
                    <input type="radio" class="addressBooksRadio" :value="addressBook.id"
                      v-model="orderCheckout.address_book_id" @change="checkIfRadioChecked" />
                  </div>
                  &nbsp;&nbsp;
                  <div>
                    <p>{{ addressBook.address }}</p>
                  </div>
                </div>
                <div class="d-flex w-100">
                  <div class="w-50 d-flex justify-content-center">
                    <button class="btn btn-success w-75" @click="updateAddressBookAddress">Update Address Book</button>
                  </div>
                  <div class="w-50 d-flex justify-content-center">
                    <button class="btn btn-danger w-75" @click="closeDialogAddressBook">Cancel</button>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogSailPoint" width="1000" persistent>
            <v-card class="styleContainer">
              <v-card-item>
                <v-card-title>
                  <p class="text-blue">Update Sail Point</p>
                </v-card-title>
              </v-card-item>
              <v-card-text>
                <div class="d-flex mb-3" v-for="(sailPoint, idx) in sailPoints" :key="idx">
                  <div>
                    <input type="radio" class="sailPointsRadio" :value="sailPoint.id"
                      v-model="orderCheckout.sail_point_id" @change="checkIfRadioChecked" />
                  </div>
                  &nbsp;&nbsp;
                  <div>
                    <p>{{ sailPoint.address }}</p>
                  </div>
                </div>
                <div class="d-flex w-100">
                  <div class="w-50 d-flex justify-content-center">
                    <button class="btn btn-success w-75" @click="updateSailPointAddress">Update Address Book</button>
                  </div>
                  <div class="w-50 d-flex justify-content-center">
                    <button class="btn btn-danger w-75" @click="closeDialogSailPoint">Cancel</button>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-dialog>

        </v-col>
        <v-col cols="12" md="5" lg="5" sm="12" class="myCol bordered-left">
          <CartExistData :cartItems="cartItems" :cartTotalPrice="cartTotalPrice" v-if="cartItems" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import globalAxios from "@/services/global-axios";
import CartExistData from "../../CartExistData.vue";
import globalApis from "@/services/globalApis";
import { useToast } from "vue-toastification";
export default {
  components: {
    CartExistData,
  },
  mounted() {
    if (this.orderCheckoutObject.address_book_id != null) {
      this.getAddressBooks();
    } else {
      this.getSailPoints();
    }
    this.orderCheckout = this.orderCheckoutObject;
  },
  data() {
    return {
      shippingType: null,
      sailPointAddress: null,
      addressBookAddress: null,
      addressBooks: [],
      sailPoints: [],
      dialogAddressBook: false,
      dialogSailPoint: false,
      orderCheckout: {
        address_book_id: null,
        sail_point_id: null,
        payment_type: null,
        coupoun: null,
        fast_charging: null,
        regular_charging: null,
        date_from: null,
        date_to: null
      },
      isChecked: false,
    };
  },
  methods: {
    closeDialogAddressBook() {
      this.dialogAddressBook = false;
    },

    closeDialogSailPoint() {
      this.dialogSailPoint = false;
    },

    changeActiveStep(index) {
      this.$emit("changeSteper", index);
    },

    updateUserContact() {
      console.log('sayed');
    },

    changeSailPointAddress() {
      this.getSailPoints();
      this.dialogSailPoint = true;
    },

    changeAddressBookAddress() {
      this.getAddressBooks();
      this.dialogAddressBook = true;
    },

    async updateAddressBookAddress() {
      if (this.isChecked) {
        const toast = useToast();
        try {
          await this.$store.dispatch('Order/updateOrderCheckoutObject', this.orderCheckout);
          toast.success(`Address Book Of Order Updated Successfully`, {
            position: "top-right",
            transition: "slide",
            hideProgressBar: false,
            showIcon: true,
            timeout: 3000,
            showCloseButton: true,
            swipeClose: true,
          });
          this.dialogAddressBook = false;
        } catch (e) {
          console.log(e);
        }
      }
    },

    async updateSailPointAddress() {
      if (this.isChecked) {
        const toast = useToast();
        try {
          await this.$store.dispatch('Order/updateOrderCheckoutObject', this.orderCheckout);
          toast.success(`Sail Point Of Order Updated Successfully`, {
            position: "top-right",
            transition: "slide",
            hideProgressBar: false,
            showIcon: true,
            timeout: 3000,
            showCloseButton: true,
            swipeClose: true,
          });
          this.dialogSailPoint = false;
        } catch (e) {
          console.log(e);
        }
      }
    },

    checkIfRadioChecked() {
      this.isChecked = true;
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

    async getSailPoints() {
      try {
        const response = await globalApis.getSailPoints();
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
    },
    user() {
      return this.$store.getters['Auth/User'];
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
      console.log(newOrderCheckoutObject);
    },
    user(newUser, oldUser) {
      console.log(newUser);
    }
  },
};
</script>

<style lang="scss" scoped>
p {
  color: #6E6C5A;
}

.styleContainer {
  padding: 1rem;
}

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

.all-data-holder {
  width: 90%;
}

.return-btn {
  background-color: inherit;
}
</style>
