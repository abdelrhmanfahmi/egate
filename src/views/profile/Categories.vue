<template>
  <!-- profile categories page  -->
  <div class="profile-categories">
    <!-- <div class="categories-info">
      <small>{{ $t("profile.welcomeAgain") }} </small>
      <h4 class="main-header">{{ $t("profile.categories") }}</h4>
    </div> -->

    <!-- <NewHomeSlider /> -->
    <NewSearch />

    <b-tabs content-class="mt-3">
      <!-- product specifications tab  -->
      <b-tab :title="$t('profile.categories')" active>
        <div class="">
          <b-row v-if="loading">
            <b-col lg="3" sm="6" v-for="x in 10" :key="x">
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
          <b-row v-else>
            <b-col
              v-for="category in categories"
              :key="category.id"
              lg="3"
              sm="6"
              class="custum-padding"
            >
              <router-link :to="`/categories/${category.id}`">
                <CategoryCard
                  :card="{ type: category.title }"
                  :image="category.image_path"
                  class="homecategories"
                />
              </router-link>
            </b-col>
          </b-row>
        </div>
      </b-tab>
      <!-- product rating tab  -->
      <b-tab :title="$t('home.suppliers')">
        <div class="tab-data-holder">
          <b-row v-if="loading">
            <b-col class="mb-2" lg="2" sm="6" v-for="x in 10" :key="x">
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
          <div class="row suppliers-data justify-content-center" v-else>
            <div
              class="col-12 col-sm-6 col-md-4 col-lg-2 mx-2 supplier-content"
              v-for="supplier in suppliers"
              :key="supplier.id"
            >
              <SingleSupplier :supplier="supplier"></SingleSupplier>
            </div>
          </div>
          <div
            class="text-center d-flex justify-content-center align-items-center my-5"
          >
            <router-link to="/suppliers" class="border-main w-25">{{
              $t("cart.viewAll")
            }}</router-link>
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
// profile categories page
import CategoryCard from "@/components/global/CategoryCard.vue";
import categories from "@/services/categories";

// suppliers page
import SingleSupplier from "@/components/pages/suppliers/SingleSupplier.vue";
import suppliers from "@/services/suppliers";
// import NewHomeSlider from "@/components/pages/home/NewHomeSlider.vue";
import NewSearch from "@/components/pages/home/NewSearch.vue"
export default {
  components: {
    CategoryCard,
    SingleSupplier,
    NewSearch
    // NewHomeSlider
  },
  methods: {
    /**
     * get Categories function
     * @vuese
     */
    async getCategories() {
      await categories
        .getCategories("lists/categories")
        .then((resp) => {
          this.categories = resp.data.items;
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
     * this function used get Suppliers
     */
    getSuppliers() {
      this.loading = true;
      suppliers
        .getSuppliers(this.page)
        .then((resp) => {
          this.suppliers = resp.data.items.data;
          this.total = resp.data.items.total;
          this.totalPages = Math.ceil(
            resp.data.items.total / resp.data.items.per_page
          ); // Calculate total records

          this.totalRecords = resp.data.items.total;
        })
        // .catch((err) => {
        //   console.log(err);
        // })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  data() {
    return {
      loading: true,
      categories: null,
      suppliers: null,

      perPage: 5,
      total: 0,
      currentPage: 1,

      page: 1,
      totalPages: 0,
      totalRecords: 0,
      recordsPerPage: 10,
      enterpageno: "",
    };
  },
  mounted() {
    this.getCategories();
    this.getSuppliers();
  },
};
</script>

<style lang="scss" scoped>
.profile-categories {
  text-align: center;

  .categories-info {
    padding-bottom: 30px;
    small {
      color: $main-color;
      font-size: 12px;
      text-transform: uppercase;
    }
    .main-header {
      text-transform: uppercase;
    }
  }
  .custum-padding {
    padding-right: 0px;
    padding-left: 0px;
    padding-bottom: 0px;
    img {
      opacity: 0.5;
    }
  }
}
.border-main{
  padding: 20px;
  border: 2px solid $main-color;
  outline: none;
  box-shadow: none;
  border-radius: 10px;
  color: $main-color;
  font-size: 18px;
  background: transparent;
  text-transform: capitalize;
  @media(max-width:992px){
      width:95% !important
  }
}
</style>
