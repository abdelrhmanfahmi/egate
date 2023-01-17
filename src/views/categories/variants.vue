<template>
  <!-- variants page after sub-categories page  -->
  <div class="items-body variants">
    <div class="container">
      <div class="navigation d-none d-lg-flex justify-content-center align-items-center w-75 mx-auto my-4">
        <!-- navigation  -->
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
          </ol>
        </nav>
      </div>
      <div class="content">
        <b-row align-h="center" align-v="start" class="py-5" v-if="productInfo">
          <!-- sub category image  -->
          <b-col cols="12" lg="6" xl="5" class="item-media mt-3 m-lg-0 slider" v-if="productInfo.image_path !== null">
            <img :src="productInfo.image_path" alt="item-name" class="img-fluid" />
          </b-col>

          <b-col cols="12" lg="6" xl="5" class="item-content product-info">
            <!-- subcategory data  -->
            <h5 class="name" v-if="productInfo.title">
              {{ productInfo.title }}
            </h5>
            <!-- if description is too long  -->
            <div v-if="productInfo.description && !readMore">
              <p class="description d-inline-block short" v-html="productInfo.description.substr(0, 1000)"></p>
              <span class="readBtn" @click="readMore = !readMore" v-if="productInfo.description.length > 1000">
                &nbsp; &nbsp; {{ $t("cart.readMore") }} &nbsp; ...</span>
            </div>
            <!-- if description is too long  -->
            <div v-else-if="productInfo.description && readMore">
              <p class="description all" v-html="productInfo.description"></p>
              <span @click="readMore = !readMore" class="readBtn">
                &nbsp; &nbsp; {{ $t("cart.readLess") }} &nbsp; ...</span>
            </div>
            <div class="customize">
              <div class="customize-selection">
                <!-- loop for sub-category variant that comes dynamically from backend  -->
                <div v-for="variant in productInfo.variants" :key="variant.id" class="mb-3">
                  <form action="">
                    <label for="select">{{ variant.title }}</label>
                    <b-form-group>
                      <b-form-select v-model="variant.selectedVariance" @change="changeVariance(variant)" class="mb-3">
                        <b-form-select-option selected :value="''">
                          {{ $t("home.All") }}
                        </b-form-select-option>
                        <b-form-select-option v-for="pro in variant.options" :key="pro.id" :value="pro.id">
                          <span v-if="pro.title">{{ pro.title }}</span>
                        </b-form-select-option>
                      </b-form-select>
                    </b-form-group>
                  </form>
                </div>
              </div>
            </div>
          </b-col>

        </b-row>
      </div>
    </div>
    <!-- sub category image  -->
    <!-- <div class="products" > -->
    <div class="products" v-if="products">
      <!-- start category name and filters  -->
      <div class="container">
        <div class="row justify-content-between align-items-center">
          <div class="col-md-6 col-sm-12">
            <h4 class="header font-weight-bold my-2">
              {{ $t("items.products") }}
            </h4>
          </div>
          <div class="col-md-6 col-sm-12 text-center my-2">
            <div class="d-flex justify-content-end align-items-center">
              <h5 @click="filteredBy = !filteredBy" class="sortBy m-2">
                <span>{{ $t("cart.filter") }}</span>
                <span>
                  <small>
                    <font-awesome-icon icon="fa-solid fa-chevron-down" />
                  </small>
                </span>
              </h5>
              <h5 @click="sortBy = !sortBy" class="sortBy m-2">
                <span>{{ $t("cart.sortBy") }}</span>
                <span>
                  <small>
                    <font-awesome-icon icon="fa-solid fa-chevron-down" />
                  </small>
                </span>
              </h5>
            </div>

            <div class="row">
              <div class="col-md-8 col-sm-12">
                <div class="row">
                  <div class="col-md-4 col-sm-12 my-2">
                    <div class="" v-if="filteredBy">
                      <label for="country">{{ $t("profile.countryOrigin") }}</label>

                      <b-form-select v-model="sortTypeCountry" class="mb-3" id="country" v-if="filteredBy"
                        @change="getCategoryProducts">
                        <b-form-select-option value="null">{{
                          $t("home.All")
                        }}</b-form-select-option>
                        <b-form-select-option :value="country.id" v-for="country in CountryOptions" :key="country.id">
                          {{ country.title }}</b-form-select-option>
                      </b-form-select>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12 my-2">
                    <div class="" v-if="filteredBy">
                      <label for="weight">{{
                        $t("singleProduct.weight")
                      }}</label>

                      <b-form-select v-model="sortTypeWeight" class="mb-3" id="weight" v-if="filteredBy"
                        @change="getCategoryProducts">
                        <b-form-select-option value="null">{{
                          $t("home.All")
                        }}</b-form-select-option>
                        <b-form-select-option :value="weight.id" v-for="weight in WeightOptions" :key="weight.id">
                          {{ weight.title }}</b-form-select-option>
                      </b-form-select>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12 my-2">
                    <div class="" v-if="filteredBy">
                      <label for="unit">{{ $t("items.unit") }}</label>

                      <b-form-select v-model="sortTypeUnit" class="mb-3" id="unit" v-if="filteredBy"
                        @change="getCategoryProducts">
                        <b-form-select-option value="null">{{
                          $t("home.All")
                        }}</b-form-select-option>
                        <b-form-select-option :value="unit.id" v-for="unit in UnitOptions" :key="unit.id">
                          {{ unit.title }}</b-form-select-option>
                      </b-form-select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-12">
                <div class="" v-if="sortBy">
                  <label for="price">{{ $t("cart.price") }}</label>
                  <b-form-select id="price" class="my-2" v-model="sortType" :options="options"
                    @change="getCategoryProducts">
                  </b-form-select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end category name and filters  -->

      <!-- when data of relative products loading   -->
      <b-row v-if="loading">
        <b-col class="mb-2 mx-auto" sm="12" v-for="x in 4" :key="x">
          <b-card>
            <b-skeleton animation="fade" width="80%" class="border-none"></b-skeleton>
            <b-skeleton animation="fade" width="95%" class="border-none"></b-skeleton>
          </b-card>
        </b-col>
      </b-row>

      <!-- when data of relative products comes   -->

      <div class="products-table text-center" v-else>
        <table v-if="products.length > 0" class="table table-striped table-hover table-bordered selectable">
          <thead>
            <tr>
              <th scope="col" v-for="(tab, index) in tableFields" :key="index">
                {{ tab.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <td v-if="product.ads && product.ads.length > 0">
                {{ $t("items.advertise") }}
              </td>
              <!-- <td v-else>{{index + 1 }}</td> -->
              <td v-else></td>
              <td>
                <router-link class="link font-weight-bold text-danger"
                  :to="{ path: '/details', query: { id: product.id } }">
                  {{ product.product.title }}
                </router-link>
              </td>
              <td>
                <router-link v-if="product.image_path !== null" class="link"
                  :to="{ path: '/details', query: { id: product.id } }">
                  <img :src="product.image_path" class="product-image" alt="product-image" />
                </router-link>
                <router-link v-else-if="
                  product.image_path == null && product.product.image_path
                " class="link" :to="{ path: '/details', query: { id: product.id } }">
                  <img :src="product.product.image_path" class="product-image" alt="product-image" />
                </router-link>
              </td>
              <td>
                <router-link class="link" :to="{ path: '/details', query: { id: product.id } }">
                  {{ product.client.company_name }}
                </router-link>
              </td>
              <td>
                <router-link v-if="product.product_details_by_type.unit.title" class="link"
                  :to="{ path: '/details', query: { id: product.id } }">
                  {{ product.product_details_by_type.weight }}
                  {{ product.product_details_by_type.unit.title }}
                </router-link>
                <div v-else class="link">-</div>
              </td>
              <td>
                <div class="" v-if="
                  (buyerUserData &&
                    buyerUserData.profile_percentage == 100 &&
                    buyerUserData.type === 'buyer') ||
                  buyerUserData.type === 'b2b' ||
                  (buyerUserData.type === 'supplier' &&
                    buyerUserData.is_buyer == true)
                ">
                  <router-link class="link" :to="{ path: '/details', query: { id: product.id } }">
                    <!-- show price when product not rfq only  -->
                    <div v-if="product.product_details_by_type.add_type !== 'rfq'">
                      <p class="m-0 white-space-pre">
                        {{
                          product.product_details_by_type.customer_price
                            | fixedCurrency
                        }}
                        {{ currency }}
                      </p>
                      <p class="price-after m-0 white-space-pre" v-if="
                        product.product_details_by_type
                          .price_before_discount &&
                        product.product_details_by_type
                          .price_before_discount >
                        product.product_details_by_type.customer_price
                      ">
                        {{
                          product.product_details_by_type.price_before_discount
                            | fixedCurrency
                        }}
                        {{ currency }}
                      </p>
                    </div>
                    <div v-else>-</div>
                  </router-link>
                </div>
                <div class="" v-else-if="
                  (buyerUserData &&
                    buyerUserData.profile_percentage !== 100) ||
                  (buyerUserData &&
                    buyerUserData.type === 'buyer' &&
                    buyerUserData.profile_percentage !== 100) ||
                  (buyerUserData &&
                    buyerUserData.type === 'b2b' &&
                    buyerUserData.profile_percentage !== 100) ||
                  (buyerUserData &&
                    buyerUserData.type === 'supplier' &&
                    buyerUserData.is_buyer !== true &&
                    buyerUserData.profile_percentage !== 100)
                ">
                  -
                </div>
                <div class="" v-else-if="!buyerUserData || buyerUserData.type === 'b2c'">
                  <router-link class="link" :to="{ path: '/details', query: { id: product.id } }">
                    <div v-if="product.product_details_by_type.add_type !== 'rfq'">
                      <p class="m-0">
                        {{
                          product.product_details_by_type.customer_price
                            | fixedCurrency
                        }}
                        {{ currency }}
                      </p>
                      <p class="price-after m-0" v-if="
                        product.product_details_by_type
                          .price_before_discount &&
                        product.product_details_by_type
                          .price_before_discount >
                        product.product_details_by_type.customer_price
                      ">
                        {{
                          product.product_details_by_type.price_before_discount
                            | fixedCurrency
                        }}
                        {{ currency }}
                      </p>
                    </div>
                    <div class="" v-else>-</div>
                  </router-link>
                </div>
              </td>
              <td>
                <Variants-Counter :minimum="
                  product.product_details_by_type.min_order_quantity
                    ? product.product_details_by_type.min_order_quantity
                    : 1
                " v-if="
  (cartAvailable === 'available' &&
    product.product_details_by_type.add_type === 'cart') ||
  (cartAvailable === 'available' &&
    product.product_details_by_type.add_type === 'both')
" class="justify-content-center" :quantity="
  product.product_details_by_type.min_order_quantity > 0
    ? product.product_details_by_type.min_order_quantity
    : 1
" @changeCount="
  ChangeCounter(
    $event,
    product.product_details_by_type.min_order_quantity
  )
"></Variants-Counter>
                <p v-else>-</p>
              </td>
              <td class="actions-holder">
                <div class="add-to d-flex justify-content-center align-items-center" v-if="
                  (buyerUserData &&
                    buyerUserData.profile_percentage == 100 &&
                    buyerUserData.type === 'buyer') ||
                  (buyerUserData && buyerUserData.type === 'b2b') ||
                  (buyerUserData.type === 'supplier' &&
                    buyerUserData.is_buyer == true) ||
                  (buyerUserData &&
                    buyerUserData.type === 'b2c' &&
                    buyerUserData.is_verified)
                ">
                  <a class="d-flex justify-content-center align-items-center cart-link" @click="addToCart(product)"
                    v-if="
                      (cartAvailable == 'available' &&
                        product.product_details_by_type.add_type === 'cart') ||
                      (cartAvailable == 'available' &&
                        product.product_details_by_type.add_type === 'both')
                    " v-b-tooltip.hover :title="$t('items.addToCart')">
                    <!-- <span>{{ $t("items.addToCart") }}</span> -->
                    <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                  </a>
                  <div class="" v-if="buyerUserData">
                    <a class="text-danger d-flex justify-content-center align-items-center"
                      @click="addToWishlist(product)" v-if="product.is_favorite == true" v-b-tooltip.hover
                      :title="$t('items.addedToFavourite')">
                      <font-awesome-icon icon="fa-solid fa-star" />
                    </a>
                    <a @click="addToWishlist(product)" v-b-tooltip.hover :title="$t('items.addToFavourite')"
                      class="d-flex justify-content-center align-items-center" v-else>
                      <font-awesome-icon icon="fa-solid fa-star" />
                    </a>
                  </div>
                  <div class="d-flex justify-content-center" v-if="
                    (RfqAvailable == 'available' &&
                      buyerUserData &&
                      product.product_details_by_type.add_type === 'rfq') ||
                    (RfqAvailable == 'available' &&
                      buyerUserData &&
                      product.product_details_by_type.add_type === 'both')
                  ">
                    <button class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0 loged-in"
                      v-if="
                        (buyerUserData.type === 'buyer' &&
                          buyerUserData.profile_percentage == 100) ||
                        (buyerUserData.type === 'supplier' &&
                          buyerUserData.profile_percentage == 100) ||
                        (buyerUserData.type === 'b2c' &&
                          buyerUserData.is_verified)
                      ">
                      <div @click="
                        storeProductSupplierId(
                          product.product_details_by_type.product_supplier_id
                        )
                      ">
                        <button id="show-btn" class="btn btn-loght border-0 outline-none shadow-none d-block add-cart"
                          @click="$bvModal.show('bv-bidRequest')" v-b-tooltip.hover
                          :title="$t('singleProduct.bidRequest')">
                          <rfqIcon />
                        </button>
                      </div>
                    </button>
                  </div>
                  <!-- add standing orders  -->
                  <div v-if="RfqAvailable == 'available'">
                    <button id="show-btn" class="btn btn-loght border-0 outline-none shadow-none d-block add-cart"
                      @click="
  $bvModal.show('bv-standingOrders');
selectStandingProduct(product);
                      " v-b-tooltip.hover :title="$t('items.standingOrders')">
                      <font-awesome-icon icon="fa-sharp fa-solid fa-bag-shopping" />
                    </button>
                  </div>

                  <!-- <a href="#"> <font-awesome-icon icon="fa-solid fa-check" /> </a> -->
                </div>
                <div class="d-flex justify-content-center" v-if="
                  (buyerUserData &&
                    buyerUserData.profile_percentage !== 100) ||
                  (buyerUserData &&
                    buyerUserData.type === 'buyer' &&
                    buyerUserData.profile_percentage !== 100) ||
                  (buyerUserData &&
                    buyerUserData.type === 'b2b' &&
                    buyerUserData.profile_percentage !== 100) ||
                  (buyerUserData &&
                    buyerUserData.type === 'supplier' &&
                    buyerUserData.is_buyer !== true &&
                    buyerUserData.profile_percentage !== 100)
                ">
                  <router-link to="/profile/account-information-b2b">
                    {{ $t("profile.completeAccount") }}
                  </router-link>
                </div>
                <div class="add-to d-flex justify-content-center" v-else-if="!buyerUserData">
                  <a class="cart-link" @click="addToCart(product)" v-if="
                    (cartAvailable == 'available' &&
                      product.product_details_by_type.add_type === 'cart') ||
                    (cartAvailable == 'available' &&
                      product.product_details_by_type.add_type === 'both')
                  " v-b-tooltip.hover :title="$t('items.addToCart')">
                    <!-- <span>{{ $t("items.addToCart") }}</span> -->
                    <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                  </a>

                  <div class="" v-if="buyerUserData && buyerUserData.type === 'b2c'">
                    <a class="text-danger d-flex justify-content-center align-items-center"
                      :title="`product in favourite`" @click="addToWishlist(product)"
                      v-if="product.is_favorite == true">
                      <font-awesome-icon icon="fa-solid fa-star" />
                    </a>
                    <a @click="addToWishlist(product)" class="d-flex justify-content-center align-items-center" v-else>
                      <font-awesome-icon icon="fa-solid fa-star" />
                    </a>
                  </div>
                  <div class="" v-if="!buyerUserData">
                    <a @click="loginFirst" v-b-tooltip.hover :title="$t('items.addToFavourite')"
                      class="d-flex justify-content-center align-items-center">
                      <font-awesome-icon icon="fa-solid fa-star" />
                    </a>
                  </div>
                  <div v-if="!buyerUserData && RfqAvailable == 'available'">
                    <button v-b-modal.modal-xl id="show-btn"
                      class="btn btn-loght border-0 outline-none shadow-none d-block add-cart" @click="loginFirst"
                      v-b-tooltip.hover :title="$t('singleProduct.bidRequest')">
                      <rfqIcon />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="my-5" v-else>
          <h1>{{ $t('home.noData') }}</h1>
        </div>
        <b-modal id="bv-bidRequest" hide-footer>
          <template #modal-title>
            {{ $t("singleProduct.bidRequest") }}
          </template>
          <form>
            <div class="form-group">
              <label for="">{{ $t("singleProduct.nameInput") }}
                <span class="text-danger">*</span></label>
              <input type="text" class="form-control" v-model="requestData.name" />
              <div class="text-danger" v-for="(error, index) in errors.qoute_name" :key="index">
                {{ error }}
              </div>
            </div>
            <div class="form-group">
              <label for="">{{ $t("singleProduct.min_order_quantity") }}
                <span class="text-danger">*</span></label>
              <input type="number" min="1" class="form-control" v-model="requestData.request_qty" />
              <div class="text-danger" v-for="(error, index) in errors.request_qty" :key="index">
                {{ error }}
              </div>
            </div>
            <div class="form-group">
              <label for="">{{ $t("singleProduct.reviewInput") }}
                <span class="text-danger">*</span></label>
              <textarea class="form-control" v-model="requestData.comment"></textarea>
              <div class="text-danger" v-for="(error, index) in errors.comment" :key="index">
                {{ error }}
              </div>
            </div>
          </form>
          <b-button class="btn-lg btn-block" block @click="requestQuotation">{{
            $t("cart.submit")
          }}</b-button>
        </b-modal>

        <!-- standing orders modal  -->
        <b-modal id="bv-standingOrders" size="xl" hide-footer>
          <template #modal-title>
            {{ $t("items.standingOrders") }}
          </template>
          <standing-orders :variantOrder="selectedStandingOrder" />
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import categories from "@/services/categories";
import VariantsCounter from "@/components/global/variantsCounter.vue";
import globalAxios from "@/services/global-axios";
import suppliers from "@/services/suppliers";

import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);

import rfqIcon from "@/components/global/rfqIcon.vue";

import StandingOrders from "@/components/global/standingOrders.vue";

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
        {
          key: "#",
          label: "#",
        },
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
          key: "product_details_by_type.unit.title",
          label: this.$t("items.unit"),
        },
        {
          key: "product_details_by_type.price",
          label: this.$t("items.price"),
        },
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
      cartCounter: 1,
      showModal: false,
      requestVariants: null,
      selectedVariants: null,
      requestData: {
        name: null,
        request_qty: null,
        comment: null,
      },
      errors: [],
      supplierProductId: null,
      sortType: "asc",
      options: [
        { value: "asc", text: this.$t("cart.asc") },
        { value: "desc", text: this.$t("cart.desc") },
      ],
      readMore: false,
      sortBy: false,
      filteredBy: false,
      sortTypeCountry: null,
      sortTypeWeight: null,
      sortTypeUnit: null,
      CountryOptions: null,
      WeightOptions: null,
      UnitOptions: null,
      selectedStandingOrder: null,
    };
  },
  components: {
    VariantsCounter,
    rfqIcon,
    StandingOrders,
  },
  methods: {
    /**
     * @vuese
     * add To Cart function
     */
    addToCart(item) {
      let data = {
        product_supplier_id: item.product_details_by_type.product_supplier_id,
        quantity:
          this.cartCounter > item.product_details_by_type.min_order_quantity
            ? this.cartCounter
            : item.product_details_by_type.min_order_quantity,
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
    /**
     * @vuese
     * add To Wishlist function
     */
    addToWishlist(item) {
      let data = {
        product_supplier_id: item.product_details_by_type.product_supplier_id,
      };
      return globalAxios
        .post(`members/profile/favorite`, data)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);
          }
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        })
        .finally(() => {
          setTimeout(() => {
            this.getCategoryProducts();
            this.$store.dispatch("cart/getCartProducts");
          }, 500);
        });
    },
    /**
     * @vuese
     * closeModal function
     */
    closeModal() {
      this.showModal = false;
    },
    /**
     * @vuese
     * openModal function
     */
    openModal() {
      this.showModal = true;
    },
    /**
     * @vuese
     * Change cart Counter function
     */
    ChangeCounter(cartCounter, minimum) {
      if (cartCounter >= minimum) {
        this.cartCounter = cartCounter;
      }
    },
    /**
     * @vuese
     * change Variance function
     */
    changeVariance() {
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
        .getCategoryProducts(
          this.pageId,
          this.sortType,
          this.selectedVariants,
          this.sortTypeCountry,
          this.sortTypeWeight,
          this.sortTypeUnit
        )
        .then((res) => {
          this.products = res.data.items.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * @vuese
     * get Category Products function
     */
    getCategoryProducts() {
      this.loading = true;
      categories
        .getCategoryProducts(
          this.pageId,
          this.sortType,
          this.selectedVariants,
          this.sortTypeCountry,
          this.sortTypeWeight,
          this.sortTypeUnit
        )
        .then((res) => {
          // this.getFilters()
          this.products = res.data.items.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * @vuese
     * get Single Product Details function
     */
    getSingleProductDetails() {
      categories
        .getSingleProductDetails(this.pageId)
        .then((res) => {
          this.productInfo = res.data.items;
          let variantData = res.data.items.variants;
          for (let index = 0; index < variantData.length; index++) {
            this.productInfo.variants[index].selectedVariance = null;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * @vuese
     * updateId function
     */
    updateId() {
      this.pageId = this.$route.params.slug;
    },
    /**
     * @vuese
     * prev Page function
     */
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
    /**
     * @vuese
     * on Row Selected function to mark selected row to get product id
     */
    onRowSelected(item) {
      this.$router.push({
        path: "/details",
        query: { id: item.id },
      });
    },
    /**
     * @vuese
     * go to next Page function
     */
    nextPage() {
      this.pageId = parseInt(this.pageId) + 1;

      this.$router.replace(`/categories/${this.pageId}/variants`);
      this.getCategoryProducts();

      setTimeout(() => {
        location.reload();
      }, 200);
    },
    /**
     * @vuese
     * request Quotation function
     */
    requestQuotation() {
      let payload = {
        qoute_name: this.requestData.name,
        product_supplier_id: this.supplierProductId,
        request_qty: this.requestData.request_qty,
        comment: this.requestData.comment,
      };
      suppliers
        .requestQuotation(payload)
        .then((resp) => {
          console.log(resp);
          this.errors = {};
          this.sucessMsg(resp.data.message);
          setTimeout(() => {
            document.querySelector(".close").click();
            this.requestData = [];
          }, 500);
          setTimeout(() => {
            this.$router.push({
              path: "/profile/quotationDetails",
              query: {
                id: resp.data.items.client_quote_id,
              },
            });
          }, 1000);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
    /**
     * @vuese
     * store Product SupplierId function
     */
    storeProductSupplierId(product_supplier_id) {
      this.supplierProductId = product_supplier_id;
    },
    /**
     * @vuese
     * login First function if not logged in and want RFQ
     */
    loginFirst() {
      Vue.swal({
        title: this.$t("singleProduct.loginFirst"),
        text: this.$t("singleProduct.registerNow"),
        icon: "warning",
        // buttons: ["Oh noez!", true],
        dangerMode: true,
      }).then(() => {
        this.$router.push("/user-register");
      });
    },
    /**
     * @vuese
     * get Filters function
     */
    getFilters() {
      suppliers
        .getFilters(this.pageId,
          this.sortType,
          this.selectedVariants,
          this.sortTypeCountry,
          this.sortTypeWeight,
          this.sortTypeUnit)
        .then((res) => {
          this.CountryOptions = res.data.items.countries;
          this.WeightOptions = res.data.items.weights;
          this.UnitOptions = res.data.items.units;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * @vuese
     * select Standing oerder Product function
     */
    selectStandingProduct(order) {
      this.selectedStandingOrder = order;
    },
  },
  mounted() {
    this.getCategoryProducts();
    this.getSingleProductDetails();
    this.getFilters();
  },
  watch: {
    $route: "updateId",
  },
  computed: {
    catId() {
      /**
       * @vuese
       * get selected categoty id from sessionStorage
       */

      return sessionStorage.getItem("catId")
        ? `/categories/${sessionStorage.getItem("catId")}`
        : "/";
    },
  },
};
</script>

<style lang="scss" scoped>
/**
  * page style
*/
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

      .readBtn {
        cursor: pointer;
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

.white-space-pre {
  white-space: pre !important;
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
      padding: 1rem 1rem;
      border-radius: 0.2rem;
      margin: 0 0.3rem;

      height: 44px;
      line-height: 0;

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
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.items-body .content .item-content .customize .customize-selection select[data-v-74400477] {
  height: 3rem;
}

.link {
  color: #403a37;
  font-size: 14pt;
  margin-bottom: 0.5rem;

  @media (max-width: 767px) {
    font-size: 10pt;
  }
}

.products-table {
  @media (max-width: 992px) {
    width: 100% !important;
    overflow-y: scroll;
  }
}

.products-table {
  &::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 3px;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
}

.item-media {
  img {
    height: 350px;
    width: 100%;
    object-fit: contain;
  }
}

.products-table {
  .table td {
    padding: 0.4rem !important;
  }
}

.add-cart {
  // border-radius: 0;
  font-size: 11pt;
  background: #36363b;
  color: #fff;
  padding: 1rem 2rem;
  height: fit-content;
  margin-inline-end: 0.5rem;
  display: block;
  // min-width: 10rem;
  text-align: center;
  padding: 11px 18px;
  border-radius: 3px;
  margin: 0 5px;

  &:hover {
    background: #ed2124;
  }
}

.actions-holder {
  @media (min-width: 767px) {
    width: 30%;
  }
}

.cart-link {
  background: #ff6000 !important;
  color: #fff !important;
}

/*@media screen and (max-width: 767px) {
  table {
    tbody {
      tr {
        margin: 30px 0;
      }
    }
  }
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    position: absolute;
    width: 1px;
    padding: 0;
  }

  table td {
    display: block;
    font-size: 0.8rem;
    border-top: none !important;
  }
  .table-striped tbody tr:nth-of-type(odd) {
    margin: 30px 0;
    display: block;
  }
}*/
@media (max-width: 992px) {
  .table {
    width: 800px;
  }

  .product-info {
    order: 2;
  }

  .slider {
    order: 1;
  }
}

.sortBy {
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 12px 20px;
  border-radius: 5px;
}
</style>
