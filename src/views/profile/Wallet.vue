<template>
  <div>
    <div class="wrabber">
      <div class="balance-holder py-5">
        <h4 class="balanc_number">balance number</h4>
        <h5 class="balance_text">
          {{ $t("profile.balance") }}
        </h5>
      </div>

      <div class="tabs-holder">
        <!-- partial:index.partial.html -->

        
          <div class="tab-wrap">
            <!-- active tab on page load gets checked attribute -->
            <input
              type="radio"
              id="recivables"
              name="tabGroup1"
              class="tab"
              checked
            />
            <label for="recivables">
              <h5>{{ $t("profile.receivables") }}</h5>
            </label>

            <input type="radio" id="payments" name="tabGroup1" class="tab" />
            <label for="payments">
              <h5>{{ $t("profile.payments") }}</h5>
            </label>

            <div class="tab__content">
              <div class="recivables py-3">
                <div class="holder text-center" v-if="recivables">
                  <table
                    class="table table-striped table-hover table-bordered selectable"
                  >
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          v-for="(tab, index) in recivablesHeader"
                          :key="index"
                        >
                          {{ tab.label }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(order, index) in recivables" :key="index">
                        <td>Return.resquest.serial</td>
                        <td>RefundedValue</td>
                        <td>ValueDate of recieve payment in wallet</td>
                        <td>
                          <span v-if="order.total_price"> Supplier_name </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    class="d-flex justify-content-center align-items-center mt-5"
                  >
                    <Paginate
                      v-if="recivables"
                      :total-pages="totalPages"
                      :per-page="totalPages"
                      :current-page="recivablePage"
                      @pagechanged="onRecivablesChange"
                    />
                  </div>
                </div>
                <div
                  class="spinner d-flex justify-content-center align-items-center"
                  v-else
                >
                  <spinner />
                </div>
              </div>
            </div>

            <div class="tab__content">
              <div class="payments py-3">
                <div class="holder text-center" v-if="payments">
                  <table
                    class="table table-striped table-hover table-bordered selectable"
                  >
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          v-for="(tab, index) in paymentsHeadrer"
                          :key="index"
                        >
                          {{ tab.label }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(order, index) in payments" :key="index">
                        <td>{{ order.serial }}</td>
                        <td>{{ order.created_at | formatDate }}</td>
                        <td>{{ order.order_supplier_items_count }}</td>
                        <td>
                          <span v-if="order.total_price"
                            >{{ order.total_price | fixedCurrency }}
                            {{ currency }}</span
                          >
                        </td>
                        <td>{{ order.payment_status }}</td>
                        <td>{{ order.payment }}</td>

                        <td>
                          <router-link
                            :to="{
                              path: '/viewOrderDetails',
                              query: { id: `${order.id}` },
                            }"
                            class="text-dark"
                          >
                            <b-button variant="outline-secondary" class="m-2">
                              {{ $t("profile.view") }}
                            </b-button>
                          </router-link>
                          <router-link
                            v-if="
                              order.payment_status === 'Unpaid' &&
                              order.payment_type === 'bank'
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
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    class="d-flex justify-content-center align-items-center mt-5"
                  >
                    <Paginate
                      v-if="payments"
                      :total-pages="totalPages"
                      :per-page="totalPages"
                      :current-page="paymentPage"
                      @pagechanged="onPaymentsPageChange"
                    />
                  </div>
                </div>
                <div
                  class="spinner d-flex justify-content-center align-items-center"
                  v-else
                >
                  <spinner />
                </div>
              </div>
            </div>
          </div>
        
        <!-- partial -->
      </div>
    </div>
  </div>
</template>

<script>
import profile from "@/services/profile";
import spinner from "@/components/spinner.vue";
import Paginate from "@/components/global/Paginate.vue";
export default {
  data() {
    return {
      recivablesHeader: [
        {
          key: "id",
          label: this.$t("profile.serial"),
        },
        {
          key: "date",
          label: this.$t("profile.RefundedValue"),
        },
        {
          key: "no-of-products",
          label: this.$t("profile.ValueDate"),
        },
        {
          key: "amount",
          label: this.$t("profile.supplierName"),
        },
      ],
      paymentsHeadrer: [
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
      items: [],
      recivables: null,
      perPage: 5,
      total: 0,
      currentPage: 1,

      paymentPage: 1,
      recivablePage: 1,
      totalPages: 0,
      totalRecords: 0,
      recordsPerPage: 10,
      enterpageno: "",

      paymentFormData: {
        payment_type: null,
        order_uuid: null,
      },
      errors: [],
      payments:null,
      walletData:null
    };
  },
  methods: {
    getWallet(){
      profile.getWallet().then(res =>{
        console.log(res);
        this.walletData = res.data.items
      }).catch(err =>{
        console.log(err);
      })
    },
    getWalletPayments() {
      profile
        .getWalletPayments(this.paymentPage)
        .then((resp) => {
          this.recivables = resp.data.items.payments.data;
          this.payments = resp.data.items.payments.data;

          this.total = resp.data.items.payments.meta.total;
          this.totalPages = Math.ceil(
            resp.data.items.payments.meta.total /
              resp.data.items.payments.meta.per_page
          ); // Calculate total records

          this.totalRecords = resp.data.items.payments.meta.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getWalletRecivables() {
      profile
        .getWalletRecivables(this.recivablePage)
        .then((resp) => {
          console.log(resp);
          this.recivables = resp.data.items.receivables.data;
          this.payments = resp.data.items.receivables.data;

          this.total = resp.data.items.receivables.meta.total;
          this.totalPages = Math.ceil(
            resp.data.items.receivables.meta.total /
              resp.data.items.receivables.meta.per_page
          ); // Calculate total records

          this.totalRecords = resp.data.items.receivables.meta.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onPaymentsPageChange(page) {
      this.paymentPage = page;
      this.getWalletPayments();
    },
    onRecivablesChange(page) {
      this.recivablePage = page;
      this.onRecivablesChange();
    },
    // onChangeRecordsPerPage() {
    //   this.getWalletPayments();
    // },
    // onChangeRecordsPerPage() {
    //   this.onRecivablesChange();
    // },
    // gotoPage() {
    //   if (!isNaN(parseInt(this.enterpageno))) {
    //     this.page = parseInt(this.enterpageno);
    //     this.getWalletPayments();
    //   }
    // },
  },
  mounted() {
    this.getWalletPayments();
    this.getWalletRecivables();
    this.getWallet();
  },
  components: {
    spinner,
    Paginate,
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
.balance-holder {
  border: 1px solid #ccc;
  padding-left: 25px;
}
// tabs

.tab-wrap {
  transition: 0.3s box-shadow ease;
  border-radius: 6px;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  list-style: none;
  background-color: #fff;
  margin: 40px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.tab-wrap:hover {
  box-shadow: 0 12px 23px rgba(0, 0, 0, 0.23), 0 10px 10px rgba(0, 0, 0, 0.19);
}

.tab {
  display: none;
}
.tab:checked:nth-of-type(1) ~ .tab__content:nth-of-type(1) {
  opacity: 1;
  transition: 0.5s opacity ease-in, 0.8s transform ease;
  position: relative;
  top: 0;
  z-index: 100;
  transform: translateY(0px);
  text-shadow: 0 0 0;
}
.tab:checked:nth-of-type(2) ~ .tab__content:nth-of-type(2) {
  opacity: 1;
  transition: 0.5s opacity ease-in, 0.8s transform ease;
  position: relative;
  top: 0;
  z-index: 100;
  transform: translateY(0px);
  text-shadow: 0 0 0;
}
.tab:checked:nth-of-type(3) ~ .tab__content:nth-of-type(3) {
  opacity: 1;
  transition: 0.5s opacity ease-in, 0.8s transform ease;
  position: relative;
  top: 0;
  z-index: 100;
  transform: translateY(0px);
  text-shadow: 0 0 0;
}
.tab:checked:nth-of-type(4) ~ .tab__content:nth-of-type(4) {
  opacity: 1;
  transition: 0.5s opacity ease-in, 0.8s transform ease;
  position: relative;
  top: 0;
  z-index: 100;
  transform: translateY(0px);
  text-shadow: 0 0 0;
}
.tab:checked:nth-of-type(5) ~ .tab__content:nth-of-type(5) {
  opacity: 1;
  transition: 0.5s opacity ease-in, 0.8s transform ease;
  position: relative;
  top: 0;
  z-index: 100;
  transform: translateY(0px);
  text-shadow: 0 0 0;
}
.tab:first-of-type:not(:last-of-type) + label {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.tab:not(:first-of-type):not(:last-of-type) + label {
  border-radius: 0;
}
.tab:last-of-type:not(:first-of-type) + label {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.tab:checked + label {
  background-color: #fff;
  box-shadow: 0 -1px 0 #fff inset;
  cursor: default;
}
.tab:checked + label:hover {
  box-shadow: 0 -1px 0 #fff inset;
  background-color: #fff;
}
.tab + label {
  box-shadow: 0 -1px 0 #eee inset;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
  display: block;
  text-decoration: none;
  color: #333;
  flex-grow: 3;
  text-align: center;
  background-color: #f2f2f2;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: center;
  transition: 0.3s background-color ease, 0.3s box-shadow ease;
  height: 50px;
  box-sizing: border-box;
  padding: 15px;
}
.tab + label:hover {
  background-color: #f9f9f9;
  box-shadow: 0 1px 0 #f4f4f4 inset;
}
.tab__content {
  padding: 10px 25px;
  background-color: transparent;
  position: absolute;
  width: 100%;
  z-index: -1;
  opacity: 0;
  left: 0;
  transform: translateY(-3px);
  border-radius: 6px;
}

/* boring stuff */
body {
  font-family: "Helvetica", sans-serif;
  background-color: #e7e7e7;
  color: #777;
  padding: 30px 0;
  font-weight: 300;
}

h1,
h2 {
  margin: 0;
  color: #444;
  text-align: center;
  font-weight: 400;
}

h2 {
  font-size: 1em;
  margin-bottom: 30px;
}

h3 {
  font-weight: 400;
}

p {
  line-height: 1.6;
  margin-bottom: 20px;
}
</style>
