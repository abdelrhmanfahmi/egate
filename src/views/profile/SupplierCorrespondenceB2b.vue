<template>
  <!-- Supplier CorrespondenceB2b page  -->
  <div>
    <h5 class="profileB2b-header-table">
      {{ $t("profile.supplierCorrespondence") }}
    </h5>
    <!-- if items exist  -->
    <div class="holder text-center" v-if="items">
      <table
        class="table table-striped table-hover table-bordered selectable"
        v-if="itemsLength > 0"
      >
        <thead>
          <tr>
            <th scope="col" v-for="(tab, index) in fields" :key="index">
              {{ tab.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in items" :key="index">
            <td>
              {{ order.supplier.first_name }} {{ order.supplier.last_name }}
            </td>
            <td>{{ order.last_message | formatDate }}</td>
            <td>
              <div v-if="order.status === 'Submitted'">
                <div class="" v-if="$i18n.locale == 'en'">
                  <span>{{ buyerUserData.first_name }}</span>
                  <span>{{ buyerUserData.last_name }}</span>
                  <span class="mx-1">({{ $t("home.you") }})</span>
                </div>
                <div class="" v-else>
                  <span class="mx-1">({{ $t("home.you") }})</span>
                  <span>{{ buyerUserData.last_name }}</span>
                  <span>{{ buyerUserData.first_name }}</span>
                </div>
              </div>
              <div v-if="order.status === 'UpdatedBySupplier'">
                <span
                  >{{ order.supplier.first_name }}
                  {{ order.supplier.last_name }}</span
                >
              </div>
            </td>

            <td>
              <router-link
                :to="{
                  path: `/viewCorresponseDetails`,
                  query: { id: `${order.id}` },
                }"
                class="text-dark"
              >
                <b-button variant="outline-light main-color border-main" class="m-2">
                  <font-awesome-icon icon="fa-regular fa-eye" />
                </b-button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="d-flex justify-content-center align-items-center mt-5"
        v-if="itemsLength > 0"
      >
        <Paginate
          v-if="items"
          :total-pages="totalPages"
          :per-page="totalPages"
          :current-page="page"
          @pagechanged="onPageChange"
        />
      </div>
    </div>
    <!-- if items not exist  -->
    <!-- when loading  -->
    <div
      class="spinner d-flex justify-content-center align-items-center"
      v-else
    >
      <spinner />
    </div>
    <div class="" v-if="!items">
      {{ $t('profile.quotationsRatingsEmpty') }}</div>
  </div>
</template>

<script>
/**
 * Supplier CorrespondenceB2b page
 * @displayName Supplier CorrespondenceB2b page
 */
import profile from "@/services/profile";
import spinner from "@/components/spinner.vue";
import Paginate from "@/components/global/Paginate.vue";
export default {
  data() {
    return {
      fields: [
        {
          key: "first",
          label: this.$t("profile.supplierName"),
        },
        {
          key: "supplier",
          label: this.$t("profile.lastUpdate"),
        },
        {
          key: "Product",
          label: this.$t("profile.lastUpdateUser"),
        },
        {
          key: "actions",
          label: this.$t("profile.actions"),
        },
        // {
        //   key: "Details",
        //   label: this.$t("profile.details"),
        // },
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
      loading: false,
      itemsLength: null,
    };
  },
  methods: {
    /**
     * get supplier All Correspondence function 
     * @vuese
     */
    supplierAllCorrespondence() {
      profile
        .supplierAllCorrespondence()
        .then((resp) => {
          console.log(resp);
          this.items = resp.data.items.data;
          this.itemsLength = resp.data.items.data.length;

          this.total = resp.data.items.total;
          this.totalPages = Math.ceil(
            resp.data.items.total / resp.data.items.per_page
          ); // Calculate total records

          this.totalRecords = resp.data.items.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * function for pagination 
     * @vuese
     */
    onPageChange(page) {
      this.page = page;
      this.getOrders();
    },
     /**
     * function for pagination 
     * @vuese
     */
    onChangeRecordsPerPage() {
      this.getOrders();
    },
     /**
     * function for pagination 
     * @vuese
     */
    gotoPage() {
      if (!isNaN(parseInt(this.enterpageno))) {
        this.page = parseInt(this.enterpageno);
        this.getOrders();
      }
    },
  },
  mounted() {
    this.supplierAllCorrespondence();
  },
  components: {
    spinner,
    Paginate,
  },
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 767px) {
  table {
    text-align: center;
    tbody {
      tr {
        margin: 30px 0;
      }
    }
  }
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    position: absolute;
    width: 1px;
    padding: 0;
  }

  table td {
    display: block;
    font-size: 0.8rem;
    border-top: none !important;
  }
  .table-striped tbody tr:nth-of-type(odd) {
    margin: 30px 0;
    display: block;
  }
  .actions {
    justify-content: center;
    align-items: center;
  }
}
</style>
