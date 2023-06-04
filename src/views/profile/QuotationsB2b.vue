<template>
  <!-- quotaions page  -->
  <div class="rfq-page">
    <h5 class="profileB2b-header-table">{{ $t("profile.quotations") }}</h5>
    <b-table
      :items="items"
      :fields="fields"
      stacked="lg"
      show-empty
      :empty-text="$t('profile.quotationsRatingsEmpty')"
      hover
      striped
    >
      <template #cell(message)="data">
        <b-button
          @click="goQuotation(data.item.id)"
          class="mr-2 btn btn-light bg-transparent link border-main"
          ><font-awesome-icon icon="fa-regular fa-eye"
        /></b-button>
        <button
          id="show-btn"
          class="button one inactive mobile button--secondary wishlist-btn add-cart bg-dark mx-3 px-3"
          @click="
            selectId(data.item.id);
            $bvModal.show('bv-standingOrders');
          "
          v-b-tooltip.hover
          :title="$t('items.standingOrders')"
          v-if="buyerUserData"
        >
          <img
            src="@/assets/images/new-design/standing-order-sign.png"
            class="standing-order-sign"
            alt="standing-order-sign"
          />
        </button>
        <button
          v-else
          class="button one inactive mobile button--secondary wishlist-btn add-cart bg-dark mx-3 px-3"
          @click="loginFirst()"
          v-b-tooltip.hover
          :title="$t('items.standingOrders')"
        >
          <img
            src="@/assets/images/new-design/standing-order-sign.png"
            class="standing-order-sign"
            alt="standing-order-sign"
          />
        </button>
      </template>
      <template #cell(price)="data">
        <span v-if="data.value"
          >{{ data.value | fixedCurrency }} {{ currency }}</span
        >
        <span v-else> - </span>
      </template>
      <template #cell(created)="data">
        <span v-if="data.value">{{ data.value | formatDate }}</span>
        <span v-else> - </span>
      </template>
      <template #cell(expiry_at)="data">
        <span v-if="data.value">{{ data.value | formatDate }}</span>
        <span v-else> - </span>
      </template>
      <template #cell(supplier_product_name)="data">
        <b-button
          v-b-modal.modal-center.data.value
          @click="goProduct(data.item.supplier_product_id)"
          class="mr-2 btn btn-light bg-transparent border-0"
          >{{ data.value }}</b-button
        >
      </template>
    </b-table>
    <div class="d-flex justify-content-start align-items-center mt-5">
      <!-- pagination for orders  -->
      <Paginate
        v-if="items"
        :total-pages="totalPages"
        :per-page="totalPages"
        :current-page="page"
        @pagechanged="onPageChange"
      />
    </div>
    <b-modal id="bv-standingOrders" size="xl" hide-footer>
      <template #modal-title>
        {{ $t("items.standingOrders") }}
      </template>
      <standing-orders :passedId="selectedId" />
    </b-modal>
  </div>
</template>

<script>
/**
 * quotaions page
 * @displayName quotaions page
 */
import StandingOrders from "@/components/global/standingOrders.vue";
import profile from "@/services/profile";
import Paginate from "@/components/global/Paginate.vue";
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);

export default {
  data() {
    return {
      fields: [
        {
          key: "id",
          label: this.$t("profile.serial"),
        },
        {
          key: "quote_name",
          label: this.$t("profile.name"),
        },
        {
          key: "supplier_product_name",
          label: this.$t("profile.product"),
        },
        {
          key: "created_by",
          label: this.$t("profile.createdBy"),
        },
        {
          key: "request_qty",
          label: this.$t("profile.quantity"),
        },

        {
          key: "price",
          label: this.$t("profile.price"),
        },
        {
          key: "status",
          label: this.$t("profile.status"),
        },

        {
          key: "created",
          label: this.$t("profile.createdDate"),
        },
        {
          key: "expiry_at",
          label: this.$t("profile.expiry_at"),
        },
        {
          key: "message",
          label: this.$t("profile.actions"),
        },
      ],
      items: [],
      perPage: 5,
      total: 0,
      currentPage: 1,

      page: 1,
      totalPages: 0,
      totalRecords: 0,
      recordsPerPage: 10,
      enterpageno: "",
      selectedId: null,
    };
  },
  methods: {
     /**
     * @vuese
     *  login first
     */
     loginFirst() {
      Vue.swal({
        title: this.$t("singleProduct.loginFirst"),
        text: this.$t("singleProduct.registerNow"),
        icon: "warning",
        // buttons: ["Oh noez!", true],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$router.push("/user-register");
        }
      });
    },
    selectId(elementId) {
      this.selectedId = elementId;
    },
    /**
     * get Quotations function
     * @vuese
     */
    getQuotations() {
      profile
        .getQuotations()
        .then((resp) => {
          this.items = resp.data.items.data;
          this.total = resp.data.items.total;
          this.totalPages = Math.ceil(
            resp.data.items.total / resp.data.items.per_page
          ); // Calculate total records

          this.totalRecords = resp.data.items.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * go Product function
     * @vuese
     */
    goProduct(product) {
      this.$router.push({
        path: "/details",
        query: {
          id: product,
        },
      });
    },
    goSupplierPage(supplier_id) {
      this.$router.push(`/suppliers/${supplier_id}`);
    },
    /**
     * go Quotation function
     * @vuese
     */
    goQuotation(product) {
      this.$router.push({
        path: "/profile/quotationDetails",
        query: {
          id: product,
        },
      });
    },
    /**
     * function for pagination
     * @vuese
     */
    onPageChange(page) {
      this.page = page;
      this.getQuotations();
    },
    /**
     * function for pagination
     * @vuese
     */
    onChangeRecordsPerPage() {
      this.getQuotations();
    },
    /**
     * function for pagination
     * @vuese
     */
    gotoPage() {
      if (!isNaN(parseInt(this.enterpageno))) {
        this.page = parseInt(this.enterpageno);
        this.getQuotations();
      }
    },
  },
  mounted() {
    this.getQuotations();
  },
  components: {
    Paginate,
    StandingOrders,
  },
};
</script>
<style lang="scss" scoped>
.link {
  text-decoration: underline;
}
.wishlist-btn{
  padding: 5px 10px !important;
}
</style>
