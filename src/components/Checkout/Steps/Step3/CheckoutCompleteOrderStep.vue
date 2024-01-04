<template>
  <div>
    <div class="checkoutStep">
      <v-row>
        <v-col cols="12" md="7" lg="7" sm="12" class="myCol">
          <div class="all-data-holder">
            <div class="addresses">
              <div class="address">
                <v-row>
                  <v-col cols="3" md="3" sm="3">
                    <div class="name">Ship To</div>
                  </v-col>
                  <v-col cols="6" md="6" sm="6">
                    <div class="shipp-to">
                      <p v-if="orderCheckoutObject.sail_point_id != null">Sail Point {{
                        sailPointAddress }}</p>
                      <p v-else>Address {{ addressName }}</p>
                    </div>
                  </v-col>
                  <v-col cols="3" md="3" sm="3">
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
                  <v-col cols="3" md="3" sm="3">
                    <div class="name">Method</div>
                  </v-col>
                  <v-col cols="9" md="9" sm="9">
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
              <div v-for="(payment, idx) in  payments " :key="idx">
                <div class="shipping-methods">
                  <div class="shipping-method">
                    <v-row class="aligned-row">
                      <v-col cols="12" sm="12" lg="10" md="10">
                        <v-radio-group hide-details="true" v-model="orderCheckout.payment_type">
                          <v-radio @change="openDialogCard(payment.id)" :label="payment.name" color="orange" class="checkRadio" :value="payment.id"></v-radio>
                        </v-radio-group>
                      </v-col>
                      <v-col cols="12" sm="12" lg="2" md="2" class="aligned-row justify-content-center"
                        v-if="payment.id == 1">
                        <v-icon icon="mdi-bank-outline" color="orange"></v-icon>
                      </v-col>
                      <v-col cols="12" sm="12" lg="2" md="2" class="aligned-row" v-if="payment.id == 2">
                        <v-img src="@/assets/images/checkout/payment1.png" width="35" class="imgInMobile"></v-img>
                        <v-img src="@/assets/images/checkout/payment2.png" width="35" class="imgInMobile"></v-img>
                      </v-col>
                      <v-col cols="12" sm="12" lg="2" md="2" class="aligned-row justify-content-center"
                        v-if="payment.id == 3">
                        <v-icon icon="mdi-wallet-outline" color="orange"></v-icon>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </div>
              <div class="coupon">
                <form @submit.prevent="ApplyCoupon">
                  <div class="form-holder" :class="$i18n.locale">
                    <input type="text" class="mb-3" placeholder="Have A Promocode?" v-model="orderCheckout.coupoun">
                    <button class="submit-btn" type="submit">Apply</button>
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
                <div class="d-flex mb-3" v-for="( addressBook, idx ) in  addressBooks " :key="idx">
                  <div>
                    <input type="radio" class="addressBooksRadio" :value="addressBook.id"
                      v-model="orderCheckout.address_book_id" @change="checkIfRadioChecked" />
                  </div>
                  &nbsp;&nbsp;
                  <div>
                    <p>{{ addressBook.country_name }}, {{ addressBook.governorate_name }}, {{
                      addressBook.city_name }},
                      {{ addressBook.address }}</p>
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
                <div class="d-flex mb-3" v-for="( sailPoint, idx ) in  sailPoints " :key="idx">
                  <div>
                    <input type="radio" class="sailPointsRadio" :value="sailPoint.id"
                      v-model="orderCheckout.sail_point_id" @change="checkIfRadioChecked" />
                  </div>
                  &nbsp;&nbsp;
                  <div>
                    <p>{{ sailPoint.country_name }}, {{ sailPoint.governorate_name }}, {{ sailPoint.city_name }},
                      {{ sailPoint.address }}</p>
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

          <v-dialog v-model="creditVisaDialog" width="1000" persistent>
            <v-card class="styleContainer">
              <v-card-item>
                <v-card-title>
                  <p class="text-blue mb-3">Fill Information</p>
                </v-card-title>
              </v-card-item>
              <v-card-text>
                <div class="row mb-3">
                  <div class="col-md-12">
                    <label>Card Number</label>
                    <input type="text" v-model="card_number" class="form-control" />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label>CVV</label>
                    <input type="text" v-model="cvv" class="form-control" />
                  </div>
                  <div class="col-md-6">
                    <label>Expiry Date</label>
                    <input type="date" v-model="expiry_date" class="form-control">
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-12 d-flex justify-content-center">
                    <div class="w-50 d-flex justify-content-center">
                      <button class="btn btn-success mb-3 w-75" @click="addDataPaymentCredit">Confirm</button>
                    </div>
                    <div class="w-50 d-flex justify-content-center">
                      <button class="btn btn-danger mb-3 w-75" @click="closeDialogCreditCard">Cancel</button>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-dialog>

          <v-dialog v-model="bankTransferDialog" width="1000" persistent>
            <v-card class="styleContainer">
              <v-card-item>
                <v-card-title>
                  <p class="text-blue mb-3">Uplaod Bank Transfer File</p>
                </v-card-title>
              </v-card-item>
              <v-card-text>
                <div class="row mb-3">
                  <div class="col-md-12">
                    <!-- <input type="file" class="form-control" id="uploadFileTrabsferBank"> -->
                    <v-file-input label="File input" @change="uploadFileBank" variant="filled" prepend-icon="mdi-camera"></v-file-input>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-12 d-flex justify-content-center">
                    <div class="w-50 d-flex justify-content-center">
                      <button class="btn btn-success w-75" @click="addFileBankTransfer">Add File</button>
                    </div>
                    <div class="w-50 d-flex justify-content-center">
                      <button class="btn btn-danger w-75" @click="closeDialogBankTransferImage">Cancel</button>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-dialog>


        </v-col>
        <v-col cols="12" md="5" lg="5" sm="12" class="myCol bordered-left">
          <CartExistData :is_coupon_success="is_coupon_success" :totalPriceAfterCoupon="totalPriceAfterCoupon" :cartItems="cartItems" :cartTotalPrice="cartTotalPrice" v-if="cartItems" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import order from '@/services/order';
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
    this.getPaymentsData();
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
      payments: [],
      dialogAddressBook: false,
      dialogSailPoint: false,
      creditVisaDialog:false,
      bankTransferDialog:false,
      addressName: null,
      totalPriceAfterCoupon:null,
      is_coupon_success:false,
      orderCheckout: {
        address_book_id: null,
        sail_point_id: null,
        payment_type: null,
        coupoun: null,
        shipping_type_id: null,
        delivery_time: null,
        email: null,
        mobile: null,
        bank_transfer_image:null
      },
    };
  },
  methods: {
    closeDialogBankTransferImage(){
      this.bankTransferDialog = false;
      this.orderCheckout.payment_type = null;
    },
    closeDialogCreditCard(){
      this.creditVisaDialog = false;
      this.orderCheckout.payment_type = null;
    },
    openDialogCard(id){
      if(id == 1){
        this.bankTransferDialog = true;
      }else if(id == 2){
        this.creditVisaDialog = true;
      }else{
        console.log('no dialog');
      }
    },
    async getAddressName() {
      try {
        const response = await globalAxios.get(`client/address-books?paginate=0&id=${this.orderCheckoutObject.address_book_id}`, {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.Auth.user.token
          }
        });
        this.addressName = response.data.items.data[0].country_name + ', ' + response.data.items.data[0].governorate_name + ', ' + response.data.items.data[0].city_name + ', ' + response.data.items.data[0].address;;
      } catch (e) {
        console.log(e);
      }
    },

    async getSailPointName() {
      try {
        const response = await globalAxios.get(`client/sail-points?id=${this.orderCheckoutObject.sail_point_id}`, {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.Auth.user.token
          }
        });
        this.sailPointAddress = response.data.items.data[0].country_name + ', ' + response.data.items.data[0].governorate_name + ', ' + response.data.items.data[0].city_name + ', ' + response.data.items.data[0].address;
      } catch (e) {
        console.log(e);
      }
    },

    async getPaymentsData() {
      try {
        const response = await globalAxios.get('payments');
        this.payments = response.data.items;
      } catch (e) {
        console.log(e);
      }
    },

    uploadFileBank(e){
      this.orderCheckout.bank_transfer_image = e.target.files[0];
    },

    async addFileBankTransfer(){
      try{
        const toast = useToast();
        if(this.orderCheckout.bank_transfer_image){
          await this.$store.dispatch('Order/updateOrderCheckoutObject', this.orderCheckout);
          toast.success(`Bank File Added Successfully`, {
            position: "top-right",
            transition: "slide",
            hideProgressBar: false,
            showIcon: true,
            timeout: 3000,
            showCloseButton: true,
            swipeClose: true,
          });
          this.bankTransferDialog = false;
        }else{
          toast.warning(`Please Add File Transfer Bank`, {
            position: "top-right",
            transition: "slide",
            hideProgressBar: false,
            showIcon: true,
            timeout: 3000,
            showCloseButton: true,
            swipeClose: true,
          });
        }
        
      }catch(e){
        console.log(e);
      }
    },

    async addDataPaymentCredit(){
      console.log('added credit data');
      this.creditVisaDialog = false;
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

    async ApplyCoupon(){
      const toast = useToast();
      try{
        const response = await globalAxios.get(`coupons?code=${this.orderCheckout.coupoun}`, {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.Auth.user.token
          }
        });
        if(response.data.message == 'Success'){
          this.is_coupon_success = true;
          this.totalPriceAfterCoupon = this.cartTotalPrice - response.data.items.total_discount;
        }else{
          this.is_coupon_success = false;
          this.totalPriceAfterCoupon = this.cartTotalPrice;
        }
        
        toast.success('Coupon Code Accepted', {
          position: "top-right",
          transition: "slide",
          hideProgressBar: false,
          showIcon: true,
          timeout: 3000,
          showCloseButton: true,
          swipeClose: true,
        });
        
      }catch(e){
        toast.error(e.response.data.message, {
          position: "top-right",
          transition: "slide",
          hideProgressBar: false,
          showIcon: true,
          timeout: 3000,
          showCloseButton: true,
          swipeClose: true,
        });
      }
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
        const response = await globalAxios.get('client/sail-points', {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.Auth.user.token
          }
        });
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
          this.addressName = response.data.items.data[0].country_name + ', ' + response.data.items.data[0].governorate_name + ', ' + response.data.items.data[0].city_name + ', ' + response.data.items.data[0].address;
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
          this.sailPointAddress = response.data.items.data[0].country_name + ', ' + response.data.items.data[0].governorate_name + ', ' + response.data.items.data[0].city_name + ', ' + response.data.items.data[0].address;
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

    async checkout() {
      const toast = useToast();
      try {
        await this.$store.dispatch('Order/updateOrderCheckoutObject', this.orderCheckout);      
        const response = await globalAxios.post('client/orders',this.orderCheckoutObject , {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + this.$store.state.Auth.user.token
          }
        });
        if (response.data.code == 200) {
          toast.success(`Order Stored Successfully`, {
            position: "top-right",
            transition: "slide",
            hideProgressBar: false,
            showIcon: true,
            timeout: 3000,
            showCloseButton: true,
            swipeClose: true,
          });
        }
        this.$router.push('/checkoutConfirmation');
      } catch (e) {
        console.log(e);
      }
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
@media only screen and (max-width: 480px){
  .imgInMobile{
    width:40px;
    height:40px;
  }
  .coupon{
    justify-content: flex-start;
  }
  .coupon button{
    width: 100%;
  }
}

