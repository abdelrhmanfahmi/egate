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
          <h1 class="text-center my-5">basket offers</h1>
          <div class="row suppliers-data">
            <div
              class="col-12 col-sm-6 col-md-3 col-lg-3 supplier-content"
              v-for="(deal, index) in basketOffer"
              :key="index"
            >
              <BestDeals
                :deal="deal"
                @getWishlistData="getWishlistData"
              ></BestDeals>
            </div>
          </div>
        </div>

        <div
          class="text-center d-flex justify-content-center align-items-center mt-5"
        >
          <Paginate
            v-if="basketOffer && total > perPage"
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
import profile from "@/services/profile";
import BestDeals from "@/components/pages/BestDeals.vue";
import Paginate from "@/components/global/Paginate.vue";
export default {
  data() {
    return {
      basketOffer: null,
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
     * buy x To Get y
     */

    buyToGetAnother() {
      profile
        .buyToGetAnother()
        .then((resp) => {
          

          console.log(resp);
          this.basketOffer = resp.data.items.data;
          this.total = resp.data.items.total;
          this.totalPages = Math.ceil(
            resp.data.items.total / resp.data.items.per_page
          ); // Calculate total records

          this.totalRecords = resp.data.items.total;
          this.perPage = resp.data.items.per_page;

        })
        .catch((err) => {
          console.log(err);
        });
    },
    getNewOffers(){
        profile.getNewOffers().then(res =>{
            console.log(res);
        }).catch(err =>{
            console.log(err);
        })
    },
    /**
     * @vuese
     * on Page Change function for pagination
     */
     onPageChange(page) {
      // on Page Change function for pagination
      this.page = page;
      this.buyToGetAnother();
    },
    /**
     * @vuese
     * on Change Records PerPage function for pagination
     */
    onChangeRecordsPerPage() {
      // on Change Records PerPage function for pagination to get data again
      this.buyToGetAnother();
    },
    /**
     * @vuese
     * go to Page function for pagination
     */
    gotoPage() {
      // go to Page function for pagination
      if (!isNaN(parseInt(this.enterpageno))) {
        this.page = parseInt(this.enterpageno);
        this.buyToGetAnother();
      }
    },
  },
  mounted() {
    this.buyToGetAnother();
    this.getNewOffers();
  },
  components: {
    BestDeals,
    Paginate,
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
