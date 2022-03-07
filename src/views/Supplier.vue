<template>
  <div class="supplier">
    <div class="container">
      <div
        class="navigation d-none d-lg-flex justify-content-between align-items-center w-75 mx-auto my-4"
      >
        <a href="" class="prev"><span>&#60;</span>{{ $t("supplier.prev") }}</a>
        <b-breadcrumb :items="items"></b-breadcrumb>
        <a href="" class="next">{{ $t("supplier.next") }}<span>&#62;</span></a>
      </div>

      <div class="row justify-content-between">
        <SideSection class="col-12 col-lg-4 order-1 order-lg-0"></SideSection>
        <Article
          class="col-12 col-lg-8 order-0 order-lg-1"
          :data="article"
        ></Article>
      </div>
      <div class="products text-center">
        <p class="title">{{ $t("supplier.products") }}</p>
        <div class="row">
          <div
            class="col-12 col-sm-6 col-lg-3"
            v-for="item in 10"
            :key="item.message"
          >
            <Product :data="product"></Product>
          </div>
        </div>
        <b-button class="load-more border-0 rounded-0 py-4 px-5 my-4 mx-0">{{
          $t("supplier.more")
        }}</b-button>
      </div>
    </div>
  </div>
</template>
<script>
import SideSection from "@/components/pages/supplier/SideSection";
import Article from "@/components/pages/supplier/Article";
import Product from "@/components/pages/supplier/products/Product";
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
          href: "#",
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
      article: {
        image: require("@/assets/images/supba.png"),
        content: this.$t("supplier.article"),
      },
      product: {
        image: require("@/assets/images/sp.png"),
        name: this.$t("supplier.productName"),
        price: "4.620 KD",
      },
    };
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
