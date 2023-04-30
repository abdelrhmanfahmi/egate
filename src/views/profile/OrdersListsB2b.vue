<template>
  <div :class="$i18n.locale">
    <div class="row">
      <div class="col-md-8 col-sm-12">

        <h5 class="profileB2b-header-table">
          {{ $t("profile.ordersLists") }} ({{ total }})
        </h5>
      </div>
      <div class="col-md-4 col-sm-12">
        <div class="input-holder">
          <form @submit.prevent="searchOrder">
            <span class="remove-search" role="button" v-if="OrderSearchText" @click="OrderSearchText = null">x</span>
            <!-- coupon input  -->

            <input type="number" min="0" :placeholder="`${$t('cart.search')} ${$t('supplier.by')} ${$t('profile.serial')}`"
              class="my-2 h-100 p-3 w-100 itemInput" v-model="OrderSearchText" />
            <b-button type="submit" class="login-button my-2 py-3 px-4 w-auto">
              <!-- <span>{{ $t("cart.couponDiscount") }}</span> -->
              <span>{{ $t("cart.search") }}</span>
            </b-button>
          </form>
        </div>
      </div>
    </div>
    <!-- if there's orders  -->
    <div class="holder text-center" v-if="orders">
      <div class="mb-3 d-flex justify-content-end" v-if="checkedOrder && checkedOrder.length > 0">
        <b-button variant="outline-success" class="mx-2" @click="exportSelectedOrders">
          {{ $t("singleProduct.exportSelectedOrders") }}
          <font-awesome-icon icon="fa-solid fa-arrow-up" />
        </b-button>
      </div>

      <!-- orders data table  -->
      <table class="table table-striped table-hover table-bordered selectable">
        <thead>
          <tr>
            <th scope="col" v-for="(tab, index) in fields" :key="index">
              <div class="d-flex justify-content-around align-items-center">
                <!-- <span v-if="tab.label === $t('profile.serial')">
                  <input
                    type="checkbox"
                    class="myproject--checkbox"
                    v-model="checkAll"
                  />
                </span> -->
                <span>{{ tab.label }}</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="index">
            <td>
              <div class="d-flex justify-content-around align-items-center">
                <input type="checkbox" class="myproject--checkbox" :value="order.id" v-model="checkedOrder" />
                <span>{{ order.id }}</span>
              </div>
            </td>
            <td>{{ order.created_at | formatDate }}</td>
            <td>{{ order.order_supplier_items_count }}</td>
            <td>
              <span v-if="order.total_price" class="main-color"><b>{{ order.total_price | fixedCurrency }} {{ currency
              }}</b></span>
              <span v-else>-</span>
            </td>
            <td>
              <span :class="{
                'text-success':
                  order.payment_status_lang == 'Paid' ||
                  order.payment_status_lang == 'تم الدفع',
              }">{{ order.payment_status_lang }}</span>
            </td>
            <td>
              <span>{{ order.payment }}</span>
              <span class="d-block" v-if="
                order.payment_type === 'visa' ||
                order.payment_charge_id ||
                order.payment_type === 'wallet_visa' ||
                order.payment_type === 'wallet'
              ">
                TID : {{ order.payment_charge_id }}
              </span>
            </td>

            <td>
              <router-link :to="{
                path: '/viewOrderDetails',
                query: { id: `${order.id}` },
              }" class="text-dark">
                <b-button variant="outline-light main-color border-main" class="m-2">
                  <font-awesome-icon icon="fa-regular fa-eye" />
                </b-button>
              </router-link>
              <router-link v-if="order.payment_status === 'Unpaid' && order.payment_type === 'bank'" :to="{
                path: '/checkout-details',
                query: {
                  order_serial: order.serial,
                  date: order.created_at,
                  total_price: order.total_price,
                  payment_type: order.payment_type,
                  payment: order.payment,
                  uuid: order.uuid,
                },
              }" class="text-dark">
                <b-button variant="outline-success" class="m-2">
                  {{ $t("profile.bankTransDocs") }}
                </b-button>
              </router-link>
              <b-button id="show-btn" @click="
                $bvModal.show('bv-modal-example');
              saveUUID(order);
                                                                " variant="outline-success" class="m-2"
                v-if="order.payment_status === 'Unpaid' && order.payment_type === 'visa'">
                {{ $t("profile.pay") }}
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-start align-items-center mt-5">
        <!-- pagination for orders  -->
        <Paginate v-if="orders" :total-pages="totalPages" :per-page="totalPages" :current-page="page"
          @pagechanged="onPageChange" />
      </div>
      <div>
        <!-- repay modal  -->
        <b-modal centered id="bv-modal-example" hide-footer>
          <template class="text-center" #modal-title>
            <h3>{{ $t("payment.paymentData") }}</h3>
          </template>
          <div class="d-block text-center">
            <div class="payment-method">
              <div class="methods-data">
                <div class="methods">
                  <div class="method">
                    <div class="custom-control custom-radio custom-control-inline">
                      <input type="radio" id="paymentMethod1" name="paymentMethod" class="custom-control-input"
                        v-model="paymentFormData.payment_type" value="bank" />
                      <label class="custom-control-label" for="paymentMethod1">
                        {{ $t("payment.bankTransfer") }}
                      </label>
                      <span>{{ $t("payment.paymentByBank") }}</span>
                    </div>
                  </div>
                  <div class="method">
                    <div class="custom-control custom-radio custom-control-inline">
                      <input type="radio" id="paymentMethod2" name="paymentMethod" class="custom-control-input"
                        v-model="paymentFormData.payment_type" value="cach" />
                      <label class="custom-control-label" for="paymentMethod2">
                        {{ $t("payment.paymentWhenReceiving") }}
                      </label>
                      <span>{{ $t("payment.requestReceipt") }}</span>
                    </div>
                  </div>
                  <div class="method d-flex justify-content-between align-content-center">
                    <div class="custom-control custom-radio custom-control-inline">
                      <input type="radio" id="paymentMethod3" name="paymentMethod" class="custom-control-input"
                        v-model="paymentFormData.payment_type" value="visa" />
                      <label class="custom-control-label" for="paymentMethod3">
                        {{ $t("payment.onlinePayment") }}
                      </label>
                      <div class="online-media">
                        <img src="@/assets/images/cart.png" alt="" srcset="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="error text-center" v-for="(error, index) in errors.payment_type" :key="index">
                  {{ error }}
                </div>
              </div>
            </div>
          </div>

          <b-button :disabled="paymentFormData.payment_type == null" v-if="!repayClicked" id="show-btn" class="mt-3"
            variant="outline-success" block @click="rePay">
            {{ $t("profile.pay") }}
          </b-button>
          <b-button v-if="repayClicked" disabled id="show-btn" class="mt-3" variant="outline-success" block>
            <span>{{ $t("profile.pay") }}</span>
            <span>
              <b-spinner label="Spinning" small></b-spinner>
            </span>
          </b-button>
        </b-modal>
      </div>
    </div>
    <!-- if loading when getting data  -->
    <div class="spinner d-flex justify-content-center align-items-center" v-else>
      <spinner />
    </div>
  </div>
