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
          <h1 class="text-center my-5">{{ 
            $t('profile.buyXgetYOffer') }}</h1>
          <div
            class="row suppliers-data"
            v-if="pageTitle == $t('profile.basketDeals')"
          >
            <div
              class="col-12 col-sm-6 col-md-3 col-lg-3 supplier-content"
              v-for="(deal, index) in basketDealData"
              :key="index"
            >
              <BasketBestDeals
                :deal="deal"
                :dealType="pageTitle"
                @getWishlistData="getBasketOffers"
              ></BasketBestDeals>
            </div>
          </div>
          <div
            class="row suppliers-data"
            v-else-if="pageTitle == $t('profile.dailyOffers')"
          >
            <div
              class="col-12 col-sm-6 col-md-3 col-lg-3 supplier-content"
              v-for="(deal, index) in basketOffer"
              :key="index"
            >
              <BestDeals
                :deal="deal"
                :dealType="pageTitle"
                @getWishlistData="buyToGetAnother"
              ></BestDeals>
            </div>
          </div>
          <div
            class="row suppliers-data"
            v-else-if="pageTitle == $t('profile.monthlyOffers')"
          >
            <div
              class="col-12 col-sm-6 col-md-3 col-lg-3 supplier-content"
              v-for="(deal, index) in basketOffer"
              :key="index"
            >
              <BestDeals
                :deal="deal"
                :dealType="pageTitle"
                @getWishlistData="buyToGetAnother"
              ></BestDeals>
            </div>
          </div>
          <div class="row suppliers-data" v-else>
            <div
              class="col-12 col-sm-6 col-md-3 col-lg-3 supplier-content"
              v-for="(deal, index) in basketOffer"
              :key="index"
            >
              <BestDeals
                :deal="deal"
                :dealType="`${$t('profile.buy')} 
                    ${deal.buy_get_promotion_running_by_type.promotion.buy_x} 
                    ${$t('profile.get')} ${deal.buy_get_promotion_running_by_type.promotion.get_y}`"
                @getWishlistData="buyToGetAnother"
              ></BestDeals>
            </div>
          </div>
        </div>

        <div
          v-if="pageTitle == $t('profile.basketDeals')"
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
        <div
          v-else-if="pageTitle == $t('profile.dailyOffers')"
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
        <div
          v-else-if="pageTitle == $t('profile.monthlyOffers')"
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
        <div
          v-else
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
import BasketBestDeals from "@/components/pages/BasketBestDeals.vue";
import Paginate from "@/components/global/Paginate.vue";
export default {
  data() {
    return {
      pageTitle: this.$route.query.type,
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
      basketDealData: null,
      basketDataLength: null,
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
    /**
     * @vuese
     * basket deals
     */

    getBasketOffers() {
      profile
        .getBasketOffers()
        .then((resp) => {
          this.basketDealData = resp.data.items.data;
          this.basketDataLength = resp.data.items.data.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    
    /**
     * @vuese
     * on Page Change function for pagination
     */
    onPageChange(page) {
      // on Page Change function for pagination
      this.page = page;
      if (this.pageTitle == this.$t("profile.basketDeals")) {
        this.getBasketOffers();
      } else {
        this.buyToGetAnother();
      }
    },
    /**
     * @vuese
     * on Change Records PerPage function for pagination
     */
    onChangeRecordsPerPage() {
      // on Change Records PerPage function for pagination to get data again
      if (this.pageTitle == this.$t("profile.basketDeals")) {
        this.getBasketOffers();
      } else {
        this.buyToGetAnother();
      }
    },
    /**
     * @vuese
     * go to Page function for pagination
     */
    gotoPage() {
      // go to Page function for pagination
      if (!isNaN(parseInt(this.enterpageno))) {
        this.page = parseInt(this.enterpageno);
        if (this.pageTitle == this.$t("profile.basketDeals")) {
        this.getBasketOffers();
      } else {
        this.buyToGetAnother();
      }
      }
    },
  },
  mounted() {
    this.buyToGetAnother();
    this.getBasketOffers();
  },
  components: {
    BestDeals,
    Paginate,
    BasketBestDeals,
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
