<template>
  <div class="supplier">
    <div class="container">
      <div
        class="navigation d-none d-lg-flex justify-content-between align-items-center w-75 mx-auto my-4"
      >
        <button class="btn btn-light bg-transparent border-0 outlinr-0 prev shadow-none"  onclick="history.back()"><span>&#60;</span>{{ $t("supplier.prev") }}</button>
        <b-breadcrumb :items="items"></b-breadcrumb>
        <a href="" class="next">{{ $t("supplier.next") }}<span>&#62;</span></a>
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
          ></SideSection>
          <Article
            class="col-12 col-lg-8 order-0 order-lg-1"
            :data="article"
            :supplier="supplier"
          ></Article>
        </div>
        <div class="products text-center">
          <p class="title">{{ $t("supplier.products") }}</p>
          <div class="row">
            <div
              class="col-12 col-sm-6 col-lg-3"
              v-for="item in supplierProducts"
              :key="item.id"
            >
              <Product :data="item"></Product>
            </div>
          </div>
          <b-button class="load-more border-0 rounded-0 py-4 px-5 my-4 mx-0">{{
            $t("supplier.more")
          }}</b-button>
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
      supplierProducts:null,
    };
  },
  methods: {
    getSupplier() {
      this.loading = true;
      let id = this.id;
      suppliers
        .getSupplier(id)
        .then((resp) => {
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
          console.log(resp);
          this.supplierProducts = resp.data.items.data;
        })
        .catch((err) => {
          console.log(err);
        })
    },
  },
  mounted() {
    this.getSupplier();
    this.getSupplierProducts();
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
    margin-bottom: 2rem;
    font-size: 14pt;
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
</style>
