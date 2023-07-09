<template>
  <div class="wrapper text-center">
    <router-link
      :to="{ name: 'productPage', params: { id: id } }"
      class="text-gray"
    >
      <div class="categoryProduct">
        <div class="productImage">
          <v-img
            lazy-src="@/assets/images/categories/MaskGroup162.png"
            src="@/assets/images/categories/MaskGroup162.png"
          ></v-img>
        </div>
        <div class="productTitle">
          <h4>Video games - {{ id }}</h4>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { useMeta } from "vue-meta";
export default {
  props: ["id"],
  setup() {
    useMeta({
      title: "Categories Product Page",
      htmlAttrs: { lang: "en", amp: true },
    });
  },
};
</script>

<style lang="scss" scoped>
.productImage {
  display: inline;
  img {
    max-width: 300px !important;
    max-height: 300px !important;
    border-radius: 50% !important;
    margin-bottom: 15px;
  }
}
</style>