</template>

<script>
/**
 * orders list b2b page
 * @displayName orders list b2b page
 */

import profile from "@/services/profile";
import spinner from "@/components/spinner.vue";
import Paginate from "@/components/global/Paginate.vue";
import axios from "axios";
export default {
  data() {
    return {
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
      checkedOrder: [],
      repayClicked: false,
      OrderSearchText: null
    };
  },
  methods: {
    /**
     * get Orders function
     * @vuese
     */
    getOrders() {
      profile
        .getOrders(this.page)
        .then((resp) => {
          this.orders = resp.data.items.orders.data;

          this.total = resp.data.items.orders.meta.total;
          this.totalPages = Math.ceil(
            resp.data.items.orders.meta.total / resp.data.items.orders.meta.per_page
          ); // Calculate total records

          this.totalRecords = resp.data.items.orders.meta.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * function for pagination
     * @vuese
     */
    onPageChange(page) {
      this.page = page;
      this.getOrders(this.page);
    },
    /**
     * function for pagination
     * @vuese
     */
    onChangeRecordsPerPage() {
      this.getOrders(this.page);
    },
    /**
     * function for pagination
     * @vuese
     */
    gotoPage() {
      if (!isNaN(parseInt(this.enterpageno))) {
        this.page = parseInt(this.enterpageno);
        this.getOrders(this.page);
      }
    },

    /**
     * repay function
     * @vuese
     */

    rePay() {
      this.repayClicked = true;
      profile
        .rePay(this.paymentFormData)
        .then((res) => {
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
        })
        .finally(() => {
          this.repayClicked = false;
        });
    },

    /**
     * save product UUID for repay function
     * @vuese
     */

    saveUUID(order) {
      console.log(order);
      this.paymentFormData.order_uuid = order.uuid;
    },

    /**
     * @vuese
     * export Selected Orders to recive it as excel or pdf
     */

    exportSelectedOrders() {
      let payload = {
        ids: this.checkedOrder,
      };
      profile
        .exportSelectedOrders(payload)
        .then((res) => {
          console.log(res);
          this.sucessMsg(res.data.message);

          // setting data comes from api response

          let url = res.data.items.url;
          let extension = res.data.items.url.split(".").pop();
          let label = "Orders-File";

          this.downloadFile(url, extension, label);
          this.checkedOrder = [];
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
    downloadFile(url, extension, label) {
      axios({
        url: url, // File URL Goes Here
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", `${label}.${extension}`);
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },
    searchOrder() {
      this.addressLoading = true;
      let payload = {
        id: this.OrderSearchText,
      };
      profile
        .searchOrder(this.page, payload)
        .then((resp) => {
          this.orders = resp.data.items.orders.data;

          this.total = resp.data.items.orders.meta.total;
          this.totalPages = Math.ceil(
            resp.data.items.orders.meta.total / resp.data.items.orders.meta.per_page
          ); // Calculate total records

          this.totalRecords = resp.data.items.orders.meta.total;
        })
        .finally(() => {
          // this.OrderSearchText = "";
          this.addressLoading = false;
        });
    },

  },
  mounted() {
    this.getOrders(this.page);
  },
  components: {
    spinner,
    Paginate,
  },
  computed: {
    checkAll: {
      get: function () {
        return this.orders ? this.checkedOrder.length == this.orders.length : false;
      },
      set: function (value) {
        var checkedOrder = [];
        if (value) {
          this.orders.forEach(function (order) {
            checkedOrder.push(order.id);
          });
        }
        this.checkedOrder = checkedOrder;
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.payment-method {
  .methods-data {
    background: #ecf0f1;
    padding: 2rem;
    border-radius: 0.5rem;
    text-align: left;

    .info {
      border-bottom: 1px dashed #c5c6c6;
      padding: 1rem 0.3rem;
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

@media screen and (max-width: 767px) {
  table {
    text-align: center;

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

.input-holder {
  position: relative;

  button {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 5px;
  }
}

.remove-search {
  position: absolute;
}

.en {
  .input-holder {
    button {
      right: 0;
      left: auto;
    }

    .remove-search {
      right: auto;
      left: 0;
      left: -17px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 22px;

    }
  }
}

.ar {
  .input-holder {
    button {
      left: 0;
      right: auto;
    }

    .remove-search {

      left: auto;
      right: 17px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 22px;

    }
  }
}

/* checkbox */
</style>
