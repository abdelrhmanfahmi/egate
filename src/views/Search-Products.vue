<template>
  <div>
    <div class="container"> 
      <div class="text-center my-5">
        <h1>
          {{ $t("profile.searchResult") }}
        </h1>
      </div>
      <div class="" v-if="productsLength > 0">
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
          <div class="products mt-5">
            <div class="row">
              <div
                :title="product.title"
                v-for="product in products"
                :key="product.id"
                class="custum-padding mb-3 col-md-3 col-sm-12"
              >
                <router-link
                  :to="{ path: '/details', query: { id: product.id } }"
                  v-if="product.id"
                  class="text-dark"
                >
                  <div class="" v-if="product">
                    <div>
                      <b-img-lazy
                        v-if="product.product.image_path"
                        :src="product.product.image_path"
                        class="img-fluid"
                        alt="image"
                      ></b-img-lazy>
                    </div>

                    <div class="" v-if="product.product">
                      <small>{{ product.product.title }}</small>
                    </div>
                    <div class="" v-if="product.product_details_by_type">
                      <small>
                        {{ product.product_details_by_type.price }}</small
                      >
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div
            class="text-center d-flex justify-content-center align-items-center mt-5"  v-if="products.length >= perPage"
          >
            <Paginate
              v-if="products"
              :total-pages="totalPages"
              :per-page="totalPages"
              :current-page="page"
              @pagechanged="onPageChange"
            />
          </div>
        </div>
      </div>
      <div class="" v-else>
        <div class="text-center my-5">
          <h4>
            {{ $t("profile.searchNoResult") }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import categories from "@/services/categories";
import Paginate from "@/components/global/Paginate.vue";
export default {
  methods: {
    async searchResult() {
      this.loading = true;
      let data = {
        keyword: this.$route.query.keyword,
      };
      await categories
        .searchAllProducts(data)
        .then((resp) => {
          // console.log(resp);
          this.products = resp.data.items.data;
          this.productsLength = resp.data.items.data.length;

          this.total = resp.data.items.total;
          this.totalPages = Math.ceil(
            resp.data.items.total / resp.data.items.per_page
          ); // Calculate total records

          this.totalRecords = resp.data.items.total;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onPageChange(page) {
      this.page = page;
      this.searchResult();
    },
    onChangeRecordsPerPage() {
      this.searchResult();
    },
    gotoPage() {
      if (!isNaN(parseInt(this.enterpageno))) {
        this.page = parseInt(this.enterpageno);
        this.searchResult();
      }
    },
  },
  data() {
    return {
      loading: false,
      products: null,
      productsLength: 0,

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
  created() {
    this.searchResult();
  },
  components: {
    Paginate,
  },
  computed: {
    rows() {
      return this.products.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.custum-padding {
  a {
    background: transparent !important;
    border: none;
    font-size: 25px;
    text-align: center;
    text-decoration: none;
  }
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: contain;
  }
}
</style>
