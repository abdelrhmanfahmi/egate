<template>
  <div>
    <div class="wrapper">
      <div class="container">
        <div class="text-center my-5 py-5">
          <h1>{{ $t("payment.orderPlaced") }}</h1>
          <h5 v-html="companyIban.description" v-if="companyIban"></h5>
        </div>
        <div class="data-holder p-5" v-if="this.payment_type === 'cach'">
          <ul class="list-data">
            <!-- <li v-if="order_serial">
              {{ $t("payment.orderNumber") }} :
              <span class="bold-result"> {{ order_serial }}</span>
            </li> -->
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

          <h4 class="my-5">
            {{ $t("payment.checkCachResult") }}
          </h4>
        </div>
        <div class="row" v-if="this.payment_type === 'bank'">
          <div class="col-md-6 col-sm-12 my-3">
            <div class="data-holder p-5">
              <ul class="list-data">
                <!-- <li v-if="order_serial">
                  {{ $t("payment.orderNumber") }} :
                  <span class="bold-result"> {{ order_serial }}</span>
                </li> -->
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
            <div
              class="bankInfo"
              v-if="bankInfo"
              v-html="bankInfo.description"
            ></div>
          </div>
          <div class="col-md-6 col-sm-12">
            <form class="bankData mb-5" @submit.prevent="checkoutbankUpload">
              <div class="form-input mb-4">
                <label for="bankImage">
                  {{ $t("payment.uploadImage") }}
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
                  v-for="(error, index) in uploadErrors.file"
                  :key="index"
                >
                  {{ error }}
                </div>
              </div>

              <b-form-textarea
                id="textarea-rows"
                :placeholder="$t('singleProduct.reviewInput')"
                rows="8"
                @input="check"
                v-model="bankData.comment"
                :maxlength="limit"
              ></b-form-textarea>
              <p :class="{ 'text-danger': remaining == 0 }">
                {{ instruction }}
              </p>
              <div class="my-3">
                <b-button
                  type="submit"
                  variant="outline-danger"
                  class="saveBtn btn-block py-3"
                  :disabled="btn1Disabled"
                >
                  <i class="fa fa-upload"></i> {{ $t("payment.uploadImage") }}
                  <span class="loader" v-if="loading"></span>
                </b-button>
              </div>
            </form>
          </div>
        </div>
        <div v-if="this.payment_type === 'wallet'">
          <div class="">
            <div class="data-holder p-5">
              <ul class="list-data">
                <!-- <li v-if="order_serial">
                  {{ $t("payment.orderNumber") }} :
                  <span class="bold-result"> {{ order_serial }}</span>
                </li> -->
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
            <h4 class="my-5">
              {{ $t("payment.checkCachResult") }}
            </h4>
          </div>
        </div>

        <!-- <h4 class="my-5" v-if="payment === 'bank'">
          {{ $t("payment.checkBankResult") }}
        </h4> -->
      </div>
    </div>
  </div>
</template>

<script>
import suppliers from "@/services/suppliers";
import profile from "@/services/profile";
export default {
  data() {
    return {
      order_serial: this.$route.query.order_serial,
      orderDate: this.$route.query.date,
      total_price: parseFloat(this.$route.query.total_price),
      payment_type: this.$route.query.payment_type,
      payment: this.$route.query.payment,
      // redirectURL: this.$route.query.redirectURL,
      orderId: this.$route.query.orderId,

      bankData: {
        image: null,
        comment: "",
        uuid: this.$route.query.uuid,
      },
      uploadErrors: [],
      btn1Disabled: false,
      loading: false,
      id: this.$route.query.id,
      bankInfo: null,
      limit: 300,
      companyIban:null
    };
  },
  mounted() {
    if (this.payment_type === "cach" || this.payment_type === "wallet") {
      setTimeout(() => {
        this.$router.push(`/viewOrderDetails?id=${this.orderId}`);
      }, 8000);
    }
    if (this.payment_type === "bank") {
      // setTimeout(() => {
      //   this.$router.push(`Checkout-bank-details?id=${this.orderId}`);
      // }, 12000);
      // this.getSingleOrders();
    }

    // if(!this.payment || this.payment == null || this.payment == ''){
    //   this.payment = this.payment_type
    // }
    this.getBankComment();
    this.getCompanyIban();
  },
  methods: {
    async checkoutbankUpload() {
      this.loading = true;
      this.btn1Disabled = true;

      // let data = {
      //   image: this.bankData.image,
      //   comment: this.bankData.comment,
      //   uuid: this.bankData.uuid,
      // };

      let formData = new FormData();

      if (this.bankData.image !== null) {
        formData.append("file", this.bankData.image);
      }
      formData.append("comment", this.bankData.comment);
      formData.append("order_uuid", this.bankData.uuid);

      await suppliers
        .bankCheckout(formData)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);
            this.$router.push({
              path: "/viewOrderDetails",
              query: {
                id: res.data.items.order_id,
              },
            });
          }
          console.log(res);
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
    // getSingleOrders() {
    //   profile
    //     .getSingleOrders(this.id)
    //     .then((res) => {
    //       console.log("getSingleOrders", res);
    //       this.bankData.uuid = res.data.items.order.uuid;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })
    //     .finally(() => {
    //       this.loading = false;
    //     });
    // },
    uploadImage(event) {
      this.bankData.image = event.target.files[0];
      console.log(this.bankData.image);
    },
    getBankComment() {
      profile
        .bankComment()
        .then((res) => {
          this.bankInfo = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    check: function () {
      this.bankData.comment = this.bankData.comment.substr(0, this.limit);
    },
    getCompanyIban() {
      profile
        .companyIban()
        .then((res) => {
          console.log(res);
          this.companyIban = res.data.items
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    // instruction: function () {
    //   return this.bankData.comment == ""
    //     ? this.limit
    //     : this.remaining ;
    // },
    instruction: function () {
      return this.bankData.comment == ""
        ? ` ${this.$t("profile.limit")}: ` +
            this.limit +
            ` ${this.$t("profile.char")}  `
        : ` ${this.$t("profile.remain")}: ` +
            this.remaining +
            ` ${this.$t("profile.char")} `;
    },

    remaining: function () {
      return this.limit - this.bankData.comment.length;
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
.bankInfo {
  color: #8f8f8f;
  font-size: 18px;
  line-height: 1.8;
  text-transform: capitalize;
  padding: 0 20px;
  margin: 2% 0;
}
</style>
