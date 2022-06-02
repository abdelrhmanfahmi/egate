<template>
  <div>
    <!-- <b-table hover :items="wishlistItems" :fields="fields" stacked="lg">
      <template #cell(image)="data">
        <img :src="data.value" class="product-img" />
      </template>
      <template #cell(product)="data">
        <a href="#" class="product-name">{{ data.value }}</a>
      </template>
      <template #cell(price)="data">
        <p>{{ data.value }} {{ currency }}</p>
      </template>
      <template #cell(action)="data">
        <div class="actions d-flex">
          <b-button @click="removeItem(data.index)">
            <font-awesome-icon icon="fa-solid fa-trash-can" />
          </b-button>

          <b-button>
            <font-awesome-icon icon="fa-solid fa-cart-shopping" />
          </b-button>
        </div>
      </template>
    </b-table> -->
    <div class="">
      <div class="" v-if="wishlistItems !== null">
        <h5 class="heading py-5 text-center">{{ $t("profile.favorite") }}</h5>
        <div class="cart-table">
          <div class="suppliers py-4">
            <div class="container">
              <!-- <b-row v-if="loading">
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
              <div class="row suppliers-data" v-else>
                <div
                  class="col-12 col-sm-6 col-md-4 col-lg-3 supplier-content"
                  v-for="(item, index) in wishlistItems"
                  :key="index"
                >
                  <div
                    class="single-supplier bg-white position-relative"
                    v-if="item"
                  >
                    <div class="supplier-data">
                      <div class="thumb">
                        <router-link
                          :to="{ path: '/details', query: { id: item.id } }"
                        >
                          <div
                            class="d-block text-center"
                            v-if="
                              item.product_supplier.image_path
                                ? item.product_supplier.image_path
                                : item.product_supplier.image
                            "
                          >
                            <img
                              :src="item.image_path"
                              alt="wishlist-product-image"
                            />
                          </div>
                          <div class="" v-else>
                            <img
                              src="@/assets/images/wishlist.png"
                              alt="wishlist-product"
                            />
                          </div>
                        </router-link>
                        <div
                          class="d-flex justify-content-between align-items-center"
                        >
                          <p
                            class="supplier-name text-center mt-3 text-capitalize mb-0"
                          >
                            {{ item.product_supplier.company_name }}
                          </p>
                          <div
                            class="actions"
                            @click="removeFromWishlist(item)"
                          >
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
              </div> -->

              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">{{ $t("profile.productImage") }}</th>
                    <th scope="col">{{ $t("profile.productName") }}</th>
                    <th scope="col">{{ $t("profile.itemPrice") }}</th>
                    <th scope="col">{{ $t("profile.actions") }}</th>
                  </tr>
                </thead>
                <tbody v-for="(item, index) in wishlistItems" :key="index">
                  <tr>
                    <td class="text-center">
                      <p
                        v-if="item.product_supplier.product"
                        class="supplier-name text-center mt-3 text-capitalize mb-0 font-weight-bold mb-3"
                      >
                        {{ item.product_supplier.product.title }}
                      </p>

                      <router-link
                        :to="{
                          path: '/details',
                          query: { id: item.product_supplier_id },
                        }"
                      >
                        <div
                          class="d-block text-center"
                          v-if="item.product_supplier.image_path"
                        >
                          <img
                            :src="item.product_supplier.image_path"
                            alt="wishlist-product-image"
                            class="product-img"
                          />
                        </div>
                        <!-- <div class="" v-else>
                          <img
                            src="@/assets/images/wishlist.png"
                            alt="wishlist-product"
                            class="product-img"
                          />
                        </div> -->
                      </router-link>
                    </td>
                    <td class="text-center">
                      <router-link class="text-dark"
                        :to="{
                          path: '/details',
                          query: { id: item.product_supplier_id },
                        }"
                      >
                        <p
                          v-if="item.product_supplier.product"
                          class="supplier-name text-center mt-3 text-capitalize mb-0 font-weight-bold mb-3"
                        >
                          <span v-if="$i18n.locale == 'en'"
                            >{{ item.product_supplier.product.title_en }}
                          </span>
                          <span v-if="$i18n.locale == 'ar'"
                            >{{ item.product_supplier.product.title_ar }}
                          </span>
                        </p>
                      </router-link>
                    </td>
                    <td class="text-center">
                      <p>
                        {{
                          item.product_supplier.product_details[0].price
                            | fixedCurrency
                        }} {{currency}}
                      </p>
                    </td>
                    <td class="text-center">
                      <div
                        class="actions d-flex justify-content-center align-items-center"
                      >
                        <b-button @click="removeFromWishlist(item)">
                          <font-awesome-icon icon="fa-solid fa-trash-can" />
                        </b-button>

                        <b-button
                          @click="addToCart(item)"
                          v-if="
                            item.product_supplier.product_details[0]
                              .add_type === 'cart' ||
                            item.product_supplier.product_details[0]
                              .add_type === 'both'
                          "
                        >
                          <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                        </b-button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- v-if="
              myProduct.product_details_by_type.add_type === 'cart' ||
              myProduct.product_details_by_type.add_type === 'both'
            " -->
              <!-- <pagination :per-page="perPage" :total="total"></pagination> -->

              <div
                class="text-center d-flex justify-content-center align-items-center mt-5"
              >
                <!-- <b-pagination
            v-model="currentPage"
            pills
            :total-rows="total"
            :per-page="perPage"
            size="lg"
          ></b-pagination> -->
                <Paginate
                  v-if="wishlistItems"
                  :total-pages="totalPages"
                  :per-page="totalPages"
                  :current-page="page"
                  @pagechanged="onPageChange"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="d-flex justify-content-center align-items-center flex-column"
        v-else
      >
        <img src="@/assets/images/wishlist.png" alt="cart-image" />
        <!-- <h3 class="m-0">
          {{ $t("cart.noCartProducts") }}
        </h3> -->
      </div>
    </div>
  </div>
