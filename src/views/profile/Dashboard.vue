<template>
  <!-- dashboard page  -->
  <div class="dashboard">
    <div class="wrapper">
      <div v-if="dashData">
        <!-- <div class="large-screen col-md-3 col-sm-12 mb-2">
          <router-link to="/profile/ordersListsB2b" class="link">
            <div class="bordered">
              <h5 class="title main-color">
                <span><font-awesome-icon icon="fa-solid fa-cart-shopping" /></span>
                <span class="mx-2">{{ $t("profile.shoppingCart") }}</span>
              </h5>
              <div class="info pt-3">
                <div
                  class="p-0"
                  
                >
                  <p class="number text-dark">{{ cartLength }} Products</p>
                </div>
                <div class="p-0">
                  <span class="main-color h5">!!</span>
                  <span class="mx-1 h5">pending orders</span>
                  <div class="action my-3 mb-0">
                    <div class="row align-c">
                      <div class="col-md-4 col-sm-12">
                        <h4>1</h4>
                      </div>
                      <div class="col-md-8 col-sm-12">
                        <router-link to="/cart" class="main-color">
                          <h5><ins>{{ $t('cart.purchaseCart') }}</ins></h5>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div> -->
        <div class="filter mb-5">
          <div class="row justify-content-between align-items-center">
            <div class="col-md-8 col-sm-12">
              <div class="title">
                <h2>{{ $t("profile.dashboard") }}</h2>
              </div>
            </div>
            <div class="col-md-4 col-sm-12">
              <div class="filter-holder">
                <div class="row align-items-center">
                  <div class="col-md-3 col-sm-12">
                    <h5>Period :</h5>
                  </div>
                  <div class="col-md-9 col-sm-12">
                    <b-form-select v-model="selectedOption">
                      <b-form-select-option selected disabled value="null"
                        ><span>{{
                          $t("payment.selectExist")
                        }}</span></b-form-select-option
                      >
                      <b-form-select-option value="a">Option A</b-form-select-option>
                      <b-form-select-option value="b">Option B </b-form-select-option>
                    </b-form-select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-content-start align-items-center">
          <div class="large-screen col-md-4 col-sm-12 mb-2">
            <router-link to="/profile/QuotationsB2b" class="link">
              <div class="bordered">
                <h5 class="title main-color">
                  <span><font-awesome-icon icon="fa-solid fa-list-ol" /></span>
                  <span class="mx-2">{{ $t("profile.quotations") }}</span>
                </h5>
                <!-- <span class="icon">
                  <font-awesome-icon icon="fa-solid fa-list-ol" class="fa-2x" />
                </span> -->

                <div class="info pt-3">
                  <div class="p-0">
                    <p class="number">{{ dashData.total_completed_qoutes }}</p>
                    <!-- <h5 class="text">{{ $t("profile.quotations") }}</h5> -->
                  </div>
                  <div class="p-0">
                    <p class="h5">
                      <span class="main-color">!!</span>
                      <span>Responses</span>
                    </p>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="">
                      <h5>2</h5>
                    </div>
                    <div class="">
                      <router-link to="/profile/QuotationsB2b" class="main-color">
                        <h6>
                          <ins>{{ $t("profile.quotations") }}</ins>
                        </h6>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <div class="large-screen col-md-4 col-sm-12 mb-2">
            <router-link to="/profile/ReturnRequests" class="link">
              <div class="bordered">
                <!-- <h5 class="title">{{ $t("profile.totalRefunds") }}</h5> -->
                <!-- <span class="icon">
                  <font-awesome-icon
                    icon="fa-solid fa-arrow-rotate-left"
                    class="fa-2x"
                  />
                </span> -->
                <h5 class="title main-color">
                  <span><font-awesome-icon icon="fa-solid fa-rotate-left" /></span>
                  <span class="mx-2">{{ $t("profile.totalRefunds") }}</span>
                </h5>

                <div class="info pt-3">
                  <div class="p-0">
                    <p class="number">{{ dashData.total_completed_refund }}</p>
                    <!-- <h5 class="text">{{ $t("profile.returnRequests") }}</h5> -->
                  </div>
                  <div class="p-0">
                    <p class="h5">
                      <span class="main-color">!!</span>
                      <span>Pending Returns</span>
                    </p>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="">
                      <h5>2</h5>
                    </div>
                    <div class="">
                      <router-link to="/profile/ReturnRequests" class="main-color">
                        <h6>
                          <ins>{{ $t("profile.returnRequests") }}</ins>
                        </h6>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <div class="large-screen col-md-4 col-sm-12 mb-2">
            <router-link to="/profile/StandingOrders" class="link">
              <div class="bordered">
                <h5 class="title main-color">
                  <span><font-awesome-icon icon="fa-solid fa-cart-shopping" /></span>
                  <span class="mx-2">{{ $t("profile.totalOrders") }}</span>
                </h5>
                <div class="info pt-3">
                  <div class="p-0">
                    <span class="number text-dark h5">{{
                      dashData.total_completed_orders
                    }}</span>
                    <!-- <span class="text text-dark mx-2 h5">{{ $t("profile.orders") }}</span> -->
                  </div>
                  <div class="p-0">
                    <!-- <small class="number">{{
                      dashData.total_completed_orders_money | fixedCurrency
                    }}</small> -->
                    <p class="h5">
                      <span class="main-color">!!</span>
                      <span>pending standing orders</span>
                    </p>
                    <!-- <h5 class="text">{{ $t("profile.pending") }}</h5> -->
                    <!-- <h5 class="text mt-2">{{ currency }}</h5> -->
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="">
                      <h5>2</h5>
                    </div>
                    <div class="">
                      <router-link to="/profile/StandingOrders" class="main-color">
                        <h6>
                          <ins>{{ $t("profile.b2bFav") }}</ins>
                        </h6>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="large-screen my-5">
          <!-- <router-link to="/profile/wallet" class="link"> -->
          <div class="bordered">
            <h5 class="title main-color">
              <span><font-awesome-icon icon="fa-solid fa-wallet" /></span>
              <span class="mx-2">{{ $t("profile.wallet") }}</span>
            </h5>
            <!-- <span class="icon">
                <font-awesome-icon icon="fa-solid fa-wallet" class="fa-2x" />
              </span> -->

            <div class="info pt-3">
              <div class="p-0">
                <p class="number">{{ dashData.wallet | fixedCurrency }} {{ currency }}</p>
                <button v-b-modal.charge class="bg-main py-2 px-4">
                  {{ $t("profile.charge") }}
                </button>
              </div>
            </div>
          </div>
          <!-- </router-link> -->
        </div>
      </div>
      <div class="holder text-center mt-5" v-if="orders">
        <table class="table table-striped table-hover table-bordered selectable">
          <thead>
            <tr>
              <th scope="col" v-for="(tab, index) in fields" :key="index">
                {{ tab.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orders" :key="index">
              <td>{{ order.serial }}</td>
              <td>{{ order.created_at | formatDate }}</td>
              <td>{{ order.order_supplier_items_count }}</td>
              <td>
                <span v-if="order.total_price" class="main-color"
                  ><b>{{ order.total_price | fixedCurrency }} {{ currency }}</b></span
                >
                <span v-else>-</span>
              </td>
              <td>
                <span
                  :class="{
                    'text-success':
                      order.payment_status_lang == 'Paid' ||
                      order.payment_status_lang == 'تم الدفع',
                  }"
                  >{{ order.payment_status_lang }}</span
                >
              </td>
              <td>{{ order.payment }}</td>

              <td>
                <router-link
                  :to="{
                    path: '/viewOrderDetails',
                    query: { id: `${order.id}` },
                  }"
                  class="text-dark"
                >
                  <b-button variant="outline-light main-color border-main" class="m-2">
                    <font-awesome-icon icon="fa-regular fa-eye" />
                  </b-button>
                </router-link>
                <router-link
                  v-if="
                    order.payment_status === 'Unpaid' && order.payment_type === 'bank'
                  "
                  :to="{
                    path: '/checkout-details',
                    query: {
                      order_serial: order.serial,
                      date: order.created_at,
                      total_price: order.total_price,
                      payment_type: order.payment_type,
                      payment: order.payment,
                      uuid: order.uuid,
                    },
                  }"
                  class="text-dark"
                >
                  <b-button variant="outline-success" class="m-2">
                    {{ $t("profile.bankTransDocs") }}
                  </b-button>
                </router-link>
                <b-button
                  id="show-btn"
                  @click="
                    $bvModal.show('bv-modal-example');
                    saveUUID(order);
                  "
                  variant="outline-success"
                  class="m-2"
                  v-if="
                    order.payment_status === 'Unpaid' && order.payment_type === 'visa'
                  "
                >
                  {{ $t("profile.pay") }}
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-center d-flex justify-content-start align-items-center mt-5">
          <!-- Pagination  -->
          <Paginate
            v-if="fields"
            :total-pages="totalPages"
            :per-page="totalPages"
            :current-page="page"
            @pagechanged="onPageChange"
          />
        </div>
        <div>
          <b-modal centered id="bv-modal-example" hide-footer>
            <template #modal-title>
              <h3>{{ $t("payment.paymentData") }}</h3>
            </template>
            <div class="d-block text-center">
              <div class="payment-method">
                <div class="methods-data">
                  <div class="methods">
                    <div class="method">
                      <div class="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          id="paymentMethod1"
                          name="paymentMethod"
                          class="custom-control-input"
                          v-model="paymentFormData.payment_type"
                          value="bank"
                        />
                        <label class="custom-control-label" for="paymentMethod1">
                          {{ $t("payment.bankTransfer") }}
                        </label>
                        <span>{{ $t("payment.paymentByBank") }}</span>
                      </div>
                    </div>
                    <div class="method">
                      <div class="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          id="paymentMethod2"
                          name="paymentMethod"
                          class="custom-control-input"
                          v-model="paymentFormData.payment_type"
                          value="cach"
                        />
                        <label class="custom-control-label" for="paymentMethod2">
                          {{ $t("payment.paymentWhenReceiving") }}
                        </label>
                        <span>{{ $t("payment.requestReceipt") }}</span>
                      </div>
                    </div>
                    <div
                      class="method d-flex justify-content-between align-content-center"
                    >
                      <div class="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          id="paymentMethod3"
                          name="paymentMethod"
                          class="custom-control-input"
                          v-model="paymentFormData.payment_type"
                          value="visa"
                        />
                        <label class="custom-control-label" for="paymentMethod3">
                          {{ $t("payment.onlinePayment") }}
                        </label>
                        <div class="online-media">
                          <img src="@/assets/images/cart.png" alt="" srcset="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="error text-center"
                    v-for="(error, index) in errors.payment_type"
                    :key="index"
                  >
                    {{ error }}
                  </div>
                </div>
              </div>
            </div>

            <b-button
              :disabled="paymentFormData.payment_type == null"
              id="show-btn"
              class="mt-3"
              variant="outline-success"
              block
              @click="rePay"
            >
              {{ $t("profile.pay") }}
            </b-button>
          </b-modal>
        </div>
      </div>
      <div class="spinner d-flex justify-content-center align-items-center" v-else>
        <spinner />
      </div>
    </div>
    <div class="deposit-modal">
      <!-- withdraw modal  -->
      <b-modal ref="charge" id="charge" hide-footer centered>
        <template #modal-header="{ close }">
          <h5>{{ $t("profile.charge") }}</h5>
          <!-- Emulate built in modal header close button action -->
          <b-button size="sm" variant="outline-danger" @click="close()"> x </b-button>
        </template>
        <div class="d-block" v-if="!chargeClicked">
          <div class="">
            <!-- charge wallet  -->
            <form @submit.prevent="chargeWallet" class="">
              <div class="">
                <div class="">
                  <div class="input-holder">
                    <b-form-input
                      type="number"
                      v-model="chargeValue"
                      min="0"
                      :placeholder="$t('profile.enterValue')"
                    ></b-form-input>
                    <span class="currency">{{ currency }}</span>
                  </div>
                  <div
                    class="error text-center"
                    v-for="(error, index) in errors.value"
                    :key="index"
                  >
                    {{ error }}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="row justify-content-around align-items-center" v-if="!chargeClicked">
          <b-button class="mt-3 m-0" variant="outline-danger" @click="hideChargeModal">{{
            $t("cart.cancel")
          }}</b-button>

          <b-button
            class="border-main main-color bg-transparent m-0 mt-3"
            @click="chargeWallet"
            :disabled="!chargeValue || chargeValue == 0"
          >
            <b>{{ $t("profile.charge") }}</b>
          </b-button>
        </div>
        <span
          v-if="chargeClicked"
          class="text-center d-flex justify-content-center align-items-center"
        >
          <div>
            <b-spinner label="Spinning" variant="red" large></b-spinner>
          </div>
        </span>
      </b-modal>
    </div>
  </div>
