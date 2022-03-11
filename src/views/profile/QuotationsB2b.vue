<template>
  <div>
    <h5 class="profileB2b-header-table">{{ $t("profile.quotations") }}</h5>
    <b-table
      hover
      :items="items"
      :fields="fields"
      stacked="lg"
      show-empty
      :empty-text="$t('profile.quotationsRatingsEmpty')"
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
          key: "definition",
          label: this.$t("profile.definition"),
        },
        {
          key: "displayName",
          label: this.$t("profile.displayName"),
        },
        {
          key: "construction",
          label: this.$t("profile.construction"),
        },
        {
          key: "createdBy",
          label: this.$t("profile.createdBy"),
        },
        {
          key: "status",
          label: this.$t("profile.status"),
        },
        {
          key: "lastUpdate",
          label: this.$t("profile.lastUpdate"),
        },
        {
          key: "procedure",
          label: this.$t("profile.procedure"),
        },
      ],
      items: [],
    };
  },
};
</script>
<style></style>
