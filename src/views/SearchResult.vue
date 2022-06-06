<template>
  <div>
    <div class="container">
      <div class="text-center my-5">
        <h1>
          {{ $t("profile.searchResult") }}
        </h1>
      </div>
      <div class="" v-if="categoriesLength > 0">
        <div class="data-holder py-5">
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
            <div class="categories" v-if="categoriesLength > 0">
              <h2 class="my-4">
                {{ $t("profile.categories") }}
              </h2>
              <div class="row">
                <div
                  :title="category.title"
                  v-for="category in categories"
                  :key="category.id"
                  class="custum-padding mb-3 col-md-3 col-sm-12"
                >
                  <router-link
                    :to="`/categories/${category.id}/variants`"
                    v-if="category.id"
                  >
                    <CategoryCard
                      v-if="category"
                      :card="{ type: category.title }"
                      :image="category.image_path"
                    />
                  </router-link>
                </div>
              </div>
            </div>
            <div class="products mt-5" v-if="productsLength > 0">
              <h2 class="my-4">
                {{ $t("profile.products") }}
              </h2>
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
                          {{ product.product_details_by_type.customer_price }}</small
                        >
                        <br>
                      <small>
                        {{ product.product_details_by_type.price_before_discount }}</small
                      >
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>

              <div class="text-center">
                <router-link
                  class="load-more border-0 rounded-0 py-4 px-5 my-4 mx-0 d-inline-block"
                  :to="{
                    path: `/Search-Products`,
                    query: { keyword: $route.query.keyword },
                  }"
                >
                  {{ $t("supplier.more") }}
                </router-link>
              </div>
            </div>
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
import CategoryCard from "@/components/global/CategoryCard.vue";
export default {
  components: {
    CategoryCard,
  },
  data() {
    return {
      loading: false,
      categories: false,
      categoriesLength: 0,
      products: null,
      productsLength: 0,
      keyword: this.$route.query.keyword,
    };
  },
  methods: {
    async searchResult() {
      this.loading = true;
      let data = {
        keyword: this.$route.query.keyword,
      };
      await categories
        .searchResult(data)
        .then((resp) => {
          console.log(resp);
          this.categories = resp.data.items.categories;
          this.categoriesLength = resp.data.items.categories.length;

          this.products = resp.data.items.products;
          this.productsLength = resp.data.items.products.length;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  created() {
    this.searchResult();
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
.load-more {
  background: #fff;
  color: #312620;
  font-size: 14px;
  box-shadow: 0px 3px 27px 0px rgb(0 0 0 / 17%);
  &:hover {
    background: #ed2124;
    color: #fff;
  }
}
</style>
