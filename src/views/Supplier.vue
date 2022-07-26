<template>
  <div class="supplier">
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
        <!-- <b-breadcrumb :items="items"></b-breadcrumb> -->
        <b-breadcrumb v-if="supplier">
          <b-breadcrumb-item href="#home">
            <router-link to="/">
              {{ $t("supplier.home") }}
            </router-link>
          </b-breadcrumb-item>
          <b-breadcrumb-item>
            <router-link to="/suppliers">
              {{ $t("supplier.suppliers") }}
            </router-link>
          </b-breadcrumb-item>
          <b-breadcrumb-item active>
            {{ supplier.company_name }}
          </b-breadcrumb-item>
        </b-breadcrumb>
        <!-- <span
          @click="nextPage"
          class="next btn btn-light shadow-none bg-transparent border-none outline-none"
          >{{ $t("items.next") }}<span>&#62;</span></span
        > -->
      </div>

      <b-row v-if="loading">
        <b-col class="mb-2" lg="3" sm="6" v-for="x in 2" :key="x">
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
        <div class="row justify-content-between">
          <SideSection
            class="col-12 col-lg-4 order-1 order-lg-0"
            :supplier="supplier"
            :supplierMSite="supplierMSite"
          ></SideSection>
          <Article
            class="col-12 col-lg-8 order-0 order-lg-1"
            :data="article"
            :supplier="supplier"
            :supplierMSite="supplierMSite"
            
          ></Article>
        </div>
        <div class="products text-center mt-5 pt-5" v-if="supplierProductsLength > 0">
          <h1 class="title">{{ $t("supplier.supplierProducts") }}</h1>
          <div class="row">
            <div
              class="col-12 col-sm-6 col-lg-3"
              v-for="item in supplierProducts"
              :key="item.id"
            >
              <Product :data="item"></Product>
            </div>
          </div>

          <router-link
            class="load-more border-0 rounded-0 py-4 px-5 my-4 mx-0 d-inline-block"
            :to="{ path: `/supplier-products`, query: { supId: supplier.id } }"
          >
            {{ $t("supplier.more") }}
          </router-link>
        </div>
        <div class="d-flex justify-content-center align-items-center" v-else>
          <h3>
            {{ $t("cart.noProducts") }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SideSection from "@/components/pages/supplier/SideSection";
import Article from "@/components/pages/supplier/Article";
import Product from "@/components/pages/supplier/products/Product";
import suppliers from "@/services/suppliers";

export default {
  components: {
    SideSection,
    Article,
    Product,
  },
  data() {
    return {
      items: [
        {
          text: this.$t("supplier.home"),
          href: "/humhum-user",
        },
        {
          text: this.$t("supplier.suppliers"),
          href: "#",
        },
        {
          text: this.$t("supplier.company"),
          active: true,
        },
      ],
      id: this.$route.params.id,
      pageId: this.$route.params.id,
      loading: false,
      article: {
        image: require("@/assets/images/supba.png"),
        content: this.$t("supplier.article"),
      },
      product: {
        image: require("@/assets/images/sp.png"),
        name: this.$t("supplier.productName"),
        price: "4.620 KD",
      },
      supplier: null,
      supplierProducts: null,
      supplierProductsLength: null,
      supplierMSite:null
    };
  },
  methods: {
    getSupplier() {
      this.loading = true;
      let id = this.id;
      suppliers
        .getSupplier(id)
        .then((resp) => {
          // console.log("resp", resp.data.items);
          this.supplier = resp.data.items;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getSupplierProducts() {
      let id = this.id;
      suppliers
        .getSupplierProducts(id)
        .then((resp) => {
          this.supplierProducts = resp.data.items.data.slice(0,4);
          resp.data.items.data.length > 0
            ? (this.supplierProductsLength = resp.data.items.data.length)
            : (this.supplierProductsLength = 0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    nextPage() {
      this.pageId = parseInt(this.pageId) + 1;

      this.$router.replace(`/suppliers/${this.pageId}`);
      this.getSupplier();
      this.getSupplierProducts();

      setTimeout(() => {
        location.reload();
      }, 200);
    },
    prevPage() {
      let prevUrl = this.pageId;
      if (prevUrl > 0) {
        this.pageId = parseInt(this.pageId) - 1;

        this.$router.replace(`/suppliers/${this.pageId}`);
        this.getSupplier();
        this.getSupplierProducts();
        setTimeout(() => {
          location.reload();
        }, 200);
      }
    },
    supplierMicroSite() {
      suppliers
        .supplierMicroSite(this.id)
        .then((res) => {
          console.log(res);
          this.supplierMSite = res.data.items
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getSupplier();
    this.getSupplierProducts();
    this.supplierMicroSite();
  },
};
</script>
<style lang="scss" scoped>
.supplier {
  .navigation {
    a {
      color: #403a37;
      &:hover {
        color: #ed2124;
      }
    }
    .prev span {
      margin-inline-end: 0.2rem;
    }
    .next span {
      margin-inline-start: 0.2rem;
    }
  }
  .products {
    margin-top: 4rem;
  }
  .title {
    color: #312620;
    font-weight: 600;
    text-align: center;
    margin-bottom: 5rem;
    // font-size: 14pt;
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
}

.supplier {
  #bv-modal-example {
    top: 6% !important;
  }
}
</style>
