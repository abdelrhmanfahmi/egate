<template>
  <!-- best deals page  -->
  <div class="suppliers-body">
    <div
      class="navigation d-none d-lg-flex justify-content-center align-items-center w-75 mx-auto my-4"
    >
      <!-- <b-breadcrumb :items="items"></b-breadcrumb> -->
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
          <h1 class="text-center my-5">{{ $t("home.dailyOffers") }}</h1>
          <div class="row suppliers-data">
            <div
              class="col-12 col-sm-6 col-md-3 col-lg-3 supplier-content"
              v-for="(deal, index) in deals"
              :key="index"
            >
              <BestDeals
                :deal="deal"
                :dealType="$t('home.dailyOffers')"
                @getWishlistData="getWishlistData"
              ></BestDeals>
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
//bast deals page

/** 
 * @group bast deals
 * This is a description of the component
 */
import BestDeals from "@/components/pages/BestDeals.vue";
import Paginate from "@/components/global/Paginate.vue";
import categories from "@/services/categories";
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
      errors: [],
    };
  },
  methods: {
    /**
     * @vuese
     * get BestDeals data
     */

    getBestDeals() {
      //get best deals products
      this.loading = true;
      categories
        .getBestDeals()
        .then((resp) => {
          this.deals = resp.data.items.data;
          this.total = resp.data.items.total;
          this.totalPages = Math.ceil(
            resp.data.items.total / resp.data.items.per_page
          ); // Calculate total records

          this.totalRecords = resp.data.items.total;
          this.perPage = resp.data.items.per_page;
        })
        // .catch((err) => {
        //   console.log(err);
        // })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * @vuese
     * on Page Change function for pagination
     */
    onPageChange(page) {
      // on Page Change function for pagination
      this.page = page;
      this.getBestDeals();
    },
    /**
     * @vuese
     * on Change Records PerPage function for pagination
     */
    onChangeRecordsPerPage() {
      // on Change Records PerPage function for pagination to get data again
      this.getBestDeals();
    },
    /**
     * @vuese
     * go to Page function for pagination
     */
    gotoPage() {
      // go to Page function for pagination
      if (!isNaN(parseInt(this.enterpageno))) {
        this.page = parseInt(this.enterpageno);
        this.getBestDeals();
      }
    },
    /**
     * @vuese
     * get favorite Data function
     */
    getWishlistData() {
      // get favorite Data function
      this.getBestDeals();
    },
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
