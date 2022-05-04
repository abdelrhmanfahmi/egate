<template>
  <div class="items-body">
    <div class="container">
      <div
        class="navigation d-none d-lg-flex justify-content-center align-items-center w-75 mx-auto my-4"
      >
        <!-- <button
          class="prev btn btn-light shadow-none bg-transparent border-none outline-none"
          @click="prevPage"
          :disabled="pageId == 1"
        >
          <span>&#60;</span>{{ $t("items.prev") }}
        </button> -->
        <nav aria-label="breadcrumb " v-if="productInfo">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/">
                {{ $t("items.home") }}
              </router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link :to="catId">
                {{ productInfo.parent_category.title }}
              </router-link>
            </li>
            <!-- <li class="breadcrumb-item active" aria-current="page">
              {{ productInfo.title }}
            </li> -->
          </ol>
        </nav>
        <!-- <span
          @click="nextPage"
          class="next btn btn-light shadow-none bg-transparent border-none outline-none"
          >{{ $t("items.next") }}<span>&#62;</span></span
        > -->
      </div>
      <div class="content">
        <b-row
          align-h="center"
          align-v="center"
          class="py-5"
          v-if="productInfo"
        >
          <b-col cols="12" lg="6" xl="5" class="item-content">
            <!-- <a href="#" class="link">{{ $t("items.category") }}</a> -->
            <h5 class="name" v-if="productInfo.title">
              {{ productInfo.title }}
            </h5>
            <p class="description" v-if="productInfo.description">
              {{ productInfo.description }}
            </p>
            <!-- <p class="description">
              {{ $t("items.description") }}
            </p> -->
            <div class="customize">
              <div class="customize-selection">
                <!-- <b-form-select
                  v-model="product.id"
                  v-for="product in productInfo.variants" :key="product.id"
                  :options="product.title"
                ></b-form-select> -->
                <div
                  v-for="variant in productInfo.variants"
                  :key="variant.id"
                  class="mb-3"
                >
                  <form action="">
                    <label for="select">{{ variant.title }}</label>
                    <b-form-group>
                      <b-form-select
                        v-model="variant.selectedVariance"
                        @change="changeVariance(variant)"
                        class="mb-3"
                      >
                        <b-form-select-option selected  :value="''">
                          {{ $t("cart.selectOption") }}
                        </b-form-select-option>
                        <b-form-select-option
                          v-for="pro in variant.options"
                          :key="pro.id"
                          :value="pro.id"
                        >
                          <span v-if="pro.title">{{ pro.title }}</span>
                        </b-form-select-option>
                      </b-form-select>
                    </b-form-group>
                  </form>
                </div>
                <!-- <b-form-select
                  v-for="product in productInfo.variants"
                  :key="product.id"
                  v-model="selectedProduct"
                  class="mb-3"
                >
                  <b-form-select-option selected disabled :value="null">
                    {{ $t("cart.selectOption") }}
                  </b-form-select-option>
                  <b-form-select-option
                    v-for="pro in product.options"
                    :key="pro.id"
                    :value="pro.id"
                  >
                    <span v-if="pro.title">{{ pro.title }}</span>
                  </b-form-select-option>
                </b-form-select>
                selectedProduct : {{ selectedProduct }} -->
              </div>
            </div>
          </b-col>
          <b-col
            cols="12"
            lg="6"
            xl="5"
            class="item-media mt-3 m-lg-0"
            v-if="productInfo.image_path !== null"
          >
            <img :src="productInfo.image_path" alt="item-name" />
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="products text-center" v-if="products.length > 0">
      <h4 class="header font-weight-bold my-5">{{ $t("items.products") }}</h4>
      <b-row v-if="loading">
        <b-col class="mb-2 mx-auto" sm="12" v-for="x in 4" :key="x">
          <b-card>
            <b-skeleton
              animation="fade"
              width="80%"
              class="border-none"
            ></b-skeleton>
            <b-skeleton
              animation="fade"
              width="95%"
              class="border-none"
            ></b-skeleton>
          </b-card>
        </b-col>
      </b-row>
      <div class="products-table" v-else>
        <!-- <b-table
          selectable
          @row-clicked="onRowSelected"
          bordered
          hover
          :items="products"
          :fields="tableFields"
          stacked="lg"
        >
          <template #cell(item)="data">
            <a href="#">{{ data.value }}</a>
          </template>
          <template #cell(image_path)="data">
            <img :src="data.value" class="product-image" />
          </template>
          <template #cell(supplier)="data">
            <span v-if="data.value">{{ data.value }} </span>
            <span v-else>
              {{ $t("cart.noData") }}
            </span>
          </template>
          <template #cell(unit)="data">
            {{ data.value }}
          </template>

          <template #cell(price)="data">
            <span
              v-if="
                (data.value > 0 &&
                  userData.profile_percentage == 100 &&
                  userData.type === 'buyer') ||
                userData.type === 'b2b'
              "
              >{{ data.value }} {{ currency }}</span
            >
            <span v-else>
              {{ $t("cart.noData") }}
            </span>
          </template>
          <template #cell(currency) colspan="2">
            {{ currency }}
          </template>
          <template #cell(quantity)="data">
            <Variants-Counter
              v-if="
                data.item.product_details_by_type.add_type == 'cart' ||
                data.item.product_details_by_type.add_type == 'both'
              "
              class="justify-content-center"
              :quantity="1"
              @changeCount="ChangeCounter($event)"
            ></Variants-Counter>
            <p
              v-else-if="
                data.item.product_details_by_type.add_type !== 'cart' ||
                data.item.product_details_by_type.add_type !== 'both'
              "
            >
              -
            </p>
          </template>
          <template #cell(addTo)="data">
            <div
              class="add-to d-flex justify-content-center"
              v-if="
                (userData.profile_percentage === 100 &&
                  userData.type === 'buyer') ||
                userData.type === 'b2b'
              "
            >
              <a
                @click="addToCart(data.item)"
                v-if="
                  data.item.product_details_by_type.add_type === 'cart' ||
                  data.item.product_details_by_type.add_type === 'both'
                "
              >
                <span>{{ $t("items.addToCart") }}</span>
                <font-awesome-icon icon="fa-solid fa-cart-shopping" />
              </a>
              <a @click="addToWishlist()"
                ><font-awesome-icon icon="fa-solid fa-star"
              /></a>
              <a href="#"> <font-awesome-icon icon="fa-solid fa-check" /> </a>
            </div>
            <div class="" v-else>
              <router-link to="/profile/account-information-b2b">
                {{ $t("profile.completeAccount") }}
              </router-link>
            </div>
          </template>
        </b-table> -->
        <table
          class="table table-striped table-hover table-bordered selectable"
        >
          <thead>
            <tr>
              <th scope="col" v-for="(tab, index) in tableFields" :key="index">
                {{ tab.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <td>
                <router-link
                  class="link font-weight-bold text-danger"
                  :to="{ path: '/details', query: { id: product.id } }"
                >
                  {{ product.product.title }}
                </router-link>
              </td>
              <td>
                <router-link
                  v-if="product.image_path !== null"
                  class="link"
                  :to="{ path: '/details', query: { id: product.id } }"
                >
                  <img
                    :src="product.image_path"
                    class="product-image"
                    alt="product-image"
                  />
                </router-link>
                <router-link
                  v-else-if="
                    product.image_path == null && product.product.image_path
                  "
                  class="link"
                  :to="{ path: '/details', query: { id: product.id } }"
                >
                  <img
                    :src="product.product.image_path"
                    class="product-image"
                    alt="product-image"
                  />
                </router-link>
              </td>
              <td>
                <router-link
                  class="link"
                  :to="{ path: '/details', query: { id: product.id } }"
                >
                  {{ product.client.company_name }}
                </router-link>
              </td>
              <td>
                <router-link
                  v-if="product.unit"
                  class="link"
                  :to="{ path: '/details', query: { id: product.id } }"
                >
                  {{ product.unit.title }}
                </router-link>
                <div v-else class="link">-</div>
              </td>
              <td>
                <div
                  class=""
                  v-if="
                    (userData &&
                      userData.profile_percentage == 100 &&
                      userData.type === 'buyer') ||
                    userData.type === 'b2b' ||
                    (userData.type === 'supplier' && userData.is_buyer == true)
                  "
                >
                  <router-link
                    class="link"
                    :to="{ path: '/details', query: { id: product.id } }"
                  >
                    {{ product.product_details_by_type.customer_price }}
                    {{ currency }}
                  </router-link>
                </div>
                <div
                  class=""
                  v-else-if="
                    (userData && userData.profile_percentage !== 100) ||
                    (userData &&
                      userData.type === 'buyer' &&
                      userData.profile_percentage !== 100) ||
                    (userData &&
                      userData.type === 'b2b' &&
                      userData.profile_percentage !== 100) ||
                    (userData &&
                      userData.type === 'supplier' &&
                      userData.is_buyer !== true &&
                      userData.profile_percentage !== 100)
                  "
                >
                  -
                </div>
                <div class="" v-else-if="!userData || userData.type === 'b2c'">
                  <router-link
                    class="link"
                    :to="{ path: '/details', query: { id: product.id } }"
                  >
                    {{ product.product_details_by_type.customer_price }}
                    {{ currency }}
                  </router-link>
                </div>
              </td>
              <td>
                <Variants-Counter
                  v-if="
                    product.product_details_by_type.add_type === 'cart' ||
                    product.product_details_by_type.add_type === 'both'
                  "
                  class="justify-content-center"
                  :quantity="1"
                  @changeCount="ChangeCounter($event)"
                ></Variants-Counter>
                <p v-else>-</p>
              </td>
              <td>
                <div
                  class="add-to d-flex justify-content-center"
                  v-if="
                    (userData &&
                      userData.profile_percentage == 100 &&
                      userData.type === 'buyer') ||
                    userData.type === 'b2b' ||
                    (userData.type === 'supplier' && userData.is_buyer == true)
                  "
                >
                  <a
                    @click="addToCart(product)"
                    v-if="
                      product.product_details_by_type.add_type === 'cart' ||
                      product.product_details_by_type.add_type === 'both'
                    "
                  >
                    <span>{{ $t("items.addToCart") }}</span>
                    <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                  </a>
                  <a @click="addToWishlist()"
                    ><font-awesome-icon icon="fa-solid fa-star"
                  /></a>
                  <!-- <a href="#"> <font-awesome-icon icon="fa-solid fa-check" /> </a> -->
                </div>
                <div
                  class="d-flex justify-content-center"
                  v-else-if="
                    (userData && userData.profile_percentage !== 100) ||
                    (userData &&
                      userData.type === 'buyer' &&
                      userData.profile_percentage !== 100) ||
                    (userData &&
                      userData.type === 'b2b' &&
                      userData.profile_percentage !== 100) ||
                    (userData &&
                      userData.type === 'supplier' &&
                      userData.is_buyer !== true &&
                      userData.profile_percentage !== 100)
                  "
                >
                  <router-link to="/profile/account-information-b2b">
                    {{ $t("profile.completeAccount") }}
                  </router-link>
                </div>
                <div
                  class="add-to d-flex justify-content-center"
                  v-else-if="!userData || userData.type === 'b2c'"
                >
                  <a
                    @click="addToCart(product)"
                    v-if="
                      product.product_details_by_type.add_type === 'cart' ||
                      product.product_details_by_type.add_type === 'both'
                    "
                  >
                    <span>{{ $t("items.addToCart") }}</span>
                    <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                  </a>
                </div>
              </td>
              <!-- <transition name="modal">
                <div class="modal-mask" v-if="showModal">
                  <modal @close="closeModal" :product="product" />
                </div>
              </transition> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="most-sold text-center" v-if="supplierProductsLength > 0">
      <div class="container">
        <h4 class="header font-weight-bold mt-5 mb-3">
          {{ $t("items.products") }}
        </h4>
        <hr />
        <b-row class="justify-content-center justify-content-sm-between">
          <b-col
            cols="10"
            sm="6"
            lg="4"
            xl="2"
            v-for="(item, index) in supplierProducts"
            :key="index"
          >
            <Product :data="item"></Product
          ></b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import categories from "@/services/categories";
import suppliers from "@/services/suppliers";
import VariantsCounter from "@/components/global/variantsCounter.vue";
import Product from "@/components/pages/supplier/products/Product.vue";
import globalAxios from "@/services/global-axios";

// import modal from "@/components/cart/cartModal.vue";
// import { mapActions } from "vuex";
export default {
  data() {
    return {
      id: this.$route.params.slug,
      pageId: this.$route.params.slug,
      products: [],
      productInfo: null,
      selectedVariance: null,
      loading: false,
      variants: null,
      items: [
        {
          text: this.$t("items.home"),
          href: "/humhum-user",
        },
        {
          text: this.$t("items.category"),
          href: "#",
        },
        {
          text: this.$t("items.fruit"),
          active: true,
        },
      ],
      selected: null,
      types: [
        { value: null, text: this.$t("items.optionSelect") },
        { value: "a", text: "First option" },
        { value: "b", text: "Second option" },
        { value: "c", text: "Third option" },
        { value: "d", text: "Fourth option" },
      ],
      tableFields: [
        // {
        //   key: "",
        //   // key: "condition",
        //   label: this.$t("items.item"),
        // },
        {
          key: "product.title",
          label: this.$t("items.item"),
        },
        {
          key: "image_path",
          label: this.$t("items.image"),
        },
        {
          key: "client.company_name",
          label: this.$t("items.supplier"),
        },
        {
          key: "unit.title",
          label: this.$t("items.unit"),
        },
        {
          key: "product_details_by_type.customer_price",
          label: this.$t("items.price"),
        },
        // {
        //   key: "currency",
        //   label: this.$t("cart.currency"),
        // },
        {
          key: "quantity",
          label: this.$t("items.quantity"),
        },
        {
          key: "addTo",
          label: this.$t("items.addTo"),
        },
      ],
      tableItems: [],
      product: [],
      supplierProducts: null,
      supplierProductsLength: null,
      cartCounter: 1,
      showModal: false,
      requestVariants: null,
      selectedVariants: null,
    };
  },
  components: {
    VariantsCounter,
    Product,
    // modal,
  },
  methods: {
    // ...mapActions("cart", ["addProductToCart", "addProductToWishlist"]),
    addToCart(item) {
      // this.addProductToCart({
      //   product: this.product,
      //   quantity: 1,
      // });

      let data = {
        product_supplier_id: item.product_details_by_type.product_supplier_id,
        quantity: this.cartCounter !== null ? this.cartCounter : 1,
      };
      // this.$store
      //   .dispatch("cart/addProductToCart", {
      //     product: item,
      //     quantity: this.cartCounter !== null ? this.cartCounter : 1,
      //   })
      //   .then((res) => {
      //     if (res.status == 200) {
      //       this.$modal.show(
      //         () => import("@/components/cart/cartModal.vue"),
      //         {
      //           product: item,
      //         },
      //         { width: "700", height: "auto", adaptive: true }
      //       );
      //     }
      //   });

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
    addToWishlist() {
      // this.addProductToWishlist({
      //   product: this.product,
      //   quantity: 1,
      // });
    },
    closeModal() {
      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
    },
    ChangeCounter(cartCounter) {
      this.cartCounter = cartCounter;
    },
    changeVariance() {
      // console.log(product.title.replace(/\s/g, "-"));
      console.log("productInfo", this.productInfo);
      let myVariants = [];
      for (let index = 0; index < this.productInfo.variants.length; index++) {
        const element = this.productInfo.variants[index].selectedVariance;
        let myNewData = `category_options[${index}]=${element}`;

        if (!myNewData.includes("null")) {
          myVariants.push(myNewData);
        }
      }
      this.selectedVariants = myVariants.join("&");

      this.loading = true;
      categories
        .getCategoryProducts(this.pageId, this.selectedVariants)
        .then((res) => {
          console.log("products", res);
          this.products = res.data.items.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getCategoryProducts() {
      this.loading = true;
      categories
        .getCategoryProducts(this.pageId)
        .then((res) => {
          console.log("products", res);
          this.products = res.data.items.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getSingleProductDetails() {
      categories
        .getSingleProductDetails(this.pageId)
        .then((res) => {
          console.log("res test ", res);
          this.productInfo = res.data.items;
          let variantData = res.data.items.variants;
          for (let index = 0; index < variantData.length; index++) {
            // this.variants = variantData[index];
            this.productInfo.variants[index].selectedVariance = null;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateId() {
      this.pageId = this.$route.params.slug;
    },
    prevPage() {
      let prevUrl = this.pageId;
      if (prevUrl > 0) {
        this.pageId = parseInt(this.pageId) - 1;

        this.$router.replace(`/categories/${this.pageId}/variants`);
        this.getCategoryProducts();
        setTimeout(() => {
          location.reload();
        }, 200);
      }
    },
    onRowSelected(item) {
      this.$router.push({
        path: "/details",
        query: { id: item.id },
      });
    },
    nextPage() {
      this.pageId = parseInt(this.pageId) + 1;

      this.$router.replace(`/categories/${this.pageId}/variants`);
      this.getCategoryProducts();

      setTimeout(() => {
        location.reload();
      }, 200);
    },
    postVariance() {
      // let selectedVariance = [];
      // axios.post('')
    },
    getSupplierProducts() {
      suppliers
        .getSupplierProducts(this.id)
        .then((resp) => {
          this.supplierProducts = resp.data.items.data;
          this.supplierProductsLength = resp.data.items.data.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getCategoryProducts();
    this.getSingleProductDetails();
    this.getSupplierProducts();
  },
  watch: {
    $route: "updateId",
  },
  computed: {
    catId() {
      return sessionStorage.getItem("catId")
        ? `/categories/${sessionStorage.getItem("catId")}`
        : "/";
    },
  },
};
</script>

<style lang="scss" scoped>
.items-body {
  color: #000;
  .content {
    color: #000;
    .item-content {
      color: #000;
      .link {
        color: #403a37;
        font-size: 11pt;
        margin-bottom: 0.5rem;
      }
      .name {
        color: #312620;
        font-weight: 600;
        margin-bottom: 2rem;
        font-size: 20pt;
      }
      .description {
        font-size: 11pt;
        color: #676565;
        margin-bottom: 1rem;
      }
      .customize {
        color: #000;
        .customize-selection {
          label {
            color: #7e7e7e;
            cursor: pointer;
            font-size: 10pt;
            margin-bottom: 0;
            margin-top: 0.5rem;
          }
          select {
            height: 2.3rem;
          }
        }
      }
    }
    .item-media {
      color: #000;
      img {
        color: #000;
      }
    }
  }
}
.products {
  .header {
    color: #312620;
  }
  .add-to {
    color: #000;
    a {
      background: #fff;
      color: #312620;
      box-shadow: 0px 1px 5px 0px rgb(0 0 0 / 10%);
      padding: 1rem 2rem;
      border-radius: 0.2rem;
      margin: 0 0.3rem;
      &:hover {
        color: #ed2124;
      }
      span {
        margin-inline-end: 0.5rem;
      }
    }
  }
}
.product-image {
  width: 150px;
  height: 125px;
  object-fit: cover;
}
.items-body
  .content
  .item-content
  .customize
  .customize-selection
  select[data-v-74400477] {
  height: 3rem;
}
.link {
  color: #403a37;
  font-size: 11pt;
  margin-bottom: 0.5rem;
}
</style>
