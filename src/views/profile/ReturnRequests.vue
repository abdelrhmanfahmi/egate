<template>
  <div>
    <h5 class="profileB2b-header-table">
      {{ $t("profile.returnRequests") }}
    </h5>
    <div class="holder text-center" v-if="orders">
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
            <td>{{ order.item_names }}</td>
            <td>{{ order.client }}</td>
            <td>
              <span v-if="order.price"
                >{{ order.price | fixedCurrency }} {{ currency }}</span
              >
            </td>
            <td>{{ order.retrun_option }}</td>
            <td>{{ order.return_status }}</td>
            <td>{{ order.return_request_date | formatDate }}</td>
            <td>{{ order.updated_at | formatDate }}</td>

            <td>
              <router-link
                :to="{
                  path: '/ReturnedRequest',
                  query: { UUID: `${order.uuid}` },
                }"
                class="text-dark"
              >
                <b-button variant="outline-secondary" class="m-2">
                  {{ $t("profile.view") }}
                </b-button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-center align-items-center mt-5">
        <Paginate
          v-if="orders"
          :total-pages="totalPages"
          :per-page="totalPages"
          :current-page="page"
          @pagechanged="onPageChange"
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
</template>

<script>
import profile from "@/services/profile";
import spinner from "@/components/spinner.vue";
import Paginate from "@/components/global/Paginate.vue";
export default {
  data() {
    return {
      fields: [
        {
          key: "id",
          label: this.$t("profile.productName"),
        },
        {
          key: "company_name",
          label: this.$t("profile.supplier"),
        },
        {
          key: "price",
          label: this.$t("profile.price"),
        },
        {
          key: "returnOption",
          label: this.$t("profile.returnOption"),
        },
        {
          key: "return_status",
          label: this.$t("profile.returnStatus"),
        },
        {
          key: "return_request_date",
          label: this.$t("profile.returnRequestDate"),
        },
        {
          key: "updated_at",
          label: this.$t("profile.updatedAt"),
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
    returnedOrders() {
      if (this.buyerUserData.type === "buyer") {
        profile
          .returneBuyerdOrders(this.page)
          .then((resp) => {
            this.orders = resp.data.items.items.data;

            this.total = resp.data.items.items.meta.total;
            this.totalPages = Math.ceil(
              resp.data.items.items.meta.total /
                resp.data.items.items.meta.per_page
            ); // Calculate total records

            this.totalRecords = resp.data.items.items.meta.total;
          })
          .catch((err) => {
            console.log(err);
          });
      } 
       if (this.buyerUserData.type === "supplier") {
        profile
          .returneSupplierOrders(this.page)
          .then((resp) => {
            this.orders = resp.data.items.items.data;

            this.total = resp.data.items.items.meta.total;
            this.totalPages = Math.ceil(
              resp.data.items.items.meta.total /
                resp.data.items.items.meta.per_page
            ); // Calculate total records

            this.totalRecords = resp.data.items.items.meta.total;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    onPageChange(page) {
      this.page = page;
      this.returnedOrders();
    },
    onChangeRecordsPerPage() {
      this.returnedOrders();
    },
    gotoPage() {
      if (!isNaN(parseInt(this.enterpageno))) {
        this.page = parseInt(this.enterpageno);
        this.returnedOrders();
      }
    },
    saveUUID(order) {
      console.log(order);
      this.paymentFormData.order_uuid = order.uuid;
    },
  },
  mounted() {
    this.returnedOrders();
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
</style>
