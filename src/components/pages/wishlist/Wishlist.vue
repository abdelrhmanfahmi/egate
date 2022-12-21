<template>
  <!-- favorite page  component  -->
  <div class="cart text-center">
    <div class="d-flex justify-content-center align-items-center flex-column" v-if="loadingOne">
      <img src="@/assets/images/BeanLoading2.gif" alt="cart-image" class="w-25" />
    </div>
    <div class="" v-else>
      <div class="" v-if="wishlistItems !== null">
        <h5 class="heading py-5 text-center">{{ $t("cart.wishlist") }}</h5>
        <div class="cart-table p-4">
          <div class="suppliers py-4">
            <div class="container">
              <b-row v-if="loading">
                <b-col class="mb-2" lg="3" sm="6" v-for="x in 10" :key="x">
                  <b-skeleton-img></b-skeleton-img>
                  <b-card>
                    <b-skeleton animation="fade" width="60%" class="border-none"></b-skeleton>
                    <b-skeleton animation="fade" width="85%" class="border-none"></b-skeleton>
                  </b-card>
                </b-col>
              </b-row>
              <div class="row suppliers-data" v-else>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 supplier-content" v-for="(item, index) in wishlistItems"
                  :key="index">
                  <div class="single-supplier bg-white position-relative" v-if="item">
                    <div class="supplier-data">
                      <div class="thumb">
                        <router-link :to="{ path: '/details', query: { id: item.id } }">
                          <div class="d-block text-center" v-if="
                            item.product_supplier.image_path
                              ? item.product_supplier.image_path
                              : item.product_supplier.image
                          ">
                            <img :src="item.image_path" alt="wishlist-product-image" />
                          </div>
                          <div class="" v-else>
                            <img src="@/assets/images/wishlist.png" alt="wishlist-product" />
                          </div>
                        </router-link>
                        <div class="d-flex justify-content-between align-items-center">
                          <p class="supplier-name text-center mt-3 text-capitalize mb-0">
                            {{ item.product_supplier.company_name }}
                          </p>
                          <div class="actions" @click="removeFromWishlist(item)">
                            <span class="action-icon">
                              <font-awesome-icon icon="fa-solid fa-trash" />
                            </span>
                          </div>
                        </div>
                        <p v-if="$i18n.locale == 'ar'">
                          {{ item.product_supplier.short_description_ar }}
                        </p>
                        <p v-if="$i18n.locale == 'en'">
                          {{ item.product_supplier.short_description_en }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <pagination :per-page="perPage" :total="total"></pagination> -->

              <div class="text-center d-flex justify-content-center align-items-center mt-5">
                <!-- <b-pagination
            v-model="currentPage"
            pills
            :total-rows="total"
            :per-page="perPage"
            size="lg"
          ></b-pagination> -->
                <Paginate v-if="wishlistItems" :total-pages="totalPages" :per-page="totalPages" :current-page="page"
                  @pagechanged="onPageChange" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center flex-column" v-else>
        <img src="@/assets/images/wishlist.png" alt="cart-image" />
        <!-- <h3 class="m-0">
          {{ $t("cart.noCartProducts") }}
        </h3> -->
      </div>
    </div>
  </div>
</template>

<script>
import globalAxios from "@/services/global-axios";
import Paginate from "@/components/global/Paginate.vue";

export default {
  components: { Paginate },
  data() {
    return {
      loadingOne: false,
      productLoading: false,

      loading: false,
      perPage: 5,
      total: 0,
      currentPage: 1,

      page: 1,
      totalPages: 0,
      totalRecords: 0,
      recordsPerPage: 10,
      enterpageno: "",
      wishlistItems: null,
    };
  },
  mounted() {
    
    if(this.buyerUserData){
      this.getWishlistProducts();
    }
  },
  methods: {
    /**
      *  add product to favorite
    */
    getWishlistProducts() {
      this.loadingOne = false;
      this.loading = true;
      globalAxios
        .get(`members/profile/favorite`)
        .then((resp) => {
          console.log(resp);
          this.wishlistItems = resp.data.items.data;
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
    /**
      *  remove product from favorite
    */
    removeFromWishlist(product) {
      this.$store.dispatch("wishlist/removeProductFromWishlist", {
        myItem: product.product_supplier,
      });
      this.loading = true;
      this.wishlistItems = null;
      setTimeout(() => {
        this.getWishlistProducts();
      }, 1000);
      setTimeout(() => {
        this.loading = false;
      }, 1200);
    },
    /**
      *  when page changed  ,  refresh data
    */
    onPageChange(page) {
      this.page = page;
      this.getWishlistProducts();
    },
    /**
      *  when paginate 
    */
    onChangeRecordsPerPage() {
      this.getWishlistProducts();
    },
    /**
      *  when paginate 
    */
    gotoPage() {
      if (!isNaN(parseInt(this.enterpageno))) {
        this.page = parseInt(this.enterpageno);
        this.getWishlistProducts();
      }
    },
  },
  computed: {
    /**
      *  get data from api 
    */
    cart_sub_total() {
      return this.total_cart.cart_sub_total
        ? this.total_cart.cart_sub_total
        : this.$store.state.cart.cart_sub_total;
    },
    totalDiscount() {
      return this.total_cart.cart_sub_total_disc
        ? this.total_cart.cart_sub_total_disc
        : this.discount;
    },
    totalPayment() {
      return this.total_cart.cart_sub_total_after_disc
        ? this.total_cart.cart_sub_total_after_disc
        : this.cart_sub_total;
    },
    newPrice() {
      return this.total_cart;
    },

    freeDeliveryStatus() {
      return sessionStorage.setItem("freeDelivery", this.freeDelivery);
    },
  },
};
</script>
<style lang="scss" scoped>
/**
      *  component style
    */
.single-supplier {
  box-shadow: 0px 0px 4px 0px rgb(0 0 0 / 11%);
  padding: 1rem;

  .supplier-data {
    .thumb {
      color: #000;

      a {
        display: block;
        text-align: center;

        img {
          color: #000;
          width: 100% !important;
          height: 273px;
        }
      }

      .supplier-name {
        transition: all 0.3s ease 0s;
        margin: 0;
      }
    }

    &::before {
      background: rgba(255, 255, 255, 0.3);
      bottom: 50%;
      content: "";
      left: 0;
      position: absolute;
      right: 0;
      pointer-events: none;
      top: 50%;
      opacity: 1;
      width: 0;
      -webkit-transition: all 900ms linear;
      -o-transition: all 900ms linear;
      transition: all 900ms linear;
    }

    &:hover {
      &::before {
        top: 0;
        bottom: 0;
        opacity: 0;
        width: auto;
        -webkit-transition: all 900ms linear;
        -o-transition: all 900ms linear;
        transition: all 900ms linear;
      }
    }
  }
}

.heading {
  color: #312620;
  font-size: 28pt;
}

.actions {
  color: #000;

  .action-icon {
    font-size: 12pt;
    cursor: pointer;
  }
}
</style>
