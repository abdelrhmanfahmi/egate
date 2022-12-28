<template>
  <!-- Checkout-bank-details page -->
  <div>
    <div class="wrapper">
      <div class="container">
        <div class="text-center my-5 py-5">
          <h1>{{ $t("payment.orderPlaced") }}</h1>
        </div>
        <div class="row">
          <div class="col-md-6 col-sm-12 my-3">
            <div class="data-holder p-5">
              <ul class="list-data">
                <li v-if="orderDate">
                  {{ $t("payment.orderDate") }} :
                  <span class="bold-result">{{ orderDate | formatDate }}</span>
                </li>
                <li v-if="total_price">
                  {{ $t("payment.total") }} :
                  <span class="totalbuy"
                    >{{ total_price | fixedCurrency }} {{ currency }}</span
                  >
                </li>
                <li v-if="payment">
                  {{ $t("payment.paymentMethod") }} :
                  <span class="bold-result">{{ payment }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <form class="bankData mb-5" @submit.prevent="checkoutbankUpload">
              <div class="form-input mb-4">
                <label for="CommercialLicense">
                  {{ $t("profile.commercialLicense") }}
                  <span class="text-danger">*</span>
                </label>
                <b-form-group>
                  <b-form-file
                    size="lg"
                    id="bankImage"
                    @change="uploadImage"
                    :placeholder="$t('profile.filePlaceHolder')"
                    drop-placeholder="Drop file here..."
                  ></b-form-file>
                </b-form-group>
                <div
                  class="error text-start"
                  v-for="(error, index) in uploadErrors.image"
                  :key="index"
                >
                  {{ error }}
                </div>
              </div>

              <b-form-textarea
                id="textarea-rows"
                placeholder="Tall textarea"
                rows="8"
                v-model="bankData.comment"
              ></b-form-textarea>
              <b-button
                type="submit"
                variant="outline-danger"
                class="saveBtn btn-block py-3"
                :disabled="btn1Disabled"
              >
                <i class="fa fa-upload"></i> {{ $t("profile.save") }}
                <span class="loader" v-if="loading"></span>
              </b-button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Checkout-bank-details page
import suppliers from "@/services/suppliers";
import profile from "@/services/profile";
export default {
  data() {
    return {
      order_serial: this.$route.query.order_serial,
      orderDate: this.$route.query.date,
      total_price: parseFloat(this.$route.query.total_price),
      payment: this.$route.query.payment,
      // redirectURL: this.$route.query.redirectURL,
      orderId: this.$route.query.orderId,
      uuid: this.$route.query.uuid,

      bankData: {
        image: null,
        comment: null,
        uuid: null,
      },
      uploadErrors: [],
      btn1Disabled: false,
      loading: false,
      id: this.$route.query.id,
    };
  },
  mounted() {
    this.getSingleOrders();
  },
  methods: {
    /**
     * @vuese
     * checkout bank Upload function
     */
    async checkoutbankUpload() {
      this.loading = true;
      this.btn1Disabled = true;

      let formData = new FormData();

      if (this.bankData.image !== null) {
        formData.append("image", this.bankData.image);
      }
      formData.append("comment", this.bankData.comment);
      formData.append("uuid", this.uuid);

      await suppliers
        .bankCheckout(formData)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);
          }
          
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.uploadErrors = err.items;
          this.errMsg(err.message);
        })
        .finally(() => {
          this.loading = false;
          this.btn1Disabled = false;
        });
    },
    /**
     * @vuese
     * get Single Orders function
     */
    getSingleOrders() {
      profile
        .getSingleOrders(this.id)
        .then((res) => {
          console.log("getSingleOrders", res);
          this.bankData.uuid = res.data.items.order.uuid;
          this.$store.dispatch("cart/getCartProducts");
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * @vuese
     * upload Image function
     */
    uploadImage(event) {
      this.bankData.image = event.target.files[0];
    },
  },
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
