<template>
  <div>
    <h5 class="profileB2b-header-table">
      {{ $t("profile.residents") }}
    </h5>
    <b-table
      hover
      :items="items"
      :fields="fields"
      stacked="lg"
      show-empty
      :empty-text="$t('profile.residentsEmpty')"
    >
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: "Construction",
          label: this.$t("profile.construction"),
        },
        {
          key: "Product Name",
          label: this.$t("profile.productName"),
        },
        {
          key: "Invoice No",
          label: this.$t("profile.invoiceNo"),
        },
        {
          key: "supplier",
          label: this.$t("profile.supplier"),
        },
        {
          key: "Details",
          label: this.$t("profile.details"),
        },
      ],
      items: [],
    };
  },
};
</script>
<style></style>
