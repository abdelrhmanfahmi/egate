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
    <div class="holder text-center" v-if="orders">
      <table class="table table-striped table-hover table-bordered selectable">
        <thead>
          <tr>
            <th scope="col" v-for="(tab, index) in fields" :key="index">
              {{ tab.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="index">
            <td>{{ order.serial }}</td>
            <td>{{ order.created_at | formatDate }}</td>
            <td>{{ order.order_supplier_items_count }}</td>
            <td>{{ order.total_price }} {{ currency }}</td>
            <td>{{ order.payment_status }}</td>
            <td>{{ order.payment_type }}</td>
            <td>
              <router-link
                :to="{
                  path: '/viewOrderDetails',
                  query: { id: `${order.id}` },
                }"
                class="text-dark"
              >
                <b-button variant="outline-secondary" class="m-2">
                  {{ $t("profile.view") }}
                </b-button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="spinner d-flex justify-content-center align-items-center"
      v-else
    >
      <spinner />
    </div>
  </div>
</template>

<script>
import profile from "@/services/profile";
import spinner from "@/components/spinner.vue";
export default {
  data() {
    return {
      fields: [
        {
          key: "id",
          label: this.$t("profile.serial"),
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
          key: "paymentStatus",
          label: this.$t("profile.paymentStatus"),
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
      orders: null,
    };
  },
  methods: {
    getOrders() {
      profile
        .getOrders()
        .then((res) => {
          this.orders = res.data.items.orders;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getOrders();
  },
  components: {
    spinner,
  },
};
</script>
<style lang="scss" scoped></style>