@media only screen and (width: 320px) {
  .coupon input{
    width: 307px;
  }
  .coupon button{
    width: 100%;
  }
}

@media only screen and (width: 360px) {
  .coupon input{
    width: 294px;
    min-width: 0px;
  }
  .coupon button{
    width: 100%;
  }
}

@media only screen and (width: 375px) {
  .coupon input{
    width: 307px;
  }
  .coupon button{
    width: 100%;
  }
}

@media only screen and (width: 390px) {
  .coupon input{
    width: 320px;
  }
  .coupon button{
    width: 100%;
  }
}

@media only screen and (width: 412px) {
  .coupon input{
    width: 340px;
  }
  .coupon button{
    width: 100%;
  }
}

@media only screen and (width: 414px) {
  .coupon input{
    width: 342px;
  }
  .coupon button{
    width: 100%;
  }
}

@media only screen and (width: 430px) {
  .coupon input{
    width: 357px;
  }
  .coupon button{
    width: 100%;
  }
}

@media only screen and (width: 540px) {
  .imgInMobile{
    width:40px;
    height:40px;
  }
}

@media only screen and (width: 768px) {
  .coupon input{
    width: 319px;
  }
  .coupon button{
    width: 100%;
  }
}

@media only screen and (width: 820px) {
  .coupon input{
    width: 340px;
  }
  .coupon button{
    width: 100%;
  }
}

@media only screen and (width: 912px) {
  .coupon input{
    width: 382px;
  }
  .coupon button{
    width: 100%;
  }
}

@media only screen and (width: 1024){
  .aligned-row{
    justify-content: flex-end;
  }
}

@media only screen and (min-width: 767px) and (max-width: 1100px) {
  .imgInMobile{
    width:40px;
    height:40px;
  }
}
</style>
