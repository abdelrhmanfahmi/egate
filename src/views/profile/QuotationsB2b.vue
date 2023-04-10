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
      </template>
      <template #cell(price)="data">
        <span v-if="data.value">{{ data.value | fixedCurrency }} {{ currency }}</span>
        <span v-else> - </span>
      </template>
      <template #cell(expiry_at)="data">
        <span v-if="data.value">{{ data.value | formatDate }}</span>
        <span v-else> - </span>
      </template>
      <!-- <template #cell(created_by)="data">
        <span v-if="data.value">
          <b-button
            v-b-modal.modal-center.data.value
            @click="goSupplierPage(data.item.Supplier_product_id)"
            class="mr-2 btn btn-light bg-transparent border-0"
            >{{ data.value }}</b-button
          >
        </span>
        <span v-else> - </span>
      </template> -->
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
  </div>
</template>

<script>
/**
 * quotaions page
 * @displayName quotaions page
 */
import profile from "@/services/profile";
import Paginate from "@/components/global/Paginate.vue";
export default {
  data() {
    return {
      fields: [
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
    };
  },
  methods: {
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
          this.totalPages = Math.ceil(resp.data.items.total / resp.data.items.per_page); // Calculate total records

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
  },
};
</script>
<style lang="scss" scoped>
.link {
  text-decoration: underline;
}
</style>
