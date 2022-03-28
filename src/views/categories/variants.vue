<template>
  <div class="items-body">
    <div class="container">
      <div
        class="navigation d-none d-lg-flex justify-content-between align-items-center w-75 mx-auto my-4"
      >
        <button
          class="prev btn btn-light shadow-none bg-transparent border-none outline-none"
          @click="prevPage"
          :disabled="pageId == 1"
        >
          <span>&#60;</span>{{ $t("items.prev") }}
        </button>
        <b-breadcrumb :items="items"></b-breadcrumb>
        <span
          @click="nextPage"
          class="next btn btn-light shadow-none bg-transparent border-none outline-none"
          >{{ $t("items.next") }}<span>&#62;</span></span
        >
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
                  v-for="product in productInfo.variants"
                  :key="product.id"
                  class="mb-3"
                >
                  <form action="">
                    <label for="select">{{ product.title }}</label>
                    <b-form-group >
                      <b-form-select v-model="product.selectedVariance" @change="changeVariance(product)" class="mb-3">
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
            v-if="productInfo.image_path"
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
        <b-table
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
            {{ data.value }} {{ $t("items.kg") }}
          </template>
          <template #cell(price)="data">
            <span v-if="data.value > 0">{{ data.value }} </span>
            <span v-else>
              {{ $t("cart.noData") }}
            </span>
          </template>
          <template #cell(quantity)="data">
            <Counter
              v-if="data.value"
              class="justify-content-center"
              :quantity="data.value"
            ></Counter>
            <Counter
              v-else
              class="justify-content-center"
              :quantity="1"
            ></Counter>
          </template>
          <template #cell(addTo)>
            <div class="add-to d-flex justify-content-center">
              <a @click="addToCart()">
                <span>{{ $t("items.addToCart") }}</span>
                <font-awesome-icon icon="fa-solid fa-cart-shopping" />
              </a>
              <a @click="addToWishlist()"
                ><font-awesome-icon icon="fa-solid fa-star"
              /></a>
              <a href="#"> <font-awesome-icon icon="fa-solid fa-check" /> </a>
            </div>
          </template>
        </b-table>
      </div>
    </div>
    <div class="most-sold text-center">
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
            v-for="(item, index) in 4"
            :key="index"
          >
            <Product :data="product[index]"></Product
          ></b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import categories from "@/services/categories";
import Counter from "@/components/global/Counter.vue";
import Product from "@/components/pages/supplier/products/Product.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      // id: this.$route.params.slug,
      pageId: this.$route.params.slug,
      products: [],
      productInfo: null,
      selectedVariance: null,
      loading: false,
      variants:null,
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
          // key: "condition",
          label: this.$t("items.type"),
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
          key: "unit.title",
          label: this.$t("items.unit"),
        },
        {
          key: "product_details[0].price",
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
      tableItems: [
        {
          type: "Announcement",
          item: "American red apple",
          image: require("@/assets/images/ftb1.png"),
          supplier: "Aalm Alfrda",
          unit: 1,
          price: "3.10",
          quantity: 2,
        },
        {
          type: "Announcement",
          item: "American red apple",
          image: require("@/assets/images/ftb1.png"),
          supplier: "Aalm Alfrda",
          unit: 1,
          price: "3.10",
          quantity: 2,
        },
        {
          type: "Announcement",
          item: "American red apple",
          image: require("@/assets/images/ftb1.png"),
          supplier: "Aalm Alfrda",
          unit: 1,
          price: "3.10",
          quantity: 2,
        },
        {
          type: "Announcement",
          item: "American red apple",
          image: require("@/assets/images/ftb1.png"),
          supplier: "Aalm Alfrda",
          unit: 1,
          price: "3.10",
          quantity: 2,
        },
        {
          type: "Announcement",
          item: "American red apple",
          image: require("@/assets/images/ftb1.png"),
          supplier: "Aalm Alfrda",
          unit: 1,
          price: "3.10",
          quantity: 2,
        },
        {
          type: "Announcement",
          item: "American red apple",
          image: require("@/assets/images/ftb1.png"),
          supplier: "Aalm Alfrda",
          unit: 1,
          price: "3.10",
          quantity: 2,
        },
      ],
      product: [
        {
          image: require("@/assets/images/sp.png"),
          name: this.$t("supplier.productName"),
          price: "4.620 KD",
          new: true,
        },
        {
          image: require("@/assets/images/sp.png"),
          name: this.$t("supplier.productName"),
          price: "4.620 KD",
          discount: 20,
        },
        {
          image: require("@/assets/images/sp.png"),
          name: this.$t("supplier.productName"),
          price: "4.620 KD",
        },
        {
          image: require("@/assets/images/sp.png"),
          name: this.$t("supplier.productName"),
          price: "4.620 KD",
          new: true,
          discount: 35,
        },
      ],
    };
  },
  components: {
    Counter,
    Product,
  },
  methods: {
    ...mapActions("cart", ["addProductToCart", "addProductToWishlist"]),
    addToCart() {
      // this.addProductToCart({
      //   product: this.product,
      //   quantity: 1,
      // });
    },
    addToWishlist() {
      // this.addProductToWishlist({
      //   product: this.product,
      //   quantity: 1,
      // });
    },
    changeVariance(product){
      console.log(product.selectedVariance);
    },
    getCategoryProducts() {
      this.loading = true;
      categories
        .getCategoryProducts(this.pageId)
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
    getSingleProductDetails() {
      categories
        .getSingleProductDetails(this.pageId)
        .then((res) => {
          console.log(res);
          this.productInfo = res.data.items;
          let variantData = res.data.items.variants
          for (let index = 0; index < variantData.length; index++) {
            // this.variants = variantData[index];
            this.productInfo.variants[index].selectedVariance = null      
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
        this.pageId -= 1;
        console.log(this.pageId);
        // this.$router.replace(`/categories/${prevUrl}/variants`);
        this.getCategoryProducts();
      }
    },
    nextPage() {
      this.pageId = parseInt(this.pageId) + 1;
      console.log(this.pageId);
      // this.$router.replace(`/categories/${prevUrl}/variants`);
      this.getCategoryProducts();
    },
    postVariance(){
      // let selectedVariance = [];

      // axios.post('')
    }
  },
  mounted() {
    this.getCategoryProducts();
    this.getSingleProductDetails();
  },
  watch: {
    $route: "updateId",
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
}
.items-body
  .content
  .item-content
  .customize
  .customize-selection
  select[data-v-74400477] {
  height: 3rem;
}
</style>
