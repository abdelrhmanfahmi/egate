<template>
  <!-- monthly-offers page  -->
  <div class="suppliers-body">
    <div
      class="navigation d-none d-lg-flex justify-content-center align-items-center w-75 mx-auto my-4"
    >
    </div>

    <div class="suppliers py-4">
      <div class="container">
        <b-row v-if="loading">
          <b-col class="mb-2" lg="3" sm="6" v-for="x in 10" :key="x">
            <b-skeleton-img></b-skeleton-img>
            <b-card>
              <b-skeleton
                animation="fade"
                width="60%"
                class="border-none"
              ></b-skeleton>
              <b-skeleton
                animation="fade"
                width="85%"
                class="border-none"
              ></b-skeleton>
            </b-card>
          </b-col>
        </b-row>
        <div class="" v-else>
          <h1 class="text-center my-5">{{ $t("home.monthlyOffers") }}</h1>
          <div class="row suppliers-data">
            <div
            class="col-12 col-sm-6 col-md-3 col-lg-3 supplier-content"
            v-for="(deal , index) in deals"
            :key="index"
          >
            <BestDeals :deal="deal" @getWishlistData="getWishlistData"></BestDeals>
          </div>
          </div>
        </div>
        <div
          class="text-center d-flex justify-content-center align-items-center mt-5"
        >
          <Paginate
            v-if="deals && total > perPage"
            :total-pages="totalPages"
            :per-page="totalPages"
            :current-page="page"
            @pagechanged="onPageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// monthly-offers page 
import BestDeals from "@/components/pages/BestDeals.vue";
import Paginate from "@/components/global/Paginate.vue";
import auth from "@/services/auth";
export default {
  components: {
    BestDeals,
    Paginate,
  },
  data() {
    return {
      items: [
        {
          text: this.$t("supplier.home"),
          href: "/humhum-user",
        },
        {
          text: this.$t("supplier.suppliers"),
          href: "#",
          active: true,
        },
      ],
      deals: null,
      loading: false,
      perPage: 5,
      total: 0,
      currentPage: 1,

      page: 1,
      totalPages: 0,
      totalRecords: 0,
      recordsPerPage: 10,
      enterpageno: "",
      errors:[]
    };
  },
  methods: {
    /**
     * @vuese
     * this function used to get get Best Deals products
     */
    getBestDeals() {
      this.loading = true;
      auth
        .getHomeDeadline()
        .then((resp) => {
          this.deals = resp.data.items.deals.data;
          this.total = resp.data.items.deals.total;
          this.totalPages = Math.ceil(
            resp.data.items.deals.total / resp.data.items.deals.per_page
          ); // Calculate total records

          this.totalRecords = resp.data.items.deals.total;
          this.perPage = resp.data.items.deals.per_page
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * @vuese
     * this function used for pagination
     */
    onPageChange(page) {
      this.page = page;
      this.getBestDeals();
    },

     /**
     * @vuese
     * this function used for pagination
     */
    onChangeRecordsPerPage() {
      this.getBestDeals();
    },
     /**
     * @vuese
     * this function used for pagination
     */
    gotoPage() {
      if (!isNaN(parseInt(this.enterpageno))) {
        this.page = parseInt(this.enterpageno);
        this.getBestDeals();
      }
    },
     /**
     * @vuese
     * this function used to get favorite products
     */
    getWishlistData(){
      this.getBestDeals()
    }
  },
  mounted() {
    this.getBestDeals();
  },
  computed: {
    rows() {
      return this.deals.length;
    },
  },
};
</script>
<style lang="scss" scoped>
.suppliers {
  background-color: #f9f8f5;
  .suppliers-data {
    color: #000;
    .supplier-content {
      padding: 0.6rem;
    }
  }
}
</style>