</template>

<script>
/**
 *  dashboard page
 * @displayName  dashboard page
 */
import profile from "@/services/profile";
import spinner from "@/components/spinner.vue";
import Paginate from "@/components/global/Paginate.vue";
export default {
  components: {
    spinner,
    Paginate,
  },
  data() {
    return {
      dashData: null,
      fields: [
        {
          key: "id",
          label: this.$t("profile.serial"),
        },
        {
          key: "date",
          label: this.$t("profile.date"),
        },
        {
          key: "no-of-products",
          label: this.$t("profile.productsNumber"),
        },
        {
          key: "amount",
          label: this.$t("profile.amount"),
        },
        {
          key: "paymentStatus",
          label: this.$t("profile.paymentStatus"),
        },
        {
          key: "buy-method",
          label: this.$t("profile.buyMethod"),
        },
        {
          key: "Actions",
          label: this.$t("profile.Actions"),
        },
      ],
      items: [
        {
          nameDescription: "مشتريات الشهر",
          products: 2,
          finalActivity: "07/24/2021",
        },
      ],
      orders: null,
      perPage: 5,
      total: 0,
      currentPage: 1,

      page: 1,
      totalPages: 0,
      totalRecords: 0,
      recordsPerPage: 10,
      enterpageno: "",

      paymentFormData: {
        payment_type: null,
        order_uuid: null,
      },
      errors: [],
      selectedOption: null,
      chargeValue: null,
      chargeClicked: false,
    };
  },
  methods: {
    hideChargeModal() {
      this.$refs["charge"].hide();
    },
    /**
     * charge Wallet function
     * @vuese
     */
    chargeWallet() {
      this.chargeClicked = true;
      const backUrl = `${this.mainDoamin}profile/CheckWalletCharge`;
      // const backUrl = `${this.mainDoamin}profile/Wallet`
      let payload = {
        value: this.chargeValue,
        redirect_url: backUrl,
      };
      profile
        .chargeMyWallet(payload)
        .then((res) => {
          this.sucessMsg(res.data.message);
          console.log(res);
          if (res.status == 200) {
            window.location.href = res.data.items.url;
            this.chargeClicked = false;
          }
        })
        .catch((err) => {
          let errors = Object.values(err)[2].data;
          this.errors = errors.items;
          this.errMsg(err.message);
          console.log(err);
          this.chargeClicked = false;
        });
    },
    /**
     * get Dashboard Data function
     * @vuese
     */
    getDashboardData() {
      profile
        .getDashboardData()
        .then((res) => {
          console.log(res);
          this.dashData = res.data.items;
          this.orders = res.data.items.orders;

          this.total = res.data.items.orders.meta.total;
          this.totalPages = Math.ceil(
            res.data.items.orders.meta.total / res.data.items.orders.meta.per_page
          ); // Calculate total records

          this.totalRecords = res.data.items.orders.meta.total;
        })
        .catch((err) => {
          let error = Object.values(err)[2].data;
          this.errors = error.items;
          this.errMsg(error.message);
        });
    },
    /**
     * rePay function
     * @vuese
     */
    rePay() {
      profile
        .rePay(this.paymentFormData)
        .then((res) => {
          console.log(res);
          this.sucessMsg(res.data.message);
          if (res.status == 200) {
            if (this.paymentFormData.payment_type === "cach") {
              this.$router.push("/success-checkout");
            } else if (this.paymentFormData.payment_type === "bank") {
              this.$router.push({
                path: "/checkout-details",
                query: {
                  order_serial: res.data.items.order.order_serial,
                  date: res.data.items.order.created_at,
                  total_price: res.data.items.order.total_price,
                  payment_type: res.data.items.order.payment_type,
                  payment: res.data.items.order.payment,
                  uuid: res.data.items.order.uuid,
                  redirectURL: res.data.items.url,
                },
              });
            } else if (this.paymentFormData.payment_type === "visa") {
              setTimeout(() => {
                window.location.href = res.data.items.payment_url;
              }, 500);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          let error = Object.values(err)[2].data;
          this.errors = error.items;
          this.errMsg(error.message);
        });
    },
    /**
     * function for pagination
     * @vuese
     */
    onPageChange(page) {
      this.page = page;
      this.getDashboardData();
    },
    /**
     * function for pagination
     * @vuese
     */
    onChangeRecordsPerPage() {
      this.getDashboardData();
    },
    /**
     * function for pagination
     * @vuese
     */
    gotoPage() {
      if (!isNaN(parseInt(this.enterpageno))) {
        this.page = parseInt(this.enterpageno);
        this.getDashboardData();
      }
    },
  },
  mounted() {
    this.getDashboardData();
  },
  computed: {
    cartLength() {
      return this.$store.state.cart.cartLength;
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  .bordered {
    background: #ffffff;
    box-shadow: 0px 1.67091px 8.35456px rgba(0, 0, 0, 0.25);
    border-radius: 6.68365px;
    padding: 30px 20px;
    //position: relative;

    //.icon {
    //position: absolute;
    //top: 5px;
    //right: 5px;
    //}

    .info {
      //padding: 20px;

      //display: flex;
      //justify-content: center;
      //align-items: center;

      //@media (min-width: 1200px) and (max-width: 1800px) {
      // display: block;
      //display: flex;
      ///justify-content: center;
      //align-items: center;
      //flex-direction: row;

      //.border-right {
      //border: none !important;
      //}
      //}
    }

    .number {
      font-weight: bold;
      font-size: 25px;
    }

    .text {
      text-transform: uppercase;
    }
  }

  .link {
    color: #565656 !important;
  }

  @media (min-width: 1200px) {
    .title {
      word-break: break-all;
    }
  }
}

@media screen and (max-width: 767px) {
  table {
    //text-align: center;

    tbody {
      tr {
        margin: 30px 0;
      }
    }
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    position: absolute;
    width: 1px;
    padding: 0;
  }

  table td {
    display: block;
    font-size: 0.8rem;
    border-top: none !important;
  }

  .table-striped tbody tr:nth-of-type(odd) {
    margin: 30px 0;
    display: block;
  }

  .actions {
    justify-content: center;
    align-items: center;
  }
}

.payment-method {
  .methods-data {
    background: #ecf0f1;
    padding: 2rem;
    border-radius: 0.5rem;
    text-align: left;

    .info {
      border-bottom: 1px dashed #c5c6c6;
      //padding: 1rem 0.3rem;
      color: #312620;
      font-weight: bold;
    }

    .total {
      padding: 1rem 0;
      color: #312620;
      font-weight: bold;

      .title {
        font-size: 14pt;
      }
    }

    .methods {
      background-color: #fff;
      border-radius: 0.5rem;
      border: 1px dashed #cfd0d0;

      .method {
        padding: 1rem;
        border-bottom: 1px dashed #cfd0d0;
        font-size: 11pt;
        color: #544842;

        .custom-radio {
          flex-wrap: wrap;
        }

        label {
          cursor: pointer;
        }

        span {
          width: 100%;
          font-size: 10pt;
          margin-top: -0.2rem;
          opacity: 0.7;
        }

        .online-media {
          img {
            object-fit: contain;
          }
        }
      }
    }
  }
}

.modal-header {
  align-content: center !important;
  justify-content: center !important;
}

@media (max-width: 991.98px) {
  .large-screen {
    max-width: 100%;
  }
}
@media (min-width: 992px) and(max-width:1199px) {
  .large-screen {
    max-width: 50%;
  }
}
@media (min-width: 1200px) and (max-width: 1399.99px) {
  .large-screen {
    max-width: 50%;
  }
}

@media (min-width: 1400px) and (max-width: 1699.98px) {
  .large-screen {
    max-width: 33%;
  }
}
@media (min-width: 1700px) {
  .large-screen {
    max-width: 25%;
  }
}

.input-holder {
  position: relative;
  .currency {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    bottom: 0;
    font-size: 16px;
  }
}
.tab-title {
  font-weight: bold;
  font-size: 22px;
}
</style>
