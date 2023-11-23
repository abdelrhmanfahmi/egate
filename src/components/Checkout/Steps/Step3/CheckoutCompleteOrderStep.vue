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
                    <div class="name">Ship To</div>
                  </v-col>
                  <v-col cols="8" md="8" sm="8">
                    <div class="shipp-to">
                      <p v-if="orderCheckoutObject.sail_point_id != null">Sail Point {{
                        sailPointAddress }}</p>
                      <p v-else>Address {{ addressName }}</p>
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

              <v-divider class="border-opacity-75 text-gray w-75 m-auto" inset></v-divider>
              <div class="address">
                <v-row>
                  <v-col cols="2" md="2" sm="2">
                    <div class="name">Method</div>
                  </v-col>
                  <v-col cols="10" md="10" sm="10">
                    <div class="shipp-to" v-if="orderCheckoutObject.address_book_id != null">
                      <p>Delivery To My Address</p>
                    </div>
                    <div class="shipp-to" v-else>
                      <p>Pick Order In Local Point</p>
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
                  <v-btn class="return-btn" @click="changeActiveStep(1)">
                    <v-icon icon="mdi-chevron-left"></v-icon>Return To Shipping
                  </v-btn>
                </v-col>
                <v-col cols="12" md="6" sm="12" class="text-black">
                  <v-btn class="bg-main text-white" @click="checkout">Complete Order <v-icon
                      icon="mdi-chevron-right"></v-icon></v-btn>
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
      this.getAddressName();
    } else {
      this.getSailPoints();
      this.getSailPointName();
    }
    this.orderCheckout = this.orderCheckoutObject;
  },
  data() {
    return {
      isChecked: false,
      paymentMethod: null,
      shippingType: null,
      sailPointAddress: null,
      addressBookAddress: null,
      addressBooks: [],
      sailPoints: [],
      dialogAddressBook: false,
      dialogSailPoint: false,
      addressName: null,
      sailPointAddress: null,
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
    };
  },
  methods: {
    async getAddressName() {
      try {
        const response = await globalAxios.get(`client/address-books?paginate=0&id=${this.orderCheckoutObject.address_book_id}`);
        console.log(response.data.items.data);
        this.addressName = response.data.items.data[0].address;
      } catch (e) {
        console.log(e);
      }
    },

    async getSailPointName() {
      try {
        const response = await globalAxios.get(`client/sail-points?id=${this.orderCheckoutObject.sail_point_id}`);
        this.sailPointAddress = response.data.items.data[0].address;
      } catch (e) {
        console.log(e);
      }
    },

    closeDialogAddressBook() {
      this.dialogAddressBook = false;
    },

    closeDialogSailPoint() {
      this.dialogSailPoint = false;
    },

    changeSailPointAddress() {
      this.getSailPoints();
      this.dialogSailPoint = true;
    },

    changeAddressBookAddress() {
      this.getAddressBooks();
      this.dialogAddressBook = true;
    },

    checkIfRadioChecked() {
      this.isChecked = true;
    },

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

    async getSailPoints() {
      try {
        const response = await globalApis.getSailPoints();
        this.sailPoints = response.data.items.data;
      } catch (e) {
        console.log(e);
      }
    },
    async updateAddressBookAddress() {
      if (this.isChecked) {
        const toast = useToast();
        try {
          await this.$store.dispatch('Order/updateOrderCheckoutObject', this.orderCheckout);
          const response = await globalAxios.get(`client/address-books?paginate=0&id=${this.orderCheckout.address_book_id}`);
          this.addressName = response.data.items.data[0].address;
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
          const response = await globalAxios.get(`client/sail-points?id=${this.orderCheckout.sail_point_id}`);
          this.sailPointAddress = response.data.items.data[0].address;
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

    checkout() {
      // alert("checkout completed");
      this.$router.push('/checkoutConfirmation')
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
.return-btn {
  background-color: inherit;
}

p {
  color: #6E6C5A;
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

.coupon {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 30px 0;

  input {
    background: #fff;
    color: $gray;
    border: 1px solid $gray;
    padding: 14px;
    margin: 0;
    min-width: 300px;
  }

  button {
    background: #143152;
    color: #fff;
    height: 100%;
    padding: 15px;
    margin: 0;
  }

}

.en {
  input {
    border-radius: 5px 0 0 5px;
  }

  button {
    border-radius: 0 5px 5px 0;
  }
}

.ar {
  input {
    border-radius: 0 5px 5px 0;
  }

  button {
    border-radius: 5px 0 0 5px;
  }
}
</style>