</template>

<script>
// import Counter from "../../components/global/Counter.vue";
import globalAxios from "@/services/global-axios";
import Paginate from "@/components/global/Paginate.vue";
export default {
  data() {
    return {
      fields: [
        {
          key: "image",
          label: "image",
        },
        {
          key: "product",
          label: this.$t("profile.product"),
        },
        {
          key: "price",
          label: this.$t("profile.price"),
        },
        {
          key: "action",
          label: "",
        },
      ],
      items: [
        {
          image: "http://dummyimage.com/122x100.png/cc0000/ffffff",
          product: "Ginger - Fresh",
          price: 11.2,
          quantity: 10,
          totalPrice: 112.0,
        },
        {
          image: "http://dummyimage.com/234x100.png/ff4444/ffffff",
          product: "Spice - Onion Powder Granulated",
          price: 11.2,
          quantity: 8,
          totalPrice: 89.6,
        },
        {
          image: "http://dummyimage.com/228x100.png/dddddd/000000",
          product: "Wine - Sauvignon Blanc",
          price: 5.0,
          quantity: 9,
          totalPrice: 45.0,
        },
        {
          image: "http://dummyimage.com/114x100.png/5fa2dd/ffffff",
          product: "Sorrel - Fresh",
          price: 1.2,
          quantity: 10,
          totalPrice: 12.0,
        },
        {
          image: "http://dummyimage.com/189x100.png/ff4444/ffffff",
          product: "Soup - Campbells Chicken",
          price: 9.3,
          quantity: 3,
          totalPrice: 27.9,
        },
        {
          image: "http://dummyimage.com/234x100.png/5fa2dd/ffffff",
          product: "Pasta - Bauletti, Chicken White",
          price: 21.8,
          quantity: 3,
          totalPrice: 65.4,
        },
        {
          image: "http://dummyimage.com/189x100.png/dddddd/000000",
          product: "Wine - Shiraz Wolf Blass Premium",
          price: 0.4,
          quantity: 10,
          totalPrice: 4.0,
        },
        {
          image: "http://dummyimage.com/162x100.png/5fa2dd/ffffff",
          product: "Soup Campbells - Italian Wedding",
          price: 2.4,
          quantity: 9,
          totalPrice: 21.6,
        },
        {
          image: "http://dummyimage.com/201x100.png/5fa2dd/ffffff",
          product: "Sprouts - Bean",
          price: 24.0,
          quantity: 4,
          totalPrice: 96.0,
        },
        {
          image: "http://dummyimage.com/132x100.png/dddddd/000000",
          product: "Bag - Clear 7 Lb",
          price: 7.1,
          quantity: 9,
          totalPrice: 63.9,
        },
      ],
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
  components: {
    // Counter,
    Paginate,
  },
  methods: {
    // removeItem(i) {
    //   this.items.splice(i, 1);
    // },
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
    removeFromWishlist(product) {
      // this.removeProductFromCart({
      //   product: product,
      // });
      this.$store.dispatch("wishlist/removeProductFromWishlist", {
        myItem: product.id,
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
    addToCart(item) {
      console.log(item.product_supplier.product_id);
      let data = {
        product_supplier_id: item.product_supplier.product_id,
        quantity: 1,
      };

      return globalAxios
        .post(`cart/add`, data)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);

            this.$modal.show(
              () => import("@/components/cart/cartModal.vue"),
              {
                product: item,
              },
              { width: "700", height: "auto", adaptive: true }
            );
          }
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        })
        .finally(() => {
          setTimeout(() => {
            this.$store.dispatch("cart/getCartProducts");
          }, 500);
        });
    },
    onPageChange(page) {
      this.page = page;
      this.getWishlistProducts();
    },
    onChangeRecordsPerPage() {
      this.getWishlistProducts();
    },
    gotoPage() {
      if (!isNaN(parseInt(this.enterpageno))) {
        this.page = parseInt(this.enterpageno);
        this.getWishlistProducts();
      }
    },
  },
  mounted() {
    this.getWishlistProducts();
  },
};
</script>
<style lang="scss" scoped>
.product-img {
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
}
.product-name {
  color: #312620;
  font-weight: 600;
  font-size: 12pt;
}
.actions {
  text-align: center;
  button {
    color: #000 !important;
    background-color: transparent !important;
    border: 0 !important;
  }
  svg {
    font-size: 1.2rem;
    margin: 0 5px;
    cursor: pointer;
  }
}
.heading {
  color: #312620;
  font-size: 28pt;
}
</style>
