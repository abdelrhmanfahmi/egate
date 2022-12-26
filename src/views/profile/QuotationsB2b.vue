<template>
  <!-- quotaions page  -->
  <div>
    <h5 class="profileB2b-header-table">{{ $t("profile.quotations") }}</h5>
    <b-table
      :items="items"
      :fields="fields"
      stacked="lg"
      show-empty
      :empty-text="$t('profile.quotationsRatingsEmpty')"
      hover
    >
      <template #cell(message)="data">
        <b-button
          @click="goQuotation(data.item.id)"
          class="mr-2 btn btn-light bg-transparent link"
          >{{ $t("profile.view") }}</b-button
        >
      </template>
      <template #cell(price)="data">
        <span v-if="data.value"
          >{{ data.value | fixedCurrency }} {{ currency }}</span
        >
        <span v-else> - </span>
      </template>
      <template #cell(supplier_product_name)="data">
        <b-button
          v-b-modal.modal-center.data.value
          @click="goProduct(data.item.supplier_product_id)"
          class="mr-2 btn btn-light bg-transparent link"
          >{{ data.value }}</b-button
        >
      </template>
    </b-table>
  </div>
</template>

<script>
/**
 * quotaions page
 * @displayName quotaions page
 */
import profile from "@/services/profile";
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
          key: "message",
          label: this.$t("profile.actions"),
        },
      ],
      items: [],
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
        .then((res) => {
          console.log(res);
          this.items = res.data.items.data;
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
  },
  mounted() {
    this.getQuotations();
  },
};
</script>
<style lang="scss" scoped>
.link {
  text-decoration: underline;
}
</style>
