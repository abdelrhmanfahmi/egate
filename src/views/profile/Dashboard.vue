<template>
  <!-- dashboard page  -->
  <div class="dashboard text-center">
    <div class="wrapper">
      <div class="row justify-content-center align-items-center" v-if="dashData">
        <div class="large-screen col-lg-6 col-md-12 col-sm-12 mb-2">
          <router-link to="/profile/ordersListsB2b" class="link">
            <div class="bordered">
              <h5 class="title">{{ $t("profile.ordersLists") }}</h5>
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-money-bill-1" class="fa-2x" />
              </span>

              <div class="info">
                <div class="p-3" :class="{
                  'border-right': $i18n.locale == 'en',
                  'border-left': $i18n.locale == 'ar',
                }">
                  <p class="number">{{ dashData.total_completed_orders }}</p>
                  <h5 class="text">{{ $t("profile.orders") }}</h5>
                </div>
                <div class="p-3">
                  <small class="number">{{ dashData.total_completed_orders_money | fixedCurrency }}</small>
                  <!-- <h5 class="text">{{ $t("profile.pending") }}</h5> -->
                  <h5 class="text mt-2">{{ currency }}</h5>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <div class="large-screen col-lg-6 col-md-12 col-sm-12 mb-2">
          <router-link to="/profile/QuotationsB2b" class="link">
            <div class="bordered">
              <h5 class="title">{{ $t("profile.totalQuotations") }}</h5>
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-list-ol" class="fa-2x" />
              </span>

              <div class="info">
                <div class="p-3">
                  <p class="number">{{ dashData.total_completed_qoutes }}</p>
                  <h5 class="text">{{ $t("profile.quotations") }}</h5>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <div class="large-screen col-lg-6 col-md-12 col-sm-12 mb-2">
          <router-link to="/profile/ReturnRequests" class="link">
            <div class="bordered">
              <h5 class="title">{{ $t("profile.totalRefunds") }}</h5>
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-arrow-rotate-left" class="fa-2x" />
              </span>

              <div class="info">
                <div class="p-3">
                  <p class="number">{{ dashData.total_completed_refund }}</p>
                  <h5 class="text">{{ $t("profile.returnRequests") }}</h5>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <div class="large-screen col-lg-6 col-md-12 col-sm-12 mb-2">
          <router-link to="/profile/wallet" class="link">
            <div class="bordered">
              <h5 class="title">{{ $t("profile.wallet") }}</h5>
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-wallet" class="fa-2x" />
              </span>

              <div class="info">
                <div class="p-3">
                  <p class="number">
                    {{ dashData.wallet | fixedCurrency }}

                  </p>
                  <h5 class="text">{{ currency }}</h5>
                </div>
              </div>
            </div>
          </router-link>
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
                <span v-if="order.total_price">{{ order.total_price | fixedCurrency }} {{ currency }}</span>
              </td>
              <td>{{ order.payment_status_lang }}</td>
              <td>{{ order.payment }}</td>

              <td>
                <router-link :to="{
                  path: '/viewOrderDetails',
                  query: { id: `${order.id}` },
                }" class="text-dark">
                  <b-button variant="outline-secondary" class="m-2">
                    {{ $t("profile.view") }}
                  </b-button>
                </router-link>
                <router-link v-if="
                  order.payment_status === 'Unpaid' &&
                  order.payment_type === 'bank'
                " :to="{
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
                " variant="outline-success" class="m-2" v-if="
                  order.payment_status === 'Unpaid' &&
                  order.payment_type === 'visa'
                ">
                  {{ $t("profile.pay") }}
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
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
                    <div class="
                        method
                        d-flex
                        justify-content-between
                        align-content-center
                      ">
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

            <b-button :disabled="paymentFormData.payment_type == null" id="show-btn" class="mt-3"
              variant="outline-success" block @click="rePay">
              {{ $t("profile.pay") }}
            </b-button>
          </b-modal>
        </div>
      </div>
      <div class="spinner d-flex justify-content-center align-items-center" v-else>
        <spinner />
      </div>
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
export default {
  components: {
    spinner,
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
    };
  },
  methods: {
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
  },
  mounted() {
    this.getDashboardData();
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  .bordered {
    border: 1px solid #ccc;
    padding: 30px 15px 15px;
    position: relative;

    .icon {
      position: absolute;
      top: 5px;
      right: 5px;
    }

    .info {
      padding: 20px;

      display: flex;
      justify-content: center;
      align-items: center;

      @media (min-width: 1200px) and (max-width: 1800px) {
        // display: block;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;

        .border-right {
          border: none !important;
        }
      }
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

@media (max-width:991.98px){
  .large-screen{
    max-width:100%
  }
}
@media (min-width:992px) and(max-width:1199px){
  .large-screen{
    max-width:50%
  }
}
@media (min-width:1200px) and (max-width:1399.99px){
  .large-screen{
    max-width:50%
  }
}

@media(min-width:1400px) and (max-width:1699.98px){
  .large-screen{
    max-width:33%
  }
}
@media(min-width:1700px){
  .large-screen{
    max-width:25%
  }
}
</style>