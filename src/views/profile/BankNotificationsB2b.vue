<template>
  <!-- bank notifications for buyer  -->
  <div>
    <h5 class="profileB2b-header-table">
      {{ $t("profile.bankNotificationsHeader") }}
    </h5>
    <b-table
      hover
      :items="items"
      :fields="fields"
      stacked="lg"
      show-empty
      :empty-text="$t('profile.bankNotificationEmpty')"
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
          key: "orderNumber",
          label: this.$t("profile.orderNumber"),
        },
        {
          key: "construction",
          label: this.$t("profile.construction"),
        },
        {
          key: "batch",
          label: this.$t("profile.batch"),
        },
        {
          key: "status",
          label: this.$t("profile.status"),
        },
        {
          key: "details",
          label: this.$t("profile.details"),
        },
      ],
      items: [],
    };
  },
};
</script>
