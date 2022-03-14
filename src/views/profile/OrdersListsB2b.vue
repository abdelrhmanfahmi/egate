<template>
  <div>
    <h5 class="profileB2b-header-table">
      {{ $t("profile.ordersLists") }}
    </h5>
    <div class="row">
      <div class="col-12 col-md-6 col-lg-3">
        <a href="#" type="submit" class="login-button white my-3">
          {{ $t("profile.ordersListsNew") }}
        </a>
      </div>
    </div>
    <b-table
      hover
      :items="items"
      :fields="fields"
      stacked="lg"
      show-empty
      :empty-text="$t('profile.ordersListsEmpty')"
    >
      <template #cell(procedure)>
        <a href="#" class="login-button my-0 w-50 white">
          {{ $t("profile.viewDetails") }}
        </a>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: "nameDescription",
          label: this.$t("profile.nameDescription"),
        },
        {
          key: "products",
          label: this.$t("profile.products"),
        },
        {
          key: "finalActivity",
          label: this.$t("profile.finalActivity"),
        },
        {
          key: "procedure",
          label: this.$t("profile.procedure"),
        },
      ],
      items: [
        {
          nameDescription: "مشتريات الشهر",
          products: 2,
          finalActivity: "07/24/2021",
        },
      ],
    };
  },
};
</script>
<style></style>
