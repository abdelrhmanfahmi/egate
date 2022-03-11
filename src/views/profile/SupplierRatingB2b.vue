<template>
  <div>
    <h5 class="profileB2b-header-table">{{ $t("profile.supplierRatings") }}</h5>
    <b-table
      hover
      :items="items"
      :fields="fields"
      stacked="lg"
      show-empty
      :empty-text="$t('profile.supplierRatingsEmpty')"
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
          key: "construction",
          label: this.$t("profile.construction"),
        },
        {
          key: "productName",
          label: this.$t("profile.productName"),
        },
        {
          key: "evaluation",
          label: this.$t("profile.evaluation"),
        },
        {
          key: "review",
          label: this.$t("profile.review"),
        },
      ],
      items: [],
    };
  },
};
</script>
<style></style>
