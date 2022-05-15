<template>
  <div>
    <h5 class="profileB2b-header-table">
      {{ $t("profile.ordersLists") }}
    </h5>
    <!-- <div class="d-flex">
      <div class="col-12 col-md-6 col-lg-3">
        <a href="#" type="submit" class="login-button white my-3">
          {{ $t("profile.ordersListsNew") }}
        </a>
      </div>
    </div> -->
    <!-- <b-table
      hover
      :items="items"
      :fields="fields"
      stacked="lg"
      show-empty
      :empty-text="$t('profile.ordersListsEmpty')"
    >
      <template #cell(Actions)="data">
        <router-link
          :to="{ path: '/viewOrderDetails', query: { id: `${data.value}` } }"
          class="text-dark"
        >
          <b-button variant="outline-secondary" class="mx-2">
            {{ $t("view") }}
          </b-button>
        </router-link>

        <b-button variant="outline-danger">{{ $t("cancel") }}</b-button>
      </template>
    </b-table> -->
    <div class="holder text-center">
      <table class="table table-striped table-hover table-bordered selectable">
        <thead>
          <tr>
            <th scope="col" v-for="(tab, index) in fields" :key="index">
              {{ tab.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(x, index) in 8" :key="index">
            <td>test {{ index }}</td>
            <td>test {{ index }}</td>
            <td>test {{ index }}</td>
            <td>test {{ index }} {{currency}}</td>
            <td>test {{ index }}</td>
            <td>test {{ index }}</td>
            <td>
              <router-link
                :to="{
                  path: '/viewOrderDetails',
                  query: { id: `${index}` },
                }"
                class="text-dark"
              >
                <b-button variant="outline-secondary" class="m-2">
                  {{ $t("profile.view") }}
                </b-button>
              </router-link>
              <b-button variant="outline-danger">{{ $t("profile.cancel") }}</b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: "id",
          label: this.$t('profile.serial'),
        },
        {
          key: "date",
          label: this.$t("profile.date"),
        },
        {
          key: "no-of-products",
          label: this.$t("profile.productsNumber"),
        },
        {
          key: "amount",
          label: this.$t("profile.amount"),
        },
        {
          key: "order-status",
          label: this.$t("profile.orderStatus"),
        },
        {
          key: "buy-method",
          label: this.$t("profile.buyMethod"),
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
    };
  },
};
</script>
<style></style>
