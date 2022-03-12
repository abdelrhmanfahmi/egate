<template>
  <div>
    <h5 class="profileB2b-header-table">
      {{ $t("profile.supplierCorrespondence") }}
    </h5>
    <b-table
      hover
      :items="items"
      :fields="fields"
      stacked="lg"
      show-empty
      :empty-text="$t('profile.supplierCorrespondenceEmpty')"
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
          key: "supplier",
          label: this.$t("profile.supplier"),
        },
        {
          key: "Product",
          label: this.$t("profile.product"),
        },
        {
          key: "Quantity",
          label: this.$t("profile.quantity"),
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
